import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#6b3874] text-black text-center py-8 flex flex-col md:flex-row items-center justify-end px-12">
            {/* Left-Side Image (Unchanged) */}
            <div className="w-1/5 flex justify-center">
                <img src="/demo2.png" alt="Aurora Logo" className="w-70 h-auto rounded-md shadow-md" />
            </div>

            {/* Support & Navigation Links (Increased Spacing) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm w-4/5 pl-16">
                <div className="mb-6">  {/* Added Bottom Margin for Extra Spacing */}
                    <h3 className="font-semibold mb-4 text-[#0a030b]">Support</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-[#cb3aef] hover:text-[#3b1846] transition">Help Center</a></li>
                        <li><a href="#" className="text-[#cb3aef] hover:text-[#3b1846] transition">Aurora.xyz</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4 text-[#0a030b]">Legal</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-[#cb3aef] hover:text-[#3b1846] transition">Terms of Service</a></li>
                        <li><a href="#" className="text-[#cb3aef] hover:text-[#3b1846] transition">Privacy Notice</a></li>
                        <li><a href="#" className="text-[#cb3aef] hover:text-[#3b1846] transition">Report Content</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4 text-[#0a030b]">Community</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-[#cb3aef] hover:text-[#3b1846] transition">Community Guidelines</a></li>
                        <li><a href="#" className="text-[#cb3aef] hover:text-[#3b1846] transition">Private Sales</a></li>
                        <li><a href="#" className="text-[#cb3aef] hover:text-[#3b1846] transition">$AURORA Bridge</a></li>
                    </ul>
                </div>
            </div>

            {/* Social Media Links (Increased Spacing) */}
            <div className="mt-12 ml-35 flex justify-center gap-8 text-lg w-full px-16">
                <a href="#" className="text-[#cb3aef] hover:text-[#3b1846] transition">🐦 Twitter</a>
                <a href="#" className="text-[#cb3aef] hover:text-[#3b1846] transition">📸 Instagram</a>
                <a href="#" className="text-[#cb3aef] hover:text-[#3b1846] transition">🎥 YouTube</a>
                <a href="#" className="text-[#cb3aef] hover:text-[#3b1846] transition">👾 Reddit</a>
            </div>

            {/* Copyright Notice (Maintained Clean Spacing) */}
            <p className="mt-6 text-xs w-full text-[#cb3aef] px-90">&copy; 2025 Aurora - All Rights Reserved</p>
        </footer>
    );
};

export default Footer;
