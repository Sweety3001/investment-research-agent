import {
  AnalystOpinion,
  ResearchContext,
} from "@/types";

import { GeminiService }
from "@/services/ai/gemini.service";

import { buildFinancialPrompt }
from "@/lib/prompts/financial.prompt";

import { FinancialOpinionSchema }
from "@/lib/validations/financial.schema";

export class FinancialAgent {

  static async analyze(
    context: ResearchContext
  ): Promise<AnalystOpinion> {

    const prompt =
      buildFinancialPrompt(context);

    return await
      GeminiService.generateStructured(
        prompt,
        FinancialOpinionSchema
      );
  }
}