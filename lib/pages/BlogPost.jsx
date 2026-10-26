import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav, Footer, Eyebrow } from "@/lib/ui";
import { getDict, lp } from "@/lib/i18n";
import HtmlLang from "@/lib/htmllang";
import { SITE } from "@/lib/meta";
import { longDate } from "./Blog";

export default function BlogPost({ lang = "en", slug }) {
  const t = getDict(lang);
  const post = t.blog.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.dek,
    datePublished: post.date,
    inLanguage: t.lang,
    mainEntityOfPage: SITE + lp(t.lang, "/blog/" + post.slug),
    author: { "@type": "LegalService", name: "Zayrov Law, P.C." },
    publisher: { "@type": "LegalService", name: "Zayrov Law, P.C." },
  };

  return (
    <div>
      <HtmlLang lang={lang} />
      <Nav lang={lang} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="v-page v-mid">
        <Link className="v-back" href={lp(lang, "/blog")}>← {t.blogPage.back}</Link>
        <Eyebrow>{post.tag}</Eyebrow>
        <h1 className="v-h1 v-h1sm">{post.title}</h1>
        <div className="v-artmeta">{longDate(post.date, t.lang)} · Zayrov Law, P.C.</div>
        <div className="v-article">
          <p className="v-artp"><strong>{post.dek}</strong></p>
          {post.body.map((p, i) => <p className="v-artp" key={i}>{p}</p>)}
        </div>
        <div className="v-artcta">
          <div className="v-artctatext">{t.blogPage.ctaText}</div>
          <div className="v-artctabtns">
            <Link className="v-gold" href={lp(lang, "/apply")}>{t.common.getStarted99}</Link>
            <Link className="v-quiet" href={lp(lang, "/blog")}>{t.blogPage.back}</Link>
          </div>
        </div>
        <p className="v-legal v-mt">{t.blogPage.legal}</p>
      </div>
      <Footer lang={lang} />
    </div>
  );
}
