"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

import { InvestmentReport } from "@/types";

interface AnalystRadarProps {
  report: InvestmentReport;
}

export default function AnalystRadar({
  report,
}: AnalystRadarProps) {
  const data = [
    {
      category: "Business",
      score: report.business.score,
    },
    {
      category: "Financial",
      score: report.financial.score,
    },
    {
      category: "Risk",
      score: 10 - report.risk.score,
    },
    {
      category: "Market",
      score: report.market.score,
    },
    {
      category: "News",
      score: report.news.score,
    },
    {
      category: "Valuation",
      score: report.valuation.score,
    },
  ];

  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-8
      "
    >
      <h2 className="text-2xl font-bold text-white">
        Analyst Score Distribution
      </h2>

      <p className="mt-2 text-slate-400">
        Visual overview of strengths and weaknesses.
      </p>

      <div className="mt-8 h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />

            <PolarAngleAxis
              dataKey="category"
              tick={{
                fill: "#94a3b8",
                fontSize: 14,
              }}
            />

            <PolarRadiusAxis
              domain={[0, 10]}
              tick={{
                fill: "#64748b",
              }}
            />

            <Radar
              dataKey="score"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}