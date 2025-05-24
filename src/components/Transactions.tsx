import React, { useEffect, useState } from "react";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import { useGlobalState, truncate } from '../store';

interface Transaction {
    id: number;
    receiver: string;
}

const Transactions = () => {
    const [transactions] = useGlobalState('transactions');
    const [end, setEnd] = useState(3);
    const [count] = useState(3)
    const [collection, setCollection] = useState<Transaction[]>([]);

    const getCollection = () => {
        return transactions.slice(0, end);
    }
    
    useEffect(() => {
        setCollection(getCollection());
    }, [transactions, end]);
    
    return (
        <div className="bg-gradient-to-br from-[#10001a] to-[#190727] w-full overflow-hidden">
            <div className="w-4/5 py-10 mx-auto">
            <h4 className="text-[#d1aaff] text-3xl font-bold uppercase text-gradient">
                {collection.length > 0 ? 'Latest Transactions' : 'No transactions yet'}
                </h4>

            {/* Horizontally aligned transaction boxes with gap */}
            <div className="flex overflow-x-auto space-x-6 p-6">
                {collection.map((txn) => (
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

            {/* Load More Button*/}
            {collection.length > 0 && transactions.length > collection.length ? (
                <button 
                    className="bg-[#d1aaff] text-[#10001a] px-4 py-2 mt-6 mb-1 rounded-md mx-auto block font-semibold hover:bg-[#aa66ff] transition border-none"
                    onClick={() => setEnd(end + count)}>
                    Load More
            </button>
            ) : null}
            </div>
        </div>
    );
};

export default Transactions;
