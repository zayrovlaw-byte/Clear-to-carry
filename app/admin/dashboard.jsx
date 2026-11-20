"use client";
import { useEffect, useState, useCallback } from "react";
import { CONSULT_FEE } from "@/lib/content";

const fmt = (n) => "$" + Number(n || 0).toLocaleString("en-US");
const when = (iso) => (iso ? new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "-");
const LIGHT = { green: "#5FA97F", yellow: "#C9A96A", red: "#C25450" };

async function api(method, body) {
  const r = await fetch("/api/admin/data", {
    method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined,
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(d.error || "Request failed"), { status: r.status });
  return d;
}

function Login({ onIn }) {
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  async function go(e) {
    e.preventDefault();
    setErr("");
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, password: pw }) });
    const d = await r.json().catch(() => ({}));
    if (r.ok) onIn(); else setErr(d.error || "Wrong name or password.");
  }
  return (
    <form className="a-login" onSubmit={go}>
      <div className="v-wordmark">CLEAR <span className="b-towrap"><span className="b-two" aria-hidden="true">2</span><span className="v-wordto">TO</span></span> CARRY</div>
      <p className="v-mutetext">Zayrov Law, P.C. · firm staff only</p>
      <input className="v-input" autoFocus placeholder="Name" autoComplete="username" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="v-input" type="password" placeholder="Password" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} />
      {err && <p className="a-err">{err}</p>}
      <button className="v-gold v-w100" type="submit">Sign in</button>
    </form>
  );
}

function Activity({ log }) {
  const [all, setAll] = useState(false);
  if (!log?.length) return null;
  const rows = [...log].reverse();
  const shown = all ? rows : rows.slice(0, 5);
  return (
    <div className="a-activity">
      <div className="a-activityhead">Activity</div>
      {shown.map((e, i) => (
        <div className="a-event" key={i}>
          <span className="a-eventwhen">{when(e.at)}</span>
          <span className="a-eventtext">{e.text}</span>
          <span className="a-eventby">{e.by}</span>
        </div>
      ))}
      {rows.length > 5 && <button className="a-more" onClick={() => setAll(!all)}>{all ? "Show less" : `Show all ${rows.length}`}</button>}
    </div>
  );
}

function Reminders({ c, save, remind }) {
  const sent = Object.entries(c.reminders || {}).map(([k, v]) => `${k} ×${v.count}`).join(" · ");
  return (
    <div className="a-controls a-reminders">
      <span className="a-hint">Reminders: {c.remindersPaused ? "paused" : c.reminderDue ? "next: " + c.reminderDue.toLowerCase() : "nothing due"}{sent ? " · sent " + sent : ""}</span>
      <label className="a-check"><input type="checkbox" checked={!!c.remindersPaused} onChange={(e) => save({ remindersPaused: e.target.checked })} /> Pause reminders</label>
      {c.reminderDue && !c.remindersPaused && <button className="v-quiet v-sm" onClick={() => remind(c.id)}>Send reminder now</button>}
    </div>
  );
}

function Notes({ value, onSave }) {
  const [v, setV] = useState(value || "");
  const dirty = v !== (value || "");
  return (
    <div className="a-notes">
      <textarea className="v-input a-notearea" rows={2} placeholder="Private notes (never shown to the client)" value={v} onChange={(e) => setV(e.target.value)} />
      {dirty && <button className="v-quiet v-sm" onClick={() => onSave(v)}>Save note</button>}
    </div>
  );
}

function LeadCard({ l, stages, save }) {
  return (
    <div className="a-card">
      <div className="a-row">
        <div>
          <div className="a-name">
            {l.light && <span className="a-dot" style={{ background: LIGHT[l.light] }} title={l.light} />}
            {l.name}
          </div>
          <div className="a-meta">
            <a href={"tel:" + l.phone}>{l.phone}</a>
            {l.email && <> · <a href={"mailto:" + l.email}>{l.email}</a></>}
            {" · "}{l.kind}{l.interest ? " · " + l.interest : ""} · {when(l.at)}
          </div>
        </div>
        <select className="v-input a-select" value={l.stage || "new"} onChange={(e) => save({ stage: e.target.value })}>
          {stages.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>
      {l.answers?.length > 0 && (
        <div className="a-answers">{l.answers.map((a) => <span key={a.id}><b>{a.id}</b> {a.answer}</span>)}</div>
      )}
      {l.note && <p className="a-note">“{l.note}”</p>}
      <Notes value={l.adminNotes} onSave={(adminNotes) => save({ adminNotes })} />
    </div>
  );
}

function QuoteBox({ c, engagements, save }) {
  const [name, setName] = useState(c.engagementName || c.licence || "");
  const [quote, setQuote] = useState(c.quote ? String(c.quote) : "");
  const credit = c.consultPaid ? CONSULT_FEE : 0;
  const q = Number(quote) || 0;
  return (
    <div className="a-quote">
      <div className="a-quotehead">After the consultation: quote and open the portal</div>
      <div className="a-controls">
        <label className="a-field">Engagement
          <input className="v-input" list={"eng-" + c.id} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Concealed Carry" />
          <datalist id={"eng-" + c.id}>
            {[...engagements, "Application Review", "Concierge"].map((x) => <option key={x} value={x} />)}
          </datalist>
        </label>
        <label className="a-field">Flat fee ($)
          <input className="v-input a-num" inputMode="numeric" value={quote} onChange={(e) => setQuote(e.target.value.replace(/[^0-9]/g, ""))} placeholder="0" />
        </label>
        {q > 0 && <span className="a-hint">Credit {fmt(credit)} · balance {fmt(Math.max(0, q - credit))}</span>}
      </div>
      <button className="v-gold v-sm" disabled={!name.trim() || !q}
        onClick={() => { if (confirm(`Email ${c.name} the quote (${fmt(q)}) and open their portal?`)) save({ engagementName: name, quote: q, openPortal: true }); }}>
        Send quote and open portal
      </button>
    </div>
  );
}

function ClientCard({ c, phases, appStatus, engagements, save, remind }) {
  const [copied, setCopied] = useState(false);
  const items = phases.flatMap((p) => p.items.map((i) => ({ ...i, phase: p.name })));
  return (
    <div className="a-card">
      <div className="a-row">
        <div>
          <div className="a-name">
            {c.light && <span className="a-dot" style={{ background: LIGHT[c.light] }} title={c.light} />}
            {c.name} <span className="a-ref">{c.ref}</span> <span className="a-lang">{(c.lang || "en").toUpperCase()}</span>
          </div>
          <div className="a-meta">
            <a href={"tel:" + c.phone}>{c.phone}</a> · <a href={"mailto:" + c.email}>{c.email}</a> · booked {when(c.createdAt)}
            {c.licence ? " · " + c.licence : ""}{c.interest ? " · " + c.interest : ""}
          </div>
        </div>
        <span className="a-pill">{c.portalOpen ? (c.filedAt ? (c.outcome || "filed") : "retained") : "consultation"}</span>
      </div>

      {c.answers?.length > 0 && (
        <div className="a-answers">{c.answers.map((a) => <span key={a.id}><b>{a.id}</b> {a.answer}</span>)}</div>
      )}
      {c.note && <p className="a-note">“{c.note}”</p>}

      <div className="a-controls">
        <label className="a-check"><input type="checkbox" checked={!!c.consultPaid} onChange={(e) => save({ consultPaid: e.target.checked })} /> {fmt(CONSULT_FEE)} consult paid <span className="a-hint">(emails client)</span></label>
        <label className="a-check"><input type="checkbox" checked={!!c.consultDone} onChange={(e) => save({ consultDone: e.target.checked })} /> Consultation held</label>
      </div>

      {c.payments?.length > 0 && (
        <div className="a-meta">
          {c.payments.map((p) => <span key={p.session} className="a-paid">Card · {fmt(p.amount)} · {p.kind === "consult" ? "consultation" : "retainer"} · {when(p.at)}</span>)}
        </div>
      )}

      {!c.portalOpen && <QuoteBox c={c} engagements={engagements} save={save} />}

      {c.portalOpen && (
        <>
          <div className="a-meta" style={{ marginTop: 10 }}>
            <b>{c.engagementName}</b> · fee {fmt(c.quote)} · balance {fmt(Math.max(0, (c.quote || 0) - (c.consultPaid ? CONSULT_FEE : 0)))} · quoted {when(c.retainedAt)}
          </div>
          <div className="a-controls">
            <label className="a-check"><input type="checkbox" checked={!!c.letterSigned} onChange={(e) => save({ letterSigned: e.target.checked })} /> Engagement letter signed</label>
            <label className="a-check"><input type="checkbox" checked={!!c.paymentVerified} onChange={(e) => save({ paymentVerified: e.target.checked })} /> Retainer received <span className="a-hint">(emails client)</span></label>
            <label className="a-field">Step
              <select className="v-input a-select" value={c.phase} onChange={(e) => save({ phase: Number(e.target.value) })}>
                {phases.map((p) => <option key={p.id} value={p.id}>{p.id}. {p.name}</option>)}
              </select>
            </label>
            <label className="a-check"><input type="checkbox" checked={!!c.filedAt} onChange={(e) => save({ filed: e.target.checked })} /> Filed{c.filedAt ? " " + when(c.filedAt) : ""}</label>
            {c.filedAt && (
              <label className="a-field">Status
                <select className="v-input a-select" value={c.appStatus || 0} onChange={(e) => save({ appStatus: Number(e.target.value) })}>
                  {appStatus.map((s, i) => <option key={i} value={i}>{s}</option>)}
                </select>
              </label>
            )}
            {c.filedAt && (
              <label className="a-field">Outcome
                <select className="v-input a-select" value={c.outcome || ""} onChange={(e) => save({ outcome: e.target.value })}>
                  <option value="">Pending</option><option value="approved">Approved</option><option value="denied">Denied</option>
                </select>
              </label>
            )}
          </div>

          <div className="a-docs">
            {items.map((it) => {
              const d = c.docs?.[it.id];
              return (
                <div key={it.id} className={"a-doc" + (d ? " a-docin" : "")}>
                  <span className="a-docphase">{it.phase}</span>
                  <span className="a-doclabel">{it.label.split(" · ")[0]}</span>
                  {d
                    ? <a href={`/api/admin/file?client=${c.id}&item=${it.id}`} target="_blank" rel="noopener">Open ({when(d.at)})</a>
                    : <span className="a-hint">not yet</span>}
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="a-row a-foot">
        <button className="v-quiet v-sm" onClick={() => { navigator.clipboard.writeText(c.portal); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
          {copied ? "Copied" : "Copy client link"}
        </button>
      </div>
      <Reminders c={c} save={save} remind={remind} />
      <Notes value={c.adminNotes} onSave={(adminNotes) => save({ adminNotes })} />
      <Activity log={c.log} />
    </div>
  );
}

export default function Dashboard() {
  const [state, setState] = useState("loading");
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("clients");
  const [stageFilter, setStageFilter] = useState("open");
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    try {
      setData(await api("GET"));
      setErr("");
      setState("in");
    } catch (e) {
      setState(e.status === 401 ? "out" : "error");
      setErr(e.message);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function save(type, id, patch) {
    try {
      await api("PATCH", { type, id, patch });
      await load();
    } catch (e) {
      setErr(e.message);
    }
  }

  async function remind(id) {
    setErr("");
    const r = await fetch("/api/admin/reminders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(id ? { id } : {}) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) setErr(d.error || "Could not send.");
    else if (!id) setErr(d.sent ? `Sent ${d.sent} reminder${d.sent > 1 ? "s" : ""}.` : "No reminders were due.");
    await load();
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setState("out");
  }

  if (state === "loading") return <div className="a-wrap"><p className="v-mutetext">Loading…</p></div>;
  if (state === "out") return <div className="a-wrap"><Login onIn={load} /></div>;
  if (state === "error") return <div className="a-wrap"><p className="a-err">{err}</p></div>;

  const { leads, clients, stages, appStatus, phases, engagements } = data;
  const count = (s) => leads.filter((l) => (l.stage || "new") === s).length;
  const shownLeads = leads.filter((l) => {
    const s = l.stage || "new";
    if (stageFilter === "open") return s !== "retained" && s !== "lost";
    return stageFilter === "all" || s === stageFilter;
  });
  const consultUnpaid = clients.filter((c) => !c.portalOpen && !c.consultPaid).length;
  const toQuote = clients.filter((c) => !c.portalOpen && c.consultPaid).length;
  const unpaid = clients.filter((c) => c.portalOpen && !c.paymentVerified).length;
  const pending = clients.filter((c) => c.filedAt && !c.outcome).length;

  return (
    <div className="a-wrap">
      <div className="a-top">
        <div className="v-wordmark">CLEAR <span className="v-wordto">TO</span> CARRY <span className="a-sub">Pipeline</span></div>
        <div className="a-row" style={{ gap: 10 }}>
          <span className="a-hint">Signed in as {data.staff}</span>
          <button className="v-quiet v-sm" onClick={() => remind()}>Run reminders now</button>
          <button className="v-quiet v-sm" onClick={load}>Refresh</button>
          <button className="v-quiet v-sm" onClick={logout}>Sign out</button>
        </div>
      </div>

      <div className="a-stats">
        <div><b>{count("new")}</b><span>callback requests</span></div>
        <div><b>{consultUnpaid}</b><span>consults awaiting $159</span></div>
        <div><b>{toQuote}</b><span>consults to hold and quote</span></div>
        <div><b>{unpaid}</b><span>retainers awaiting payment</span></div>
        <div><b>{pending}</b><span>filed, awaiting decision</span></div>
      </div>

      {err && <p className="a-err">{err}</p>}

      <div className="a-tabs">
        <button className={tab === "leads" ? "a-tab a-tabon" : "a-tab"} onClick={() => setTab("leads")}>Callbacks ({leads.length})</button>
        <button className={tab === "clients" ? "a-tab a-tabon" : "a-tab"} onClick={() => setTab("clients")}>Consultations & clients ({clients.length})</button>
      </div>

      {tab === "leads" && (
        <>
          <div className="a-filters">
            {[{ id: "open", label: "Open" }, ...stages, { id: "all", label: "All" }].map((s) => (
              <button key={s.id} className={stageFilter === s.id ? "a-chip a-chipon" : "a-chip"} onClick={() => setStageFilter(s.id)}>
                {s.label}{stages.some((x) => x.id === s.id) ? ` (${count(s.id)})` : ""}
              </button>
            ))}
          </div>
          {shownLeads.length === 0 && <p className="v-mutetext">Nothing here.</p>}
          {shownLeads.map((l) => <LeadCard key={l.id} l={l} stages={stages} save={(p) => save("lead", l.id, p)} />)}
        </>
      )}

      {tab === "clients" && (
        <>
          {clients.length === 0 && <p className="v-mutetext">No consultations booked yet.</p>}
          {clients.map((c) => <ClientCard key={c.id} c={c} phases={phases} appStatus={appStatus} engagements={engagements} save={(p) => save("client", c.id, p)} remind={remind} />)}
        </>
      )}
    </div>
  );
}
