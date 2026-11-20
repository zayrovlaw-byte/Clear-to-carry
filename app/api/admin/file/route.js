import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getClient, UPLOAD_DIR } from "@/lib/db";

const TYPES = { pdf: "application/pdf", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", heic: "image/heic", heif: "image/heif" };

/* Attorney-only download of a client upload: /api/admin/file?client=<id>&item=<itemId> */
export async function GET(req) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const u = new URL(req.url);
  const client = await getClient(u.searchParams.get("client"));
  const doc = client?.docs?.[u.searchParams.get("item")];
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const file = path.join(UPLOAD_DIR, client.id, path.basename(doc.stored));
  const data = await fs.readFile(file).catch(() => null);
  if (!data) return NextResponse.json({ error: "File missing on disk" }, { status: 404 });
  const ext = doc.name.toLowerCase().split(".").pop();
  return new NextResponse(data, {
    headers: {
      "Content-Type": TYPES[ext] || "application/octet-stream",
      "Content-Disposition": `inline; filename="${client.ref}_${doc.name}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
