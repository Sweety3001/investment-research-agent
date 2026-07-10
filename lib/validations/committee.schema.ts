import { z } from "zod";

export const CommitteeDecisionSchema =
  z.object({
    recommendation:
      z.enum(["INVEST", "PASS"]),

    confidence:
      z.number().min(0).max(100),

    overallScore:
      z.number().min(0).max(10),

    reasoning:
      z.string(),
  });