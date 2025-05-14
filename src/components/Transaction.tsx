import React from "react";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";

const transactions = [
    { id: 1, receiver: "0x31...037e" },
    { id: 2, receiver: "0x89...12A" },
    { id: 3, receiver: "0x7B...92D" },
];

const Transaction = () => {
    return (
        <div className="bg-[#10001a] w-full p-0 m-0 border-none">
            <br /><br />
            <h3 className="text-[#d1aaff] text-2xl font-bold uppercase text-center pb-6">Latest Transactions</h3>

            {/* Horizontally aligned transaction boxes with gap */}
            <div className="flex justify-center gap-8 bg-[#10001a] p-6">
                {transactions.map((txn) => (
                    <div key={txn.id} className="bg-[#10001a] p-6 border border-[#d1aaff] w-[450px] h-[80px] flex items-center gap-8 rounded-xl shadow-lg relative animate-floatUp">
                        {/* Left Arrow Icon */}
                        <FaArrowRight className="text-[#d1aaff]" size={24} />

                        {/* Transaction Content */}
                        <p className="text-[#d1aaff] font-semibold">#{txn.id} Fund Transferred</p>
                        <span className="text-[#d1aaff] opacity-90">Received by {txn.receiver}</span>

                        {/* External Link Icon (Top-right Corner) */}
                        <FaExternalLinkAlt className="text-[#d1aaff] absolute top-2 right-2" size={16} />
                    </div>
                ))}
            </div>

            {/* Load More Button (Rounded, Moved Slightly Up) */}
            <button 
                className="bg-[#d1aaff] text-[#10001a] px-4 py-2 mt-6 mb-1 rounded-md w-40 mx-auto block font-semibold hover:bg-[#aa66ff] transition border-none">
                Load More
            </button>
            <br />
        </div>
    );
};

export default Transaction;
