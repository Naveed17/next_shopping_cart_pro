import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;

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

    // Simulate password reset email sending
    return NextResponse.json({
      status: true,
      message: "Password reset instructions have been sent to your email address.",
      data: {
        email,
        resetToken: `reset_${Date.now()}`,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
        sentAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to send password reset email" },
      { status: 500 }
    );
  }
}