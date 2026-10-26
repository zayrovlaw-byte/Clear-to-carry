import { NextResponse } from "next/server";
import { addLead, notify } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const name = String(body.name || "").slice(0, 120).trim();
    const phone = String(body.phone || "").slice(0, 40).trim();
    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }
    const lead = await addLead({
      name,
      phone,
      email: String(body.email || "").slice(0, 160),
      kind: String(body.kind || "consult").slice(0, 40),
      light: body.light ? String(body.light).slice(0, 10) : undefined,
      interest: body.interest ? String(body.interest).slice(0, 40) : undefined,
      note: String(body.note || "").slice(0, 2000),
      answers: Array.isArray(body.answers) ? body.answers.slice(0, 20) : undefined,
    });
    await notify(
      `[Clear to Carry] New ${lead.kind} lead${lead.light ? " (" + lead.light.toUpperCase() + ")" : ""}: ${name}`,
      `Name: ${name}\nPhone: ${phone}\nEmail: ${lead.email || "-"}\nType: ${lead.kind}\n` +
        (lead.light ? `Screening: ${lead.light}\n` : "") +
        (lead.answers ? "Answers:\n" + lead.answers.map((a) => `  ${a.id}: ${a.answer}`).join("\n") + "\n" : "") +
        (lead.note ? `Note: ${lead.note}\n` : "") +
        `\nCall within the hour. Speed wins these.`
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong. Please call us." }, { status: 500 });
  }
}
