import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/jobs/:id – fetch a single job for the current user
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const job = await prisma.jobApplication.findUnique({
    where: { id: params.id },
  });
  if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(job);
}

// PUT /api/jobs/:id – update a job (expects JSON body)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json();
  const updated = await prisma.jobApplication.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(updated);
}

// DELETE /api/jobs/:id – delete a job
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.jobApplication.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
