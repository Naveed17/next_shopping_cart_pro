import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const name = formData.get("name") as string || "subscriber";

    if (!email) {
      return NextResponse.json(
        { status: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { status: false, message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: true,
      message: "Successfully subscribed to newsletter!",
      data: {
        email,
        name,
        subscribedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}