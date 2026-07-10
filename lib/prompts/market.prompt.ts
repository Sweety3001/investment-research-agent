import { ResearchContext } from "@/types";

export function buildMarketPrompt(
  context: ResearchContext
): string {
  return `
ROLE:
You are a senior market strategist.

COMPANY

Name: ${context.company.name}
Ticker: ${context.company.ticker}

MARKET DATA

Market Cap:
${context.financialMetrics?.marketCap ?? "Unknown"}

P/E Ratio:
${context.financialMetrics?.peRatio ?? "Unknown"}

Beta:
${context.financialMetrics?.beta ?? "Unknown"}

52 Week High:
${context.financialMetrics?.week52High ?? "Unknown"}

52 Week Low:
${context.financialMetrics?.week52Low ?? "Unknown"}

Revenue Growth:
${context.financialMetrics?.revenueGrowth ?? "Unknown"}%

TASK:

Analyze current market sentiment and positioning.

Evaluate:

- Market expectations
- Growth expectations
- Investor sentiment
- Volatility
- Momentum implications

IMPORTANT:

Do not analyze:

- Business quality
- Financial health
- Management quality
- Legal risk

OUTPUT:

Return ONLY valid JSON:

{
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "score": 0,
  "confidence": 0
}

Market Score Guide:

0-2:
Extremely bearish sentiment

3-4:
Negative sentiment

5-6:
Neutral sentiment

7-8:
Positive sentiment

9-10:
Extremely optimistic sentiment

Return JSON only.
`;
}