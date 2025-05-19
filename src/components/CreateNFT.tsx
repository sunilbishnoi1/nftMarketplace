import React, { useState } from "react";
import Web3 from "web3";
import { setGlobalState, getGlobalState, setAlert } from "../store";
import type { NftType } from "../store";

// Declare global window type to fix TypeScript error
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
  const [isHovering, setIsHovering] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  // Validate form inputs
  const validateForm = () => {
    setIsComplete(!!(title && price && description && file));
  };

  // Check wallet connection before minting
  const isWalletConnected = () => {
    const connectedAccount = getGlobalState("connectedAccount") as string;
    return connectedAccount && window.ethereum;
  };

  // Handle NFT minting process
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

      // Simulate NFT minting (Replace with actual smart contract call)
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

      // Store NFT in global state
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
      <div className="bg-[#10001a] p-4 w-[400px] min-h-[320px] rounded-lg shadow-[0px_0px_15px_#d1aaff] border-2 border-[#d1aaff] relative flex flex-col">

  {/* Aurora Image at the Top */}


    {/* Close Button - Fixed to Top-Right */}
     <button
     onClick={() => setShowNFTForm(false)}
     className="absolute top-3 right-3 bg-[#d1aaff] text-[#10001a] px-3 py-1 rounded-md font-bold hover:bg-[#aa66ff] transition">
    ❌
     </button>
        {/* Wallet Connection Indicator */}
        {!isWalletConnected() && (
          <div className="bg-red-600 text-white p-3 rounded-md text-center font-semibold mb-3">
            🚨 Wallet Not Connected! Please connect before minting.
          </div>
        )}

        {/* NFT Form */}
        <label className="text-[#d1aaff] font-semibold block mb-2">Upload File</label>
        <input type="file" onChange={(e) => { setFile(e.target.files ? e.target.files[0] : null); validateForm(); }}
          className="block w-full mb-3 text-[#d1aaff] border-2 border-[#d1aaff] p-2 rounded-md" />

        <label className="text-[#d1aaff] font-semibold block mb-2">Title</label>
        <input type="text" placeholder="NFT Name" value={title} 
          onChange={(e) => { setTitle(e.target.value); validateForm(); }}
          className="w-full p-2 rounded-md mb-2 border-2 border-[#d1aaff] text-[#d1aaff] bg-[#190727]" />

        <label className="text-[#d1aaff] font-semibold block mb-2">Price (ETH)</label>
        <input type="number" placeholder="Set Price" value={price} 
          onChange={(e) => { setPrice(e.target.value); validateForm(); }}
          className="w-full p-2 rounded-md mb-2 border-2 border-[#d1aaff] text-[#d1aaff] bg-[#190727]" />

        <label className="text-[#d1aaff] font-semibold block mb-2">Description</label>
        <textarea placeholder="Enter NFT description" value={description} 
          onChange={(e) => { setDescription(e.target.value); validateForm(); }}
          className="w-full p-2 rounded-md mb-2 border-2 border-[#d1aaff] text-[#d1aaff] bg-[#190727]" />

        {/* Mint Status Indicator */}
        <div className="flex justify-center items-center mb-4 min-h-[40px]">
          {isWalletConnected() && isComplete ? (
            <span className="text-green-400 text-xl font-bold">✅ Ready to Mint!</span>
          ) : (
            <span className="text-red-500 text-xl font-bold">❌ Fill all fields</span>
          )}
        </div>

        {/* Mint Button */}
        <button disabled={!isWalletConnected() || !isComplete}
          className={`px-4 py-2 rounded-md w-full font-semibold transition ${
            !isWalletConnected() || !isComplete ? "bg-gray-500 cursor-not-allowed" : "bg-[#d1aaff] text-[#10001a] hover:bg-[#aa66ff]"
          }`}>
          {isMinting ? "Minting..." : "Mint Now"}
        </button>
      </div>
    </div>
  );
};

export default NFTForm;
