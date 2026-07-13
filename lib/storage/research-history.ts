import { InvestmentReport } from "@/types";

const STORAGE_KEY = "alphaforge-history";

export function saveReport(
  report: InvestmentReport
) {
  const existing =
    getReports();

  const updated = [
    report,
    ...existing,
  ].slice(0, 10);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );
}

export function getReports():
  InvestmentReport[] {

  const data =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (!data) return [];

  return JSON.parse(data);
}