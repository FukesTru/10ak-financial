import type { ServiceContent } from "@/content/types";

const content: ServiceContent = {
  slug: "tax-return-filing",
  seo: {
    title: "Tax Return Filing in Monrovia, CA | 1Oak Financial Group",
    description:
      "Tax return filing in Monrovia, CA for individuals, self-employed owners, S corporations, partnerships and investors, with secure document upload and extensions.",
  },
  hero: {
    h1: "Tax Return Filing for Individuals, Business Owners and Investors in Monrovia",
    subhead:
      "Federal and California returns prepared carefully, filed on time and explained in plain English before you sign.",
  },
  intro: {
    heading: "Returns prepared with care, not in a rush",
    paragraphs: [
      "What most people want from a tax preparer is fairly simple: accurate returns, a clear list of what to send, straight answers when something looks off and no scramble in the final week. That gets harder once you add a business, a handful of K-1s, a rental property or a brokerage account with hundreds of trades. Each of those brings its own forms, its own deadlines and more chances for a figure to land in the wrong place.",
      "We prepare federal and California returns for individuals and families, self-employed professionals, S corporations, partnerships and LLCs. Clients work with us in person at our office in Monrovia or through virtual meetings from across Los Angeles and the rest of the state. Documents come in through a secure client portal, so you are not emailing tax forms or dropping off a folder and hoping nothing is missing.",
      "Filing season is also a good moment to notice what could be done differently next year. When a return shows a large balance due, underpaid estimates or a business structure that no longer fits, we point it out and, if you want, carry it into year-round [tax planning](/services/tax-planning). Our aim is a return you understand, not just one you sign.",
    ],
  },
  included: {
    heading: "Returns we prepare",
    items: [
      {
        title: "Individual and family returns",
        text: "Federal Form 1040 and California Form 540 for wage earners, retirees and households with investment, rental or retirement income. We review your prior-year return for carryovers such as capital losses, suspended rental losses and estimated payments already made.",
      },
      {
        title: "Self-employed and sole proprietor returns",
        text: "Schedule C for consultants, freelancers and single-owner businesses, including self-employment tax and the related deductions. If your records need work first, our [bookkeeping service](/services/accounting-bookkeeping) can get them ready for the return.",
      },
      {
        title: "S corporation returns",
        text: "Federal Form 1120-S and California Form 100S, with a K-1 issued to each shareholder. We also check that owner salary, distributions and shareholder basis are recorded consistently, since errors there tend to surface years later.",
      },
      {
        title: "Partnership and LLC returns",
        text: "Federal Form 1065 and the matching California return, Form 565 for partnerships or Form 568 for LLCs, including the annual LLC tax and fee. A single-member LLC that is disregarded for federal purposes generally still files Form 568 in California, a requirement that is easy to miss.",
      },
      {
        title: "Investor returns",
        text: "Consolidated brokerage statements, wash sales, K-1s from private funds or real estate partnerships, and rental properties reported on Schedule E with depreciation and passive loss limits. Owners of rental buildings may also want to look into a [cost segregation study](/services/cost-segregation-study), which sorts parts of a building into shorter depreciation periods.",
      },
      {
        title: "Extensions, amended returns and prior years",
        text: "When a K-1 or corrected form is still outstanding, we file extensions and estimate any payment due. We also prepare amended returns when something was missed and help you catch up on returns from earlier years that were never filed.",
      },
    ],
  },
  bestFor: {
    heading: "Who we prepare returns for",
    profiles: [
      {
        title: "Self-employed professionals and small-business owners",
        text: "Consultants, contractors, and medical or legal practices that want the business return and the personal return prepared together and kept consistent.",
      },
      {
        title: "Investors waiting on K-1s and corrected 1099s",
        text: "Households whose returns depend on late partnership K-1s, brokerage forms that are revised after they first arrive, or rental properties with depreciation to track from year to year.",
      },
      {
        title: "Dual-income families above $250K",
        text: "Two earners with equity compensation, a home sale, college costs or support for an aging parent, where a simple return stopped being simple some time ago.",
      },
      {
        title: "Anyone behind on filing",
        text: "People with one or more unfiled years, or a past return that needs correcting, who want to get current without a lecture. A short [conversation with us](/contact) is enough to map out the next steps.",
      },
    ],
  },
  process: {
    heading: "From checklist to filed return",
    steps: [
      {
        title: "Your personalized checklist",
        text: "Early in the season, you receive a document list built from last year's return, so you know which forms to expect and which accounts to pull statements from.",
      },
      {
        title: "Secure upload and review",
        text: "You upload documents through the secure portal as they arrive. We review them, follow up on anything missing and tell you early if a late K-1 or a corrected 1099 makes an extension the sensible choice.",
      },
      {
        title: "Draft walk-through",
        text: "Before anything is filed, we go over the draft with you: what changed from last year, what you owe or are due back, and anything worth planning for. Your questions are answered before you sign.",
      },
      {
        title: "E-file and confirmation",
        text: "Once you sign the e-file authorizations, we submit your federal and California returns and confirm when each is accepted. You receive final copies and, when needed, a schedule of next year's estimated payments.",
      },
    ],
  },
  conditional: [
    {
      requires: "clientPortal",
      after: "process",
      text: "Documents are exchanged through {value}, where you can upload forms as they arrive and retrieve copies of your completed returns.",
    },
  ],
  goodToKnow: {
    heading: "An extension to file is not an extension to pay",
    text: "The IRS grants an automatic six-month extension to file an individual return when you request it by the deadline, and California extends individual returns for six months automatically. Neither extension moves the payment date. Any tax you owe is still due by the original due date, and unpaid amounts generally accrue interest and may draw late-payment penalties from then on, so when we extend a return we also estimate what to send in with it.",
  },
  heldBack: [
    {
      id: "irsRepresentation",
      title: "IRS notice support and representation",
      text: "When a letter arrives from the IRS or the Franchise Tax Board, we review it with you, gather the supporting records and prepare a timely response. If the matter calls for formal representation, such as an examination, an appeal or a payment arrangement, a credentialed representative can act on your behalf under a signed power of attorney. We explain the scope and the fee before any representation work begins.",
    },
  ],
  licenses: ["taxCredential"],
  faqs: [
    {
      q: "What documents do I need?",
      a: "Start with last year's federal and California returns, then gather this year's W-2s, 1099s, K-1s, mortgage interest and property tax statements, records of estimated payments and receipts for charitable gifts. Business owners and landlords should add a profit and loss statement, or income and expense records, for each business or property. We send a checklist built from your prior return through the secure portal so you can work through it item by item.",
    },
    {
      q: "Can you file late or prior-year returns?",
      a: "Yes. Missing W-2s and 1099s can usually be filled in from IRS wage and income transcripts, which you can download from your IRS online account, and we prepare each unfiled year and work forward to the current one. Filing sooner is generally wiser: the penalty for not filing is typically steeper than the penalty for paying late, and a refund on an old return is usually lost once the claim window, often three years from the original due date, has closed.",
    },
    {
      q: "What if I receive an IRS notice?",
      a: "Don't ignore it: note the response deadline printed on the letter and send us a copy right away. We will help you understand what the notice is asking, gather the records that apply and plan a response, whether that means paying, correcting a figure or explaining why the IRS has it wrong. Formal representation before the IRS requires a credentialed representative, meaning a CPA, an enrolled agent or an attorney, and we will tell you plainly how that would be handled if your situation calls for it.",
      append: {
        requires: "irsRepresentation",
        text: "Formal representation is available through the firm: {value}.",
      },
    },
    {
      q: "What happens if a K-1 arrives after the deadline?",
      a: "It is common for partnership and private fund K-1s to arrive late, and brokerages often send corrected 1099s weeks after the originals. When a document is still outstanding near the deadline, we usually recommend an extension and estimate any balance so it can be paid on time. Once the final form arrives, we complete the return rather than filing early and amending later.",
    },
    {
      q: "How do amended returns work?",
      a: "If you find a missed form or deduction after filing, an amended return corrects it. The federal correction is filed on Form 1040-X, and California generally needs its own amended return when the change affects your state tax. Refund claims through an amendment have time limits, so it is worth raising a possible error as soon as you notice it.",
    },
    {
      q: "Can you prepare my business and personal returns together?",
      a: "Yes, and there are practical advantages. An S corporation or partnership return produces the K-1 that feeds your personal return, so preparing both in one place keeps salary, distributions and basis consistent. It also gives us the full picture when we suggest changes for the coming year.",
    },
  ],
  related: ["tax-planning", "accounting-bookkeeping", "cost-segregation-study"],
  cta: {
    heading: "Ready to hand off this year's return?",
    text: "Tell us what you filed last year and what has changed since. We will explain what to send and what preparing your return would involve.",
  },
  schema: {
    serviceType: "Tax preparation",
    description:
      "Preparation and filing of federal and California tax returns for individuals, self-employed professionals, S corporations, partnerships, LLCs and investors, including extensions, amended returns and prior-year returns.",
  },
};

export default content;
