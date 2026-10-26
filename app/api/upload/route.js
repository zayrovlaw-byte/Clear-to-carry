import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { getClient, updateClient, notify } from "@/lib/db";

const MAX_BYTES = 15 * 1024 * 1024;
const ALLOWED = new Set([
  "application/pdf", "image/jpeg", "image/png", "image/heic", "image/heif", "image/webp",
]);
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "data", "uploads");

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const clientId = String(form.get("clientId") || "");
    const itemId = String(form.get("itemId") || "").slice(0, 10);
    if (!file || typeof file === "string" || !clientId || !itemId) {
      return NextResponse.json({ error: "Missing file or identifiers." }, { status: 400 });
    }
    const client = await getClient(clientId);
    if (!client) return NextResponse.json({ error: "Unknown client." }, { status: 404 });
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File is over 15 MB. A phone photo or standard PDF is fine." }, { status: 413 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: "Send a PDF or a photo (JPG, PNG, HEIC)." }, { status: 415 });
    }
    const safeName = (file.name || "upload").replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100);
    const dir = path.join(UPLOAD_DIR, clientId);
    await fs.mkdir(dir, { recursive: true });
    const stored = crypto.randomBytes(6).toString("hex") + "_" + itemId + "_" + safeName;
    await fs.writeFile(path.join(dir, stored), Buffer.from(await file.arrayBuffer()));
    const docs = {
      ...(client.docs || {}),
      [itemId]: { name: safeName, size: file.size, at: new Date().toISOString(), stored, status: "received" },
    };
    const updated = await updateClient(clientId, { docs });
    await notify(
      `[Clear to Carry] Upload from ${client.name}: ${itemId}`,
      `Client: ${client.name} (${client.ref})\nItem: ${itemId}\nFile: ${safeName} (${Math.round(file.size / 1024)} KB)`
    );
    return NextResponse.json({ ok: true, docs: updated.docs });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Upload failed. Please try again or call us." }, { status: 500 });
  }
}
