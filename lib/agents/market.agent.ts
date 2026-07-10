import {
  AnalystOpinion,
  ResearchContext,
} from "@/types";

import { GeminiService }
from "@/services/ai/gemini.service";

import { buildMarketPrompt }
from "@/lib/prompts/market.prompt";

import { MarketOpinionSchema }
from "@/lib/validations/market.schema";

export class MarketAgent {
  static async analyze(
    context: ResearchContext
  ): Promise<AnalystOpinion> {

    const prompt =
      buildMarketPrompt(context);

    return await
      GeminiService.generateStructured(
        prompt,
        MarketOpinionSchema
      );
  }
}