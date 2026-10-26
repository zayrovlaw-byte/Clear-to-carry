import Link from "next/link";
import { Nav, Footer, Eyebrow } from "@/lib/ui";
import { getDict, lp } from "@/lib/i18n";
import HtmlLang from "@/lib/htmllang";

export default function WhyUs({ lang = "en" }) {
  const t = getDict(lang);
  const w = t.whyPage;
  return (
    <div>
      <HtmlLang lang={lang} />
      <Nav lang={lang} />
      <div className="v-page">
        <Eyebrow>{w.eyebrow}</Eyebrow>
        <h1 className="v-h1 v-h1sm">{w.h1}</h1>
        <p className="v-lede v-ledesm">{w.lede}</p>

        <h2 className="v-h2" style={{ marginTop: 54, marginBottom: 24 }}>{w.compareH2}</h2>
        <div className="v-comparegrid">
          <div className="v-comparecol v-dim">
            <div className="v-comparehead">{w.diyHead}</div>
            <ul className="v-list">
              {w.diy.map((li, i) => <li key={i}>{li}</li>)}
            </ul>
          </div>
          <div className="v-comparecol v-lit">
            <div className="v-comparehead v-goldtext">{w.usHead}</div>
            <ul className="v-list">
              {w.us.map((li, i) => <li key={i}>{li}</li>)}
            </ul>
          </div>
        </div>

        <h2 className="v-h2" style={{ marginTop: 64, marginBottom: 24 }}>{w.benefitsH2}</h2>
        <div className="v-protectgrid">
          {w.benefits.map((b, i) => (
            <div className="v-protectcard" key={i}>
              <div className="v-protecttitle">{b.t}</div>
              <p className="v-protecttext">{b.d}</p>
            </div>
          ))}
        </div>

        <div className="v-artcta" style={{ marginTop: 54 }}>
          <h2 className="v-h2" style={{ marginBottom: 16 }}>{w.closeH2}</h2>
          <p className="v-mutetext" style={{ maxWidth: "66ch", fontSize: 15 }}>{w.closeText}</p>
          <div className="v-artctatext" style={{ marginTop: 22 }}>{w.ctaText}</div>
          <div className="v-artctabtns">
            <Link className="v-gold" href={lp(lang, "/apply")}>{t.common.getStarted99}</Link>
            <Link className="v-quiet" href={lp(lang, "/apply?view=packages")}>{t.rightsPage.ctaSecondary}</Link>
          </div>
        </div>

        <p className="v-legal v-mt">{w.legal}</p>
      </div>
      <Footer lang={lang} />
    </div>
  );
}
