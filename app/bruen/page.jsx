import Link from "next/link";
import { Nav, Footer, Eyebrow } from "@/lib/ui";
import { BRUEN } from "@/lib/content";

export const metadata = {
  title: "The Bruen Decision and NYC Carry Licenses | Clear to Carry",
  description:
    "How NYSRPA v. Bruen ended 'proper cause,' what the Concealed Carry Improvement Act changed, and why non-residents can now apply for a NYC carry license.",
};

export default function BruenPage() {
  return (
    <div>
      <Nav />
      <div className="v-page v-mid">
        <Eyebrow>Insights</Eyebrow>
        <h1 className="v-h1 v-h1sm">{BRUEN.title}</h1>
        <div className="v-artmeta">{BRUEN.date} · {BRUEN.read} · Zayrov Law, P.C.</div>
        <div className="v-article">
          {BRUEN.paragraphs.map((p, i) => (
            <p className="v-artp" key={i}>{p}</p>
          ))}
        </div>
        <div className="v-artcta">
          <div className="v-artctatext">
            The right is settled. The file still has to be perfect. Find out where
            you stand in one free phone call.
          </div>
          <div className="v-artctabtns">
            <Link className="v-gold" href="/apply">See if you qualify</Link>
            <Link className="v-quiet" href="/apply?view=packages">View engagements</Link>
          </div>
        </div>
        <p className="v-legal v-mt">
          This article is general commentary on published law, not legal advice.
          Attorney Advertising.
        </p>
      </div>
      <Footer />
    </div>
  );
}
