import Page from "@/lib/pages/BlogPost";
import { getDict } from "@/lib/i18n";
import { altMeta } from "@/lib/meta";
import { BLOG_META } from "@/lib/schema";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export function generateStaticParams() {
  return BLOG_META.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getDict("en").blog.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title + " | Clear to Carry",
    description: post.dek,
    ...altMeta("en", "/blog/" + slug),
  };
}

export default async function Route({ params }) {
  const { slug } = await params;
  if (!BLOG_META.some((p) => p.slug === slug)) notFound();
  return <Page lang="en" slug={slug} />;
}
