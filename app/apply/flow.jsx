"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eyebrow, LicenseIcon, BookLink } from "@/lib/ui";
import { BOOKING_URL, ZELLE_TO, PHONE, PHONE_TEL } from "@/lib/content";

const GREEN = "#5FA97F", RED = "#D25A40", CHAMPAGNE = "#E3A64F";
const fmt = (n) => "$" + n.toLocaleString();

function Field({ label, area, ...props }) {
  return (
    <label className="v-field">
      <span className="v-fieldlabel">{label}</span>
      {area ? <textarea className="v-input v-area" {...props} /> : <input className="v-input" {...props} />}
    </label>
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

/* ---------------- qualify ---------------- */
function Qualify({ go, t }) {
  const QUALIFY = t.qualify;
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState([]);
  const [contact, setContact] = useState({ name: "", phone: "" });
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

  /* Records the screening answers so the attorney has them before the call,
     then hands the visitor to payment. keepalive lets the POST finish even
     though the booking link navigates away immediately. */
  function recordScreening() {
    try {
      fetch("/api/lead", {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          kind: "screening",
          light,
          answers: picked.map((p) => ({ id: p.id, answer: p.label })),
        }),
      }).catch(() => {});
      setSent(true);
    } catch {}
  }

  function startPaid() {
    recordScreening();
    go("quickcheckout");
  }

  const L = {
    green: { color: GREEN, badge: t.apply.resultGreenBadge, head: t.apply.resultGreenHead, body: t.apply.resultGreenBody },
    yellow: { color: CHAMPAGNE, badge: t.apply.resultYellowBadge, head: t.apply.resultYellowHead, body: t.apply.resultYellowBody },
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
            <div className="v-noteitem" key={k} style={{ borderLeftColor: n.grade === "r" ? RED : CHAMPAGNE }}>{n.note}</div>
          ))}
        </div>
      )}
      <div className="v-bookbox">
        <div className="v-bookhead">
          {light === "red"
            ? t.apply.bookHeadRed
            : t.apply.bookHead}
        </div>
        <BookLink className="v-gold v-w100" style={{ textAlign: "center" }}
          onFallback={startPaid} onNavigate={recordScreening}>
          {t.common.getStarted99}
        </BookLink>
        <div className="v-bookfine">
          {t.apply.bookFine}
          {BOOKING_URL ? t.apply.bookFineScheduler : ""}
        </div>
        {sent && (
          <p className="v-mutetext" style={{ color: GREEN, marginTop: 14, marginBottom: 0 }}>
            {t.apply.bookSent}
          </p>
        )}
        {err && <p className="v-mutetext" style={{ color: RED, marginBottom: 0 }}>{err}</p>}
      </div>

      <div className="v-bookalt">
        {t.apply.bookAltPre}<a className="v-goldlink" href={PHONE_TEL}>{PHONE}</a>.
      </div>

      <p className="v-legal v-mt">
        {t.apply.screeningLegal}
      </p>
    </div>
  );
}

/* ---------------- packages ----------------
   Deliberately price-free. The fee is disclosed on the Fee step, one click
   from checkout, so the visitor chooses the engagement on its merits first. */
function Packages({ go, choose, pickLicense, t }) {
  const TIERS = t.tiers, PACKAGES = t.packages;
  const [showLicenses, setShowLicenses] = useState(false);
  return (
    <div className="v-page">
      <Eyebrow>{t.apply.packagesEyebrow}</Eyebrow>
      <h1 className="v-h1 v-h1sm">{t.apply.packagesH1}</h1>
      <p className="v-lede v-ledesm">
        {t.apply.packagesLede}
      </p>
      <div className="v-tiers">
        {TIERS.map((tier) => (
          <div key={tier.id} className={"v-pack v-tier" + (tier.featured ? " v-packfeat" : "")}>
            {tier.featured && <div className="v-featribbon">{t.apply.mostEngaged}</div>}
            <div className="v-packtier">{tier.tier}</div>
            <div className="v-packname">{tier.name}</div>
            {tier.quick && (
              <div>
                <div className="v-packprice">{fmt(tier.price)}</div>
                <div className="v-packfine">{tier.fine}</div>
              </div>
            )}
            <p className="v-packline">{tier.line}</p>
            <p className="v-packfor">{tier.for}</p>
            {tier.checkout && (
              <button className={tier.quick ? "v-gold v-w100" : "v-quiet v-w100"}
                onClick={() => choose({ id: tier.id, name: tier.name, price: tier.price })}>
                {tier.quick ? t.apply.getStartedNow : t.apply.continue}
              </button>
            )}
            {tier.expands && (
              <button className="v-gold v-w100" onClick={() => setShowLicenses((v) => !v)}>
                {showLicenses ? t.apply.hideLicence : t.apply.chooseLicence}
              </button>
            )}
            {tier.concierge && (
              <button className="v-quiet v-w100" onClick={() => go("quickcheckout")}>{t.apply.startConsult}</button>
            )}
          </div>
        ))}
      </div>

      {showLicenses && (
        <div className="v-licenseblock">
          <div className="v-licensehead"><Eyebrow>{t.apply.licenceBlockEyebrow}</Eyebrow></div>
          <p className="v-mutetext" style={{ maxWidth: "62ch" }}>
            {t.apply.licenceBlockNote}
          </p>
          <div className="v-packs">
            {PACKAGES.map((p) => (
              <button key={p.id}
                className={"v-pack v-packbtn" + (p.featured ? " v-packfeat" : "")}
                onClick={() => pickLicense(p)}>
                {p.featured && <div className="v-featribbon">{t.apply.flagship}</div>}
                <LicenseIcon name={p.icon} />
                <div className="v-packtier">{p.tier}</div>
                <div className="v-packname">{p.name}</div>
                <p className="v-packline">{p.line}</p>
                <p className="v-packfor">{p.for}</p>
                <span className={p.featured ? "v-gold v-w100 v-faux" : "v-quiet v-w100 v-faux"}>{t.apply.continue}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="v-underpacks">
        <p className="v-mutetext">{t.apply.underPacks}</p>
        <BookLink className="v-quiet" onFallback={() => go("quickcheckout")}>{t.common.getStarted99}</BookLink>
      </div>
    </div>
  );
}

/* ---------------- fee ----------------
   Where price finally appears: one click from checkout, after the visitor has
   picked a licence. Shows the band, what moves it, and the third-party costs. */
function Fee({ lic, go, choose, t }) {
  const THIRD_PARTY_COSTS = t.thirdParty, FEE_RANGE = t.feeRange;
  return (
    <div className="v-page v-mid">
      <button className="v-back" onClick={() => go("packages")}>{t.apply.backEngagements}</button>
      <Eyebrow>{t.apply.feeEyebrow} · {lic.name}</Eyebrow>
      <h1 className="v-h1 v-h1sm">{t.apply.feeH1}</h1>

      <div className="v-feebox">
        <div className="v-feelabel">{t.apply.feeLabel}</div>
        <div className="v-feefigure">{FEE_RANGE}</div>
        <p className="v-feenote">
          {t.apply.feeNote}
        </p>
      </div>

      <div className="v-costs" style={{ marginTop: 34 }}>
        <Eyebrow>{t.apply.costsEyebrow}</Eyebrow>
        <h2 className="v-h2" style={{ marginBottom: 14 }}>{t.apply.costsH2}</h2>
        <p className="v-mutetext" style={{ maxWidth: "62ch", marginBottom: 22 }}>
          {t.apply.costsLede}
        </p>
        <div className="v-costlist">
          {THIRD_PARTY_COSTS.map((c) => (
            <div className="v-costrow" key={c.id}>
              <div className="v-costname">{c.name}</div>
              <div className="v-costnote">{c.note}</div>
            </div>
          ))}
        </div>
        <div className="v-costincluded">
          <span className="v-costincludedmark" aria-hidden="true">✓</span>
          <span>
            {t.apply.costsIncludedPre}<strong>{t.apply.costsIncluded}</strong>{t.apply.costsIncludedPost}
          </span>
        </div>
      </div>

      <BookLink className="v-gold v-w100 v-mt" style={{ textAlign: "center" }}
        onFallback={() => choose({ id: QUICK.id, name: QUICK.name, price: QUICK.price })}>
        {t.apply.feeNotReady} {fmt(QUICK.price)}
      </BookLink>
      <BookLink className="v-quiet v-w100 v-mt" style={{ textAlign: "center" }}
        onFallback={() => go("quickcheckout")}>
        {t.apply.feeExact}
      </BookLink>
      <p className="v-mutetext v-mt">
        {t.apply.feeFoot}
      </p>
    </div>
  );
}

/* ---------------- checkout ---------------- */
function Checkout({ pack, go, onOpened, t }) {
  const [f, setF] = useState({ name: "", phone: "", email: "" });
  const [ack, setAck] = useState(false);
  const [step, setStep] = useState("info");
  const [created, setCreated] = useState(null);
  const [err, setErr] = useState("");
  const infoReady = f.name.trim() && f.phone.trim() && ack;

  async function toZelle() {
    if (!infoReady) return;
    setErr("");
    try {
      const res = await postJson("/api/client", {
        ...f,
        packageId: pack.id,
        packageName: pack.name,
        price: pack.price,
      });
      setCreated(res);
      setStep("zelle");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="v-page v-narrow">
      <button className="v-back" onClick={() => go("packages")}>{t.apply.backEngagements}</button>
      <Eyebrow>{t.apply.checkoutEyebrow}</Eyebrow>
      <h1 className="v-h1 v-h1sm">{pack.name}</h1>
      <div className="v-checkprice">{fmt(pack.price)} <span className="v-checkflat">{pack.id === "tier-quick" ? t.apply.initialConsultation : t.apply.flatFee}</span></div>

      {step === "info" && (
        <div className="v-form">
          <Field label={t.apply.fullName} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <Field label={t.apply.phone} inputMode="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
          <Field label={t.apply.email} inputMode="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          <label className="v-ack">
            <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
            <span>
              {pack.id === "tier-quick"
                ? t.apply.ackQuick
                : t.apply.ackFull}
            </span>
          </label>
          {err && <p className="v-mutetext" style={{ color: RED }}>{err}</p>}
          <button className="v-gold v-w100" onClick={toZelle} disabled={!infoReady}>{t.apply.toPayment}</button>
          <p className="v-mutetext v-mt">
            {pack.id === "tier-quick"
              ? t.apply.afterQuick
              : t.apply.afterFull}
          </p>
        </div>
      )}

      {step === "zelle" && created && (
        <div className="v-zelle">
          <div className="v-zellecard">
            <div className="v-zellehead">{t.apply.zelleHead}</div>
            <div className="v-zellerow"><span className="v-zellelabel">{t.apply.zelleTo}</span><span className="v-zelleval">{ZELLE_TO}</span></div>
            <div className="v-zellerow"><span className="v-zellelabel">{t.apply.zelleAmount}</span><span className="v-zelleval">{fmt(pack.price)}</span></div>
            <div className="v-zellerow"><span className="v-zellelabel">{t.apply.zelleMemo}</span><span className="v-zelleval">{created.ref}</span></div>
            <p className="v-zellenote">
              {t.apply.zelleNote} {PHONE}.
            </p>
          </div>
          <button className="v-gold v-w100" onClick={() => onOpened(created.id)}>{t.apply.zelleOpen}</button>
          <button className="v-quiet v-w100 v-mt" onClick={() => onOpened(created.id)}>{t.apply.zelleLater}</button>
          <p className="v-mutetext v-mt">{t.apply.zelleProvisional}</p>
        </div>
      )}
    </div>
  );
}

/* ---------------- portal ---------------- */
function Portal({ clientId, go, t }) {
  const PHASES = t.phases;
  const [c, setC] = useState(null);
  const [err, setErr] = useState("");
  const fileInputRef = useRef(null);
  const [pendingItem, setPendingItem] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/client?id=" + encodeURIComponent(clientId))
      .then((r) => r.json())
      .then((d) => (d.error ? setErr(d.error) : setC(d)))
      .catch(() => setErr(t.apply.portalLoadErr));
  }, [clientId]);

  if (err) return <div className="v-page v-narrow"><p className="v-lede v-ledesm">{err}</p></div>;
  if (!c) return <div className="v-page v-narrow"><p className="v-mutetext">{t.apply.portalOpening}</p></div>;

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
    const d = await postJson("/api/client", { id: c.id, phase: c.phase + 1 }, "PATCH");
    setC(d);
  }

  async function markFiled() {
    const d = await postJson("/api/client", { id: c.id, filedAt: true }, "PATCH");
    setC(d);
  }

  const ROMAN = ["I", "II", "III", "IV"];

  return (
    <div className="v-page">
      <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={onFile}
        accept=".pdf,.jpg,.jpeg,.png,.heic,.heif,.webp" />
      <div className="v-portalhead">
        <div>
          <Eyebrow>{t.apply.portalEyebrow}</Eyebrow>
          <h1 className="v-h1 v-h1sm">{c.name.split(" ")[0]}, {t.apply.portalFileOpen}</h1>
          <div className="v-portalmeta">
            {c.packageName} · {t.apply.portalRef} {c.ref} ·{" "}
            {c.paymentVerified
              ? <span style={{ color: GREEN }}>{t.apply.portalPaid}</span>
              : <span style={{ color: CHAMPAGNE }}>{t.apply.portalPending}</span>}
          </div>
        </div>
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
        {err && <p className="v-mutetext" style={{ color: RED }}>{err}</p>}
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
            <p className="v-phasedonetext">
              {currentPhase.name} {t.apply.portalPhaseDone}
            </p>
            <button className="v-gold" onClick={advance}>{t.apply.portalOpenNext} {ROMAN[c.phase]}</button>
          </div>
        )}
        {phaseComplete && c.phase === PHASES.length && (
          <div className="v-phasedonebox">
            <p className="v-phasedonetext" style={{ color: GREEN }}>
              {t.apply.portalAssembled}
            </p>
            {!c.filedAt && (
              <button className="v-gold" onClick={markFiled}>{t.apply.portalMarkFiled}</button>
            )}
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
            <div className="v-trackerhead"><Eyebrow>{t.apply.trackerEyebrow}</Eyebrow></div>
            <div className="v-stages">
              {STAGES.map((s, k) => (
                <div key={k} className={"v-stage" + (k < stage ? " v-stagedone" : k === stage ? " v-stagenow" : "")}>
                  <span className="v-stagedot" /><span className="v-stagename">{s}</span>
                </div>
              ))}
            </div>
            <div className="v-clock">
              <div className="v-clockdays" style={{ color: overdue ? RED : CHAMPAGNE }}>{t.apply.trackerDay} {days}</div>
              <div className="v-clocklabel">
                {overdue
                  ? t.apply.trackerOverdue
                  : `${t.apply.trackerOf180} ${remaining} ${t.apply.trackerRemain}`}
              </div>
            </div>
            {overdue && (
              <div className="v-art78">
                <div className="v-art78head">{t.apply.art78Head}</div>
                <p className="v-art78text">
                  {t.apply.art78Text}
                </p>
                <a className="v-gold v-sm" href={PHONE_TEL}>{t.apply.art78Cta} {PHONE}</a>
              </div>
            )}
            <p className="v-mutetext" style={{ marginTop: 16, marginBottom: 0 }}>
              {t.apply.trackerFoot}
            </p>
          </div>
        );
      })()}

      <div className="v-lifegrid">
        <div className="v-lifecard">
          <div className="v-lifehead">{t.apply.lifeHead1}</div>
          <p className="v-lifetext">
            {t.apply.lifeText1}
          </p>
        </div>
        <div className="v-lifecard">
          <div className="v-lifehead">{t.apply.lifeHead2}</div>
          <p className="v-lifetext">
            {t.apply.lifeText2}
          </p>
          <a className="v-quiet v-sm" href={PHONE_TEL}>{t.apply.lifeCta2}</a>
        </div>
      </div>

      <div className="v-concierge">
        <div className="v-conciergetext">
          <div className="v-conciergehead">{t.apply.conciergeHead}</div>
          {t.apply.conciergeText}
        </div>
        <a className="v-quiet v-sm" href={PHONE_TEL}>{PHONE}</a>
      </div>
    </div>
  );
}

/* ---------------- flow ---------------- */


export default function Flow({ t, lang = "en" }) {
  const TIERS = t.tiers;
  const QUICK = TIERS.find((x) => x.quick);
  const params = useSearchParams();
  const requested = params.get("view") || "qualify";
  const [view, setView] = useState(requested === "quick" ? "checkout" : requested);
  const [pack, setPack] = useState(
    requested === "quick" ? { id: QUICK.id, name: QUICK.name, price: QUICK.price } : null
  );
  const [lic, setLic] = useState(null);
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("ctc:clientId") : null;
    if (saved) setClientId(saved);
    if (params.get("view") === "portal" && saved) setView("portal");
  }, [params]);

  function openPortal(id) {
    window.localStorage.setItem("ctc:clientId", id);
    setClientId(id);
    setView("portal");
  }

  const go = (v) => {
    if (v === "portal" && !clientId) return setView("packages");
    if (v === "quickcheckout") {
      setPack({ id: QUICK.id, name: QUICK.name, price: QUICK.price });
      setView("checkout");
      window.scrollTo(0, 0);
      return;
    }
    setView(v);
    window.scrollTo(0, 0);
  };

  const choose = (p) => { setPack(p); setView("checkout"); window.scrollTo(0, 0); };
  const pickLicense = (p) => { setLic(p); setView("fee"); window.scrollTo(0, 0); };

  const packagesView = <Packages go={go} choose={choose} pickLicense={pickLicense} t={t} />;

  return (
    <>
      {view === "qualify" && <Qualify go={go} t={t} />}
      {view === "packages" && packagesView}
      {view === "fee" && (lic ? <Fee lic={lic} go={go} choose={choose} t={t} /> : packagesView)}
      {view === "checkout" && (pack ? <Checkout pack={pack} go={go} onOpened={openPortal} t={t} /> : packagesView)}
      {view === "portal" && (clientId ? <Portal clientId={clientId} go={go} t={t} /> : packagesView)}
    </>
  );
}
