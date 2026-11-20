import { NextResponse } from "next/server";
import { addClient, getClient, updateClient, publicClient, portalLink } from "@/lib/db";
import { notifyOffice, emailClient } from "@/lib/mail";
import { PACKAGES, TIERS, PHASES, ZELLE_TO, PHONE } from "@/lib/content";

const clean = (v, n) => String(v || "").slice(0, n).trim();
const money = (n) => "$" + Number(n).toLocaleString("en-US");

/* Price always comes from the server's own price list, never from the browser. */
function findPackage(id) {
  const p = PACKAGES.find((x) => x.id === id) || TIERS.find((x) => x.id === id && x.checkout);
  return p ? { id: p.id, name: p.name, price: p.price } : null;
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (body.company) return NextResponse.json({ error: "Rejected." }, { status: 400 });
    const name = clean(body.name, 120);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 160);
    const pack = findPackage(String(body.packageId || ""));
    if (!name || !phone || !email || !pack) {
      return NextResponse.json({ error: "Name, phone, email, and engagement are required." }, { status: 400 });
    }
    const client = await addClient({
      name,
      phone,
      email,
      package: pack.id,
      packageName: pack.name,
      price: pack.price,
      ackAt: new Date().toISOString(),
    });
    const link = portalLink(client);
    await notifyOffice(
      `NEW ENGAGEMENT: ${name} · ${pack.name} · ${money(pack.price)}`,
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nEngagement: ${pack.name}\nFee: ${money(pack.price)}\nRef: ${client.ref}\n\n` +
        `Next: send the engagement letter, then watch for a Zelle payment with memo ${client.ref}. ` +
        `Mark payment received in the dashboard: ${process.env.SITE_URL || "https://cleartocarrynyc.com"}/admin`,
      email
    );
    await emailClient(
      email,
      `Your file is open · ${pack.name} · Ref ${client.ref}`,
      `${name.split(" ")[0]},\n\nThank you for choosing Zayrov Law. Your file is open.\n\n` +
        `ENGAGEMENT: ${pack.name}\nFLAT FEE: ${money(pack.price)}\nREFERENCE: ${client.ref}\n\n` +
        `WHAT HAPPENS NEXT\n1. We email your engagement letter for signature.\n` +
        `2. Pay by Zelle to ${ZELLE_TO}, amount ${money(pack.price)}, memo ${client.ref}. Prefer another method? Call ${PHONE}.\n` +
        `3. Use your private portal to send documents as we ask for them:\n${link}\n\n` +
        `Keep this email. The link above is your key to the portal, so please don't forward it.\n\n` +
        `Representation begins when the engagement letter is signed and payment clears.`
    );
    return NextResponse.json({ id: client.id, ref: client.ref, price: pack.price, name: pack.name });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong. Please call us." }, { status: 500 });
  }
}

export async function GET(req) {
  const id = new URL(req.url).searchParams.get("id");
  const client = await getClient(id);
  if (!client) return NextResponse.json({ error: "We couldn't find that file. Call us and we'll resend your link." }, { status: 404 });
  return NextResponse.json(publicClient(client));
}

/* The client may only open the next movement once every item in the current
   one has been sent. Filing and status are set by the attorney in /admin. */
export async function PATCH(req) {
  try {
    const body = await req.json();
    const client = await getClient(body.id);
    if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const phase = PHASES.find((p) => p.id === client.phase);
    const complete = phase && phase.items.every((it) => client.docs?.[it.id]);
    if (body.advance !== true || !complete || client.phase >= PHASES.length) {
      return NextResponse.json({ error: "This step isn't complete yet." }, { status: 400 });
    }
    const updated = await updateClient(client.id, { phase: client.phase + 1 });
    await notifyOffice(
      `${client.name} completed ${phase.name}`,
      `${client.name} (${client.ref}) sent everything for ${phase.name} and opened the next step. Review the documents in the dashboard.`
    );
    return NextResponse.json(publicClient(updated));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
