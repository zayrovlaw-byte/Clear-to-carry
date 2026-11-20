export const PHONE = "(347) 335-5723";
export const PHONE_TEL = "tel:+13473355723";

/* The consultation is the one thing a visitor pays for on the site. It lasts
   15 to 30 minutes and is credited in full toward any retainer. Everything
   after it is quoted at the consultation, based on the applicant's record. */
export const CONSULT_FEE = 159;
export const CONSULT_MINUTES = "15–30";

/* Zelle receiving address shown at booking and in client emails. */
export const ZELLE_TO = process.env.NEXT_PUBLIC_ZELLE_TO || "zayrovlaw@gmail.com";

/* Optional scheduling link (Calendly, Acuity, etc.). When set, a client who has
   booked is offered it to pick a time. Left empty, the firm calls to schedule. */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "";

export const money = (n) => "$" + Number(n || 0).toLocaleString("en-US");
