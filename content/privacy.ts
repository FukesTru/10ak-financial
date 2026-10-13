import type { PrivacyContent } from "@/content/types";
import { firm, fullAddress } from "@/config/firm";

const email = firm.email;
const phone = firm.phone.display;

export const privacyContent: PrivacyContent = {
  seo: {
    title: "Privacy Policy & Disclosures | 1Oak Financial Group",
    description:
      "How 1Oak Financial Group in Monrovia, California collects, uses and protects website information, your California privacy rights, and important disclosures.",
  },
  hero: {
    h1: "Privacy Policy & Important Disclosures",
    subhead:
      "How we handle the information you share through this website, the rights California law gives you, and what the information on this site can and cannot do for you.",
  },
  lastUpdated: "2026-10-13",

  /* ------------------------------------------------------------------ */
  /* Part 1: Privacy Policy                                              */
  /* ------------------------------------------------------------------ */
  privacy: {
    intro: [
      'This Privacy Policy explains what information 1Oak Financial Group ("1Oak," "we," "us") collects through this website, how we use and share it, and the choices and rights you have. It applies to this website and to inquiries you send us through it.',
      "If you become a client, your financial information is covered by a separate client privacy notice, described below.",
    ],
    sections: [
      {
        id: "information-we-collect",
        heading: "Information we collect",
        paragraphs: [
          "We collect two kinds of information: details you choose to give us, and limited technical information that your browser sends automatically.",
        ],
        bullets: [
          "**Information you provide.** When you fill out our contact form, we ask for your name, email address, phone number, the service you are interested in and the best time to reach you. You can also include an optional message. If you email or call us, we receive whatever you choose to share.",
          "**Information sent automatically.** Like most websites, ours receives information about your device and browser (such as browser type, operating system and screen size), the pages you view and how you arrived at the site, and an approximate location based on your IP address. That location is generally a city or region, not a street address.",
        ],
      },
      {
        id: "how-we-use-information",
        heading: "How we use your information",
        bullets: [
          "To respond to your inquiry and schedule a strategy call.",
          "To follow up about the service you asked about. We send text messages only if you have given consent, as described below.",
          "To understand how visitors use the site so we can improve its content and performance.",
          "To keep the website working properly and to prevent spam or misuse of the contact form.",
          "To meet our legal, regulatory and recordkeeping obligations.",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies and similar technologies",
        paragraphs: [
          "Cookies are small files a website stores in your browser. Similar technologies, such as browser storage, work in much the same way. We use them for two purposes: to make the site work, including remembering your cookie choice, and, only if you allow it, for analytics.",
          "When you first visit, a cookie notice lets you accept or decline analytics cookies. If you decline, analytics cookies are not set. You can change your mind at any time with the \"Cookie settings\" link at the bottom of every page.",
          "**Global Privacy Control.** If your browser sends a Global Privacy Control (GPC) signal, we honor it as a request to opt out of the sale or sharing of your personal information, and we treat it as a choice to decline analytics cookies for that browser.",
          "Most browsers also let you block or delete cookies through their settings. Blocking all cookies may affect how some websites work.",
        ],
      },
      {
        id: "analytics",
        heading: "Analytics",
        paragraphs: [
          "We use Google Analytics 4, a service provided by Google, to understand in aggregate how visitors use this site: for example, which pages are viewed most and how people find us. We use these reports to improve the site, not to identify individual visitors.",
          "Google Analytics runs only if you accept analytics cookies in the cookie notice. You can also opt out of Google Analytics on every website you visit by installing Google's Analytics opt-out browser add-on. Google's own privacy policy explains how Google handles the data it collects.",
        ],
      },
      {
        id: "contact-consent",
        heading: "Email, text message and phone contact",
        paragraphs: [
          "Our contact form includes a consent checkbox that is unchecked by default. If you check it, you agree that 1Oak Financial Group may contact you by email, text message and phone at the address and number you provide. Giving consent is not a condition of any purchase.",
        ],
        bullets: [
          "**Text messages.** Message frequency varies. Message and data rates may apply. Reply STOP at any time to stop receiving texts from us.",
          "**Email.** Our marketing emails include an unsubscribe link. You can use it at any time.",
          "**Phone.** You can ask us at any time to stop calling you, and we will update our records.",
          "**Your number stays with us.** We do not sell or rent phone numbers, and we do not share your mobile number or text-message consent with third parties for their own marketing.",
          `**Changing your mind.** You can withdraw consent at any time by replying STOP to a text, using the unsubscribe link in an email, or contacting us at ${email} or ${phone}.`,
        ],
      },
      {
        id: "how-we-share",
        heading: "How we share information",
        paragraphs: ["We share personal information only in the following situations:"],
        bullets: [
          "**Service providers.** Companies that host this website, provide analytics, deliver our emails and text messages, and store and manage inquiries on our behalf. They may use the information only to provide services to us, under confidentiality obligations.",
          "**Legal requirements.** When we believe disclosure is required by law, regulation, subpoena or court order, or is needed to protect the rights, property or safety of our clients, our firm or others.",
          "**Business transfers.** If our firm is involved in a merger, sale or similar transaction, information may be transferred as part of that transaction, subject to this policy.",
          "**With your permission.** When you ask us to share information with someone else, such as your attorney or another advisor.",
        ],
      },
      {
        id: "no-sale-or-sharing",
        heading: "We do not sell your information",
        paragraphs: [
          "**We do not sell your personal information, and we do not share it for cross-context behavioral advertising**, which means advertising aimed at you based on your activity across other companies' websites and apps. We have not done either in the past 12 months.",
        ],
      },
      {
        id: "data-retention",
        heading: "How long we keep information",
        paragraphs: [
          "We keep inquiry information only as long as we need it to respond to you and follow up, and as long as needed to meet legal, regulatory or recordkeeping obligations. After that, we delete it or de-identify it so it can no longer reasonably be linked to you.",
          "Analytics information is reviewed in aggregate and kept according to the data-retention settings of our analytics service.",
        ],
      },
      {
        id: "security",
        heading: "Security",
        paragraphs: [
          "We use reasonable administrative, technical and physical safeguards designed to protect the information you send us. Even so, no method of sending or storing information over the internet is completely secure, so we cannot promise absolute security.",
          "**Please do not send Social Security numbers, account numbers or other sensitive financial details through the website form.** If we need that information later, we will explain how to provide it.",
        ],
      },
      {
        id: "california-privacy-rights",
        heading: "Your California privacy rights",
        paragraphs: [
          'If you are a California resident, the California Consumer Privacy Act, as amended by the California Privacy Rights Act (together, the "CCPA"), gives you the following rights regarding your personal information:',
        ],
        bullets: [
          "**Right to know and access.** You can ask what personal information we have collected about you, where it came from, why we collected it and the categories of third parties we disclose it to, and you can ask for a copy of the specific information we hold.",
          "**Right to delete.** You can ask us to delete personal information we collected from you, subject to exceptions the law allows, such as information we must keep to meet legal or regulatory obligations.",
          "**Right to correct.** You can ask us to correct personal information that is inaccurate.",
          "**Right to opt out of sale or sharing.** We do not sell or share personal information, but you can still send us an opt-out request, and we honor Global Privacy Control signals as described above.",
          "**Right to limit use of sensitive personal information.** You can ask us to limit our use of sensitive personal information to the purposes the law permits. We do not ask for sensitive personal information through this website.",
          "**Right to non-discrimination.** We will not deny you service, charge you a different price or give you a different level of service because you exercised any of these rights.",
        ],
      },
      {
        id: "authorized-agents-and-verification",
        heading: "Authorized agents and how we verify requests",
        paragraphs: [
          "**Authorized agents.** You can ask someone else to make a request for you. We may ask the agent for proof that you gave signed permission, and we may ask you to confirm your identity directly with us, unless the agent holds a valid power of attorney.",
          "**Verification.** To protect your information, we confirm your identity by matching details you give us, such as your name, email address and phone number, with the information we already hold. For requests involving specific pieces of information, we may ask for additional details. We use the information you provide for verification only for that purpose.",
          "We respond within the time the law requires, generally 45 days. If we need more time, we will tell you why and how long the extension will be.",
        ],
      },
      {
        id: "how-to-make-a-request",
        heading: "How to make a privacy request",
        paragraphs: [
          `To exercise any of these rights, or to ask a question about this policy, email us at ${email} or call ${phone}. Tell us which right you would like to exercise and the best way to reach you. There is no charge for making a request.`,
        ],
      },
      {
        id: "childrens-privacy",
        heading: "Children's privacy",
        paragraphs: [
          "This website is not directed to children under 16, and we do not knowingly collect personal information from them. If you believe a child under 16 has sent us information through the site, please contact us and we will take steps to delete it.",
        ],
      },
      {
        id: "if-you-become-a-client",
        heading: "If you become a client",
        paragraphs: [
          "Information you share as a client, such as tax returns, account statements and other financial records, is handled under a separate client privacy notice and engagement agreement that we provide when you engage us. Those documents, not this website policy, govern how client financial information is collected, used, shared and protected.",
        ],
      },
      {
        id: "changes-to-this-policy",
        heading: "Changes to this policy",
        paragraphs: [
          'We may update this Privacy Policy when our website, our services or the law changes. When we do, we will post the revised version on this page and update the "Last updated" date at the top.',
        ],
      },
      {
        id: "contact-us",
        heading: "Contact us",
        paragraphs: ["Questions about this policy or our privacy practices are welcome."],
        bullets: [
          `**Mail:** ${firm.name}, ${fullAddress}`,
          `**Email:** ${email}`,
          `**Phone:** ${phone}`,
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Part 2: Important Disclosures                                       */
  /* ------------------------------------------------------------------ */
  disclosures: {
    intro: [
      "The information on this website is provided by 1Oak Financial Group for general educational purposes. Please read these disclosures before acting on anything you read here.",
    ],
    sections: [
      {
        id: "general-information",
        heading: "General information only",
        paragraphs: [
          "Content on this website is general information. It is not tax, legal, accounting, insurance or investment advice, and it does not take your personal circumstances into account. Before making a decision, consult a qualified professional about your specific situation.",
        ],
      },
      {
        id: "no-guarantees",
        heading: "No guarantees",
        paragraphs: [
          "We do not guarantee any tax outcome, refund, investment return, interest rate, loan approval or insurance approval. Results depend on your circumstances, current law, market conditions and decisions made by others, such as the IRS, the California Franchise Tax Board, lenders and insurance companies. Past performance does not guarantee future results.",
        ],
      },
      {
        id: "no-client-relationship",
        heading: "No client relationship until an engagement agreement is signed",
        paragraphs: [
          "Contacting us, using this website or having a free strategy call does not create an advisor-client, accountant-client, insurance or any other professional relationship. A professional relationship begins only when a written engagement agreement describing the services we will provide has been signed. Until then, please do not rely on anything discussed as advice for your situation.",
        ],
      },
      {
        id: "hypothetical-examples",
        heading: "Hypothetical and illustrative examples",
        paragraphs: [
          "Examples, sample calculations and tables on this site are hypothetical and provided for education only. They are simplified, rely on assumed figures and are not predictions, projections or promises of what you will experience. Your own results will differ.",
        ],
      },
      {
        id: "tax-law-changes",
        heading: "Tax laws change",
        paragraphs: [
          "Tax rules, contribution limits, income thresholds and rates change often, in some cases every year. Information on this site reflects our understanding at the time it was written and may become outdated. Please confirm current law with a qualified professional before acting.",
        ],
      },
      {
        id: "insurance-and-annuities",
        heading: "Insurance and annuity products",
        paragraphs: [
          "Guarantees in life insurance and annuity contracts are backed solely by the financial strength and claims-paying ability of the issuing insurance company. These products have fees, charges and limitations, which may include surrender charges for early withdrawals, and coverage is subject to the insurer's underwriting and approval.",
          "Loans and withdrawals from a permanent life insurance policy reduce its cash value and death benefit and may have tax consequences. The taxable portion of annuity withdrawals taken before age 59½ may be subject to an additional 10% federal tax on top of ordinary income tax, unless an exception applies.",
        ],
      },
      {
        id: "investment-risk",
        heading: "Investments involve risk",
        paragraphs: [
          "All investments involve risk, including the possible loss of principal. Diversification and asset allocation do not ensure a profit or protect against loss in a declining market. Tax-advantaged accounts can reduce or defer taxes, but they do not remove investment risk.",
        ],
      },
      {
        id: "mortgage-information",
        heading: "Mortgage information",
        paragraphs: [
          "Information about mortgage loans on this site is not a commitment to lend or an offer of credit. All loans are subject to credit approval, property valuation where required and the lender's program guidelines. Rates, terms and programs can change without notice.",
        ],
      },
      {
        id: "third-party-links",
        heading: "Third-party links",
        paragraphs: [
          "This site may link to government agencies or other outside websites for reference. We do not control those sites and are not responsible for their content, privacy practices or availability. A link is not an endorsement.",
        ],
      },
      {
        id: "testimonials",
        heading: "Reviews and testimonials",
        paragraphs: [
          "We do not currently publish client reviews or testimonials on this website. If we add reviews in the future, they will be real and unedited, and they will be accompanied by any disclosures required for our services and licenses.",
        ],
      },
      {
        id: "licensing",
        heading: "Licensing and registrations",
        paragraphs: [
          "The licenses and registrations held by 1Oak Financial Group and its professionals are listed below. Some services, such as insurance, annuity, mortgage and investment-related services, are offered only where the firm or its professionals are appropriately licensed or registered.",
        ],
      },
    ],
  },
};
