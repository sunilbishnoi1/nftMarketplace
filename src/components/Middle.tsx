import React, { useState } from "react";
import NFTForm from "./CreateNFT"; // Import NFTForm component

const Middle: React.FC = () => {
    const [showNFTForm, setShowNFTForm] = useState(false);

    return (
        <div className="bg-gradient-to-br from-[#10001a] to-[#190727] justify-between mx-auto py-10 items-center">
            <div className="justify-center items-center">
                <div>
                    <h2 className="text-[#d1aaff] text-5xl font-bold text-center">
                        Buy and Sell Digital Arts, NFT Collections
                    </h2>
                    <p className="text-gray-500 font-semibold text-sm mt-3 text-center">
                        Mint and collect the hottest NFTs around.
                    </p>
                </div>

                {/* Create NFT Button */}
                <button 
                    onClick={() => setShowNFTForm(true)} // Opens the NFT form
                    className="px-6 py-3 bg-gradient-to-r from-[#3f0d63] to-[#1a0033] rounded-lg text-white text-base cursor-pointer mx-auto block mt-5 hover:from-[#5b009f] hover:to-[#320067] hover:shadow-[0px_0px_15px_#d1aaff] transition-all duration-300">
                    Create NFT
                </button>
            </div>

            {/* NFT Form - Appears when "Create NFT" is clicked */}
            {showNFTForm && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50">
                    <NFTForm setShowNFTForm={setShowNFTForm} /> 
                </div>
            )}

            {/* Stats Section */}
            <div className="flex justify-center gap-10 items-center mb-8 mt-8">
                {/* Stats */}
                {[["123k", "Users"], ["152k", "Artworks"], ["200k", "Artists"]].map(([count, label]) => (
                    <div key={label} className="bg-[rgba(60,20,100,0.3)] p-4 rounded-lg min-w-[120px]">
                        <h3 className="text-xl text-white text-center font-bold">{count}</h3>
                        <p className="text-white text-center">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Middle;