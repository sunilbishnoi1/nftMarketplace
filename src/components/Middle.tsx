import React, { useState } from "react";
import NFTForm from "./CreateNFT";
import { useGlobalState, setAlert } from "../store";
import { connectWallet } from "../Blockchain.services";
import { FaPlus, FaChartLine, FaPalette, FaUsers } from "react-icons/fa";

const Middle: React.FC = () => {
  const [showNFTForm, setShowNFTForm] = useState(false);
  const [connectedAccount] = useGlobalState("connectedAccount");

  const onCreateClick = async () => {
    if (!connectedAccount) {
      setAlert("Please connect your wallet to create an NFT.", "orange");
      try {
        await connectWallet();
      } catch {}
      return;
    }
    setShowNFTForm(true);
  };

  const stats = [
    {
      icon: FaUsers,
      value: "123k+",
      label: "Active Users",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: FaPalette,
      value: "152k+",
      label: "Artworks",
      color: "from-fuchsia-500 to-pink-500",
    },
    {
      icon: FaChartLine,
      value: "200k+",
      label: "Artists",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-black pt-16">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
          {/* Hero Content */}
          <div className="text-center space-y-8 mb-20">
            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight md:leading-snug lg:leading-[1.3] overflow-visible">
                <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent animate-gradient overflow-visible">
                  Digital Art
                </span>
                <span className="block text-white mt-2">Redefined</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Discover, collect, and sell extraordinary NFTs from the world's
                most creative artists
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <button
                onClick={onCreateClick}
                className="relative group px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 group-hover:scale-105 transition-transform duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <FaPlus />
                  <span>Create NFT</span>
                </span>
              </button>

              <button className="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/50">
                Explore Marketplace
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                }}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                ></div>

                <div className="relative flex flex-col items-center space-y-4">
                  {/* Icon */}
                  <div
                    className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}
                  >
                    <stat.icon className="text-3xl text-white" />
                  </div>

                  {/* Value */}
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-white mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-gray-400 font-medium">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating elements
          <div className="absolute top-40 right-10 w-20 h-20 border-2 border-violet-500/30 rounded-lg animate-float hidden lg:block"></div>
          <div className="absolute bottom-40 left-10 w-16 h-16 border-2 border-fuchsia-500/30 rounded-full animate-float hidden lg:block" style={{ animationDelay: '1s' }}></div> */}
        </div>
      </div>

      {showNFTForm && <NFTForm setShowNFTForm={setShowNFTForm} />}
    </>
  );
};

export default Middle;
