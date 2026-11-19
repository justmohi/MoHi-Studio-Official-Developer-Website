import React from 'react';
import { ShieldAlert, Mail, Globe, ExternalLink, FileText } from 'lucide-react';
import { STUDIO_CONFIG } from '../data/studioConfig';
import { PageRoute, getPathForRoute } from '../utils/siteLogic';

interface PrivacyPolicyPageProps {
  onNavigate: (route: PageRoute, appSlug?: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, route: PageRoute) => {
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16 space-y-10">
      {/* Header */}
      <div className="space-y-3 pb-8 border-b border-slate-800/80">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-cyan-400">
          <span>Official Legal &amp; Privacy Documentation</span>
          <span aria-hidden="true">·</span>
          <span>Effective / Last Updated: {STUDIO_CONFIG.privacyLastUpdated}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          This Privacy Policy describes how <strong className="text-white">MoHi Studio</strong>{' '}
          (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) handles information in
          connection with our official website (<code className="font-mono text-cyan-300">{STUDIO_CONFIG.officialDomain}</code>)
          and our mobile games and applications, including{' '}
          <strong className="text-white">Arrow Flow Puzzle</strong> (Package ID:{' '}
          <code className="font-mono text-cyan-300">com.arrowflow.arrowflowpuzzle</code>).
        </p>
      </div>

      {/* Developer Confirmation Notice Box */}
      <div className="rounded-2xl bg-[#0C1528] border border-amber-500/40 p-6 space-y-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-300">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>Editable Template Notice — Items Requiring Developer Confirmation</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Sections marked with <code className="font-mono text-amber-300">[DEVELOPER CONFIRMATION REQUIRED]</code>{' '}
          identify configurable details (such as specific third-party SDK versions, data retention
          windows, and the official support email address in{' '}
          <code className="font-mono text-slate-200">src/data/studioConfig.ts</code>) that the
          developer should review and confirm before final legal publication.
        </p>
      </div>

      {/* Structured Sections */}
      <div className="space-y-8">
        {/* 1. Information Collection */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            1. Information Collection
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Depending on how you interact with our website and mobile applications, information may
            be collected in the following categories:
          </p>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>
              <strong className="text-white">A. Information You Provide Voluntarily:</strong> When
              you contact MoHi Studio directly via email or through our support channels, we receive
              your name, email address, subject line, and the contents of your message so we can
              respond to your inquiry.
            </li>
            <li>
              <strong className="text-white">
                B. Automatically Collected Device &amp; Technical Data:
              </strong>{' '}
              When you access our Android applications (such as Arrow Flow Puzzle) or browse our
              website, integrated software development kits (SDKs), platform services, or hosting
              servers may automatically collect technical information. This may include device model,
              operating system version, language setting, IP address, mobile advertising identifiers
              (such as Google Advertising ID / AAID), crash logs, diagnostic performance metrics,
              and general gameplay interaction events.
            </li>
            <li>
              <strong className="text-white">C. Local Gameplay Progress:</strong> Game state such as
              completed puzzle levels, preferences, and audio settings may be stored locally on your
              device or synchronized via platform services{' '}
              <span className="font-mono text-xs text-amber-300">
                [DEVELOPER CONFIRMATION REQUIRED: Confirm whether cloud save / Google Play Games
                Services is enabled]
              </span>
              .
            </li>
          </ul>
        </section>

        {/* 2. Data Usage */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            2. Data Usage
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Information collected by MoHi Studio and our authorized service partners is used to:
          </p>
          <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5">
            <li>Operate, maintain, and deliver gameplay functionality in our mobile applications.</li>
            <li>Diagnose application crashes, fix bugs, and optimize performance across Android devices.</li>
            <li>Display and measure advertisements within our free-to-play mobile applications.</li>
            <li>Respond to user support inquiries, bug reports, and privacy requests.</li>
            <li>Comply with applicable legal obligations and enforce our Terms of Service.</li>
          </ul>
        </section>

        {/* 3. Advertising */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            3. Advertising
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Our mobile applications may display advertisements served by third-party ad networks,
            including <strong className="text-white">Google AdMob</strong> (Authorized Seller record
            published at{' '}
            <a
              href="/app-ads.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-mono text-xs inline-flex items-center gap-1"
            >
              <span>{STUDIO_CONFIG.officialDomain}/app-ads.txt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            ).
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Advertising partners may use mobile advertising identifiers (such as the Google
            Advertising ID), cookies, or similar technologies to serve contextual or personalized
            advertisements, limit ad frequency, detect ad fraud, and measure ad campaign
            effectiveness.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-white">Managing Your Ad Preferences:</strong> Android users can
            reset or delete their advertising ID, or opt out of personalized advertising, at any
            time through their device settings (typically under{' '}
            <em>Settings &gt; Google &gt; Ads</em> or <em>Settings &gt; Privacy &gt; Ads</em>), as
            well as through consent prompts presented within the application where required by
            regional regulations (such as GDPR/EEA consent frameworks).{' '}
            <span className="font-mono text-xs text-amber-300">
              [DEVELOPER CONFIRMATION REQUIRED: Confirm exact mediation networks and consent SDK
              settings enabled in production]
            </span>
          </p>
        </section>

        {/* 4. Third-Party Services */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            4. Third-Party Services
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Our applications and website may integrate third-party services that collect and process
            data under their own privacy policies. These services may include:
          </p>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li>
              · <strong className="text-white">Google Play Services:</strong>{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
              >
                https://policies.google.com/privacy
              </a>
            </li>
            <li>
              · <strong className="text-white">Google AdMob:</strong>{' '}
              <a
                href="https://support.google.com/admob/answer/6128543"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
              >
                https://support.google.com/admob/answer/6128543
              </a>
            </li>
            <li>
              ·{' '}
              <span className="font-mono text-xs text-amber-300">
                [DEVELOPER CONFIRMATION REQUIRED: List any additional analytics, crash reporting
                (e.g., Firebase Crashlytics / Google Analytics for Firebase), or attribution SDKs
                bundled in the APK/AAB]
              </span>
            </li>
          </ul>
        </section>

        {/* 5. Data Security */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            5. Data Security
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            We value your trust and implement reasonable administrative and technical safeguards—such
            as encrypted HTTPS transport for network communications—to protect information against
            unauthorized access, alteration, or disclosure. However, please be aware that no method
            of transmission over the internet or method of electronic storage is 100% secure, and we
            cannot guarantee absolute security.
          </p>
        </section>

        {/* 6. Children's Privacy */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            6. Children&apos;s Privacy
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            We do not knowingly solicit or collect personally identifiable information directly from
            children under the age of 13 (or the applicable age of digital consent in your
            jurisdiction).{' '}
            <span className="font-mono text-xs text-amber-300">
              [DEVELOPER CONFIRMATION REQUIRED: Confirm target audience age group settings in Google
              Play Console and ad content rating configurations]
            </span>
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            If you are a parent or guardian and believe that your child has provided personal
            information to us without your consent, please contact us at{' '}
            <code className="font-mono text-cyan-300">{STUDIO_CONFIG.contactEmail}</code> so that we
            can promptly review and delete such information.
          </p>
        </section>

        {/* 7. Policy Updates */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            7. Policy Updates
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            MoHi Studio may update this Privacy Policy from time to time to reflect changes in our
            applications, third-party integrations, or applicable regulatory requirements. We will
            post the updated Privacy Policy on this page (<code className="font-mono text-xs text-slate-200">{STUDIO_CONFIG.officialDomain}/privacy-policy</code>)
            and revise the &ldquo;Effective / Last Updated&rdquo; date at the top of the policy.
          </p>
        </section>

        {/* 8. Contact Information */}
        <section className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            8. Contact Information
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            If you have any questions, concerns, or requests regarding this Privacy Policy or how
            data is handled in our applications, please contact MoHi Studio:
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
              <span>Go to Contact Form</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
