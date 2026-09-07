import Link from "next/link";
import { PHONE, PHONE_TEL } from "@/lib/content";
import Ribbon from "@/lib/ribbon";

/* ---- Brand: CLEAR TO CARRY over a ghosted 2, underlined.
   This lockup is the only mark. There is no separate crest. ---- */
export function Wordmark({ size = 1, tagline = true, ghost = true }) {
  const s = size;
  return (
    <div className="b-lock" style={{ padding: ghost ? `${30 * s}px ${16 * s}px` : 0 }}>
      {ghost && (
        <div className="b-ghost" aria-hidden="true" style={{ fontSize: 118 * s }}>2</div>
      )}
      <div className="b-front">
        <div className="b-words" style={{ fontSize: 29 * s }}>
          CLEAR <span className="b-to">TO</span> CARRY
        </div>
        <div className="b-rule" style={{ margin: `${8 * s}px auto ${tagline ? 7 * s : 0}px` }} />
        {tagline && (
          <div className="b-tag" style={{ fontSize: Math.max(9.5 * s, 8.5) }}>
            PISTOL LICENSING SERVICE
          </div>
        )}
      </div>
    </div>
  );
}

/* Statue of Liberty, flat geometric silhouette matching the skyline language.
   The torch flame is the only warm accent. */
export function Liberty({ className }) {
  return (
    <svg viewBox="0 0 200 420" className={className} aria-hidden="true">
      <g fill="#241811">
        <rect x="55" y="368" width="90" height="18" />
        <rect x="66" y="330" width="68" height="38" />
        <rect x="60" y="322" width="80" height="8" />
        <path d="M78 330 L82 220 L74 190 L88 160 L96 150 L112 150 L120 164 L128 196 L122 240 L124 330 Z" />
        <ellipse cx="103" cy="136" rx="13" ry="15" />
        <path d="M92 126 L84 108 L94 122 Z" />
        <path d="M97 121 L93 100 L102 120 Z" />
        <path d="M104 119 L104 96 L110 119 Z" />
        <path d="M110 121 L116 102 L114 122 Z" />
        <path d="M114 126 L124 112 L118 128 Z" />
        <path d="M120 200 L142 214 L146 240 L134 242 L124 220 Z" />
        <rect x="132" y="204" width="18" height="30" transform="rotate(14 141 219)" />
        <path d="M92 160 L74 96 L64 60 L74 56 L86 92 L100 152 Z" />
        <rect x="60" y="42" width="16" height="14" />
      </g>
      <path d="M68 40 C62 30 66 20 68 12 C70 20 76 24 74 32 C73 36 71 38 68 40 Z"
        fill="#E3A64F" opacity="0.8" />
    </svg>
  );
}

export function Eyebrow({ children, style }) {
  return <div className="v-eyebrow" style={style}>{children}</div>;
}

export function Skyline() {
  return (
    <svg className="v-skyline" viewBox="0 0 1200 180" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g fill="#1C1410">
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
      <g fill="rgba(227,166,79,0.35)">
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
      <path d="M8 30 L32 10 L56 30" fill="none" stroke="#E3A64F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 27 V54 H50 V27" fill="none" stroke="#E3A64F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M26 54 V38 H38 V54" fill="none" stroke="#A5732F" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

export function StoreIcon() {
  return (
    <svg className="v-cardicon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M10 22 L14 10 H50 L54 22" fill="none" stroke="#E3A64F" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M10 22 H54 V30 C54 33 51 36 47 36 C43 36 40 33 40 30 C40 33 37 36 32 36 C27 36 24 33 24 30 C24 33 21 36 17 36 C13 36 10 33 10 30 Z" fill="rgba(227,166,79,0.08)" stroke="#E3A64F" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M14 36 V54 H50 V36" fill="none" stroke="#E3A64F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 54 V42 H46 V54" fill="none" stroke="#A5732F" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

export function StarShieldIcon() {
  return (
    <svg className="v-cardicon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 4 L56 13 V32 C56 47 46 57 32 62 C18 57 8 47 8 32 V13 Z" fill="rgba(227,166,79,0.08)" stroke="#E3A64F" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M32 18 L36 28 H47 L38 34 L41 45 L32 38 L23 45 L26 34 L17 28 H28 Z" fill="#E3A64F" />
    </svg>
  );
}

export function RouteIcon() {
  return (
    <svg className="v-cardicon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M18 8 C24 8 28 12 28 18 C28 25 18 34 18 34 C18 34 8 25 8 18 C8 12 12 8 18 8 Z" fill="none" stroke="#E3A64F" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="18" cy="18" r="4" fill="#E3A64F" />
      <path d="M46 30 C52 30 56 34 56 40 C56 47 46 56 46 56 C46 56 36 47 36 40 C36 34 40 30 46 30 Z" fill="rgba(227,166,79,0.08)" stroke="#E3A64F" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="46" cy="40" r="4" fill="#E3A64F" />
      <path d="M24 34 C30 40 32 30 40 36" fill="none" stroke="#A5732F" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 4" />
    </svg>
  );
}

export function LongGunIcon() {
  return (
    <svg className="v-cardicon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M6 26 H54 V33 H24 L20 40 H14 L16 33 H6 Z" fill="rgba(227,166,79,0.08)" stroke="#E3A64F" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M24 33 L30 47 H37 L33 33" fill="none" stroke="#E3A64F" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M54 26 V22 H60 V30 H54" fill="none" stroke="#A5732F" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M36 26 V20 H44 V26" fill="none" stroke="#A5732F" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

export function BadgeIcon() {
  return (
    <svg className="v-cardicon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 5 L52 12 V31 C52 45 43 54 32 59 C21 54 12 45 12 31 V12 Z" fill="rgba(227,166,79,0.08)" stroke="#E3A64F" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="32" cy="27" r="7" fill="none" stroke="#E3A64F" strokeWidth="2.4" />
      <path d="M20 48 C22 40 26 37 32 37 C38 37 42 40 44 48" fill="none" stroke="#A5732F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Maps a licence's `icon` key in content.js to its mark. */
export function LicenseIcon({ name }) {
  const M = { home: HomeIcon, store: StoreIcon, shield: StarShieldIcon, pistol: PistolIcon,
    route: RouteIcon, longgun: LongGunIcon, badge: BadgeIcon };
  const C = M[name] || StarShieldIcon;
  return <C />;
}

export function PistolIcon() {
  return (
    <svg className="v-cardicon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M8 22 H56 V31 H8 Z" fill="rgba(227,166,79,0.08)" stroke="#E3A64F" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M50 22 V31 M12 22 V26" stroke="#A5732F" strokeWidth="2" />
      <path d="M52 22 V18 H55 V22" fill="none" stroke="#A5732F" strokeWidth="2" strokeLinejoin="round" />
      <path d="M44 31 L39 52 H51 L56 31" fill="rgba(227,166,79,0.08)" stroke="#E3A64F" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M28 31 C28 40 38 40 38 31" fill="none" stroke="#E3A64F" strokeWidth="2.2" />
    </svg>
  );
}

/* Stylised carry-licence card. Deliberately a specimen: redacted bars instead
   of fields, so it reads as a graphic, never as a reproducible document. */
export function LicenseCard({ className }) {
  return (
    <svg viewBox="0 0 300 192" className={className} aria-hidden="true">
      <rect x="3" y="3" width="294" height="186" rx="10" fill="#F0EDE4" stroke="#A5732F" strokeWidth="2.5" />
      <rect x="3" y="3" width="294" height="34" rx="10" fill="#221A13" />
      <rect x="3" y="24" width="294" height="13" fill="#221A13" />
      <text x="18" y="25" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="3" fill="#E3A64F">NEW YORK CITY</text>
      <text x="282" y="25" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="2" fill="#B7A48E">CARRY</text>
      <rect x="18" y="52" width="70" height="88" rx="4" fill="#DAD3C2" />
      <circle cx="53" cy="82" r="14" fill="#B7A48E" />
      <path d="M28 140 C32 116 44 110 53 110 C62 110 74 116 78 140 Z" fill="#B7A48E" />
      <g fill="#C9C4B4">
        <rect x="104" y="58" width="140" height="8" rx="2" />
        <rect x="104" y="76" width="96" height="8" rx="2" />
        <rect x="104" y="94" width="120" height="8" rx="2" />
        <rect x="104" y="112" width="76" height="8" rx="2" />
      </g>
      <path d="M262 96 L266 106 H277 L268 112 L271 123 L262 116 L253 123 L256 112 L247 106 H258 Z" fill="#E3A64F" />
      <rect x="18" y="156" width="264" height="20" rx="3" fill="#221A13" />
      <text x="150" y="170" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="4" fill="#77685A">SPECIMEN · DETAILS REDACTED</text>
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg className="v-cardicon" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="34" r="24" fill="rgba(227,166,79,0.08)" stroke="#E3A64F" strokeWidth="2.5" />
      <path d="M32 20 V34 L42 40" fill="none" stroke="#E3A64F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 8 L14 14 M42 8 L50 14" stroke="#A5732F" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function FileCheckIcon() {
  return (
    <svg className="v-cardicon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M16 6 H38 L50 18 V58 H16 Z" fill="rgba(227,166,79,0.08)" stroke="#E3A64F" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M38 6 V18 H50" fill="none" stroke="#A5732F" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M23 30 H43 M23 38 H37" stroke="#A5732F" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M25 48 L31 53 L42 42" fill="none" stroke="#E3A64F" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Nav() {
  return (
    <header className="v-nav">
      <div className="v-navin">
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className="b-navlock">
            <div className="b-words b-navwords">CLEAR <span className="b-to">TO</span> CARRY</div>
            <div className="b-rule b-navrule" />
          </div>
        </Link>
        <div className="v-navright" style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Link className="v-navlink" href="/your-rights">Your Rights</Link>
          <Link className="v-navlink" href="/reviews">Reviews</Link>
          <Link className="v-navlink" href="/attorney">Attorney</Link>
          <Link className="v-navlink" href="/faq">FAQ</Link>
          <Link className="v-navlink" href="/apply">Apply</Link>
          <a className="v-navlink v-navphone" href={PHONE_TEL}>{PHONE}</a>
        </div>
      </div>
      <Ribbon />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="v-foot">
      <Wordmark size={0.72} ghost={false} />
      <p className="v-foottext" style={{ marginTop: 14 }}>
        A pistol licensing service of Zayrov Law, P.C. · 3400 Lawson Blvd., Oceanside, NY 11572 · {PHONE}
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
