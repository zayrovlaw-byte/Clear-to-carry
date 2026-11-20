import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/* Firm staff logins for the dashboard. Clients never sign in here.

   ADMIN_USERS lists everyone at the firm who may use the dashboard:
     ADMIN_USERS=Manny:a-long-password;Assistant:another-long-password
   ADMIN_PASSWORD alone still works and signs in as "Attorney".
   Passwords must be 10+ characters. The session cookie is the staff name plus an
   HMAC keyed on every password, so changing any password logs everyone out. */
export const COOKIE = "ctc_admin";

function users() {
  const list = [];
  for (const entry of String(process.env.ADMIN_USERS || "").split(";")) {
    const i = entry.indexOf(":");
    if (i < 1) continue;
    const name = entry.slice(0, i).trim();
    const pw = entry.slice(i + 1).trim();
    if (name && pw.length >= 10) list.push({ name, pw });
  }
  const single = process.env.ADMIN_PASSWORD || "";
  if (single.length >= 10) list.push({ name: "Attorney", pw: single });
  return list;
}

function key() {
  const all = users().map((u) => u.name + ":" + u.pw).join("|");
  return all ? crypto.createHash("sha256").update("ctc-admin-v2|" + all).digest() : null;
}

function sign(name) {
  const k = key();
  return k ? crypto.createHmac("sha256", k).update(name).digest("hex") : null;
}

const same = (a, b) => {
  const x = crypto.createHash("sha256").update(String(a)).digest();
  const y = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
};

/* Returns the staff member's name, or null. Name is optional when only one
   person is configured. */
export function checkLogin(name, password) {
  const list = users();
  const want = String(name || "").trim().toLowerCase();
  let match = null;
  for (const u of list) {
    const nameOk = !want || u.name.toLowerCase() === want;
    if (same(u.pw, password || "") && nameOk && !match) match = u.name;
  }
  return match;
}

export function sessionToken(name) {
  const s = sign(name);
  return s ? Buffer.from(name).toString("base64url") + "." + s : null;
}

/* The signed-in staff member's name, or null. */
export async function currentStaff() {
  const raw = (await cookies()).get(COOKIE)?.value || "";
  const dot = raw.indexOf(".");
  if (dot < 1) return null;
  let name;
  try { name = Buffer.from(raw.slice(0, dot), "base64url").toString("utf8"); } catch { return null; }
  const expected = sign(name);
  const got = raw.slice(dot + 1);
  if (!expected || got.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(got), Buffer.from(expected))) return null;
  return users().some((u) => u.name === name) ? name : null;
}

export async function isAdmin() {
  return !!(await currentStaff());
}

export async function requireAdmin() {
  if (await isAdmin()) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
