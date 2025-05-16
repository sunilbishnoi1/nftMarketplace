const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#10001a] to-[#d1aaff] p-4 w-full flex md:justify-center justify-between items-center flex-col">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        {/* Logo */}
        <div className="flex flex-[0.25] justify-center items-center">
            <img src="demo2.png" alt="Aurora Logo" className="w-24" />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full text-[#10001a] font-semibold uppercase">
            <a href="#" className="text-center mx-2 hover:text-[#aa66ff] transition">Market</a>
            <a href="#" className="text-center mx-2 hover:text-[#aa66ff] transition">Artists</a>
            <a href="#" className="text-center mx-2 hover:text-[#aa66ff] transition">Features</a>
            <a href="#" className="text-center mx-2 hover:text-[#aa66ff] transition">Community</a>
        </nav>

        {/* Rights Reserved */}
        <div className="flex flex-[0.25] justify-center items-center pt-4">
            <p className="text-[#10001a] text-right text-sm opacity-80">
            © 2025 All rights reserved
            </p>
        </div>
    </div>
</footer>

    );
};

export default Footer;
