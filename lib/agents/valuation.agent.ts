import {
  AnalystOpinion,
  ResearchContext,
} from "@/types";

import { GeminiService }
from "@/services/ai/gemini.service";

import { buildValuationPrompt }
from "@/lib/prompts/valuation.prompt";

import { ValuationOpinionSchema }
from "@/lib/validations/valuation.schema";

export class ValuationAgent {
  static async analyze(
    context: ResearchContext
  ): Promise<AnalystOpinion> {

    const prompt =
      buildValuationPrompt(
        context
      );

    return await
      GeminiService.generateStructured(
        prompt,
        ValuationOpinionSchema
      );
  }
}