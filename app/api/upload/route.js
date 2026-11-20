import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { getClient, updateClient, publicClient, UPLOAD_DIR, addLog, portalLink } from "@/lib/db";
import { mailClient } from "@/lib/clientmail";
import { emails } from "@/lib/emails";
import { notifyOffice } from "@/lib/mail";
import { getDict } from "@/lib/i18n";

const MAX_BYTES = 15 * 1024 * 1024;
const ALLOWED = new Set([
  "application/pdf", "image/jpeg", "image/png", "image/heic", "image/heif", "image/webp",
]);
const ITEMS = new Map(getDict("en").phases.flatMap((p) => p.items.map((i) => [i.id, i.label])));

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const clientId = String(form.get("clientId") || "");
    const itemId = String(form.get("itemId") || "");
    if (!file || typeof file === "string" || !clientId || !ITEMS.has(itemId)) {
      return NextResponse.json({ error: "Missing file or identifiers." }, { status: 400 });
    }
    const client = await getClient(clientId);
    if (!client) return NextResponse.json({ error: "Unknown client." }, { status: 404 });
    if (!client.portalOpen) return NextResponse.json({ error: "Your portal opens after your consultation." }, { status: 403 });
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File is over 15 MB. A phone photo or standard PDF is fine." }, { status: 413 });
    }
    // Some phones send HEIC with an empty type; accept by extension in that case.
    const ext = (file.name || "").toLowerCase().split(".").pop();
    if (!ALLOWED.has(file.type) && !(file.type === "" && ["heic", "heif"].includes(ext))) {
      return NextResponse.json({ error: "Send a PDF or a photo (JPG, PNG, HEIC)." }, { status: 415 });
    }
    const safeName = (file.name || "upload").replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100);
    const dir = path.join(UPLOAD_DIR, client.id);
    await fs.mkdir(dir, { recursive: true });
    const stored = crypto.randomBytes(6).toString("hex") + "_" + itemId + "_" + safeName;
    await fs.writeFile(path.join(dir, stored), Buffer.from(await file.arrayBuffer()));
    const updated = await updateClient(client.id, (cur) => ({
      docs: {
        ...(cur.docs || {}),
        [itemId]: { name: safeName, size: file.size, at: new Date().toISOString(), stored, status: "received" },
      },
    }));
    const replaced = !!client.docs?.[itemId];
    await addLog(client.id, `${replaced ? "Replaced" : "Uploaded"}: ${ITEMS.get(itemId)} (${safeName})`, "Client");
    const t = getDict(client.lang || "en");
    const step = t.phases.find((p) => p.items.some((i) => i.id === itemId));
    const label = step.items.find((i) => i.id === itemId).label.split(" · ")[0];
    const left = step.items.filter((i) => !updated.docs?.[i.id]).map((i) => i.label.split(" · ")[0]);
    await mailClient(updated, emails(client.lang).uploadReceived(updated, label, left, step.name, portalLink(updated)));
    await notifyOffice(
      `Upload from ${client.name}: ${ITEMS.get(itemId)}`,
      `Client: ${client.name} (${client.ref})\nItem: ${ITEMS.get(itemId)}\nFile: ${safeName} (${Math.round(file.size / 1024)} KB)\n\nOpen it in the dashboard: ${process.env.SITE_URL || "https://cleartocarrynyc.com"}/admin`
    );
    return NextResponse.json({ ok: true, docs: publicClient(updated).docs });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Upload failed. Please try again or call us." }, { status: 500 });
  }
}

/* Next.js route config: allow the 15 MB body. */
export const maxDuration = 60;
