import { Suspense } from "react";
import { Nav, Footer } from "@/lib/ui";
import { getDict } from "@/lib/i18n";
import HtmlLang from "@/lib/htmllang";
import Flow from "@/app/apply/flow";

export default function Apply({ lang = "en" }) {
  const t = getDict(lang);
  return (
    <div>
      <HtmlLang lang={lang} />
      <Nav lang={lang} />
      <Suspense fallback={<div className="v-page v-narrow"><p className="v-mutetext">…</p></div>}>
        <Flow t={t} lang={lang} />
      </Suspense>
      <Footer lang={lang} />
    </div>
  );
}
