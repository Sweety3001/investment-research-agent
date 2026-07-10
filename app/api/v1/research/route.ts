import { NextResponse } from "next/server";
import { ResearchService } from "@/services/research/research.service";
import { ResearchSchema } from "@/lib/validations/research.schema";

const researchService = new ResearchService();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation =
      ResearchSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
          error: {
            code: "VALIDATION_ERROR",
            details:
              validation.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    const { company } = validation.data;

    const report =
      await researchService.researchCompany(
        company
      );

    return NextResponse.json({
      success: true,
      message:
        "Research completed successfully.",
      data: report,
    });

  } catch (error) {
    console.error(
      "Research Route Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal Server Error",
        error: {
          code: "INTERNAL_SERVER_ERROR",
          details: String(error),
        },
      },
      { status: 500 }
    );
  }
}