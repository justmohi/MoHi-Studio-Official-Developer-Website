import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Search,
  CheckCircle2,
  Copy,
  Check,
  Smartphone,
  Shield,
  Info,
  PlusCircle
} from 'lucide-react';
import { PageRoute, getPathForRoute, filterApplications } from '../utils/siteLogic';
import { APPLICATIONS_CATALOG, StudioApplication } from '../data/applications';
import { ResilientImage } from '../components/ResilientImage';

interface AppsPageProps {
  selectedAppSlug?: string;
  onNavigate: (route: PageRoute, appSlug?: string) => void;
}

export const AppsPage: React.FC<AppsPageProps> = ({ selectedAppSlug, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
  const [copiedPackageId, setCopiedPackageId] = useState<string | null>(null);

  const categories = ['all', 'Puzzle Game', 'Android'];
  const filteredApps = filterApplications(APPLICATIONS_CATALOG, searchQuery, selectedCategory);

  const selectedApp: StudioApplication | undefined = selectedAppSlug
    ? APPLICATIONS_CATALOG.find((a) => a.slug === selectedAppSlug)
    : undefined;

  const isUnknownSlug = Boolean(selectedAppSlug && !selectedApp);

  React.useEffect(() => {
    setActiveScreenshotIndex(0);
  }, [selectedAppSlug]);

  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    route: PageRoute,
    appSlug?: string
  ) => {
    e.preventDefault();
    onNavigate(route, appSlug);
  };

  const handleCopyPackage = (pkg: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pkg).catch(() => {});
    }
    setCopiedPackageId(pkg);
    setTimeout(() => setCopiedPackageId(null), 2000);
  };

  // Dedicated Application Detail View (or featured showcase)
  const renderAppDetail = (app: StudioApplication) => {
    const activeShot = app.screenshots[activeScreenshotIndex] || app.screenshots[0];

    return (
      <div className="space-y-12">
        {/* App Header Card */}
        <div className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <ResilientImage
                src={app.iconUrl}
                alt={`${app.name} official icon`}
                containerClassName="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-slate-700/80 shrink-0 bg-[#060A14]"
                className="w-full h-full object-cover"
              />
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="text-cyan-400 font-medium">{app.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Platform: {app.platform}</span>
                  <span aria-hidden="true">·</span>
                  <span>Developer: {app.developer}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
                  {app.name}
                </h2>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <span className="text-xs font-mono text-slate-300">
                    Package: <strong className="text-cyan-300">{app.packageName}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyPackage(app.packageName)}
                    aria-label={`Copy package name ${app.packageName}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-md border border-slate-700 transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedPackageId === app.packageName ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied ID</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Copy Package ID</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Google Play Download CTA */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
              <a
                href={app.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 transition-colors whitespace-nowrap shrink-0"
              >
                <Smartphone className="w-4 h-4" />
                <span>Get it on Google Play</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              {app.isGooglePlayLinkPlaceholder && (
                <span className="text-[11px] text-slate-400 font-mono">
                  Editable Store URL via src/data/applications.ts
                </span>
              )}
            </div>
          </div>

          {/* Description & Technical Metadata Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-bold text-white font-display">
                About {app.name}
              </h3>
              {app.fullDescription.map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-slate-800/80 lg:pl-8">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white font-display">
                  Application Details
                </h3>
                <dl className="divide-y divide-slate-800/80 text-sm">
                  {app.technicalSpecs.map((spec) => (
                    <div
                      key={spec.label}
                      className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                    >
                      <dt className="text-slate-400 text-xs">{spec.label}</dt>
                      <dd
                        className={`text-slate-200 font-medium ${
                          spec.isMonospace ? 'font-mono text-xs text-cyan-300' : 'text-xs sm:text-sm'
                        }`}
                      >
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <a
                    href={getPathForRoute('privacy')}
                    onClick={(e) => handleNav(e, 'privacy')}
                    className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>App Privacy Policy</span>
                  </a>
                  <a
                    href={getPathForRoute('contact')}
                    onClick={(e) => handleNav(e, 'contact')}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    Report Issue / Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Game Screenshots Showcase */}
        <div className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-6 sm:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-medium text-cyan-400">
                <span>Visual Preview Gallery</span>
                <span aria-hidden="true"> · </span>
                <span>Editable Placeholder Assets</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                Game Screenshots
              </h3>
            </div>

            {/* Interactive Screenshot Switcher Controls */}
            <div
              role="tablist"
              aria-label="Select screenshot preview"
              className="flex items-center gap-1.5 p-1 bg-[#080D1A] border border-slate-800 rounded-xl self-start"
            >
              {app.screenshots.map((shot, idx) => (
                <button
                  key={shot.id}
                  type="button"
                  role="tab"
                  aria-selected={activeScreenshotIndex === idx}
                  onClick={() => setActiveScreenshotIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    activeScreenshotIndex === idx
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Screen 0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Active Screenshot Spotlight */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[290px] rounded-2xl overflow-hidden border-2 border-cyan-500/40 bg-[#060A14] shadow-2xl">
                <div className="aspect-[9/16] w-full">
                  <ResilientImage
                    src={activeShot.imageUrl}
                    alt={`${app.name} — ${activeShot.title}`}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* All 3 Thumbnails + Active Description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-xl bg-[#080E1C] border border-slate-800/90 space-y-2">
                <span className="text-xs font-mono text-cyan-400">
                  Active Preview 0{activeScreenshotIndex + 1} / 0{app.screenshots.length}
                </span>
                <h4 className="text-xl font-bold text-white font-display">
                  {activeShot.title}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeShot.caption}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {app.screenshots.map((shot, idx) => {
                  const isSelected = activeScreenshotIndex === idx;
                  return (
                    <button
                      key={shot.id}
                      type="button"
                      onClick={() => setActiveScreenshotIndex(idx)}
                      aria-label={`View screenshot ${idx + 1}: ${shot.title}`}
                      className={`group text-left rounded-xl overflow-hidden border transition-all bg-[#060A14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                        isSelected
                          ? 'border-cyan-400 ring-2 ring-cyan-400/20'
                          : 'border-slate-800 opacity-75 hover:opacity-100 hover:border-slate-700'
                      }`}
                    >
                      <div className="aspect-[9/16] w-full overflow-hidden">
                        <ResilientImage
                          src={shot.imageUrl}
                          alt={shot.title}
                          containerClassName="w-full h-full"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2.5 bg-[#090F1D] border-t border-slate-800/80">
                        <p className="text-xs font-semibold text-white truncate">
                          0{idx + 1}. {shot.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-6 sm:p-10 space-y-8">
          <div className="space-y-1">
            <div className="text-xs font-medium text-cyan-400">
              <span>Gameplay &amp; Technical Capabilities</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-display">
              Key Features of {app.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {app.features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-[#080E1C] border border-slate-800/90 space-y-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <h4 className="text-base font-bold text-white font-display">
                    {feature.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
        <div className="space-y-3">
          {selectedApp ? (
            <a
              href={getPathForRoute('apps')}
              onClick={(e) => handleNav(e, 'apps')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Apps &amp; Games</span>
            </a>
          ) : (
            <div className="text-xs font-medium text-cyan-400">
              <span>Official MoHi Studio Catalog</span>
              <span aria-hidden="true"> · </span>
              <span>Android &amp; Digital Software</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
            {selectedApp ? selectedApp.name : 'Apps & Games Showcase'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {selectedApp
              ? selectedApp.tagline
              : 'Explore official mobile games and applications developed by MoHi Studio. Every title is built with clean architecture, responsive controls, and transparent policies.'}
          </p>
        </div>

        {/* Search & Filter Controls (shown on main catalog view) */}
        {!selectedApp && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or package..."
                aria-label="Search applications by name or package ID"
                className="w-full sm:w-64 pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#0C1322] border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div
              role="group"
              aria-label="Filter applications by category"
              className="flex items-center gap-1 p-1 bg-[#0C1322] border border-slate-800 rounded-xl"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Releases' : cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {selectedApp ? (
        renderAppDetail(selectedApp)
      ) : (
        <>
          {filteredApps.length === 0 ? (
            <div className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-12 text-center space-y-4">
              <p className="text-base font-semibold text-white">
                No applications matched &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Try clearing your search filter or searching for our flagship release, Arrow Flow Puzzle (com.arrowflow.arrowflowpuzzle).
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
              >
                Reset Catalog Filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Catalog Overview Strip if multiple apps exist in the future */}
              {filteredApps.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredApps.map((app) => (
                    <div
                      key={app.id}
                      className="rounded-2xl bg-[#0C1322] border border-slate-800 p-6 flex items-start gap-4"
                    >
                      <ResilientImage
                        src={app.iconUrl}
                        alt={app.name}
                        containerClassName="w-16 h-16 rounded-xl overflow-hidden shrink-0"
                      />
                      <div className="space-y-2">
                        <h2 className="text-lg font-bold text-white">{app.name}</h2>
                        <p className="text-xs text-slate-300">{app.shortDescription}</p>
                        <a
                          href={getPathForRoute('app-detail', app.slug)}
                          onClick={(e) => handleNav(e, 'app-detail', app.slug)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                        >
                          <span>View Full Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Render full comprehensive showcase for the primary matching application */}
              {renderAppDetail(filteredApps[0])}
            </div>
          )}

          {/* Extensible Catalog Architecture Notice for Future Releases */}
          <div className="rounded-2xl bg-[#080E1C] border border-slate-800/80 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-white font-display">
                  Modular Multi-App Showcase Architecture
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                  This showcase is driven by the structured catalog in{' '}
                  <code className="font-mono text-cyan-300">src/data/applications.ts</code>. Additional
                  Android games and software releases can be added by appending a new entry to{' '}
                  <code className="font-mono text-slate-300">APPLICATIONS_CATALOG</code>—automatically
                  generating dedicated routes, screenshot galleries, and search filters.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Zero fake ratings or fabricated download counts</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
