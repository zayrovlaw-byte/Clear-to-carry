import Link from "next/link";
import { PHONE } from "@/lib/content";

export function Eyebrow({ children, style }) {
  return <div className="v-eyebrow" style={style}>{children}</div>;
}

export function Crest() {
  return (
    <svg className="v-crest" viewBox="0 0 64 72" aria-hidden="true">
      <path d="M32 2 L58 12 V34 C58 52 46 64 32 70 C18 64 6 52 6 34 V12 Z" fill="none" stroke="#C9A96A" strokeWidth="2" />
      <path d="M32 10 L50 17 V34 C50 47 41 56 32 61 C23 56 14 47 14 34 V17 Z" fill="rgba(201,169,106,0.07)" stroke="#8C7443" strokeWidth="1" />
      <text x="32" y="42" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#C9A96A">Z</text>
    </svg>
  );
}

export function Skyline() {
  return (
    <svg className="v-skyline" viewBox="0 0 1200 180" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g fill="#13151C">
        <rect x="0" y="120" width="70" height="60" /><rect x="80" y="90" width="46" height="90" />
        <rect x="136" y="130" width="60" height="50" /><rect x="206" y="70" width="38" height="110" />
        <rect x="254" y="105" width="54" height="75" />
        <polygon points="330,180 330,60 352,60 352,40 360,40 360,60 382,60 382,180" />
        <rect x="392" y="115" width="64" height="65" /><rect x="466" y="85" width="42" height="95" />
        <polygon points="520,180 520,50 545,18 570,50 570,180" />
        <rect x="580" y="100" width="58" height="80" /><rect x="648" y="65" width="36" height="115" />
        <rect x="694" y="125" width="70" height="55" />
        <polygon points="774,180 774,55 790,55 790,30 796,10 802,30 802,55 818,55 818,180" />
        <rect x="828" y="95" width="52" height="85" /><rect x="890" y="120" width="64" height="60" />
        <rect x="964" y="80" width="40" height="100" /><rect x="1014" y="110" width="56" height="70" />
        <rect x="1080" y="90" width="44" height="90" /><rect x="1134" y="125" width="66" height="55" />
      </g>
      <g fill="rgba(201,169,106,0.35)">
        <rect x="94" y="100" width="3" height="3" /><rect x="104" y="112" width="3" height="3" />
        <rect x="216" y="84" width="3" height="3" /><rect x="222" y="98" width="3" height="3" />
        <rect x="340" y="74" width="3" height="3" /><rect x="348" y="90" width="3" height="3" />
        <rect x="478" y="98" width="3" height="3" />
        <rect x="536" y="66" width="3" height="3" /><rect x="548" y="82" width="3" height="3" />
        <rect x="658" y="80" width="3" height="3" /><rect x="666" y="96" width="3" height="3" />
        <rect x="784" y="70" width="3" height="3" /><rect x="840" y="108" width="3" height="3" />
        <rect x="972" y="94" width="3" height="3" /><rect x="980" y="110" width="3" height="3" />
        <rect x="1090" y="104" width="3" height="3" />
      </g>
    </svg>
  );
}

export function HomeIcon() {
  return (
    <svg className="v-cardicon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M8 30 L32 10 L56 30" fill="none" stroke="#C9A96A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 27 V54 H50 V27" fill="none" stroke="#C9A96A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M26 54 V38 H38 V54" fill="none" stroke="#8C7443" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

export function StoreIcon() {
  return (
    <svg className="v-cardicon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M10 22 L14 10 H50 L54 22" fill="none" stroke="#C9A96A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M10 22 H54 V30 C54 33 51 36 47 36 C43 36 40 33 40 30 C40 33 37 36 32 36 C27 36 24 33 24 30 C24 33 21 36 17 36 C13 36 10 33 10 30 Z" fill="rgba(201,169,106,0.08)" stroke="#C9A96A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M14 36 V54 H50 V36" fill="none" stroke="#C9A96A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 54 V42 H46 V54" fill="none" stroke="#8C7443" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

export function StarShieldIcon() {
  return (
    <svg className="v-cardicon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 4 L56 13 V32 C56 47 46 57 32 62 C18 57 8 47 8 32 V13 Z" fill="rgba(201,169,106,0.08)" stroke="#C9A96A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M32 18 L36 28 H47 L38 34 L41 45 L32 38 L23 45 L26 34 L17 28 H28 Z" fill="#C9A96A" />
    </svg>
  );
}

export function Nav() {
  return (
    <header className="v-nav">
      <div className="v-navin">
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className="v-wordmark">
            CLEAR <span className="v-wordto">TO</span> CARRY
          </div>
        </Link>
        <div className="v-navright" style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Link className="v-navlink" href="/your-rights">Your Rights</Link>
          <Link className="v-navlink" href="/reviews">Reviews</Link>
          <Link className="v-navlink" href="/attorney">Attorney</Link>
          <Link className="v-navlink" href="/faq">FAQ</Link>
          <Link className="v-navlink" href="/apply">Apply</Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="v-foot">
      <div className="v-wordmark v-wordsm">
        CLEAR <span className="v-wordto">TO</span> CARRY
      </div>
      <p className="v-foottext">
        A service of Zayrov Law, P.C. · 3400 Lawson Blvd., Oceanside, NY 11572 · {PHONE}
      </p>
      <p className="v-foottext" style={{ marginTop: 0 }}>
        <Link className="v-navlink" href="/privacy">Privacy</Link>
      </p>
      <p className="v-legal">
        Attorney Advertising. Prior results do not guarantee a similar outcome.
        Testimonials reflect the experience of actual clients and results specific to
        their matters; your result depends on your record. No attorney-client
        relationship is formed until a signed engagement letter and payment are
        received. Licensing decisions are made solely by the issuing authority; no
        outcome is promised. Timeline references reflect statutory requirements and
        typical processing, not a guarantee.
      </p>
    </footer>
  );
}
