import Page from "@/lib/pages/Apply";
import { getDict } from "@/lib/i18n";
import { altMeta } from "@/lib/meta";

export const metadata = { ...getDict("en").meta.apply, ...altMeta("en", "/apply") };

export default function Route() {
  return <Page lang="en" />;
}
