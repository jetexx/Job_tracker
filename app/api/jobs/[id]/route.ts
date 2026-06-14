import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/jobs/:id
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const job = await prisma.jobApplication.findUnique({
    where: { id },
  });

  if (!job) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(job);
}

// PUT /api/jobs/:id
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const data = await request.json();

  const updated = await prisma.jobApplication.update({
    where: { id },
    data,
  });

  return NextResponse.json(updated);
}

// DELETE /api/jobs/:id
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.jobApplication.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}