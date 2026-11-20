import { NextResponse } from "next/server";
import { checkLogin, sessionToken, COOKIE } from "@/lib/auth";

let fails = []; // crude brute-force brake: max 10 bad attempts per 15 minutes

export async function POST(req) {
  const now = Date.now();
  fails = fails.filter((t) => now - t < 15 * 60 * 1000);
  if (fails.length >= 10) return NextResponse.json({ error: "Too many attempts. Wait 15 minutes." }, { status: 429 });
  const { name, password } = await req.json().catch(() => ({}));
  const staff = checkLogin(name, password);
  if (!staff) {
    fails.push(now);
    return NextResponse.json({ error: "Wrong name or password." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true, name: staff });
  res.cookies.set(COOKIE, sessionToken(staff), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict",
    path: "/", maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
