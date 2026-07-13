import { CompanyProfile, NewsArticle } from "@/types";
import { FinancialMetrics } from "@/types";
const API_KEY = process.env.FINNHUB_API_KEY;

export class FinnhubProvider {
  static async getCompanyProfile(
    symbol: string
  ): Promise<CompanyProfile> {

    console.log(`Fetching profile for ${symbol}`);

    const response = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(
        `Finnhub API error: ${response.status}`
      );
    }

    const data = await response.json();

    console.log("Finnhub Response:");
    console.log(data);

    return {
      name: data.name ?? symbol,
      ticker: data.ticker ?? symbol,
      industry: data.finnhubIndustry ?? "Unknown",
      marketCap: data.marketCapitalization ?? 0,

      country: data.country,
      currency: data.currency,
      exchange: data.exchange,
      ipo: data.ipo,
      website: data.weburl,
      logo: data.logo,
    };
  }
  static async searchCompany(
  query: string
): Promise<string> {

  console.log(
  `Searching Finnhub for: ${query}`
);
console.log(
  `Using API Key: ${API_KEY?.slice(0, 5)}...`
);

  const response = await fetch(
    `https://finnhub.io/api/v1/search?q=${query}&token=${API_KEY}`
  );

  if (!response.ok) {
  const errorText = await response.text();

  console.log("Finnhub Search Error:");
  console.log(response.status);
  console.log(errorText);

  throw new Error(
    `Finnhub search failed: ${response.status}`
  );
}

  const data = await response.json();

  if (!data.result?.length) {
    throw new Error(
      `No company found for ${query}`
    );
  }

  return data.result[0].symbol;
}

static async getFinancialMetrics(
  symbol: string
): Promise<FinancialMetrics> {

  const response = await fetch(
    `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(
      `Financial metrics fetch failed`
    );
  }

  const data = await response.json();

  const metric = data.metric;

  return {
    peRatio: metric.peNormalizedAnnual,
    eps: metric.epsNormalizedAnnual,

    beta: metric.beta,

    revenueGrowth:
      metric.revenueGrowthTTMYoy,

    marketCap:
      metric.marketCapitalization,

    week52High:
      metric["52WeekHigh"],

    week52Low:
      metric["52WeekLow"],

    sharesOutstanding:
      metric.shareOutstanding,

    grossMargin:
  metric.grossMarginTTM,

operatingMargin:
  metric.operatingMarginTTM,

netMargin:
  metric.netProfitMarginTTM,

roe:
  metric.roeTTM,

roa:
  metric.roaTTM,

currentRatio:
  metric.currentRatioAnnual,

debtToEquity:
  metric.totalDebtToEquityAnnual,

freeCashFlowPerShare:
  metric.freeCashFlowPerShareTTM,
  };
}

static async getCompanyNews(
  symbol: string
): Promise<NewsArticle[]> {

  const today =
    new Date().toISOString().split("T")[0];

  const thirtyDaysAgo = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .split("T")[0];

  const response = await fetch(
    `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${thirtyDaysAgo}&to=${today}&token=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(
      `Finnhub company news failed: ${response.status}`
    );
  }

  const data = await response.json();

  console.log(
    "Company News Count:",
    data.length
  );

  return data.slice(0, 10).map(
  (article: any) => ({
    headline: article.headline,
    summary: article.summary,
    source: article.source,
    url: article.url,
    datetime: article.datetime,
  })
);
}
}