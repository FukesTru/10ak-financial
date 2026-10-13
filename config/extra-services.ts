/**
 * Adjacent services held back until the owner confirms the firm offers them
 * (and holds any license they require).
 *
 * Copy for each item already lives inside the matching service page under `heldBack`.
 * Nothing here renders publicly until `confirmed` is flipped to `true`.
 */
import type { ServiceSlug } from "@/config/services";

export type ExtraService = {
  name: string;
  page: ServiceSlug;
  confirmed: boolean;
  /** Anything the owner should verify before flipping the flag. */
  note?: string;
};

export const extraServices = {
  entityStructuring: {
    name: "Entity structuring (LLC / S corporation)",
    page: "tax-planning",
    confirmed: false,
  },
  rdTaxCredits: {
    name: "R&D tax credits",
    page: "tax-planning",
    confirmed: false,
  },
  deferredSalesTrust: {
    name: "Deferred Sales Trust",
    page: "tax-planning",
    confirmed: false,
    note: "Requires coordination with a trustee and legal counsel.",
  },
  cryptoTaxPlanning: {
    name: "Cryptocurrency tax planning",
    page: "tax-planning",
    confirmed: false,
  },
  charitableRemainderTrust: {
    name: "Charitable remainder trusts",
    page: "tax-planning",
    confirmed: false,
    note: "Trust documents are drafted by an attorney.",
  },
  foreignNationalPlanning: {
    name: "Foreign national and high-net-worth individual planning",
    page: "tax-planning",
    confirmed: false,
  },
  irsRepresentation: {
    name: "IRS notice support and representation",
    page: "tax-return-filing",
    confirmed: false,
    note: "Only if a CPA, enrolled agent or attorney at the firm represents taxpayers.",
  },
  retirementPlanDesign: {
    name: "401(k), profit sharing and retirement plan design",
    page: "pension-cash-balance-plans",
    confirmed: false,
  },
  keyPersonInsurance: {
    name: "Key-person insurance",
    page: "life-insurance",
    confirmed: false,
  },
  splitDollar: {
    name: "Split-dollar arrangements",
    page: "life-insurance",
    confirmed: false,
  },
  premiumFinancing: {
    name: "Premium financing",
    page: "life-insurance",
    confirmed: false,
  },
  disabilityInsurance: {
    name: "Disability income insurance",
    page: "life-insurance",
    confirmed: false,
  },
  estatePlanning: {
    name: "Estate and wealth-transfer planning",
    page: "life-insurance",
    confirmed: false,
    note: "Estate documents are drafted by an attorney.",
  },
  captiveInsurance: {
    name: "Captive insurance",
    page: "strategic-risk-management",
    confirmed: false,
  },
  businessOverheadExpense: {
    name: "Business overhead expense coverage",
    page: "strategic-risk-management",
    confirmed: false,
  },
  financialForecasting: {
    name: "Financial forecasting",
    page: "cfo-advisory",
    confirmed: false,
  },
  growthStrategy: {
    name: "Business growth strategy",
    page: "cfo-advisory",
    confirmed: false,
  },
  successionPlanning: {
    name: "Succession planning",
    page: "cfo-advisory",
    confirmed: false,
  },
} satisfies Record<string, ExtraService>;

export type ExtraServiceId = keyof typeof extraServices;

export function isExtraConfirmed(id: ExtraServiceId): boolean {
  const service: ExtraService = extraServices[id];
  return service.confirmed;
}
