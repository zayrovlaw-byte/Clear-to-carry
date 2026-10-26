import { LOCALES, DEFAULT_LOCALE, lp } from "@/lib/i18n";
import { SITE } from "@/lib/meta";
import { BLOG_META } from "@/lib/schema";

const PATHS = [
  "/", "/apply", "/your-rights", "/blog", "/reviews", "/attorney", "/faq", "/privacy",
  ...BLOG_META.map((p) => "/blog/" + p.slug),
];

export default function sitemap() {
  const now = new Date();
  const out = [];
  for (const path of PATHS) {
    const languages = {};
    for (const code of LOCALES) languages[code] = SITE + lp(code, path);
    for (const code of LOCALES) {
      out.push({
        url: SITE + lp(code, path),
        lastModified: now,
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : path === "/apply" ? 0.9 : 0.6,
        alternates: { languages: { ...languages, "x-default": SITE + lp(DEFAULT_LOCALE, path) } },
      });
    }
  }
  return out;
}
