import type { ServiceContent } from "@/content/types";

const content: ServiceContent = {
  slug: "mortgage-loans",
  seo: {
    title: "Mortgage Loans in Monrovia, CA | 1Oak Financial Group",
    description:
      "Plan and compare mortgage loans in Monrovia, CA: purchase, refinance, jumbo and investment-property financing, coordinated with your taxes and cash flow.",
  },
  hero: {
    h1: "Mortgage Loans for Homebuyers, Refinancers and Investors in Monrovia",
    subhead:
      "We help you plan and compare purchase, refinance and investment-property financing with your tax return and the rest of your plan in full view.",
  },
  intro: {
    heading: "A Loan Decision That Touches Everything Else",
    paragraphs: [
      "A mortgage is usually the largest debt a household carries, yet it is often chosen in a hurry, somewhere between an accepted offer and a closing date. For business owners and high earners, there are more moving parts than a rate quote shows: how your income will be documented, how much cash you keep after closing, and how the loan fits with your [tax planning](/services/tax-planning) for the year.",
      "Our role is to help you plan and compare financing options rather than steer you toward a single product. We look at purchase loans, refinancing, jumbo loans for larger balances and financing for rental or investment property. Because we also work on the tax side, we can spot where a write-off that trims your tax bill might also shrink the income a lender is willing to count, and talk through that trade-off before you apply.",
      "Our office is in Monrovia, and video meetings work just as well, whether the property is down the street or in another corner of California. If you are still deciding whether to borrow at all, a short [conversation about your goals](/contact) is a sensible first step.",
    ],
  },
  included: {
    heading: "What Mortgage Planning With Us Covers",
    items: [
      {
        title: "Purchase loan planning",
        text: "Before you make an offer, we estimate a comfortable payment range, weigh down payment options and outline the documents a lender is likely to request, so pre-approval is less of a scramble.",
      },
      {
        title: "Refinance review: rate-and-term or cash-out",
        text: "A rate-and-term refinance replaces your loan to change its rate or length without taking money out. A cash-out refinance borrows more than you owe and pays you the difference, usually with different pricing and tighter limits on how much equity you can tap, so we compare both against simply keeping the loan you have.",
      },
      {
        title: "Jumbo loans",
        text: "A loan above the conforming limit (the ceiling for loans the government-sponsored mortgage agencies can buy) is generally called a jumbo loan. That limit is set annually and is higher in high-cost counties such as Los Angeles County, so we confirm the current figure for your property's county; jumbo programs often expect larger reserves and fuller documentation.",
      },
      {
        title: "Investment-property financing",
        text: "Loans for rental homes and small multifamily buildings are usually priced and underwritten differently from a primary residence, often with larger down payments. We test how expected rent, vacancy and expenses hold up, and whether a [cost segregation study](/services/cost-segregation-study) belongs in the conversation after you buy.",
      },
      {
        title: "Self-employed income documentation",
        text: "Lenders typically review two years of personal and business tax returns. We help you understand how your returns will read to an underwriter and organize profit-and-loss statements, K-1s and other records before you apply.",
      },
      {
        title: "Coordination with your tax and cash-flow plan",
        text: "We look at timing, such as buying in a year when reported income is unusually high or low, how much to put down versus keep liquid, and how the mortgage interest deduction may apply to you. Deduction limits exist and depend on the loan and current law, so we confirm them for your situation.",
      },
      {
        title: "Side-by-side offer comparison",
        text: "Two offers with similar rates can carry very different fees and terms. We line them up, including points (upfront fees paid to lower the rate) and lender credits, so you compare the full cost instead of the headline number.",
      },
    ],
  },
  conditional: [
    {
      requires: "lendingRelationships",
      after: "included",
      text: "When you are ready to apply, we can help arrange financing through {value}.",
    },
  ],
  licenses: ["mortgageLicense"],
  bestFor: {
    heading: "Who This Is For",
    profiles: [
      {
        title: "Move-up buyers",
        text: "Households selling one home and buying another who need to sort out timing, bridge cash and a larger loan balance at the same time.",
      },
      {
        title: "Owners with complicated returns",
        text: "S corporation shareholders, partners and sole proprietors whose taxable income looks thinner on paper than their real cash flow.",
      },
      {
        title: "Homeowners weighing a refinance",
        text: "People with an existing loan who want to know whether a lower rate, a shorter term or cash for a remodel is worth the closing costs.",
      },
      {
        title: "Rental property investors",
        text: "Investors adding a first or fifth rental who want to see how another loan changes their debt load and liquidity, the kind of picture a [financial ratio analysis](/services/financial-ratio-analysis) is built to show.",
      },
    ],
  },
  process: {
    heading: "How We Work on a Mortgage",
    steps: [
      {
        title: "Line the loan up with your tax year",
        text: "We start with your last two returns, recent pay stubs or a year-to-date profit-and-loss statement, and your goals for the property. If timing is flexible, we consider whether to apply now or after a return that better reflects your income is filed.",
      },
      {
        title: "Pre-qualify on paper",
        text: "We estimate how a lender is likely to calculate your qualifying income, your debt-to-income ratio and the reserves you would have left after closing, and we flag documentation gaps early.",
      },
      {
        title: "Compare structures and offers",
        text: "Fixed or adjustable, 15 or 30 years, points or no points, rate-and-term or cash-out: we put realistic options side by side with total costs and the break-even point for each.",
      },
      {
        title: "Stay with it through closing and after",
        text: "We help keep paperwork organized through underwriting, then fold the new payment into your budget, your tax projections and any plan to [pay the mortgage down faster](/services/accelerated-mortgage-payoff).",
      },
    ],
  },
  goodToKnow: {
    heading: "Good to Know",
    text: "Loan approval, rates and terms are always decided by the lender, based on its underwriting, your credit, the property and market conditions at the time. Careful planning can help you present your finances clearly and compare options, but it cannot promise an approval or a particular rate. Rates can also move between application and rate lock, so an early quote may not match the terms you are finally offered.",
  },
  faqs: [
    {
      q: "What credit and income do I need?",
      a: "It depends on the loan program, the property and the size of your down payment, so there is no single cutoff. Lenders weigh your credit history alongside your debt-to-income ratio, which compares your monthly debt payments, including the new mortgage, with your gross monthly income. Many programs also look at reserves, meaning the savings you would still have after closing, and jumbo loans often require more of them.",
    },
    {
      q: "When does a refinance make sense?",
      a: "Start with the break-even: divide the total closing costs by the monthly savings to see how many months it takes to earn back what you paid. If you expect to keep the loan well past that point, the refinance may be worth a closer look; if you might sell or refinance again sooner, it often is not. Resetting to a new 30-year term can also lower the payment while raising total interest, so we compare the full cost, not only the monthly figure.",
    },
    {
      q: "Can self-employed borrowers qualify?",
      a: "Many do, though the paperwork is heavier. Lenders typically average income from two years of tax returns, so the deductions that lower your tax bill can also lower the income they count toward qualifying. Some non-traditional programs use bank statements or a rental property's cash flow instead, usually at different pricing than conventional loans. We help you weigh those trade-offs with your tax strategy in view, ideally a year or more before you apply.",
    },
    {
      q: "Should I put more money down or keep more cash on hand?",
      a: "A larger down payment can lower your payment and, on some loans, help you avoid private mortgage insurance, but that cash is then locked in the house. Business owners in particular may need liquidity for slow months, estimated taxes or an opportunity they cannot predict. We look at your reserves, emergency fund and other goals before suggesting a split.",
    },
    {
      q: "Is mortgage interest still deductible?",
      a: "Interest on a qualifying home loan may be deductible if you itemize, but the law caps the amount of debt that qualifies and treats home equity borrowing differently depending on how the money is used. California's rules do not always match the federal ones. Because many households now take the standard deduction, and because these limits can change, we check the current rules against your own return.",
    },
    {
      q: "Should I choose a fixed or adjustable rate?",
      a: "A fixed-rate loan keeps the same principal and interest payment for its entire term. An adjustable-rate mortgage usually starts with a fixed period and then resets periodically based on a market index, within caps written into the loan documents. It can make sense if you expect to sell or refinance before the fixed period ends, but it shifts the risk of higher future rates onto you.",
    },
  ],
  related: ["accelerated-mortgage-payoff", "tax-planning", "financial-ratio-analysis"],
  cta: {
    heading: "Talk Through Your Next Loan Before You Apply",
    text: "Bring your last two tax returns and a rough idea of the property or loan you have in mind. We will walk through your options and the trade-offs, with no obligation to move forward.",
  },
  schema: {
    serviceType: "Mortgage loan planning",
    description:
      "Help planning and comparing purchase, refinance, jumbo and investment-property mortgage financing, coordinated with the borrower's tax and financial plan. Offered from Monrovia, California.",
  },
};

export default content;
