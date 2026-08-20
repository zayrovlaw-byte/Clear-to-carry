import Link from "next/link";
import { Nav, Footer, Eyebrow, Crest, Skyline } from "@/lib/ui";
import { PHONE_TEL } from "@/lib/content";

/* PLACEHOLDERS: replace testimonials and approvals with real, consented client
   material before launch. NY RPC 7.1. */
const TESTIMONIALS = [
  { quote: "[PLACEHOLDER: real client quote] I never touched a form. Every time I had a question, I called and the attorney answered.", who: "R.K.", where: "Queens · Concealed Carry" },
  { quote: "[PLACEHOLDER: real client quote] He told me on the first call exactly what I qualified for and what it would cost. No surprises after that.", who: "M.Z.", where: "Brooklyn · Business Carry" },
  { quote: "[PLACEHOLDER: real client quote] My record wasn't perfect. He didn't hide it, he explained it in the file, and I got approved.", who: "A.D.", where: "Queens · Premise" },
];

export default function Home() {
  return (
    <div>
      <Nav />
      <section className="v-hero">
        <div className="v-heroglow" aria-hidden="true" />
        <div className="v-heroinner">
          <Crest />
          <Eyebrow>Private licensing counsel · New York City</Eyebrow>
          <h1 className="v-h1">
            Your home. Your business.
            <br />
            <em>Lawfully defended.</em>
          </h1>
          <p className="v-lede">
            New York issues firearm licenses to those who apply correctly, completely,
            and with counsel who knows how the file is read. We handle the entire
            process. You sign where we tell you to sign.
          </p>
          <div className="v-herobtns">
            <Link className="v-gold" href="/apply">See if you qualify · 60 seconds</Link>
            <Link className="v-quiet" href="/apply?view=packages">View engagements</Link>
          </div>
          <div className="v-heronote">Discreet. Flat fee. The law gives them six months. We hold them to it.</div>
        </div>
        <Skyline />
      </section>

      <div className="v-truststrip">
        <span>Licensed New York attorney</span>
        <span className="v-trustdot" aria-hidden="true" />
        <span>Privileged and confidential</span>
        <span className="v-trustdot" aria-hidden="true" />
        <span>Flat fee, in writing</span>
      </div>

      <section className="v-band">
        <div className="v-bandin">
          <div className="v-stat"><div className="v-statnum">1</div><div className="v-statlabel">attorney handling your file, start to finish</div></div>
          <div className="v-stat"><div className="v-statnum">0</div><div className="v-statlabel">forms you fill out alone</div></div>
          <div className="v-stat"><div className="v-statnum">180</div><div className="v-statlabel">days the law gives the NYPD to decide a complete file</div></div>
        </div>
      </section>

      <section className="v-compare">
        <Eyebrow>Why counsel</Eyebrow>
        <h2 className="v-h2">Applications don&apos;t fail on the law.<br />They fail on the details.</h2>
        <p className="v-lede v-ledesm" style={{ margin: "0 0 34px", maxWidth: "62ch" }}>
          Since Bruen, New York cannot ask why you want to carry. So the scrutiny
          moved to the file itself. Applications come back or get denied over things
          that were entirely avoidable: an arrest the applicant thought was sealed, a
          gap in the address history, a reference who doesn&apos;t qualify, a deadline
          quietly missed. Our job is simple to state and hard to do: nothing
          overlooked, nothing inconsistent, everything submitted complete and on time.
        </p>
        <div className="v-comparegrid">
          <div className="v-comparecol v-dim">
            <div className="v-comparehead">Applying alone</div>
            <ul className="v-list">
              <li>You guess at what the License Division wants to see.</li>
              <li>One missing item and the package sits, or comes back months later. The clock restarts.</li>
              <li>Your history is discovered by an investigator instead of presented by counsel.</li>
              <li>A sealed arrest you forgot becomes a false statement you made.</li>
              <li>The interview is you, alone, unprepared.</li>
              <li>A denial is the end of the road.</li>
            </ul>
          </div>
          <div className="v-comparecol v-lit">
            <div className="v-comparehead v-goldtext">Represented by Zayrov Law</div>
            <ul className="v-list">
              <li>Your eligibility is assessed before a dollar is spent.</li>
              <li>Every document drafted, obtained, or reviewed by the attorney, and filed on time.</li>
              <li>Anything in your past is addressed on the face of the file, on our terms.</li>
              <li>Your disclosures match the records before the investigator ever pulls them.</li>
              <li>You walk into the interview prepared by counsel.</li>
              <li>A denial is answered in court under Article 78.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="v-protect">
        <Eyebrow>What this is really about</Eyebrow>
        <h2 className="v-h2">You&apos;re not applying for a license.<br />You&apos;re standing between them and harm.</h2>
        <div className="v-protectgrid">
          <div className="v-protectcard">
            <div className="v-protecttitle">Your family</div>
            <p className="v-protecttext">The people asleep down the hall. The law now recognizes your right to defend them in your own home, and beyond it. We make sure a paperwork error never stands between you and that right.</p>
          </div>
          <div className="v-protectcard">
            <div className="v-protecttitle">Your business</div>
            <p className="v-protecttext">You built it. You open it, you close it, you carry the deposit. Owners with cash, inventory, and late hours are exactly who this license exists for.</p>
          </div>
          <div className="v-protectcard">
            <div className="v-protecttitle">Your livelihood</div>
            <p className="v-protecttext">A botched application follows you. A false statement finding can cost far more than a license. Doing this correctly, once, with counsel, protects everything attached to your name.</p>
          </div>
        </div>
      </section>

      <section className="v-attorney">
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
            <h2 className="v-h2" style={{ marginBottom: 16 }}>One attorney. Your file. Personally.</h2>
            <p className="v-body2">
              Clear to Carry is a practice of Zayrov Law, P.C. Your matter is not
              handed to a call center or a case manager. The attorney who assesses
              your eligibility is the one who drafts your file, prepares you for the
              interview, and answers when you call.
            </p>
            <p className="v-body2">Admitted in New York and New Jersey. Fluent in Russian and Hebrew.</p>
            <Link className="v-gold" href="/apply">Start with the 60-second screening</Link>
          </div>
        </div>
      </section>

      <section className="v-process">
        <Eyebrow>The engagement</Eyebrow>
        <h2 className="v-h2">Quiet, in four movements.</h2>
        <div className="v-movements">
          {[
            ["I", "Consultation", "A private conversation. We tell you honestly whether you qualify and which license fits your life."],
            ["II", "Assembly", "We build your file in your private portal. You are asked only for what only you can provide."],
            ["III", "Filing", "Submitted complete, the first time. We answer the investigator so you don't have to."],
            ["IV", "License", "Interview preparation, final steps, and the license in your hand."],
          ].map(([n, t, d]) => (
            <div className="v-movement" key={n}>
              <div className="v-roman">{n}</div>
              <div>
                <div className="v-movetitle">{t}</div>
                <div className="v-movetext">{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="v-center">
          <Link className="v-gold" href="/apply?view=packages">Choose your engagement</Link>
        </div>
      </section>

      <section className="v-social">
        <Eyebrow>In their words</Eyebrow>
        <h2 className="v-h2">Clients who are carrying today.</h2>
        <div className="v-quotes">
          {TESTIMONIALS.map((t, i) => (
            <figure className="v-quote" key={i}>
              <div className="v-quotemark">&quot;</div>
              <blockquote className="v-quotetext">{t.quote}</blockquote>
              <figcaption className="v-quotewho">
                {t.who} <span className="v-quotewhere">· {t.where}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="v-stickycta">
        <span className="v-stickytext">Find out in 60 seconds</span>
        <Link className="v-gold v-sm" href="/apply">Do I qualify?</Link>
      </div>

      <Footer />
    </div>
  );
}
