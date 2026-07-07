import { NextResponse } from "next/server";
import { ResearchService } from "@/services/research/research.service";
import { ApiResponse, InvestmentReport } from "@/types";
import { ResearchSchema } from "@/lib/validations/research.schema";

const researchService = new ResearchService();

export async function POST(request: Request) {
  const body = await request.json();
  const validation = ResearchSchema.safeParse(body);
  if (!validation.success) {
  return NextResponse.json(
    {
      success: false,
      message: "Validation failed.",
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request body.",
        details: validation.error.flatten(),
      },
    },
    { status: 400 }
  );
}
  const { company } = validation.data;

  const report = await researchService.researchCompany(company);

  const response: ApiResponse<InvestmentReport> = {
    success: true,
    message: "Research completed successfully.",
    data: report,
  };

  return NextResponse.json(response);
}