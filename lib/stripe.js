import crypto from "crypto";
import { getClient, updateClient, siteUrl } from "@/lib/db";
import { notifyOffice, emailClient } from "@/lib/mail";
import { emails, balance } from "@/lib/emails";
import { CONSULT_FEE, money } from "@/lib/content";

/* Card payments through Stripe Checkout (Stripe's hosted payment page).
   Card details never touch this site. Turned on by setting STRIPE_SECRET_KEY;
   without it the card button simply does not appear and Zelle still works.
   STRIPE_API_BASE exists only so tests can point at a mock server. */

const API = () => (process.env.STRIPE_API_BASE || "https://api.stripe.com").replace(/\/$/, "");
export const cardEnabled = () => !!process.env.STRIPE_SECRET_KEY;

async function stripe(method, path, params) {
  const r = await fetch(API() + "/v1" + path, {
    method,
    headers: {
      Authorization: "Bearer " + process.env.STRIPE_SECRET_KEY,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params ? new URLSearchParams(params).toString() : undefined,
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data?.error?.message || "Stripe request failed");
  return data;
}

/* What the client owes right now, decided on the server only. */
export function amountDue(c, kind) {
  if (kind === "consult") return !c.consultPaid && !c.portalOpen ? CONSULT_FEE : 0;
  if (kind === "balance") return c.portalOpen && !c.paymentVerified ? balance(c) : 0;
  return 0;
}

const LABEL = {
  consult: "Consultation · Clear to Carry",
  balance: "Retainer · Clear to Carry",
};

export async function createCheckout(c, kind) {
  const amount = amountDue(c, kind);
  if (!amount) throw new Error("Nothing is due.");
  const prefix = c.lang && c.lang !== "en" ? "/" + c.lang : "";
  const back = `${siteUrl()}${prefix}/apply?view=portal&id=${encodeURIComponent(c.id)}`;
  const session = await stripe("POST", "/checkout/sessions", {
    mode: "payment",
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": String(Math.round(amount * 100)),
    "line_items[0][price_data][product_data][name]": kind === "balance" && c.engagementName
      ? `${c.engagementName} · Clear to Carry`
      : LABEL[kind],
    "line_items[0][price_data][product_data][description]": kind === "consult"
      ? `Zayrov Law, P.C. · Ref ${c.ref} · Non-refundable, credited in full toward any retainer`
      : `Zayrov Law, P.C. · Ref ${c.ref}`,
    customer_email: c.email,
    client_reference_id: c.id,
    "metadata[client_id]": c.id,
    "metadata[kind]": kind,
    "metadata[ref]": c.ref,
    "payment_intent_data[description]": `${LABEL[kind]} · ${c.name} · ${c.ref}`,
    locale: ["en", "es", "ru"].includes(c.lang) ? c.lang : "auto",
    success_url: back + "&paid={CHECKOUT_SESSION_ID}",
    cancel_url: back,
  });
  return session.url;
}

/* Records a completed Checkout Session once, whether it arrives by webhook or
   by the client landing back on the site. Safe to call repeatedly. */
export async function recordSession(session) {
  if (!session || session.payment_status !== "paid") return { ok: false };
  const id = session.metadata?.client_id || session.client_reference_id;
  const kind = session.metadata?.kind;
  const before = await getClient(id);
  if (!before || !["consult", "balance"].includes(kind)) return { ok: false };
  if ((before.payments || []).some((p) => p.session === session.id)) return { ok: true, already: true };

  const amount = (session.amount_total || 0) / 100;
  const patch = (cur) => ({
    payments: [...(cur.payments || []), { session: session.id, kind, amount, method: "card", at: new Date().toISOString() }],
    ...(kind === "consult" ? { consultPaid: true } : { paymentVerified: true }),
  });
  const updated = await updateClient(id, patch);
  const E = emails(updated.lang);
  const m = kind === "consult" ? E.consultPaid(updated) : E.retainerPaid(updated);
  await emailClient(updated.email, m.subject, m.text, updated.lang);
  await notifyOffice(
    `CARD PAYMENT: ${updated.name} · ${money(amount)} · ${kind === "consult" ? "consultation" : "retainer"}`,
    `${updated.name} (${updated.ref}) paid ${money(amount)} by card through Stripe.\n` +
      (kind === "consult" ? "Call to schedule the consultation." : "The retainer is marked received.") +
      `\nDashboard: ${siteUrl()}/admin`
  );
  return { ok: true };
}

export async function retrieveSession(sessionId) {
  if (!/^cs_[A-Za-z0-9_]+$/.test(String(sessionId || ""))) return null;
  return stripe("GET", "/checkout/sessions/" + sessionId);
}

/* Stripe-Signature: t=<timestamp>,v1=<hex hmac of "t.payload">. Five-minute tolerance. */
export function verifySignature(payload, header, secret) {
  if (!header || !secret) return false;
  const parts = Object.fromEntries(header.split(",").map((kv) => kv.split("=")).filter((p) => p.length === 2).map(([k, v]) => [k, v]));
  const sigs = header.split(",").filter((kv) => kv.startsWith("v1=")).map((kv) => kv.slice(3));
  const t = Number(parts.t);
  if (!t || !sigs.length || Math.abs(Date.now() / 1000 - t) > 300) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex");
  return sigs.some((s) => s.length === expected.length && crypto.timingSafeEqual(Buffer.from(s), Buffer.from(expected)));
}
