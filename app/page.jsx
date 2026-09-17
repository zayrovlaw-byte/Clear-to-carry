import Page from "@/lib/pages/Home";
import { getDict } from "@/lib/i18n";
import { altMeta } from "@/lib/meta";

export const metadata = { ...getDict("en").meta.home, ...altMeta("en", "/") };

export default function Route() {
  return <Page lang="en" />;
}
