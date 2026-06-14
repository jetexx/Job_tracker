import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const authHeader =
    req.headers.get("authorization");

  if (
    authHeader !==
    `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const baseUrl =
      process.env.NEXTAUTH_URL!;

    const response = await fetch(
      `${baseUrl}/api/gmail-sync`,
      {
        headers: {
          authorization: `Bearer ${process.env.CRON_SECRET}`,
        },
      }
    );

    const data =
      await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    

    return NextResponse.json(
      {
        error: "Cron failed",
      },
      {
        status: 500,
      }
    );
  }
  
}