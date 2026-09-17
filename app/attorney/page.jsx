import Page from "@/lib/pages/Attorney";
import { getDict } from "@/lib/i18n";
import { altMeta } from "@/lib/meta";

export const metadata = { ...getDict("en").meta.attorney, ...altMeta("en", "/attorney") };

export default function Route() {
  return <Page lang="en" />;
}
