import React, { useState } from "react";
import ShowNFT from "./ShowNFT"; 
import type { NftType } from "../store";

const Artworks = () => {
    // Example NFT data - will replace later with useGlobalState('nft') data
    const artworksData: NftType[] = Array.from({ length: 4 }).map((_, index) => ({
        id: `artwork-${index + 1}`,
        image: `/nft-img${index + 3}.png`, 
        title: `Artistic Aura #${index + 1}`,
        description: "A unique piece of digital art from the 'Aura' collection, exploring themes of color and light.",
        price: `${index + 8}`, 
        owner: `0xOwner${index + 1}SampleAddress0000000000000000`, 
    }));


    return (
        <>
        <div className="bg-gradient-to-br from-[#10001a] to-[#190727] w-full overflow-hidden">
            <div className="w-4/5 py-10 mx-auto">
                <h4 className="text-[#d1aaff] text-3xl font-bold uppercase text-gradient">
                    Latest Artworks
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
                    {artworksData.map((nftItem) => ( 
                        <Card key={nftItem.id} nft={nftItem} />
                    ))}
                </div>

                <button 
                    className="bg-[#d1aaff] text-[#10001a] px-4 py-2 mt-6 rounded-md font-semibold hover:bg-[#aa66ff] transition mx-auto block">
                    Load More
                </button>
            </div>
        </div>
        </>
    );
};

const Card = ({ nft }: { nft: NftType }) => { 
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="bg-gradient-to-br from-[#1a032a] via-[#10001a] to-[#190727] rounded-xl p-4 shadow-lg w-full mx-auto flex flex-col justify-between cursor-pointer"
                onClick={() => setShowModal(true)}> 
                <div>
                    <div className="overflow-hidden rounded-lg mb-4 aspect-square">
                        <img
                            src={nft.image}
                            alt={nft.title}
                            className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-110"
                        />
                    </div>
                    <h4 className="text-[#d1aaff] text-xl font-bold uppercase mb-1 truncate">
                        {nft.title}
                    </h4>
                    <p className="text-[#d1aaff] text-xs mb-4 text-gradient h-10 overflow-hidden text-ellipsis">
                        {nft.description}
                    </p>
                </div>
                <div className="flex justify-between items-center mt-3 text-[#d1aaff]">
                    <div className="text-[#d1aaff]">
                        <small className="text-xs block">Current Price</small>
                        <p className="text-sm font-semibold">{nft.price} ETH</p>
                    </div>

                    <button 
                        onClick={(e) => {
                            e.stopPropagation(); // prevent bubbling to parent div
                            setShowModal(true);
                        }}
                        className="bg-transparent border border-[#d1aaff] text-[#d1aaff] px-3 py-1 text-sm cursor-pointer rounded-full 
                                hover:bg-[#d1aaff] hover:text-[#10001a] transition hover:scale-105">
                        View Details
                    </button>
                </div>
            </div>
            
            <ShowNFT showModal={showModal} setShowModal={setShowModal} nft={nft} />
        </>
    );
};

export default Artworks;