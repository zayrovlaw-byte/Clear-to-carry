import Page from "@/lib/pages/Reviews";
import { getDict } from "@/lib/i18n";
import { altMeta } from "@/lib/meta";

export const metadata = { ...getDict("en").meta.reviews, ...altMeta("en", "/reviews") };

export default function Route() {
  return <Page lang="en" />;
}
