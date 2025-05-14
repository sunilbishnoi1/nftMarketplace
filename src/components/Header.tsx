import React, { useState } from "react";
import {FaBars} from "react-icons/fa";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-br from-[#10001a] via-[#10001a] to-[#190727]">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <img
          src="/demo2.png"
          alt="Aurora Logo"
          className="w-24 h-auto"
        />

        {/* Navigation Menu - Hidden on small screens */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 text-[#d1aaff]">
            {["Market", "Artist", "Features", "Community"].map((item) => (
              <li
                key={item}
                className="text-base font-medium cursor-pointer hover:text-[#aa66ff] transition-colors duration-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Hamburger icon - Visible only on small screens */}
          <button
            className="md:hidden text-[#d1aaff]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars className="text-white" size={24} />
          </button>

          {/* Connect Wallet Button */}
          <button className="py-2 px-4 rounded-md bg-gradient-to-r from-[#2b003b] to-[#10001a] text-sm text-white font-semibold hover:from-[#4e0070] hover:to-[#220035] hover:shadow-lg transition-all duration-300">
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Optional: Dropdown menu on mobile */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="space-y-2 text-[#d1aaff]">
            {["Market", "Artist", "Features", "Community"].map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-[#aa66ff] transition-colors duration-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
