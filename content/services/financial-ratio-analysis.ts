import type { ServiceContent } from "@/content/types";

const content: ServiceContent = {
  slug: "financial-ratio-analysis",
  seo: {
    title: "Financial Ratio Analysis for Owners | 1Oak Financial Group",
    description:
      "Financial ratio analysis for business owners in Los Angeles: liquidity, leverage, margins and personal balance sheet measures, explained plainly from Monrovia.",
  },
  hero: {
    h1: "Advanced Financial Ratio Analysis to Strengthen Your Business and Personal Balance Sheet",
    subhead:
      "We turn your financial statements into a short set of measures that show where your business and household are strong, where they are stretched and what to look at next.",
  },
  intro: {
    heading: "What your statements are trying to tell you",
    paragraphs: [
      "Most owners see a profit and loss statement every month and a balance sheet far less often. Neither tells the full story by itself. Ratios connect the two: how quickly customers pay, how much debt the business carries relative to its earnings, how much of each sales dollar survives as profit. Tracked over time, those relationships can reveal a problem, or an opportunity, well before it shows up in the bank balance.",
      "Our ratio analysis is built for owners who want to make decisions with more than instinct, whether that means raising prices, adding a hire, taking on a loan or tightening collections. We calculate the measures that matter for your industry, compare them with your own history and with published industry data where it exists, and explain in plain English what each one suggests.",
      "Because so much of an owner's wealth is often tied to the company, we look at the household balance sheet too. Whether your business is a few miles from Monrovia or across Los Angeles County, the analysis is only as reliable as the books behind it, which is where [accounting and bookkeeping](/services/accounting-bookkeeping) comes in.",
    ],
  },
  included: {
    heading: "The ratios we review",
    lead: "Each group answers a different question about your business. We focus on the handful that matter most for your industry rather than burying you in dozens.",
    items: [
      {
        title: "Liquidity: current and quick ratios",
        text: "The current ratio compares short-term assets with bills due within a year. The quick ratio leaves out inventory, showing whether you could meet those bills without first selling stock.",
      },
      {
        title: "Leverage: debt-to-equity and debt-to-EBITDA",
        text: "Debt-to-equity shows how much of the business is financed by lenders versus owners. Debt-to-EBITDA compares debt with earnings before interest, taxes, depreciation and amortization, a rough gauge lenders use to judge how heavy a debt load is.",
      },
      {
        title: "Profitability: margins and returns",
        text: "Gross margin shows what remains after the direct cost of what you sell; net margin shows what remains after everything. Return on assets and return on equity measure how hard the money tied up in the business is working.",
      },
      {
        title: "Efficiency: how cash moves through the business",
        text: "Days sales outstanding measures how long customers take to pay, inventory turnover shows how quickly stock sells, and days payable outstanding tracks how long you take to pay suppliers. Together they show how long cash is tied up in operations.",
      },
      {
        title: "Coverage: debt service and interest",
        text: "The debt service coverage ratio compares available cash flow with required loan payments, principal and interest together, while interest coverage compares operating earnings with interest alone. Both often appear in loan covenants, the financial conditions written into a loan agreement.",
      },
      {
        title: "Personal balance sheet ratios",
        text: "For owners, we add savings rate, household debt-to-income, months of liquid reserves and the share of net worth tied up in the business. These show whether the household could absorb a slow year at the company.",
      },
      {
        title: "Benchmarking and trend review",
        text: "We compare results with your own prior periods and with published industry data where reliable figures exist. A steady trend in your own numbers is often more telling than any single outside comparison.",
      },
    ],
  },
  extras: [
    {
      type: "example",
      after: "included",
      heading: "What a ratio summary can look like",
      label: "Illustrative example only",
      paragraphs: [
        "Below is a simplified summary for a hypothetical regional distribution business. The values are invented to show how ratios lead to questions rather than conclusions.",
        "Read together, several of these numbers tell one story. Roughly 70 days of inventory (365 days divided by a turnover of 5.2), plus 52 days to collect, minus 28 days to pay suppliers, means cash is tied up for about 94 days before it returns. Collecting even a week faster would free up working capital without new borrowing.",
      ],
      table: {
        caption: "Hypothetical ratio summary for an illustrative distribution company",
        columns: ["Ratio", "What it measures", "Illustrative business", "Question it raises"],
        rows: [
          [
            "Current ratio",
            "Current assets compared with current liabilities",
            "1.3",
            "How much of that cushion is cash and receivables, and how much is inventory?",
          ],
          [
            "Quick ratio",
            "Liquid assets, excluding inventory, compared with current liabilities",
            "0.8",
            "Could the business cover a slow month without leaning on its credit line?",
          ],
          [
            "Days sales outstanding",
            "Average number of days to collect from customers",
            "52 days",
            "If terms are net 30, which customers are paying late?",
          ],
          [
            "Inventory turnover",
            "How many times inventory sells and is replaced in a year",
            "5.2x",
            "Which product lines sit on the shelf the longest?",
          ],
          [
            "Days payable outstanding",
            "Average number of days taken to pay suppliers",
            "28 days",
            "Are early-payment discounts worth more than holding cash longer?",
          ],
          [
            "Gross margin",
            "Share of revenue left after direct costs",
            "31% (34% two years earlier)",
            "Have supplier costs risen faster than prices?",
          ],
          [
            "Debt service coverage",
            "Cash flow available compared with annual loan payments",
            "1.4x",
            "How much room is there before a loan covenant would come into play?",
          ],
        ],
      },
      footnote:
        "All figures are hypothetical and are not industry benchmarks. Healthy ranges vary widely by industry, business model and company size, so we interpret each ratio against your own history and circumstances.",
    },
  ],
  bestFor: {
    heading: "Who gets the most from it",
    profiles: [
      {
        title: "Owners preparing to borrow or refinance",
        text: "Companies heading into a bank conversation that want to see their numbers the way a lender will before the application goes in.",
      },
      {
        title: "Profitable companies that always seem short of cash",
        text: "Businesses that look healthy on paper but feel tight every month, often because receivables or inventory are quietly absorbing the cash.",
      },
      {
        title: "Established firms with a few years of history",
        text: "Companies with at least two or three years of financial statements, enough to show trends rather than a single snapshot.",
      },
      {
        title: "Households where the business is most of the net worth",
        text: "Owners whose company, or the building it occupies, makes up most of what they own, a concentration we also address in [strategic risk management](/services/strategic-risk-management).",
      },
    ],
  },
  process: {
    heading: "How the analysis comes together",
    steps: [
      {
        title: "Gather statements and debt details",
        text: "We start with two to three years of balance sheets, income statements and tax returns, a schedule of loans and a snapshot of personal assets and debts. If the books need cleanup first, we say so before calculating anything.",
      },
      {
        title: "Calculate and normalize",
        text: "We compute the ratios, then adjust for one-time items, owner-related expenses run through the business and unusual years, so the results reflect how the company actually operates.",
      },
      {
        title: "Compare and interpret",
        text: "Each ratio is set against your own trend and, where useful, industry data. You receive a short written summary that ranks the issues by how much they matter, not a stack of spreadsheets.",
      },
      {
        title: "Turn findings into decisions",
        text: "We meet to agree on a few concrete moves, such as a pricing change, a collections policy or a debt paydown, and set a schedule for tracking them. Ongoing monitoring can become part of [CFO advisory](/services/cfo-advisory) work.",
      },
    ],
  },
  goodToKnow: {
    heading: "Ratios raise questions; they rarely answer them alone",
    text: "A ratio is only as accurate as the statements behind it, and it describes the past rather than the future. Industry comparisons can mislead when your business model differs from the typical company in your category, and a single strong or weak number seldom justifies a major decision on its own. We use ratios to focus the conversation, then test any change against your cash flow and goals.",
  },
  faqs: [
    {
      q: "Which ratios matter most for my business?",
      a: "It depends on how your business makes money. A distributor or manufacturer usually watches inventory turnover and gross margin closely, a professional services firm focuses on collections and revenue per employee, and a company carrying real estate or equipment loans pays close attention to debt service coverage. We start with the five or six measures that drive your results and add others only when they help.",
    },
    {
      q: "How often should ratios be reviewed?",
      a: "Quarterly is a sensible rhythm for many owner-led businesses, with a deeper annual review alongside year-end tax work. Companies with loan covenants, rapid growth or tight cash may benefit from monthly tracking of a few key measures. Personal balance sheet ratios usually need attention once or twice a year, or after a major change such as a home purchase or the sale of a business.",
    },
    {
      q: "Will this help me qualify for financing?",
      a: "It can make you a better-prepared borrower, though no analysis can assure a yes or set the terms, since each lender applies its own criteria. Knowing your debt service coverage, leverage and liquidity before you apply lets you address weak spots, explain one-time items and request a realistic loan amount. The same preparation applies to personal borrowing, where lenders look closely at debt-to-income when you apply for a [mortgage](/services/mortgage-loans).",
    },
    {
      q: "What do I need to provide?",
      a: "Two to three years of year-end financial statements and tax returns, the most recent interim statements, and a list of loans with balances, rates and payments. For the personal side, a summary of accounts, property and debts is enough to start. If you are unsure whether your records are ready, [ask us](/contact) before gathering anything.",
    },
    {
      q: "How do loan covenants work?",
      a: "Many business loans include covenants, conditions such as a minimum debt service coverage or a maximum leverage ratio that must be maintained and reported. Falling outside them can lead to fees, tighter terms or, in some cases, a default, even when every payment has been made on time. We help you track covenant ratios between reporting dates so there are fewer surprises.",
    },
    {
      q: "Can ratio analysis help if I'm thinking about selling the business?",
      a: "It can. Buyers and their advisors study margins, customer concentration, working capital and debt levels, and the trend in those measures can shape how they view the company. Reviewing them a few years before a sale gives you time to improve what you can, although valuation itself is a separate exercise usually handled by a qualified appraiser.",
    },
  ],
  related: ["cfo-advisory", "accounting-bookkeeping", "strategic-risk-management"],
  cta: {
    heading: "Find out what your numbers are saying",
    text: "Start with your last two or three years of statements, and we'll point out the ratios worth a closer look and the questions they raise.",
  },
  schema: {
    serviceType: "Financial ratio analysis",
    description:
      "Analysis of liquidity, leverage, profitability, efficiency and coverage ratios for small and mid-sized businesses, paired with personal balance sheet measures for their owners.",
  },
};

export default content;
