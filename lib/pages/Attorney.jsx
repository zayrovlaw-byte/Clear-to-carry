import Link from "next/link";
import { Nav, Footer, Eyebrow, Skyline } from "@/lib/ui";
import { getDict, lp } from "@/lib/i18n";
import HtmlLang from "@/lib/htmllang";
import { PHONE, PHONE_TEL } from "@/lib/content";

export default function Attorney({ lang = "en" }) {
  const t = getDict(lang);
  const a = t.attorney;
  return (
    <div>
      <HtmlLang lang={lang} />
      <Nav lang={lang} />

      <section className="v-bio">
        <div className="v-bioinner">
          <aside className="v-bioaside">
            <div className="v-photoframe">
              <div className="v-photomark" aria-hidden="true">2</div>
              <div className="v-photonote">{a.portraitNote}</div>
            </div>
            <div className="v-creds">
              {a.creds.map((c) => <span className="v-cred" key={c}>{c}</span>)}
            </div>
            <div className="v-biocall">
              <a className="v-gold v-w100" style={{ textAlign: "center" }} href={PHONE_TEL}>
                {a.callCta} {PHONE}
              </a>
              <Link className="v-quiet v-w100 v-mt" style={{ textAlign: "center" }} href={lp(lang, "/apply")}>
                {t.common.qualify60}
              </Link>
            </div>
          </aside>

          <div className="v-biotext">
            <Eyebrow>{a.eyebrow}</Eyebrow>
            <h1 className="v-h1 v-h1sm" style={{ marginBottom: 26 }}>{a.head}</h1>
            <div className="v-article" style={{ borderTop: "none", paddingTop: 0 }}>
              {a.paragraphs.map((p, i) => <p className="v-artp" key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      <div className="v-truststrip">
        {t.home.trust.slice(1).map((x, i) => (
          <span key={i} style={{ display: "contents" }}>
            {i > 0 && <span className="v-trustdot" aria-hidden="true" />}
            <span>{x}</span>
          </span>
        ))}
      </div>

      <section className="v-finalcta" data-reveal>
        <h2 className="v-h2" style={{ marginBottom: 22 }}>
          {a.finalH2a}
          <br />
          <em className="v-goldem">{a.finalH2b}</em>
        </h2>
        <div className="v-herobtns">
          <Link className="v-gold" href={lp(lang, "/apply")}>{t.common.qualify60}</Link>
          <a className="v-quiet" href={PHONE_TEL}>{a.callCta} {PHONE}</a>
        </div>
      </section>

      <Skyline />
      <p className="v-legal v-mt" style={{ maxWidth: "70ch", margin: "0 auto", padding: "0 22px 44px" }}>{t.attorney.legal}</p>
      <Footer lang={lang} />
    </div>
  );
}
