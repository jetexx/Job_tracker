import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import type { Session } from 'next-auth';



/**
 * Retrieves the current session on the server side.
 * Throws if no session is found (used to guard API routes).
 */
export async function requireSession(): Promise<Session> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthenticated');
  }
  return session;
}

export async function getSession() {
  return await getServerSession();
}
/**
 * Returns the user ID from the session (or throws if missing).
 */
export async function getUserId(): Promise<string> {
  const session = await requireSession();
  // next-auth session type includes user object with email/id
  // We'll use email as unique identifier and map to Prisma user later.
  if (!session.user?.email) {
    throw new Error('Session missing email');
  }
  return session.user.email;
}
