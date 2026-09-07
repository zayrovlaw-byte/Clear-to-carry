import Link from "next/link";
import { Nav, Footer, Eyebrow } from "@/lib/ui";

export default function NotFound() {
  return (
    <div>
      <Nav />
      <div className="v-page v-narrow" style={{ textAlign: "center", paddingTop: 90 }}>
        <Eyebrow style={{ textAlign: "center" }}>Not found</Eyebrow>
        <h1 className="v-h1 v-h1sm" style={{ textAlign: "center" }}>
          This page isn&apos;t in the file.
        </h1>
        <p className="v-lede v-ledesm" style={{ margin: "0 auto 34px" }}>
          The address may have changed, or the link was mistyped. Everything on this
          site is one step from the start.
        </p>
        <div className="v-herobtns">
          <Link className="v-gold" href="/">Back to the start</Link>
          <Link className="v-quiet" href="/apply">Do I qualify? · 60 seconds</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
