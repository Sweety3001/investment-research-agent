import { z } from "zod";

export const MarketOpinionSchema = z.object({
  summary: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  score: z.number().min(0).max(10),
  confidence: z.number().min(0).max(100),
});