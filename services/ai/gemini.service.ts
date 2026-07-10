import { gemini } from "@/lib/llm/gemini";
import { z } from "zod";

export class GeminiService {
  static async generate(
    prompt: string
  ): Promise<string> {
    // const response =
    //   await gemini.models.generateContent({
    //     model: "gemini-2.5-flash",
    //     contents: prompt,
    //   });
    console.log("Calling Gemini...");

const response =
  await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

console.log("Gemini call completed.");
    return response.text ?? "";
  }

  static async generateStructured<T>(
    prompt: string,
    schema: z.ZodSchema<T>
  ): Promise<T> {

    const text = await this.generate(prompt);

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // const parsed = JSON.parse(cleaned);

    // console.log("Parsed Gemini Output:");
    // console.log(parsed);

    // return schema.parse(parsed);
    try {
    const parsed = JSON.parse(cleaned);

    console.log("Parsed Gemini Output:");
    console.log(parsed);

    return schema.parse(parsed);
} catch (error) {
    console.error("Structured generation failed:", error);

    throw new Error(
        "Gemini returned invalid structured output."
    );
}
  }
}