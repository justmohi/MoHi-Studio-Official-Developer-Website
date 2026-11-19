import React, { useState } from 'react';
import {
  Mail,
  Send,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Info,
  Globe
} from 'lucide-react';
import {
  ContactFormInput,
  ContactValidationResult,
  validateContactForm,
  buildMailtoUri
} from '../utils/siteLogic';
import { STUDIO_CONFIG } from '../data/studioConfig';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [validation, setValidation] = useState<ContactValidationResult>({
    isValid: true,
    errors: {}
  });

  const [submitState, setSubmitState] = useState<
    'idle' | 'submitting' | 'prepared-mailto' | 'sent-endpoint' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedPayload, setCopiedPayload] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (Object.keys(validation.errors).length > 0) {
      setValidation(
        validateContactForm({
          ...formData,
          [name]: value
        })
      );
    }
    if (submitState !== 'idle') {
      setSubmitState('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const check = validateContactForm(formData);
    setValidation(check);

    if (!check.isValid) {
      setSubmitState('error');
      setErrorMessage('Please fix the highlighted validation errors before continuing.');
      return;
    }

    // If an external backend/webhook endpoint is configured via VITE_CONTACT_ENDPOINT, submit via POST
    if (STUDIO_CONFIG.contactEndpoint) {
      setSubmitState('submitting');
      try {
        const response = await fetch(STUDIO_CONFIG.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            source: STUDIO_CONFIG.officialDomain
          })
        });

        if (!response.ok) {
          throw new Error(`Endpoint returned HTTP ${response.status}`);
        }
        setSubmitState('sent-endpoint');
      } catch (err) {
        setSubmitState('error');
        setErrorMessage(
          err instanceof Error
            ? `Failed to deliver message to configured endpoint (${err.message}). You can send your inquiry directly via email below.`
            : 'Unable to reach the configured contact endpoint. Please use direct email below.'
        );
      }
      return;
    }

    // No backend email service configured: transparently prepare the validated inquiry for direct email dispatch or clipboard copy
    setSubmitState('prepared-mailto');
  };

  const mailtoUri = buildMailtoUri(STUDIO_CONFIG.contactEmail, formData);

  const handleCopyFormattedInquiry = () => {
    const formatted = [
      `To: ${STUDIO_CONFIG.contactEmail}`,
      `From: ${formData.name.trim()} <${formData.email.trim()}>`,
      `Subject: [MoHi Studio Inquiry] ${formData.subject.trim()}`,
      '',
      formData.message.trim()
    ].join('\n');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(formatted).catch(() => {});
    }
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3 pb-8 border-b border-slate-800/80">
        <div className="text-xs font-medium text-cyan-400">
          <span>Support &amp; Developer Communications</span>
          <span aria-hidden="true"> · </span>
          <span className="font-mono text-slate-300">{STUDIO_CONFIG.officialDomain}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display">
          Contact MoHi Studio
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Have a question about <strong className="text-white">Arrow Flow Puzzle</strong>, need
          technical support, or want to reach out regarding privacy or legal inquiries? Use the
          validated form below or contact our studio email directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Studio Contact Details & Editable Configuration Notice */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 space-y-6">
            <h2 className="text-xl font-bold text-white font-display">
              Direct Contact Channels
            </h2>

            <div className="divide-y divide-slate-800/80">
              <div className="pb-5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
                  <Mail className="w-4 h-4" />
                  <span>Official Support &amp; Inquiries Email (Editable Placeholder)</span>
                </div>
                <a
                  href={`mailto:${STUDIO_CONFIG.contactEmail}`}
                  className="block text-sm sm:text-base font-mono font-semibold text-white hover:text-cyan-400 transition-colors break-all"
                >
                  {STUDIO_CONFIG.contactEmail}
                </a>
                <p className="text-xs text-slate-400">
                  Update this placeholder address in{' '}
                  <code className="font-mono text-slate-300">src/data/studioConfig.ts</code> or via{' '}
                  <code className="font-mono text-slate-300">VITE_STUDIO_CONTACT_EMAIL</code>.
                </p>
              </div>

              <div className="pt-5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
                  <Globe className="w-4 h-4" />
                  <span>Official Developer Domain</span>
                </div>
                <p className="text-sm sm:text-base font-mono font-semibold text-white">
                  {STUDIO_CONFIG.officialDomain}
                </p>
                <p className="text-xs text-slate-400">
                  Official developer domain configured for Google Play Console and application support.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <h3 className="text-xs font-semibold text-white">
                Common Inquiry Topics
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>· Arrow Flow Puzzle (com.arrowflow.arrowflowpuzzle) gameplay &amp; bug reports</li>
                <li>· Privacy Policy &amp; data deletion or access questions</li>
                <li>· Advertising &amp; publisher verification inquiries</li>
                <li>· General feedback and studio correspondence</li>
              </ul>
            </div>
          </div>

          {/* Transparent Form Handling Disclosure */}
          <div className="rounded-2xl bg-[#080E1C] border border-slate-800/80 p-6 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <Info className="w-4 h-4 shrink-0" />
              <span>Transparent Static Hosting Architecture</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              This website is built to run portably on any static or serverless host without
              pretending to send background emails when no backend server is attached. When you
              validate and submit the form, it prepares an immediate pre-filled email for your
              default mail client (or lets you copy the formatted inquiry) unless a custom webhook
              is configured in <code className="font-mono text-slate-300">VITE_CONTACT_ENDPOINT</code>.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form with Validation */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-[#0C1322] border border-slate-800/90 p-7 sm:p-10">
            <h2 className="text-2xl font-bold text-white font-display mb-2">
              Send an Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              All fields are required. Your input is validated locally before preparing your message.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-200">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  aria-invalid={Boolean(validation.errors.name)}
                  aria-describedby={validation.errors.name ? 'error-name' : undefined}
                  className={`w-full px-4 py-3 text-sm rounded-xl bg-[#080E1C] border text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
                    validation.errors.name
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-slate-800 focus:border-cyan-400'
                  }`}
                />
                {validation.errors.name && (
                  <p id="error-name" className="text-xs text-rose-400 flex items-center gap-1.5 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{validation.errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-200">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  aria-invalid={Boolean(validation.errors.email)}
                  aria-describedby={validation.errors.email ? 'error-email' : undefined}
                  className={`w-full px-4 py-3 text-sm rounded-xl bg-[#080E1C] border text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
                    validation.errors.email
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-slate-800 focus:border-cyan-400'
                  }`}
                />
                {validation.errors.email && (
                  <p id="error-email" className="text-xs text-rose-400 flex items-center gap-1.5 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{validation.errors.email}</span>
                  </p>
                )}
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-200">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Arrow Flow Puzzle Support or General Inquiry"
                  aria-invalid={Boolean(validation.errors.subject)}
                  aria-describedby={validation.errors.subject ? 'error-subject' : undefined}
                  className={`w-full px-4 py-3 text-sm rounded-xl bg-[#080E1C] border text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
                    validation.errors.subject
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-slate-800 focus:border-cyan-400'
                  }`}
                />
                {validation.errors.subject && (
                  <p id="error-subject" className="text-xs text-rose-400 flex items-center gap-1.5 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{validation.errors.subject}</span>
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-200">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your question, feedback, or support request in detail (minimum 15 characters)..."
                  aria-invalid={Boolean(validation.errors.message)}
                  aria-describedby={validation.errors.message ? 'error-message' : undefined}
                  className={`w-full px-4 py-3 text-sm rounded-xl bg-[#080E1C] border text-white placeholder:text-slate-500 focus:outline-none transition-colors resize-y ${
                    validation.errors.message
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-slate-800 focus:border-cyan-400'
                  }`}
                />
                {validation.errors.message && (
                  <p id="error-message" className="text-xs text-rose-400 flex items-center gap-1.5 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{validation.errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={submitState === 'submitting'}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-60 rounded-xl shadow-lg shadow-blue-600/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {submitState === 'submitting'
                      ? 'Submitting Inquiry...'
                      : STUDIO_CONFIG.contactEndpoint
                      ? 'Submit Inquiry'
                      : 'Validate & Prepare Message'}
                  </span>
                </button>

                {Object.keys(validation.errors).length > 0 && (
                  <span className="text-xs text-rose-400 font-medium">
                    {Object.keys(validation.errors).length} field(s) require attention
                  </span>
                )}
              </div>
            </form>

            {/* Error State Banner */}
            {submitState === 'error' && (
              <div
                role="alert"
                className="mt-6 p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-white">Unable to Proceed</p>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Configured Backend Success State */}
            {submitState === 'sent-endpoint' && (
              <div
                role="status"
                className="mt-6 p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 space-y-2"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Message Delivered to Configured Endpoint</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry
                  has been transmitted to the configured MoHi Studio endpoint.
                </p>
              </div>
            )}

            {/* Honest Client-Side Validated Preparation State (When no backend endpoint is configured) */}
            {submitState === 'prepared-mailto' && (
              <div
                role="status"
                className="mt-6 p-6 rounded-xl bg-[#080E1C] border border-cyan-500/50 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-white font-display">
                      Inquiry Validated &amp; Ready to Send
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Because no server-side email relay is configured on this static deployment,
                      your message has not been transmitted automatically. Choose one of the actions
                      below to send your validated inquiry directly to{' '}
                      <code className="font-mono text-cyan-300">{STUDIO_CONFIG.contactEmail}</code>:
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={mailtoUri}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Default Email App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyFormattedInquiry}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedPayload ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied Inquiry to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-cyan-400" />
                        <span>Copy Formatted Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
