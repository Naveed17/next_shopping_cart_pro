import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { itemId, quantity } = await request.json();

    if (!itemId || quantity === undefined) {
      return NextResponse.json(
        { status: false, message: "Item ID and quantity are required" },
        { status: 400 }
      );
    }

    if (quantity < 0) {
      return NextResponse.json(
        { status: false, message: "Quantity cannot be negative" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: true,
      message: "Cart item updated successfully",
      data: {
        itemId,
        quantity,
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to update cart item" },
      { status: 500 }
    );
  }
}