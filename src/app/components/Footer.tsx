import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin } from 'lucide-react';
import logoImage from '@/assets/f3d311f9ce5b47db6d439b7ece56c825c2a55608.png';

export function Footer() {
  return (
    <footer className="py-16 px-8 bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="ACRE" className="h-8 w-8" />
            <span className="text-xl tracking-[0.25em] bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text text-transparent">
              ACRE
            </span>
          </Link>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/reserve" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Reserve
            </Link>
            <Link to="/partners" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Manufacturing Partners
            </Link>
            <a href="#careers" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Careers
            </a>
            <a href="#privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Privacy
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a href="#" aria-label="Acre on Twitter" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Acre on Instagram" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Acre on LinkedIn" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-500">
          © 2026 ACRE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
