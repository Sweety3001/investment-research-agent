import { NextResponse } from "next/server";
import { FinnhubProvider }
from "@/services/providers/finnhub.provider";

export async function GET() {
  try {
    const company =
      await FinnhubProvider.getCompanyProfile(
        "TSLA"
      );

    return NextResponse.json(company);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: String(error),
      },
      { status: 500 }
    );
  }
}