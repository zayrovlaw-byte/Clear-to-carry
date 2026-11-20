import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/* Single-attorney login. ADMIN_PASSWORD lives only in the server environment;
   the session cookie is an HMAC of it, so changing the password logs everyone out. */
export const COOKIE = "ctc_admin";

function token() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || pw.length < 10) return null; // refuse to run admin with no or weak password
  return crypto.createHmac("sha256", pw).update("ctc-admin-v1").digest("hex");
}

export function checkPassword(input) {
  const pw = process.env.ADMIN_PASSWORD || "";
  const a = crypto.createHash("sha256").update(String(input || "")).digest();
  const b = crypto.createHash("sha256").update(pw).digest();
  return pw.length >= 10 && crypto.timingSafeEqual(a, b);
}

export function sessionToken() {
  return token();
}

export async function isAdmin() {
  const t = token();
  if (!t) return false;
  const c = (await cookies()).get(COOKIE)?.value || "";
  return c.length === t.length && crypto.timingSafeEqual(Buffer.from(c), Buffer.from(t));
}

export async function requireAdmin() {
  if (await isAdmin()) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
