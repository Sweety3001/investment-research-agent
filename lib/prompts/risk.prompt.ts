import { ResearchContext } from "@/types";

export function buildRiskPrompt(
  context: ResearchContext
): string {
  return `
ROLE:
You are a senior investment risk analyst.

COMPANY INFORMATION

Name: ${context.company.name}
Ticker: ${context.company.ticker}
Industry: ${context.company.industry}
Country: ${context.company.country ?? "Unknown"}

RISK DATA

Beta:
${context.financialMetrics?.beta?.toFixed(2) ?? "Unknown"}

Debt To Equity:
${context.financialMetrics?.debtToEquity?.toFixed(2) ?? "Unknown"}

Revenue Growth:
${context.financialMetrics?.revenueGrowth?.toFixed(2) ?? "Unknown"}%

TASK:

Analyze ONLY investment risk.

Evaluate:

1. Business Risk
2. Financial Risk
3. Market Risk
4. Regulatory Risk
5. Leadership Risk

Focus on downside scenarios and failure modes.

IMPORTANT:

Risk score meaning:

0-2:
Extremely high risk

3-4:
High risk

5-6:
Moderate risk

7-8:
Low risk

9-10:
Very low risk

Higher score means LOWER risk.

Do NOT analyze:

- Business quality
- Financial strength
- Valuation
- Stock price targets
- Technical analysis

OUTPUT FORMAT:

Return ONLY valid JSON.

{
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "score": 0,
  "confidence": 0
}

Return raw JSON only.
`;
}