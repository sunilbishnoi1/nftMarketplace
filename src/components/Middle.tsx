import React from "react";
const Middle: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#10001a] to-[#190727] justify-between mx-auto py-10 items-center ">
      <div className="justify-center items-center">
      <div>
      <h2 className="text-[#d1aaff] text-5xl font-bold text-center">
        Buy and Sell Digital Arts, NFT Collections
      </h2>
      <p className="text-gray-500 font-semibold text-sm mt-3 text-center">
        Mint and collect the hottest NFTs around.
      </p>
    </div>
      {/* Call to Action Button */}
      <button className="px-6 py-3 bg-gradient-to-r from-[#3f0d63] to-[#1a0033] rounded-lg text-white text-base cursor-pointer mx-auto block mt-5 hover:from-[#5b009f] hover:to-[#320067] hover:shadow-[0_4px_12px_rgba(94,33,140,0.3)] transition-all duration-300">
        Create NFT
      </button>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center gap-10 items-center mb-8 mt-8">
        <div className="bg-[rgba(60,20,100,0.3)] p-4 rounded-lg min-w-[120px]">
          <h3 className="text-xl text-white font-bold">123k</h3>
          <p className="text-white">Users</p>
        </div>
        <div className="bg-[rgba(60,20,100,0.3)] p-4 rounded-lg min-w-[120px]">
          <h3 className="text-xl text-white font-bold">152k</h3>
          <p className="text-white">Artworks</p>
        </div>
        <div className="bg-[rgba(60,20,100,0.3)] p-4 rounded-lg min-w-[120px]">
          <h3 className="text-xl text-white font-bold">200k</h3>
          <p className="text-white">Artists</p>
        </div>
      </div>

      
    </div>
  );
};

export default Middle;
