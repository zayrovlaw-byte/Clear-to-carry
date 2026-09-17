/* Non-translatable structure. Ids, prices, icons and grades live here once;
   each locale file supplies only the text, keyed by the same ids. That way a
   price or a screening grade can never drift between languages. */

export const FEE_MIN = 2500;
export const FEE_MAX = 3500;

export const PACKAGE_META = [
  { id: "premise", icon: "home" },
  { id: "carry", icon: "pistol", featured: true },
  { id: "special", icon: "route" },
  { id: "longgun", icon: "longgun" },
  { id: "bizcarry", icon: "store" },
  { id: "guard", icon: "badge" },
];

export const TIER_META = [
  { id: "tier-quick", price: 99, checkout: true, quick: true },
  { id: "tier-consult", price: 350, checkout: true },
  { id: "tier-review", price: 1500, checkout: true },
  { id: "tier-full", featured: true, expands: true, priceIsRange: true },
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
