import { NextResponse } from "next/server";

const mockCart = {
  id: "cart_123",
  items: [
    {
      id: "item_1",
      productId: "1",
      name: "Wireless Headphones",
      price: 199.99,
      quantity: 1,
      variant: "Black",
      image: "/products/headphones.jpg"
    },
    {
      id: "item_2",
      productId: "3",
      name: "Cotton T-Shirt",
      price: 29.99,
      quantity: 2,
      variant: "M",
      image: "/products/tshirt.jpg"
    }
  ],
  subtotal: 259.97,
  tax: 20.80,
  shipping: 9.99,
  total: 290.76,
  itemCount: 3
};

export async function GET() {
  try {
    return NextResponse.json({
      status: true,
      data: mockCart
    });
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}