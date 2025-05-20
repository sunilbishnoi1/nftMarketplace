import React, { useState } from "react";
import { mintNFT, getAllNfts } from "../Blockchain.services";
import {useGlobalState, setGlobalState, setLoadingMsg, setAlert} from "../store";
import {create} from 'ipfs-http-client'

const projectId = process.env.REACT_APP_IPFS_PROJECT_ID
const projectSecret = process.env.REACT_APP_INFURIA_API

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
})

const CreateNFT = ({ setShowNFTForm }: { setShowNFTForm: (show: boolean) => void }) => {
    const [modal] = useGlobalState('modal')
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [imgBase64, setImgBase64] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const [isHovering, setIsHovering] = useState(false); 

    // Check if all fields are filled
    const validateForm = () => {
        if (title && price && description && file) {
            setIsComplete(true);
        } else {
            setIsComplete(false);
        }
    };

    // Handle Mint Now action
    const handleMint = async(e: React.MouseEvent<HTMLButtonElement>) => {
        if (!title || !price || !description) return

        setGlobalState('modal', 'scale-0')
        setGlobalState('loading', { show: true, msg: 'Uploading IPFS data...' })

        try {
            const created = await client.add(file!)
            const metadataURI = `https://ipfs.io/ipfs/${created.path}`
            const nft = { title, price, description, metadataURI }

            setLoadingMsg('Initializing transaction...')
            const success = await mintNFT(nft)

            if (success) {
                resetForm()
                setAlert('Minting completed...', 'green')
                setShowNFTForm(false)
                // Refresh NFT list instead of reloading the page
                await getAllNfts()
            } else {
                setAlert('Minting failed...', 'red')
            }
        } catch (error) {
            console.log('Error uploading file: ', error)
            setAlert('Minting failed...', 'red')
        }
    }

    // const changeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const reader = new FileReader()
    //     if (!e.target.files || !e.target.files[0]) return;
    //     const selectedFile = e.target.files[0];
    //     reader.readAsDataURL(selectedFile)

    //     reader.onload = (readerEvent) => {
    //         if (!readerEvent.target?.result) return;
    //         const file = readerEvent.target.result as string
    //         setImgBase64(file)
    //         setFile(selectedFile)
    //     }
    // }

    const closeModal = () => {
        setGlobalState('modal', 'scale-0')
        resetForm()
    }

    const resetForm = () => {
        setFile(null)
        setImgBase64('')
        setTitle('')
        setPrice('')
        setDescription('')
    }

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

export default CreateNFT;
