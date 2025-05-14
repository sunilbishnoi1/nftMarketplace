import { useEffect, useState } from "react";

const Artworks = () => {
    return (
        <>
        <div className="bg-gradient-to-br from-[#10001a] to-[#190727]">
            <div className="w-4/5 py-10 mx-auto">
                <h4 className="text-[#d1aaff] text-3xl font-bold uppercase text-gradient">
                    Latest Artworks
                </h4>

                <div className="flex overflow-x-auto space-x-6 pb-4">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
        </>
    )
}


const Card = () => {
    return (
        <div className="bg-gradient-to-br from-[#10001a] to-[#190727] rounded-xl p-4 shadow-lg max-w-xs mx-auto">
            <div className="overflow-hidden rounded-lg mb-4">
                <img
                    src="nft-img1.png"
                    alt="artwork-1"
                    className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-105"
                />
            </div>
            <h4 className="text-[#d1aaff] text-2xl font-bold uppercase mb-1">
                Art-title 1
            </h4>
            <p className="text-[#d1aaff] text-xs mb-4 text-gradient">
                this is the description of the artwork
            </p>
            <div className="flex justify-between items-center mt-3 text-[#d1aaff]">
                <div className="text-[#d1aaff]">
                    <small className="text-xs block">Current Price</small>
                    <p className="text-xs font-semibold">0.05 ETH</p>
                </div>

                <button className="bg-transparent border border-[#d1aaff] text-[#d1aaff] px-3 py-1 text-sm cursor-pointer rounded-full text-xs hover:bg-[#d1aaff] hover:text-black transition" > View Details</button>
            </div>
        </div>
    )
}

export default Artworks