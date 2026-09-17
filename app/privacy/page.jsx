import Page from "@/lib/pages/Privacy";
import { getDict } from "@/lib/i18n";
import { altMeta } from "@/lib/meta";

export const metadata = { ...getDict("en").meta.privacy, ...altMeta("en", "/privacy") };

export default function Route() {
  return <Page lang="en" />;
}
