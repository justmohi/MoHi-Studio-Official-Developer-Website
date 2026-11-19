import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveRouteFromPath,
  getPathForRoute,
  getPageMeta,
  validateContactForm,
  buildMailtoUri,
  filterApplications,
  verifyAdMobLine
} from './siteLogic';
import { APPLICATIONS_CATALOG } from '../data/applications';
import { STUDIO_CONFIG } from '../data/studioConfig';

test('resolveRouteFromPath resolves all required pages and app slugs', () => {
  assert.deepEqual(resolveRouteFromPath('/'), { route: 'home' });
  assert.deepEqual(resolveRouteFromPath('/apps'), { route: 'apps' });
  assert.deepEqual(resolveRouteFromPath('/apps/arrow-flow-puzzle'), {
    route: 'app-detail',
    appSlug: 'arrow-flow-puzzle'
  });
  assert.deepEqual(resolveRouteFromPath('/about'), { route: 'about' });
  assert.deepEqual(resolveRouteFromPath('/contact'), { route: 'contact' });
  assert.deepEqual(resolveRouteFromPath('/privacy-policy'), { route: 'privacy' });
  assert.deepEqual(resolveRouteFromPath('/terms-of-service'), { route: 'terms' });
});

test('getPathForRoute returns clean canonical paths', () => {
  assert.equal(getPathForRoute('home'), '/');
  assert.equal(getPathForRoute('apps'), '/apps');
  assert.equal(getPathForRoute('app-detail', 'arrow-flow-puzzle'), '/apps/arrow-flow-puzzle');
  assert.equal(getPathForRoute('privacy'), '/privacy-policy');
  assert.equal(getPathForRoute('terms'), '/terms-of-service');
});

test('getPageMeta enforces official domain https://mohistudio.pro.bd', () => {
  const homeMeta = getPageMeta('home');
  assert.equal(homeMeta.canonicalUrl, 'https://mohistudio.pro.bd/');
  assert.ok(homeMeta.title.includes('MoHi Studio'));

  const appMeta = getPageMeta('app-detail', APPLICATIONS_CATALOG[0]);
  assert.equal(appMeta.canonicalUrl, 'https://mohistudio.pro.bd/apps/arrow-flow-puzzle');
  assert.ok(appMeta.title.includes('com.arrowflow.arrowflowpuzzle'));
});

test('validateContactForm rejects empty or invalid inputs and accepts valid data', () => {
  const emptyResult = validateContactForm({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.subject);
  assert.ok(emptyResult.errors.message);

  const badEmailResult = validateContactForm({
    name: 'Alex Player',
    email: 'invalid-email',
    subject: 'Arrow Flow Support',
    message: 'I have a question regarding level progression in Arrow Flow Puzzle.'
  });
  assert.equal(badEmailResult.isValid, false);
  assert.ok(badEmailResult.errors.email);

  const validResult = validateContactForm({
    name: 'Alex Player',
    email: 'alex@example.com',
    subject: 'Arrow Flow Support',
    message: 'I have a question regarding level progression in Arrow Flow Puzzle.'
  });
  assert.equal(validResult.isValid, true);
  assert.deepEqual(validResult.errors, {});
});

test('buildMailtoUri constructs properly encoded mailto link without pretending backend send', () => {
  const uri = buildMailtoUri('contact@mohistudio.pro.bd', {
    name: 'Alex Player',
    email: 'alex@example.com',
    subject: 'Bug Report',
    message: 'Reporting an issue on stage 14.'
  });
  assert.ok(uri.startsWith('mailto:contact@mohistudio.pro.bd?'));
  assert.ok(uri.includes('Bug%20Report'));
  assert.ok(uri.includes('alex%40example.com'));
});

test('production contact and store configuration use confirmed public details', () => {
  assert.equal(STUDIO_CONFIG.contactEmail, 'mohistudio95@gmail.com');
  assert.equal(APPLICATIONS_CATALOG[0].googlePlayUrl, 'https://play.google.com/store/apps/details?id=com.arrowflow.arrowflowpuzzle');
  assert.equal(APPLICATIONS_CATALOG[0].isGooglePlayLinkPlaceholder, false);
});

test('filterApplications matches Arrow Flow Puzzle by package name and category', () => {
  const byPkg = filterApplications(APPLICATIONS_CATALOG, 'com.arrowflow.arrowflowpuzzle', 'all');
  assert.equal(byPkg.length, 1);
  assert.equal(byPkg[0].name, 'Arrow Flow Puzzle');

  const byCategory = filterApplications(APPLICATIONS_CATALOG, '', 'Puzzle Game');
  assert.equal(byCategory.length, 1);

  const noMatch = filterApplications(APPLICATIONS_CATALOG, 'nonexistent-app-xyz', 'all');
  assert.equal(noMatch.length, 0);
});

test('verifyAdMobLine validates exact AdMob publisher specification and on-disk public/app-ads.txt', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  assert.equal(verifyAdMobLine(STUDIO_CONFIG.adMobAppAdsLine), true);
  assert.equal(
    STUDIO_CONFIG.adMobAppAdsLine,
    'google.com, pub-1412575396954796, DIRECT, f08c47fec0942fa0'
  );

  const publicAppAdsPath = path.resolve(import.meta.dirname, '../../public/app-ads.txt');
  const fileContent = fs.readFileSync(publicAppAdsPath, 'utf-8').trim();
  assert.equal(fileContent, 'google.com, pub-1412575396954796, DIRECT, f08c47fec0942fa0');
  assert.equal(verifyAdMobLine(fileContent), true);
});

test('validateContactForm blocks header injection line breaks and excessive input lengths', () => {
  const injectionAttempt = validateContactForm({
    name: 'Alex\r\nBcc: spam@example.com',
    email: 'alex@example.com',
    subject: 'Valid Subject',
    message: 'This is a sufficiently long message for testing validation.'
  });
  assert.equal(injectionAttempt.isValid, false);
  assert.ok(injectionAttempt.errors.name);

  const oversizedSubject = validateContactForm({
    name: 'Alex Player',
    email: 'alex@example.com',
    subject: 'S'.repeat(160),
    message: 'This is a sufficiently long message for testing validation.'
  });
  assert.equal(oversizedSubject.isValid, false);
  assert.ok(oversizedSubject.errors.subject);
});
