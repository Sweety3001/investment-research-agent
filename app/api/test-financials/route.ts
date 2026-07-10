import { NextResponse } from "next/server";
import { FinnhubProvider }
from "@/services/providers/finnhub.provider";

export async function GET() {

  const metrics =
    await FinnhubProvider.getFinancialMetrics(
      "TSLA"
    );
    

  return NextResponse.json(metrics);
}