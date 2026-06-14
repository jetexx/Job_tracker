import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

async function findOrCreateUser(email: string, name?: string) {
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: name ?? undefined,
        email,
      },
    });
  }

  return user;
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      {
        total: 0,
        interviews: 0,
        offers: 0,
        rejected: 0,
      },
      { status: 401 }
    );
  }

  const user = await findOrCreateUser(
    session.user.email,
    session.user.name ?? undefined
  );

  const total = await prisma.jobApplication.count({
    where: { userId: user.id },
  });

  const interviews = await prisma.jobApplication.count({
    where: {
      userId: user.id,
      status: "Interview",
    },
  });

  const offers = await prisma.jobApplication.count({
    where: {
      userId: user.id,
      status: "Offer",
    },
  });

  const rejected = await prisma.jobApplication.count({
    where: {
      userId: user.id,
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
