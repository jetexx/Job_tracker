import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import OpenAI from "openai";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    const pdfData = await pdfParse(buffer);

    const resumeText = pdfData.text;

    if (!resumeText) {
      return NextResponse.json(
        { error: "Could not extract text from PDF" },
        { status: 400 }
      );
    }

    const completion =
      await openai.chat.completions.create({
        model:
           "openai/gpt-oss-120b",

        messages: [
          {
            role: "system",
            content:
              "You are an expert ATS and resume reviewer.",
          },
          {
            role: "user",
            content: `
Analyze this resume.

Return exactly:

Resume Score: X/100

Technical Skills:
- skill1
- skill2

Strengths:
- point1
- point2

Weaknesses:
- point1
- point2

Missing Skills:
- skill1
- skill2

ATS Optimization Tips:
- tip1
- tip2

Resume:

${resumeText}
`,
          },
        ],
      });

    const analysis =
      completion.choices[0].message.content || "";

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    await prisma.resumeAnalysis.create({
      data: {
        userId: user.id,
        score: 0,
        analysis,
      },
    });

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error: any) {
    console.error(
      "RESUME ANALYZER ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Failed to analyze resume",
      },
      {
        status: 500,
      }
    );
  }
}