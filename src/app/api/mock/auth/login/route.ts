import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return NextResponse.json(
        { status: false, message: "Email and password are required" },
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

    if (email === "demo@example.com" && password === "password") {
      const user = {
        id: "user_demo",
        email: "demo@example.com",
        name: "Demo User",
        phone: "+1-555-0123",
        avatar: "/avatars/demo.jpg",
        emailVerified: true,
        createdAt: "2024-01-01T00:00:00Z",
      };

      return NextResponse.json({
        status: true,
        message: "Login successful",
        data: user,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Login failed" },
      { status: 500 }
    );
  }
}
