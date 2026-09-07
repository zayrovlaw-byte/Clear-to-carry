import Link from "next/link";
import { Nav, Footer, Eyebrow, Skyline } from "@/lib/ui";
import { ATTORNEY, PHONE, PHONE_TEL } from "@/lib/content";

export const metadata = {
  title: "The Attorney | Clear to Carry",
  description:
    "A general litigation background, turned to New York firearm licensing after Bruen. Meet the counsel behind Clear to Carry, a practice of Zayrov Law, P.C.",
};

export default function AttorneyPage() {
  return (
    <div>
      <Nav />

      <section className="v-bio">
        <div className="v-bioinner">
          <aside className="v-bioaside">
            <div className="v-photoframe">
              <div className="v-photomark" aria-hidden="true">2</div>
              <div className="v-photonote">
                Professional portrait of the attorney goes here at launch. Dark suit,
                office or courthouse steps. People retain a face, not a logo.
              </div>
            </div>
            <div className="v-creds">
              {ATTORNEY.creds.map((c) => (
                <span className="v-cred" key={c}>{c}</span>
              ))}
            </div>
            <div className="v-biocall">
              <a className="v-gold v-w100" style={{ textAlign: "center" }} href={PHONE_TEL}>
                Call {PHONE}
              </a>
              <Link className="v-quiet v-w100 v-mt" style={{ textAlign: "center" }} href="/apply">
                Do I qualify? · 60 seconds
              </Link>
            </div>
          </aside>

          <div className="v-biotext">
            <Eyebrow>{ATTORNEY.eyebrow}</Eyebrow>
            <h1 className="v-h1 v-h1sm" style={{ marginBottom: 26 }}>{ATTORNEY.head}</h1>
            <div className="v-article" style={{ borderTop: "none", paddingTop: 0 }}>
              {ATTORNEY.paragraphs.map((p, i) => (
                <p className="v-artp" key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="v-truststrip">
        <span>One attorney, your file personally</span>
        <span className="v-trustdot" aria-hidden="true" />
        <span>Privileged and confidential</span>
        <span className="v-trustdot" aria-hidden="true" />
        <span>Flat fee, in writing</span>
      </div>

      <section className="v-finalcta" data-reveal>
        <h2 className="v-h2" style={{ marginBottom: 22 }}>
          The first phone call is free.
          <br />
          <em className="v-goldem">The answer is honest.</em>
        </h2>
        <div className="v-herobtns">
          <Link className="v-gold" href="/apply">Do I qualify? · 60 seconds</Link>
          <a className="v-quiet" href={PHONE_TEL}>Call {PHONE}</a>
        </div>
      </section>

      <Skyline />
      <Footer />
    </div>
  );
}
