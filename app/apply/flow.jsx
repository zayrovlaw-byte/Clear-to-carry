"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eyebrow } from "@/lib/ui";
import { PACKAGES, TIERS, QUALIFY, PHASES, THIRD_PARTY_COSTS, FEE_RANGE, ZELLE_TO, PHONE, PHONE_TEL } from "@/lib/content";

const GREEN = "#5FA97F", RED = "#C25450", CHAMPAGNE = "#C9A96A";
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
function Qualify({ go }) {
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
        <Eyebrow>Do you qualify · {i + 1} of {QUALIFY.length}</Eyebrow>
        <div className="v-track" style={{ marginBottom: 34 }}>
          <div className="v-fill" style={{ width: (i / QUALIFY.length) * 100 + "%" }} />
        </div>
        <h1 ref={headingRef} tabIndex={-1} className="v-qq">{q.q}</h1>
        <div className="v-qopts">
          {q.opts.map((o, k) => (
            <button className="v-qopt" key={k} onClick={() => pick(o)}>{o.label}</button>
          ))}
        </div>
        <p className="v-mutetext v-mt">Nothing here is filed or shared. Honest answers get you an honest read.</p>
      </div>
    );
  }

  const reds = picked.filter((p) => p.grade === "r");
  const yellows = picked.filter((p) => p.grade === "y");
  const light = reds.length ? "red" : yellows.length ? "yellow" : "green";
  const notes = [...reds, ...yellows].filter((p) => p.note);

  async function saveLead() {
    setErr("");
    try {
      await postJson("/api/lead", {
        ...contact,
        kind: "screening",
        light,
        answers: picked.map((p) => ({ id: p.id, answer: p.label })),
      });
      setSent(true);
    } catch (e) {
      setErr(e.message);
    }
  }

  const L = {
    green: { color: GREEN, badge: "CLEAR PATH", head: "Nothing stands in your way.",
      body: "No bar and no complication showed up. You are the applicant this license now exists for. The only way to lose from here is a file with an avoidable error in it, and that is precisely what we prevent.",
      cta: "packages", ctaLabel: "Choose your engagement" },
    yellow: { color: CHAMPAGNE, badge: "QUALIFIED · WITH HANDLING", head: "You can get there. It has to be built right.",
      body: "Nothing you flagged is an automatic bar. Every one of these items is the kind of thing that sinks a do-it-yourself application when an investigator finds it first, and survives when counsel presents it first. This is the exact file we are best at.",
      cta: "consult", ctaLabel: "Talk to the attorney first, free" },
    red: { color: RED, badge: "CALL BEFORE YOU FILE", head: "Do not file anything yet.",
      body: "Something in your answers needs legal analysis before an application exists with your name on it. Filing wrong here can make things permanently worse. The conversation is free, and we will tell you plainly whether there is a path and what it costs.",
      cta: null },
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
      {!sent ? (
        <div className="v-leadbox">
          <div className="v-leadhead">
            {light === "green"
              ? "Want your result and next steps by phone? One call, no obligation."
              : "Leave your number. The attorney calls you, not an assistant."}
          </div>
          <Field label="Name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
          <Field label="Phone" inputMode="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
          {err && <p className="v-mutetext" style={{ color: RED }}>{err}</p>}
          <button className="v-gold v-w100" onClick={saveLead} disabled={!contact.name.trim() || !contact.phone.trim()}>
            Have the attorney call me
          </button>
        </div>
      ) : (
        <div className="v-leadbox">
          <div className="v-leadhead" style={{ color: GREEN }}>
            Received. Expect a call from {PHONE} within one business day.
          </div>
        </div>
      )}
      {L.cta && (
        <button className="v-quiet v-w100 v-mt" onClick={() => go(L.cta)}>{L.ctaLabel}</button>
      )}
      {light === "red" && (
        <a className="v-gold v-w100 v-mt" style={{ textAlign: "center" }} href={PHONE_TEL}>Call now · {PHONE}</a>
      )}
      <p className="v-legal v-mt">
        This screening is general information, not legal advice, and creates no
        attorney-client relationship. Eligibility is determined by the licensing
        authority on your complete record.
      </p>
    </div>
  );
}

/* ---------------- packages ---------------- */
function Packages({ go, choose }) {
  const [showLicenses, setShowLicenses] = useState(false);
  return (
    <div className="v-page">
      <Eyebrow>Engagements</Eyebrow>
      <h1 className="v-h1 v-h1sm">Choose how much of this you want to carry.</h1>
      <p className="v-lede v-ledesm">
        Every level is flat fee and handled personally by the attorney. Most clients
        choose Full Representation. Some want an hour of straight answers first.
        Both are the right way in.
      </p>
      <div className="v-tiers">
        {TIERS.map((t) => (
          <div key={t.id} className={"v-pack v-tier" + (t.featured ? " v-packfeat" : "")}>
            {t.featured && <div className="v-featribbon">Most engaged</div>}
            <div className="v-packtier">{t.tier}</div>
            <div className="v-packname">{t.name}</div>
            <div className="v-packprice">{t.priceLabel || fmt(t.price)}</div>
            <p className="v-packline">{t.line}</p>
            <p className="v-packfor">{t.for}</p>
            {t.checkout && (
              <button className="v-quiet v-w100" onClick={() => choose({ id: t.id, name: t.name, price: t.price })}>Begin</button>
            )}
            {t.expands && (
              <button className="v-gold v-w100" onClick={() => setShowLicenses((s) => !s)}>
                {showLicenses ? "Hide license types" : "Select your license type"}
              </button>
            )}
            {t.concierge && (
              <button className="v-quiet v-w100" onClick={() => go("consult")}>Arrange by consultation</button>
            )}
          </div>
        ))}
      </div>
      {showLicenses && (
        <div className="v-licenseblock">
          <div className="v-licensehead"><Eyebrow>Full Representation · {FEE_RANGE} · by license</Eyebrow></div>
          <p className="v-mutetext" style={{ maxWidth: "62ch" }}>
            Every license type below is handled for the same flat fee band. What moves
            the number is your record, not your license. We quote your exact figure at
            the consultation and fix it in the engagement letter.
          </p>
          <div className="v-packs">
            {PACKAGES.map((p) => (
              <div key={p.id} className={"v-pack" + (p.featured ? " v-packfeat" : "")}>
                {p.featured && <div className="v-featribbon">Flagship</div>}
                <div className="v-packtier">{p.tier}</div>
                <div className="v-packname">{p.name}</div>
                <div className="v-packprice">{FEE_RANGE}</div>
                <p className="v-packline">{p.line}</p>
                <p className="v-packfor">{p.for}</p>
                <button className={p.featured ? "v-gold v-w100" : "v-quiet v-w100"} onClick={() => go("consult")}>Get my exact fee</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="v-costs">
        <Eyebrow>What else this costs</Eyebrow>
        <h2 className="v-h2" style={{ marginBottom: 14 }}>Three fees that are not ours.</h2>
        <p className="v-mutetext" style={{ maxWidth: "62ch", marginBottom: 22 }}>
          Every applicant pays these, with or without an attorney. They go to the City,
          the State, and your course provider, never to this firm. Amounts are set by
          them and change, so we confirm current figures at your consultation rather
          than advertise a number that may be stale when you read it.
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
            All three are <strong>included in the Concierge engagement</strong>. In every
            other engagement you pay them directly to the third party.
          </span>
        </div>
      </div>

      <div className="v-underpacks">
        <p className="v-mutetext">Not certain where to start? The first phone call is free and the answer is honest.</p>
        <button className="v-quiet" onClick={() => go("consult")}>Request free consultation</button>
      </div>
    </div>
  );
}

/* ---------------- consult ---------------- */
function Consult({ go }) {
  const [f, setF] = useState({ name: "", phone: "", email: "", interest: "carry", note: "" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  async function submit() {
    setErr("");
    try {
      await postJson("/api/lead", { ...f, kind: "consult" });
      setSent(true);
    } catch (e) {
      setErr(e.message);
    }
  }

  if (sent) {
    return (
      <div className="v-page v-narrow">
        <Eyebrow>Received</Eyebrow>
        <h1 className="v-h1 v-h1sm">We&apos;ll call you.</h1>
        <p className="v-lede v-ledesm">
          Your request is in. Expect a call from {PHONE} within one business day. If
          you&apos;d rather not wait, call us directly.
        </p>
        <a className="v-gold v-inline" href={PHONE_TEL}>Call now</a>
      </div>
    );
  }

  return (
    <div className="v-page v-narrow">
      <Eyebrow>Complimentary</Eyebrow>
      <h1 className="v-h1 v-h1sm">A private conversation.</h1>
      <p className="v-lede v-ledesm">
        Fifteen minutes with the attorney. You&apos;ll leave knowing whether you
        qualify, which license fits, and what it costs. No obligation, no file opened.
      </p>
      <div className="v-form">
        <Field label="Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <Field label="Phone" inputMode="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
        <Field label="Email (optional)" inputMode="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        <label className="v-field">
          <span className="v-fieldlabel">I&apos;m interested in protecting</span>
          <select className="v-input" value={f.interest} onChange={(e) => setF({ ...f, interest: e.target.value })}>
            <option value="home">My home</option>
            <option value="business">My business</option>
            <option value="carry">Myself, wherever I go</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </label>
        <Field label="Anything we should know (optional)" area value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} />
        {err && <p className="v-mutetext" style={{ color: RED }}>{err}</p>}
        <button className="v-gold v-w100" onClick={submit} disabled={!f.name.trim() || !f.phone.trim()}>
          Request my consultation
        </button>
        <p className="v-mutetext v-mt">Submitting this form does not create an attorney-client relationship.</p>
      </div>
    </div>
  );
}

/* ---------------- checkout ---------------- */
function Checkout({ pack, go, onOpened }) {
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
      <button className="v-back" onClick={() => go("packages")}>← Engagements</button>
      <Eyebrow>Retain counsel</Eyebrow>
      <h1 className="v-h1 v-h1sm">{pack.name}</h1>
      <div className="v-checkprice">{fmt(pack.price)} <span className="v-checkflat">flat fee</span></div>

      {step === "info" && (
        <div className="v-form">
          <Field label="Full legal name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <Field label="Phone" inputMode="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
          <Field label="Email" inputMode="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          <label className="v-ack">
            <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
            <span>
              I understand that representation begins when I sign the engagement
              letter Zayrov Law sends me and payment clears, that the fee shown is a
              flat fee for the selected engagement, and that no outcome is promised.
            </span>
          </label>
          {err && <p className="v-mutetext" style={{ color: RED }}>{err}</p>}
          <button className="v-gold v-w100" onClick={toZelle} disabled={!infoReady}>Continue to payment</button>
          <p className="v-mutetext v-mt">Your engagement letter follows by email. Representation begins on signed letter and cleared payment.</p>
        </div>
      )}

      {step === "zelle" && created && (
        <div className="v-zelle">
          <div className="v-zellecard">
            <div className="v-zellehead">Pay by Zelle</div>
            <div className="v-zellerow"><span className="v-zellelabel">Send to</span><span className="v-zelleval">{ZELLE_TO}</span></div>
            <div className="v-zellerow"><span className="v-zellelabel">Amount</span><span className="v-zelleval">{fmt(pack.price)}</span></div>
            <div className="v-zellerow"><span className="v-zellelabel">Memo</span><span className="v-zelleval">{created.ref}</span></div>
            <p className="v-zellenote">
              Open your banking app, send via Zelle to the address above, and include
              the memo so we match your payment instantly. Prefer to split it or pay
              another way? Call {PHONE}.
            </p>
          </div>
          <button className="v-gold v-w100" onClick={() => onOpened(created.id)}>I&apos;ve sent payment · open my portal</button>
          <button className="v-quiet v-w100 v-mt" onClick={() => onOpened(created.id)}>I&apos;ll pay after my engagement letter · open portal</button>
          <p className="v-mutetext v-mt">Portal access is provisional until payment clears and your engagement letter is signed.</p>
        </div>
      )}
    </div>
  );
}

/* ---------------- portal ---------------- */
function Portal({ clientId, go }) {
  const [c, setC] = useState(null);
  const [err, setErr] = useState("");
  const fileInputRef = useRef(null);
  const [pendingItem, setPendingItem] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/client?id=" + encodeURIComponent(clientId))
      .then((r) => r.json())
      .then((d) => (d.error ? setErr(d.error) : setC(d)))
      .catch(() => setErr("Could not load your file. Call us."));
  }, [clientId]);

  if (err) return <div className="v-page v-narrow"><p className="v-lede v-ledesm">{err}</p></div>;
  if (!c) return <div className="v-page v-narrow"><p className="v-mutetext">Opening your file…</p></div>;

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
          <Eyebrow>Private client portal</Eyebrow>
          <h1 className="v-h1 v-h1sm">{c.name.split(" ")[0]}, your file is open.</h1>
          <div className="v-portalmeta">
            {c.packageName} · Ref {c.ref} ·{" "}
            {c.paymentVerified
              ? <span style={{ color: GREEN }}>Retainer received</span>
              : <span style={{ color: CHAMPAGNE }}>Payment pending verification</span>}
          </div>
        </div>
      </div>

      <div className="v-progressblock">
        <div className="v-progresslabel">
          <span>Movement {ROMAN[c.phase - 1]} of IV · {currentPhase.name}</span>
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
                  ? <div className="v-docstatus" style={{ color: GREEN }}>Received · {doc.name} · under attorney review</div>
                  : <div className="v-docstatus">Awaiting your upload</div>}
              </div>
              {doc
                ? <button className="v-quiet v-sm" disabled={busy} onClick={() => pickFile(it.id)}>Replace</button>
                : <button className="v-gold v-sm" disabled={busy} onClick={() => pickFile(it.id)}>{busy && pendingItem === it.id ? "Sending…" : "Upload"}</button>}
            </div>
          );
        })}
        {phaseComplete && c.phase < PHASES.length && (
          <div className="v-phasedonebox">
            <p className="v-phasedonetext">
              {currentPhase.name} is complete. The attorney reviews what you&apos;ve
              sent, then the next movement opens.
            </p>
            <button className="v-gold" onClick={advance}>Open Movement {ROMAN[c.phase]}</button>
          </div>
        )}
        {phaseComplete && c.phase === PHASES.length && (
          <div className="v-phasedonebox">
            <p className="v-phasedonetext" style={{ color: GREEN }}>
              Your file is assembled. We schedule your final review, then we file.
              From here, we do the waiting for you.
            </p>
            {!c.filedAt && (
              <button className="v-gold" onClick={markFiled}>Demo: mark as filed</button>
            )}
          </div>
        )}
      </div>

      {c.filedAt && (() => {
        const STAGES = ["Filed with the License Division", "Under investigation", "Interview", "Decision"];
        const stage = c.appStatus || 0;
        const days = Math.floor((Date.now() - new Date(c.filedAt).getTime()) / 86400000);
        const remaining = 180 - days;
        const overdue = remaining <= 0;
        return (
          <div className="v-trackercard">
            <div className="v-trackerhead"><Eyebrow>After filing · we watch, you live your life</Eyebrow></div>
            <div className="v-stages">
              {STAGES.map((s, k) => (
                <div key={k} className={"v-stage" + (k < stage ? " v-stagedone" : k === stage ? " v-stagenow" : "")}>
                  <span className="v-stagedot" /><span className="v-stagename">{s}</span>
                </div>
              ))}
            </div>
            <div className="v-clock">
              <div className="v-clockdays" style={{ color: overdue ? RED : CHAMPAGNE }}>Day {days}</div>
              <div className="v-clocklabel">
                {overdue
                  ? "The statutory deadline has passed."
                  : `of the 180 days the law gives the NYPD to decide. ${remaining} remain.`}
              </div>
            </div>
            {overdue && (
              <div className="v-art78">
                <div className="v-art78head">The law is now on our side of the table.</div>
                <p className="v-art78text">
                  New York law required a decision on your complete application within
                  six months. That deadline has passed. You don&apos;t have to keep
                  waiting politely, and neither do we. An Article 78 proceeding asks a
                  court to order the NYPD to decide. Call us to discuss it.
                </p>
                <a className="v-gold v-sm" href={PHONE_TEL}>Discuss Article 78 · {PHONE}</a>
              </div>
            )}
            <p className="v-mutetext" style={{ marginTop: 16, marginBottom: 0 }}>
              Status is updated by the attorney as your file moves. You will never
              learn something about your own application later than we do.
            </p>
          </div>
        );
      })()}

      <div className="v-lifegrid">
        <div className="v-lifecard">
          <div className="v-lifehead">For as long as you carry</div>
          <p className="v-lifetext">
            The license runs on a three-year cycle, and a lapse is a self-inflicted
            wound. We calendar your renewal and handle amendments when you add a
            firearm. Once the license issues, you stay our client.
          </p>
        </div>
        <div className="v-lifecard">
          <div className="v-lifehead">Someone you trust wants this too</div>
          <p className="v-lifetext">
            Most of our clients arrive through another client. If someone in your
            life should be protected the same way, have them mention your name. They
            get the consultation on us; your file gets priority scheduling.
          </p>
          <a className="v-quiet v-sm" href={PHONE_TEL}>Introduce someone</a>
        </div>
      </div>

      <div className="v-concierge">
        <div className="v-conciergetext">
          <div className="v-conciergehead">Direct line to counsel</div>
          Questions go to the attorney, not a call center.
        </div>
        <a className="v-quiet v-sm" href={PHONE_TEL}>{PHONE}</a>
      </div>
    </div>
  );
}

/* ---------------- flow ---------------- */
export default function Flow() {
  const params = useSearchParams();
  const [view, setView] = useState(params.get("view") || "qualify");
  const [pack, setPack] = useState(null);
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
    setView(v);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {view === "qualify" && <Qualify go={go} />}
      {view === "packages" && <Packages go={go} choose={(p) => { setPack(p); setView("checkout"); window.scrollTo(0, 0); }} />}
      {view === "consult" && <Consult go={go} />}
      {view === "checkout" && pack && <Checkout pack={pack} go={go} onOpened={openPortal} />}
      {view === "checkout" && !pack && <Packages go={go} choose={(p) => { setPack(p); setView("checkout"); }} />}
      {view === "portal" && clientId && <Portal clientId={clientId} go={go} />}
      {view === "portal" && !clientId && <Packages go={go} choose={(p) => { setPack(p); setView("checkout"); }} />}
    </>
  );
}
