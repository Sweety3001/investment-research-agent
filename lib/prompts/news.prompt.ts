import { ResearchContext }
from "@/types";

export function buildNewsPrompt(
  context: ResearchContext
): string {

  const news =
    context.news
      ?.slice(0, 10)
      .map(
        (
          article,
          index
        ) => `
${index + 1}. ${article.headline}

Source:
${article.source}

Summary:
${article.summary}
`
      )
      .join("\n");

  return `
ROLE:

You are a senior equity news analyst.

COMPANY:

Name:
${context.company.name}

Ticker:
${context.company.ticker}

RECENT NEWS:

${news}

TASK:

Analyze recent news flow.

Focus on:

- Product launches
- Earnings reports
- Partnerships
- Regulatory developments
- Litigation
- Management changes
- Strategic announcements
- Industry developments

Do NOT analyze:

- Financial statements
- Valuation
- Business quality
- Technical indicators

OUTPUT:

Return ONLY valid JSON.

{
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "score": 0,
  "confidence": 0
}

Score Guide:

0-2:
Extremely negative news flow

3-4:
Negative news sentiment

5-6:
Neutral news flow

7-8:
Positive developments

9-10:
Strong positive catalysts

Confidence Guide:

0-30:
Very limited news coverage

31-60:
Moderate coverage

61-100:
Extensive coverage

Return JSON only.
`;
}