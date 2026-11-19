import { StudioApplication } from '../data/applications';

export type PageRoute =
  | 'home'
  | 'apps'
  | 'app-detail'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';

export interface RouteMatch {
  route: PageRoute;
  appSlug?: string;
}

export interface PageMeta {
  title: string;
  description: string;
  canonicalUrl: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
}

const OFFICIAL_DOMAIN = 'https://mohistudio.pro.bd';

export function resolveRouteFromPath(pathname: string): RouteMatch {
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (clean === '/' || clean === '/home') {
    return { route: 'home' };
  }
  if (clean === '/apps') {
    return { route: 'apps' };
  }
  if (clean.startsWith('/apps/')) {
    const slug = clean.slice('/apps/'.length).trim();
    if (slug.length > 0) {
      return { route: 'app-detail', appSlug: slug };
    }
    return { route: 'apps' };
  }
  if (clean === '/about') {
    return { route: 'about' };
  }
  if (clean === '/contact') {
    return { route: 'contact' };
  }
  if (clean === '/privacy-policy' || clean === '/privacy') {
    return { route: 'privacy' };
  }
  if (clean === '/terms-of-service' || clean === '/terms') {
    return { route: 'terms' };
  }

  return { route: 'home' };
}

export function getPathForRoute(route: PageRoute, appSlug?: string): string {
  switch (route) {
    case 'home':
      return '/';
    case 'apps':
      return '/apps';
    case 'app-detail':
      return `/apps/${appSlug || 'arrow-flow-puzzle'}`;
    case 'about':
      return '/about';
    case 'contact':
      return '/contact';
    case 'privacy':
      return '/privacy-policy';
    case 'terms':
      return '/terms-of-service';
  }
}

export function getPageMeta(route: PageRoute, app?: StudioApplication): PageMeta {
  switch (route) {
    case 'home':
      return {
        title: 'MoHi Studio — Official Developer Website',
        description:
          'Independent software and mobile game development studio creating engaging Android games and useful digital applications, including Arrow Flow Puzzle.',
        canonicalUrl: `${OFFICIAL_DOMAIN}/`
      };
    case 'apps':
      return {
        title: 'Apps & Games Showcase — MoHi Studio',
        description:
          'Explore official Android mobile games and digital applications created by MoHi Studio, featuring Arrow Flow Puzzle (com.arrowflow.arrowflowpuzzle).',
        canonicalUrl: `${OFFICIAL_DOMAIN}/apps`
      };
    case 'app-detail': {
      const targetName = app?.name || 'Arrow Flow Puzzle';
      const targetPkg = app?.packageName || 'com.arrowflow.arrowflowpuzzle';
      const targetSlug = app?.slug || 'arrow-flow-puzzle';
      return {
        title: `${targetName} (${targetPkg}) — MoHi Studio`,
        description:
          app?.shortDescription ||
          'A challenging arrow escape puzzle game where players solve increasingly complex arrow arrangements, plan escape sequences, and overcome strategic obstacles.',
        canonicalUrl: `${OFFICIAL_DOMAIN}/apps/${targetSlug}`
      };
    }
    case 'about':
      return {
        title: 'About MoHi Studio — Mobile Game & Software Development',
        description:
          'Learn about MoHi Studio, our mission, mobile game architecture, software development philosophy, and focus on user experience.',
        canonicalUrl: `${OFFICIAL_DOMAIN}/about`
      };
    case 'contact':
      return {
        title: 'Contact MoHi Studio — Support & Inquiries',
        description:
          'Get in touch with MoHi Studio for application support, feedback on Arrow Flow Puzzle, privacy inquiries, or general questions.',
        canonicalUrl: `${OFFICIAL_DOMAIN}/contact`
      };
    case 'privacy':
      return {
        title: 'Privacy Policy — MoHi Studio',
        description:
          'Official Privacy Policy for MoHi Studio website and mobile applications, including Arrow Flow Puzzle (com.arrowflow.arrowflowpuzzle).',
        canonicalUrl: `${OFFICIAL_DOMAIN}/privacy-policy`
      };
    case 'terms':
      return {
        title: 'Terms of Service — MoHi Studio',
        description:
          'Official Terms of Service governing the use of the MoHi Studio website and Android mobile applications.',
        canonicalUrl: `${OFFICIAL_DOMAIN}/terms-of-service`
      };
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HEADER_INJECTION_REGEX = /[\r\n]/;

export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: ContactValidationResult['errors'] = {};

  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedSubject = input.subject.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  } else if (trimmedName.length > 100) {
    errors.name = 'Name must be 100 characters or fewer.';
  } else if (HEADER_INJECTION_REGEX.test(trimmedName)) {
    errors.name = 'Name cannot contain line breaks.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (trimmedEmail.length > 254 || !EMAIL_REGEX.test(trimmedEmail) || HEADER_INJECTION_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g., name@domain.com).';
  }

  if (!trimmedSubject) {
    errors.subject = 'Please specify a subject for your inquiry.';
  } else if (trimmedSubject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters long.';
  } else if (trimmedSubject.length > 150) {
    errors.subject = 'Subject must be 150 characters or fewer.';
  } else if (HEADER_INJECTION_REGEX.test(trimmedSubject)) {
    errors.subject = 'Subject cannot contain line breaks.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please enter a message.';
  } else if (trimmedMessage.length < 15) {
    errors.message = 'Message must be at least 15 characters to provide sufficient context.';
  } else if (trimmedMessage.length > 4000) {
    errors.message = 'Message must be 4,000 characters or fewer.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function buildMailtoUri(recipientEmail: string, input: ContactFormInput): string {
  const subject = `[MoHi Studio Inquiry] ${input.subject.trim()}`;
  const bodyLines = [
    `Name: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
    `Subject: ${input.subject.trim()}`,
    '',
    input.message.trim()
  ];
  const params = new URLSearchParams({
    subject,
    body: bodyLines.join('\n')
  });
  // Replace '+' with '%20' for standard mail client compatibility
  return `mailto:${recipientEmail}?${params.toString().replace(/\+/g, '%20')}`;
}

export function filterApplications(
  apps: StudioApplication[],
  query: string,
  category: string
): StudioApplication[] {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedCat = category.trim().toLowerCase();

  return apps.filter((app) => {
    const matchesCat =
      normalizedCat === 'all' ||
      normalizedCat === '' ||
      app.category.toLowerCase() === normalizedCat ||
      app.platform.toLowerCase() === normalizedCat;

    if (!matchesCat) return false;
    if (!normalizedQuery) return true;

    return (
      app.name.toLowerCase().includes(normalizedQuery) ||
      app.packageName.toLowerCase().includes(normalizedQuery) ||
      app.category.toLowerCase().includes(normalizedQuery) ||
      app.shortDescription.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function verifyAdMobLine(line: string): boolean {
  return line.trim() === 'google.com, pub-1412575396954796, DIRECT, f08c47fec0942fa0';
}
