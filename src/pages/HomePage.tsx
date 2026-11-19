import React from 'react';
import {
  ArrowRight,
  ExternalLink,
  Smartphone,
  Cpu,
  Layers,
  ShieldCheck,
  Code2,
  Compass,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { PageRoute, getPathForRoute } from '../utils/siteLogic';
import { APPLICATIONS_CATALOG } from '../data/applications';
import { STUDIO_CONFIG, HERO_VISUAL_PATH } from '../data/studioConfig';
import { ResilientImage } from '../components/ResilientImage';

interface HomePageProps {
  onNavigate: (route: PageRoute, appSlug?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const featuredApp = APPLICATIONS_CATALOG[0];

  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    route: PageRoute,
    appSlug?: string
  ) => {
    e.preventDefault();
    onNavigate(route, appSlug);
  };

  return (
    <div className="space-y-24 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-800/80 overflow-hidden">
        {/* Subtle electric blue & cyan radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/10 to-transparent blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Column: Brand Positioning & Value Proposition */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-cyan-400">
                  <span>Independent Mobile Game &amp; Software Studio</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-300">mohistudio.pro.bd</span>
                </div>

                <h1
                  className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.1] font-display"
                  style={{ textWrap: 'balance' }}
                >
                  Crafting Strategic Android Games &amp; Purposeful Digital Applications
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  <strong className="text-white font-semibold">MoHi Studio</strong> is an
                  independent software and mobile game development studio creating engaging Android
                  games and useful digital applications engineered for responsive controls, visual
                  clarity, and lasting replayability.
                </p>
              </div>

              <div className="space-y-6 pt-2">
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={getPathForRoute('apps')}
                    onClick={(e) => handleNav(e, 'apps')}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <span>Explore Apps &amp; Games</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={getPathForRoute('app-detail', featuredApp.slug)}
                    onClick={(e) => handleNav(e, 'app-detail', featuredApp.slug)}
                    className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-[#0F172A] hover:bg-slate-800/90 border border-slate-700/80 rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <span>View Arrow Flow Puzzle</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400">
                  <span>Featured Release: <strong className="text-slate-200">{featuredApp.name}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Platform: <strong className="text-slate-200">{featuredApp.platform}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-cyan-400">{featuredApp.packageName}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Architectural Visual */}
            <div className="lg:col-span-5 flex">
              <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-[#0A101E] flex flex-col justify-end min-h-[340px] lg:h-full">
                <ResilientImage
                  src={HERO_VISUAL_PATH}
                  alt="MoHi Studio spatial geometry and puzzle architecture"
                  containerClassName="absolute inset-0 w-full h-full"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-[#060A14]/45 to-transparent" />
                <div className="relative z-10 p-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-cyan-300 font-medium">
                    <span>MoHi Studio Architecture</span>
                    <span aria-hidden="true">·</span>
                    <span>Android Engineering</span>
                  </div>
                  <p className="text-sm font-medium text-white leading-snug">
                    Designed around tactile geometry, deterministic puzzle logic, and distraction-free user interfaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED MOBILE GAMES AND APPLICATIONS */}
      <section aria-labelledby="featured-release-heading" className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="text-xs font-medium text-cyan-400">
              <span>Featured Android Release</span>
              <span aria-hidden="true"> · </span>
              <span>Official Catalog</span>
            </div>
            <h2
              id="featured-release-heading"
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display"
            >
              Featured Mobile Games &amp; Applications
            </h2>
          </div>

          <a
            href={getPathForRoute('apps')}
            onClick={(e) => handleNav(e, 'apps')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Open Full Application Showcase</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Flagship App Spotlight Container */}
        <div className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* App Identity & Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <ResilientImage
                  src={featuredApp.iconUrl}
                  alt={`${featuredApp.name} official app icon`}
                  containerClassName="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-slate-700/80 shrink-0 bg-[#060A14]"
                  className="w-full h-full object-cover"
                />
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="text-cyan-400 font-medium">{featuredApp.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredApp.platform}</span>
                    <span aria-hidden="true">·</span>
                    <span>Developer: {featuredApp.developer}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    {featuredApp.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-300">
                    Package ID: {featuredApp.packageName}
                  </p>
                </div>
              </div>

              <p className="text-base text-slate-300 leading-relaxed">
                {featuredApp.shortDescription}
              </p>

              {/* Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {featuredApp.features.slice(0, 4).map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">{feature.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-slate-800/80">
                <a
                  href={getPathForRoute('app-detail', featuredApp.slug)}
                  onClick={(e) => handleNav(e, 'app-detail', featuredApp.slug)}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Inspect Screenshots &amp; Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={featuredApp.googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 hover:text-white bg-[#131C31] hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Google Play Store Listing</span>
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                </a>
              </div>
            </div>

            {/* Preview Screenshots Strip */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {featuredApp.screenshots.map((shot) => (
                  <a
                    key={shot.id}
                    href={getPathForRoute('app-detail', featuredApp.slug)}
                    onClick={(e) => handleNav(e, 'app-detail', featuredApp.slug)}
                    className="group block rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/60 transition-all bg-[#060A14]"
                  >
                    <div className="aspect-[9/16] w-full overflow-hidden">
                      <ResilientImage
                        src={shot.imageUrl}
                        alt={`${featuredApp.name} — ${shot.title}`}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  </a>
                ))}
              </div>
              <p className="text-xs text-slate-400 text-center mt-3">
                Select any preview to inspect full-resolution gameplay boards and technical details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STUDIO CAPABILITIES */}
      <section aria-labelledby="capabilities-heading" className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl space-y-2 mb-12">
          <div className="text-xs font-medium text-cyan-400">
            <span>Core Engineering &amp; Design</span>
            <span aria-hidden="true"> · </span>
            <span>What We Build</span>
          </div>
          <h2
            id="capabilities-heading"
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display"
          >
            Studio Capabilities
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            MoHi Studio combines structured systems engineering with tactile visual design to ship reliable Android games and digital utilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-cyan-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              01. Android Mobile Game Engineering
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We design and build puzzle and strategy games tailored specifically for Android touch screens. From deterministic board state logic in titles like Arrow Flow Puzzle to responsive frame pacing across diverse device profiles, every interaction is tuned for clarity.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span>Interactive Puzzle Mechanics</span>
              <span aria-hidden="true">·</span>
              <span>Level Progression Systems</span>
              <span aria-hidden="true">·</span>
              <span>Touch Gesture Precision</span>
            </div>
          </div>

          <div className="md:col-span-5 rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              02. Digital Utility &amp; Software Development
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Beyond mobile games, MoHi Studio develops practical software applications focused on clean workflows, fast startup times, and intuitive interfaces that solve everyday digital tasks without bloat.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span>Clean Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Modern UI Systems</span>
            </div>
          </div>

          <div className="md:col-span-5 rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              03. UI/UX &amp; Spatial Visual Systems
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Complex puzzle mechanics require immediate visual comprehension. We craft high-contrast color hierarchies, readable typography, and subtle motion cues that guide players naturally without intrusive tutorials.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span>High-Contrast Readability</span>
              <span aria-hidden="true">·</span>
              <span>Accessible Controls</span>
            </div>
          </div>

          <div className="md:col-span-7 rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              04. Performance Optimization &amp; Lifecycle Support
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We prioritize lightweight package footprints, stable memory management, and adherence to Google Play platform standards—including transparent privacy disclosures and authorized advertising integration via app-ads.txt.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span>Google Play Compliance</span>
              <span aria-hidden="true">·</span>
              <span>Battery-Conscious Rendering</span>
              <span aria-hidden="true">·</span>
              <span>Ongoing Maintenance</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE MOHI STUDIO & DEVELOPMENT PHILOSOPHY */}
      <section className="bg-[#090F1D] border-y border-slate-800/80 py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {/* Why Choose MoHi Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-3">
              <div className="text-xs font-medium text-cyan-400">
                <span>Player &amp; User Commitment</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
                Why Choose MoHi Studio
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Every application bearing the MoHi Studio name is built around respect for the user&apos;s time, device resources, and cognitive focus.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-[#0C1426] border border-slate-800/90 space-y-2.5">
                <Layers className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white font-display">
                  Intentional Game Mechanics
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Our puzzle systems rely on fair, deterministic rules where every stage can be solved through logical deduction rather than guesswork.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#0C1426] border border-slate-800/90 space-y-2.5">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white font-display">
                  Clean, Uncluttered Polish
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We eliminate visual noise so players can focus immediately on the puzzle board or application workflow from the first launch.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#0C1426] border border-slate-800/90 space-y-2.5">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white font-display">
                  Transparent Policies
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We maintain clear privacy documentation, accessible user support channels, and verified publisher standards across our catalog.
                </p>
              </div>
            </div>
          </div>

          {/* Development Philosophy */}
          <div className="pt-12 border-t border-slate-800/80">
            <div className="max-w-3xl space-y-3 mb-10">
              <div className="text-xs font-medium text-cyan-400">
                <span>Engineering Principles</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
                Our Development Philosophy
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Great mobile software feels effortless on the surface because the underlying architecture is disciplined. We follow four core tenets across every release:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400">Principle 01</span>
                <h3 className="text-base font-bold text-white font-display">
                  Clarity Over Complexity
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Depth should come from emergent puzzle combinations and clean utility, never from confusing menus or obscure controls.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400">Principle 02</span>
                <h3 className="text-base font-bold text-white font-display">
                  Responsive Feedback
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Every tap, swipe, and sequence trigger responds immediately with crisp visual confirmation and smooth transitions.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400">Principle 03</span>
                <h3 className="text-base font-bold text-white font-display">
                  Iterative Refinement
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  We test level layouts, difficulty curves, and interface ergonomics carefully to ensure balanced progression.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400">Principle 04</span>
                <h3 className="text-base font-bold text-white font-display">
                  Long-Term Maintainability
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Modular codebases allow us to expand our application catalog and keep existing releases updated for modern Android versions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT CALL-TO-ACTION */}
      <section aria-labelledby="home-cta-heading" className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl bg-gradient-to-br from-[#0F1B33] via-[#0C1322] to-[#080D1A] border border-slate-800 p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-medium text-cyan-400">
              <span>Support, Feedback &amp; Inquiries</span>
            </div>
            <h2
              id="home-cta-heading"
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display"
            >
              Have Questions About Our Apps or Need Player Support?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Reach out to the MoHi Studio team for support with <strong className="text-white">Arrow Flow Puzzle</strong>, general feedback, press questions, or privacy inquiries.
            </p>
            <p className="text-xs text-slate-400 font-mono">
              Official Contact: {STUDIO_CONFIG.contactEmail}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href={getPathForRoute('contact')}
              onClick={(e) => handleNav(e, 'contact')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <span>Contact MoHi Studio</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={getPathForRoute('about')}
              onClick={(e) => handleNav(e, 'about')}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-[#131C31] hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <span>About the Studio</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
