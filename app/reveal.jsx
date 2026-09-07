"use client";
import { useEffect } from "react";

/* Sections rise into place as they enter the viewport.
   Deliberately a progressive enhancement: the hiding rule is scoped to
   .js-reveal, which only this component adds, so if JavaScript never runs
   the page renders fully visible instead of blank. Honours
   prefers-reduced-motion by not engaging at all. */
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    root.classList.add("js-reveal");
    const targets = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.06 }
    );
    targets.forEach((t) => io.observe(t));
    return () => {
      io.disconnect();
      root.classList.remove("js-reveal");
    };
  }, []);

  return null;
}
