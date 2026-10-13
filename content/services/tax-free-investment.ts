import type { ServiceContent } from "@/content/types";

const content: ServiceContent = {
  slug: "tax-free-investment",
  seo: {
    title: "Tax-Free Investment Strategies in CA | 1Oak Financial Group",
    description:
      "Tax-free investment strategies for California earners: Roth accounts and conversions, municipal bonds and tax-efficient investing, explained from Monrovia.",
  },
  hero: {
    h1: "Tax-Free and Tax-Efficient Investment Strategies in California",
    subhead:
      "We show how Roth accounts, municipal bonds and smarter account placement can let less of your long-term growth go to taxes where the rules allow, with every condition and trade-off spelled out.",
  },
  intro: {
    heading: "Keeping more of what your investments earn",
    paragraphs: [
      "For high earners in California, taxes can quietly take a large share of investment growth. Interest, dividends and gains in a regular brokerage account may be taxed every year by the IRS and again by California, which taxes capital gains as ordinary income and has some of the highest income tax rates in the country. Over a few decades, that drag compounds.",
      "Tax-free investing is a set of tools for reducing it: Roth IRAs and Roth 401(k)s, Roth conversions, municipal bonds, and accounts such as 529 plans. None of them is free in the everyday sense. Most involve paying tax up front, meeting age or holding-period rules, or accepting lower yields and less flexibility. The value comes from matching the right tool to your bracket, timeline and goals.",
      "We work with professionals, business owners and retirees in Los Angeles and across California who want their investment decisions and their [tax planning](/services/tax-planning) to come from the same plan. Our role is to explain the strategies, model how they could affect your taxes over time, and help you decide which deserve a place in your plan.",
    ],
  },
  extras: [
    {
      type: "example",
      after: "included",
      heading: "How the main account types are taxed, side by side",
      label: "Illustrative example only",
      paragraphs: [
        "This is a simplified view of federal treatment with California differences noted. Each account has eligibility rules, contribution limits and exceptions that change over time, so use it as a starting point for a conversation rather than a rulebook.",
      ],
      table: {
        caption: "Simplified comparison for illustration. Rules, limits and exceptions apply and change.",
        columns: ["Account", "Money going in", "Growth", "Money coming out"],
        rows: [
          [
            "Taxable brokerage",
            "After-tax dollars",
            "Interest, dividends and realized gains taxed each year",
            "Gains taxed when you sell; your original cost is not",
          ],
          [
            "Traditional IRA or 401(k)",
            "Often pre-tax or deductible",
            "Tax-deferred",
            "Taxed as ordinary income; a 10% penalty may apply before 59½",
          ],
          [
            "Roth IRA or Roth 401(k)",
            "After-tax dollars",
            "Not taxed if withdrawal rules are met",
            "Qualified withdrawals tax-free",
          ],
          [
            "529 education plan",
            "After-tax dollars; no California deduction",
            "Tax-deferred",
            "Tax-free for qualified education costs; earnings on other withdrawals taxed and usually penalized",
          ],
          [
            "Health savings account (HSA)",
            "Federally deductible; taxed by California",
            "Federally untaxed; taxed each year by California",
            "Federally tax-free for qualified medical costs",
          ],
        ],
      },
      footnote:
        "Not tax advice for your situation. We confirm current federal and California rules before acting on any of these accounts.",
    },
  ],
  included: {
    heading: "Strategies we help you evaluate",
    items: [
      {
        title: "Roth IRA and Roth 401(k) contributions",
        text: "Roth accounts are funded with after-tax money, and qualified withdrawals, generally after age 59½ and once a five-year holding rule is met, come out tax-free. Direct Roth IRA contributions phase out above income limits that are set each year, while Roth 401(k) contributions have no income limit if your employer's plan offers them.",
      },
      {
        title: "Backdoor Roth contributions",
        text: "If your income is too high for a direct Roth IRA contribution, you may be able to make a nondeductible traditional IRA contribution and then convert it. The pro-rata rule matters here: if you hold other pre-tax IRA money, including SEP or SIMPLE IRAs, part of the conversion is taxable, so we check every IRA balance before you start.",
      },
      {
        title: "Roth conversion analysis",
        text: "Converting pre-tax savings to a Roth means paying income tax on the converted amount now, at federal and California rates, in exchange for tax-free qualified withdrawals later. We model amounts year by year, often focusing on lower-income stretches such as early retirement, before Social Security and required minimum distributions (the yearly withdrawals the IRS requires from pre-tax accounts) begin.",
      },
      {
        title: "Municipal bond review",
        text: "Interest on municipal bonds is generally exempt from federal income tax, and interest on California bonds is generally exempt from California tax for residents, while interest from other states' bonds is generally taxable here. We compare after-tax yields with taxable alternatives and check for bonds that could trigger the alternative minimum tax (AMT), a separate calculation that adds back certain tax breaks.",
      },
      {
        title: "Asset location across accounts",
        text: "The same portfolio can produce very different tax bills depending on which account holds which investment. Interest-heavy holdings often fit better in tax-deferred accounts, holdings with the most growth potential in Roth accounts, and tax-efficient funds in taxable accounts, though the right mix depends on your circumstances.",
      },
      {
        title: "Tax-loss harvesting and low-turnover investing",
        text: "Selling an investment at a loss can offset realized gains and a limited amount of ordinary income, with unused losses carried forward. The wash-sale rule disallows the loss if you buy a substantially identical investment within 30 days before or after the sale, including in your IRA or a spouse's account. Low-turnover funds can also reduce taxable distributions you never chose to take.",
      },
      {
        title: "HSAs and education accounts",
        text: "With a qualifying high-deductible health plan, an HSA offers federal tax benefits on contributions, growth and qualified medical withdrawals. California does not recognize those benefits, so contributions and earnings are taxed at the state level. For education savings, we coordinate 529 plans through our [college planning](/services/college-planning) work.",
      },
    ],
  },
  bestFor: {
    heading: "Who tends to benefit",
    profiles: [
      {
        title: "Earners in the top federal and California brackets",
        text: "Each dollar of interest or short-term gain may be taxed at a high combined rate, so account placement and tax-exempt income can matter more for you than for most investors.",
      },
      {
        title: "Early retirees with a few low-income years",
        text: "The gap between leaving work and starting Social Security or required distributions can be a window for measured Roth conversions.",
      },
      {
        title: "Business owners with uneven income",
        text: "A slow year may be a sensible time to convert, while a strong year may favor larger pre-tax contributions, for example to a [cash balance plan](/services/pension-cash-balance-plans).",
      },
      {
        title: "Parents and grandparents planning across generations",
        text: "Roth IRAs have no required minimum distributions for the original owner, and heirs can generally withdraw inherited Roth money tax-free within the distribution rules that apply to them.",
      },
    ],
  },
  process: {
    heading: "How we build a tax-efficient investment plan",
    steps: [
      {
        title: "Start with your tax return, not your portfolio",
        text: "Your recent returns show your bracket, where your income comes from and which thresholds you're close to. That tells us which strategies are worth modeling and which can be set aside.",
      },
      {
        title: "Sort every account by how it's taxed",
        text: "We group holdings into taxable, tax-deferred and Roth buckets, note cost basis and unrealized gains, and flag inefficiencies such as taxable bonds in a brokerage account or a pre-tax IRA balance that would complicate a backdoor Roth.",
      },
      {
        title: "Test the trade-offs over several years",
        text: "Conversions, harvesting and location changes are tested against projected brackets, Medicare premium thresholds and cash needs, so you can compare the cost now with the possible benefit later. These projections are estimates built on today's law, not predictions.",
      },
      {
        title: "Make changes in a sensible order",
        text: "We sequence moves to avoid creating tax unnecessarily, such as selling appreciated holdings just to reposition them, and revisit the plan each tax year as income, law and markets change.",
      },
    ],
  },
  goodToKnow: {
    heading: "Roth conversions can't be undone",
    text: "Since 2018, a Roth conversion can no longer be recharacterized, or reversed, so the tax is owed even if the market falls right after you convert. Conversion income can also raise Medicare premiums about two years later, increase how much of your Social Security is taxed, and affect other income-based benefits. That's why we size conversions with those effects in view and often consider converting in stages rather than all at once.",
  },
  licenses: ["securitiesRegistration"],
  faqs: [
    {
      q: 'What does "tax-free" actually mean?',
      a: "It almost always means tax-free under specific conditions, not tax-free in every case. Roth withdrawals are tax-free only when age and holding-period rules are met, and you usually paid tax on the money going in; municipal bond interest is generally free of federal tax, but gains when you sell are not, and interest from out-of-state bonds is taxable in California. Tax-exempt interest can also still count in calculations such as Medicare premiums and the taxation of Social Security benefits.",
    },
    {
      q: "Are Roth conversions worth it for me?",
      a: "They tend to make the most sense when your tax rate today is lower than you expect it to be later, when you can pay the conversion tax from savings outside the IRA, and when the money can stay invested for many years. They tend to make less sense if you expect a lower bracket in retirement, need the money soon, or would have to use the converted funds to pay the tax. A planned move out of California matters too, since converting while you're still a resident means paying California tax on the conversion. We run the numbers on your actual brackets before suggesting any amount.",
    },
    {
      q: "What are the risks?",
      a: "Tax rules can change, and a strategy built on today's law may work differently later. Municipal bonds carry interest-rate risk (prices fall when rates rise), credit risk if an issuer runs into financial trouble, and liquidity risk because some bonds trade infrequently, and concentrating in California bonds ties you to one state's finances. Roth conversions mean paying tax now for a benefit that depends on future rates and returns, and any investment can lose value no matter which account holds it.",
    },
    {
      q: "Is permanent life insurance a tax-free investment?",
      a: "Cash value inside a permanent policy grows tax-deferred, and policy loans are generally not taxable as long as the policy stays in force and isn't a modified endowment contract, a policy funded so heavily that it loses some of those tax advantages. The costs are real: insurance charges and fees slow growth, especially early on, and a policy that lapses with a loan outstanding can leave you with a tax bill. It can make sense when you also need lifelong [life insurance coverage](/services/life-insurance), but it usually shouldn't be bought for the tax features alone.",
    },
    {
      q: "How do I know if municipal bonds make sense for me?",
      a: "Start with the tax-equivalent yield, meaning what a taxable bond of similar quality and maturity would need to pay to match the municipal bond after your federal and California taxes. Municipal bonds generally look more attractive the higher your bracket, and they're usually a poor fit inside IRAs and other tax-deferred accounts, where the exemption is wasted. Credit quality, maturity and how easily you can sell matter as much as the tax benefit.",
    },
    {
      q: "Can a high earner still contribute to a Roth?",
      a: "Often, yes, through Roth contributions to a workplace plan that offers them, a backdoor Roth IRA if the pro-rata rule doesn't make it costly, or conversions of existing pre-tax savings. Each path has its own five-year rules, and if you're under 59½, every conversion starts a separate five-year clock for penalty-free access to the converted amount. [Bring your latest tax return to a call](/contact) and we'll confirm current limits and your plan's features before you act.",
    },
  ],
  related: ["tax-planning", "college-planning", "pension-cash-balance-plans"],
  cta: {
    heading: "See which strategies fit your tax picture",
    text: "Share a recent tax return and your account statements on a [free strategy call](/contact), and we'll talk through what's worth modeling, with no obligation to go further.",
  },
  schema: {
    serviceType: "Tax-efficient investment planning",
    description:
      "Planning for Roth accounts and conversions, municipal bonds, asset location and tax-loss harvesting for high-income California households, coordinated with their tax planning.",
  },
};

export default content;
