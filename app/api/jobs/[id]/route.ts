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

// GET /api/jobs/:id
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await findOrCreateUser(
    session.user.email,
    session.user.name ?? undefined
  );

  const job = await prisma.jobApplication.findFirst({
    where: {
      id,
      userId: user.id,
    },
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
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await findOrCreateUser(
    session.user.email,
    session.user.name ?? undefined
  );

  const existingJob = await prisma.jobApplication.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!existingJob) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

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
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await findOrCreateUser(
    session.user.email,
    session.user.name ?? undefined
  );

  const existingJob = await prisma.jobApplication.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!existingJob) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await prisma.jobApplication.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
