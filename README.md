# Clear to Carry NYC (cleartocarrynyc.com)

NYC firearm license practice site for Zayrov Law, P.C. Next.js 16. Clients
screen themselves, apply and retain the firm, pay by Zelle, and upload documents
to a private portal. The attorney runs everything from `/admin`.

## The funnel

1. **Screen** (`/apply`): 7 questions, then a green / yellow / red result with honest notes.
2. **Apply now**: choose an engagement (consult, review, or full representation by license type).
3. **Retain**: name, phone, email, acknowledgment. The client gets an email with
   the fee, Zelle instructions, a reference number, and their private portal link.
4. **Portal**: four steps (Identity, Residence, History, Qualification). The client
   uploads only what we ask for, one step at a time.
5. **After filing**: the client sees status and the 180-day clock. You update it in `/admin`.

Anyone who isn't ready to apply leaves a callback request, which lands in the
pipeline as a lead.

## Attorney dashboard: `/admin`

Sign in with `ADMIN_PASSWORD`.

- **Leads**: every screening and consult request, with answers and a green/yellow/red dot.
  Move each one through New, Contacted, Consult booked, Retained, or Not a fit. Add private notes.
- **Clients**: every engagement. Tick *Engagement letter signed* and *Payment received*,
  move the step, open uploaded documents, mark *Filed*, set status and outcome.
  Ticking payment, opening a step, filing, and status changes each email the client automatically.
- **Copy client portal link** resends a client their access if they lose the email.

You also get an email for every new lead, engagement, and upload.

## Where to edit things

- `lib/content.js`: all prices, packages, screening questions, portal steps, FAQ, Bruen article.
- `app/page.jsx`: homepage. Add real testimonials to `TESTIMONIALS`. The section stays hidden while it's empty.
- `app/privacy/page.jsx`: privacy policy.

## Hosting (Railway, about $5/month)

This site needs a server with a disk because clients upload documents. Vercel won't work.

1. railway.app, sign in with GitHub, then **New Project**, **Deploy from GitHub repo**, and pick `Clear-to-carry`.
2. In the service, open **Settings**, then **Volumes**, then **Add Volume** with mount path `/data`.
3. In **Variables**, add every line from `.env.example` with real values.
4. In **Settings**, **Networking**, **Custom Domain**, add `cleartocarrynyc.com` and `www.cleartocarrynyc.com`.
   Railway shows the DNS record to add at your domain registrar (see LAUNCH steps in the firm repo).
5. Deploys happen automatically on every push to `main`.

## Run locally

    npm install
    cp .env.example .env    # fill in values; DATA_DIR=./data works locally
    npm run dev

## Security notes

- Prices are taken from the server's price list, never from the browser.
- Clients can't mark their own file filed or skip steps. A step opens only when its documents are in.
- Uploads are type- and size-checked, stored outside the web root, and downloadable only from `/admin`.
- The portal link works like a password. It is emailed only to the client, and the page sends no referrer.
- Back up `/data` (Railway volume backups) since it holds client documents.
