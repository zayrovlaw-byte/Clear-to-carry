import {
  PACKAGE_META, TIER_META, QUALIFY_META, PHASE_META, THIRD_PARTY_IDS, BLOG_META,
} from "@/lib/schema";
import en from "@/lib/locales/en";
import es from "@/lib/locales/es";
import ru from "@/lib/locales/ru";

const DICTS = { en, es, ru };

/* English lives at the root; the others sit under a prefix. */
export const DEFAULT_LOCALE = "en";
export const LOCALES = ["en", "es", "ru"];
export const ALT_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

export const LOCALE_LABELS = {
  en: { short: "EN", name: "English" },
  es: { short: "ES", name: "Español" },
  ru: { short: "RU", name: "Русский" },
};

export function isLocale(v) {
  return LOCALES.includes(v);
}

/* Prefix a site path for a locale: ("es", "/faq") -> "/es/faq". */
export function lp(lang, path = "/") {
  const clean = path === "/" ? "" : path;
  return lang === DEFAULT_LOCALE ? path : `/${lang}${clean}`;
}

/* Merges the locale's text onto the shared structure. Everything a page needs
   comes back on one object, so a component only ever takes `lang`. */
export function getDict(lang) {
  const t = DICTS[isLocale(lang) ? lang : DEFAULT_LOCALE];

  return {
    ...t,
    lang: isLocale(lang) ? lang : DEFAULT_LOCALE,
    packages: PACKAGE_META.map((m) => ({ ...m, ...t.packages[m.id] })),
    tiers: TIER_META.map((m) => ({ ...m, ...t.tiers[m.id] })),
    qualify: QUALIFY_META.map((m) => ({
      id: m.id,
      q: t.qualify[m.id].q,
      opts: t.qualify[m.id].opts.map((o, i) => ({ ...o, grade: m.grades[i] })),
    })),
    blog: BLOG_META.map((m) => ({ ...m, ...t.blog[m.slug] })),
    phases: PHASE_META.map((m) => ({
      id: m.id,
      ...t.phases[m.id],
      items: m.items.map((id) => ({ id, label: t.phases[m.id].items[id] })),
    })),
    thirdParty: THIRD_PARTY_IDS.map((id) => ({ id, ...t.thirdParty[id] })),
  };
}
