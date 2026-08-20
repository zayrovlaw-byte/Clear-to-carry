export const ZELLE_TO = process.env.NEXT_PUBLIC_ZELLE_TO || "zayrovlaw@gmail.com";
export const PHONE = "(347) 335-5723";
export const PHONE_TEL = "tel:+13473355723";

export const PACKAGES = [
  { id: "premise", tier: "Residence", name: "Premise · Home", price: 2500,
    line: "Pistol or shotgun kept at your residence.",
    for: "Homeowners who want lawful protection where their family sleeps." },
  { id: "business", tier: "Commerce", name: "Premise · Business", price: 3500,
    line: "Firearm secured at your place of business.",
    for: "Owners protecting a storefront, office, or cash-handling operation." },
  { id: "carry", tier: "Signature", name: "Concealed Carry", price: 5000,
    line: "Full carry license. Our flagship engagement.",
    for: "Professionals who want protection that travels with them.", featured: true },
  { id: "bizcarry", tier: "Executive", name: "Business Carry", price: 6000,
    line: "Carry tied to your business operations.",
    for: "Jewelers, cash businesses, and owners with elevated exposure." },
  { id: "nonres", tier: "Reserve", name: "Non-Resident Carry", price: 7500,
    line: "The rules changed. Out-of-state applicants can now apply. We handle the entire file, remotely.",
    for: "Connecticut, New Jersey, and beyond. The non-resident application carries extra documentation, and we manage every page of it without you setting foot in the city until it matters." },
];

export const TIERS = [
  { id: "tier-consult", tier: "First step", name: "Strategy Consultation", price: 350,
    line: "One hour with the attorney. Your eligibility, your options, your plan.",
    for: "You want a straight answer before committing to anything. Credited toward any package if you retain us within 30 days.",
    checkout: true },
  { id: "tier-review", tier: "Second opinion", name: "Application Review", price: 1500,
    line: "You assemble it. We tear it apart before the License Division can.",
    for: "You've started on your own and want counsel to find the problems while they can still be fixed.",
    checkout: true },
  { id: "tier-full", tier: "The standard", name: "Full Representation", priceLabel: "From $2,500",
    line: "We build the entire file. You sign where we tell you to sign.",
    for: "Start to license. Every document drafted, obtained, or reviewed by the attorney. Priced by license type below.",
    featured: true, expands: true },
  { id: "tier-concierge", tier: "White glove", name: "Concierge", priceLabel: "Package + $2,500",
    line: "Everything in Full Representation, at your pace and your location.",
    for: "We come to you. Evening and weekend availability, notary brought to your home or office, direct cell access to counsel.",
    concierge: true },
];

export const QUALIFY = [
  { id: "age", q: "Are you 21 or older?",
    opts: [
      { label: "Yes", grade: "g" },
      { label: "No", grade: "r", note: "New York issues carry licenses at 21. If you are close, we can time the process so you file the day you qualify." },
    ] },
  { id: "nexus", q: "What connects you to New York City?",
    opts: [
      { label: "I live in the five boroughs", grade: "g" },
      { label: "My business or job is in the city", grade: "g" },
      { label: "I live out of state", grade: "y", note: "The rules changed. Non-residents can now apply for a New York City carry license under the License Division's non-resident category. The application is even more document-heavy than the resident version, which is exactly why our Non-Resident engagement exists." },
    ] },
  { id: "felony", q: "Any felony conviction, ever?",
    opts: [
      { label: "No", grade: "g" },
      { label: "Yes", grade: "r", note: "A felony is a statutory bar, but there are narrow relief paths, including a certificate of relief from disabilities. That is a conversation, not a form." },
      { label: "I'm not sure how it was classified", grade: "y", note: "Many people genuinely don't know how an old case resolved. We pull the certificate of disposition and find out before anything is filed." },
    ] },
  { id: "arrests", q: "Any arrests at all, including dismissed or sealed?",
    opts: [
      { label: "Never", grade: "g" },
      { label: "Yes, dismissed or sealed", grade: "y", note: "Survivable, and common. Sealed matters must still be disclosed. Presented correctly with the disposition, old arrests rarely sink a file. Omitted, they always do." },
      { label: "Yes, with a conviction (not felony)", grade: "y", note: "Depends on the offense and the years since. Certain misdemeanors are bars; most are not. This is a records question we answer definitively before you spend anything." },
    ] },
  { id: "op", q: "Any order of protection, ever, on either side?",
    opts: [
      { label: "No", grade: "g" },
      { label: "Expired, from years ago", grade: "y", note: "Old orders show up in the check. The file needs to tell that story before the investigator writes their own version." },
      { label: "Active now", grade: "r", note: "An active order is a serious obstacle and, depending on its terms, a bar. Timing matters here more than anything." },
    ] },
  { id: "mh", q: "Ever hospitalized involuntarily for a mental health condition?",
    opts: [
      { label: "No", grade: "g" },
      { label: "Voluntarily, in the past", grade: "y", note: "Voluntary treatment is not the same as involuntary commitment, and the distinction decides files. We document it correctly." },
      { label: "Yes, involuntarily", grade: "r", note: "This requires a careful legal analysis before anything is filed. There are paths, but not without counsel." },
    ] },
  { id: "driving", q: "DWI, DUI, or a suspended license in the last ten years?",
    opts: [
      { label: "Clean", grade: "g" },
      { label: "One incident, resolved", grade: "y", note: "The investigator reads your lifetime driving record. One old incident, explained on our terms, is manageable." },
      { label: "More than one", grade: "y", note: "A pattern needs a narrative and time. We tell you honestly whether to file now or build the record first." },
    ] },
];

export const PHASES = [
  { id: 1, name: "Identity", brief: "We verify who you are.",
    items: [
      { id: "p1a", label: "Government photo ID" },
      { id: "p1b", label: "Second form of identification" },
      { id: "p1c", label: "Recent photo · shoulders up, plain wall, phone is fine" },
    ] },
  { id: 2, name: "Residence", brief: "We establish where you live and who lives with you.",
    items: [
      { id: "p2a", label: "Proof of address, dated within 60 days" },
      { id: "p2b", label: "Household information form · we send it, you complete it" },
    ] },
  { id: 3, name: "History", brief: "We build your record before anyone else reads it.",
    items: [
      { id: "p3a", label: "Background questionnaire · completed together on a call" },
      { id: "p3b", label: "Driving record · we walk you through the exact pull" },
      { id: "p3c", label: "References · we tell you who qualifies and draft everything" },
    ] },
  { id: 4, name: "Qualification", brief: "Training, sworn statements, final assembly.",
    items: [
      { id: "p4a", label: "Certified training · we place you with an approved instructor" },
      { id: "p4b", label: "Sworn statements · drafted by us, signed by you" },
      { id: "p4c", label: "Final review with counsel before anything is filed" },
    ] },
];

export const FAQS = [
  { q: "Do I actually have a chance of getting approved?",
    a: "Since the Supreme Court's Bruen decision in 2022, New York can no longer deny you for failing to show a special need. If you are 21 or older and clear the statutory bars, you are a viable applicant. Whether your particular record clears those bars is exactly what the consultation answers, honestly, before you spend real money." },
  { q: "Why do applications get denied?",
    a: "Rarely for dramatic reasons. Most denials and returns come down to avoidable errors: an undisclosed arrest the applicant thought was sealed, a gap in the address history, a missing signature, a character reference who does not qualify, a questionnaire answer that contradicts a record the investigator pulls anyway. Our job is making sure nothing is overlooked and nothing in your file surprises anyone." },
  { q: "I have an arrest from years ago. Is it over for me?",
    a: "Usually not. Even dismissed and sealed matters must be disclosed, and the worst thing you can do is omit one, because an omission is treated as a false statement. Disclosed correctly, with the disposition documented and explained by counsel, old arrests are frequently survivable. Hidden, they are fatal." },
  { q: "How long does this take?",
    a: "State law requires a decision within six months of a complete application. The reality is the License Division runs a backlog, and files with problems wait longest because every deficiency restarts the clock. Our job has two parts: file it complete so nothing restarts, and hold the NYPD to the statute. When a clean file sits past the legal deadline, we don't wait politely. Court is an option, and we use it." },
  { q: "Do I have to live in New York City?",
    a: "Not anymore. The rules now allow out-of-state residents to apply for a New York City carry license through the License Division's non-resident category. The non-resident file carries additional documentation requirements, which is precisely the kind of application that should not be attempted alone." },
  { q: "What about training?",
    a: "New York requires certified training, roughly 16 hours of classroom and 2 hours of live fire, before a carry license issues. We place you with approved instructors and time it correctly within the process." },
  { q: "What happens if I'm denied?",
    a: "A denial is not the end. It is a government decision, and government decisions can be challenged in court under Article 78. If we built your file and it is denied, we have already preserved the record that the challenge is built on." },
  { q: "What happens after I have the license?",
    a: "It isn't forever. New York City carry licenses run on a three-year cycle, and lapses are self-inflicted wounds. Our clients don't track this. We calendar your renewal, handle amendments when you add a firearm, and remain your counsel for as long as you carry." },
  { q: "Is any of this discreet?",
    a: "Entirely. Your matter is protected by attorney-client privilege from the first consultation. Nobody is notified that you applied, and our client materials never use full names publicly." },
];

export const BRUEN = {
  title: "Bruen changed everything. Most New Yorkers still don't know.",
  date: "August 2026",
  read: "5 minute read",
  paragraphs: [
    "For more than a century, New York operated under a rule that made carrying a firearm a privilege reserved for the connected. The Sullivan Act of 1911 and the licensing regime built on it required an applicant to show 'proper cause,' a special need for self-protection beyond that of the general public. Wanting to protect yourself, your family, or your business was not enough. In practice, licenses went to retired officers, celebrities, and those who knew whom to ask.",
    "In June 2022, the Supreme Court ended that in New York State Rifle & Pistol Association v. Bruen. The Court held that the Second Amendment protects an individual's right to carry a handgun for self-defense outside the home, and that New York's proper cause requirement was unconstitutional. A state may license carry. It may no longer ration it to those who can prove they are special.",
    "New York's response came fast. Within weeks, Albany passed the Concealed Carry Improvement Act, and the licensing process that emerged is a paradox: the right is broader than it has been in a hundred years, and the application is harder. The state replaced the proper cause test with an intensified review of the applicant, including a character assessment, expanded disclosure obligations, in-person interviews, extensive training requirements, and a long list of sensitive locations where even licensees cannot carry.",
    "The door has opened wider since. Non-residents of New York can now apply for a city carry license under the License Division's non-resident category, a change driven by continued litigation after Bruen. The commuter from Connecticut and the business owner from New Jersey are now applicants too.",
    "What does that mean for an ordinary person in 2026? Two things, and they pull in opposite directions.",
    "First, you can get this license now. The homeowner in Queens, the shop owner in Brooklyn, the professional who closes late and walks to a parked car: all of them are exactly the applicants Bruen was decided for. No special need. No connections. The constitutional question is settled.",
    "Second, the process punishes the unprepared. The License Division cannot ask why you want to carry, so its scrutiny has moved to who you are. Every arrest, every address, every reference, every answer on the questionnaire is checked against records you do not control. Files are returned and applications denied not because the applicant was ineligible, but because something was incomplete, inconsistent, or undisclosed. The right is yours. The file still has to be perfect.",
    "That is the entire reason this practice exists. The law finally lets you protect what is yours. Our job is making sure the paperwork never gets in the way.",
  ],
};
