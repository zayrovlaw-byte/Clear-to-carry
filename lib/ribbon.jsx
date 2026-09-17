"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PROMO } from "@/lib/content";
import { getDict, lp } from "@/lib/i18n";

/* Seasonal ribbon under the nav. Client-side because the pages are
   prerendered: the expiry check has to run on the visitor's clock, and a
   dismissal is remembered per browser. Renders nothing after PROMO.until. */
export default function Ribbon({ lang = "en" }) {
  const t = getDict(lang);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (Date.now() > new Date(PROMO.until).getTime()) return;
    try {
      if (localStorage.getItem("ctc:ribbon:" + PROMO.until) === "closed") return;
    } catch {}
    setShow(true);
  }, []);

  if (!show) return null;

  function dismiss() {
    setShow(false);
    try { localStorage.setItem("ctc:ribbon:" + PROMO.until, "closed"); } catch {}
  }

  return (
    <div className="v-ribbon">
      <Link href={lp(lang, PROMO.href)} className="v-ribbonlink">
        <span className="v-ribbontag">{t.promo.eyebrow}</span>
        <span className="v-ribbonmsg">{t.promo.message}</span>
        <span className="v-ribboncta">{t.promo.cta} →</span>
        <span className="v-ribbonfine">{t.promo.fine}</span>
      </Link>
      <button className="v-ribbonx" onClick={dismiss} aria-label={t.promo.dismiss}>×</button>
    </div>
  );
}
