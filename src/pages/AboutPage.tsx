import React from 'react';
import {
  Target,
  Compass,
  Gamepad2,
  Code2,
  Sparkles,
  Rocket,
  ArrowRight,
  Globe,
  Mail
} from 'lucide-react';
import { PageRoute, getPathForRoute } from '../utils/siteLogic';
import { STUDIO_CONFIG } from '../data/studioConfig';

interface AboutPageProps {
  onNavigate: (route: PageRoute, appSlug?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    route: PageRoute,
    appSlug?: string
  ) => {
    e.preventDefault();
    onNavigate(route, appSlug);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 space-y-16">
      {/* 1. STUDIO INTRODUCTION */}
      <section className="pb-12 border-b border-slate-800/80">
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-medium text-cyan-400">
            <span>About the Developer</span>
            <span aria-hidden="true"> · </span>
            <span className="font-mono text-slate-300">{STUDIO_CONFIG.officialDomain}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display">
            About MoHi Studio
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            <strong className="text-white font-semibold">MoHi Studio</strong> is an independent
            software and mobile game development studio creating engaging Android games and useful
            digital applications.
          </p>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            We focus on building thoughtfully structured digital products—combining clean visual
            interfaces, responsive touch interactions, and dependable software engineering. Our
            flagship Android puzzle release,{' '}
            <a
              href={getPathForRoute('app-detail', 'arrow-flow-puzzle')}
              onClick={(e) => handleNav(e, 'app-detail', 'arrow-flow-puzzle')}
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
            >
              Arrow Flow Puzzle
            </a>
            , exemplifies our dedication to strategic spatial gameplay and clean design.
          </p>
        </div>
      </section>

      {/* 2. MISSION AND VISION */}
      <section aria-labelledby="mission-vision-heading" className="space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-medium text-cyan-400">
            <span>Core Purpose &amp; Direction</span>
          </div>
          <h2
            id="mission-vision-heading"
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display"
          >
            Mission &amp; Vision
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-cyan-400">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">Our Mission</h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              To design and publish polished, accessible Android mobile games and practical digital
              applications that engage the mind, respect user privacy, and deliver reliable
              performance across everyday mobile devices.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">Our Vision</h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              To grow a trusted catalog of original puzzle games and utility software recognized by
              players and users for intuitive mechanics, visual clarity, and long-term engineering
              quality.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MOBILE GAME DEVELOPMENT & 4. SOFTWARE AND APPLICATION DEVELOPMENT */}
      <section aria-labelledby="disciplines-heading" className="space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-medium text-cyan-400">
            <span>Development Disciplines</span>
          </div>
          <h2
            id="disciplines-heading"
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display"
          >
            What We Create
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mobile Game Development */}
          <div className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-8 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-cyan-400 font-medium">Discipline 01</span>
                <h3 className="text-xl font-bold text-white font-display">
                  Mobile Game Development
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Our game development practice centers on logic, spatial reasoning, and strategic
              progression. When building Android games such as{' '}
              <strong className="text-white">Arrow Flow Puzzle</strong> (
              <code className="font-mono text-xs text-cyan-300">
                com.arrowflow.arrowflowpuzzle
              </code>
              ), we focus on:
            </p>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-mono text-xs mt-1">01.</span>
                <span>
                  <strong className="text-white">Deterministic Puzzle Design:</strong> Crafting
                  arrow escape arrangements and obstacle sequences that reward foresight and
                  careful planning.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-mono text-xs mt-1">02.</span>
                <span>
                  <strong className="text-white">Tactile Touch Responsiveness:</strong> Ensuring
                  low-latency input handling and smooth directional animations on Android screens.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-mono text-xs mt-1">03.</span>
                <span>
                  <strong className="text-white">Balanced Progression Curves:</strong> Introducing
                  new board densities and tactical mechanics gradually so players can master rules
                  naturally.
                </span>
              </li>
            </ul>
          </div>

          {/* Software and Application Development */}
          <div className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-8 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-cyan-400 font-medium">Discipline 02</span>
                <h3 className="text-xl font-bold text-white font-display">
                  Software &amp; Application Development
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Alongside gaming, MoHi Studio develops digital applications designed to simplify
              tasks and deliver dependable everyday utility. Our software development approach
              emphasizes:
            </p>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-mono text-xs mt-1">01.</span>
                <span>
                  <strong className="text-white">Focused Utility:</strong> Building features that
                  directly solve user needs without unnecessary complexity or bloated menus.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-mono text-xs mt-1">02.</span>
                <span>
                  <strong className="text-white">Resource Efficiency:</strong> Writing clean,
                  modular code that launches quickly, conserves battery life, and runs reliably.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-mono text-xs mt-1">03.</span>
                <span>
                  <strong className="text-white">Platform Standards:</strong> Maintaining strict
                  compatibility with modern Android guidelines, security practices, and transparent
                  data policies.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. INNOVATION AND USER EXPERIENCE & 6. FUTURE DEVELOPMENT GOALS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 rounded-2xl bg-[#090F1D] border border-slate-800/90 p-8 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-white font-display">
            Innovation &amp; User Experience
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            At MoHi Studio, innovation means refining how players and users interact with the screen
            every second. We prioritize high-contrast dark interfaces that reduce eye strain, crisp
            geometric iconography that communicates direction and state without ambiguity, and
            accessible layouts that adapt seamlessly across mobile viewports.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            By pairing clean aesthetic restraint with responsive feedback loops, we ensure our games
            and applications remain intuitive for first-time users while offering depth for
            experienced players.
          </p>
        </div>

        <div className="lg:col-span-6 rounded-2xl bg-[#090F1D] border border-slate-800/90 p-8 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Rocket className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-white font-display">
            Future Development Goals
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Our roadmap focuses on continuous improvement of our existing releases alongside new
            concepts in the puzzle and digital utility space:
          </p>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">·</span>
              <span>
                Expanding stage arrangements, mechanics, and performance refinements for{' '}
                <strong className="text-white">Arrow Flow Puzzle</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">·</span>
              <span>
                Prototyping new logic and spatial puzzle titles for the Android ecosystem.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">·</span>
              <span>
                Developing practical digital tools and software utilities built on modern cross-platform web and mobile technologies.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* OFFICIAL DEVELOPER IDENTITY SUMMARY */}
      <section className="rounded-2xl bg-[#0C1322] border border-slate-800 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white font-display">
            Official Studio &amp; Developer Verification
          </h2>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Website:</span>
              <strong className="font-mono text-white">{STUDIO_CONFIG.officialDomain}</strong>
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Contact (Editable):</span>
              <strong className="font-mono text-white">{STUDIO_CONFIG.contactEmail}</strong>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={getPathForRoute('apps')}
            onClick={(e) => handleNav(e, 'apps')}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            <span>View Apps &amp; Games</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={getPathForRoute('contact')}
            onClick={(e) => handleNav(e, 'contact')}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-[#131C31] hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            <span>Contact Studio</span>
          </a>
        </div>
      </section>
    </div>
  );
};
