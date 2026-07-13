import { NextResponse }
from "next/server";

import { connectDB }
from "@/lib/db/connect";

import { Report }
from "@/models/report.model";

export async function GET() {

  await connectDB();

  const reports =
    await Report.find()
      .sort({
        createdAt: -1,
      })
      .limit(10);

  return NextResponse.json({
    success: true,
    data: reports,
  });
}