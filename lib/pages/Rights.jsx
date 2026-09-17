import Link from "next/link";
import { Nav, Footer, Eyebrow } from "@/lib/ui";
import { getDict, lp } from "@/lib/i18n";
import HtmlLang from "@/lib/htmllang";

export default function Rights({ lang = "en" }) {
  const t = getDict(lang);
  const b = t.bruen;
  return (
    <div>
      <HtmlLang lang={lang} />
      <Nav lang={lang} />
      <div className="v-page v-mid">
        <Eyebrow>{t.rightsPage.eyebrow}</Eyebrow>
        <h1 className="v-h1 v-h1sm">{b.title}</h1>
        <div className="v-artmeta">{b.date} · {b.read} · Zayrov Law, P.C.</div>
        <div className="v-article">
          {b.paragraphs.map((p, i) => <p className="v-artp" key={i}>{p}</p>)}
        </div>
        <div className="v-artcta">
          <div className="v-artctatext">{t.rightsPage.ctaText}</div>
          <div className="v-artctabtns">
            <Link className="v-gold" href={lp(lang, "/apply")}>{t.rightsPage.ctaPrimary}</Link>
            <Link className="v-quiet" href={lp(lang, "/apply?view=packages")}>{t.rightsPage.ctaSecondary}</Link>
          </div>
        </div>
        <p className="v-legal v-mt">{t.rightsPage.legal}</p>
      </div>
      <Footer lang={lang} />
    </div>
  );
}
