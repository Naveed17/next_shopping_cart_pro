import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { itemId } = await request.json();

    if (!itemId) {
      return NextResponse.json(
        { status: false, message: "Item ID is required" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: true,
      message: "Item removed from cart successfully",
      data: {
        itemId,
        removedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}