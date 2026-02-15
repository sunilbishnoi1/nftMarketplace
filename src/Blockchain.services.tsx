import Web3 from 'web3';
import { setGlobalState, getGlobalState, setAlert } from './store';
import AuroraABI from './abis/Aurora.json';

interface NetworkData {
    address: string;
    transactionHash: string;
    events: Record<string, any>;
    links: Record<string, any>;
}

interface AuroraABIType {
    abi: any[];
    networks: Record<string, NetworkData>;
}

declare global {
  interface Window {
    ethereum: any;
    web3: Web3;
  }
}

const { ethereum } = window;

const getEtheriumContract = async () => {
    const connectedAccount = getGlobalState('connectedAccount');

    if (connectedAccount) {
        const web3 = new Web3(ethereum);
        const networkId = await web3.eth.net.getId();
        const networkData = (AuroraABI as AuroraABIType).networks[networkId.toString()];

        if (networkData) {
            return new web3.eth.Contract((AuroraABI as AuroraABIType).abi, networkData.address);
        } else {
            const fallbackAddress = process.env.REACT_APP_AURORA_ADDRESS;
            const expectedChainId = process.env.REACT_APP_CHAIN_ID; 
            if(expectedChainId && expectedChainId !== String(networkId)){
                setAlert(`Wrong network. Please switch to chain ${expectedChainId}.`, 'red')
                return null;
            }
            if(fallbackAddress){
                try{
                    const contract = new web3.eth.Contract((AuroraABI as AuroraABIType).abi, fallbackAddress);
                    return contract;
                }catch(e){
                    setAlert('Invalid contract address configured.', 'red')
                    return null;
                }
            }
            setAlert('Aurora contract is not deployed on this network.', 'red')
            return null;
        }
    } else {
        return getGlobalState('contract');
    }
}

const connectWallet = async () => {
    try {
        if (!ethereum) return reportError('Please install MetaMask!');
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setGlobalState('connectedAccount', accounts[0].toLowerCase());
    } catch (error) {
        reportError(error);
    }
}

const isWalletConnected = async () => {
    try {
        if (!ethereum) return reportError('Please install MetaMask!');
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });

        window.ethereum.on('accountsChanged', async (accs: string[]) => {
            if (accs.length > 0) {
                setGlobalState('connectedAccount', accs[0].toLowerCase());
            } else {
                setGlobalState('connectedAccount', '');
            }
        });

        if (accounts.length > 0) {
            setGlobalState('connectedAccount', accounts[0].toLowerCase());
        } else {
            setGlobalState('connectedAccount', '');
            reportError('Please connect your wallet.');
        }
    } catch (error) {
        reportError(error);
    }
}

const structureNfts = async (nfts: any[]): Promise<any[]> => {
    const web3 = new Web3(ethereum);
    const struct = await Promise.all(nfts.map(async (nft) => {
        let image = '';
        try {
            const res = await fetch(nft.metadataURI);
            if(res.ok) {
                const meta = await res.json();
                image = meta.image || '';
                if(image.startsWith('ipfs://')) {
                    image = image.replace('ipfs://', 'https://ipfs.filebase.io/ipfs/');
                }
            }
        } catch (error) {
            console.warn("Failed to fetch metadata for NFT", nft.id, error);
        }

        return {
            id: Number(nft.id),
            owner: nft.owner.toLowerCase(),
            creator: nft.creator.toLowerCase(),
            cost: web3.utils.fromWei(nft.cost, 'ether'),
            title: nft.title,
            description: nft.description,
            metadataURI: nft.metadataURI,
            timestamp: nft.timestamp,
            image,
        };
    }));
    return struct.reverse();
}

const getAllNfts = async () => {
    try {
        if (!ethereum) return reportError('Please install MetaMask!');

        const contract = await getEtheriumContract();
        if (!contract) return;

        const nfts = await contract.methods.getAllNFTs().call();
        const transactions = await contract.methods.getAllTransactions().call();

        setGlobalState('nfts', await structureNfts(nfts));
        setGlobalState('transactions', await structureNfts(transactions));
    } catch (error) {
        reportError(error);
    }
}

const mintNFT = async ({ title, description, metadataURI, price }: { title: string, description: string, metadataURI: string, price: string }) => {
    try {
        if (!ethereum) {
            setAlert('Please install MetaMask!', 'red');
            return false;
        }
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (!accounts || accounts.length === 0) {
            await ethereum.request({ method: 'eth_requestAccounts' });
        }

        const web3 = new Web3(ethereum);
        const priceInWei = web3.utils.toWei(price.toString(), 'ether');
        const contract = await getEtheriumContract();
        if (!contract) return false;

        const account = getGlobalState('connectedAccount');
        const mintPrice = web3.utils.toWei('0.01', 'ether');

        await contract.methods
            .payToMint(title, description, metadataURI, priceInWei)
            .send({ from: account, value: mintPrice });

        return true;
    } catch (error) {
        const message = (error as any)?.message || 'Transaction failed';
        setAlert(message, 'red');
        return false;
    }
}

const buyNFT = async ({ id, cost }: { id: string | number, cost: string }) => {
    try {
        const web3 = new Web3(ethereum);
        const costInWei = web3.utils.toWei(cost.toString(), 'ether');
        const contract = await getEtheriumContract();
        if (!contract) return false;

        const buyer = getGlobalState('connectedAccount');

        await contract.methods
            .payToBuy(Number(id))
            .send({ from: buyer, value: costInWei });

        return true;
    } catch (error) {
        reportError(error);
        return false;
    }
}

const updateNFT = async ({ id, cost }: { id: string | number, cost: string }) => {
    try {
        const web3 = new Web3(ethereum);
        const costInWei = web3.utils.toWei(cost.toString(), 'ether');
        const contract = await getEtheriumContract();
        if (!contract) return false;

        const buyer = getGlobalState('connectedAccount');

        await contract.methods.changePrice(Number(id), costInWei).send({ from: buyer });
        return true;
    } catch (error) {
        reportError(error);
        return false;
    }
}

const reportError = (error: any) => {
    setAlert(JSON.stringify(error), 'red');
}

export {
    getAllNfts,
    connectWallet,
    mintNFT,
    buyNFT,
    updateNFT,
    isWalletConnected,
};

