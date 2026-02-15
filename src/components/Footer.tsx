import { FaTwitter, FaDiscord, FaInstagram, FaTelegram } from "react-icons/fa";

const Footer = () => {
  const footerLinks = {
    marketplace: ["Explore", "Artists", "Collections", "Activity"],
    company: ["About", "Careers", "Support", "Blog"],
    resources: ["Help Center", "Partners", "Documentation", "Community"],
  };

  const socialLinks = [
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaDiscord, href: "#", label: "Discord" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaTelegram, href: "#", label: "Telegram" },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 to-black pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <img
                  src="/demo2.png"
                  alt="Aurora Logo"
                  className="w-12 h-12 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Aurora
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              The premier marketplace for discovering, collecting, and trading extraordinary digital art and NFTs.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="group p-3 bg-white/5 hover:bg-gradient-to-br hover:from-violet-600 hover:to-fuchsia-600 border border-white/10 rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="text-lg text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-bold text-lg mb-4 capitalize">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-12 mb-12">
          <div className="max-w-md mx-auto text-center space-y-4">
            <h3 className="text-xl font-bold text-white">Stay Updated</h3>
            <p className="text-gray-400 text-sm">Subscribe to get the latest NFT drops and marketplace updates</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/50">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © 2025 Aurora NFT Marketplace. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-violet-400 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-violet-400 transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-violet-400 transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;