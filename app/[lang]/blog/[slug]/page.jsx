import Page from "@/lib/pages/BlogPost";
import { getDict, ALT_LOCALES, isLocale } from "@/lib/i18n";
import { altMeta } from "@/lib/meta";
import { BLOG_META } from "@/lib/schema";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export function generateStaticParams() {
  return ALT_LOCALES.flatMap((lang) => BLOG_META.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const post = getDict(lang).blog.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title + " | Clear to Carry",
    description: post.dek,
    ...altMeta(lang, "/blog/" + slug),
  };
}

export default async function Route({ params }) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !BLOG_META.some((p) => p.slug === slug)) notFound();
  return <Page lang={lang} slug={slug} />;
}
