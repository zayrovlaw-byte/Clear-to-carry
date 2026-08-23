import fs from "fs";
import path from "path";
import Link from "next/link";
import { Nav, Footer, Eyebrow, Skyline, Liberty, Wordmark, LicenseIcon, LicenseCard } from "@/lib/ui";
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
          <div className="v-heronote">Built to finish &middot; filed complete the first time &middot; 180-day clock enforced</div>
        </div>
        {!heroPhoto && <Liberty className="v-liberty" />}
        {!heroPhoto && <Skyline />}
      </section>

      <section className="v-amend" data-reveal>
        <p className="v-amendquote">
          &ldquo;&hellip;the right of the people to keep and bear arms,
          <em> shall not be infringed.</em>&rdquo;
        </p>
        <div className="v-amendattr">Amendment II · United States Constitution</div>
        <div className="v-amendnote">It applies in New York. We make it official.</div>
      </section>

      <section className="v-expedite" data-reveal>
        <div className="v-expediteinner">
          <Eyebrow style={{ textAlign: "center" }}>Why applications die</Eyebrow>
          <h2 className="v-h2" style={{ textAlign: "center" }}>
            Alone, this takes years.
            <br />
            <em className="v-goldem">Most never finish.</em>
          </h2>
          <p className="v-lede v-ledesm" style={{ margin: "0 auto 46px", textAlign: "center" }}>
            Deficient files sit in the backlog. Returned packages restart the clock.
            Somewhere in year two, most people quit. There is no secret handshake
            inside the License Division &mdash; the expedite is a file with nothing
            to send back.
          </p>

          <div className="v-ruler" aria-hidden="true">
            <span>Month 0</span><span>6</span><span>12</span><span>18+</span>
          </div>

          <div className="v-track2r v-trackdiy">
            <div className="v-tracklabel">Applying alone</div>
            <div className="v-trackbar v-bardiy" aria-hidden="true" />
            <ol className="v-trackstops">
              <li>Forms begin</li>
              <li>Returned &middot; gaps found</li>
              <li>Clock restarts</li>
              <li className="v-stopdead">Abandoned</li>
            </ol>
          </div>

          <div className="v-track2r v-trackus">
            <div className="v-tracklabel v-goldtext">Represented by Zayrov Law</div>
            <div className="v-trackbar v-barflame" aria-hidden="true" />
            <ol className="v-trackstops">
              <li>Filed complete, first time</li>
              <li>Investigator answered by counsel</li>
              <li>180-day clock enforced</li>
            </ol>
            <div className="v-trackcardslot">
              <LicenseCard className="v-trackcard" />
              <div className="v-tracksaved">the year you never spend</div>
            </div>
          </div>

          <p className="v-expeditefoot">
            We cannot make the NYPD faster than the law requires. We make sure the
            clock starts, keeps running, and never resets.
          </p>
        </div>
      </section>

      <section className="v-licenses" data-reveal>
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

      <section className="v-steps" data-reveal>
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

      <section className="v-finalcta" data-reveal>
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
