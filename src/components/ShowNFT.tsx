import { FaTimes, FaEthereum } from "react-icons/fa";
import Identicon from "@polkadot/react-identicon";
import { setAlert, setGlobalState, truncate, useGlobalState } from "../store";
import { buyNFT } from "../Blockchain.services";

const ShowNFT = ({ showModal, setShowModal, nft }: { showModal: boolean; setShowModal: (val: boolean) => void; nft: any }) => {
  const [globalConnectedAccount] = useGlobalState('connectedAccount');

  if (!showModal) return null;

  const isOwner = globalConnectedAccount?.toLowerCase() === nft?.owner?.toLowerCase();

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
    try {
      await buyNFT(nft)
      setAlert('NFT purchased successfully','green')
      window.location.reload()
    } catch(error) {
      console.log('Error purchasing NFT', error)
      setAlert('Purchase failed!!', 'red')
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-md z-50 p-4">
      <div className="relative w-full max-w-4xl">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-3xl blur-2xl opacity-20"></div>
        
        {/* Main container */}
        <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button 
            onClick={() => setShowModal(false)}
            className="absolute top-6 right-6 z-10 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <FaTimes size={24} />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left: Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
                <img 
                  src={nft.image} 
                  alt={nft.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex flex-col justify-between space-y-6">
              {/* Title & Description */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  {nft.title}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  {nft.description}
                </p>
              </div>

              {/* Owner Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <Identicon
                    value={nft.owner}
                    size={48}
                    theme="polkadot"
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Owner</p>
                    <p className="text-white font-medium">
                      {nft.owner ? truncate(nft.owner, 6, 4, 15) : "Loading..."}
                    </p>
                  </div>
                  {isOwner && (
                    <span className="px-3 py-1 bg-violet-500/20 text-violet-400 text-xs font-bold rounded-full border border-violet-500/30">
                      YOU
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="p-6 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 border border-white/10 rounded-xl">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Current Price</p>
                  <div className="flex items-center space-x-2">
                    <FaEthereum className="text-3xl text-violet-400" />
                    <span className="text-3xl font-bold text-white">{nft.cost}</span>
                    <span className="text-xl text-gray-400">ETH</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                {isOwner ? (
                  <button 
                    className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden group bg-gradient-to-r from-amber-600 to-orange-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/50"
                    onClick={OnChangePrice}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <span className="relative z-10">Update Price</span>
                  </button>
                ) : (
                  <button 
                    className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden group bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/50"
                    onClick={OnPurchaseNow}
                  >  
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <span className="relative z-10">Purchase Now</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowNFT;
