import { FaTimes } from "react-icons/fa";
import Identicon from "@polkadot/react-identicon";
import { setAlert, setGlobalState, truncate, useGlobalState } from "../store";
import { buyNFT } from "../Blockchain.services";

const ShowNFT = ({ showModal, setShowModal, nft }: { showModal: boolean; setShowModal: (val: boolean) => void; nft: any }) => {
    const [globalConnectedAccount] = useGlobalState('connectedAccount');

    if (!showModal) return null;

    const isOwner = globalConnectedAccount?.toLowerCase() === nft?.owner?.toLowerCase();
    // const isOwner = true;


    const OnChangePrice = () => {
        setShowModal(false);
        setGlobalState('showModal', 'scale-0');
        setAlert('NFT price change called','red')
        setGlobalState('updateModal', 'scale-100');
    };

    const OnPurchaseNow = async () => {
        setShowModal(false);
        setGlobalState('showModal', 'scale-0')
        setGlobalState('loading', { show: true, msg: 'Initializing NFT transfer...',})
        try{
            await buyNFT(nft)
            setAlert('NFT purchased successfully','green')
            window.location.reload()
        } catch(error){
            console.log('Error purchasing NFT', error)
            setAlert('Purchase failed!!', 'red')
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.6)] z-50">
            <div className="bg-[#10001a] p-6  rounded-xl w-11/12 md:w-2/5 h-7/12 p-6 rounded-lg shadow-md border-2 border-[#d1aaff] relative">
                <h2 className="text-[#d1aaff] text-xl font-bold text-center">Purchase NFT</h2>

                {/* Close Button */}
                <button 
                    onClick={() => setShowModal(false)} //setGlobalState('showModal', 'scale-0')}
                    className="absolute top-3 right-3 bg-[#d1aaff] text-[#10001a] px-3 py-1 rounded-md font-semibold hover:bg-[#aa66ff] transition">
                    <FaTimes />
                </button>

                {/* NFT Details */}
                <div className="mt-4 text-[#d1aaff] text-center">
                    <img src={nft.image} alt="NFT Preview" className="w-48 h-auto mx-auto rounded-md shadow-md"/>
                    {/* <p className="mt-4"><strong>ID:</strong> {`0x${String(nft.id).slice(0,4)}...${String(nft.id).slice(-4)}`}</p> */}
                    <p className="mt-4">{nft.title}</p>
                    <p>{nft.description}</p>
                </div>

                <div className="flex items-center gap-32 mt-3 text-[#d1aaff]">
                    <div className="flex ml-20">
                        <Identicon
                            value={nft.owner}
                            size={50}
                            theme="polkadot"
                            className="h-10 w-10 object-contain rounded-full mr-3" 
                            />
                            <div className="flex flex-col justify-center items-start">
                                <small className="text-[#d1aaff] font-bold">@Owner</small>
                                <small className="text-red-800 font-semibold">
                                    {nft.owner ? truncate(nft.owner, 4, 4, 11) : "Loading..."}
                                </small>
                            </div>
                    </div>
                    <div className="flex flex-col ml-4">
                        <small className="text-xs">Current Price</small>
                        <p className="text-xs font-semibold text-center">{nft.price} ETH</p>
                    </div>
                </div>

                {/* Purchase Button / Change Price*/}
                <div className="flex justify-between items-center space-x-2">
                    {isOwner ? (         //nft.owner
                    <button 
                        className="bg-[#d1aaff] text-[#10001a] px-4 py-2 mt-6 rounded-md w-full font-semibold hover:bg-[#aa66ff] transition"
                        onClick={OnChangePrice}>
                        Change Price
                    </button>
                    ) : (
                    <button 
                        className="bg-[#d1aaff] text-[#10001a] px-4 py-2 mt-6 rounded-md w-full font-semibold hover:bg-[#aa66ff] transition"
                        onClick={OnPurchaseNow}>  
                        Purchase Now
                    </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowNFT;
