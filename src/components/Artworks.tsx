import React, { useEffect, useState } from "react";
import ShowNFT from "./ShowNFT";
import type { NftType } from "../store";
import { setGlobalState, useGlobalState } from "../store";
import { FaEthereum, FaCrown } from "react-icons/fa";

const Artworks = () => {
  const [nfts] = useGlobalState('nfts');
  const [connectedAccount] = useGlobalState('connectedAccount');
  const [end, setEnd] = useState(8);
  const [count] = useState(8);
  const [allCollection, setAllCollection] = useState<NftType[]>([]);
  const [ownedCollection, setOwnedCollection] = useState<NftType[]>([]);
  const [showModal] = useGlobalState('showModal');
  const [nft, setNft] = useGlobalState('nft');

  useEffect(() => {
    if (connectedAccount) {
      const owned = nfts.filter((nft: NftType) => 
        nft.owner.toLowerCase() === connectedAccount.toLowerCase()
      );
      setOwnedCollection(owned);
    } else {
      setOwnedCollection([]);
    }
    
    setAllCollection(nfts.slice(0, end));
  }, [nfts, end, connectedAccount]);

  return (
    <>
      <div className="min-h-screen bg-black pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {ownedCollection.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center space-x-3 mb-8">
                <FaCrown className="text-3xl text-amber-400" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
                  Your Collection
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {ownedCollection.map((nft, i) => (
                  <Card key={`owned-${i}`} nft={nft} isOwned={true} />
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Discover Artworks
              </h2>
              <p className="text-gray-400">Explore the latest NFT collections</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allCollection.map((nft, i) => (
                <Card 
                  key={`all-${i}`} 
                  nft={nft} 
                  isOwned={connectedAccount ? nft.owner.toLowerCase() === connectedAccount.toLowerCase() : false}
                />
              ))}
            </div>

            {nfts.length > allCollection.length && (
              <div className="flex justify-center mt-12">
                <button
                  className="relative group px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 overflow-hidden"
                  onClick={() => setEnd(end + count)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <span className="relative z-10">Load More</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal === 'scale-100' && (
        <ShowNFT 
          showModal={showModal === 'scale-100'} 
          setShowModal={(val: boolean) => setGlobalState('showModal', val ? 'scale-100' : 'scale-0')} 
          nft={nft} 
        />
      )}
    </>
  );
};

const Card = ({ nft, isOwned }: { nft: NftType; isOwned?: boolean }) => {
  const setNFT = () => {
    setGlobalState('nft', nft);
    setGlobalState('showModal', 'scale-100');
  };

  return (
    <div 
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/20"
      onClick={setNFT}
    >
      {isOwned && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full flex items-center space-x-1">
          <FaCrown className="text-amber-400 text-sm" />
          <span className="text-amber-400 text-xs font-bold">OWNED</span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-violet-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className="relative aspect-square overflow-hidden">
        <img
          src={nft.image}
          alt={nft.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 truncate group-hover:text-violet-400 transition-colors duration-300">
            {nft.title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {nft.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <FaEthereum className="text-violet-400 text-lg" />
            <div>
              <p className="text-xs text-gray-500">Price</p>
              <p className="text-sm font-bold text-white">{nft.cost} ETH</p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setNFT();
            }}
            className="px-4 py-2 bg-white/5 hover:bg-violet-600 border border-white/10 hover:border-violet-500 rounded-lg text-sm font-medium text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-violet-500/30"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Artworks;