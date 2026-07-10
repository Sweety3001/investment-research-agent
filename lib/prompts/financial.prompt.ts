import { ResearchContext } from "@/types";

export function buildFinancialPrompt(
  context: ResearchContext
): string {

  return `
ROLE:
You are a senior equity financial analyst.

COMPANY INFORMATION

Name: ${context.company.name}
Ticker: ${context.company.ticker}
Industry: ${context.company.industry}

FINANCIAL METRICS

P/E Ratio:
${context.financialMetrics?.peRatio?.toFixed(2) ?? "Unknown"}

EPS:
${context.financialMetrics?.eps?.toFixed(2) ?? "Unknown"}

Revenue Growth:
${context.financialMetrics?.revenueGrowth?.toFixed(2) ?? "Unknown"}%

Beta:
${context.financialMetrics?.beta?.toFixed(2) ?? "Unknown"}

52 Week High:
${context.financialMetrics?.week52High ?? "Unknown"}

52 Week Low:
${context.financialMetrics?.week52Low ?? "Unknown"}

TASK:

Evaluate:

1. Profitability
2. Growth
3. Efficiency
4. Leverage
5. Liquidity
6. Valuation

IMPORTANT:

Evaluate financial quality, not investment attractiveness.

A company may have excellent financial quality while still being overvalued.

Do not heavily penalize valuation unless it creates substantial financial risk.
Focus on:

- Profitability
- Growth
- Valuation
- Financial stability
- Capital efficiency

IMPORTANT:

Evaluate financial quality rather than investment attractiveness.

A company may have strong financial quality while still being overvalued.

Valuation should be considered only as one factor among profitability,
growth, leverage, liquidity, and capital efficiency.

Do not assign a very low score solely because of a high P/E ratio.

Do NOT analyze:

- Business model
- Competitive advantage
- News
- Management
- Legal risks

OUTPUT FORMAT:

Return ONLY valid JSON.

{
  "summary": "...",
  "strengths": [],
  "weaknesses": [],
  "score": 0,
  "confidence": 0
}

Financial Score Rubric

0-2:
Severe financial weakness.

3-4:
Weak financial profile.

5-6:
Average financial health.

7-8:
Strong financial position.

9-10:
Exceptional financial quality.

Confidence Guidelines:

0-30:
Very limited information.

31-50:
Some important information available.

51-70:
Most major risk indicators available.

71-100:
Comprehensive risk data available.

Return JSON only.
`;
}