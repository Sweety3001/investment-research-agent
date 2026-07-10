import {
  AnalystOpinion,
  ResearchContext,
} from "@/types";

import { GeminiService }
from "@/services/ai/gemini.service";

import { buildRiskPrompt }
from "@/lib/prompts/risk.prompt";

import { RiskOpinionSchema }
from "@/lib/validations/risk.schema";

export class RiskAgent {
  static async analyze(
    context: ResearchContext
  ): Promise<AnalystOpinion> {

    const prompt =
      buildRiskPrompt(context);

    return await
      GeminiService.generateStructured(
        prompt,
        RiskOpinionSchema
      );
  }
}