import React, { useState } from "react";

const NFTForm = ({ setShowNFTForm }: { setShowNFTForm: (val: boolean) => void }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [isHovering, setIsHovering] = useState(false); // Tracks hover state

    // Check if all fields are filled
    const validateForm = () => {
        if (title && price && description && file) {
            setIsComplete(true);
        } else {
            setIsComplete(false);
        }
    };

    // Handle Mint Now action
    const handleMint = () => {
        if (isComplete) {
            alert("NFT Successfully Minted! 🚀");
            setShowNFTForm(false); // Auto-close form after successful submission
        } else {
            alert("Please fill all fields to proceed. ❌");
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50">
            <div className="bg-[#10001a] p-6 w-[460px] rounded-lg shadow-[0px_0px_20px_#d1aaff] border-2 border-[#d1aaff] relative">
                
                {/* Top Row - Image & Close Button */}
                <div className="flex justify-between items-center w-full mb-4">
                    <img src="demo2.png" alt="NFT Preview" className="w-32 h-auto rounded-md shadow-purple"/>
                    <button 
                        onClick={() => setShowNFTForm(false)}
                        className="bg-[#d1aaff] text-[#10001a] px-2 py-1 rounded-md font-semibold hover:bg-[#aa66ff] transition">
                        ❌
                    </button>
                </div>

                {/* Choose File */}
                <label className="text-[#d1aaff] font-semibold block mb-2">Upload File</label>
                <input 
                    type="file" 
                    onChange={(e) => { setFile(e.target.files ? e.target.files[0] : null); validateForm(); }}
                    className="block w-full mb-4 text-[#d1aaff] border-2 border-[#d1aaff] p-2 rounded-md"/>

                {/* Title */}
                <label className="text-[#d1aaff] font-semibold block mb-2">Title</label>
                <input 
                    type="text" 
                    placeholder="NFT Name" 
                    value={title} 
                    onChange={(e) => { setTitle(e.target.value); validateForm(); }}
                    className="w-full p-2 rounded-md mb-3 border-2 border-[#d1aaff] text-[#d1aaff] bg-[#190727]"/>

                {/* Price */}
                <label className="text-[#d1aaff] font-semibold block mb-2">Price (ETH)</label>
                <input 
                    type="number" 
                    placeholder="Set Price" 
                    value={price} 
                    onChange={(e) => { setPrice(e.target.value); validateForm(); }}
                    className="w-full p-2 rounded-md mb-3 border-2 border-[#d1aaff] text-[#d1aaff] bg-[#190727] appearance-none"/>

                {/* Description */}
                <label className="text-[#d1aaff] font-semibold block mb-2">Description</label>
                <textarea 
                    placeholder="Enter NFT description" 
                    value={description} 
                    onChange={(e) => { setDescription(e.target.value); validateForm(); }}
                    className="w-full p-2 rounded-md mb-3 border-2 border-[#d1aaff] text-[#d1aaff] bg-[#190727]"/>
{/* Status Indicator (Appears only when hovering over Mint Now) */}
<div className="flex justify-center items-center mb-4 min-h-[40px]">
    {isHovering && (
        <span className={`text-xl font-bold transition-all duration-200 ${isComplete ? 'text-green-400' : 'text-red-500'}`}>
            {isComplete ? "✅ Ready to Mint!" : "❌ Fill all fields"}
        </span>
    )}
</div>

{/* Mint Button */}
<button 
    onClick={handleMint}
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
    className={`bg-[#d1aaff] text-[#10001a] px-4 py-2 rounded-md w-full font-semibold transition ${isComplete ? 'hover:bg-[#aa66ff]' : 'opacity-50 cursor-not-allowed'}`}>
    Mint Now
</button>

            </div>
        </div>
    );
};

export default NFTForm;
