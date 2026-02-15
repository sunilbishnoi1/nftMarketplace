import { FaTimes, FaEthereum } from "react-icons/fa";
import { useGlobalState, setGlobalState, setLoadingMsg, setAlert } from "../store";
import React, { useState, useEffect } from "react";
import { updateNFT } from "../Blockchain.services";

function UpdateNFT() {
  const [modal] = useGlobalState('updateModal');
  const [nft] = useGlobalState('nft');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (nft && modal === 'scale-100') { 
      setPrice(nft.cost); 
    }
    if (modal === 'scale-0') {
      setPrice(''); 
    }
  }, [nft, modal]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!price || parseFloat(price) <= 0) {
      setAlert('Price must be greater than zero.', 'red');
      return;
    }
    if (!nft) {
      setAlert('No NFT selected for update.', 'red');
      return;
    }

    setGlobalState('loading', { show: true, msg: 'Updating NFT price...' });

    try {
      const result = await updateNFT({ id: nft.id, cost: price });
      
      if(result) {
        setAlert('NFT Price Updated Successfully!', 'green');
        setGlobalState('updateModal', 'scale-0');
        window.location.reload();
      } else {
        setAlert('Transaction failed', 'red');
        setGlobalState('loading', { show: false, msg: '' });
      }
    } catch (error) {
      console.error(error);
      setAlert('Transaction failed', 'red');
      setGlobalState('loading', { show: false, msg: '' });
    }
  };

  if (modal === 'scale-0') return null; 

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${modal === 'scale-100' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="relative w-full max-w-md mx-4">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
        
        {/* Main container */}
        <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative px-8 py-6 border-b border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-orange-600/10"></div>
            <div className="relative flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Update Price
                </h2>
                <p className="text-sm text-gray-400 mt-1">{nft?.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setGlobalState('updateModal', 'scale-0')}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Current Price Display */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Current Price</p>
              <div className="flex items-center space-x-2">
                <FaEthereum className="text-2xl text-amber-400" />
                <span className="text-2xl font-bold text-white">{nft?.cost}</span>
                <span className="text-lg text-gray-400">ETH</span>
              </div>
            </div>

            {/* New Price Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">New Price (ETH)</label>
              <div className="relative">
                <input
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 pr-16"
                  type="number"
                  step={0.0001}
                  min={0.0001}
                  name="price"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">ETH</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden group bg-gradient-to-r from-amber-600 to-orange-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <span className="relative z-10">Update Price</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateNFT;