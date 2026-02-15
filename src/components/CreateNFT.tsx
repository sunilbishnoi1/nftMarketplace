import React, { useState } from "react";
import { mintNFT, getAllNfts } from "../Blockchain.services";
import { setGlobalState, setLoadingMsg, setAlert } from "../store";
import { uploadNFT } from "../services/FilebaseService";
import { FaTimes, FaCloudUploadAlt, FaCheckCircle } from "react-icons/fa";

type CreateNFTProps = { setShowNFTForm: (show: boolean) => void };

const CreateNFT = (props: CreateNFTProps) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setTitle('');
    setPrice('');
    setDescription('');
  };

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFileChange(droppedFile);
    }
  };

  const handleMint = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!title || !price || !description || !file) return;

    setGlobalState('modal', 'scale-0');
    setLoadingMsg('Uploading NFT to IPFS...');

    try {
      const metadataURL = await uploadNFT(file, title, description);
      setLoadingMsg('Initializing transaction...');
      
      const success = await mintNFT({ title, description, metadataURI: metadataURL, price });

      if (success) {
        setAlert('Mint successful! Your NFT has been minted on-chain.', 'green');
        props.setShowNFTForm(false);
        resetForm();
        await getAllNfts();
      } else {
        setAlert('Minting failed...', 'red');
      }
    } catch (error) {
      console.error('Error during minting/upload: ', error);
      setAlert('Minting failed...', 'red');
    }
  };

  const isFormValid = title && price && description && file;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-md z-50 p-4">
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-3xl blur-2xl opacity-20"></div>
        
        <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative px-8 py-6 border-b border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10"></div>
            <div className="relative flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Create Your NFT
              </h2>
              <button
                onClick={() => props.setShowNFTForm(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>

          <div className="p-8 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">Upload Artwork</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 overflow-hidden max-w-md mx-auto ${
                  isDragging ? 'border-violet-500 bg-violet-500/10' : 'border-white/20 hover:border-white/40'
                }`}
              >
                {preview ? (
                  <div className="relative group">
                    <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <label className="cursor-pointer px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300">
                        Change Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-40 cursor-pointer group">
                    <FaCloudUploadAlt className="text-6xl text-gray-500 group-hover:text-violet-500 transition-colors duration-300 mb-4" />
                    <p className="text-gray-400 group-hover:text-white transition-colors duration-300 mb-2">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">Title</label>
              <input
                type="text"
                placeholder="Enter NFT name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">Price (ETH)</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
                  step="0.001"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">ETH</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">Description</label>
              <textarea
                placeholder="Describe your NFT..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 resize-none"
              />
            </div>

            {isFormValid && (
              <div className="flex items-center space-x-2 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                <FaCheckCircle className="text-green-400" />
                <span className="text-green-400 font-medium">Ready to mint!</span>
              </div>
            )}

            <button
              onClick={handleMint}
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden group ${
                isFormValid 
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/50' 
                  : 'bg-gray-700 cursor-not-allowed opacity-50'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-xl opacity-0 ${isFormValid && 'group-hover:opacity-50'} transition-opacity duration-300`}></div>
              <span className="relative z-10">Mint NFT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
