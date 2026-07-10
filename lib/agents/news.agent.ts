import {
  AnalystOpinion,
  ResearchContext,
} from "@/types";

import { GeminiService }
from "@/services/ai/gemini.service";

import { buildNewsPrompt }
from "@/lib/prompts/news.prompt";

import { NewsOpinionSchema }
from "@/lib/validations/news.schema";

export class NewsAgent {

  static async analyze(
    context: ResearchContext
  ): Promise<AnalystOpinion> {

    const prompt =
      buildNewsPrompt(
        context
      );

    return await
      GeminiService
        .generateStructured(
          prompt,
          NewsOpinionSchema
        );
  }
}