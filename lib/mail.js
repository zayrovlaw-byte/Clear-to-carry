import nodemailer from "nodemailer";
import { PHONE } from "@/lib/content";

/* Email goes out through the firm's Google Workspace / Gmail account over SMTP.
   SMTP_USER is the mailbox (e.g. manny@zayrovlaw.com), SMTP_PASS is a Google
   "app password" (Google Account -> Security -> 2-Step Verification -> App passwords).
   Without those set, emails are printed to the server log instead, so nothing is lost. */

let transport;
function getTransport() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  if (!transport) {
    transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transport;
}

const FROM = () => process.env.MAIL_FROM || `Clear to Carry <${process.env.SMTP_USER || "no-reply@cleartocarrynyc.com"}>`;
const OFFICE = () => process.env.NOTIFY_EMAIL || process.env.SMTP_USER;

async function send({ to, subject, text, replyTo }) {
  const t = getTransport();
  if (!t || !to) {
    console.log("[MAIL not configured]", { to, subject }, "\n" + text);
    return;
  }
  try {
    await t.sendMail({ from: FROM(), to, subject, text, replyTo });
  } catch (e) {
    // A mail outage must never lose the lead or block the client: the record is already saved.
    console.error("mail failed", subject, e.message);
  }
}

/* Internal alert to the firm inbox. */
export function notifyOffice(subject, text, replyTo) {
  return send({ to: OFFICE(), subject: `[Clear to Carry] ${subject}`, text, replyTo });
}

/* Message to a prospect or client. Replies go to the firm inbox. */
export function emailClient(to, subject, text) {
  if (!to) return;
  const signoff =
    `\n\nZayrov Law, P.C. · Clear to Carry\n${PHONE}\nhttps://cleartocarrynyc.com\n\n` +
    `This message is from a law firm and may be privileged. Attorney Advertising.`;
  return send({ to, subject, text: text + signoff, replyTo: OFFICE() });
}
