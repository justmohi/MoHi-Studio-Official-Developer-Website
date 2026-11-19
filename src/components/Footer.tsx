import React from 'react';
import { ExternalLink, FileText, Mail, Globe } from 'lucide-react';
import { PageRoute, getPathForRoute } from '../utils/siteLogic';
import { STUDIO_CONFIG } from '../data/studioConfig';

interface FooterProps {
  onNavigate: (route: PageRoute, appSlug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, route: PageRoute, slug?: string) => {
    e.preventDefault();
    onNavigate(route, slug);
  };

  return (
    <footer className="bg-[#04070E] border-t border-slate-800/80 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/70">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a
              href={getPathForRoute('home')}
              onClick={(e) => handleNav(e, 'home')}
              className="text-xl font-bold tracking-tight text-white font-display inline-block"
            >
              {STUDIO_CONFIG.developerName}
            </a>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An independent software and mobile game development studio creating engaging Android games and useful digital applications.
            </p>
            <div className="pt-2 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Official Website:</span>
                <a
                  href={STUDIO_CONFIG.officialDomain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-cyan-400 transition-colors font-mono"
                >
                  {STUDIO_CONFIG.officialDomain}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Developer Contact (Editable):</span>
                <a
                  href={`mailto:${STUDIO_CONFIG.contactEmail}`}
                  className="text-slate-200 hover:text-cyan-400 transition-colors font-mono"
                >
                  {STUDIO_CONFIG.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-white">Studio Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={getPathForRoute('home')}
                  onClick={(e) => handleNav(e, 'home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href={getPathForRoute('apps')}
                  onClick={(e) => handleNav(e, 'apps')}
                  className="hover:text-white transition-colors"
                >
                  Apps &amp; Games Showcase
                </a>
              </li>
              <li>
                <a
                  href={getPathForRoute('app-detail', 'arrow-flow-puzzle')}
                  onClick={(e) => handleNav(e, 'app-detail', 'arrow-flow-puzzle')}
                  className="hover:text-white transition-colors"
                >
                  Arrow Flow Puzzle
                </a>
              </li>
              <li>
                <a
                  href={getPathForRoute('about')}
                  onClick={(e) => handleNav(e, 'about')}
                  className="hover:text-white transition-colors"
                >
                  About MoHi Studio
                </a>
              </li>
              <li>
                <a
                  href={getPathForRoute('contact')}
                  onClick={(e) => handleNav(e, 'contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Column */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-semibold text-white">Legal &amp; Developer Compliance</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={getPathForRoute('privacy')}
                  onClick={(e) => handleNav(e, 'privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href={getPathForRoute('terms')}
                  onClick={(e) => handleNav(e, 'terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/app-ads.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>/app-ads.txt (AdMob Authorized Seller)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors font-mono text-xs"
                >
                  <span>/sitemap.xml</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Domain Verification Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {STUDIO_CONFIG.developerName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-slate-400">
            <span>Google Play Developer Website</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-300">com.arrowflow.arrowflowpuzzle</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
