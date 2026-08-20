import fs from "fs";
import path from "path";
import Link from "next/link";
import { Nav, Footer, Skyline, Liberty, Wordmark, LicenseIcon } from "@/lib/ui";
import { PACKAGES } from "@/lib/content";

/* A real photograph, when one has been supplied, replaces the drawn skyline
   and Liberty rather than stacking on top of them. Drop a file at
   public/hero-nyc.jpg and the hero switches over; remove it and the
   illustration comes back. See README "Hero photograph". */
const heroPhoto = fs.existsSync(path.join(process.cwd(), "public", "hero-nyc.jpg"));

export default function Home() {
  return (
    <div>
      <Nav />

      <section className={"v-hero" + (heroPhoto ? " v-heroshot" : "")}>
        {heroPhoto && <div className="v-herophoto" aria-hidden="true" />}
        <div className="v-heroscrim" aria-hidden="true" />
        <div className="v-heroinner">
          <Wordmark size={1} />
          <h1 className="v-h1">
            Protect your home.
            <br />
            <em>Protect your business.</em>
          </h1>
          <p className="v-lede v-ledehero">
            New York City pistol licensing. Handled by an attorney, start to finish. Flat fee.
          </p>
          <div className="v-herobtns">
            <Link className="v-gold" href="/apply">Do I qualify? · 60 seconds</Link>
            <Link className="v-quiet" href="/apply?view=packages">Engagements</Link>
          </div>
        </div>
        {!heroPhoto && <Liberty className="v-liberty" />}
        {!heroPhoto && <Skyline />}
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
        <div className="v-licenseshead">
          <div className="v-eyebrow">Six licences, one standard</div>
          <h2 className="v-h2" style={{ marginBottom: 0 }}>What are you licensing?</h2>
        </div>
        <div className="v-licensegrid">
          {PACKAGES.map((p) => (
            <Link href="/apply?view=packages" className={"v-license" + (p.featured ? " v-licensefeat" : "")} key={p.id}>
              <LicenseIcon name={p.icon} />
              <div className="v-licensename">{p.name}</div>
              <div className="v-licenseline">{p.line}</div>
            </Link>
          ))}
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
