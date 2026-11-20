import { NextResponse } from "next/server";
import { getClient } from "@/lib/db";
import { cardEnabled, createCheckout, retrieveSession, recordSession } from "@/lib/stripe";

/* POST { id, kind: "consult" | "balance" } -> { url } of a Stripe Checkout page.
   The amount is worked out on the server from the client's record. */
export async function POST(req) {
  try {
    if (!cardEnabled()) return NextResponse.json({ error: "Card payments are not available yet. Please use Zelle or call us." }, { status: 503 });
    const { id, kind } = await req.json();
    const client = await getClient(id);
    if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const url = await createCheckout(client, kind);
    return NextResponse.json({ url });
  } catch (e) {
    console.error("pay", e.message);
    return NextResponse.json({ error: e.message === "Nothing is due." ? e.message : "Card payment could not be started. Please call us." }, { status: 400 });
  }
}

/* GET ?session=cs_... : called when the client lands back from Stripe, so the
   payment shows at once even if the webhook is slow or not configured. */
export async function GET(req) {
  try {
    if (!cardEnabled()) return NextResponse.json({ ok: false });
    const session = await retrieveSession(new URL(req.url).searchParams.get("session"));
    return NextResponse.json(await recordSession(session));
  } catch (e) {
    console.error("pay confirm", e.message);
    return NextResponse.json({ ok: false });
  }
}
