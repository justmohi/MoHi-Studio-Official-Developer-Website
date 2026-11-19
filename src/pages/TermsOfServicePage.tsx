import React from 'react';
import { Scale, Mail, Globe, FileText } from 'lucide-react';
import { STUDIO_CONFIG } from '../data/studioConfig';
import { PageRoute, getPathForRoute } from '../utils/siteLogic';

interface TermsOfServicePageProps {
  onNavigate: (route: PageRoute, appSlug?: string) => void;
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, route: PageRoute) => {
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16 space-y-10">
      {/* Header */}
      <div className="space-y-3 pb-8 border-b border-slate-800/80">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-cyan-400">
          <span>Official Legal Terms</span>
          <span aria-hidden="true">·</span>
          <span>Effective / Last Updated: {STUDIO_CONFIG.termsLastUpdated}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display">
          Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the
          official <strong className="text-white">MoHi Studio</strong> website (
          <code className="font-mono text-cyan-300">{STUDIO_CONFIG.officialDomain}</code>) or any
          mobile games and software applications published by MoHi Studio, including{' '}
          <strong className="text-white">Arrow Flow Puzzle</strong> (
          <code className="font-mono text-cyan-300">com.arrowflow.arrowflowpuzzle</code>).
        </p>
      </div>

      {/* Editable Legal Notice */}
      <div className="rounded-2xl bg-[#0C1528] border border-cyan-500/30 p-6 space-y-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-300">
          <Scale className="w-4 h-4 shrink-0" />
          <span>Editable Legal Information Notice</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          All legal terms and contact details on this page are structured for easy customization in{' '}
          <code className="font-mono text-slate-200">src/pages/TermsOfServicePage.tsx</code> and{' '}
          <code className="font-mono text-slate-200">src/data/studioConfig.ts</code>. Items marked
          with <code className="font-mono text-amber-300">[DEVELOPER CONFIRMATION REQUIRED]</code>{' '}
          should be reviewed by the developer to match applicable local jurisdiction rules.
        </p>
      </div>

      {/* 8 Required Sections */}
      <div className="space-y-8">
        {/* 1. Website Usage */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            1. Website Usage
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            By accessing or browsing <code className="font-mono text-xs text-slate-200">{STUDIO_CONFIG.officialDomain}</code>,
            you agree to use the website solely for lawful informational and support purposes. You
            may not attempt to disrupt website availability, scrape or alter official developer
            verification files (such as <code className="font-mono text-xs text-cyan-300">/app-ads.txt</code>),
            or misrepresent your affiliation with MoHi Studio.
          </p>
        </section>

        {/* 2. Intellectual Property */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            2. Intellectual Property
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            All content, application code, puzzle mechanics, level arrangements, visual assets,
            logos, icons, and branding associated with <strong className="text-white">MoHi Studio</strong>{' '}
            and <strong className="text-white">Arrow Flow Puzzle</strong> are the intellectual
            property of MoHi Studio or its licensors and are protected by applicable copyright,
            trademark, and intellectual property laws.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            You may not copy, modify, redistribute, decompile, reverse-engineer, or create
            derivative works from our website or mobile applications except as expressly permitted
            by applicable law.
          </p>
        </section>

        {/* 3. Application Usage */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            3. Application Usage
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Subject to your compliance with these Terms, MoHi Studio grants you a limited,
            non-exclusive, non-transferable, revocable license to download, install, and use our
            mobile applications on compatible Android devices that you own or control, strictly for
            your personal, non-commercial entertainment or utility.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            We reserve the right to update, modify, or discontinue any application features or
            stages at any time to improve gameplay balance, security, or device compatibility.
          </p>
        </section>

        {/* 4. User Responsibilities */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            4. User Responsibilities
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            When using MoHi Studio applications and services, you agree not to:
          </p>
          <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5">
            <li>Use cheats, automation software, bots, hacks, or unauthorized mods that alter application behavior.</li>
            <li>Interfere with or manipulate advertisement rendering, attribution, or security mechanisms.</li>
            <li>Distribute modified APK/AAB packages of our applications on unauthorized third-party sites.</li>
            <li>Use our applications or website in any manner that violates local, national, or international laws.</li>
          </ul>
        </section>

        {/* 5. Third-Party Services */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            5. Third-Party Services
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Our applications may integrate or link to third-party services, including Google Play
            Store distribution services and third-party advertising networks such as Google AdMob.
            Your use of such third-party services is subject to the respective terms and policies of
            those third-party providers. MoHi Studio is not responsible for the content, privacy
            practices, or availability of external websites or services linked from ads or store
            listings.
          </p>
        </section>

        {/* 6. Limitation of Liability */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            6. Limitation of Liability
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Our website and mobile applications are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS
            AVAILABLE&rdquo; basis without warranties of any kind, either express or implied. To the
            fullest extent permitted by applicable law, MoHi Studio shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, or any loss of data,
            device downtime, or gameplay progress arising out of or related to your use of (or
            inability to use) our website or applications.{' '}
            <span className="font-mono text-xs text-amber-300">
              [DEVELOPER CONFIRMATION REQUIRED: Confirm governing law / jurisdiction provisions if
              required]
            </span>
          </p>
        </section>

        {/* 7. Changes to Terms */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            7. Changes to Terms
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            We may revise these Terms of Service periodically to reflect updates to our applications
            or legal requirements. Updated Terms will be posted at{' '}
            <code className="font-mono text-xs text-slate-200">
              {STUDIO_CONFIG.officialDomain}/terms-of-service
            </code>{' '}
            with a revised effective date. By continuing to use our website or applications after
            changes take effect, you agree to be bound by the updated Terms.
          </p>
        </section>

        {/* 8. Contact Information */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            8. Contact Information
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            If you have any questions about these Terms of Service, please contact MoHi Studio:
          </p>
          <div className="p-5 rounded-xl bg-[#080E1C] border border-slate-800 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-slate-200">
              <strong className="text-white">Developer:</strong>
              <span>{STUDIO_CONFIG.developerName}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
              <strong className="text-white">Official Website:</strong>
              <span className="font-mono text-cyan-300">{STUDIO_CONFIG.officialDomain}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <strong className="text-white">Email (Editable Placeholder):</strong>
              <a
                href={`mailto:${STUDIO_CONFIG.contactEmail}`}
                className="font-mono text-cyan-300 hover:underline"
              >
                {STUDIO_CONFIG.contactEmail}
              </a>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={getPathForRoute('contact')}
              onClick={(e) => handleNav(e, 'contact')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Go to Contact Page</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
