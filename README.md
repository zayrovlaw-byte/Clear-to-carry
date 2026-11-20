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

## Card payments (Stripe)

Clients can pay the $159 consultation and, after you quote, the retainer balance by
card through Stripe Checkout (Stripe's own secure payment page; card numbers never
touch this site). Zelle stays available as the alternative. The card buttons appear
only when `STRIPE_SECRET_KEY` is set.

1. Create a Stripe account in the firm's name and connect the firm's **operating**
   account for payouts (see the note on client funds below).
2. Developers -> API keys: copy the secret key into `STRIPE_SECRET_KEY`.
3. Developers -> Webhooks -> Add endpoint: `https://cleartocarrynyc.com/api/stripe/webhook`,
   events `checkout.session.completed` and `checkout.session.async_payment_succeeded`.
   Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
4. Test with a `sk_test_` key and card 4242 4242 4242 4242 before switching to the live key.

A card payment marks the consultation or retainer paid automatically, emails the
client, emails you, and shows in the dashboard as "Card · $amount".

Client funds: if a retainer is an advance on fees not yet earned, NY rules may
require it to be held in the firm's IOLA/escrow account, and card processing fees
cannot be taken out of client funds. Confirm how the firm treats these retainers
before pointing card retainer payouts at an operating account.

## Firm dashboard: `/admin`

For you and your staff only; clients never see it. It is not linked from the site,
is excluded from search engines, and requires a staff login. Each person at the firm
gets their own name and password (`ADMIN_USERS` in `.env.example`), and every action
is recorded with who did it.

- **Consultations & clients**: every booking, with screening answers, controls for
  consult payment, quote, engagement letter, retainer, step, filing, status, outcome,
  uploaded documents, private notes, reminders, and an **activity timeline** (bookings,
  payments, uploads, every email sent, every staff change, with names and times).
- **Callbacks**: people who asked for a call instead of booking.

You get an email for every booking, callback, card payment and upload.

## Client emails and reminders

Clients get an email when they book, when payment is received, when you quote, for
**every document they upload** (with what is still needed), when a step opens, when
the application is filed, and at each status change.

Automatic reminders (`lib/reminders.js`), checked hourly and sent 9am–7pm New York time:

| Reminder | First | Then every | At most |
| --- | --- | --- | --- |
| $159 consultation not paid | 24 hours after booking | 2 days | 2 |
| Documents outstanding (lists what is missing) | 3 days after the last upload | 4 days | 4 |
| Retainer balance unpaid | 3 days after the quote | 5 days | 3 |

In the dashboard you can pause reminders for a client, send one immediately, or run
the whole pass now. Every reminder appears in the client's activity timeline.

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

1. Set `ADMIN_USERS` (a name and 10+ character password for each staff member), `SMTP_USER`, `SMTP_PASS` (a Google app
   password), `NOTIFY_EMAIL`, `NEXT_PUBLIC_ZELLE_TO`, `SITE_URL`, and the two Stripe keys.
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
