import { NextResponse }
from "next/server";

import { connectDB }
from "@/lib/db/connect";

import { Watchlist }
from "@/models/watchlist.model";

export async function GET() {
  await connectDB();

  const watchlist =
    await Watchlist.findOne();

  return NextResponse.json({
    success: true,
    data: watchlist,
  });
}

export async function POST(
  request: Request
) {
  await connectDB();

  const body =
    await request.json();

  let watchlist =
    await Watchlist.findOne();

  if (!watchlist) {
    watchlist =
      await Watchlist.create({
        name: "My Watchlist",
        companies: [],
      });
  }

  const exists =
    watchlist.companies.some(
      (
        company: any
      ) =>
        company.ticker ===
        body.ticker
    );

  if (!exists) {
    watchlist.companies.push({
      ticker: body.ticker,
      name: body.name,
    });

    await watchlist.save();
  }

  return NextResponse.json({
    success: true,
    data: watchlist,
  });
}

export async function DELETE(
  request: Request
) {
  try {
    await connectDB();

    const { ticker } =
      await request.json();

    const watchlist =
      await Watchlist.findOne();

    if (!watchlist) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Watchlist not found",
        },
        { status: 404 }
      );
    }

    watchlist.companies =
      watchlist.companies.filter(
        (
          company: any
        ) =>
          company.ticker !== ticker
      );

    await watchlist.save();

    return NextResponse.json({
      success: true,
      data: watchlist,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to remove company",
      },
      { status: 500 }
    );
  }
}