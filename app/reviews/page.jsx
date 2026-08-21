import Link from "next/link";
import { Nav, Footer, Eyebrow } from "@/lib/ui";
import { REVIEWS, APPROVALS, RESULTS, RESULTS_DISCLAIMER } from "@/lib/content";

export const metadata = {
  title: "Reviews & Success Stories | Clear to Carry",
  description:
    "Clients who are carrying today. Reviews and approved-license stories from Clear to Carry, the NYC firearm licensing practice of Zayrov Law, P.C.",
};

export default function ReviewsPage() {
  return (
    <div>
      <Nav />

      <div className="v-page" style={{ paddingBottom: 0 }}>
        <Eyebrow>The record</Eyebrow>
        <h1 className="v-h1 v-h1sm">Clients who are carrying today.</h1>
      </div>

      <section className="v-results" data-reveal>
        <div className="v-resultsgrid">
          {RESULTS.stats.map((s, i) => (
            <div className="v-result" key={i}>
              <div className="v-resultfig">{s.figure}</div>
              <div className="v-resultlabel">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="v-resultsdisc">{RESULTS_DISCLAIMER}</p>
      </section>

      <section className="v-proof" style={{ paddingTop: 0 }}>
        <div className="v-approvals">
          {APPROVALS.map((a, i) => (
            <div className="v-approval" key={i}>
              <div className="v-approvalframe">
                <div className="v-approvalseal">Approved</div>
                <div className="v-approvallines">
                  <span /><span className="v-short" /><span /><span className="v-short" />
                </div>
                <div className="v-approvalredact">Specimen · details redacted</div>
              </div>
              <div className="v-approvallabel">{a.label}</div>
              <div className="v-approvalsub">{a.sub}</div>
            </div>
          ))}
        </div>
        <div className="v-swapnote">
          Placeholder specimens — swap in real redacted approval letters before launch
        </div>
      </section>

      <section className="v-social" style={{ paddingTop: 0 }}>
        <div className="v-quotes">
          {REVIEWS.map((t, i) => (
            <figure className="v-quote" key={i}>
              <div className="v-quotemark">&quot;</div>
              <blockquote className="v-quotetext">{t.quote}</blockquote>
              <figcaption className="v-quotewho">
                {t.who} <span className="v-quotewhere">· {t.where} · {t.license}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="v-center">
          <Link className="v-gold" href="/apply">Do I qualify? · 60 seconds</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
