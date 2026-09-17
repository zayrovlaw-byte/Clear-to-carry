import Page from "@/lib/pages/Rights";
import { getDict } from "@/lib/i18n";
import { altMeta } from "@/lib/meta";

export const metadata = { ...getDict("en").meta.rights, ...altMeta("en", "/your-rights") };

export default function Route() {
  return <Page lang="en" />;
}
