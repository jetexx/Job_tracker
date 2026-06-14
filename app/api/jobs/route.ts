import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/jobs – list all jobs for the current user (placeholder: returns all)
export async function GET() {
  const jobs = await prisma.jobApplication.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(jobs);
}

// POST /api/jobs – create a new job (expects userId from session, fallback to a dummy)
export async function POST(request: Request) {
  const body = await request.json();
  // In a real app we'd get userId from session; for now use first user or dummy
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: { name: 'Demo', email: 'demo@example.com' },
    });
  }
  const job = await prisma.jobApplication.create({
    data: {
      ...body,
      userId: user.id,
    },
  });
  return NextResponse.json(job);
}
