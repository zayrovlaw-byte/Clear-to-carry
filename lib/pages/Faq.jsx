import { Nav, Footer } from "@/lib/ui";
import { getDict, lp } from "@/lib/i18n";
import HtmlLang from "@/lib/htmllang";
import FaqList from "./FaqList";

export default function Faq({ lang = "en" }) {
  const t = getDict(lang);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <div>
      <HtmlLang lang={lang} />
      <Nav lang={lang} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaqList t={t} applyHref={lp(lang, "/apply")} />
      <Footer lang={lang} />
    </div>
  );
}
