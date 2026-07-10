export interface Company {
  name: string;
  ticker: string;
  industry: string;
  marketCap: number;

  logo?: string;
  country?: string;
  currency?: string;
  exchange?: string;
  ipo?: string;
  website?: string;
}

export interface AnalystOpinion {
  // title: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  score: number; //Range(0-10)
  confidence: number; // Percentage (0-100)
}
export interface InvestmentDecision {
  recommendation: "INVEST" | "HOLD" | "PASS";
  confidence: number; // Percentage (0-100)
  overallScore: number; //Range(0-10)
  reasoning: string;
}
export interface InvestmentReport {
  company: Company;

  generatedAt: Date;

  business: AnalystOpinion;

  financial: AnalystOpinion;

  market: AnalystOpinion;

  risk: AnalystOpinion;

  valuation: AnalystOpinion;

  committee: InvestmentDecision;

  news: AnalystOpinion;
  sources: Source[];
  
}
export interface Source {
  name: string;
  url: string;
  type: "news" | "finance" | "company";
}
export interface NewsArticle {
  headline: string;
  summary: string;
  source: string;
  url: string;
  datetime: number;
}