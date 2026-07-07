"use client";

import { useState } from "react";
async function handleAnalyze() {
  console.log("Analyze clicked!");
}
import { InvestmentReport } from "@/types";
export default function SearchForm() {
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<InvestmentReport | null>(null);
  async function handleAnalyze() {
  if (!company.trim()) {
    setError("Please enter a company name.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await fetch("/api/v1/research", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company,
      }),
    });

    const result = await response.json();

    if (!result.success) {
  setError(result.message);
  return;
}

setReport(result.data);
  } catch (error) {
    console.error(error);
    setError("Something went wrong.");
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="w-full max-w-md space-y-4">
      <h1 className="text-3xl font-bold">AlphaForge AI</h1>

      <input
        type="text"
        placeholder="Enter company name..."
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full rounded-md border p-3"
      />
      <button
  onClick={handleAnalyze}
  className="rounded-md bg-indigo-600 px-4 py-2 text-white"
>
  Analyze
</button>
{loading && <p>Analyzing...</p>}
{error && (
  <p className="text-red-500">
    {error}
  </p>
)}
      <p>Current Company: {company}</p>
      {report && (
  <pre className="mt-6 rounded bg-gray-100 p-4 overflow-auto text-sm">
    {JSON.stringify(report, null, 2)}
  </pre>
)}
    </div>
  );
}