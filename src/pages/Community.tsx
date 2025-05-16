import { useState } from 'react';
import { useGlobalState } from '../store';

const Community = () => {
    const [activeTab, setActiveTab] = useState('artists');
    const [searchQuery, setSearchQuery] = useState('');

    // Dummy data for demonstration
    const artists = [
        { id: 1, name: 'Digital Dreams', wallet: '0x31...037e', items: 12, followers: '1.2k' },
        { id: 2, name: 'Crypto Canvas', wallet: '0x89...12A', items: 8, followers: 890 },
        { id: 3, name: 'NFT Nova', wallet: '0x7B...92D', items: 15, followers: '2.3k' },
    ];

    const discussions = [
        { id: 1, title: 'Future of NFT Art', author: 'CryptoGuru', replies: 23, likes: 45 },
        { id: 2, title: 'Best Practices for NFT Artists', author: 'ArtMaster', replies: 15, likes: 32 },
        { id: 3, title: 'Market Trends 2025', author: 'NFTAnalyst', replies: 38, likes: 67 },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#10001a] to-[#190727]">
            {/* Header Section */}
            <div className="w-4/5 mx-auto pt-8 pb-6">
                <h1 className="text-[#d1aaff] text-4xl font-bold mb-4">Community Hub</h1>
                
                {/* Search Bar */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Search artists, discussions..."
                        className="w-full bg-[#190727] text-[#d1aaff] border-2 border-[#d1aaff] rounded-lg px-4 py-2 focus:outline-none focus:border-[#aa66ff]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#d1aaff]">🔍</span>
                </div>

                {/* Navigation Tabs */}
                <div className="flex space-x-4 border-b border-[#d1aaff]/30">
                    <button
                        onClick={() => setActiveTab('artists')}
                        className={`px-4 py-2 ${
                            activeTab === 'artists'
                            ? 'text-[#d1aaff] border-b-2 border-[#d1aaff]'
                            : 'text-[#d1aaff]/60 hover:text-[#d1aaff]'
                        }`}
                        >
                        Top Artists
                        </button>

                        <button
                        onClick={() => setActiveTab('discussions')}
                        className={`px-4 py-2 ${
                            activeTab === 'discussions'
                            ? 'text-[#d1aaff] border-b-2 border-[#d1aaff]'
                            : 'text-[#d1aaff]/60 hover:text-[#d1aaff]'
                        }`}
                        >
                        Discussions
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-4/5 mx-auto pb-12">
                {activeTab === 'artists' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {artists.map((artist) => (
                            <div key={artist.id} className="bg-[#190727]/50 rounded-xl p-6 border border-[#d1aaff]/20 hover:border-[#d1aaff]/50 transition">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-12 h-12 bg-[#d1aaff] rounded-full"></div>
                                    <div>
                                        <h3 className="text-[#d1aaff] font-bold">{artist.name}</h3>
                                        <p className="text-[#d1aaff]/60 text-sm">{artist.wallet}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between text-[#d1aaff]/80">
                                    <span>{artist.items} Items</span>
                                    <span>{artist.followers} Followers</span>
                                </div>
                                <button className="w-full mt-4 bg-[#d1aaff] text-[#10001a] py-2 rounded-lg font-semibold hover:bg-[#aa66ff] transition">
                                    Follow Artist
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {discussions.map((discussion) => (
                            <div key={discussion.id} className="bg-[#190727]/50 rounded-xl p-6 border border-[#d1aaff]/20 hover:border-[#d1aaff]/50 transition">
                                <h3 className="text-[#d1aaff] font-bold text-xl mb-2">{discussion.title}</h3>
                                <p className="text-[#d1aaff]/60 mb-4">Posted by {discussion.author}</p>
                                <div className="flex space-x-4 text-[#d1aaff]/80">
                                    <span>💬 {discussion.replies} Replies</span>
                                    <span>❤️ {discussion.likes} Likes</span>
                                </div>
                            </div>
                        ))}
                        <button className="w-full mt-6 bg-[#d1aaff] text-[#10001a] py-3 rounded-lg font-semibold hover:bg-[#aa66ff] transition">
                            Start New Discussion
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Community;