import { Nav, Footer, Eyebrow } from "@/lib/ui";
import { getDict } from "@/lib/i18n";
import HtmlLang from "@/lib/htmllang";

export default function Privacy({ lang = "en" }) {
  const t = getDict(lang);
  return (
    <div>
      <HtmlLang lang={lang} />
      <Nav lang={lang} />
      <div className="v-page v-mid">
        <Eyebrow>{t.privacyPage.eyebrow}</Eyebrow>
        <h1 className="v-h1 v-h1sm">{t.privacyPage.h1}</h1>
        <div className="v-article">
          {t.privacyPage.paragraphs.map((p, i) => <p className="v-artp" key={i}>{p}</p>)}
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}
