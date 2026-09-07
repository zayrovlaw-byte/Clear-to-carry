import { Nav, Footer } from "@/lib/ui";
import { FAQS } from "@/lib/content";
import FaqList from "./faqlist";

export const metadata = {
  title: "NYC Gun License FAQ | Concealed Carry Questions Answered | Clear to Carry",
  description:
    "Do I qualify for a NYC carry license? What if I have an old arrest? How long does the NYPD take? Non-resident applications? Plain answers from a NYC licensing attorney.",
};

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <div>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaqList />
      <Footer />
    </div>
  );
}
