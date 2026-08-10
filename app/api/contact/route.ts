import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const {
      name,
      email,
      phone,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          message: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    console.log({
      name,
      email,
      phone,
      message,
    });

    // Later:
    // Send email using Resend / Nodemailer
    // OR
    // Save to database

    return NextResponse.json({
      success: true,
    });

  } catch {

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}