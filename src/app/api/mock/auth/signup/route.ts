import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;

    if (!email || !password || !name) {
      return NextResponse.json(
        { status: false, message: "Email, password, and name are required" },
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

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { status: false, message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Simulate user creation
    const user = {
      id: `user_${Date.now()}`,
      email,
      name,
      phone: phone || null,
      createdAt: new Date().toISOString(),
      emailVerified: false
    };

    return NextResponse.json({
      status: true,
      message: "Account created successfully! Please check your email for verification.",
      data: user
    });
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to create account" },
      { status: 500 }
    );
  }
}