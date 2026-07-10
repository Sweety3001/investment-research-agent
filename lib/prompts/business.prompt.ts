import { ResearchContext } from "@/types";
import { formatMarketCap } from "@/lib/utils/format";
export function buildBusinessPrompt(
  context: ResearchContext
): string {
  const role = `
ROLE:
You are a senior equity research analyst with expertise in evaluating businesses for long-term investments.
`;
const contextSection = `
COMPANY INFORMATION

Name: ${context.company.name}
Ticker: ${context.company.ticker}
Industry: ${context.company.industry}
Market Cap: ${formatMarketCap(context.company.marketCap)}
Country: ${context.company.country ?? "Unknown"}
Exchange: ${context.company.exchange ?? "Unknown"}
IPO Date: ${context.company.ipo ?? "Unknown"}

Financial Context:
Revenue Growth: ${
  context.financialMetrics?.revenueGrowth?.toFixed(2) ?? "Unknown"
}%

P/E Ratio: ${
  context.financialMetrics?.peRatio?.toFixed(2) ?? "Unknown"
}

Beta: ${
  context.financialMetrics?.beta?.toFixed(2) ?? "Unknown"
}

USER QUESTION:
${context.userQuestion}
`;
const task = `
TASK:

Analyze ONLY the business quality.

Focus on:

- Business model
- Competitive advantage
- Management quality
- Scalability
- Long-term growth drivers
- Key strengths
- Key weaknesses

DO NOT:
- Evaluate valuation
- Discuss P/E ratios
- Analyze profitability
- Analyze revenue growth
- Analyze stock performance
- Analyze technical indicators
- Analyze recent news
- Analyze legal or regulatory risks

Those responsibilities belong to other analysts.
`;
const output = `
OUTPUT FORMAT:

Return ONLY valid JSON.

{
  "summary": "...",
  "strengths": [],
  "weaknesses": [],
  "score": 0,
  "confidence": 0
}

score:
Integer from 0 to 10.

0 = terrible business quality
5 = average business quality
10 = exceptional business quality

confidence:
Integer from 0 to 100 representing confidence in your assessment.

Return raw JSON only.

Do not use markdown.
Do not explain the output.
Do not include additional fields.
`;

return [
  role,
  contextSection,
  task,
  output,
].join("\n");

}