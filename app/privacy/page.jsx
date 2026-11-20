import { Nav, Footer, Eyebrow } from "@/lib/ui";

export const metadata = { title: "Privacy | Clear to Carry" };

export default function Privacy() {
  return (
    <div>
      <Nav />
      <div className="v-page v-mid">
        <Eyebrow>Privacy</Eyebrow>
        <h1 className="v-h1 v-h1sm">What we collect, and what we never do with it.</h1>
        <div className="v-article">
          <p className="v-artp">
            Information you submit through this site, including screening answers,
            contact details, and uploaded documents, is collected solely so Zayrov
            Law, P.C. can evaluate and handle your matter. Screening answers are not
            filed with any agency and are not shared with anyone outside the firm.
          </p>
          <p className="v-artp">
            Documents you upload are stored for attorney review and treated as
            confidential client material. We do not sell, rent, or share your
            information with third parties for marketing. We use your contact
            information to respond to you and to handle your engagement, and for
            nothing else.
          </p>
          <p className="v-artp">
            Communications through this site are not encrypted end to end and a
            website form is not a substitute for a privileged conversation. For
            anything you would not put in writing, call us.
          </p>
          <p className="v-artp">
            To have your information corrected or deleted, contact the firm at the
            address or phone number in the footer. Some records must be retained
            where the law or professional rules require it.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
