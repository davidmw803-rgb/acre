import logoImage from '@/assets/f3d311f9ce5b47db6d439b7ece56c825c2a55608.png';

interface HeaderProps {
  onReserve: () => void;
}

export function Header({ onReserve }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logoImage} alt="ACRE" className="h-8 w-8" />
          <span className="text-xl tracking-[0.25em] bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text text-transparent">ACRE</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#models" className="text-sm tracking-wide text-gray-700 hover:text-black transition-colors">
            Models
          </a>
          <a href="#technology" className="text-sm tracking-wide text-gray-700 hover:text-black transition-colors">
            Technology
          </a>
          <a href="#sustainability" className="text-sm tracking-wide text-gray-700 hover:text-black transition-colors">
            Sustainability
          </a>
          <a href="#support" className="text-sm tracking-wide text-gray-700 hover:text-black transition-colors">
            Support
          </a>
        </nav>

        {/* CTA Button */}
        <button 
          onClick={onReserve}
          className="px-6 py-2 bg-black text-white text-sm tracking-wide rounded-full hover:bg-gray-800 transition-colors"
        >
          Reserve
        </button>
      </div>
    </header>
  );
}