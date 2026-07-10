import { Company } from "./analysis";
import { FinancialMetrics } from "./financial-metrics";
import { NewsArticle } from "./news";
export interface ResearchContext {
  company: Company;

  financialMetrics?: FinancialMetrics;

  userQuestion: string;

  news?: NewsArticle[];

  industryOverview?: string;
}