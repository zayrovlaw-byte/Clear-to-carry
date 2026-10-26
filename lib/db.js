import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");

async function readJson(file, fallback) {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function writeJson(file, data) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const target = path.join(DATA_DIR, file);
  const tmp = target + "." + crypto.randomBytes(4).toString("hex") + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, target);
}

export async function addLead(lead) {
  const leads = await readJson("leads.json", []);
  const record = { id: crypto.randomUUID(), ...lead, at: new Date().toISOString() };
  leads.push(record);
  await writeJson("leads.json", leads);
  return record;
}

export async function addClient(client) {
  const clients = await readJson("clients.json", []);
  const record = {
    id: crypto.randomUUID(),
    ref: "CTC" + String(Date.now()).slice(-6),
    phase: 1,
    docs: {},
    paymentVerified: false,
    createdAt: new Date().toISOString(),
    ...client,
  };
  clients.push(record);
  await writeJson("clients.json", clients);
  return record;
}

export async function getClient(id) {
  const clients = await readJson("clients.json", []);
  return clients.find((c) => c.id === id) || null;
}

export async function updateClient(id, patch) {
  const clients = await readJson("clients.json", []);
  const i = clients.findIndex((c) => c.id === id);
  if (i === -1) return null;
  clients[i] = { ...clients[i], ...patch, updatedAt: new Date().toISOString() };
  await writeJson("clients.json", clients);
  return clients[i];
}

/* Instant notification to the attorney. Uses Resend if RESEND_API_KEY is set;
   otherwise logs so nothing is silently lost in development. */
export async function notify(subject, body) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) {
    console.log("[NOTIFY]", subject, body);
    return;
  }
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM || "Clear to Carry <onboarding@resend.dev>",
        to: [to],
        subject,
        text: body,
      }),
    });
  } catch (e) {
    console.error("notify failed", e);
  }
}
