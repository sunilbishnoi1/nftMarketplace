import React, { useState } from "react";

interface Artist {
    name: string;
    image: string;
}

const artistsData: Artist[] = [
    { name: "Alice Artistry", image:"nft-img2.png" },
    { name: "Ahaan Creations", image:"nft-img2.png" },
    { name: "Bradley Brushes", image:"nft-img2.png" },
    { name: "Chris Colors", image:"nft-img2.png" },
    { name: "David Designs", image:"nft-img2.png" },
    { name: "Eleanor Expressions", image:"nft-img2.png" },
    { name: "Felix Forms", image:"nft-img2.png" },
    { name: "Grace Graphics", image:"nft-img2.png" },
    { name: "Hector Hues", image:"nft-img2.png" },
    { name: "Isabel Ink", image: "nft-img2.png" },
    { name: "Jack Jazz", image: "nft-img2.png" },
    { name: "Kira Kinetics", image: "nft-img2.png" },
    { name: "Leo Layers", image: "nft-img2.png" },
    { name: "Mia Mosaics", image: "nft-img2.png" },
    { name: "Nathanial Neons", image: "nft-img2.png" },
    { name: "Oscar Oils", image: "nft-img2.png" },
    { name: "Peter Pixels", image: "nft-img2.png" },
    { name: "Quinn Quirks", image: "nft-img2.png" },
    { name: "Riley Renders", image: "nft-img2.png" },
    { name: "Sophia Strokes", image: "nft-img2.png" },
];

const Artist = () => {
    const [hoveredArtist, setHoveredArtist] = useState<Artist | null>(null);

    return (
        <div className="bg-gradient-to-br from-[#10001a] to-[#190727] p-10 min-h-screen text-[#d1aaff]">
            <h2 className="text-3xl font-bold text-center mb-6">Featured Artists</h2>

            {/* Featured Artists Section */}
            <div className="flex flex-col items-center gap-4">
                {artistsData.map((artist) => (
                    <div 
                        key={artist.name} 
                        className="relative flex items-center justify-center w-3/4 p-3 rounded-md cursor-pointer transition-transform duration-300 hover:translate-x-3"
                        onMouseEnter={() => setHoveredArtist(artist)}
                        onMouseLeave={() => setHoveredArtist(null)}
                    >
                        {/* Artist Name (Centered) */}
                        <span className="text-xl font-semibold">{artist.name}</span>
                        
                        {/* Artist Image Appears to the Right on Hover */}
                        {hoveredArtist?.name === artist.name && (
                            <img 
                                src={artist.image} 
                                alt={artist.name} 
                                className="absolute left-[75%] w-24 h-24 rounded-md shadow-md transition-opacity duration-300"
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Footer */}
        </div>
    );
};

export default Artist;
