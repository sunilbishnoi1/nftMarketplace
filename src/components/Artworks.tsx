import React, { useState } from "react";
import PurchaseModal from "./Modal"; // Import purchase modal

const Artworks = () => {
    return (
        <>
        <div className="bg-gradient-to-br from-[#10001a] to-[#190727] w-full overflow-hidden">
            <div className="w-4/5 py-10 mx-auto">
                <h4 className="text-[#d1aaff] text-3xl font-bold uppercase text-gradient text-center">
                    Latest Artworks
                </h4>

                <div className="flex space-x-6 pb-4">
                    {Array.from({ length: 5 }).map((_, index) => ( // Fixed number of artworks
                        <Card key={index} nft={{
                            id: index + 1,
                            image: "nft-img1.png",
                            title: `Art-title ${index + 1}`,
                            description: "This is the description of the artwork.",
                            price: "0.05",
                        }} />
                    ))}
                </div>

                {/* Load More Button */}
                <button 
                    className="bg-[#d1aaff] text-[#10001a] px-4 py-2 mt-6 rounded-md w-40 font-semibold hover:bg-[#aa66ff] transition mx-auto block">
                    Load More
                </button>
            </div>
        </div>
        </>
    );
};

const Card = ({ nft }: { nft: any }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="bg-gradient-to-br from-[#10001a] to-[#190727] rounded-xl p-4 shadow-lg max-w-xs mx-auto 
                        transform transition-all duration-500 hover:rotate-6">
            <div className="overflow-hidden rounded-lg mb-4">
                <img
                    src={nft.image}
                    alt={nft.title}
                    className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-110 hover:rotate-6"
                />
            </div>
            <h4 className="text-[#d1aaff] text-2xl font-bold uppercase mb-1">
                {nft.title}
            </h4>
            <p className="text-[#d1aaff] text-xs mb-4 text-gradient">
                {nft.description}
            </p>
            <div className="flex justify-between items-center mt-3 text-[#d1aaff]">
                <div className="text-[#d1aaff]">
                    <small className="text-xs block">Current Price</small>
                    <p className="text-xs font-semibold">{nft.price} ETH</p>
                </div>

                {/* View Details Button */}
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-transparent border border-[#d1aaff] text-[#d1aaff] px-3 py-1 text-sm cursor-pointer rounded-full text-xs 
                               hover:bg-[#d1aaff] hover:text-black transition hover:scale-110">
                    View Details
                </button>
            </div>

            {/* NFT Purchase Modal */}
            <PurchaseModal showModal={showModal} setShowModal={setShowModal} nft={nft} />
        </div>
    );
};

export default Artworks;
