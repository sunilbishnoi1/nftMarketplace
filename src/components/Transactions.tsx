import React, { useEffect, useState } from "react";
import { FaArrowRight, FaExternalLinkAlt, FaEthereum } from "react-icons/fa";
import { useGlobalState, truncate } from '../store';

interface Transaction {
  id: number;
  receiver: string;
}

const Transactions = () => {
  const [transactions] = useGlobalState('transactions');
  const [connectedAccount] = useGlobalState('connectedAccount');
  const [end, setEnd] = useState(6);
  const [count] = useState(6);
  const [collection, setCollection] = useState<Transaction[]>([]);

  const getCollection = () => {
    const filtered = transactions.filter((txn: any) => {
      if (!connectedAccount) return false;
      const owner = txn.owner?.toLowerCase?.();
      return owner === connectedAccount.toLowerCase();
    });
    return filtered.slice(0, end);
  };
  
  useEffect(() => {
    setCollection(getCollection());
  }, [transactions, end, connectedAccount]);
  
  if (!connectedAccount) {
    return (
      <div className="min-h-[60vh] bg-gradient-to-b from-black via-purple-950/20 to-black py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center">
              <FaExternalLinkAlt className="text-4xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Connect Your Wallet
            </h3>
            <p className="text-gray-400">
              Please connect your wallet to view your transaction history
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-[60vh] bg-black py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent mb-2">
            {collection.length > 0 ? 'Transaction History' : 'No Transactions Yet'}
          </h2>
          {collection.length > 0 && (
            <p className="text-gray-400">Your recent NFT transactions</p>
          )}
        </div>

        {collection.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
              <FaExternalLinkAlt className="text-4xl text-gray-600" />
            </div>
            <p className="text-xl text-gray-500">
              Start collecting NFTs to see your transactions here
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collection.map((txn: any, index: number) => (
                <div 
                  key={txn.id}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/20"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-violet-500/20 rounded-lg">
                          <FaArrowRight className="text-violet-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Transaction #{txn.id}</p>
                          <p className="font-semibold text-white truncate max-w-[180px]">
                            {txn.title || 'Fund Transferred'}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-violet-400 transition-colors duration-300">
                        <FaExternalLinkAlt size={14} />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Received by</span>
                        <span className="text-sm text-white font-medium font-mono">
                          {truncate(txn.owner, 6, 4, 15)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Price</span>
                        <div className="flex items-center space-x-1">
                          <FaEthereum className="text-violet-400" />
                          <span className="text-sm text-white font-bold">{txn.cost} ETH</span>
                        </div>
                      </div>

                      {txn.timestamp && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Date</span>
                          <span className="text-xs text-gray-400">
                            {new Date(Number(txn.timestamp) * 1000).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {transactions.length > collection.length && (
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
          </>
        )}
      </div>
    </div>
  );
};

export default Transactions;