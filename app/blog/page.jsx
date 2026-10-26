import Page from "@/lib/pages/Blog";
import { getDict } from "@/lib/i18n";
import { altMeta } from "@/lib/meta";

export const metadata = { ...getDict("en").meta.blog, ...altMeta("en", "/blog") };

export default function Route() {
  return <Page lang="en" />;
}
