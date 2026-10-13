import type { ServiceContent } from "@/content/types";

const content: ServiceContent = {
  slug: "tax-planning",
  seo: {
    title: "Tax Planning for LA Business Owners | 1Oak Financial Group",
    description:
      "Proactive tax planning for Los Angeles business owners and high earners: entity choice, income timing, quarterly projections and California-specific rules.",
  },
  hero: {
    h1: "Proactive Tax Planning for Business Owners and High Earners in Los Angeles",
    subhead:
      "A year-round plan for the decisions that shape your tax bill, made while there is still time to act on them.",
  },
  intro: {
    heading: "Planning looks ahead. Filing looks back.",
    paragraphs: [
      "By the time a tax return is prepared, the year is over and most of the outcome is already set. The return can only report what happened: how your business was organized, when income arrived, which expenses were paid and what went into retirement accounts. Tax planning is the work done before those facts are settled, while choices about timing, structure and savings can still change the result.",
      "This service is built for owners of profitable businesses, professionals with partnership or S corporation income, and households earning well into six figures who feel that every April brings a surprise. Meetings take place in our Monrovia office or over video for clients elsewhere in Los Angeles County and throughout California, and the plan is kept current as the year unfolds rather than revisited once a year.",
      "The goal is not to chase every possible deduction. It is a short list of well-timed, well-documented decisions that fit your business and your household, carried through to your [tax return filing](/services/tax-return-filing) so nothing gets lost between the plan and the return. In a busy year that list may be long; in a quiet one it may hold two or three items, and that is perfectly fine.",
    ],
  },
  included: {
    heading: "What tax planning with us includes",
    lead: "Every plan is shaped around your income sources, but most cover these areas.",
    items: [
      {
        title: "Year-round strategy meetings",
        text: "We set a planning calendar around the dates that matter for your year, such as estimated payment deadlines, a mid-year profit review and the weeks before December 31. Each meeting ends with specific action items and a clear owner for each one.",
      },
      {
        title: "Entity choice and owner pay",
        text: "We compare how your profit would be taxed as a sole proprietor or single-member LLC versus an S corporation, where you are paid a salary through payroll and the rest of the profit passes through to you. The IRS expects S corporation owners who work in the business to receive reasonable compensation, so we weigh that salary, plus payroll costs and extra filings, against the potential self-employment tax difference.",
      },
      {
        title: "Timing of income and deductions",
        text: "Some years it may make sense to pull expenses forward or push income into the next year; in others, the reverse. We look at equipment purchases, bonuses, billing cycles, capital gains and charitable gifts in light of where your income is likely to land this year and next.",
      },
      {
        title: "Quarterly tax projections",
        text: "We estimate your federal and California liability as the year develops and set estimated payments to match, which can help you avoid underpayment penalties and a large balance due in April. Projections are refreshed whenever income shifts meaningfully.",
      },
      {
        title: "Retirement plan contributions",
        text: "Employer retirement plans are often among the larger deductions available to owners. When profits are high and steady, we may model whether a [cash balance plan](/services/pension-cash-balance-plans) alongside a 401(k) is worth its cost and long-term commitment.",
      },
      {
        title: "Real estate and depreciation",
        text: "If you own your building or rental property, we review how it is being depreciated and whether a [cost segregation study](/services/cost-segregation-study) is worth evaluating, keeping in mind that California handles depreciation differently from federal law.",
      },
      {
        title: "Household and investment coordination",
        text: "Business decisions affect the household return, and the reverse is also true. We consider brokerage gains, Roth conversion opportunities and [tax-efficient investment](/services/tax-free-investment) choices alongside the business plan so the two do not work against each other.",
      },
    ],
  },
  extras: [
    {
      type: "list",
      after: "included",
      heading: "California-specific considerations",
      lead: "Federal planning is only half the picture for California residents. These state rules come up in nearly every planning conversation we have.",
      items: [
        {
          title: "Capital gains are taxed as ordinary income",
          text: "California has no lower state rate for long-term capital gains. A large gain from selling a business, a property or a stock position is taxed at the same state rates as wages, which makes the timing and structure of a sale especially important.",
        },
        {
          title: "State and federal rules do not always match",
          text: "California does not conform to several federal provisions, including bonus depreciation, the tax treatment of health savings accounts and the federal exclusion for qualified small business stock. As a result, your California taxable income can differ noticeably from your federal figure.",
        },
        {
          title: "Estimated payments are front-loaded",
          text: "California asks for 30% of the year's required estimated tax with the first payment, 40% with the second, nothing with the third and 30% with the fourth. Federal payments are spread evenly, so a schedule that works for the IRS can still leave you short with the Franchise Tax Board in spring and early summer. California also limits the highest earners' ability to base their estimates on last year's tax, which makes a current-year projection more important.",
        },
        {
          title: "LLC franchise tax and fee",
          text: "LLCs organized, registered or doing business in California generally owe an annual minimum franchise tax, and those with higher gross receipts also owe a separate LLC fee that is based on revenue rather than profit. S corporations pay their own state tax at the entity level, so these costs belong in any comparison of business structures.",
        },
        {
          title: "The elective pass-through entity (PTE) tax",
          text: "California's elective PTE tax may let a qualifying S corporation or partnership pay state income tax at the entity level, with owners claiming a credit on their personal California returns. For owners affected by the federal cap on state and local tax deductions, this can move some of that deduction to the business level. Elections follow strict timing rules, including payments due during the year, and availability depends on current law, so we confirm the rules for the year before recommending it.",
        },
      ],
    },
  ],
  bestFor: {
    heading: "Who tends to benefit most",
    profiles: [
      {
        title: "Owners of profitable S corporations and LLCs",
        text: "Your business nets well into six figures, and you are not sure your structure or your own salary still fits how the company has grown.",
      },
      {
        title: "Physicians, attorneys and other partners with K-1 income",
        text: "Income arrives through a partnership or S corporation K-1, cash flow is uneven, and estimated payments are hard to size without a projection.",
      },
      {
        title: "Households above $400K with equity or investment income",
        text: "Stock compensation, large brokerage gains or a planned property sale can push you into a different bracket in a single year, and the timing of those events is where planning tends to matter.",
      },
      {
        title: "Owners preparing for a sale or transition",
        text: "Selling a company, bringing in a partner or stepping back toward retirement raises structure and timing questions that are far easier to address a year or more in advance.",
      },
    ],
  },
  process: {
    heading: "How a planning year unfolds",
    steps: [
      {
        title: "Baseline projection",
        text: "We start with your last two years of returns, current-year financials and pay records, and a list of what you expect to change. From that, we build a first projection of this year's federal and California tax.",
      },
      {
        title: "Ranked opportunities",
        text: "We rank the ideas that fit your situation by likely impact, cost and effort, and explain the tradeoffs of each in plain English. You decide which to pursue, and we document the reasoning.",
      },
      {
        title: "Quarterly updates before each payment",
        text: "Ahead of each estimated payment date, we update the projection with year-to-date results and adjust what you send. Larger moves, such as an S corporation election or a new retirement plan, are scheduled around the deadlines they require.",
      },
      {
        title: "Year-end moves and hand-off to filing",
        text: "In the fourth quarter, timing decisions are finalized before December 31. A written summary of what was done goes to whoever prepares your return, so the plan is reflected correctly when the return is filed.",
      },
    ],
  },
  goodToKnow: {
    heading: "Good to know",
    text: "Tax planning works within the law as it stands, and that law changes. Contribution limits, phase-outs, credits and state programs are adjusted often, sometimes mid-year, so every recommendation is checked against current federal and California rules before you act. Many strategies also carry real costs, such as added payroll, plan administration or appraisal fees, and the benefit is never certain. We show you both sides so you can decide whether a move is worth making.",
  },
  heldBack: [
    {
      id: "entityStructuring",
      title: "Entity structuring",
      text: "For owners forming a new business, adding partners or reconsidering an existing LLC or S corporation, we model the federal and California cost of each structure, including payroll, franchise tax and filing requirements. Formation and operating documents are prepared by your attorney, and we coordinate with them so the tax analysis and the legal setup match.",
    },
    {
      id: "rdTaxCredits",
      title: "R&D tax credits",
      text: "Businesses that develop or improve products, processes or software may qualify for the federal research credit, and California offers a separate research credit with its own rules. We help identify activities that may qualify, assemble the documentation the credits require and weigh the potential benefit against the cost of the study and the possibility of review.",
    },
    {
      id: "deferredSalesTrust",
      title: "Deferred sales trusts",
      text: "A deferred sales trust is an installment-sale arrangement that may allow the seller of a business, property or other appreciated asset to spread the resulting tax over time as payments are received. It requires an independent trustee and legal counsel, carries ongoing costs and real legal and tax risk, and can draw IRS scrutiny. We help you compare it with simpler approaches before any decision is made.",
    },
    {
      id: "cryptoTaxPlanning",
      title: "Cryptocurrency tax planning",
      text: "The IRS treats digital assets as property, so selling, swapping or spending them can create a taxable gain or loss, and rewards such as staking income are generally taxable when received. We help reconcile cost basis across exchanges and wallets and plan the timing of sales, keeping in mind that California taxes those gains as ordinary income.",
    },
    {
      id: "charitableRemainderTrust",
      title: "Charitable remainder trusts",
      text: "A charitable remainder trust is an irrevocable trust that pays you, or other beneficiaries you name, an income stream for life or a set term, with the remainder passing to charity. Funding it may provide a partial income tax deduction and allow appreciated assets to be sold inside the trust without immediate tax on the gain. The trust document is drafted by an attorney, and we model the tax and cash flow effects with you.",
    },
    {
      id: "foreignNationalPlanning",
      title: "Foreign national and high-net-worth planning",
      text: "For foreign nationals, residency status determines whether the United States taxes worldwide income or only certain U.S.-source income, and foreign accounts, trusts and businesses can carry separate reporting obligations with significant penalties for missed filings. We help clarify where you stand, coordinate with advisors in other countries and plan around applicable tax treaties, which vary by country.",
    },
  ],
  licenses: ["taxCredential"],
  faqs: [
    {
      q: "When should I start planning for next year?",
      a: "Ideally, as soon as this year's return is filed, because that is when you have the clearest view of what worked and what did not. Several of the most useful decisions, such as an entity election, a new retirement plan or the timing of a large sale, have deadlines that fall well before year-end. Starting mid-year or even in the fall still leaves room for meaningful moves.",
    },
    {
      q: "How is tax planning different from tax preparation?",
      a: "Preparation records what already happened and reports it correctly to the IRS and the Franchise Tax Board. Planning happens earlier and asks what should happen: how income is structured, when it is received and which deductions are set up in advance. The two are most useful together, which is why we coordinate planning with [tax return filing](/services/tax-return-filing) for clients who use both.",
    },
    {
      q: "Do I need to be a business owner to benefit?",
      a: "No. High-income employees, retirees with large account balances and investors with significant gains often face planning decisions of their own, including Roth conversions, the timing of stock sales, charitable giving and retirement withdrawals. Business owners simply tend to have more levers to work with.",
    },
    {
      q: "What does an S corporation election actually change?",
      a: "It splits an owner's profit into two parts: a reasonable salary paid through payroll and the remaining profit, which passes through to you without self-employment tax but is still subject to income tax. The tradeoff is added cost and paperwork, including payroll filings, a separate business return and California's entity-level tax. Whether the math works depends on your profit, your salary and your plans for the company, so we model it before recommending any change.",
    },
    {
      q: "Can planning help if I am selling my business or a property?",
      a: "Yes, and the earlier the conversation starts, the more options remain open. How a sale is structured, how the price is allocated among assets, whether payments are spread over several years and how California taxes the gain can all affect what you keep. We work alongside your attorney and other advisors so the tax analysis is ready before terms are final.",
    },
    {
      q: "What do you need from me to get started?",
      a: "Your last two years of federal and California returns, year-to-date business financials and recent pay or distribution records are usually enough for a first projection. If your books are behind, we may suggest bringing them current through our [accounting and bookkeeping](/services/accounting-bookkeeping) service first, since a projection depends on accurate numbers. The first step is a free strategy call, which you can request through our [contact page](/contact).",
    },
  ],
  related: ["tax-return-filing", "pension-cash-balance-plans", "cost-segregation-study"],
  cta: {
    heading: "See where planning could fit this year",
    text: "Bring last year's return and a rough sense of what is changing. We will talk through where planning may help and where it probably will not, with no obligation to continue.",
  },
  schema: {
    serviceType: "Tax planning",
    description:
      "Year-round federal and California tax planning for business owners and high-income households, covering entity choice, the timing of income and deductions, quarterly projections and state-specific rules.",
  },
};

export default content;
