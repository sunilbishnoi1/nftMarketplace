// src/components/CreateNFT.tsx
import React, { useState } from "react";
import { mintNFT, getAllNfts } from "../Blockchain.services";
import { useGlobalState, setGlobalState, setLoadingMsg, setAlert } from "../store";
import { NFTStorage, File } from "nft.storage";

// Hardcoded token (for testing purposes only).
// In production, use: 
// const MY_NFT_TOKEN = process.env.REACT_APP_MY_NFT_TOKEN;
const MY_NFT_TOKEN="7";
;

// Initialize the NFTStorage client with your token
const nftStorageClient = new NFTStorage({ token: MY_NFT_TOKEN });

// Helper function to upload NFT data
async function storeNFTData(
  file: File,
  title: string,
  description: string
): Promise<string> {
  try {
    // Wrap file in a File instance (the one expected by nft.storage)
    const nftFile = new File([file], file.name, { type: file.type });
    const metadata = await nftStorageClient.store({
      name: title,
      description: description,
      image: nftFile,
    });
    console.log("NFT metadata stored:", metadata.url);
    return metadata.url;
  } catch (error) {
    console.error("Error storing NFT metadata:", error);
    throw error;
  }
}

interface CreateNFTProps {
  setShowNFTForm: (show: boolean) => void;
}

const CreateNFT: React.FC<CreateNFTProps> = ({ setShowNFTForm }) => {
  const [modal] = useGlobalState("modal");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [imgBase64, setImgBase64] = useState<string>("");
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Validate form fields and update completion status
  const validateForm = (): void => {
    setIsComplete(title !== "" && price !== "" && description !== "" && file !== null);
  };

  // Handle the "Mint Now" action
  const handleMint = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (!title || !price || !description || !file) return;

    setGlobalState("modal", "scale-0");
    setGlobalState("loading", { show: true, msg: "Uploading NFT data..." });

    try {
      // Upload file and metadata to NFT.Storage
      const metadataURI: string = await storeNFTData(file, title, description);
      const nft = { title, price, description, metadataURI };

      setLoadingMsg("Initializing transaction...");
      const success: boolean = await mintNFT(nft);

      if (success) {
        resetForm();
        setAlert("Minting completed...", "green");
        setShowNFTForm(false);
        await getAllNfts();
      } else {
        setAlert("Minting failed...", "red");
      }
    } catch (error) {
      console.error("Error uploading NFT data: ", error);
      setAlert("Minting failed...", "red");
    }
  };

  // Reset form fields
  const resetForm = (): void => {
    setFile(null);
    setImgBase64("");
    setTitle("");
    setPrice("");
    setDescription("");
  };

  // Close modal and reset form
  const closeModal = (): void => {
    setGlobalState("modal", "scale-0");
    resetForm();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50">
      <div className="bg-[#10001a] p-6 w-[460px] rounded-lg shadow-[0px_0px_20px_#d1aaff] border-2 border-[#d1aaff] relative">
        {/* Top Row – Image Preview & Close Button */}
        <div className="flex justify-between items-center w-full mb-4">
          <img
            src="demo2.png"
            alt="NFT Preview"
            className="w-32 h-auto rounded-md shadow-purple"
          />
          <button
            onClick={() => setShowNFTForm(false)}
            className="bg-[#d1aaff] text-[#10001a] px-2 py-1 rounded-md font-semibold hover:bg-[#aa66ff] transition"
          >
            ❌
          </button>
        </div>

        {/* File Upload Input */}
        <label className="text-[#d1aaff] font-semibold block mb-2">Upload File</label>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files ? e.target.files[0] : null);
            validateForm();
          }}
          className="block w-full mb-4 text-[#d1aaff] border-2 border-[#d1aaff] p-2 rounded-md"
        />

        {/* Title Input */}
        <label className="text-[#d1aaff] font-semibold block mb-2">Title</label>
        <input
          type="text"
          placeholder="NFT Name"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            validateForm();
          }}
          className="w-full p-2 rounded-md mb-3 border-2 border-[#d1aaff] text-[#d1aaff] bg-[#190727]"
        />

        {/* Price Input */}
        <label className="text-[#d1aaff] font-semibold block mb-2">Price (ETH)</label>
        <input
          type="number"
          placeholder="Set Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            validateForm();
          }}
          className="w-full p-2 rounded-md mb-3 border-2 border-[#d1aaff] text-[#d1aaff] bg-[#190727] appearance-none"
        />

        {/* Description Input */}
        <label className="text-[#d1aaff] font-semibold block mb-2">Description</label>
        <textarea
          placeholder="Enter NFT description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            validateForm();
          }}
          className="w-full p-2 rounded-md mb-3 border-2 border-[#d1aaff] text-[#d1aaff] bg-[#190727]"
        />

        {/* Status Indicator */}
        <div className="flex justify-center items-center mb-4 min-h-[40px]">
          {isHovering && (
            <span
              className={`text-xl font-bold transition-all duration-200 ${
                isComplete ? "text-green-400" : "text-red-500"
              }`}
            >
              {isComplete ? "✅ Ready to Mint!" : "❌ Fill all fields"}
            </span>
          )}
        </div>

        {/* Mint Button */}
        <button
          onClick={handleMint}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`bg-[#d1aaff] text-[#10001a] px-4 py-2 rounded-md w-full font-semibold transition ${
            isComplete ? "hover:bg-[#aa66ff]" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Mint Now
        </button>
      </div>
    </div>
  );
};

export default CreateNFT;
