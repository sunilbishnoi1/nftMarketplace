import React, { useState } from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGlobalState, setGlobalState, setAlert, truncate } from "../store";
import { connectWallet } from "../Blockchain.services";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [connectedAccount] = useGlobalState('connectedAccount');

  const handleConnectWallet = async () => {
    try { 
      if(true){
        setAlert("Connect Wallet is not implemented yet", "orange");
      }  
    } catch (error: any) {
      console.error("Wallet connection error:", error);
      setAlert(error.message || "Failed to connect wallet.", "red");
    }
  };

  const handleDisconnectWallet = () => {
    setGlobalState('connectedAccount', '');
    setAlert("Wallet Disconnected.", "orange");
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
        {/* Logo */}
        <div className="w-32 h-auto">
        <img
          src="/demo2.png"
          alt="Aurora Logo"
          className="w-24 h-auto cursor-pointer"
          onClick={() => {
            window.location.href = "/"; 
          }
        }
        />
        </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { name: "Market", path: "/" },
              { name: "Artist", path: "/artist" },
              { name: "Features", path: "/features" },
              { name: "Community", path: "/community" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Wallet & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-gray-300 hover:text-white transition-colors p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Wallet Button */}
            {connectedAccount ? (
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative px-4 py-2.5 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-white">
                      {truncate(connectedAccount, 4, 4, 11)}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={handleDisconnectWallet}
                  className="relative group px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-all duration-300"
                >
                  <span className="relative z-10">Disconnect</span>
                  <div className="absolute inset-0 bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="relative group px-6 py-2.5 overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-all duration-300 group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <span className="relative z-10 text-sm font-semibold text-white">
                  Connect Wallet
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 py-4 space-y-2 bg-black/40 backdrop-blur-xl border-t border-white/10">
          {[
            { name: "Market", path: "/" },
            { name: "Artist", path: "/artist" },
            { name: "Features", path: "/features" },
            { name: "Community", path: "/community" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;