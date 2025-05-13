import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      {/* Logo */}
      <img src="/demo.png" alt="Aurora Exchange Logo" className="header-logo" />

      {/* Navigation Menu */}
      <nav>
        <ul className="nav-links">
          <li>Market</li>
          <li>Artist</li>
          <li>Features</li>
          <li>Community</li>
        </ul>
      </nav>

      {/* Connect Wallet Button */}
      <button className="wallet-button">Connect Wallet</button>
    </header>
  );
};

export default Header;
