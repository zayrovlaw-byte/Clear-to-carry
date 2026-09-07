import { Suspense } from "react";
import { Nav, Footer } from "@/lib/ui";
import Flow from "./flow";

export const metadata = {
  title: "Apply | NYC Firearm License | Clear to Carry",
  description:
    "60-second eligibility screening for a New York City carry, premise, or business firearm license. Flat-fee engagements handled entirely by the attorney.",
};

export default function ApplyPage() {
  return (
    <div>
      <Nav />
      <Suspense fallback={<div className="v-page v-narrow"><p className="v-mutetext">Loading…</p></div>}>
        <Flow />
      </Suspense>
      <Footer />
    </div>
  );
}
