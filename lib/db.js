import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
export const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(DATA_DIR, "uploads");

/* Lead pipeline stages, in funnel order. Edit labels freely; ids are stored. */
export const LEAD_STAGES = [
  { id: "new", label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "consult", label: "Consult booked" },
  { id: "retained", label: "Retained" },
  { id: "lost", label: "Not a fit / lost" },
];

/* Client status after filing, shown in the client portal tracker. */
export const APP_STATUS = ["Filed with the License Division", "Under investigation", "Interview", "Decision"];

/* One write at a time. JSON-file storage is read-modify-write, so concurrent
   requests on a single server must be serialized or one update can erase another. */
let chain = Promise.resolve();
function locked(fn) {
  const run = chain.then(fn, fn);
  chain = run.catch(() => {});
  return run;
}

async function readJson(file, fallback) {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw);
  } catch (e) {
    if (e.code === "ENOENT") return fallback;
    throw e; // never silently treat a corrupt file as empty, or the next write wipes it
  }
}

async function writeJson(file, data) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const target = path.join(DATA_DIR, file);
  const tmp = target + "." + crypto.randomBytes(4).toString("hex") + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, target);
}

/* ---------------- leads ---------------- */
export function addLead(lead) {
  return locked(async () => {
    const leads = await readJson("leads.json", []);
    const record = { id: crypto.randomUUID(), stage: "new", ...lead, at: new Date().toISOString() };
    leads.push(record);
    await writeJson("leads.json", leads);
    return record;
  });
}

export const listLeads = () => readJson("leads.json", []);

export function updateLead(id, patch) {
  return locked(async () => {
    const leads = await readJson("leads.json", []);
    const i = leads.findIndex((l) => l.id === id);
    if (i === -1) return null;
    leads[i] = { ...leads[i], ...patch, updatedAt: new Date().toISOString() };
    await writeJson("leads.json", leads);
    return leads[i];
  });
}

/* ---------------- clients ---------------- */
export function addClient(client) {
  return locked(async () => {
    const clients = await readJson("clients.json", []);
    const record = {
      id: crypto.randomUUID(),
      ref: "CTC" + crypto.randomInt(100000, 999999),
      phase: 1,
      docs: {},
      paymentVerified: false,
      appStatus: 0,
      createdAt: new Date().toISOString(),
      ...client,
    };
    clients.push(record);
    await writeJson("clients.json", clients);
    return record;
  });
}

export const listClients = () => readJson("clients.json", []);

export async function getClient(id) {
  if (!id) return null;
  const clients = await readJson("clients.json", []);
  return clients.find((c) => c.id === id) || null;
}

/* patch may be an object or a function of the current record (for safe
   read-modify-write of nested fields like docs). */
export function updateClient(id, patch) {
  return locked(async () => {
    const clients = await readJson("clients.json", []);
    const i = clients.findIndex((c) => c.id === id);
    if (i === -1) return null;
    const p = typeof patch === "function" ? patch(clients[i]) : patch;
    clients[i] = { ...clients[i], ...p, updatedAt: new Date().toISOString() };
    await writeJson("clients.json", clients);
    return clients[i];
  });
}

/* What the client's own browser is allowed to see: no attorney notes, no
   server file names. */
export function publicClient(c) {
  const { adminNotes, ...rest } = c;
  const docs = {};
  for (const [k, d] of Object.entries(c.docs || {})) docs[k] = { name: d.name, at: d.at, status: d.status };
  return { ...rest, docs };
}

export function siteUrl() {
  return (process.env.SITE_URL || "https://cleartocarrynyc.com").replace(/\/$/, "");
}

export function portalLink(client) {
  const prefix = client.lang && client.lang !== "en" ? "/" + client.lang : "";
  return `${siteUrl()}${prefix}/apply?view=portal&id=${encodeURIComponent(client.id)}`;
}
