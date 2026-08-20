"use client";
import { useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/lib/ui";
import { FAQS } from "@/lib/content";

export default function FaqList() {
  const [open, setOpen] = useState(0);
  return (
    <div className="v-page v-mid">
      <Eyebrow>Questions, answered plainly</Eyebrow>
      <h1 className="v-h1 v-h1sm">The things people ask us quietly.</h1>
      <div className="v-faqlist">
        {FAQS.map((f, i) => (
          <div className="v-faqitem" key={i}>
            <button className="v-faqq" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{f.q}</span>
              <span className="v-faqmark">{open === i ? "\u00B7" : "+"}</span>
            </button>
            {open === i && <div className="v-faqa">{f.a}</div>}
          </div>
        ))}
      </div>
      <div className="v-center" style={{ marginTop: 40 }}>
        <p className="v-mutetext">Your question isn&apos;t here, or your situation is specific.</p>
        <Link className="v-gold" href="/apply">Ask the attorney directly</Link>
      </div>
      <p className="v-legal v-mt">General information, not legal advice for your situation. Attorney Advertising.</p>
    </div>
  );
}
