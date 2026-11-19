/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  PageRoute,
  RouteMatch,
  resolveRouteFromPath,
  getPathForRoute,
  getPageMeta
} from './utils/siteLogic';
import { APPLICATIONS_CATALOG } from './data/applications';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AppsPage } from './pages/AppsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';

export default function App() {
  const [routeMatch, setRouteMatch] = useState<RouteMatch>(() =>
    resolveRouteFromPath(window.location.pathname)
  );

  const syncDocumentHead = useCallback((match: RouteMatch) => {
    const targetApp = match.appSlug
      ? APPLICATIONS_CATALOG.find((a) => a.slug === match.appSlug)
      : APPLICATIONS_CATALOG[0];

    const meta = getPageMeta(match.route, targetApp);
    document.title = meta.title;

    const updateMetaTag = (selector: string, attr: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attr, content);
      }
    };

    updateMetaTag('meta[name="description"]', 'content', meta.description);
    updateMetaTag('meta[property="og:title"]', 'content', meta.title);
    updateMetaTag('meta[property="og:description"]', 'content', meta.description);
    updateMetaTag('meta[property="og:url"]', 'content', meta.canonicalUrl);
    updateMetaTag('meta[name="twitter:title"]', 'content', meta.title);
    updateMetaTag('meta[name="twitter:description"]', 'content', meta.description);
    updateMetaTag('link[rel="canonical"]', 'href', meta.canonicalUrl);
  }, []);

  useEffect(() => {
    syncDocumentHead(routeMatch);
  }, [routeMatch, syncDocumentHead]);

  useEffect(() => {
    const handlePopState = () => {
      setRouteMatch(resolveRouteFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: PageRoute, appSlug?: string) => {
    const targetPath = getPathForRoute(route, appSlug);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setRouteMatch({ route, appSlug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (routeMatch.route) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'apps':
        return <AppsPage onNavigate={handleNavigate} />;
      case 'app-detail':
        return (
          <AppsPage
            selectedAppSlug={routeMatch.appSlug || 'arrow-flow-puzzle'}
            onNavigate={handleNavigate}
          />
        );
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPolicyPage onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsOfServicePage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060A14] text-[#F8FAFC]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:text-xs focus:font-semibold focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Navbar currentRoute={routeMatch.route} onNavigate={handleNavigate} />
      <main id="main-content" className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

