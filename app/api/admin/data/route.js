import { NextResponse } from "next/server";
import { currentStaff } from "@/lib/auth";
import {
  listLeads, listClients, updateLead, updateClient, getClient, portalLink, LEAD_STAGES, APP_STATUS, addLog,
} from "@/lib/db";
import { mailClient } from "@/lib/clientmail";
import { RULES, dueReminder } from "@/lib/reminders";
import { emails } from "@/lib/emails";
import { getDict } from "@/lib/i18n";
import { cardEnabled } from "@/lib/stripe";

/* NOTE: this folder is named "data". The repo's .gitignore ignores only the
   top-level /data storage folder, so this route is committed. */

const PHASES = getDict("en").phases;
const clean = (v, n) => String(v ?? "").slice(0, n).trim();

const money = (n) => "$" + Number(n || 0).toLocaleString("en-US");
const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function GET() {
  const staff = await currentStaff();
  if (!staff) return unauthorized();
  const [leads, clients] = await Promise.all([listLeads(), listClients()]);
  return NextResponse.json({
    leads: [...leads].reverse(),
    clients: [...clients].reverse().map((c) => {
      const due = dueReminder(c);
      return { ...c, portal: portalLink(c), reminderDue: due ? RULES[due.kind].label : null };
    }),
    staff,
    stages: LEAD_STAGES,
    appStatus: APP_STATUS,
    phases: PHASES.map((p) => ({ id: p.id, name: p.name, items: p.items })),
    engagements: getDict("en").packages.map((p) => p.name),
  });
}

export async function PATCH(req) {
  const staff = await currentStaff();
  if (!staff) return unauthorized();
  try {
    const { type, id, patch = {} } = await req.json();

    if (type === "lead") {
      const p = {};
      if (LEAD_STAGES.some((s) => s.id === patch.stage)) p.stage = patch.stage;
      if ("adminNotes" in patch) p.adminNotes = clean(patch.adminNotes, 5000);
      const lead = await updateLead(id, p);
      return lead ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (type !== "client") return NextResponse.json({ error: "Bad request" }, { status: 400 });
    const before = await getClient(id);
    if (!before) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const E = emails(before.lang);
    const p = {};
    const after = []; // emails to send once saved
    const notes = []; // activity log lines

    if ("adminNotes" in patch) { p.adminNotes = clean(patch.adminNotes, 5000); notes.push("Updated private notes"); }
    if ("letterSigned" in patch) { p.letterSigned = !!patch.letterSigned; notes.push(p.letterSigned ? "Marked engagement letter signed" : "Unmarked engagement letter signed"); }
    if ("remindersPaused" in patch) { p.remindersPaused = !!patch.remindersPaused; notes.push(p.remindersPaused ? "Paused automatic reminders" : "Resumed automatic reminders"); }
    if ("consultPaid" in patch) {
      p.consultPaid = !!patch.consultPaid;
      notes.push(p.consultPaid ? "Marked $159 consultation paid (Zelle/other)" : "Unmarked consultation paid");
      if (p.consultPaid && !before.consultPaid) after.push((c) => E.consultPaid(c));
    }
    if ("consultDone" in patch) { p.consultDone = !!patch.consultDone; notes.push(p.consultDone ? "Marked consultation held" : "Unmarked consultation held"); }
    if ("engagementName" in patch) p.engagementName = clean(patch.engagementName, 120);
    if ("quote" in patch) {
      const q = Math.round(Number(patch.quote));
      if (!Number.isFinite(q) || q < 0 || q > 1000000) return NextResponse.json({ error: "Enter the quoted fee as a number." }, { status: 400 });
      p.quote = q;
    }
    if (patch.openPortal === true) {
      const name = p.engagementName ?? before.engagementName;
      const quote = p.quote ?? before.quote;
      if (!name || !quote) return NextResponse.json({ error: "Set the engagement and quoted fee first." }, { status: 400 });
      p.portalOpen = true;
      p.packageName = name;
      p.retainedAt = new Date().toISOString();
      p.phase = before.phase || 1;
      notes.push(`Quoted ${name} at ${money(quote)} and opened the portal`);
      after.push((c) => E.quote(c, portalLink(c), cardEnabled()));
    }
    if ("paymentVerified" in patch) {
      p.paymentVerified = !!patch.paymentVerified;
      notes.push(p.paymentVerified ? "Marked retainer received" : "Unmarked retainer received");
      if (p.paymentVerified && !before.paymentVerified) after.push((c) => E.retainerPaid(c));
    }
    if ("phase" in patch) {
      const n = Number(patch.phase);
      if (PHASES.some((x) => x.id === n)) {
        p.phase = n;
        notes.push(`Moved file to step ${n}: ${PHASES.find((x) => x.id === n).name}`);
        if (n > (before.phase || 1) && before.portalOpen) {
          const local = getDict(before.lang).phases.find((x) => x.id === n);
          after.push((c) => E.phase(c, local ? local.name : PHASES.find((x) => x.id === n).name));
        }
      }
    }
    if ("filed" in patch) {
      p.filedAt = patch.filed ? before.filedAt || new Date().toISOString() : null;
      notes.push(patch.filed ? "Marked application filed" : "Unmarked filed");
      if (patch.filed && !before.filedAt) after.push((c) => E.filed(c));
    }
    if ("appStatus" in patch) {
      const n = Number(patch.appStatus);
      if (n >= 0 && n < APP_STATUS.length) {
        p.appStatus = n;
        notes.push(`Set status: ${APP_STATUS[n]}`);
        if (n !== (before.appStatus || 0)) after.push((c) => E.status(c, E.statuses[n]));
      }
    }
    if ("outcome" in patch) {
      p.outcome = ["approved", "denied", ""].includes(patch.outcome) ? patch.outcome : before.outcome;
      notes.push(`Set outcome: ${p.outcome || "pending"}`);
    }

    await updateClient(id, p);
    let updated = await getClient(id);
    for (const line of notes) updated = await addLog(id, line, staff);
    for (const make of after) await mailClient(updated, make(updated), staff);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
