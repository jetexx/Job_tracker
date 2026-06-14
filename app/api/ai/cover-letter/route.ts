import { NextResponse } from 'next/server';
import { z } from 'zod';

// Simple validation schema
const schema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  description: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = schema.parse(json);
    // In a real implementation we'd call OpenAI here. For now return a placeholder.
    const content = `Dear Hiring Team,\n\nI am excited to apply for the ${data.role} position at ${data.company}. ${data.description}\n\nSincerely,\n[Your Name]`;
    return NextResponse.json({ content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
