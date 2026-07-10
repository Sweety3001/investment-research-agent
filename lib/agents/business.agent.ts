import { GeminiService } from "@/services/ai/gemini.service";
import { buildBusinessPrompt } from "@/lib/prompts/business.prompt";
import { AnalystOpinion, ResearchContext } from "@/types";
import { AnalystOpinionSchema } from "@/lib/validations/analyst.schema";

export class BusinessAgent {
  static async analyze(
    context: ResearchContext
  ): Promise<AnalystOpinion> {

    const prompt =
      buildBusinessPrompt(context);

    const opinion =
      await GeminiService.generateStructured(
        prompt,
        AnalystOpinionSchema
      );

    return opinion;
  }
}