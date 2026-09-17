import Page from "@/lib/pages/Faq";
import { getDict } from "@/lib/i18n";
import { altMeta } from "@/lib/meta";

export const metadata = { ...getDict("en").meta.faq, ...altMeta("en", "/faq") };

export default function Route() {
  return <Page lang="en" />;
}
