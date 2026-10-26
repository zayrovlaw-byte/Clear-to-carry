export const PHONE = "(347) 335-5723";
export const PHONE_TEL = "tel:+13473355723";

/* Scheduling link (Calendly, Booksy, Acuity — anything that lets a visitor pick
   a time). Set NEXT_PUBLIC_BOOKING_URL and every consultation button sends the
   visitor straight there. Left empty, the site falls back to its own free
   consultation request form, so nothing breaks before the scheduler is
   configured. The consultation is free either way: the scheduler must not be
   configured to collect a fee. See README "Booking". */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "";

/* Standing ribbon under the nav. Its text is translated in lib/locales/*; only
   the link target and the expiry date live here. Push `until` out to keep it up. */
export const PROMO = {
  href: "/apply?view=consult",
  until: "2027-12-31T05:00:00Z",
};
