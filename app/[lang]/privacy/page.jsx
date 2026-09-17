import Page from "@/lib/pages/Privacy";
import { getDict, ALT_LOCALES, isLocale } from "@/lib/i18n";
import { altMeta } from "@/lib/meta";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export function generateStaticParams() {
  return ALT_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { ...getDict(lang).meta.privacy, ...altMeta(lang, "/privacy") };
}

export default async function Route({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <Page lang={lang} />;
}
