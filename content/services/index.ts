import type { ServiceSlug } from "@/config/services";
import type { ServiceContent } from "@/content/types";
import taxPlanning from "./tax-planning";
import taxReturnFiling from "./tax-return-filing";
import accountingBookkeeping from "./accounting-bookkeeping";
import cfoAdvisory from "./cfo-advisory";
import costSegregationStudy from "./cost-segregation-study";
import pensionCashBalancePlans from "./pension-cash-balance-plans";
import financialRatioAnalysis from "./financial-ratio-analysis";
import strategicRiskManagement from "./strategic-risk-management";
import annuities from "./annuities";
import lifeInsurance from "./life-insurance";
import taxFreeInvestment from "./tax-free-investment";
import mortgageLoans from "./mortgage-loans";
import acceleratedMortgagePayoff from "./accelerated-mortgage-payoff";
import collegePlanning from "./college-planning";

export const serviceContent: Record<ServiceSlug, ServiceContent> = {
  "tax-planning": taxPlanning,
  "tax-return-filing": taxReturnFiling,
  "accounting-bookkeeping": accountingBookkeeping,
  "cfo-advisory": cfoAdvisory,
  "cost-segregation-study": costSegregationStudy,
  "pension-cash-balance-plans": pensionCashBalancePlans,
  "financial-ratio-analysis": financialRatioAnalysis,
  "strategic-risk-management": strategicRiskManagement,
  annuities,
  "life-insurance": lifeInsurance,
  "tax-free-investment": taxFreeInvestment,
  "mortgage-loans": mortgageLoans,
  "accelerated-mortgage-payoff": acceleratedMortgagePayoff,
  "college-planning": collegePlanning,
};
