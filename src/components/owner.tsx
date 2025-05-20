import React, { useState } from "react";
import type { NftType } from "../store";

const Artworks = () => {
    const ownerAddress = "0xA7B3C6D9EFA1234567890BCDEF001234567890AB";

    const artworksData: NftType[] = Array.from({ length: 4 }).map((_, index) => ({
        id: `artwork-${index + 1}`,
        image: `/nft-img${index + 3}.png`, 
        title: `Artistic Aura #${index + 1}`,
        description: "A unique piece of digital art from the 'Aura' collection, exploring themes of color and light.",
        price: String(index + 8), 
        owner: ownerAddress,
    }));

    return (
        <div className="bg-gradient-to-br from-[#10001a] to-[#190727] w-full overflow-hidden">
            <div className="w-4/5 py-10 mx-auto">
                <h4 className="text-[#d1aaff] text-3xl font-bold uppercase text-gradient">
                    Your Artworks
                </h4>

                <div className="text-[#d1aaff] text-lg mb-4">
                    <strong>Owner:</strong> You <br />
                    <strong>Address:</strong> {ownerAddress}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
                    {artworksData.map((nftItem) => ( 
                        <Card key={nftItem.id} nft={nftItem} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Card = ({ nft }: { nft: NftType }) => {
    const [showModal, setShowModal] = useState(false);
    const [price, setPrice] = useState<string>(String(nft.price));

    const updatePrice = () => {
        const newPrice = prompt("Enter new price in ETH:", price);
        if (newPrice !== null && newPrice.trim() !== "") {
            setPrice(newPrice);
        }
    };

    return (
        <>
            <div className="bg-gradient-to-br from-[#1a032a] via-[#10001a] to-[#190727] rounded-xl p-4 shadow-lg w-full mx-auto flex flex-col justify-between cursor-pointer"
                onClick={() => setShowModal(true)}> 
                <div>
                    <div className="overflow-hidden rounded-lg mb-4 aspect-square">
                        <img src={nft.image} alt={nft.title} className="h-full w-full object-cover hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="text-[#d1aaff] text-xl font-bold uppercase mb-1 truncate">{nft.title}</h4>
                    <p className="text-[#d1aaff] text-xs mb-4 h-10 overflow-hidden">{nft.description}</p>
                </div>

                <div className="flex justify-between items-center mt-3 text-[#d1aaff]">
                    <div>
                        <small className="text-xs block">Current Price</small>
                        <p className="text-sm font-semibold">{price} ETH</p>
                    </div>

                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowModal(true);
                        }}
                        className="border border-[#d1aaff] px-3 py-1 text-sm cursor-pointer rounded-full hover:bg-[#d1aaff] hover:text-[#10001a] transition">
                        View Details
                    </button>
                </div>
            </div>

            {/* Modal Box with Two Options (Change Price & Purchase) */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-[#10001a] p-6 rounded-lg shadow-xl max-w-sm w-full text-[#d1aaff]">
                        <h4 className="text-xl font-bold">{nft.title}</h4>
                        <p className="text-sm mt-2">{nft.description}</p>

                        <div className="mt-4">
                            <small className="block text-xs">Current Price</small>
                            <p className="text-sm font-semibold">{price} ETH</p>
                        </div>

                        <div className="flex flex-col mt-4 space-y-2">
                            <button 
                                className="bg-[#d1aaff] text-[#10001a] px-4 py-2 rounded-md font-semibold hover:bg-[#aa66ff] transition"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updatePrice();
                                }}>
                                Change Price
                            </button>

                            <button 
                                className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    alert(`Purchased ${nft.title} for ${price} ETH`);
                                }}>
                                Purchase Now
                            </button>

                            {/* Close Button */}
                            <button 
                                className="bg-red-500 text-white px-3 py-1 rounded-md font-semibold hover:bg-red-700 transition"
                                onClick={() => setShowModal(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Artworks;
