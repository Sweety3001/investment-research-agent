"use client";
import { ResearchApi } from "@/services/api/research.api";
import { useEffect, useState } from "react";
import { InvestmentReport } from "@/types";
import CompanyHero from "../dashboard/CompanyHero";
import CommitteeCard from "../dashboard/CommitteeCard";
import AnalystCard from "@/components/dashboard/AnalystCard";
import AnalysisTabs from "@/components/dashboard/AnalysisTabs";
import SourcesCard from "@/components/dashboard/SourcesCard";
import ResearchLoader from "@/components/landing/ResearchLoader";
import NewsTimeline from "@/components/dashboard/NewsTimeline";
import AnalystRadar from "@/components/dashboard/AnalystRadar";
import ExportPdfButton from "@/components/dashboard/ExportPdfButton";
import { exportReportPdf } from "@/lib/pdf/export-report";
import { saveReport, getReports } from "@/lib/storage/research-history";
import ResearchHistory from "../dashboard/ResearchHistory";
import WatchlistCard from "@/components/dashboard/WatchlistCard";

export default function SearchForm() {
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<InvestmentReport | null>(null);
  const [history, setHistory] = useState<InvestmentReport[]>([]);

  useEffect(() => {
    setHistory(getReports());
  }, []);

  async function handleAnalyze(
  companyName?: string
) {
  const targetCompany =
    companyName ?? company;

  if (!targetCompany.trim()) {
    setError(
      "Please enter a company name."
    );
    return;
  }

  setLoading(true);
  setError("");

  try {
    const result =
      await ResearchApi.analyze(
        targetCompany
      );

    if (!result.success) {
      setError(result.message);
      return;
    }

    setReport(result.data!);
    saveReport(result.data!);
    setHistory(getReports());
  } catch (error) {
    console.error(error);
    setError(
      "Something went wrong."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 space-y-12">
      {/* Hero / Search Section */}
      <div className="min-h-[50vh] flex flex-col justify-center items-center text-center">
        <div className="
          inline-flex
          items-center
          rounded-full
          border border-white/10
          bg-white/5
          px-4 py-2
          backdrop-blur-xl
          text-sm text-slate-300
        ">
          Multi-Agent Equity Research System
        </div>

        <h1 className="
          mt-8
          text-6xl
          md:text-8xl
          font-black
          tracking-tight
          bg-gradient-to-r
          from-white
          via-slate-200
          to-slate-400
          bg-clip-text
          text-transparent
        ">
          AlphaForge AI
        </h1>

        <p className="
          mt-6
          max-w-2xl
          text-lg
          text-slate-400
          leading-8
        ">
          Institutional-grade investment research powered by specialized AI analysts 
          covering business quality, financial strength, market sentiment, risks, valuation and news flow.
        </p>

        {/* Search Box */}
        <div className="mt-12 w-full max-w-2xl flex gap-4">
          <input
            type="text"
            placeholder="Analyze Tesla, Nvidia, Apple..."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="
              flex-1
              rounded-2xl
              border border-white/10
              bg-white/5
              backdrop-blur-xl
              px-6
              py-5
              text-white
              placeholder:text-slate-500
              outline-none
              focus:border-indigo-500/50
            "
          />

          <button
            onClick={() => handleAnalyze()}
            disabled={loading}
            className="
              rounded-2xl
              bg-indigo-600
              px-8
              py-5
              font-semibold
              hover:bg-indigo-500
              transition-all
              disabled:opacity-50
              min-w-[120px]
              flex
              items-center
              justify-center
            "
          >
            {loading ? <ResearchLoader /> : "Analyze"}
          </button>
        </div>

        {error && <p className="mt-4 text-red-400">{error}</p>}
      </div>

      {/* Main Content Layout (Report + Sidebar) */}
      {report && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Side: Report View (Takes 3 columns on desktop) */}
          <div id="research-report" className="lg:col-span-3 space-y-10">
            <CompanyHero company={report.company} />
            
            <CommitteeCard committee={report.committee} />
            
            <div className="flex justify-end">
              <ExportPdfButton
                onExport={() => exportReportPdf("research-report", report.company.ticker)}
              />
            </div>

            <AnalystRadar report={report} />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnalystCard title="Business" opinion={report.business} />
              <AnalystCard title="Financial" opinion={report.financial} />
              <AnalystCard title="Risk" opinion={report.risk} />
              <AnalystCard title="Market" opinion={report.market} />
              <AnalystCard title="News" opinion={report.news} />
              <AnalystCard title="Valuation" opinion={report.valuation} />
            </div>

            <AnalysisTabs
              analyses={{
                Business: report.business,
                Financial: report.financial,
                Risk: report.risk,
                Market: report.market,
                News: report.news,
                Valuation: report.valuation,
              }}
            />

            <NewsTimeline articles={report.newsArticles ?? []} />

            <SourcesCard sources={report.sources} />
          </div>

          {/* Right Side: Widgets & Context Sidebar (Takes 1 column on desktop) */}
          <div className="lg:col-span-1 space-y-8 sticky top-6">
            <WatchlistCard
  onSelectCompany={(ticker) => {
    setCompany(ticker);
    handleAnalyze(ticker);
  }}
/>
            <ResearchHistory reports={history} />
          </div>

        </div>
      )}
    </div>
  );
}