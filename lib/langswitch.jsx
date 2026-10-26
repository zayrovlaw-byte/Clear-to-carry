"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LOCALES, DEFAULT_LOCALE, LOCALE_LABELS, isLocale } from "@/lib/i18n";

/* Swaps the locale prefix on the path the visitor is already reading, so
   switching language keeps them on the same page rather than dumping them
   at the home page. */
export default function LangSwitch({ lang = "en", label = "Language" }) {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);
  const bare = isLocale(parts[0]) ? "/" + parts.slice(1).join("/") : pathname;
  const clean = bare === "/" || bare === "" ? "" : bare.replace(/\/$/, "");

  return (
    <div className="v-langs" role="group" aria-label={label}>
      {LOCALES.map((code) => {
        const href = code === DEFAULT_LOCALE ? clean || "/" : `/${code}${clean}`;
        const on = code === lang;
        return (
          <Link
            key={code}
            href={href}
            className={"v-lang" + (on ? " v-langon" : "")}
            hrefLang={code}
            aria-current={on ? "true" : undefined}
            title={LOCALE_LABELS[code].name}
          >
            {LOCALE_LABELS[code].short}
          </Link>
        );
      })}
    </div>
  );
}
