import React, { useState } from "react";
import Web3 from "web3";
import { setGlobalState, getGlobalState, setAlert } from "../store";
import type { NftType } from "../store";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const NFTForm = ({ setShowNFTForm }: { setShowNFTForm: (val: boolean) => void }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const validateForm = () => {
    setIsComplete(!!(title && price && description && file));
  };

  const isWalletConnected = () => {
    const connectedAccount = getGlobalState("connectedAccount") as string;
    return connectedAccount && window.ethereum;
  };

  const handleMint = async () => {
    if (!isWalletConnected()) {
      setAlert("🚨 Wallet not connected! Please connect before minting.", "orange");
      return;
    }

    if (!isComplete) {
      setAlert("❌ Please fill all fields to mint your NFT.", "red");
      return;
    }

    try {
      setIsMinting(true);
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();

      const mockTransactionHash = `0x${Math.random().toString(16).slice(2, 18)}`;
      setTransactionHash(mockTransactionHash);

      const newNFT: NftType = {
        id: Date.now(),
        title,
        price,
        description,
        image: URL.createObjectURL(file!),
        owner: accounts[0],
      };

      const currentNfts = getGlobalState("nfts") as NftType[];
      setGlobalState("nfts", [...currentNfts, newNFT]);

      setAlert("✅ NFT Minted Successfully!", "green");
      setIsMinting(false);
      setShowNFTForm(false);
    } catch (error: any) {
      setIsMinting(false);
      console.error("Minting failed:", error);
      setAlert(error.message || "Failed to mint NFT.", "red");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50">
      <div className="bg-[#10001a] p-6 w-[540px] min-h-[500px] rounded-lg shadow-[0px_0px_15px_#d1aaff] border-2 border-[#d1aaff] relative flex flex-col items-center">

        {/* NFT Image - Centrally Placed */}
        <img src="/demo2.png" alt="NFT Preview"
          className="w-[120px] h-[20px] object-cover rounded-md mb-6" />

        {/* Close Button - Moved to the Right Inline with ❌ */}
        <button
          onClick={() => setShowNFTForm(false)}
          className="absolute top-3 right-3 bg-[#d1aaff] text-[#10001a] px-3 py-1 rounded-md font-bold hover:bg-[#aa66ff] transition flex items-center"
        >
          ❌ <span className="ml-2">Close</span>
        </button>

        {/* Wallet Connection Indicator - Space Reserved to Prevent UI Shift */}
        <div className="w-full min-h-[20px] flex justify-center items-center">
          <div
            className={`bg-red-600 text-white p-2 rounded-md text-center font-semibold w-full transition-opacity duration-300 ${
              isWalletConnected() ? "opacity-0" : "opacity-100"
            }`}
          >
            🚨 Wallet Not Connected! Please connect before minting.
          </div>
        </div>

        {/* NFT Form Fields - With Spaced Layout */}
        <label className="text-[#d1aaff] font-semibold block w-full mb-2">Upload File</label>
        <input type="file" onChange={(e) => { setFile(e.target.files ? e.target.files[0] : null); validateForm(); }}
          className="w-full mb-4 text-[#d1aaff] border-2 border-[#d1aaff] p-2 rounded-md" />

        <label className="text-[#d1aaff] font-semibold block w-full mb-2">Title</label>
        <input type="text" placeholder="NFT Name" value={title} 
          onChange={(e) => { setTitle(e.target.value); validateForm(); }}
          className="w-full p-2 rounded-md mb-4 border-2 border-[#d1aaff] text-[#d1aaff] bg-[#190727]" />

        <label className="text-[#d1aaff] font-semibold block w-full mb-2">Price (ETH)</label>
        <input type="number" placeholder="Set Price" value={price} 
          onChange={(e) => { setPrice(e.target.value); validateForm(); }}
          className="w-full p-2 rounded-md mb-4 border-2 border-[#d1aaff] text-[#d1aaff] bg-[#190727]" />

        <label className="text-[#d1aaff] font-semibold block w-full mb-2">Description</label>
        <textarea placeholder="Enter NFT description" value={description} 
          onChange={(e) => { setDescription(e.target.value); validateForm(); }}
          className="w-full p-2 rounded-md mb-6 border-2 border-[#d1aaff] text-[#d1aaff] bg-[#190727]" />

        {/* Mint Button with Hover Effect for Validation Message */}
        <div className="relative w-full">
          <button
            disabled={!isWalletConnected() || !isComplete}
            className={`px-4 py-3 rounded-md w-full font-semibold transition group ${
              !isWalletConnected() || !isComplete ? "bg-gray-500 cursor-not-allowed" : "bg-[#d1aaff] text-[#10001a] hover:bg-[#aa66ff]"
            }`}
          >
            {isMinting ? "Minting..." : "Mint Now"}
          </button>

          {/* "Fill all fields" Tooltip - Shows only on hover when form is incomplete */}
          {!isComplete && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-red-500 text-white text-sm p-2 rounded-md transition">
              ❌ Fill all fields
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTForm;
