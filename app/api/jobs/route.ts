import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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

// GET /api/jobs – list all jobs for the current user
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json([], { status: 401 });
  }

  const user = await findOrCreateUser(
    session.user.email,
    session.user.name ?? undefined
  );

  const jobs = await prisma.jobApplication.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(jobs);
}

// POST /api/jobs – create a new job for the current user
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const user = await findOrCreateUser(
    session.user.email,
    session.user.name ?? undefined
  );

  const job = await prisma.jobApplication.create({
    data: {
      ...body,
      userId: user.id,
    },
  });
  return NextResponse.json(job);
}
