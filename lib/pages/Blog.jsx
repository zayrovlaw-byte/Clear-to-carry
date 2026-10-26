import Link from "next/link";
import { Nav, Footer, Eyebrow } from "@/lib/ui";
import { getDict, lp } from "@/lib/i18n";
import HtmlLang from "@/lib/htmllang";

/* Date rendered in the visitor's language off the one date in lib/schema, so a
   post is never dated differently in one locale than another. */
function longDate(iso, lang) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString(
    { en: "en-US", es: "es-US", ru: "ru-RU" }[lang] || "en-US",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }
  );
}

export default function Blog({ lang = "en" }) {
  const t = getDict(lang);
  return (
    <div>
      <HtmlLang lang={lang} />
      <Nav lang={lang} />
      <div className="v-page v-mid">
        <Eyebrow>{t.blogPage.eyebrow}</Eyebrow>
        <h1 className="v-h1 v-h1sm">{t.blogPage.h1}</h1>
        <p className="v-lede v-ledesm">{t.blogPage.lede}</p>

        <div className="v-posts">
          {t.blog.map((post) => (
            <Link key={post.slug} className="v-post" href={lp(lang, "/blog/" + post.slug)}>
              <div className="v-postmeta">{longDate(post.date, t.lang)}</div>
              <h2 className="v-posttitle">{post.title}</h2>
              <p className="v-postdek">{post.dek}</p>
              <span className="v-postmore">{t.blogPage.readMore} →</span>
            </Link>
          ))}
        </div>

        <div className="v-artcta">
          <div className="v-artctatext">{t.blogPage.ctaText}</div>
          <div className="v-artctabtns">
            <Link className="v-gold" href={lp(lang, "/apply")}>{t.common.getStarted99}</Link>
            <Link className="v-quiet" href={lp(lang, "/apply?view=packages")}>{t.rightsPage.ctaSecondary}</Link>
          </div>
        </div>
        <p className="v-legal v-mt">{t.blogPage.legal}</p>
      </div>
      <Footer lang={lang} />
    </div>
  );
}

export { longDate };
