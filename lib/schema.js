/* Non-translatable structure. Ids, prices, icons and grades live here once;
   each locale file supplies only the text, keyed by the same ids. That way a
   price or a screening grade can never drift between languages. */

export const PACKAGE_META = [
  { id: "premise", icon: "home" },
  { id: "carry", icon: "pistol", featured: true },
  { id: "special", icon: "route" },
  { id: "longgun", icon: "longgun" },
  { id: "bizcarry", icon: "store" },
  { id: "guard", icon: "badge" },
];

/* Levels of support, not a price list. The consultation is free and is the
   only thing a visitor books from the site; everything else is quoted in that
   conversation, so no figure appears here or in the locale files. */
export const TIER_META = [
  { id: "tier-consult", lead: true },
  { id: "tier-review" },
  { id: "tier-full", featured: true, expands: true },
  { id: "tier-concierge", concierge: true },
];

/* grade: g = clear, y = needs handling, r = stop and talk to counsel */
export const QUALIFY_META = [
  { id: "age", grades: ["g", "r"] },
  { id: "nexus", grades: ["g", "g", "y"] },
  { id: "felony", grades: ["g", "r", "y"] },
  { id: "arrests", grades: ["g", "y", "y"] },
  { id: "op", grades: ["g", "y", "r"] },
  { id: "mh", grades: ["g", "y", "r"] },
  { id: "driving", grades: ["g", "y", "y"] },
];

export const PHASE_META = [
  { id: 1, items: ["p1a", "p1b", "p1c"] },
  { id: 2, items: ["p2a", "p2b"] },
  { id: 3, items: ["p3a", "p3b", "p3c"] },
  { id: 4, items: ["p4a", "p4b", "p4c"] },
];

export const THIRD_PARTY_IDS = ["app-fee", "course", "prints"];

/* Updates. Structure only: slug, publication date and reading order live here
   so a post cannot appear under one language and not another, and so the date
   on a post is the same date in every locale. Text is in lib/locales/*. */
export const BLOG_META = [
  { slug: "what-the-2022-law-changed", date: "2026-10-14", tag: "The law" },
  { slug: "an-old-arrest-is-not-a-no", date: "2026-09-29", tag: "Eligibility" },
  { slug: "the-180-day-clock", date: "2026-09-08", tag: "Timelines" },
  { slug: "which-licence-fits", date: "2026-08-19", tag: "Licence types" },
];
