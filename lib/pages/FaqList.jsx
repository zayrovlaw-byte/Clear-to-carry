"use client";
import { useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/lib/ui";

/* Dictionary arrives as a prop: this is a client component, and the parent
   server page already resolved the locale. */
export default function FaqList({ t, applyHref }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="v-page v-mid">
      <Eyebrow>{t.faqPage.eyebrow}</Eyebrow>
      <h1 className="v-h1 v-h1sm">{t.faqPage.h1}</h1>
      <div className="v-faqlist">
        {t.faqs.map((f, i) => (
          <div className="v-faqitem" key={i}>
            <button className="v-faqq" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{f.q}</span>
              <span className="v-faqmark">{open === i ? "·" : "+"}</span>
            </button>
            {open === i && <div className="v-faqa">{f.a}</div>}
          </div>
        ))}
      </div>
      <div className="v-center" style={{ marginTop: 40 }}>
        <p className="v-mutetext">{t.faqPage.closePre}</p>
        <Link className="v-gold" href={applyHref}>{t.faqPage.closeCta}</Link>
      </div>
      <p className="v-legal v-mt">{t.faqPage.legal}</p>
    </div>
  );
}
