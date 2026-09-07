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
- `/your-rights` Article page (SEO surface; `/bruen` redirects here)
- `/reviews`     Testimonials and success stories (placeholder content until launch)
- `/attorney`    Attorney bio page
- `/faq`         FAQ with schema.org markup (Google rich results)
- `/privacy`     Privacy policy
- `app/api/lead`    stores leads, emails you instantly
- `app/api/client`  creates/fetches/updates client files
- `app/api/upload`  validated document uploads (PDF/images, 15 MB cap) to data/uploads/<clientId>/
- `lib/content.js`  ALL copy, prices, questionnaire, phases. Edit prices here.
- `data/`           leads.json, clients.json, uploads/ (gitignored)

## Brand

Scheme: espresso ground (#150E08), hot amber accent (#E3A64F), and a flame
gradient (#F6C45A - #E2703A - #B33A2B) reserved for the brand rule and the
expedite timeline. Heat is the motif; the flame gradient is never used for
ordinary borders or text.

One mark: the CLEAR TO CARRY lockup, set in Cormorant Garamond over a ghosted
numeral 2, underlined with the flame rule, with PISTOL LICENSING SERVICE
beneath. There is no
separate crest. Three typefaces total and no more: Cormorant Garamond for
display, Inter for body, IBM Plex Mono for labels and eyebrows. Adding a
fourth is how a brand stops looking like one.

## Hero photograph

The hero is built to take a real colour photograph. Drop a licensed image at
`public/hero-nyc.jpg` and it takes over the hero background automatically —
no code change. Until that file exists the layer is simply empty and the drawn
skyline and Liberty show through, so the hero is never broken while you are
sourcing the shot.

- Landscape, about 2400px wide, shot toward Lower Manhattan or Liberty Island.
- Golden hour or blue hour sits best against the palette; a flat grey midday
  sky fights it.
- A dark scrim is layered over the photo automatically so the headline stays
  legible. You do not need to darken the image yourself.
- To nudge the crop, change `background-position` on `.v-herophoto` in
  `app/globals.css`.

**Licensing matters here.** This is a law firm's advertising. Buy a licence
(Getty, Adobe Stock, Stocksy), commission a local photographer, or use a shot
you took yourself. Do not pull one off a search engine — a stock-photo demand
letter is an expensive way to save $50.

## Before launch, in order

1. Confirm the fee band and consultation fee in `lib/content.js` (advertised
   fees bind for 30 days under RPC 7.1).
2. Substantiate the figures in `RESULTS` in `lib/content.js` — see the comment
   block above them. Keep records of applications filed and approved; update
   `asOf` when you refresh them. If a figure cannot be proven from your own
   files, lower it or delete it.
3. Replace placeholder testimonials and approval specimens on `/reviews` with
   real, consented client material.
4. Add your professional portrait (replace the photo frame block in
   `app/attorney/page.jsx`).
5. Add the hero photograph (see above).
6. Sign up at resend.com (free), verify your domain, put the API key and
   NOTIFY_EMAIL in `.env`. Until then, notifications only print to the server log.
7. Review `/privacy` wording.

## Domain-bound settings

The production domain is assumed to be cleartocarry.nyc in three places:
`metadataBase` in `app/layout.jsx`, `app/sitemap.js`, and `app/robots.js`.
Launching on a different domain means changing all three. The share card is
`public/og.png` (regenerate if the brand changes); local-business structured
data lives in `app/layout.jsx`.

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
