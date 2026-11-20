import { NextResponse } from "next/server";
import { addLead } from "@/lib/db";
import { notifyOffice, emailClient } from "@/lib/mail";
import { PHONE } from "@/lib/content";

const clean = (v, n) => String(v || "").slice(0, n).trim();

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
    const email = clean(body.email, 160);
    const lead = await addLead({
      name,
      phone,
      email,
      kind: clean(body.kind || "consult", 40),
      light: body.light ? clean(body.light, 10) : undefined,
      interest: body.interest ? clean(body.interest, 40) : undefined,
      note: clean(body.note, 2000),
      answers: Array.isArray(body.answers)
        ? body.answers.slice(0, 20).map((a) => ({ id: clean(a.id, 20), answer: clean(a.answer, 120) }))
        : undefined,
    });
    await notifyOffice(
      `New ${lead.kind} lead${lead.light ? " (" + lead.light.toUpperCase() + ")" : ""}: ${name}`,
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email || "-"}\nType: ${lead.kind}\n` +
        (lead.light ? `Screening: ${lead.light}\n` : "") +
        (lead.interest ? `Interest: ${lead.interest}\n` : "") +
        (lead.answers ? "Answers:\n" + lead.answers.map((a) => `  ${a.id}: ${a.answer}`).join("\n") + "\n" : "") +
        (lead.note ? `Note: ${lead.note}\n` : "") +
        `\nCall within the hour. Pipeline: ${process.env.SITE_URL || "https://cleartocarrynyc.com"}/admin`,
      email || undefined
    );
    await emailClient(
      email,
      "We received your request · Clear to Carry",
      `${name.split(" ")[0]},\n\nThank you for reaching out. The attorney will call you at ${phone} within one business day.\n\n` +
        `If you'd rather not wait, call ${PHONE}. When you're ready to retain the firm, you can choose your engagement at https://cleartocarrynyc.com/apply?view=packages.`
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong. Please call us." }, { status: 500 });
  }
}
