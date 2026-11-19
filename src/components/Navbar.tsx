import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageRoute, getPathForRoute } from '../utils/siteLogic';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, appSlug?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Apps & Games', route: 'apps' },
    { label: 'About', route: 'about' },
    { label: 'Privacy Policy', route: 'privacy' },
    { label: 'Terms', route: 'terms' }
  ];

  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, route: PageRoute) => {
    e.preventDefault();
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const isRouteActive = (route: PageRoute): boolean => {
    if (route === 'apps' && (currentRoute === 'apps' || currentRoute === 'app-detail')) {
      return true;
    }
    return currentRoute === route;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#060A14]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Brand Title (Single text element wordmark) */}
        <a
          href={getPathForRoute('home')}
          onClick={(e) => handleLinkClick(e, 'home')}
          className="text-xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 font-display focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
        >
          MoHi Studio
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {navItems.map((item) => {
            const active = isRouteActive(item.route);
            return (
              <a
                key={item.route}
                href={getPathForRoute(item.route)}
                onClick={(e) => handleLinkClick(e, item.route)}
                aria-current={active ? 'page' : undefined}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  active
                    ? 'text-white border-cyan-400'
                    : 'text-slate-300 border-transparent hover:text-white hover:border-slate-600'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={getPathForRoute('contact')}
            onClick={(e) => handleLinkClick(e, 'contact')}
            aria-current={currentRoute === 'contact' ? 'page' : undefined}
            className={`px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              currentRoute === 'contact'
                ? 'bg-blue-500 ring-2 ring-cyan-400/50'
                : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            Contact Studio
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg border border-slate-800 hover:border-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-slate-800/80 bg-[#0A101E] px-6 py-4 space-y-2"
        >
          {[...navItems, { label: 'Contact Studio', route: 'contact' as PageRoute }].map((item) => {
            const active = isRouteActive(item.route);
            return (
              <a
                key={item.route}
                href={getPathForRoute(item.route)}
                onClick={(e) => handleLinkClick(e, item.route)}
                aria-current={active ? 'page' : undefined}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-blue-600/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
};
