import { LOCALES, DEFAULT_LOCALE, lp } from "@/lib/i18n";

export const SITE = "https://cleartocarry.nyc";

/* Canonical + hreflang for one page in one locale. Search engines need every
   translation of a page to point at all the others, including itself. */
export function altMeta(lang, path) {
  const languages = {};
  for (const code of LOCALES) languages[code] = SITE + lp(code, path);
  languages["x-default"] = SITE + lp(DEFAULT_LOCALE, path);
  return {
    alternates: { canonical: SITE + lp(lang, path), languages },
  };
}
