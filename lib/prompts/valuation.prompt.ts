import { ResearchContext } from "@/types";

export function buildValuationPrompt(
  context: ResearchContext
): string {

  const metrics =
    context.financialMetrics;

  return `
ROLE:

You are a senior equity valuation analyst.

COMPANY:

Name:
${context.company.name}

Industry:
${context.company.industry}

VALUATION DATA:

P/E Ratio:
${metrics?.peRatio ?? "Unknown"}

Revenue Growth:
${metrics?.revenueGrowth ?? "Unknown"}%

EPS:
${metrics?.eps ?? "Unknown"}

Market Cap:
${metrics?.marketCap ?? "Unknown"}

TASK:

Analyze ONLY valuation.

Focus on:

- Relative valuation
- Growth expectations
- Market expectations
- Margin of safety
- Price versus fundamentals

Do NOT analyze:

- Business quality
- Leadership
- Risk
- Market sentiment
- News flow

OUTPUT FORMAT:

{
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "score": 0,
  "confidence": 0
}

Valuation Score Meaning:

0-2:
Extremely overvalued

3-4:
Overvalued

5-6:
Fairly valued

7-8:
Undervalued

9-10:
Deep value opportunity

Return JSON only.
`;
}