import { NextResponse } from "next/server";
import { addLead, siteUrl } from "@/lib/db";
import { notifyOffice, emailClient } from "@/lib/mail";
import { emails } from "@/lib/emails";
import { isLocale } from "@/lib/i18n";

const clean = (v, n) => String(v || "").slice(0, n).trim();

/* A callback request from someone not ready to book. */
export async function POST(req) {
  try {
    const body = await req.json();
    // Honeypot: humans never see this field; bots fill it. Pretend success.
    if (body.company) return NextResponse.json({ ok: true });
    const name = clean(body.name, 120);
    const phone = clean(body.phone, 40);
    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }
    const lang = isLocale(body.lang) ? body.lang : "en";
    const lead = await addLead({
      name,
      phone,
      email: clean(body.email, 160),
      lang,
      kind: clean(body.kind || "callback", 40),
      light: ["green", "yellow", "red"].includes(body.light) ? body.light : undefined,
      note: clean(body.note, 2000),
      answers: Array.isArray(body.answers)
        ? body.answers.slice(0, 20).map((a) => ({ id: clean(a.id, 20), answer: clean(a.answer, 160) }))
        : undefined,
    });
    await notifyOffice(
      `New ${lead.kind} lead${lead.light ? " (" + lead.light.toUpperCase() + ")" : ""}: ${name}`,
      `Name: ${name}\nPhone: ${phone}\nEmail: ${lead.email || "-"}\nLanguage: ${lang}\nType: ${lead.kind}\n` +
        (lead.light ? `Screening: ${lead.light}\n` : "") +
        (lead.answers ? "Answers:\n" + lead.answers.map((a) => `  ${a.id}: ${a.answer}`).join("\n") + "\n" : "") +
        (lead.note ? `Note: ${lead.note}\n` : "") +
        `\nCall within the hour. Pipeline: ${siteUrl()}/admin`,
      lead.email || undefined
    );
    if (lead.email) {
      const m = emails(lang).lead(lead);
      await emailClient(lead.email, m.subject, m.text, lang);
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong. Please call us." }, { status: 500 });
  }
}
