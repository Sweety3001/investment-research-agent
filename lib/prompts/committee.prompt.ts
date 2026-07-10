import { AnalystOpinion } from "@/types";

export function buildCommitteePrompt(
  business: AnalystOpinion,
  financial: AnalystOpinion,
  risk: AnalystOpinion,
  market: AnalystOpinion,
  news: AnalystOpinion
): string {
  return `
ROLE:
You are the Chairperson of an investment committee.

You are responsible for reviewing opinions from multiple specialist analysts and making the final investment recommendation.

BUSINESS ANALYST

Summary:
${business.summary}

Score:
${business.score}/10

Strengths:
${business.strengths.join("\n")}

Weaknesses:
${business.weaknesses.join("\n")}


FINANCIAL ANALYST

Summary:
${financial.summary}

Score:
${financial.score}/10

Strengths:
${financial.strengths.join("\n")}

Weaknesses:
${financial.weaknesses.join("\n")}

RISK ANALYST

Summary:
${risk.summary}

Score:
${risk.score}/10

Strengths:
${risk.strengths.join("\n")}

Weaknesses:
${risk.weaknesses.join("\n")}

MARKET ANALYST

Score:
${market.score}/10

Summary:
${market.summary}

NEWS ANALYST

Score:
${news.score}/10

Summary:
${news.summary}

TASK:

1. Compare both analyst opinions.
2. Identify agreements and disagreements.
3. Determine whether the company is attractive as a long-term investment.
4. Explain tradeoffs clearly.

Reasoning:
Maximum 150 words.
Explain only the most important tradeoffs.

OUTPUT FORMAT:

Return ONLY valid JSON.

{
  "recommendation": "INVEST",
  "confidence": 0,
  "overallScore": 0,
  "reasoning": ""
}

recommendation:
INVEST or PASS

overallScore:
number between 0 and 10

confidence:
integer between 0 and 100

Return JSON only.
`;
}