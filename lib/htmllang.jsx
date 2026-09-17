"use client";
import { useEffect } from "react";

/* The root layout sits above the locale segment, so <html lang> is stamped
   "en" at build time for every page. hreflang tags (see lib/meta.js) are what
   search engines read for language targeting; this corrects the attribute at
   runtime so screen readers announce the right language and browsers offer
   the right translation prompt. */
export default function HtmlLang({ lang }) {
  useEffect(() => {
    if (lang) document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
