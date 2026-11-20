import { NextResponse } from "next/server";
import { addClient, getClient, updateClient, publicClient, portalLink, siteUrl } from "@/lib/db";
import { notifyOffice, emailClient } from "@/lib/mail";
import { emails } from "@/lib/emails";
import { getDict, isLocale } from "@/lib/i18n";
import { CONSULT_FEE, money } from "@/lib/content";
import { cardEnabled, amountDue } from "@/lib/stripe";

const clean = (v, n) => String(v || "").slice(0, n).trim();

/* Booking a consultation. The fee is fixed on the server; the browser never
   sends a price. Everything after the consultation is quoted by the attorney
   in /admin, which is what opens the document portal. */
export async function POST(req) {
  try {
    const body = await req.json();
    if (body.company) return NextResponse.json({ error: "Rejected." }, { status: 400 });
    const name = clean(body.name, 120);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 160);
    const lang = isLocale(body.lang) ? body.lang : "en";
    if (!name || !phone || !/.+@.+\..+/.test(email) || body.ack !== true) {
      return NextResponse.json({ error: "Name, phone, email, and acknowledgment are required." }, { status: 400 });
    }
    const licence = getDict("en").packages.find((p) => p.id === body.licence);
    const client = await addClient({
      name,
      phone,
      email,
      lang,
      interest: clean(body.interest, 60),
      licence: licence ? licence.name : "",
      note: clean(body.note, 2000),
      light: ["green", "yellow", "red"].includes(body.light) ? body.light : undefined,
      answers: Array.isArray(body.answers)
        ? body.answers.slice(0, 20).map((a) => ({ id: clean(a.id, 20), answer: clean(a.answer, 160) }))
        : undefined,
      consultFee: CONSULT_FEE,
      consultPaid: false,
      portalOpen: false,
      packageName: "Consultation",
      ackAt: new Date().toISOString(),
    });
    const link = portalLink(client);
    await notifyOffice(
      `CONSULT BOOKED: ${name} · ${money(CONSULT_FEE)} · ${lang.toUpperCase()}`,
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nLanguage: ${lang}\n` +
        (client.licence ? `Licence: ${client.licence}\n` : "") +
        (client.interest ? `Protecting: ${client.interest}\n` : "") +
        (client.light ? `Screening: ${client.light}\n` : "") +
        (client.answers ? "Answers:\n" + client.answers.map((a) => `  ${a.id}: ${a.answer}`).join("\n") + "\n" : "") +
        (client.note ? `Note: ${client.note}\n` : "") +
        `Ref: ${client.ref}\n\nWatch for a Zelle payment of ${money(CONSULT_FEE)} with memo ${client.ref}, then call to schedule. ` +
        `Dashboard: ${siteUrl()}/admin`,
      email
    );
    const m = emails(lang).consultBooked(client, link, cardEnabled());
    await emailClient(email, m.subject, m.text, lang);
    return NextResponse.json({ id: client.id, ref: client.ref, cardEnabled: cardEnabled() });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong. Please call us." }, { status: 500 });
  }
}

export async function GET(req) {
  const id = new URL(req.url).searchParams.get("id");
  const client = await getClient(id);
  if (!client) return NextResponse.json({ error: "notfound" }, { status: 404 });
  return NextResponse.json({ ...publicClient(client), cardEnabled: cardEnabled(), balanceDue: amountDue(client, "balance") });
}

/* The client may only open the next step once every item in the current one
   has been sent. Filing and status are set by the attorney in /admin. */
export async function PATCH(req) {
  try {
    const body = await req.json();
    const client = await getClient(body.id);
    if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const phases = getDict("en").phases;
    const phase = phases.find((p) => p.id === client.phase);
    const complete = phase && phase.items.every((it) => client.docs?.[it.id]);
    if (!client.portalOpen || body.advance !== true || !complete || client.phase >= phases.length) {
      return NextResponse.json({ error: "This step isn't complete yet." }, { status: 400 });
    }
    const updated = await updateClient(client.id, { phase: client.phase + 1 });
    await notifyOffice(
      `${client.name} completed ${phase.name}`,
      `${client.name} (${client.ref}) sent everything for ${phase.name} and opened the next step. Review the documents in the dashboard.`
    );
    return NextResponse.json({ ...publicClient(updated), cardEnabled: cardEnabled(), balanceDue: amountDue(updated, "balance") });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
