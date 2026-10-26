import fs from "fs";
import path from "path";
import Link from "next/link";
import { Nav, Footer, Eyebrow, Skyline, Liberty, Wordmark, LicenseIcon, LicenseCard, ClockIcon, FileCheckIcon } from "@/lib/ui";
import { getDict, lp } from "@/lib/i18n";
import HtmlLang from "@/lib/htmllang";

/* A real photograph, when supplied, replaces the drawn skyline and Liberty
   rather than stacking a second horizon on the real one. */
const heroPhoto = fs.existsSync(path.join(process.cwd(), "public", "hero-nyc.jpg"));

export default function Home({ lang = "en" }) {
  const t = getDict(lang);
  const h = t.home;
  return (
    <div>
      <HtmlLang lang={lang} />
      <Nav lang={lang} />

      <section className={"v-hero" + (heroPhoto ? " v-heroshot" : "")}>
        {heroPhoto && <div className="v-herophoto" aria-hidden="true" />}
        <div className="v-heroscrim" aria-hidden="true" />
        <div className="v-heroinner">
          <Wordmark size={1} lang={lang} />
          <h1 className="v-h1">
            {h.heroH1a}
            <br />
            <em>{h.heroH1b}</em>
          </h1>
          <p className="v-lede v-ledehero">{h.heroLede}</p>
          <div className="v-herobtns">
            <Link className="v-gold" href={lp(lang, "/apply")}>{t.common.qualify60}</Link>
            <Link className="v-quiet" href={lp(lang, "/apply?view=consult")}>{t.common.getStarted99}</Link>
          </div>
          <div className="v-heronote">{h.heroNote}</div>
        </div>
        {!heroPhoto && <Liberty className="v-liberty" />}
        {!heroPhoto && <Skyline />}
      </section>

      <section className="v-amend" data-reveal>
        <p className="v-amendquote">
          {h.amendQuote}
          <em>{h.amendQuoteEm}</em>
        </p>
        <div className="v-amendattr">{h.amendAttr}</div>
        <div className="v-amendnote">{h.amendNote}</div>
      </section>

      <section className="v-expedite" data-reveal>
        <div className="v-expediteinner">
          <Eyebrow style={{ textAlign: "center" }}>{h.expediteEyebrow}</Eyebrow>
          <h2 className="v-h2" style={{ textAlign: "center" }}>
            {h.expediteH2a}
            <br />
            <em className="v-goldem">{h.expediteH2b}</em>
          </h2>
          <p className="v-lede v-ledesm" style={{ margin: "0 auto 46px", textAlign: "center" }}>{h.expediteLede}</p>

          <div className="v-ruler" aria-hidden="true">
            <span>{h.rulerStart}</span><span>6</span><span>12</span><span>18+</span>
          </div>

          <div className="v-track2r v-trackdiy">
            <div className="v-tracklabel">{h.trackDiy}</div>
            <div className="v-trackbar v-bardiy" aria-hidden="true" />
            <ol className="v-trackstops">
              {h.trackDiyStops.map((s, i) => (
                <li key={i} className={i === h.trackDiyStops.length - 1 ? "v-stopdead" : undefined}>{s}</li>
              ))}
            </ol>
          </div>

          <div className="v-track2r v-trackus">
            <div className="v-tracklabel v-goldtext">{h.trackUs}</div>
            <div className="v-trackbar v-barflame" aria-hidden="true" />
            <ol className="v-trackstops">
              {h.trackUsStops.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
            <div className="v-trackcardslot">
              <LicenseCard className="v-trackcard" />
              <div className="v-tracksaved">{h.trackSaved}</div>
            </div>
          </div>

          <p className="v-expeditefoot">{h.expediteFoot}</p>
        </div>
      </section>

      <section className="v-whofor" data-reveal>
        <div className="v-whoforinner">
          <Eyebrow style={{ textAlign: "center" }}>{h.whoEyebrow}</Eyebrow>
          <h2 className="v-h2" style={{ textAlign: "center" }}>
            {h.whoH2a}
            <br />
            <em className="v-goldem">{h.whoH2b}</em>
          </h2>
          <div className="v-whogrid">
            <div className="v-whocard">
              <ClockIcon />
              <div className="v-whotitle">{h.whoCard1Title}</div>
              <p className="v-whotext">{h.whoCard1Text}</p>
            </div>
            <div className="v-whocard">
              <FileCheckIcon />
              <div className="v-whotitle">{h.whoCard2Title}</div>
              <p className="v-whotext">{h.whoCard2Text}</p>
            </div>
          </div>
          <div className="v-whocta">
            <p className="v-whoclose">{h.whoClose}</p>
            <div className="v-herobtns">
              <Link className="v-gold" href={lp(lang, "/apply")}>{t.common.freeScreening}</Link>
              <Link className="v-quiet" href={lp(lang, "/apply?view=consult")}>{t.common.getStarted99}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="v-licenses" data-reveal>
        <div className="v-licenseshead">
          <div className="v-eyebrow">{h.licensesEyebrow}</div>
          <h2 className="v-h2" style={{ marginBottom: 0 }}>{h.licensesH2}</h2>
        </div>
        <div className="v-licensegrid">
          {t.packages.map((p) => (
            <Link href={lp(lang, "/apply?view=packages")} className={"v-license" + (p.featured ? " v-licensefeat" : "")} key={p.id}>
              <LicenseIcon name={p.icon} />
              <div className="v-licensename">{p.name}</div>
              <div className="v-licenseline">{p.line}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="v-steps" data-reveal>
        <div className="v-stepsgrid">
          {h.steps.map((s) => (
            <div className="v-step" key={s.n}>
              <div className="v-stepnum">{s.n}</div>
              <div className="v-steptitle">{s.title}</div>
              <div className="v-steptext">{s.text}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="v-truststrip">
        {h.trust.map((x, i) => (
          <span key={i} style={{ display: "contents" }}>
            {i > 0 && <span className="v-trustdot" aria-hidden="true" />}
            <span>{x}</span>
          </span>
        ))}
      </div>

      <p className="v-legal v-mt" style={{ maxWidth: "70ch", margin: "0 auto", padding: "0 22px" }}>
        {h.legal}
      </p>

      <section className="v-finalcta" data-reveal>
        <h2 className="v-h2" style={{ marginBottom: 24 }}>
          {h.finalH2a}
          <br />
          <em className="v-goldem">{h.finalH2b}</em>
        </h2>
        <Link className="v-gold" href={lp(lang, "/apply")}>{t.common.qualify60}</Link>
      </section>

      <div className="v-stickycta">
        <span className="v-stickytext">{h.stickyText}</span>
        <Link className="v-gold v-sm" href={lp(lang, "/apply")}>{h.stickyCta}</Link>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
