import React from "react";

const PurchaseModal = ({ showModal, setShowModal, nft }: { showModal: boolean; setShowModal: (val: boolean) => void; nft: any }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.6)] z-50">
            <div className="bg-[#10001a] p-6 w-[500px] rounded-lg shadow-md border-2 border-[#d1aaff] relative">
                <h2 className="text-[#d1aaff] text-xl font-bold text-center">Purchase NFT</h2>

                {/* Close Button */}
                <button 
                    onClick={() => setShowModal(false)}
                    className="absolute top-3 right-3 bg-[#d1aaff] text-[#10001a] px-3 py-1 rounded-md font-semibold hover:bg-[#aa66ff] transition">
                    ❌
                </button>

                {/* NFT Details */}
                <div className="mt-4 text-[#d1aaff] text-center">
                    <img src={nft.image} alt="NFT Preview" className="w-48 h-auto mx-auto rounded-md shadow-md"/>
                    <p className="mt-4"><strong>ID:</strong> {`0x${String(nft.id).slice(0,4)}...${String(nft.id).slice(-4)}`}</p>
                    <p><strong>Title:</strong> {nft.title}</p>
                    <p><strong>Description:</strong> {nft.description}</p>
                    <p><strong>Current Price:</strong> {nft.price} ETH</p>
                </div>

                {/* Purchase Button */}
                <button 
                    className="bg-[#d1aaff] text-[#10001a] px-4 py-2 mt-6 rounded-md w-full font-semibold hover:bg-[#aa66ff] transition">
                    Purchase Now
                </button>
            </div>
        </div>
    );
};

export default PurchaseModal;
