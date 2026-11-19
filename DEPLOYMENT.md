# MoHi Studio — Official Developer Website Deployment & Portability Guide

Official Domain: **https://mohistudio.pro.bd**  
Featured Android Application: **Arrow Flow Puzzle** (`com.arrowflow.arrowflowpuzzle`)  
AdMob Authorized Digital Sellers File: `https://mohistudio.pro.bd/app-ads.txt`

This project is a 100% hosting-independent React + TypeScript + Vite web application. It builds into a clean static bundle in `dist/` and does not depend on any proprietary hosting runtime.

---

## 1. Standard Production Build

Install dependencies and compile the production bundle:

```bash
npm install
npm run build
```

The production build outputs to the `dist/` directory:
- `dist/index.html` — Entry point with SEO metadata, Open Graph cards, and Schema.org JSON-LD.
- `dist/app-ads.txt` — Exact plain-text AdMob seller record copied directly from `public/app-ads.txt`.
- `dist/robots.txt` & `dist/sitemap.xml` — Search engine crawler directives and canonical URL map.
- `dist/assets/` & `dist/src/assets/images/` — Bundled scripts, stylesheets, and visual assets.

---

## 2. Root-Level `app-ads.txt` Verification (Critical AdMob Requirement)

Google AdMob crawls the root domain of your Google Play Developer Website (`https://mohistudio.pro.bd/app-ads.txt`).

- **Source File Location**: `public/app-ads.txt`
- **Production Build Output Location**: `dist/app-ads.txt`
- **Exact Required Contents**:
  ```text
  google.com, pub-1412575396954796, DIRECT, f08c47fec0942fa0
  ```

### Post-Deployment Verification Checklist
Once deployed to your chosen host, run:

```bash
curl -i https://mohistudio.pro.bd/app-ads.txt
```

Verify that:
1. The HTTP status code is `200 OK` (or `200` over HTTP/2).
2. The `Content-Type` header is `text/plain` (not `text/html`).
3. The response body is the exact single line:
   `google.com, pub-1412575396954796, DIRECT, f08c47fec0942fa0`

---

## 3. Environment Variable Documentation

All environment variables are optional and documented in `.env.example`. Default values are configured in `src/data/studioConfig.ts` and `src/data/applications.ts`.

| Variable | Default Value | Purpose |
| :--- | :--- | :--- |
| `VITE_STUDIO_DOMAIN` | `https://mohistudio.pro.bd` | Canonical studio domain used across pages and footers. |
| `VITE_STUDIO_CONTACT_EMAIL` | `contact@mohistudio.pro.bd` | Editable developer support and legal contact email address. |
| `VITE_CONTACT_ENDPOINT` | *(Empty)* | Optional external form webhook URL (e.g., Formspree or custom API). When empty, the contact form validates inputs and prepares a direct `mailto:` message or clipboard copy without faking delivery. |
| `VITE_ARROW_FLOW_PLAY_URL` | `https://play.google.com/store/apps/details?id=com.arrowflow.arrowflowpuzzle` | Google Play Store URL for Arrow Flow Puzzle. |

---

## 4. SPA Routing Fallback & Static File Serving Rules

Because the website supports clean URLs (`/`, `/apps`, `/apps/arrow-flow-puzzle`, `/about`, `/contact`, `/privacy-policy`, `/terms-of-service`), configure your chosen hosting provider to:
1. **Serve existing static files first** (so `/app-ads.txt`, `/robots.txt`, `/sitemap.xml`, and `/favicon.svg` return their real files with HTTP 200).
2. **Fallback unknown paths to `/index.html`** for client-side route resolution.

### Provider-Specific Instructions

#### A. Netlify
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **SPA Fallback**: If needed, add a `public/_redirects` file with:
  ```text
  /app-ads.txt  /app-ads.txt  200
  /*            /index.html   200
  ```
  *(Netlify always serves existing static files like `/app-ads.txt` before wildcard rules).*

#### B. Vercel
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **SPA Fallback**: Vercel serves all files in `dist/` (including `app-ads.txt`) at the root automatically. For direct reloads on sub-routes (`/apps`, `/privacy-policy`), you can optionally use a `vercel.json` rewrite rule:
  ```json
  {
    "rewrites": [{ "source": "/((?!app-ads\\.txt|robots\\.txt|sitemap\\.xml|favicon\\.svg|assets/|src/).*)", "destination": "/index.html" }]
  }
  ```

#### C. Cloudflare Pages
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- Cloudflare Pages automatically serves `dist/app-ads.txt` at `/app-ads.txt` and automatically falls back unmatched navigation routes to `index.html` when no `404.html` is present.

#### D. Firebase Hosting
- **Public directory**: `dist`
- In `firebase.json`, configure `"rewrites": [{ "source": "**", "destination": "/index.html" }]`. Firebase Hosting always serves existing static files (`dist/app-ads.txt`) before applying rewrites.

#### E. GitHub Pages
- Upload or deploy the `dist/` folder via GitHub Actions (`actions/deploy-pages`).
- Copy `dist/index.html` to `dist/404.html` during the build step so deep links (`/privacy-policy`) load the SPA router while `dist/app-ads.txt` is served directly at `/app-ads.txt`.

#### F. Traditional Web Hosting (Apache / Nginx / cPanel)
- Upload the contents of `dist/` into your web root (`public_html/` or `/var/www/mohistudio.pro.bd/`).
- **Nginx**:
  ```nginx
  location / {
    try_files $uri $uri/ /index.html;
  }
  ```
- **Apache (`.htaccess`)**:
  ```apache
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
  ```

---

## 5. Custom Domain Connection & HTTPS Requirements

1. **DNS Configuration**:
   - Point the apex domain `mohistudio.pro.bd` (`A` / `AAAA` or `ALIAS` / `ANAME` record) and `www.mohistudio.pro.bd` (`CNAME` record) to your chosen hosting provider.
2. **HTTPS / SSL Enforcement**:
   - Enable automatic Let's Encrypt / managed TLS certificates on your host.
   - Enforce HTTP-to-HTTPS redirect (`http://mohistudio.pro.bd` -> `https://mohistudio.pro.bd`).
   - Ensure both `https://mohistudio.pro.bd/app-ads.txt` and `http://mohistudio.pro.bd/app-ads.txt` resolve cleanly for Google AdMob crawlers.
3. **Google Play Console Configuration**:
   - In Google Play Console, set your **Developer Website** under Store Settings to:
     `https://mohistudio.pro.bd`
   - Set your application **Privacy Policy URL** to:
     `https://mohistudio.pro.bd/privacy-policy`
