import type { AboutContent, ContactContent, HomeContent, ServicesHubContent } from "@/content/types";

/* ------------------------------------------------------------------ */
/* Homepage  /                                                         */
/* ------------------------------------------------------------------ */

export const homeContent: HomeContent = {
  seo: {
    title: "Tax & Financial Planning in Los Angeles | 1Oak Financial Group",
    description:
      "Proactive tax strategy, accounting and financial planning for Los Angeles business owners and high earners, from our Monrovia office. Book a free strategy call.",
  },

  hero: {
    h1: "Smarter Tax Strategy and Financial Planning for Business Owners and High Earners",
    subhead:
      "From our office in Monrovia, we help business owners and high-income households across California plan ahead on taxes, cash flow, protection and retirement instead of reacting every April.",
  },

  whoWeHelp: {
    heading: "Who We Help",
    lead: "Our work is built for people roughly 35 to 75 who earn well and have reached the point where taxes, investments, property and family decisions all affect one another.",
    cards: [
      {
        title: "Business Owners",
        text: "Your company is often both your largest asset and your biggest tax lever. We look at entity structure, owner pay, retirement plans and the books together, so a decision that helps the business also makes sense at home. When profits are steady and high, there may be room for more than a standard 401(k).",
        links: [
          { label: "Tax Planning", href: "/services/tax-planning" },
          { label: "CFO Advisory", href: "/services/cfo-advisory" },
          { label: "Pension & Cash Balance Plans", href: "/services/pension-cash-balance-plans" },
        ],
      },
      {
        title: "Pre-Retirees & Retirees",
        text: "The decade around retirement shapes how much of your savings you actually keep. We help you decide which accounts to draw from first, whether Roth conversions (moving pre-tax savings into a Roth account and paying the tax now so qualified withdrawals can later be tax-free) make sense, and how much of your income should arrive on a predictable schedule.",
        links: [
          { label: "Tax-Free Investment", href: "/services/tax-free-investment" },
          { label: "Annuities", href: "/services/annuities" },
          { label: "Accelerated Mortgage Payoff", href: "/services/accelerated-mortgage-payoff" },
        ],
      },
      {
        title: "Families",
        text: "Raising children in Southern California means juggling a mortgage, future tuition and the question of what happens if one income stops. We weigh those goals side by side, so saving for college doesn't quietly undercut retirement and the household has a plan if the unexpected happens.",
        links: [
          { label: "College Planning", href: "/services/college-planning" },
          { label: "Life Insurance", href: "/services/life-insurance" },
          { label: "Mortgage Loans", href: "/services/mortgage-loans" },
        ],
      },
    ],
  },

  servicesOverview: {
    heading: "Services That Work Together",
    lead: "Fourteen services in three areas, all tied to one plan for what you earn, what you own and who depends on you.",
  },

  why: {
    heading: "Why 1Oak",
    lead: "An oak stands for generations because of what happens below ground and over decades. We build financial plans the same way: a firm base, patient growth, and protection for the people who depend on you.",
    pillars: [
      {
        title: "Strong roots",
        text: "Everything starts with accurate numbers and a clear view of what you owe. [Clean, current books](/services/accounting-bookkeeping), [returns filed correctly](/services/tax-return-filing) and year-round [tax planning](/services/tax-planning) give every later decision solid ground to stand on.",
      },
      {
        title: "Steady growth",
        text: "Wealth that lasts tends to grow patiently and with an eye on taxes. We help you decide where new savings should go, from [tax-advantaged accounts](/services/tax-free-investment) to a [retirement plan for your business](/services/pension-cash-balance-plans). Those choices get revisited as your income and goals change.",
      },
      {
        title: "Lasting shade",
        text: "The real value of a strong tree is the shelter it gives. We review [life insurance](/services/life-insurance), [business and personal risk](/services/strategic-risk-management) and how what you've built can pass to the next generation, so your family and your company are better prepared if life takes a turn.",
      },
    ],
  },

  howWeWork: {
    heading: "How We Work",
    lead: "Three steps, no pressure at any point, and you decide whether to continue after each one.",
    steps: [
      {
        title: "Free Strategy Call",
        text: "We start with a no-cost conversation about where you are, what's on your mind and whether we're a good fit. You'll come away with a clearer sense of your options, whatever you decide.",
      },
      {
        title: "Review Your Full Picture",
        text: "If it makes sense to go further, we gather recent returns, statements, policies and business financials and study them side by side. This is where gaps and overlooked opportunities tend to surface.",
      },
      {
        title: "Your Written Plan and Ongoing Support",
        text: "You receive a written plan in plain English with clear priorities and next steps. We stay in touch through the year and adjust as tax law, your business and your family change.",
      },
    ],
  },

  meetTheo: {
    heading: "Meet Theo Minassian",
    bio: [
      "Theo Minassian founded 1Oak Financial Group and serves as its lead advisor, working directly with clients from the first call through every review that follows.",
      "Based in Monrovia, he brings tax strategy, accounting and financial planning to the same table, so you hear one coordinated recommendation instead of three separate opinions.",
    ],
  },

  areas: {
    heading: "Serving Clients Across California",
    lead: "Clients nearby can meet in person at our Monrovia office, and those elsewhere in Los Angeles, Orange County and the rest of California meet with us by video. See the [communities we serve](/service-areas).",
  },

  faqs: [
    {
      q: "What does a firm like 1Oak actually do?",
      a: "We bring together three kinds of work that are usually split among different people: [tax planning](/services/tax-planning) and filing, [accounting and bookkeeping](/services/accounting-bookkeeping), and financial planning for retirement, protection and family goals. Because one firm sees the whole picture, a move in one area is checked against the others before you act. Browse [all of our services](/services) to see how they fit together.",
    },
    {
      q: "Who do you typically work with?",
      a: "Business owners, high-income professionals, and people preparing for or already living in retirement, generally between 35 and 75. Households earning $200,000 or more, with at least $250,000 saved or invested, tend to get the most from coordinated planning. The real common thread is having enough moving parts that one decision affects another; [our About page](/about) explains more.",
    },
    {
      q: "What happens on the first call?",
      a: "We ask about your income, your business if you have one, your family and what prompted you to reach out, then share initial observations and possible next steps. If it looks like a fit, we explain what a deeper review would involve; if not, we say so. The call is free, and you can [request a time here](/contact).",
    },
    {
      q: "Do you work with clients outside Monrovia?",
      a: "Yes. Our only office is in Monrovia, and we're glad to meet there in person, but we also serve clients throughout Los Angeles County, Orange County and the rest of California by video and phone. Documents can be shared electronically, so distance rarely gets in the way. See the [areas we serve](/service-areas) for more.",
    },
    {
      q: "How are your fees structured?",
      a: "Fees depend on the services involved and the complexity of your situation, so we don't quote one number for everyone. We discuss them plainly on your [free strategy call](/contact), and you'll know what an engagement costs before any work begins.",
      append: { requires: "feeStructure", text: "{value}" },
    },
  ],

  cta: {
    heading: "Start with a Free Strategy Call",
    text: "Tell us a little about your situation and we'll find a time to talk. There's no cost and no obligation, just a straightforward conversation about where better planning could help.",
  },
};

/* ------------------------------------------------------------------ */
/* About  /about                                                       */
/* ------------------------------------------------------------------ */

export const aboutContent: AboutContent = {
  seo: {
    title: "About Theo Minassian | 1Oak Financial Group, Monrovia CA",
    description:
      "Meet Theo Minassian, founder of 1Oak Financial Group in Monrovia, CA, bringing tax strategy, accounting and financial planning together for Los Angeles clients.",
  },

  hero: {
    h1: "Meet Theo Minassian, Founder of 1Oak Financial Group",
    subhead:
      "Theo founded 1Oak so business owners and high-earning families could get tax, accounting and planning advice from one place, explained in plain English.",
  },

  story: {
    heading: "Why 1Oak Exists",
    paragraphs: [
      "1Oak was built around a simple idea: tax strategy, accounting and financial planning work better when they're handled under one roof. When your return, your books and your investments each sit with someone different, nobody sees the whole picture, and decisions that should connect often don't.",
      "Theo works with clients directly. You talk with the person who reviews your numbers and writes your plan, and every recommendation comes with a plain-English explanation of the trade-offs. The aim is to raise an idea in the fall, while there's still time to act, rather than discover a missed opportunity once your return is being prepared.",
      "So what can you expect? Straight answers, a written plan with clear priorities, and regular check-ins as your business, your family and the tax code change. Clients meet Theo in person at the Monrovia office or by video from anywhere in California.",
    ],
  },

  approach: {
    heading: "Our Approach",
    lead: "A few principles shape every engagement, whatever its size.",
    principles: [
      {
        title: "Proactive, not reactive",
        text: "Many of the most useful tax decisions have to be made before the year ends. We plan through the year so those options are still open when you need them.",
      },
      {
        title: "Connected advice",
        text: "A tax move should be checked against your cash flow, retirement plan and protection before you act. We look at all of them together.",
      },
      {
        title: "Plain English",
        text: "You get clear explanations, written summaries and honest trade-offs. Jargon gets translated, not used to impress.",
      },
      {
        title: "Your goals before any product",
        text: "Recommendations start from your numbers and what you want to accomplish. If something isn't right for your situation, you'll hear that from us.",
      },
    ],
  },

  whyName: {
    heading: "Why \"1Oak\"",
    paragraphs: [
      "An oak sends roots wide and deep, adds strength one ring at a time, and eventually gives shade to people who never planted it. That's the shape we want a financial plan to take: a sound tax and accounting base, steady growth over the years, and protection that reaches the next generation.",
      "The \"1\" is a reminder that it's a single tree, not a scattered grove of separate advisors. One firm, one coordinated plan, built to last for decades rather than a single tax season.",
    ],
  },

  whoWeServe: {
    heading: "Who We Serve",
    lead: "1Oak is designed for people roughly 35 to 75 with household incomes of $200,000 or more and at least $250,000 saved or invested, especially those who own a business.",
    groups: [
      {
        title: "Business owners",
        text: "Owners of profitable companies who want [proactive tax planning](/services/tax-planning), dependable [bookkeeping](/services/accounting-bookkeeping) and senior-level [CFO guidance](/services/cfo-advisory) without hiring a full-time finance department.",
      },
      {
        title: "High-income professionals and households",
        text: "Physicians, attorneys, executives and dual-income couples whose tax bills have grown faster than their planning. We focus on [tax-efficient investing](/services/tax-free-investment), the right amount of [life insurance](/services/life-insurance) and [home financing](/services/mortgage-loans) that fits the bigger picture.",
      },
      {
        title: "Pre-retirees, retirees and families",
        text: "People getting ready to turn savings into income, and parents weighing [college costs](/services/college-planning) against their own retirement. We help with [annuity rollovers and income planning](/services/annuities) and with deciding whether to [pay off the mortgage early](/services/accelerated-mortgage-payoff).",
      },
    ],
  },

  credentials: {
    heading: "Licenses and Credentials",
    lead: "The professional licenses and registrations that apply to the services described on this site are listed below.",
  },

  cta: {
    heading: "Talk It Through with Theo",
    text: "Book a free strategy call and you'll speak with Theo directly about what's on your mind, from this year's tax bill to the next decade. See whether 1Oak fits your situation, with no obligation either way.",
  },
};

/* ------------------------------------------------------------------ */
/* Services hub  /services                                             */
/* ------------------------------------------------------------------ */

export const servicesHubContent: ServicesHubContent = {
  seo: {
    title: "Financial Planning, Tax & Accounting Services | 1Oak Financial Group",
    description:
      "Tax planning, accounting, CFO advisory, retirement, insurance, mortgage and college planning for Los Angeles business owners and families, from Monrovia, CA.",
  },

  hero: {
    h1: "Tax, Accounting and Financial Planning Services in Los Angeles",
    subhead:
      "Fourteen services built around one coordinated plan for your taxes, your business and your household, delivered from Monrovia to clients across California.",
  },

  intro: {
    heading: "How Our Services Fit Together",
    paragraphs: [
      "Few financial decisions stay in one lane. Adding a [cash balance plan](/services/pension-cash-balance-plans), a pension-style plan that can allow larger deductible contributions than a 401(k) alone, changes your tax return. Refinancing a home shifts cash flow that might otherwise go toward [college savings](/services/college-planning). And the depreciation you claim on a building today, including through a [cost segregation study](/services/cost-segregation-study), affects what you may owe when you eventually sell it.",
      "Handled separately, choices like these can quietly work against each other. That's why everything here is organized around a single plan. Year-round [tax planning](/services/tax-planning) and accurate [bookkeeping](/services/accounting-bookkeeping) form the base, so advice on retirement income, insurance or a mortgage starts from real numbers rather than guesses. You might use one service or several; either way, each is checked against the rest.",
      "Clients in Monrovia, Pasadena and the wider San Gabriel Valley can meet us at our Foothill Boulevard office, while business owners and families elsewhere in Los Angeles and across California work with us by video. Not sure where to begin? The guide below is a good place to start.",
    ],
  },

  groupIntros: {
    business:
      "Tax, accounting, retirement plan and risk services for owners who want the company and the household planned as one.",
    protect:
      "Ways to turn savings into retirement income, protect the people who rely on you, and keep taxes on long-term growth in check.",
    home: "Buying, refinancing or paying off a home and saving for college, weighed against your taxes and retirement rather than in isolation.",
  },

  whereToStart: {
    heading: "How to Know Where to Start",
    lead: "Many people arrive with one pressing question. Here are three common situations and where we'd typically begin.",
    situations: [
      {
        situation: "You owe more tax than you expected",
        text: "A surprise bill usually means key decisions were made after the year had already closed. Planning ahead lets income timing, deductions and retirement contributions be set before deadlines pass.",
        service: "tax-planning",
      },
      {
        situation: "Your business is growing but the books are behind",
        text: "When records are months out of date, it's hard to price, hire or estimate taxes with any confidence. Bringing the books current is usually the first step.",
        service: "accounting-bookkeeping",
      },
      {
        situation: "Retirement is five to ten years away",
        text: "This window is when choices about converting pre-tax savings to Roth, withdrawal order and income sources tend to matter most. We often begin by mapping how each of your accounts will be taxed.",
        service: "tax-free-investment",
      },
    ],
  },

  process: {
    heading: "How an Engagement Works",
    lead: "Whether you use one service or several, the work follows the same rhythm.",
    steps: [
      {
        title: "Start with a conversation",
        text: "On a free call, we learn what prompted you to reach out and what a good outcome would look like for you. If another kind of help would serve you better, we'll tell you.",
      },
      {
        title: "Agree on scope and fees",
        text: "Before any work begins, you receive a written outline of what's included, what we need from you and what it costs. Nothing starts until you're comfortable with it.",
      },
      {
        title: "Gather and analyze",
        text: "We collect returns, statements, policies and business financials, then look across all of them for gaps, overlaps and opportunities.",
      },
      {
        title: "Put the plan to work",
        text: "We walk you through our recommendations, help set the agreed steps in motion and check in during the year so the plan keeps pace with your life and with tax law.",
      },
    ],
  },

  cta: {
    heading: "Not Sure Which Service You Need?",
    text: "You don't have to choose before we talk. Book a free strategy call and we'll help you see which services, if any, fit your situation.",
  },
};

/* ------------------------------------------------------------------ */
/* Contact  /contact                                                   */
/* ------------------------------------------------------------------ */

export const contactContent: ContactContent = {
  seo: {
    title: "Free Strategy Call | Contact 1Oak Financial Group in Monrovia, CA",
    description:
      "Book a free, no-obligation strategy call with 1Oak Financial Group in Monrovia, CA. Talk through taxes, your business and your plans, in person or by video.",
  },

  hero: {
    h1: "Book Your Free Strategy Call",
    subhead:
      "Start with a no-cost conversation, either face to face in Monrovia or over video wherever you are in the state.",
  },

  formIntro: {
    heading: "Request a Time to Talk",
    text: "Share a few basics and how you'd like us to reach you, and we'll follow up to schedule your call. A sentence or two about what's on your mind is plenty.",
  },

  callSteps: {
    heading: "What Happens on Your Call",
    steps: [
      {
        title: "We listen first",
        text: "You tell us what prompted you to reach out, whether it's a tax bill, a business decision, retirement or a family goal, and what you'd like to be different.",
      },
      {
        title: "We map the big picture",
        text: "A few questions about income, business, savings and family help us see how the pieces connect. Rough figures are fine.",
      },
      {
        title: "You get honest next steps",
        text: "We share initial thoughts and, if there's a fit, explain what working together would involve and cost. You decide what, if anything, happens next.",
      },
    ],
  },

  faqs: [
    {
      q: "Is what I share kept private?",
      a: "We treat what you tell us as confidential. Information from the form and the call is used to prepare for and follow up on your conversation, as described on our [Privacy & Disclosures](/privacy-disclosures) page. Share only what you're comfortable with; general figures are enough at this stage.",
    },
    {
      q: "Does the first call cost anything?",
      a: "No. The strategy call is free and comes with no obligation to hire us or buy anything. If you choose to move forward, you'll know the fees up front.",
    },
    {
      q: "What should I prepare?",
      a: "Your most recent tax return is helpful, along with a rough sense of your goals and any questions you've been meaning to ask. You don't need exact balances or statements, and the form only asks for basics. Please never send Social Security numbers or account numbers through the website form.",
    },
  ],
};
