export interface CompanyProfile {
  name: string;
  ticker: string;
  industry: string;
  marketCap: number;

  country?: string;
  currency?: string;
  exchange?: string;
  ipo?: string;
  website?: string;
}