import React from 'react';
const Middle: React.FC = () => {
  return (
    <div className="middle">
      <h2>Buy and Sell Digital Arts, NFT Collections</h2>
      <p>Mint and collect the hottest NFTs around.</p>

      {/* Call to Action Button */}
      <button className="create-nft">Create NFT</button>

      {/* Statistics Section - Now in Horizontal Layout */}
      <div className="stats">
        <div className="stat">
          <h3>123k</h3>
          <p>Users</p>
        </div>
        <div className="stat">
          <h3>152k</h3>
          <p>Artworks</p>
        </div>
        <div className="stat">
          <h3>200k</h3>
          <p>Artists</p>
        </div>
      </div>

      {/* Latest Artworks Section */}
      <div className="latest-artworks">
        <h2>Latest Artworks</h2>
        <div className="artwork-grid">
          <div className="main-artwork">
            {/* NFT Main Image */}
            <img src="logo192.png" alt="Main Artwork" className="animated-image" />
          </div>
          <div className="artwork-row">
            <img src="mix.png" alt="Artwork 1" className="animated-image" />
            <img src="mix.png" alt="Artwork 2" className="animated-image" />
            <img src="mix.png" alt="Artwork 3" className="animated-image" />
            <img src="mix.png" alt="Artwork 4" className="animated-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Middle;
