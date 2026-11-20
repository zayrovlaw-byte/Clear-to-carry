# Clear to Carry NYC (cleartocarrynyc.com)

NYC firearm license practice site for Zayrov Law, P.C. Next.js 16, English,
Spanish and Russian, JSON-file storage (no database server), email through the
firm's Gmail / Google Workspace account, and an attorney dashboard at `/admin`.

## How a client moves through it

1. **Free screening** (`/apply`): 7 questions, then a green / yellow / red result
   with plain-language notes. Visitors not ready to book can leave a callback number.
2. **Book the consultation**: $159, 15 to 30 minutes, credited in full toward any
   retainer. The client gives name, phone, email and an acknowledgment, then sees
   Zelle instructions with a reference number. The same details are emailed to them,
   in their language, with their private link.
3. **You**: watch for the Zelle payment, tick *$159 consult paid* in `/admin` (the
   client is emailed), and call to schedule.
4. **After the consultation**: in `/admin`, enter the engagement and the flat fee you
   quoted, and press *Send quote and open portal*. The client is emailed the fee, the
   $159 credit, the balance, Zelle instructions, and their portal link.
5. **Portal**: four steps (Identity, Residence, History, Qualification). The client
   uploads only what each step asks for; the next step opens when the current one is
   complete. Uploads are refused until you open the portal.
6. **Filing**: tick *Filed*, then move the status. The client's portal shows the
   stage and the 180-day clock, and each change emails them.

## Attorney dashboard: `/admin`

Sign in with `ADMIN_PASSWORD`. Two tabs:

- **Consultations & clients**: every booking, with screening answers, language, and
  controls for consult payment, quote, engagement letter, retainer, step, filing,
  status, outcome, uploaded documents, and private notes.
- **Callbacks**: people who asked for a call instead of booking, with pipeline stages.

You get an email for every booking, callback and upload.

## Where to edit things

- `lib/content.js`: phone, consultation fee and length, Zelle address, optional scheduler link.
- `lib/locales/launch.js`: all launch copy (pricing, booking, portal, attorney bio),
  English, Spanish and Russian side by side. Edit here first.
- `lib/locales/{en,es,ru}.js`: the rest of the site text. All three must keep identical keys.
- `lib/schema.js`: structure (license types, screening grades, blog slugs and dates).
- `lib/emails.js`: client emails in all three languages.
- `app/globals.css`: the design. Colors are tokens at the top.

## Testimonials and results

The Reviews page is unpublished. Add real, client-approved testimonials only
(NY Rules of Professional Conduct 7.1), with the client's written consent, before
bringing it back. Do not publish approval rates or client counts unless the firm's
records support them.

## Hosting (Railway, about $5/month)

Clients upload documents, so the site needs a server with a disk. Vercel won't work.

1. railway.app, sign in with GitHub, **New Project**, **Deploy from GitHub repo**, pick `Clear-to-carry`.
2. Service **Settings**, **Volumes**, **Add Volume**, mount path `/data`.
3. **Variables**: add every line from `.env.example` with real values.
4. **Settings**, **Networking**, **Custom Domain**: add `cleartocarrynyc.com` and
   `www.cleartocarrynyc.com`, then add the DNS records Railway shows at your registrar.
5. Railway deploys on every push to the branch you select (normally `main`).

## Before launch

1. Set `ADMIN_PASSWORD` (10+ characters), `SMTP_USER`, `SMTP_PASS` (a Google app
   password), `NOTIFY_EMAIL`, `NEXT_PUBLIC_ZELLE_TO`, `SITE_URL`.
2. Book a test consultation yourself and check both emails arrive.
3. Have a native speaker read the Spanish and Russian disclaimers and pricing text.
4. Turn on Railway volume backups: `/data` holds client documents.

## Run locally

    npm install
    cp .env.example .env    # DATA_DIR=./data works locally
    npm run dev

Without SMTP settings, emails are printed to the server log instead of sent.

## Security notes

- The consultation fee and quotes are set on the server or by the attorney, never by the browser.
- Clients cannot open steps out of order, upload before their portal is opened, or mark files filed.
- Uploads are type- and size-checked, stored outside the web root, and downloadable only from `/admin`.
- The portal link works like a password. It is emailed only to the client, and the page sends no referrer.
- `/admin` and `/api` are excluded from search engines.

## Domain-bound settings

The production domain is cleartocarrynyc.com in `app/layout.jsx` (metadataBase),
`lib/meta.js`, `app/sitemap.js` and `app/robots.js`.
