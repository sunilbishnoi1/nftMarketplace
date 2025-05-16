import { FaTimes } from "react-icons/fa";
import { useGlobalState, setGlobalState, setLoadingMsg, setAlert } from "../store";
import React,{ useState, useEffect } from "react";



function UpdateNFT() {
    const [modal] = useGlobalState('updateModal')
    const [nft] = useGlobalState('nft')
    const [price, setPrice] = useState('')

    useEffect(() => {
        if (nft && modal === 'scale-100') { 
            setPrice(String(nft.price)); 
        }
        if (modal === 'scale-0') {
            setPrice(''); 
        }
    }, [nft, modal]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!price || parseFloat(price) <= 0) {
            setAlert('Price must be greater than zero.', 'red');
            return;
        }
        if (!nft) {
            setAlert('No NFT selected for update.', 'red');
            return;
        }

        setLoadingMsg('Updating NFT price...');
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // when backend is ready, we'll call contract or backend here
        // For example: updateNFTPriceOnChain(nft.id, price);

        setGlobalState('loading', {show: false, msg: ''}); // Hide loading
        setAlert('NFT Price Updated Successfully!', 'green');
        setGlobalState('updateModal', 'scale-0'); // Close modal

        // Optionally, refresh NFT list or the specific NFT data globally if needed
        // setGlobalState('nft', { ...nft, price: price }); // Update local global NFT if shown elsewhere
    };


    const closeModal = () => {
        setGlobalState('updateModal', 'scale-0');
    }

    if (modal === 'scale-0') {
        return null; 
    }


    return (
        <div className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50 transform transition-opacity duration-300 ${modal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-gradient-to-br from-[#10001a] to-[#190727] shadow-xl shadow-[#d1aaff] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <form className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-[#d1aaff] semi-bold">nft?.title</p>  
                        <button
                            type="button"
                            onClick={()=>setGlobalState('updateModal', 'scale-0')}
                            className="border-0 bg-transparent focus:outline-none">
                            <FaTimes className="text-[#d1aaff]"/>
                            </button>
                    </div>

                    <div className="flex flex-row justify-center items-center rounded-xl mt-5">
                        <input
                            className="block w-full text-sm text-[#d1aaff] bg-transparent border-1 focus:outline-none focus:ring-0"
                            type="number"
                            step={0.01}
                            min={0.01}
                            name="price"
                            placeholder="Price (ETH)"
                            onChange={(e)=> setPrice(e.target.value)}
                            required
                        /> 
                    </div>

                    <button
                        type="submit"
                        className="flex flex-row justify-center items-center w-full bg-[#d1aaff] text-[#10001a] text-md px-4 py-2 mt-6 rounded-full drop-shadow-xl border border-transparent font-semibold hover:bg-transparent hover:text-[#d1aaff] hover:border-[#d1aaff] focus:outline-none focus:ring mt-5"
                        // onClick={handleSubmit}
                    >
                        Update Now
                    </button>
                    
                </form>
            </div>
        </div>
    );
}

export default UpdateNFT;