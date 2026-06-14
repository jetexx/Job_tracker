import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { classifyEmail } from "@/lib/emailclassifier";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email || !session?.accessToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

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

    const applications =
      await prisma.jobApplication.findMany({
        where: {
          userId: user.id,
        },
      });

    const auth = new google.auth.OAuth2();

    auth.setCredentials({
      access_token: session.accessToken,
    });

    const gmail = google.gmail({
      version: "v1",
      auth,
    });

    const messages =
      await gmail.users.messages.list({
        userId: "me",
        maxResults: 20,
      });

    const emails = [];

    for (const msg of messages.data.messages || []) {
      const fullMessage =
        await gmail.users.messages.get({
          userId: "me",
          id: msg.id!,
        });

      const headers =
        fullMessage.data.payload?.headers || [];

      const subject =
        headers.find(
          (h) => h.name === "Subject"
        )?.value || "No Subject";

      const from =
        headers.find(
          (h) => h.name === "From"
        )?.value || "Unknown Sender";

      const status = classifyEmail(
        subject,
        from
      );

      const searchableText =
        `${subject} ${from}`.toLowerCase();

      const matchedApplication =
        applications.find((app) =>
          searchableText.includes(
            app.company.toLowerCase()
          )
        );

      if (
        matchedApplication &&
        status
      ) {
        await prisma.jobApplication.update({
          where: {
            id: matchedApplication.id,
          },
          data: {
            status,
          },
        });
      }

      emails.push({
        subject,
        from,
        detectedStatus: status,
        matchedCompany:
          matchedApplication?.company ||
          null,
      });
    }
   
    //  await prisma.emailSyncs.create({
    //   data: {
    //     userId: user.id,
    //     emailsProcessed: emails.length,
    //   },
    // });

    return NextResponse.json({
      success: true,
      processedEmails: emails.length,
      emails,
    });
  } catch (error) {
    console.error(
      "GMAIL SYNC ERROR:",
      error
    );


    return NextResponse.json(
      {
        error: "Failed to sync Gmail",
      },
      {
        status: 500,
      }
    );
  }
}