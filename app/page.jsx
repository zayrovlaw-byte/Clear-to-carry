import Link from "next/link";
import { Nav, Footer, Skyline } from "@/lib/ui";

function HomeIcon() {
  return (
    <svg className="v-cardicon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M8 30 L32 10 L56 30" fill="none" stroke="#C9A96A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 27 V54 H50 V27" fill="none" stroke="#C9A96A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M26 54 V38 H38 V54" fill="none" stroke="#8C7443" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg className="v-cardicon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M10 22 L14 10 H50 L54 22" fill="none" stroke="#C9A96A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M10 22 H54 V30 C54 33 51 36 47 36 C43 36 40 33 40 30 C40 33 37 36 32 36 C27 36 24 33 24 30 C24 33 21 36 17 36 C13 36 10 33 10 30 Z" fill="rgba(201,169,106,0.08)" stroke="#C9A96A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M14 36 V54 H50 V36" fill="none" stroke="#C9A96A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 54 V42 H46 V54" fill="none" stroke="#8C7443" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

function StarShieldIcon() {
  return (
    <svg className="v-cardicon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 4 L56 13 V32 C56 47 46 57 32 62 C18 57 8 47 8 32 V13 Z" fill="rgba(201,169,106,0.08)" stroke="#C9A96A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M32 18 L36 28 H47 L38 34 L41 45 L32 38 L23 45 L26 34 L17 28 H28 Z" fill="#C9A96A" />
    </svg>
  );
}

export default function Home() {
  return (
    <div>
      <Nav />

      <section className="v-hero">
        <div className="v-heroglow" aria-hidden="true" />
        <div className="v-heroinner">
          <div className="v-hero2a" aria-hidden="true">2A</div>
          <h1 className="v-h1">
            Protect your home.
            <br />
            <em>Protect your business.</em>
          </h1>
          <p className="v-lede v-ledehero">
            NYC firearm licenses. Handled by an attorney, start to finish. Flat fee.
          </p>
          <div className="v-herobtns">
            <Link className="v-gold" href="/apply">Do I qualify? · 60 seconds</Link>
            <Link className="v-quiet" href="/apply?view=packages">Pricing</Link>
          </div>
        </div>
        <Skyline />
      </section>

      <section className="v-amend">
        <p className="v-amendquote">
          &ldquo;&hellip;the right of the people to keep and bear arms,
          <em> shall not be infringed.</em>&rdquo;
        </p>
        <div className="v-amendattr">Amendment II · United States Constitution</div>
        <div className="v-amendnote">It applies in New York. We make it official.</div>
      </section>

      <section className="v-licenses">
        <div className="v-licensegrid">
          <Link href="/apply?view=packages" className="v-license">
            <HomeIcon />
            <div className="v-licensename">Home</div>
            <div className="v-licenseline">A firearm where your family sleeps.</div>
            <div className="v-licenseprice">From $2,500</div>
          </Link>
          <Link href="/apply?view=packages" className="v-license">
            <StoreIcon />
            <div className="v-licensename">Business</div>
            <div className="v-licenseline">Protection where you earn your living.</div>
            <div className="v-licenseprice">From $3,500</div>
          </Link>
          <Link href="/apply?view=packages" className="v-license v-licensefeat">
            <StarShieldIcon />
            <div className="v-licensename">Carry</div>
            <div className="v-licenseline">Protection that goes where you go.</div>
            <div className="v-licenseprice">From $5,000</div>
          </Link>
        </div>
      </section>

      <section className="v-steps">
        <div className="v-stepsgrid">
          <div className="v-step">
            <div className="v-stepnum">1</div>
            <div className="v-steptitle">Qualify</div>
            <div className="v-steptext">60-second screening. Honest answer, free.</div>
          </div>
          <div className="v-step">
            <div className="v-stepnum">2</div>
            <div className="v-steptitle">We file</div>
            <div className="v-steptext">The attorney builds and files your entire application.</div>
          </div>
          <div className="v-step">
            <div className="v-stepnum">3</div>
            <div className="v-steptitle">You carry</div>
            <div className="v-steptext">Interview prep, license in hand.</div>
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

      <section className="v-finalcta">
        <h2 className="v-h2" style={{ marginBottom: 24 }}>
          Six months from a complete file.
          <br />
          <em className="v-goldem">Start yours today.</em>
        </h2>
        <Link className="v-gold" href="/apply">Do I qualify? · 60 seconds</Link>
      </section>

      <div className="v-stickycta">
        <span className="v-stickytext">Find out in 60 seconds</span>
        <Link className="v-gold v-sm" href="/apply">Do I qualify?</Link>
      </div>

      <Footer />
    </div>
  );
}
