import Link from "next/link";
import { Nav, Footer, Eyebrow, Wordmark } from "@/lib/ui";
import { getDict, lp } from "@/lib/i18n";
import HtmlLang from "@/lib/htmllang";

export default function Home({ lang = "en" }) {
  const t = getDict(lang);
  const h = t.home;
  const w = t.whyPage;
  return (
    <div>
      <HtmlLang lang={lang} />
      <Nav lang={lang} />

      <section className="v-hero v-herolanding">
        <span className="v-corner v-corner--tl" aria-hidden="true" />
        <span className="v-corner v-corner--tr" aria-hidden="true" />
        <span className="v-corner v-corner--bl" aria-hidden="true" />
        <span className="v-corner v-corner--br" aria-hidden="true" />
        <div className="v-heroinner">
          <Wordmark size={1.35} lang={lang} />
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
        <div className="v-amendband">
          <div className="v-amendlabel">{h.amendLabel}</div>
          <p className="v-amendfull">{h.amendFull}</p>
          <div className="v-amendnote">{h.amendNote}</div>
        </div>
      </section>

      <section className="v-section" data-reveal>
        <div className="v-sectionhead">
          <Eyebrow>{h.compareEyebrow}</Eyebrow>
          <h2 className="v-h2">{h.expediteH2a} <em className="v-goldem">{h.expediteH2b}</em></h2>
          <p className="v-lede v-ledesm">{h.expediteLede}</p>
        </div>
        <div className="v-comparegrid">
          <div className="v-comparecol v-dim">
            <div className="v-comparehead">{w.diyHead}</div>
            <ul className="v-list">{w.diy.map((li, i) => <li key={i}>{li}</li>)}</ul>
          </div>
          <div className="v-comparecol v-lit">
            <div className="v-comparehead v-goldtext">{w.usHead}</div>
            <ul className="v-list">{w.us.map((li, i) => <li key={i}>{li}</li>)}</ul>
          </div>
        </div>
        <p className="v-sectionfoot">{h.expediteFoot}</p>
      </section>

      <section className="v-section v-section--rule" data-reveal>
        <div className="v-sectionhead">
          <Eyebrow>{h.whoEyebrow}</Eyebrow>
          <h2 className="v-h2">{h.whoH2a} <em className="v-goldem">{h.whoH2b}</em></h2>
        </div>
        <div className="v-cards2">
          <div className="v-card">
            <div className="v-cardtitle">{h.whoCard1Title}</div>
            <p className="v-cardtext">{h.whoCard1Text}</p>
          </div>
          <div className="v-card">
            <div className="v-cardtitle">{h.whoCard2Title}</div>
            <p className="v-cardtext">{h.whoCard2Text}</p>
          </div>
        </div>
      </section>

      <section className="v-section v-section--rule" data-reveal>
        <div className="v-sectionhead">
          <Eyebrow>{h.licensesEyebrow}</Eyebrow>
          <h2 className="v-h2">{h.licensesH2}</h2>
        </div>
        <div className="v-licensegrid">
          {t.packages.map((p) => (
            <Link href={lp(lang, "/apply?view=packages")} className="v-license" key={p.id}>
              <div className="v-licensetier">{p.tier}</div>
              <div className="v-licensename">{p.name}</div>
              <div className="v-licenseline">{p.line}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="v-consultband" data-reveal>
        <div className="v-consultin">
          <div>
            <Eyebrow>{h.consultEyebrow}</Eyebrow>
            <h2 className="v-h2">{h.consultH2}</h2>
            <p className="v-body">{h.consultText}</p>
          </div>
          <div className="v-consultaside">
            <div className="v-price">$159</div>
            <div className="v-pricenote">{t.apply.consultFeeNote}</div>
            <Link className="v-gold v-w100" href={lp(lang, "/apply?view=consult")}>{t.common.getStarted99}</Link>
            <Link className="v-quiet v-w100" href={lp(lang, "/apply")}>{t.common.freeScreening}</Link>
          </div>
        </div>
      </section>

      <section className="v-section" data-reveal>
        <div className="v-attorneyrow">
          <img className="v-portrait" src="/manny-zayrov.jpg" alt="Manny Zayrov, Esq., Zayrov Law, P.C." />
          <div>
            <Eyebrow>{h.attorneyEyebrow}</Eyebrow>
            <h2 className="v-h2">{h.attorneyH2}</h2>
            <p className="v-body">{h.attorneyText}</p>
            <Link className="v-textlink" href={lp(lang, "/attorney")}>{h.attorneyCta} →</Link>
          </div>
        </div>
      </section>

      <section className="v-section v-section--rule" data-reveal>
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

      <section className="v-finalcta" data-reveal>
        <h2 className="v-h2">
          {h.finalH2a}
          <br />
          <em className="v-goldem">{h.finalH2b}</em>
        </h2>
        <Link className="v-gold" href={lp(lang, "/apply")}>{t.common.qualify60}</Link>
      </section>

      <p className="v-legal v-legalwide">{h.legal}</p>

      <div className="v-stickycta">
        <span className="v-stickytext">{h.stickyText}</span>
        <Link className="v-gold v-sm" href={lp(lang, "/apply")}>{h.stickyCta}</Link>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
