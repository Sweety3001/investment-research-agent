import {
  AnalystOpinion,
  InvestmentDecision,
} from "@/types";

import { GeminiService }
from "@/services/ai/gemini.service";

import { buildCommitteePrompt }
from "@/lib/prompts/committee.prompt";

import { CommitteeDecisionSchema }
from "@/lib/validations/committee.schema";

export class CommitteeAgent {
  static async decide(
    business: AnalystOpinion,
    financial: AnalystOpinion,
    risk: AnalystOpinion,
    market: AnalystOpinion,
    news: AnalystOpinion,
    valuation: AnalystOpinion
  ): Promise<InvestmentDecision> {

    const prompt =
      buildCommitteePrompt(
        business,
        financial,
        risk,
        market,
        news,
        valuation,
      );

    return await
      GeminiService.generateStructured(
        prompt,
        CommitteeDecisionSchema
      );
  }
}