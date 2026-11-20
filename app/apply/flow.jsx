"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Eyebrow } from "@/lib/ui";
import { BOOKING_URL, PHONE, PHONE_TEL, CONSULT_FEE, ZELLE_TO, money } from "@/lib/content";

const GREEN = "#7FB592", RED = "#D27A6A", AMBER = "#C9A96A";

function Field({ label, area, ...props }) {
  return (
    <label className="v-field">
      <span className="v-fieldlabel">{label}</span>
      {area ? <textarea className="v-input v-area" {...props} /> : <input className="v-input" {...props} />}
    </label>
  );
}

/* Hidden from people, irresistible to spam bots. */
function Honeypot({ value, onChange }) {
  return (
    <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
      value={value} onChange={(e) => onChange(e.target.value)}
      style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
  );
}

async function postJson(url, body, method = "POST") {
  const r = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || "Request failed");
  return data;
}

function rememberClient(id) {
  try { window.localStorage.setItem("ctc:clientId", id); } catch {}
}

/* ---------------- qualify ---------------- */
function Qualify({ go, t, lang }) {
  const QUALIFY = t.qualify;
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState([]);
  const [contact, setContact] = useState({ name: "", phone: "", email: "", company: "" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const headingRef = useRef(null);

  useEffect(() => { if (headingRef.current) headingRef.current.focus(); }, [i]);

  const doneAll = i >= QUALIFY.length;
  const q = !doneAll ? QUALIFY[i] : null;

  function pick(opt) {
    setPicked([...picked, { id: q.id, grade: opt.grade, note: opt.note, label: opt.label }]);
    setI(i + 1);
  }

  if (!doneAll) {
    return (
      <div className="v-page v-narrow">
        <Eyebrow>{t.apply.qEyebrow} · {i + 1} {t.apply.qOf} {QUALIFY.length}</Eyebrow>
        <div className="v-track" style={{ marginBottom: 34 }}>
          <div className="v-fill" style={{ width: (i / QUALIFY.length) * 100 + "%" }} />
        </div>
        <h1 ref={headingRef} tabIndex={-1} className="v-qq">{q.q}</h1>
        <div className="v-qopts">
          {q.opts.map((o, k) => (
            <button className="v-qopt" key={k} onClick={() => pick(o)}>{o.label}</button>
          ))}
        </div>
        <p className="v-mutetext v-mt">{t.apply.qFoot}</p>
      </div>
    );
  }

  const reds = picked.filter((p) => p.grade === "r");
  const yellows = picked.filter((p) => p.grade === "y");
  const light = reds.length ? "red" : yellows.length ? "yellow" : "green";
  const notes = [...reds, ...yellows].filter((p) => p.note);
  const screening = { light, answers: picked.map((p) => ({ id: p.id, answer: p.label })) };

  function toConsult() {
    try { sessionStorage.setItem("ctc:screening", JSON.stringify(screening)); } catch {}
    go("consult", screening);
  }

  async function callback() {
    setErr("");
    try {
      await postJson("/api/lead", { ...contact, lang, kind: "callback", ...screening });
      setSent(true);
    } catch (e) {
      setErr(e.message);
    }
  }

  const L = {
    green: { color: GREEN, badge: t.apply.resultGreenBadge, head: t.apply.resultGreenHead, body: t.apply.resultGreenBody },
    yellow: { color: AMBER, badge: t.apply.resultYellowBadge, head: t.apply.resultYellowHead, body: t.apply.resultYellowBody },
    red: { color: RED, badge: t.apply.resultRedBadge, head: t.apply.resultRedHead, body: t.apply.resultRedBody },
  }[light];

  return (
    <div className="v-page v-narrow">
      <div className="v-lightbadge" style={{ color: L.color, borderColor: L.color }}>{L.badge}</div>
      <h1 className="v-h1 v-h1sm">{L.head}</h1>
      <p className="v-lede v-ledesm">{L.body}</p>
      {notes.length > 0 && (
        <div className="v-notes">
          {notes.map((n, k) => (
            <div className="v-noteitem" key={k} style={{ borderLeftColor: n.grade === "r" ? RED : AMBER }}>{n.note}</div>
          ))}
        </div>
      )}

      <div className="v-bookbox">
        <div className="v-bookhead">{light === "red" ? t.apply.bookHeadRed : t.apply.bookHead}</div>
        <button className="v-gold v-w100" onClick={toConsult}>{t.common.getStarted99}</button>
        <div className="v-bookfine">{t.apply.bookFine}</div>
      </div>

      {!sent ? (
        <div className="v-leadbox">
          <div className="v-leadhead">{t.apply.callbackHead}</div>
          <Field label={t.apply.nameLabel} autoComplete="name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
          <Field label={t.apply.phone} inputMode="tel" autoComplete="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
          <Honeypot value={contact.company} onChange={(v) => setContact({ ...contact, company: v })} />
          {err && <p className="v-err">{err}</p>}
          <button className="v-quiet v-w100" onClick={callback} disabled={!contact.name.trim() || !contact.phone.trim()}>
            {t.apply.callbackSubmit}
          </button>
        </div>
      ) : (
        <div className="v-leadbox"><div className="v-leadhead" style={{ color: GREEN }}>{t.apply.callbackSent}</div></div>
      )}

      <div className="v-bookalt">
        {t.apply.bookAltPre}<a className="v-goldlink" href={PHONE_TEL}>{PHONE}</a>.
      </div>
      <p className="v-legal v-mt">{t.apply.screeningLegal}</p>
    </div>
  );
}

/* ---------------- packages ----------------
   Levels of support. The consultation is the only fixed price; everything
   else is quoted at the consultation, based on the applicant's record. */
function Packages({ go, pickLicense, t }) {
  const [showLicenses, setShowLicenses] = useState(false);
  return (
    <div className="v-page">
      <Eyebrow>{t.apply.packagesEyebrow}</Eyebrow>
      <h1 className="v-h1 v-h1sm">{t.apply.packagesH1}</h1>
      <p className="v-lede v-ledesm">{t.apply.packagesLede}</p>
      <div className="v-tiers">
        {t.tiers.map((tier) => (
          <div key={tier.id} className={"v-pack" + (tier.lead ? " v-packfeat" : "")}>
            <div className="v-packtier">{tier.tier}</div>
            <div className="v-packname">{tier.name}</div>
            <div className={"v-packprice" + (tier.priceLabel ? "" : " v-packprice--quoted")}>{tier.priceLabel || t.apply.quoted}</div>
            <p className="v-packline">{tier.line}</p>
            <p className="v-packfor">{tier.for}</p>
            {tier.expands ? (
              <button className="v-quiet v-w100" onClick={() => setShowLicenses((v) => !v)}>
                {showLicenses ? t.apply.hideLicence : t.apply.chooseLicence}
              </button>
            ) : (
              <button className={(tier.lead ? "v-gold" : "v-quiet") + " v-w100"} onClick={() => go("consult")}>
                {tier.lead ? t.common.getStarted99 : t.apply.startConsult}
              </button>
            )}
          </div>
        ))}
      </div>

      {showLicenses && (
        <div className="v-licenseblock">
          <Eyebrow>{t.apply.licenceBlockEyebrow}</Eyebrow>
          <p className="v-mutetext" style={{ maxWidth: "62ch" }}>{t.apply.licenceBlockNote}</p>
          <div className="v-licensegrid">
            {t.packages.map((p) => (
              <button key={p.id} className="v-license" onClick={() => pickLicense(p)}>
                <div className="v-licensetier">{p.tier}</div>
                <div className="v-licensename">{p.name}</div>
                <div className="v-licenseline">{p.line}</div>
                <div className="v-licensefor">{p.for}</div>
                <span className="v-textlink">{t.apply.continue} →</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="v-underpacks">
        <p className="v-mutetext">{t.apply.underPacks}</p>
        <button className="v-quiet" onClick={() => go("consult")}>{t.common.getStarted99}</button>
      </div>
    </div>
  );
}

/* ---------------- consultation booking ----------------
   The one paid step on the site. Screening answers and the licence the visitor
   was reading about ride along so the attorney opens the call knowing the file. */
function Consult({ lic, screening, go, t, lang, onBooked }) {
  const [carried, setCarried] = useState(screening || null);
  useEffect(() => {
    if (carried) return;
    try {
      const saved = sessionStorage.getItem("ctc:screening");
      if (saved) setCarried(JSON.parse(saved));
    } catch {}
  }, [carried]);
  const [f, setF] = useState({ name: "", phone: "", email: "", note: "", company: "" });
  const [interest, setInterest] = useState("");
  const [ack, setAck] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [booked, setBooked] = useState(null);
  const ready = f.name.trim() && f.phone.trim() && /.+@.+\..+/.test(f.email.trim()) && ack;

  async function submit() {
    if (!ready || busy) return;
    setErr("");
    setBusy(true);
    try {
      const res = await postJson("/api/client", {
        ...f,
        lang,
        ack: true,
        interest,
        licence: lic ? lic.id : undefined,
        light: carried ? carried.light : undefined,
        answers: carried ? carried.answers : undefined,
      });
      rememberClient(res.id);
      onBooked(res.id);
      setBooked({ ...res, email: f.email.trim() });
      window.scrollTo(0, 0);
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  if (booked) {
    return (
      <div className="v-page v-narrow">
        <div className="v-lightbadge" style={{ color: GREEN, borderColor: GREEN }}>{t.apply.consultSentEyebrow}</div>
        <h1 className="v-h1 v-h1sm">{t.apply.bookedH1}</h1>
        <div className="v-zellecard">
          <div className="v-zellehead">{t.apply.zelleHead}</div>
          <div className="v-zellerow"><span>{t.apply.zelleTo}</span><strong>{ZELLE_TO}</strong></div>
          <div className="v-zellerow"><span>{t.apply.zelleAmount}</span><strong>{money(CONSULT_FEE)}</strong></div>
          <div className="v-zellerow"><span>{t.apply.zelleMemo}</span><strong>{booked.ref}</strong></div>
          <p className="v-zellenote">{t.apply.zelleNote} {booked.email}.</p>
        </div>
        <p className="v-lede v-ledesm">{t.apply.bookedBody}</p>
        {BOOKING_URL && (
          <a className="v-gold v-w100" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{t.apply.schedulerCta}</a>
        )}
        <a className={(BOOKING_URL ? "v-quiet v-mt" : "v-gold") + " v-w100"} href={PHONE_TEL}>{t.apply.consultCallNow} · {PHONE}</a>
        <p className="v-legal v-mt">{t.apply.consultLegal}</p>
      </div>
    );
  }

  return (
    <div className="v-page v-mid">
      <button className="v-back" onClick={() => go("packages")}>{t.apply.backEngagements}</button>
      <Eyebrow>{t.apply.consultEyebrow}{lic ? " · " + lic.name : ""}</Eyebrow>
      <h1 className="v-h1 v-h1sm">{t.apply.consultH1}</h1>
      <p className="v-lede v-ledesm">{t.apply.consultLede}</p>

      <div className="v-feebox">
        <div>
          <div className="v-feelabel">{t.apply.consultFeeLabel}</div>
          <div className="v-feenote">{t.apply.consultFeeNote}</div>
        </div>
        <div className="v-feeamt">{money(CONSULT_FEE)}</div>
      </div>

      <div className="v-form">
        <Field label={t.apply.nameLabel} autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <Field label={t.apply.phone} inputMode="tel" autoComplete="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
        <Field label={t.apply.emailLabel} type="email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        <Honeypot value={f.company} onChange={(v) => setF({ ...f, company: v })} />

        <div className="v-field">
          <span className="v-fieldlabel">{t.apply.consultInterest}</span>
          <div className="v-chips">
            {t.apply.consultOpts.map((o) => (
              <button key={o} type="button"
                className={"v-chip" + (interest === o ? " v-chipon" : "")}
                aria-pressed={interest === o}
                onClick={() => setInterest(interest === o ? "" : o)}>
                {o}
              </button>
            ))}
          </div>
        </div>

        <Field area rows={3} label={t.apply.consultNote} value={f.note}
          onChange={(e) => setF({ ...f, note: e.target.value })} />

        <label className="v-ack">
          <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
          <span>{t.apply.consultAck}</span>
        </label>

        {err && <p className="v-err">{err}</p>}
        <button className="v-gold v-w100" onClick={submit} disabled={!ready || busy}>
          {busy ? t.apply.portalSending : t.apply.consultSubmit}
        </button>
        <div className="v-bookalt">
          {t.apply.zelleOther} <a className="v-goldlink" href={PHONE_TEL}>{PHONE}</a>.
        </div>
      </div>

      <div className="v-costs">
        <Eyebrow>{t.apply.costsEyebrow}</Eyebrow>
        <h2 className="v-h2">{t.apply.costsH2}</h2>
        <p className="v-mutetext" style={{ maxWidth: "62ch", marginBottom: 22 }}>{t.apply.costsLede}</p>
        <div className="v-costlist">
          {t.thirdParty.map((c) => (
            <div className="v-costrow" key={c.id}>
              <div className="v-costname">{c.name}</div>
              <div className="v-costnote">{c.note}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="v-legal v-mt">{t.apply.consultLegal}</p>
    </div>
  );
}

/* ---------------- portal ---------------- */
function Portal({ clientId, t }) {
  const PHASES = t.phases;
  const [c, setC] = useState(null);
  const [err, setErr] = useState("");
  const [loadFailed, setLoadFailed] = useState(false);
  const fileInputRef = useRef(null);
  const [pendingItem, setPendingItem] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/client?id=" + encodeURIComponent(clientId))
      .then((r) => r.json())
      .then((d) => (d.error ? setLoadFailed(true) : setC(d)))
      .catch(() => setLoadFailed(true));
  }, [clientId]);

  if (loadFailed) return (
    <div className="v-page v-narrow">
      <p className="v-lede v-ledesm">{t.apply.portalLoadErr}</p>
      <a className="v-gold" href={PHONE_TEL}>{PHONE}</a>
    </div>
  );
  if (!c) return <div className="v-page v-narrow"><p className="v-mutetext">{t.apply.portalOpening}</p></div>;

  const firstName = c.name.split(" ")[0];

  if (!c.portalOpen) {
    return (
      <div className="v-page v-narrow">
        <Eyebrow>{t.apply.portalEyebrow}</Eyebrow>
        <h1 className="v-h1 v-h1sm">{firstName}, {t.apply.portalPendingH1}</h1>
        <div className="v-portalmeta">
          {t.apply.portalRef} {c.ref} ·{" "}
          {c.consultPaid
            ? <span style={{ color: GREEN }}>{t.apply.portalConsultPaid}</span>
            : <span style={{ color: AMBER }}>{t.apply.portalConsultPending}</span>}
        </div>
        <p className="v-lede v-ledesm">{t.apply.portalPendingBody}</p>
        {!c.consultPaid && (
          <div className="v-zellecard">
            <div className="v-zellehead">{t.apply.zelleHead}</div>
            <div className="v-zellerow"><span>{t.apply.zelleTo}</span><strong>{ZELLE_TO}</strong></div>
            <div className="v-zellerow"><span>{t.apply.zelleAmount}</span><strong>{money(CONSULT_FEE)}</strong></div>
            <div className="v-zellerow"><span>{t.apply.zelleMemo}</span><strong>{c.ref}</strong></div>
          </div>
        )}
        <a className="v-quiet" href={PHONE_TEL}>{PHONE}</a>
      </div>
    );
  }

  const currentPhase = PHASES.find((p) => p.id === c.phase) || PHASES[PHASES.length - 1];
  const phaseItems = currentPhase.items;
  const docs = c.docs || {};
  const doneInPhase = phaseItems.filter((i) => docs[i.id]).length;
  const phaseComplete = doneInPhase === phaseItems.length;
  const overallPct = Math.round(((c.phase - 1) / PHASES.length) * 100 + (doneInPhase / phaseItems.length) * (100 / PHASES.length));

  function pickFile(itemId) {
    setPendingItem(itemId);
    if (fileInputRef.current) fileInputRef.current.click();
  }

  async function onFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file || !pendingItem) return;
    setBusy(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("clientId", c.id);
      fd.append("itemId", pendingItem);
      const r = await fetch("/api/upload", { method: "POST", body: fd });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Upload failed");
      setC({ ...c, docs: d.docs });
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setBusy(false);
      setPendingItem(null);
    }
  }

  async function advance() {
    try {
      setC(await postJson("/api/client", { id: c.id, advance: true }, "PATCH"));
      window.scrollTo(0, 0);
    } catch (ex) {
      setErr(ex.message);
    }
  }

  const ROMAN = ["I", "II", "III", "IV"];

  return (
    <div className="v-page">
      <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={onFile}
        accept=".pdf,.jpg,.jpeg,.png,.heic,.heif,.webp" />
      <Eyebrow>{t.apply.portalEyebrow}</Eyebrow>
      <h1 className="v-h1 v-h1sm">{firstName}, {t.apply.portalFileOpen}</h1>
      <div className="v-portalmeta">
        {c.packageName} · {t.apply.portalRef} {c.ref} ·{" "}
        {c.paymentVerified
          ? <span style={{ color: GREEN }}>{t.apply.portalPaid}</span>
          : <span style={{ color: AMBER }}>{t.apply.portalPending}</span>}
      </div>

      <div className="v-progressblock">
        <div className="v-progresslabel">
          <span>{t.apply.portalMovement} {ROMAN[c.phase - 1]} {t.apply.portalOf} · {currentPhase.name}</span>
          <span>{overallPct}%</span>
        </div>
        <div className="v-track"><div className="v-fill" style={{ width: overallPct + "%" }} /></div>
        <div className="v-phasedots">
          {PHASES.map((p) => (
            <div key={p.id} className={"v-dotstep" + (p.id < c.phase ? " v-dotdone" : p.id === c.phase ? " v-dotnow" : "")}>
              <span className="v-dot" /><span className="v-dotname">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="v-phasecard">
        <div className="v-phasebrief">{currentPhase.brief}</div>
        {err && <p className="v-err">{err}</p>}
        {phaseItems.map((it) => {
          const doc = docs[it.id];
          return (
            <div key={it.id} className="v-docrow">
              <div className="v-docinfo">
                <div className="v-doclabel">{it.label}</div>
                {doc
                  ? <div className="v-docstatus" style={{ color: GREEN }}>{t.apply.portalReceived} · {doc.name} · {t.apply.portalUnderReview}</div>
                  : <div className="v-docstatus">{t.apply.portalAwaiting}</div>}
              </div>
              {doc
                ? <button className="v-quiet v-sm" disabled={busy} onClick={() => pickFile(it.id)}>{t.apply.portalReplace}</button>
                : <button className="v-gold v-sm" disabled={busy} onClick={() => pickFile(it.id)}>{busy && pendingItem === it.id ? t.apply.portalSending : t.apply.portalUpload}</button>}
            </div>
          );
        })}
        {phaseComplete && c.phase < PHASES.length && (
          <div className="v-phasedonebox">
            <p className="v-phasedonetext">{currentPhase.name} {t.apply.portalPhaseDone}</p>
            <button className="v-gold" onClick={advance}>{t.apply.portalOpenNext} {ROMAN[c.phase]}</button>
          </div>
        )}
        {phaseComplete && c.phase === PHASES.length && (
          <div className="v-phasedonebox">
            <p className="v-phasedonetext" style={{ color: GREEN }}>{t.apply.portalAssembled}</p>
          </div>
        )}
      </div>

      {c.filedAt && (() => {
        const STAGES = t.apply.trackerStages;
        const stage = c.appStatus || 0;
        const days = Math.floor((Date.now() - new Date(c.filedAt).getTime()) / 86400000);
        const remaining = 180 - days;
        const overdue = remaining <= 0;
        return (
          <div className="v-trackercard">
            <Eyebrow>{t.apply.trackerEyebrow}</Eyebrow>
            <div className="v-stages">
              {STAGES.map((s, k) => (
                <div key={k} className={"v-stage" + (k < stage ? " v-stagedone" : k === stage ? " v-stagenow" : "")}>
                  <span className="v-stagedot" /><span className="v-stagename">{s}</span>
                </div>
              ))}
            </div>
            <div className="v-clock">
              <div className="v-clockdays" style={{ color: overdue ? RED : AMBER }}>{t.apply.trackerDay} {days}</div>
              <div className="v-clocklabel">
                {overdue ? t.apply.trackerOverdue : `${t.apply.trackerOf180} ${remaining} ${t.apply.trackerRemain}`}
              </div>
            </div>
            {overdue && (
              <div className="v-art78">
                <div className="v-art78head">{t.apply.art78Head}</div>
                <p className="v-art78text">{t.apply.art78Text}</p>
                <a className="v-gold v-sm" href={PHONE_TEL}>{t.apply.art78Cta} {PHONE}</a>
              </div>
            )}
            <p className="v-mutetext" style={{ marginTop: 16, marginBottom: 0 }}>{t.apply.trackerFoot}</p>
          </div>
        );
      })()}

      <div className="v-cards2">
        <div className="v-card">
          <div className="v-cardtitle">{t.apply.lifeHead1}</div>
          <p className="v-cardtext">{t.apply.lifeText1}</p>
        </div>
        <div className="v-card">
          <div className="v-cardtitle">{t.apply.lifeHead2}</div>
          <p className="v-cardtext">{t.apply.lifeText2}</p>
        </div>
      </div>

      <div className="v-concierge">
        <div>
          <div className="v-conciergehead">{t.apply.conciergeHead}</div>
          <div className="v-mutetext">{t.apply.conciergeText}</div>
        </div>
        <a className="v-quiet v-sm" href={PHONE_TEL}>{PHONE}</a>
      </div>
    </div>
  );
}

/* ---------------- flow ---------------- */
export default function Flow({ t, lang = "en" }) {
  const params = useSearchParams();
  const requested = params.get("view") || "qualify";
  const [view, setView] = useState(["qualify", "packages", "consult", "portal"].includes(requested) ? requested : "qualify");
  const [lic, setLic] = useState(null);
  const [screening, setScreening] = useState(null);
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    const fromLink = params.get("id");
    let saved = null;
    try {
      if (fromLink) window.localStorage.setItem("ctc:clientId", fromLink);
      saved = fromLink || window.localStorage.getItem("ctc:clientId");
    } catch {
      saved = fromLink;
    }
    if (saved) setClientId(saved);
  }, [params]);

  const go = (v, extra) => {
    if (v === "consult" && extra) setScreening(extra);
    setView(v);
    window.scrollTo(0, 0);
  };

  const pickLicense = (p) => { setLic(p); setView("consult"); window.scrollTo(0, 0); };

  return (
    <>
      {view === "qualify" && <Qualify go={go} t={t} lang={lang} />}
      {view === "packages" && <Packages go={go} pickLicense={pickLicense} t={t} />}
      {view === "consult" && <Consult lic={lic} screening={screening} go={go} t={t} lang={lang} onBooked={setClientId} />}
      {view === "portal" && (clientId
        ? <Portal clientId={clientId} t={t} />
        : <Packages go={go} pickLicense={pickLicense} t={t} />)}
    </>
  );
}
