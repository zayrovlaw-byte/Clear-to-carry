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
- `/apply`       60-second screening -> levels of support -> free consultation request
- `/blog`        Updates: licensing developments, one post per file in `BLOG_META`
- `/your-rights` Article page (SEO surface; `/bruen` redirects here)
- `/reviews`     Testimonials and success stories (placeholder content until launch)
- `/attorney`    Attorney bio page
- `/faq`         FAQ with schema.org markup (Google rich results)
- `/privacy`     Privacy policy
- `app/api/lead`    stores leads, emails you instantly
- `app/api/client`  creates/fetches/updates client files
- `app/api/upload`  validated document uploads (PDF/images, 15 MB cap) to data/uploads/<clientId>/
- `lib/schema.js`   Structure: licence types, support levels, screening questions
                    and grades, blog slugs and dates. Not translated.
- `lib/locales/*`   ALL copy, in English, Spanish and Russian. The three files
                    must keep identical key shapes; see "Languages".
- `lib/content.js`  Phone number and the booking-link switch only.
- `data/`           leads.json, clients.json, uploads/ (gitignored)

## Languages

English at `/`, Spanish at `/es`, Russian at `/ru` — real pages, not a
translate widget, so each one is separately indexable and carries hreflang
tags pointing at its siblings.

- `lib/schema.js` holds the structure: ids, prices, icons, screening grades.
  It exists once, so a price or a grade can never drift between languages.
- `lib/locales/{en,es,ru}.js` hold only text, keyed by those same ids.
- `lib/i18n.js` merges the two and is the single entry point: `getDict(lang)`.
- `lp(lang, path)` builds locale-correct links; the switcher in the nav keeps
  the reader on the same page when they change language.

**To change copy, edit all three locale files.** They must keep identical keys.
To add a language: add a file under `lib/locales`, register it in `LOCALES` and
`LOCALE_LABELS` in `lib/i18n.js`, and the routes, sitemap and hreflang follow
automatically.

**The translations need a native-speaker review before launch**, especially the
disclaimers in `footer.legal`, `resultsDisclaimer` and the checkout
acknowledgements. They are accurate, but a lawyer's advertising copy in another
language should be read by someone who practises in it.

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

## Booking

The consultation is free. It is the only thing a visitor books from the site,
and nothing on the site quotes a fee for anything else — representation is
scoped and quoted in that conversation. Every consultation button routes
through one switch:

    NEXT_PUBLIC_BOOKING_URL

**Set it** to a scheduling link — Calendly, Booksy, Acuity, Square Appointments
— and every button opens that page for the visitor to pick a time. Create the
event type as a **free** event: do not connect Stripe or PayPal to it. The
screening answers travel with the visitor (sessionStorage) and reach you with
the consultation request, so you open the call already knowing the file.

**Leave it empty** and the buttons fall back to the site's own consultation
request form: name, phone, optional email, what they want to protect, and a
note. It POSTs to /api/lead, which emails you and appends to
`data/leads.json`. Nothing breaks; it is just that you do the scheduling.

Either way the office phone number stays visible in the nav and under every
screening result, because some people would rather just call.

## Updates (blog)

The blog is the lead-generation surface: someone searching "NYC gun licence
arrest record" lands on a post, reads a plain-language answer, and the free
consultation is one click away.

To add a post:

1. Add an entry to `BLOG_META` in `lib/schema.js` — slug, date (`YYYY-MM-DD`),
   and a short tag. Newest first; that array is the display order.
2. Add the matching `blog["<slug>"]` entry to **all three** locale files with
   `title`, `dek` and a `body` array of paragraphs. A slug present in one
   language and missing from another fails the build, which is deliberate.
3. Routes, metadata, hreflang, sitemap entries and BlogPosting structured data
   are generated from those two things. There is nothing else to wire up.

Keep posts to published law and process. No case outcomes, no predictions, and
each post carries the general-commentary disclaimer from
`blogPage.legal` — advertising rules do not stop applying because it is a blog.

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

1. Substantiate the figures in `results` in `lib/locales/*` — keep records of
   applications filed and approved, and update `asOf` when you refresh them. If
   a figure cannot be proven from your own files, lower it or delete it. (No
   fee appears anywhere on the site, so nothing here binds you for 30 days
   under RPC 7.1. If you ever add one, that rule applies.)
3. Replace placeholder testimonials and approval specimens on `/reviews` with
   real, consented client material.
4. Add your professional portrait (replace the photo frame block in
   `app/attorney/page.jsx`).
5. Add the hero photograph (see above).
6. Sign up at resend.com (free), verify your domain, put the API key and
   NOTIFY_EMAIL in `.env`. Until then, notifications only print to the server log.
7. Review `/privacy` wording.

## Domain-bound settings

The production domain is assumed to be cleartocarrynyc.com in three places:
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

Point cleartocarrynyc.com (or your chosen domain) at it.

## Attorney workflow (no admin UI yet, by design)

- Leads land in `data/leads.json` and your inbox. Call fast.
- Every lead is a free consultation request. Quote the engagement on the call
  and send the engagement letter yourself; the site takes no payment and names
  no figure.
- To record a retainer / advance status / mark filed, edit `data/clients.json`
  (fields: paymentVerified, phase, filedAt, appStatus 0-3) or ask Claude Code to
  build the admin screen next.

## Security notes

- Uploads are validated by type and size and stored outside the web root; they
  are never publicly served.
- HTTPS at the proxy is mandatory before real client documents flow.
- The portal link is the client id in localStorage; production hardening step
  for later: emailed magic links instead.
