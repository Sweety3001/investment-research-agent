import { z } from "zod";

export const ResearchSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name is too long"),
});