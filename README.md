# Clear to Carry - production site

NYC firearm license practice site for Zayrov Law, P.C. Next.js 14, no database
server required (JSON file storage suits a solo firm's volume), instant email
notifications on every lead and upload.

## Run it locally

    npm install
    cp .env.example .env
    npm run dev

Open http://localhost:3000

## What is where

- `/`            Landing page (server-rendered, SEO)
- `/apply`       60-second screening -> tiers/packages -> Zelle checkout -> client portal
- `/bruen`       Article page (SEO surface)
- `/faq`         FAQ with schema.org markup (Google rich results)
- `/privacy`     Privacy policy
- `app/api/lead`    stores leads, emails you instantly
- `app/api/client`  creates/fetches/updates client files
- `app/api/upload`  validated document uploads (PDF/images, 15 MB cap) to data/uploads/<clientId>/
- `lib/content.js`  ALL copy, prices, questionnaire, phases. Edit prices here.
- `data/`           leads.json, clients.json, uploads/ (gitignored)

## Before launch, in order

1. Set real prices in `lib/content.js` (advertised fees bind for 30 days under RPC 7.1).
2. Replace placeholder testimonials in `app/page.jsx` with real, consented client quotes.
3. Add your professional portrait (replace the photo frame block in `app/page.jsx`).
4. Sign up at resend.com (free), verify your domain, put the API key and
   NOTIFY_EMAIL in `.env`. Until then, notifications only print to the server log.
5. Review `/privacy` wording.

## Deploy

Needs a persistent disk (JSON storage + uploads), so use Railway, Render, or a
small VPS, not serverless Vercel:

- Railway: railway.app -> New Project -> Deploy from repo -> add a Volume mounted
  at /data -> set env vars DATA_DIR=/data and UPLOAD_DIR=/data/uploads -> done.
- Any VPS: `npm run build && npm start` behind Caddy or nginx for HTTPS.

Point cleartocarry.nyc (or your chosen domain) at it.

## Attorney workflow (no admin UI yet, by design)

- Leads land in `data/leads.json` and your inbox. Call fast.
- New engagements email you with the Zelle memo ref. Match payment in your bank
  app, send the engagement letter.
- To verify payment / advance status / mark filed, edit `data/clients.json`
  (fields: paymentVerified, phase, filedAt, appStatus 0-3) or ask Claude Code to
  build the admin screen next.

## Security notes

- Uploads are validated by type and size and stored outside the web root; they
  are never publicly served.
- HTTPS at the proxy is mandatory before real client documents flow.
- The portal link is the client id in localStorage; production hardening step
  for later: emailed magic links instead.
