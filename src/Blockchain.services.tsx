import Web3 from 'web3';
import { setGlobalState , getGlobalState, setAlert} from './store';
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

const {ethereum} = window;
window.web3 = new Web3(ethereum);
window.web3 = new Web3(window.web3.currentProvider);

const getEtheriumContract = async () => {
    const connectedAccount = getGlobalState('connectedAccount');
    
    if(connectedAccount){
        const web3 = window.web3;
        const networkId = await web3.eth.net.getId();
        const networkData = (AuroraABI as AuroraABIType).networks[networkId.toString()];

        if(networkData){
            const contract = new web3.eth.Contract((AuroraABI as AuroraABIType).abi, networkData.address);
            return contract;
        }else{
            window.alert('Aurora contract is not deployed on this network.');
        }
    }
    return null;
}

    const connectWallet = async () => {
        try{
            if(!ethereum) return reportError('Please install MetaMask!');
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setGlobalState('connectedAccount', accounts[0].toLowerCase());
        }catch(error){
            reportError(error);
        }
    }

    const isWalletConnected = async () => {
        try{
            if(!ethereum) return reportError('Please install MetaMask!');
            const accounts = await ethereum.request({method: 'eth_accounts'});

            window.ethereum.on('chainChanged', (chainId: string) => {
                window.location.reload();
            });

            window.ethereum.on('accountsChanged', async () => {
                setGlobalState('connectedAccount', accounts[0].toLowerCase());
                await isWalletConnected();
            });

            if(accounts.length > 0){
                setGlobalState('connectedAccount', accounts[0].toLowerCase());
            }else{
                setGlobalState('connectedAccount', '');
                reportError('Please connect your wallet.');
            }
            
            
        }catch(error){
            reportError(error);
        }
    }

    const structuredNfts = (nfts: any) => {
        return nfts
            .map((nft: any) => ({
                id: Number(nft.id),
                owner: nft.owner.toLowerCase(),
                cost: window.web3.utils.fromWei(nft.cost, 'ether'),
                title: nft.title,
                description: nft.description,
                metadataURI: nft.metadataURI,
                timestamp: nft.timestamp,
    })).reverse()
    }

    const getAllNfts = async () => {
        try{
            if(!ethereum) return reportError('Please install MetaMask!');
            const contract = await getEtheriumContract();
            if (!contract) return;
            
            const nfts = await contract.methods.getAllNfts().call();
            const transactions = await contract.methods.getAllTransactions().call();
            
            setGlobalState('nfts', structuredNfts(nfts));
            setGlobalState('transactions', structuredNfts(transactions));
        }catch(error){
            reportError(error);
        }
    }

    const mintNFT = async ({ title, description, metadataURI, price }: { title: string, description: string, metadataURI: string, price: string }) => {
        try {
            price = window.web3.utils.toWei(price.toString(), 'ether')
            const contract = await getEtheriumContract()
            if (!contract) return false;
            
            const account = getGlobalState('connectedAccount')
            const mintPrice = window.web3.utils.toWei('0.01', 'ether')
        
            await contract.methods
                .payToMint(title, description, metadataURI, price)
                .send({ from: account, value: mintPrice })
        
            return true
        } catch (error) {
            reportError(error)
            return false
        }
    }

    const buyNFT = async ({ id, cost }: { id: string, cost: string }) => {
        try {
            cost = window.web3.utils.toWei(cost.toString(), 'ether')
            const contract = await getEtheriumContract()
            if (!contract) return false;
            
            const buyer = getGlobalState('connectedAccount')
        
            await contract.methods
                .payToBuy(Number(id))
                .send({ from: buyer, value: cost })
        
            return true
        } catch (error) {
            reportError(error)
            return false
        }
    }
    
    const updateNFT = async ({ id, cost }: { id: string, cost: string }) => {
        try {
            cost = window.web3.utils.toWei(cost.toString(), 'ether')
            const contract = await getEtheriumContract()
            if (!contract) return false;
            
            const buyer = getGlobalState('connectedAccount')
        
            await contract.methods.changePrice(Number(id), cost).send({ from: buyer })
            return true
        } catch (error) {
            reportError(error)
            return false
        }
    }

    const reportError = (error: any) => {
        setAlert(JSON.stringify(error), 'red')
      }
      
      export {
        getAllNfts,
        connectWallet,
        mintNFT,
        buyNFT,
        updateNFT,
        isWalletConnected,
      }

