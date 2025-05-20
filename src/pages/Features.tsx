import React from "react";
import { Link } from "react-router-dom";

const Features = () => {
    return (
        <div className="bg-[#2a0b36] text-[#d1aaff] min-h-screen p-12">
            {/* Header Section */}
            <h1 className="text-4xl font-bold text-center text-[#cb3aef] mb-12">Unlock the Power of Aurora</h1>
            <p className="text-lg text-center max-w-3xl mx-auto mb-12">
                Experience an immersive, seamless, and secure NFT marketplace powered by innovation. 
                Aurora is designed to elevate creators, collectors, and investors through a unique ecosystem. 🚀
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
                {/* NFT Marketplace */}
                <div className="bg-[#3b1846] p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-[#cb3aef] mb-4">🎨 NFT Marketplace</h3>
                    <p className="text-[#d1aaff]">
                        Discover, buy, sell, and manage NFTs with a **user-friendly interface** and advanced filtering tools.
                        Multi-chain support ensures secure transactions across different networks.
                    </p>
                </div>

                {/* Security & Trust */}
                <div className="bg-[#3b1846] p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-[#cb3aef] mb-4">🛡️ Security & Trust</h3>
                    <p className="text-[#d1aaff]">
                        Blockchain-powered **authentication** ensures NFT ownership security, with **end-to-end encryption** 
                        protecting transactions and **smart contract audits** preventing fraud.
                    </p>
                </div>

                {/* Community Engagement */}
                <div className="bg-[#3b1846] p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-[#cb3aef] mb-4">🤝 Community Engagement</h3>
                    <p className="text-[#d1aaff]">
                        Support a **decentralized community** where users can **vote on key decisions** and 
                        enjoy rewards, collaborations, and personalized profiles to showcase their collections.
                    </p>
                </div>

                {/* Analytics & Insights */}
                <div className="bg-[#3b1846] p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-[#cb3aef] mb-4">📈 Advanced Analytics</h3>
                    <p className="text-[#d1aaff]">
                        Stay ahead with **real-time NFT values, market trends, and heatmaps** that guide decision-making.
                        Portfolio insights help users optimize their collections.
                    </p>
                </div>

                {/* Fast Transactions */}
                <div className="bg-[#3b1846] p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-[#cb3aef] mb-4">⚡ Lightning Transactions</h3>
                    <p className="text-[#d1aaff]">
                        Experience **low-cost, fast transactions**, optimized for minimal gas fees and instant payments.
                        Cross-chain compatibility guarantees seamless NFT swaps.
                    </p>
                </div>

                {/* Exclusive Drops */}
                <div className="bg-[#3b1846] p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-[#cb3aef] mb-4">🎭 Exclusive Collectibles</h3>
                    <p className="text-[#d1aaff]">
                        Participate in **timed auctions, mystery drops, and exclusive collaborations** with leading artists.
                        Limited edition NFTs bring unique benefits.
                    </p>
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
                <h2 className="text-3xl font-semibold text-[#cb3aef] mb-4">Join Aurora Today!</h2>
                <p className="text-lg max-w-2xl mx-auto mb-6">
                    Become part of the future of digital art, trading, and decentralized ownership. 🚀
                </p>
                
                {/* Button Redirects to Main Page */}
                <Link to="/">
                    <button className="bg-[#cb3aef] text-[#2a0b36] px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#d1aaff] hover:text-[#3b1846] transition">
                        Explore Marketplace
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Features;
