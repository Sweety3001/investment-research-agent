"use client";

import { useState } from "react";
import { AnalystOpinion } from "@/types";

interface AnalysisTabsProps {
  analyses: {
    Business: AnalystOpinion;
    Financial: AnalystOpinion;
    Risk: AnalystOpinion;
    Market: AnalystOpinion;
    News: AnalystOpinion;
    Valuation: AnalystOpinion;
  };
}

export default function AnalysisTabs({
  analyses,
}: AnalysisTabsProps) {

  const tabs = Object.keys(
    analyses
  ) as Array<keyof typeof analyses>;

  const [activeTab, setActiveTab] =
    useState(tabs[0]);

  const current =
    analyses[activeTab];

  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-8
      "
    >
      {/* Tabs */}
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab)
            }
            className={`
              px-4 py-2 rounded-xl
              transition-all
              ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-8">

        <h2 className="text-2xl font-bold text-white">
          {activeTab} Analysis
        </h2>

        <p className="mt-4 text-slate-300 leading-8">
          {current.summary}
        </p>

        {/* Strengths */}
        <div className="mt-8">
          <h3 className="text-emerald-400 font-semibold text-lg">
            Strengths
          </h3>

          <ul className="mt-3 space-y-2">
            {current.strengths.map(
              (item, index) => (
                <li
                  key={index}
                  className="text-slate-300"
                >
                  ✓ {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="mt-8">
          <h3 className="text-red-400 font-semibold text-lg">
            Weaknesses
          </h3>

          <ul className="mt-3 space-y-2">
            {current.weaknesses.map(
              (item, index) => (
                <li
                  key={index}
                  className="text-slate-300"
                >
                  ✕ {item}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}