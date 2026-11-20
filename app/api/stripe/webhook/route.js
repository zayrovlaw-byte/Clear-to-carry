import { NextResponse } from "next/server";
import { verifySignature, recordSession } from "@/lib/stripe";

/* Stripe calls this when a Checkout payment completes. In the Stripe dashboard:
   Developers -> Webhooks -> Add endpoint -> https://cleartocarrynyc.com/api/stripe/webhook,
   event checkout.session.completed (and checkout.session.async_payment_succeeded).
   Copy the signing secret into STRIPE_WEBHOOK_SECRET. */
export async function POST(req) {
  const payload = await req.text();
  if (!verifySignature(payload, req.headers.get("stripe-signature"), process.env.STRIPE_WEBHOOK_SECRET)) {
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }
  try {
    const event = JSON.parse(payload);
    if (["checkout.session.completed", "checkout.session.async_payment_succeeded"].includes(event.type)) {
      await recordSession(event.data.object);
    }
    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("stripe webhook", e.message);
    return NextResponse.json({ error: "Webhook handling failed" }, { status: 500 });
  }
}
