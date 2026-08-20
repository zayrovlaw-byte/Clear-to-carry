import Link from "next/link";
import { Nav, Footer, Skyline, HomeIcon, StoreIcon, StarShieldIcon } from "@/lib/ui";

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
            <div className="v-licenseprice">Flat fee, in writing</div>
          </Link>
          <Link href="/apply?view=packages" className="v-license">
            <StoreIcon />
            <div className="v-licensename">Business</div>
            <div className="v-licenseline">Protection where you earn your living.</div>
            <div className="v-licenseprice">Flat fee, in writing</div>
          </Link>
          <Link href="/apply?view=packages" className="v-license v-licensefeat">
            <StarShieldIcon />
            <div className="v-licensename">Carry</div>
            <div className="v-licenseline">Protection that goes where you go.</div>
            <div className="v-licenseprice">Flat fee, in writing</div>
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
