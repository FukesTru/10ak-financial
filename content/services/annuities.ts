import type { ServiceContent } from "@/content/types";

const content: ServiceContent = {
  slug: "annuities",
  seo: {
    title: "Annuity Rollovers & Guaranteed Income | 1Oak Financial Group",
    description:
      "Annuity rollover and guaranteed income planning in California, with surrender charges, fees and insurer claims-paying ability explained. Based in Monrovia.",
  },
  hero: {
    h1: "Annuity Rollovers and Guaranteed Retirement Income Planning in California",
    subhead:
      "We explain how fixed, indexed and income annuities work, what a rollover involves and what you give up in exchange for lifetime income, so you can decide whether one belongs in your plan at all.",
  },
  intro: {
    heading: "Turning savings into a retirement paycheck",
    paragraphs: [
      "Most people approaching retirement have spent decades building savings and very little time planning how to draw them down. Once the paychecks stop, the questions change. How much can you spend each month? What happens if markets fall in your first few years of retirement? What if you live to 95? An annuity is a contract with an insurance company that can turn part of your savings into a stream of income, and for some households it answers those questions well. For others, it adds cost and ties up money that would do more good elsewhere.",
      "We work with pre-retirees and retirees, from our Monrovia office and by video across California, who are weighing a 401(k) or IRA rollover, comparing annuity offers they've received, or wondering whether lifetime income belongs in their plan. Many are business owners or executives with sizable retirement accounts and a pension or Social Security decision ahead of them.",
      "Our role is to explain the trade-offs in plain terms, connect the decision to your [tax planning](/services/tax-planning) and the rest of your portfolio, and help you judge whether an annuity fits. Sometimes the answer is a smaller contract than you expected, or none at all.",
    ],
  },
  extras: [
    {
      type: "list",
      after: "intro",
      heading: "The three kinds of annuities we explain",
      lead: "Annuities come in a few broad types, and each one trades growth, access to your money and future income differently. Variable annuities are securities that require separate registration and are not covered on this page.",
      items: [
        {
          title: "Fixed annuities",
          text: "A fixed annuity credits a declared interest rate for a set number of years. People often compare them with bank certificates of deposit, but they are insurance contracts rather than deposits and are not FDIC-insured. When the rate period ends, the rate resets or you can move the money, subject to the contract's terms.",
        },
        {
          title: "Fixed indexed annuities",
          text: "Interest is credited based partly on how a market index performs, within limits the insurer sets and can usually adjust: a cap (the most you can be credited in a period), a participation rate (the share of the index gain that counts) or a spread (a percentage subtracted from the gain). In a year the index falls, credited interest is typically zero rather than negative, a protection from index losses that depends on the contract terms and the insurer's claims-paying ability. Because your money isn't invested in the index and dividends are usually excluded, credits in strong market years will typically be well below the index's own return.",
        },
        {
          title: "Income annuities, immediate and deferred",
          text: "You hand an insurer a lump sum in exchange for regular payments that begin within about a year (an immediate annuity) or at a later date you choose (a deferred income annuity). Payments can run for a set number of years, for your lifetime or for the joint lifetimes of a couple, and they rely on the issuing insurer's ability to pay. The trade-off is access: once you commit the premium, you generally can't get it back as a lump sum.",
        },
      ],
    },
    {
      type: "example",
      after: "included",
      heading: "How an income floor works",
      label: "Hypothetical example — illustrative only",
      paragraphs: [
        "An income floor means covering your essential expenses with income sources designed to last for life, so the rest of your portfolio can stay invested for growth and for spending you'd like to do rather than must do. Social Security and any pension form the base. An annuity is one possible way to fill what's left; delaying Social Security, a bond ladder or planned withdrawals are others.",
        "In this hypothetical, a retired couple in their late 60s spends about $9,000 a month on essentials. Their combined Social Security and a small pension provide $6,200, leaving a $2,800 monthly gap. Covering some or all of that gap with lifetime income could let them leave more of their savings invested, but the cost and terms would depend on their ages, health, interest rates and the contracts available at the time.",
      ],
      table: {
        caption: "A hypothetical couple's essential monthly expenses compared with their lifetime income sources.",
        columns: ["Monthly item", "Amount"],
        rows: [
          ["Essential expenses (housing, food, insurance, health care, taxes)", "$9,000"],
          ["Social Security, both spouses combined", "$4,800"],
          ["Pension from a former employer", "$1,400"],
          ["Total lifetime income ($4,800 + $1,400)", "$6,200"],
          ["Gap between essentials and lifetime income ($9,000 − $6,200)", "$2,800"],
        ],
      },
      footnote:
        "All figures are invented for illustration and do not reflect any actual client, product or payout rate. This is not a recommendation to buy an annuity.",
    },
    {
      type: "list",
      after: "process",
      heading: "Costs, limits and risks to weigh",
      lead: "Every annuity feature has a price, whether it shows up as a fee, a ceiling on growth or a limit on getting your money back. These are the ones we walk through before anyone signs anything.",
      items: [
        {
          title: "Surrender periods and charges",
          text: "Most deferred annuities charge a fee if you withdraw more than a small yearly allowance during the first several years. Some also apply a market value adjustment, which can raise or lower what you receive depending on how interest rates have moved since you bought.",
        },
        {
          title: "Rider fees",
          text: "Optional riders, add-on features for lifetime withdrawals or enhanced death benefits, usually carry an annual charge that comes out of your account value even in years when no interest is credited. A rider's “income base” is a number used to calculate payments, not cash you can withdraw.",
        },
        {
          title: "Liquidity",
          text: "Money committed to an annuity, and especially to an income annuity, is hard to get back quickly or cheaply. Emergency reserves and money you'll need in the next few years belong somewhere more accessible.",
        },
        {
          title: "Inflation",
          text: "A level payment buys a little less every year. Some contracts offer built-in annual increases, which typically means accepting a smaller starting payment.",
        },
        {
          title: "Insurer risk",
          text: "Any guarantees are backed by the financial strength and claims-paying ability of the issuing insurance company, not by a bank or a federal agency. We review independent financial strength ratings and may suggest spreading larger amounts across more than one insurer.",
        },
        {
          title: "How annuities are paid for",
          text: "Annuities are commonly sold on commission paid by the insurer, and that cost is built into the product's pricing rather than billed to you separately. Ask any advisor how they're compensated on a recommendation, and get the answer in writing, before you decide.",
        },
      ],
    },
  ],
  included: {
    heading: "What our annuity planning covers",
    items: [
      {
        title: "Retirement income mapping",
        text: "We line up expected Social Security, any pension, rental or business income and portfolio withdrawals against your spending, year by year, to see whether there's an income gap worth filling.",
      },
      {
        title: "Rollover planning for 401(k), 403(b) and IRA money",
        text: "Before anything moves, we look at what your current plan offers, what a move would cost you in features and fees, and how to transfer the money directly to avoid withholding and unintended tax.",
      },
      {
        title: "Side-by-side contract comparisons",
        text: "If you're holding an offer, we lay out its surrender schedule, rider fees, crediting limits and income terms in plain language, next to the alternatives, including not buying an annuity.",
      },
      {
        title: "Reviews of contracts you already own",
        text: "We check where an older annuity sits in its surrender schedule, what its riders cost and provide, and whether keeping it, drawing income from it or exchanging it makes more sense. An exchange usually starts a new surrender period, so it needs a clear reason.",
      },
      {
        title: "Tax coordination",
        text: "We look at how withdrawals or income payments will be taxed, how they interact with required minimum distributions, and how they fit alongside [Roth conversions and other tax-efficient strategies](/services/tax-free-investment).",
      },
      {
        title: "Spouse and beneficiary planning",
        text: "Joint-life payout options, death benefits and beneficiary designations decide what happens to a contract after you're gone. We review them with your survivor's income in mind and alongside any [life insurance](/services/life-insurance) you carry.",
      },
    ],
  },
  bestFor: {
    heading: "Who tends to look at annuities with us",
    profiles: [
      {
        title: "Recent retirees with a large 401(k)",
        text: "You've left your employer, the plan balance is now a big share of your net worth, and you'd rather make a deliberate decision about it than leave it on autopilot.",
      },
      {
        title: "Pre-retirees uneasy about sequence risk",
        text: "You're concerned about a market drop in the first years of retirement, when withdrawals from a falling portfolio do the most lasting damage.",
      },
      {
        title: "Couples without a pension",
        text: "Social Security may be your only lifetime income. You want to know whether adding some for essential bills would let you keep the rest of your savings invested.",
      },
      {
        title: "Owners winding down a business",
        text: "You may be closing out a [cash balance or pension plan](/services/pension-cash-balance-plans) and want to compare the plan's own annuity payout, if it offers one, with a lump-sum rollover.",
      },
    ],
  },
  process: {
    heading: "How an annuity decision comes together",
    steps: [
      {
        title: "Separate essential spending from flexible spending",
        text: "We list must-pay costs such as housing, food, insurance and taxes, then line up the lifetime income you already have against them. The size of any gap tells us whether an annuity is even worth discussing.",
      },
      {
        title: "Decide whether the money should move",
        text: "For a rollover, we look at your current plan's investment choices and costs, any company stock (which may qualify for special tax treatment a rollover would forfeit), and whether you can roll out while still employed. We also note features an IRA wouldn't keep, such as the age-55 rule, which can allow penalty-free 401(k) withdrawals if you leave your job in or after the year you turn 55.",
      },
      {
        title: "Compare a short list of contracts in writing",
        text: "If an annuity fits, we compare a few options from different insurers on surrender terms, fees, crediting limits, payout terms and financial strength ratings, and show what each one costs you in flexibility. You decide with the paperwork in front of you, not under time pressure.",
      },
      {
        title: "Transfer directly, then keep watching",
        text: "Funds move by direct transfer between institutions rather than through your bank account. Afterward we revisit the contract as part of your regular review, covering rate renewals, rider values, required distributions and whether it still fits.",
      },
    ],
  },
  goodToKnow: {
    heading: "An annuity inside an IRA adds no extra tax deferral",
    text: "An IRA or 401(k) is already tax-deferred, so placing an annuity inside one doesn't defer taxes any further. If an annuity belongs in a retirement account, the reason has to be its features, such as lifetime income or protection from index losses, weighed against its costs and surrender terms. When a sales pitch leans on tax deferral for money that's already in an IRA, treat that as a signal to ask more questions.",
  },
  conditional: [
    {
      requires: "feeStructure",
      after: "process",
      text: "How we're compensated: {value}",
    },
  ],
  licenses: ["insuranceLicense"],
  faqs: [
    {
      q: "Is an annuity right for me?",
      a: "It depends on whether you have an income gap that Social Security and any pension won't cover, how much you value predictable income over flexibility, and whether you can leave the money untouched for years. An annuity is often worth a look when essential expenses aren't covered and you're worried about outliving your savings, and it's usually a poor fit for money you may need soon. We're comfortable telling you when one doesn't fit. If you have a specific offer in hand, [schedule a call](/contact) and bring the paperwork.",
    },
    {
      q: "How does an IRA or 401(k) rollover into an annuity work?",
      a: "The cleanest route is a direct, trustee-to-trustee transfer, where your plan or IRA custodian sends the money straight to the insurer; this avoids the mandatory 20% federal withholding that applies when an employer plan pays a distribution to you. With an indirect rollover, the money comes to you first and you have 60 days to deposit it, or whatever isn't redeposited is generally taxable and may face a penalty. Indirect IRA-to-IRA rollovers are also limited to one in any 12-month period across all of your IRAs, a limit that doesn't apply to direct transfers. Whether you can roll over a 401(k) while still working depends on your plan's rules.",
    },
    {
      q: "What are surrender charges?",
      a: "A surrender charge is a fee for cancelling a deferred annuity, or withdrawing more than its free-withdrawal allowance, during the surrender period, which commonly lasts several years. The charge usually starts highest in the first year and steps down until it disappears. Exchanging an older annuity for a new one generally starts a fresh surrender period, which is one reason we look hard at any replacement.",
    },
    {
      q: "How is annuity income taxed?",
      a: "Earnings are taxed as ordinary income when withdrawn, not at capital gains rates, and withdrawals before age 59½ can also trigger a 10% federal penalty, with limited exceptions. For an annuity bought with after-tax money, part of each lifetime payment is generally treated as a return of your own principal, while withdrawals from a deferred annuity usually come from earnings first. An annuity held in an IRA follows the IRA's rules, so withdrawals are typically fully taxable. Annuities also don't receive a step-up in basis at death, so heirs generally owe income tax on the gains.",
    },
    {
      q: "What happens if the insurance company fails?",
      a: "Contractual income and protection features are only as strong as the issuing insurer's financial strength and claims-paying ability. If an insurer fails, state regulators typically step in, and California's life and health insurance guaranty association may cover part of what's owed, subject to limits and conditions set by law. That protection is limited and shouldn't be a reason to buy any contract, which is why insurer strength is part of every comparison we prepare.",
    },
    {
      q: "Can I cancel an annuity after I buy it?",
      a: "Every annuity includes a free-look period, a window after the contract is delivered when you can cancel and receive a refund as the contract describes. California generally provides a 30-day free-look period on annuities sold to people 60 and older; for younger buyers the window is usually shorter, and the exact length is printed on the contract. After that, cancelling typically means paying surrender charges until the surrender period ends.",
    },
  ],
  related: ["tax-free-investment", "life-insurance", "tax-planning"],
  cta: {
    heading: "See if an annuity fits your income plan",
    text: "Bring your statements, or the offer you're weighing, to a [free strategy call](/contact). It's a conversation about trade-offs, not a sales appointment.",
  },
  schema: {
    serviceType: "Annuity and retirement income planning",
    description:
      "Education and planning for annuity rollovers and lifetime retirement income, covering fixed, fixed indexed and income annuities along with their costs, surrender terms and tax treatment. Serving clients across California from an office in Monrovia.",
  },
};

export default content;
