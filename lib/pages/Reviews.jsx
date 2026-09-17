import Link from "next/link";
import { Nav, Footer, Eyebrow } from "@/lib/ui";
import { getDict, lp } from "@/lib/i18n";
import HtmlLang from "@/lib/htmllang";

export default function Reviews({ lang = "en" }) {
  const t = getDict(lang);
  return (
    <div>
      <HtmlLang lang={lang} />
      <Nav lang={lang} />

      <div className="v-page" style={{ paddingBottom: 0 }}>
        <Eyebrow>{t.reviewsPage.eyebrow}</Eyebrow>
        <h1 className="v-h1 v-h1sm">{t.reviewsPage.h1}</h1>
      </div>

      <section className="v-results" data-reveal>
        <div className="v-resultsgrid">
          {t.results.stats.map((s, i) => (
            <div className="v-result" key={i}>
              <div className="v-resultfig">{s.figure}</div>
              <div className="v-resultlabel">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="v-resultsdisc">{t.resultsDisclaimer}</p>
      </section>

      <section className="v-proof" style={{ paddingTop: 0 }}>
        <div className="v-approvals">
          {t.approvals.map((a, i) => (
            <div className="v-approval" key={i}>
              <div className="v-approvalframe">
                <div className="v-approvalseal">{t.common.approved}</div>
                <div className="v-approvallines">
                  <span /><span className="v-short" /><span /><span className="v-short" />
                </div>
                <div className="v-approvalredact">{t.common.specimen}</div>
              </div>
              <div className="v-approvallabel">{a.label}</div>
              <div className="v-approvalsub">{a.sub}</div>
            </div>
          ))}
        </div>
        <div className="v-swapnote">{t.reviewsPage.swapNote}</div>
      </section>

      <section className="v-social" style={{ paddingTop: 0 }}>
        <div className="v-quotes">
          {t.reviews.map((r, i) => (
            <figure className="v-quote" key={i}>
              <div className="v-quotemark">&quot;</div>
              <blockquote className="v-quotetext">{r.quote}</blockquote>
              <figcaption className="v-quotewho">
                {r.who} <span className="v-quotewhere">· {r.where} · {r.license}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="v-center">
          <Link className="v-gold" href={lp(lang, "/apply")}>{t.common.qualify60}</Link>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
