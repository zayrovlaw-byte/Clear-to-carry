import Link from "next/link";
import { Nav, Footer, Eyebrow, Crest, Skyline, HomeIcon, StoreIcon, StarShieldIcon } from "@/lib/ui";
import { PHONE, PHONE_TEL } from "@/lib/content";

export const metadata = {
  title: "The Attorney | Clear to Carry",
  description:
    "One attorney, your file personally. Meet the counsel behind Clear to Carry, the NYC firearm licensing practice of Zayrov Law, P.C.",
};

export default function AttorneyPage() {
  return (
    <div>
      <Nav />

      <section className="v-attorney" style={{ borderTop: "none" }}>
        <div className="v-attorneyinner">
          <div className="v-attorneyphoto">
            <div className="v-photoframe">
              <Crest />
              <div className="v-photonote">
                Professional portrait of the attorney goes here at launch. Dark suit,
                office or courthouse steps. People retain a face, not a logo.
              </div>
            </div>
          </div>
          <div className="v-attorneytext">
            <Eyebrow>Your counsel</Eyebrow>
            <h1 className="v-h1 v-h1sm" style={{ marginBottom: 18 }}>
              One attorney. Your file. <em>Personally.</em>
            </h1>
            <p className="v-body2">
              Clear to Carry is a practice of Zayrov Law, P.C. Your matter is never
              handed to a call center or a case manager. The attorney who assesses
              your eligibility drafts your file, prepares you for the interview, and
              answers when you call.
            </p>
            <div className="v-creds">
              <span className="v-cred">Admitted · New York</span>
              <span className="v-cred">Admitted · New Jersey</span>
              <span className="v-cred">Русский</span>
              <span className="v-cred">עברית</span>
            </div>
            <Link className="v-gold" href="/apply">Start with the 60-second screening</Link>
          </div>
        </div>
      </section>

      <section className="v-licenses" style={{ paddingBottom: 40 }}>
        <Eyebrow style={{ textAlign: "center" }}>What we protect</Eyebrow>
        <div className="v-licensegrid">
          <div className="v-license" style={{ cursor: "default" }}>
            <HomeIcon />
            <div className="v-licensename">Your home</div>
            <div className="v-licenseline">The people asleep down the hall.</div>
          </div>
          <div className="v-license" style={{ cursor: "default" }}>
            <StoreIcon />
            <div className="v-licensename">Your business</div>
            <div className="v-licenseline">The doors you open and close yourself.</div>
          </div>
          <div className="v-license" style={{ cursor: "default" }}>
            <StarShieldIcon />
            <div className="v-licensename">Your name</div>
            <div className="v-licenseline">A file done right the first time.</div>
          </div>
        </div>
      </section>

      <section className="v-finalcta" style={{ paddingTop: 32, paddingBottom: 0 }}>
        <h2 className="v-h2" style={{ marginBottom: 20 }}>
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
