export interface StudioConfig {
  developerName: string;
  officialDomain: string;
  contactEmail: string;
  contactEndpoint: string;
  privacyLastUpdated: string;
  termsLastUpdated: string;
  adMobAppAdsLine: string;
  adMobPublisherId: string;
  adMobRelationship: 'DIRECT' | 'RESELLER';
  adMobCertificationAuthorityId: string;
}

const getEnv = (key: string, fallback: string): string => {
  try {
    const meta = import.meta as unknown as { env?: Record<string, string | undefined> };
    const val = meta.env?.[key];
    return val && val.trim().length > 0 ? val.trim() : fallback;
  } catch {
    return fallback;
  }
};

export const STUDIO_CONFIG: StudioConfig = {
  developerName: 'MoHi Studio',
  officialDomain: getEnv('VITE_STUDIO_DOMAIN', 'https://mohistudio.pro.bd'),
  // Confirmed contact inbox selected for the Formspree project.
  contactEmail: getEnv('VITE_STUDIO_CONTACT_EMAIL', 'mohistudio95@gmail.com'),
  // Optional external form endpoint. Keep empty until a real endpoint is configured.
  contactEndpoint: getEnv('VITE_CONTACT_ENDPOINT', ''),
  privacyLastUpdated: 'November 18, 2026',
  termsLastUpdated: 'November 18, 2026',
  adMobAppAdsLine: 'google.com, pub-1412575396954796, DIRECT, f08c47fec0942fa0',
  adMobPublisherId: 'pub-1412575396954796',
  adMobRelationship: 'DIRECT',
  adMobCertificationAuthorityId: 'f08c47fec0942fa0',
};

export const HERO_VISUAL_PATH = '/src/assets/images/hero_studio_craft_1795063019290.jpg';
