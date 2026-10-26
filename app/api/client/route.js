import { NextResponse } from "next/server";
import { addClient, getClient, updateClient, notify } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const name = String(body.name || "").slice(0, 120).trim();
    const phone = String(body.phone || "").slice(0, 40).trim();
    if (!name || !phone || !body.packageId) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const client = await addClient({
      name,
      phone,
      email: String(body.email || "").slice(0, 160),
      package: String(body.packageId).slice(0, 40),
      packageName: String(body.packageName || "").slice(0, 80),
      price: Number(body.price) || 0,
      ackAt: new Date().toISOString(),
    });
    await notify(
      `[Clear to Carry] NEW ENGAGEMENT: ${name} - ${client.packageName} - $${client.price}`,
      `Name: ${name}\nPhone: ${phone}\nEmail: ${client.email || "-"}\nPackage: ${client.packageName}\nFee: $${client.price}\nRef: ${client.ref}\n\nAwaiting Zelle matching memo ${client.ref}. Send engagement letter now.`
    );
    return NextResponse.json({ id: client.id, ref: client.ref });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong. Please call us." }, { status: 500 });
  }
}

export async function GET(req) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const client = await getClient(id);
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(client);
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const allowed = {};
    if (typeof body.phase === "number" && body.phase >= 1 && body.phase <= 4) allowed.phase = body.phase;
    if (body.filedAt === true) allowed.filedAt = new Date().toISOString();
    const updated = await updateClient(body.id, allowed);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
