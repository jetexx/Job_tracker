import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const job = await prisma.jobApplication.findUnique({
    where: { id },
  });

  return NextResponse.json(job);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const updatedJob = await prisma.jobApplication.update({
    where: { id },
    data: {
      company: body.company,
      role: body.role,
      status: body.status,
      notes: body.notes,
      jobLink: body.jobLink,
    },
  });

  return NextResponse.json(updatedJob);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.jobApplication.delete({
    where: { id },
  });

  return NextResponse.json({
    success: true,
  });
}