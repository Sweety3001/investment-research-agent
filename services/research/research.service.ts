import {
  AnalystOpinion,
  InvestmentReport,
  ResearchContext,
  Source,
} from "@/types";

import { BusinessAgent } from "@/lib/agents/business.agent";
import { FinancialAgent } from "@/lib/agents/financial.agent";
import { RiskAgent } from "@/lib/agents/risk.agent";
import { CommitteeAgent } from "@/lib/agents/committee.agent";
import { MarketAgent } from "@/lib/agents/market.agent";
import { NewsAgent }
from "@/lib/agents/news.agent";
import { FinnhubProvider } from "@/services/providers/finnhub.provider";

import {
  InvestmentDecision
} from "@/types";
import { ValuationAgent } from "@/lib/agents/valuation.agent";
import { connectDB } from "@/lib/db/connect";
import { Report } from "@/models/report.model";
import { Watchlist }
from "@/models/watchlist.model";

function fallbackOpinion(): AnalystOpinion {
  return {
    summary: "Analysis failed.",
    strengths: [],
    weaknesses: [],
    score: 5,
    confidence: 0,
  };
}

export class ResearchService {
  async researchCompany(
    company: string
  ): Promise<InvestmentReport> {

    console.log("Research started...");

    // -----------------------------
    // Resolve Company
    // -----------------------------
    const symbol =
      await FinnhubProvider.searchCompany(
        company
      );

    console.log(
      "Resolved Symbol:",
      symbol
    );

    // -----------------------------
    // Company Profile
    // -----------------------------
    const companyInfo =
      await FinnhubProvider.getCompanyProfile(
        symbol
      );

    console.log(
      "Company Info:",
      companyInfo
    );

    // -----------------------------
    // Financial Metrics
    // -----------------------------
    const financialMetrics =
      await FinnhubProvider.getFinancialMetrics(
        symbol
      );

    console.log(
      "Financial Metrics:",
      financialMetrics
    );

    const newsArticles =
  await FinnhubProvider.getCompanyNews(
    symbol
  );

console.log(
  "Latest News:",
  newsArticles.length
);

    // -----------------------------
    // Shared Context
    // -----------------------------
    const context: ResearchContext = {
      company: companyInfo,
      financialMetrics,
      news: newsArticles,
      userQuestion: `Analyze ${company} for long-term investment.`,
    };

    // -----------------------------
    // Run Analysts in Parallel
    // -----------------------------
    const results =
      await Promise.allSettled([
        BusinessAgent.analyze(context),
        FinancialAgent.analyze(context),
        RiskAgent.analyze(context),
        MarketAgent.analyze(context),
        NewsAgent.analyze(context),
        ValuationAgent.analyze(context),
      ]);

    // Log failures if any
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        const names = [
          "Business",
          "Financial",
          "Risk",
          "Market",
          "News",
        ];

        console.error(
          `${names[index]} Agent Failed:`,
          result.reason
        );
      }
    });

    const business =
      results[0].status === "fulfilled"
        ? results[0].value
        : fallbackOpinion();

    const financial =
      results[1].status === "fulfilled"
        ? results[1].value
        : fallbackOpinion();

    const risk =
      results[2].status === "fulfilled"
        ? results[2].value
        : fallbackOpinion();

    const market =
  results[3].status === "fulfilled"
    ? results[3].value
    : fallbackOpinion();

    const news =
  results[4].status === "fulfilled"
    ? results[4].value
    : fallbackOpinion();

    const valuation =
  results[5].status === "fulfilled"
    ? results[5].value
    : fallbackOpinion();
    // -----------------------------
    // Investment Committee
    // -----------------------------
    // const committee =
    //   await CommitteeAgent.decide(
    //     business,
    //     financial,
    //     risk
    //   );

      let committee: InvestmentDecision;

try {
  committee = await CommitteeAgent.decide(
    business,
    financial,
    risk,
    market,
    news,
    valuation,
  );
} catch (error) {
  console.error(
    "Committee Agent Failed:",
    error
  );

  committee = {
    recommendation: "HOLD",
    overallScore: 5,
    confidence: 0,
    reasoning:
      "Committee analysis unavailable due to AI service limits.",
  };
}
    // -----------------------------
    // Sources
    // -----------------------------
    const sources: Source[] = [
  {
    name: "Finnhub Company Profile",
    url: "https://finnhub.io",
    type: "Company Data",
  },
  {
    name: "Finnhub Financial Metrics",
    url: "https://finnhub.io",
    type: "Financial Data",
  },
  {
    name: "Finnhub Company News",
    url: "https://finnhub.io",
    type: "News Data",
  },
];

    // -----------------------------
    // Final Report
    // ------ -----------------------
    const report: InvestmentReport = {
      company: companyInfo,

      generatedAt: new Date(),

      business,

      financial,

      risk,

      committee,

      market,
      news,
      newsArticles,
      valuation,

      sources,
    };
    try {
  await connectDB();

  await Report.create(report);

  console.log(
    "Report saved to MongoDB"
  );
} catch (error) {
  console.error(
    "Failed to save report:",
    error
  );
}
try {
  const watchlist =
    await Watchlist.findOne();

  if (watchlist) {
    const companyIndex =
      watchlist.companies.findIndex(
        (c: any) =>
          c.ticker ===
          companyInfo.ticker
      );

    if (companyIndex !== -1) {
      watchlist.companies[
        companyIndex
      ].recommendation =
        committee.recommendation;

      watchlist.companies[
        companyIndex
      ].score =
        committee.overallScore;

      watchlist.companies[
        companyIndex
      ].lastAnalyzed =
        new Date();

      await watchlist.save();
    }
  }
} catch (error) {
  console.error(
    "Failed to update watchlist",
    error
  );
}
return report;
  }
}