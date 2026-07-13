"use client";

import { useEffect, useState } from "react";

interface WatchlistCompany {
  ticker: string;
  name: string;

  recommendation?: string;

  score?: number;

  lastAnalyzed?: string;
}
interface WatchlistCardProps {
  onSelectCompany: (
    ticker: string
  ) => void;
}
export default function WatchlistCard({ onSelectCompany }: WatchlistCardProps) {
  const [companies, setCompanies] =
    useState<WatchlistCompany[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  async function fetchWatchlist() {
    try {
      const response = await fetch(
        "/api/v1/watchlist"
      );

      const result =
        await response.json();

      if (result.success) {
        setCompanies(
          result.data?.companies ?? []
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  async function removeCompany(
  ticker: string
) {
  try {
    await fetch(
      "/api/v1/watchlist",
      {
        method: "DELETE",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          ticker,
        }),
      }
    );

    setCompanies(
      companies.filter(
        (company) =>
          company.ticker !== ticker
      )
    );
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
      "
    >
      <h2 className="text-xl font-bold text-white">
        ⭐ Watchlist
      </h2>

      {loading && (
        <p className="mt-4 text-slate-400">
          Loading...
        </p>
      )}

      {!loading &&
        companies.length === 0 && (
          <p className="mt-4 text-slate-400">
            No companies added yet.
          </p>
        )}

      <div className="mt-4 space-y-3">
        {companies.map((company) => (
          <button
  key={company.ticker}
  onClick={() =>
    onSelectCompany(
      company.ticker
    )
  }
  className="
    w-full
    rounded-2xl
    border border-white/10
    bg-white/5
    p-4
    text-left
    hover:bg-white/10
    transition-all
    cursor-pointer
  "
>
            <div className="flex justify-between items-start">
  {/* Left Side */}
  <div>
    <p className="font-semibold text-white">
      {company.ticker}
    </p>

    <p className="text-sm text-slate-400">
      {company.name}
    </p>

    {/* Step 5: Last analyzed */}
    <p className="text-xs text-slate-500 mt-2">
      Last analyzed:
      {" "}
      {company.lastAnalyzed
        ? new Date(
            company.lastAnalyzed
          ).toLocaleDateString()
        : "Never"}
    </p>
  </div>

  {/* Right Side */}
  <div className="flex flex-col items-end gap-2">

    {/* Step 4: Recommendation Badge */}
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${
          company.recommendation ===
          "INVEST"
            ? "bg-emerald-500/20 text-emerald-400"
            : company.recommendation ===
              "PASS"
            ? "bg-red-500/20 text-red-400"
            : "bg-yellow-500/20 text-yellow-400"
        }
      `}
    >
      {company.recommendation ??
        "HOLD"}
    </span>

    {/* Score */}
    <span className="text-white font-bold">
      {company.score ?? 0}
    </span>
  </div>
</div>
          </button>

        ))
        
        }
        
      </div>
    </div>
  );
}