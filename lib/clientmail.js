import { emailClient } from "@/lib/mail";
import { addLog } from "@/lib/db";

/* Sends a client email and records it on the client's activity log. */
export async function mailClient(c, m, by = "System") {
  if (!c?.email || !m) return;
  await emailClient(c.email, m.subject, m.text, c.lang);
  await addLog(c.id, "Emailed client: " + m.subject, by);
}
