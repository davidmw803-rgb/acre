import { Link, useLocation } from 'react-router-dom';
import logoImage from '@/assets/f3d311f9ce5b47db6d439b7ece56c825c2a55608.png';

interface HeaderProps {
  onReserve: () => void;
  ctaLabel?: string;
  variant?: 'landing' | 'partners';
}

const LANDING_NAV = [
  { label: 'Models', hash: 'models' },
  { label: 'Technology', hash: 'technology' },
  { label: 'Traction', hash: 'traction' },
];

const PARTNERS_NAV = [
  { label: 'Opportunity', hash: 'opportunity' },
  { label: 'Capabilities', hash: 'capabilities' },
  { label: 'Contact', hash: 'contact' },
];

export function Header({ onReserve, ctaLabel = 'Reserve', variant = 'landing' }: HeaderProps) {
  const location = useLocation();
  const isPartners = variant === 'partners';
  const items = isPartners ? PARTNERS_NAV : LANDING_NAV;
  const onPage = location.pathname === (isPartners ? '/partners' : '/');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImage} alt="ACRE" className="h-8 w-8" />
          <span className="text-xl tracking-[0.25em] bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text text-transparent">
            ACRE
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {items.map((item) =>
            onPage ? (
              <a
                key={item.hash}
                href={`#${item.hash}`}
                className="text-sm tracking-wide text-gray-700 hover:text-black transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <a
                key={item.hash}
                href={`${isPartners ? '/partners' : '/'}#${item.hash}`}
                className="text-sm tracking-wide text-gray-700 hover:text-black transition-colors"
              >
                {item.label}
              </a>
            )
          )}
          {/* Cross-page link */}
          <Link
            to={isPartners ? '/' : '/partners'}
            className="text-sm tracking-wide text-gray-500 hover:text-black transition-colors"
          >
            {isPartners ? 'Consumer Site' : 'Partners'}
          </Link>
        </nav>

        {/* CTA Button */}
        <button
          onClick={onReserve}
          className="px-6 py-2 bg-black text-white text-sm tracking-wide rounded-full hover:bg-gray-800 transition-colors"
        >
          {ctaLabel}
        </button>
      </div>
    </header>
  );
}
