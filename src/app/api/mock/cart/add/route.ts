import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { productId, quantity, variant } = await request.json();

    if (!productId || !quantity) {
      return NextResponse.json(
        { status: false, message: "Product ID and quantity are required" },
        { status: 400 }
      );
    }

    // Simulate adding to cart
    const cartItem = {
      id: `item_${Date.now()}`,
      productId,
      quantity,
      variant: variant || null,
      addedAt: new Date().toISOString()
    };

    return NextResponse.json({
      status: true,
      message: "Item added to cart successfully",
      data: cartItem
    });
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}