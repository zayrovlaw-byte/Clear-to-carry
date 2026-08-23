export const ZELLE_TO = process.env.NEXT_PUBLIC_ZELLE_TO || "zayrovlaw@gmail.com";
export const PHONE = "(347) 335-5723";
export const PHONE_TEL = "tel:+13473355723";

/* Attorney's flat fee for Full Representation. The figure inside this band is set
   by the complexity of the applicant's record, not by license type, and is fixed
   in writing in the engagement letter. Advertised fees bind for 30 days (RPC 7.1). */
export const FEE_RANGE = "$2,500 – $3,500";

/* Costs paid to third parties, never to the firm. Included in Concierge only.
   Amounts are deliberately not advertised: they are set by the City, the State,
   and the course provider, and they change. Confirm current figures at the
   consultation. To advertise amounts, add an `amount` here and render it below. */
export const THIRD_PARTY_COSTS = [
  { id: "app-fee", name: "State and City application fee",
    note: "Paid to the licensing authority when the application is filed." },
  { id: "course", name: "18-hour required training course",
    note: "16 hours classroom and 2 hours live fire, required of carry applicants under the Concealed Carry Improvement Act. Paid to an approved course provider." },
  { id: "prints", name: "Fingerprinting fee",
    note: "Paid to the authorized vendor at the time your prints are taken." },
];

/* The six licence types we file. Fee is the same band for all of them:
   what moves the number is the applicant's record, not the licence. */
export const PACKAGES = [
  { id: "premise", icon: "home", tier: "Residence", name: "Premise · Home",
    line: "A pistol kept at your residence.",
    for: "The homeowner or tenant who wants lawful protection where their family sleeps. The most common licence we file, and the usual first step onto the carry path." },
  { id: "carry", icon: "pistol", tier: "Signature", name: "Concealed Carry",
    line: "Full carry licence. Our flagship engagement.",
    for: "Protection that travels with you through the five boroughs. Since Bruen, the City can no longer demand you prove you are special. It can still return an imperfect file, which is the whole reason we exist.",
    featured: true },
  { id: "special", icon: "route", tier: "Statewide", name: "Special Carry · Inter-County",
    line: "Carry that does not stop at the county line.",
    for: "A county licence is good in the county that issued it. The special carry endorsement is what lets a licensee carry across New York State, including into New York City. For commuters, and for anyone whose work or family crosses county lines." },
  { id: "longgun", icon: "longgun", tier: "Long gun", name: "Shotgun & Rifle",
    line: "The New York City long gun permit, including semi-automatic rifles.",
    for: "Shotguns and rifles are licensed separately in the City, and since 2022 a semi-automatic rifle needs its own licence. Home defence, sport, and collection." },
  { id: "bizcarry", icon: "store", tier: "Executive", name: "Business Carry",
    line: "Carry tied to how you earn your living.",
    for: "Jewellers, cash-handling businesses, late-closing owners, and anyone who carries a deposit. The business nexus is documented properly, on the face of the file." },
  { id: "guard", icon: "badge", tier: "On duty", name: "Security Guard",
    line: "The armed guard credential, handled alongside your licence.",
    for: "Armed security work requires the carry licence and the State's armed guard registration together, in the right order. We sequence both so you are not waiting on one to start the other." },
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
  { id: "tier-full", tier: "The standard", name: "Full Representation", priceLabel: FEE_RANGE,
    line: "We build the entire file. You sign where we tell you to sign.",
    for: "Start to license, for any license type. Where you land in the range depends on your record, not on which license you want. The figure is fixed in writing before any work begins.",
    featured: true, expands: true },
  { id: "tier-concierge", tier: "White glove", name: "Concierge", priceLabel: "All-inclusive",
    line: "Full Representation, plus every third-party cost covered.",
    for: "Your application fee, your 18-hour course, and your fingerprinting are included, not billed on top. We also come to you: evening and weekend availability, notary brought to your home or office, direct cell access to counsel. Quoted at consultation.",
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
      { label: "I live out of state", grade: "y", note: "The rules changed. Out-of-state and out-of-county applicants now have a path into New York, through the non-resident category and through the special carry endorsement that lets a licence cross county lines. Those files carry more documentation than a resident application, which is exactly the kind of file that should not be attempted alone." },
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
  { q: "What does this cost?",
    a: "Full Representation is a flat fee between $2,500 and $3,500, fixed in writing in your engagement letter before any work begins. Where you land in that range depends on your record, not on which license you want: a clean, straightforward file sits at the bottom, and a file that needs real legal work sits higher. A one-hour strategy consultation is $350, credited toward your fee if you retain us within 30 days. Separately, every applicant pays three third-party costs that never come to this firm: the State and City application fee, the 18-hour training course, and fingerprinting. Those are included in the Concierge engagement." },
  { q: "What about training?",
    a: "New York requires certified training, roughly 16 hours of classroom and 2 hours of live fire, before a carry license issues. We place you with approved instructors and time it correctly within the process. The course fee is paid to the provider, not to us, and is one of the third-party costs covered in the Concierge engagement." },
  { q: "What happens if I'm denied?",
    a: "A denial is not the end. It is a government decision, and government decisions can be challenged in court under Article 78. If we built your file and it is denied, we have already preserved the record that the challenge is built on." },
  { q: "What happens after I have the license?",
    a: "It isn't forever. New York City carry licenses run on a three-year cycle, and lapses are self-inflicted wounds. Our clients don't track this. We calendar your renewal, handle amendments when you add a firearm, and remain your counsel for as long as you carry." },
  { q: "Is any of this discreet?",
    a: "Entirely. Your matter is protected by attorney-client privilege from the first consultation. Nobody is notified that you applied, and our client materials never use full names publicly." },
];

export const BRUEN = {
  title: "The law changed. You can carry now.",
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

/* PLACEHOLDERS: replace with real, consented client material before launch.
   NY RPC 7.1. Quotes must be from actual clients, approvals must be real
   redacted letters. */
export const REVIEWS = [
  { quote: "[PLACEHOLDER: real client quote] I never touched a form. Every time I had a question, I called and the attorney answered.",
    who: "R.K.", where: "Queens", license: "Concealed Carry" },
  { quote: "[PLACEHOLDER: real client quote] He told me on the first call exactly what I qualified for and what it would cost. No surprises after that.",
    who: "M.Z.", where: "Brooklyn", license: "Business Carry" },
  { quote: "[PLACEHOLDER: real client quote] My record wasn't perfect. He didn't hide it, he explained it in the file, and I got approved.",
    who: "A.D.", where: "Queens", license: "Premise · Home" },
  { quote: "[PLACEHOLDER: real client quote] I own a store and close alone at night. From screening to license, I knew what was happening at every step.",
    who: "S.V.", where: "Brooklyn", license: "Premise · Business" },
  { quote: "[PLACEHOLDER: real client quote] I live in New Jersey and thought a city license was impossible. He handled the whole non-resident file remotely.",
    who: "D.L.", where: "New Jersey", license: "Non-Resident Carry" },
  { quote: "[PLACEHOLDER: real client quote] The interview is what scared me. We rehearsed it. I walked in prepared and walked out approved.",
    who: "E.B.", where: "Manhattan", license: "Concealed Carry" },
];

export const APPROVALS = [
  { label: "Concealed Carry", sub: "Queens · approved" },
  { label: "Premise · Home", sub: "Brooklyn · approved" },
  { label: "Business Carry", sub: "Brooklyn · approved" },
  { label: "Special Carry · Inter-County", sub: "Nassau · approved" },
];


/* ---------------------------------------------------------------------------
   RESULTS FIGURES — READ BEFORE EDITING

   These are statements of past results under NY RPC 7.1(d)(2). They are
   permitted, but only if (a) they are true, (b) you can substantiate them from
   your own records if the Grievance Committee ever asks, and (c) the
   "prior results" disclaimer travels with them, which it does: see
   RESULTS_DISCLAIMER, rendered directly beneath the figures on /reviews.

   Keep a spreadsheet: applications filed, approvals, denials, withdrawals, by
   date. Update `asOf` whenever you refresh the numbers. If you cannot prove a
   figure, lower it or remove it. Note the wording is deliberately narrow:
   it describes applications FILED BY THIS FIRM that were approved, not the
   share of everyone who ever called.
--------------------------------------------------------------------------- */
export const RESULTS = {
  asOf: "2026",
  stats: [
    { figure: "Hundreds", label: "of applicants guided through the New York licensing process" },
    { figure: "97%", label: "of the applications this firm has filed have been approved" },
    { figure: "180", label: "days the law gives the NYPD to decide a complete file, and we hold them to it" },
  ],
};

export const RESULTS_DISCLAIMER =
  "Prior results do not guarantee a similar outcome. The approval figure above " +
  "describes applications prepared and filed by this firm and reflects the " +
  "records of those matters; it is not a prediction about your application. " +
  "Every file turns on the applicant's own record, and licensing decisions are " +
  "made solely by the issuing authority. We decline matters we do not believe " +
  "we can file successfully, which is part of why the figure is what it is.";

/* Attorney biography copy. */
export const ATTORNEY = {
  name: "Zayrov Law, P.C.",
  eyebrow: "Your counsel",
  head: "A litigator who picked a side.",
  paragraphs: [
    "This practice did not begin with firearms. It began in general litigation, and it stayed there for years: criminal matters, civil disputes, family court, commercial cases, the ordinary and the awful. You sit through enough of them and you stop seeing separate areas of law. You start seeing one thing repeated. A file arrives in front of somebody with the power to decide, and that person reads it. What happens next depends far less on the law than anyone outside the system wants to believe, and far more on whether the file was built by someone who knew how it would be read.",
    "That is the whole trade. A prosecutor reading a disposition, a judge reading a motion, an investigator reading an application: each of them is looking for the gap, the inconsistency, the thing you did not mention. The lawyer's job is to make sure there isn't one, and that anything difficult in your history is on the page in your words before it is found in somebody else's.",
    "Then, in June 2022, the law in New York changed. In New York State Rifle & Pistol Association v. Bruen, the Supreme Court struck down the requirement that an applicant demonstrate some special need to be trusted with the right the Constitution already guaranteed. For a century, New York had rationed that right. Overnight, it could not. Ordinary New Yorkers — homeowners, shop owners, people who close up late and walk to a parked car — became eligible for something they had been told their whole lives was not for them.",
    "What did not change was the paperwork. The City cannot ask why you want to carry any more, so the scrutiny moved to who you are: every address, every arrest, every reference, every answer, checked against records you do not control. The right became available and the file became the battleground. That is a litigation problem wearing an administrative costume, and it is precisely the problem I had spent a career learning to solve.",
    "So the practice narrowed. Not because licensing is lucrative, but because this is the rare moment when a right that was theoretical for generations is actually collectible, and most of the people entitled to it still do not know it, or assume the door is closed to them, or try it alone and get their file returned.",
    "I take the Second Amendment seriously, and not as a slogan. A free country is one that trusts its citizens, and a country that does not trust you to defend your own home has quietly decided something about you. The same instinct runs through everything that makes a society free: that you own the product of your work, that you may build a business and protect it, that the state answers to you rather than the reverse. Those ideas stand or fall together. The right to defend your family is the one that makes the rest of them more than paper.",
    "Which is why this is not paperwork to me. When a client walks out with a licence, something that belonged to them the whole time is finally in their hands. That is worth doing carefully, once, and doing it right.",
  ],
  creds: ["Admitted · New York", "Admitted · New Jersey", "General litigation background", "Русский", "עברית"],
};
