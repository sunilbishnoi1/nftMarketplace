import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#10001a] to-[#d1aaff] w-full py-6">
    <div className="w-4/5 mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="w-32 h-auto">
            <img src="demo2.png" alt="Aurora Logo" className="w-full h-auto" />
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-8 text-[#10001a] font-semibold uppercase">
            <a href="#" className="hover:text-[#aa66ff] transition">Market</a>
            <a href="#" className="hover:text-[#aa66ff] transition">Artists</a>
            <a href="#" className="hover:text-[#aa66ff] transition">Features</a>
            <a href="#" className="hover:text-[#aa66ff] transition">Community</a>
        </nav>

        {/* Rights Reserved */}
        <div className="text-[#10001a] text-sm opacity-80">
            © 2025 All rights reserved
        </div>
    </div>
</footer>

    );
};

export default Footer;
