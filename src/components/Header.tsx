import React, { useState } from "react";
import {FaBars} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGlobalState, setGlobalState, setAlert, truncate } from "../store";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [connectedAccount] = useGlobalState('connectedAccount');

  const handleConnectWallet = async () => {
    try { if(true){
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
    <header className="bg-gradient-to-br from-[#10001a] via-[#10001a] to-[#190727]">
      <div className="w-4/5 mx-auto flex justify-between items-center">
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

        {/* Navigation Menu - Hidden on small screens */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 text-[#d1aaff]">
            {[
              { name: "Market", path: "/" },
              { name: "Artist", path: "/artist" },
              { name: "Features", path: "/features" },
              { name: "Community", path: "/community" },
            ].map((item) => (
              <li key={item.name}>
                <Link to={item.path}
                className="text-base font-medium cursor-pointer hover:text-[#aa66ff] transition-colors duration-300"
                >
                {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="py-4 flex items-center space-x-4">
          {/* Hamburger icon - Visible only on small screens */}
          <button
            className="md:hidden text-[#d1aaff]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars className="text-white" size={24} />
          </button>

          {/* Connect Wallet Button */}
          {connectedAccount ? (
            <div className="flex items-center space-x-2">
                <span className="py-2 px-3 rounded-md bg-gradient-to-r from-[#2b003b]/70 to-[#10001a]/70 text-sm text-white font-semibold">
                    {truncate(connectedAccount, 4, 4, 11)}
                </span>
                <button 
                    onClick={handleDisconnectWallet}
                    className="py-2 px-4 rounded-md bg-red-500/30 text-sm text-white font-semibold hover:bg-red-500/50 transition-all duration-300"
                    title="Disconnect Wallet"
                >
                    Disconnect Wallet
                </button>
            </div>
          ) : (
            <button
              onClick={handleConnectWallet}
              className="py-2 px-4 rounded-md bg-gradient-to-r from-[#2b003b] to-[#10001a] text-sm text-white font-semibold hover:from-[#4e0070] hover:to-[#220035] hover:shadow-lg transition-all duration-300"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      {/* Dropdown menu on mobile */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 absolute w-full bg-[#190727] shadow-lg z-40">
          <ul className="space-y-2 text-[#d1aaff]">
            {["Market", "Artist", "Features", "Community"].map((itemName) => ( 
              <li key={itemName}>
                <Link
                  to={itemName === "Market" ? "/" : `/${itemName.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)} 
                  className="block py-2 cursor-pointer hover:text-[#aa66ff] transition-colors duration-300"
                >
                  {itemName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;