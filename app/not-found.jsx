import Link from "next/link";
import { Nav, Footer, Eyebrow } from "@/lib/ui";
import { getDict } from "@/lib/i18n";

/* Next renders one not-found for the whole app, so it stays in the default
   locale; the nav's language switcher is still there to get people across. */
export default function NotFound() {
  const t = getDict("en");
  return (
    <div>
      <Nav lang="en" />
      <div className="v-page v-narrow" style={{ textAlign: "center", paddingTop: 90 }}>
        <Eyebrow style={{ textAlign: "center" }}>{t.notFound.eyebrow}</Eyebrow>
        <h1 className="v-h1 v-h1sm" style={{ textAlign: "center" }}>{t.notFound.h1}</h1>
        <p className="v-lede v-ledesm" style={{ margin: "0 auto 34px" }}>{t.notFound.body}</p>
        <div className="v-herobtns">
          <Link className="v-gold" href="/">{t.notFound.cta}</Link>
          <Link className="v-quiet" href="/apply">{t.common.qualify60}</Link>
        </div>
      </div>
      <Footer lang="en" />
    </div>
  );
}
