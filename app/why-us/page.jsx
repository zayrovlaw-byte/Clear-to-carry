import Page from "@/lib/pages/WhyUs";
import { getDict } from "@/lib/i18n";
import { altMeta } from "@/lib/meta";

export const metadata = { ...getDict("en").meta.whyUs, ...altMeta("en", "/why-us") };

export default function Route() {
  return <Page lang="en" />;
}
