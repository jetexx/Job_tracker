import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const total = await prisma.jobApplication.count();

  const interviews =
    await prisma.jobApplication.count({
      where: {
        status: "Interview",
      },
    });

  const offers =
    await prisma.jobApplication.count({
      where: {
        status: "Offer",
      },
    });

  const rejected =
    await prisma.jobApplication.count({
      where: {
        status: "Rejected",
      },
    });

  return NextResponse.json({
    total,
    interviews,
    offers,
    rejected,
  });
}