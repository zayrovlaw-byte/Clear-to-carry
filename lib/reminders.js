import { listClients, getClient, updateClient, addLog, portalLink } from "@/lib/db";
import { mailClient } from "@/lib/clientmail";
import { emails } from "@/lib/emails";
import { getDict } from "@/lib/i18n";
import { cardEnabled } from "@/lib/stripe";
import { balance } from "@/lib/emails";

/* Automatic client reminders. Checked every hour by instrumentation.js, sent
   only between 9am and 7pm New York time, never to a client whose reminders
   are paused in the dashboard, and never more than `max` times per kind.

   first:  hours after the starting point before the first reminder
   every:  hours between later reminders
   max:    total reminders of this kind */
export const RULES = {
  consult: { first: 24, every: 48, max: 2, label: "Consultation fee not yet paid" },
  docs: { first: 72, every: 96, max: 4, label: "Documents outstanding" },
  retainer: { first: 72, every: 120, max: 3, label: "Retainer balance unpaid" },
};

const HOUR = 3600 * 1000;
const t = (iso) => (iso ? new Date(iso).getTime() : 0);

function nyHour(now) {
  return Number(new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", hour: "numeric", hour12: false }).format(now));
}

/* Documents still needed in the client's current step, as plain labels. */
function outstanding(c) {
  const step = getDict(c.lang || "en").phases.find((p) => p.id === c.phase);
  if (!step) return { step: null, items: [] };
  return { step, items: step.items.filter((i) => !c.docs?.[i.id]).map((i) => i.label.split(" · ")[0]) };
}

/* Which reminder (if any) applies to this client right now, and from when. */
export function dueReminder(c) {
  if (c.remindersPaused || !c.email) return null;
  if (!c.portalOpen && !c.consultPaid) return { kind: "consult", since: t(c.createdAt) };
  if (c.portalOpen && !c.paymentVerified && balance(c) > 0) return { kind: "retainer", since: t(c.retainedAt) };
  if (c.portalOpen && !c.filedAt) {
    const { items } = outstanding(c);
    if (items.length) {
      const lastUpload = Math.max(0, ...Object.values(c.docs || {}).map((d) => t(d.at)));
      return { kind: "docs", since: Math.max(t(c.retainedAt), lastUpload) };
    }
  }
  return null;
}

function message(c, kind) {
  const E = emails(c.lang);
  const link = portalLink(c);
  if (kind === "consult") return E.reminderConsult(c, link, cardEnabled());
  if (kind === "retainer") return E.reminderRetainer(c, link, cardEnabled());
  const { step, items } = outstanding(c);
  return E.reminderDocs(c, items, step.name, link);
}

async function send(c, kind, by) {
  await updateClient(c.id, (cur) => {
    const r = { ...(cur.reminders || {}) };
    const prev = r[kind] || { count: 0 };
    r[kind] = { count: prev.count + 1, lastAt: new Date().toISOString(), since: prev.since };
    return { reminders: r };
  });
  await addLog(c.id, `Reminder sent: ${RULES[kind].label.toLowerCase()}`, by);
  await mailClient(await getClient(c.id), message(c, kind), by);
}

/* Hourly pass. Returns how many reminders went out. */
export async function runReminders({ now = Date.now(), ignoreHours = false, by = "System" } = {}) {
  if (!ignoreHours) {
    const h = nyHour(new Date(now));
    if (h < 9 || h >= 19) return 0;
  }
  let sent = 0;
  for (const c of await listClients()) {
    const due = dueReminder(c);
    if (!due) continue;
    const rule = RULES[due.kind];
    const r = c.reminders?.[due.kind] || { count: 0 };
    if (r.count >= rule.max) continue;
    // A new starting point (say, a fresh upload) restarts the schedule.
    const lastAt = t(r.lastAt);
    const next = r.count === 0 || lastAt < due.since
      ? due.since + rule.first * HOUR
      : lastAt + rule.every * HOUR;
    if (now < next) continue;
    await send(c, due.kind, by);
    sent++;
  }
  return sent;
}

/* "Send reminder now" from the dashboard: sends whatever applies, ignoring the
   schedule and the business-hours window (but not a pause). */
export async function remindNow(id, by) {
  const c = await getClient(id);
  const due = c && dueReminder(c);
  if (!due) return null;
  await send(c, due.kind, by);
  return due.kind;
}
