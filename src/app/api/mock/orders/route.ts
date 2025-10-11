import { NextResponse } from "next/server";

const mockOrders = [
  {
    id: "order_001",
    orderNumber: "ORD-2024-001",
    status: "delivered",
    total: 290.76,
    items: [
      {
        productId: "1",
        name: "Wireless Headphones",
        quantity: 1,
        price: 199.99,
        image: "/products/headphones.jpg"
      },
      {
        productId: "3",
        name: "Cotton T-Shirt",
        quantity: 2,
        price: 29.99,
        image: "/products/tshirt.jpg"
      }
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    createdAt: "2024-01-15T10:30:00Z",
    deliveredAt: "2024-01-20T14:20:00Z"
  },
  {
    id: "order_002",
    orderNumber: "ORD-2024-002",
    status: "processing",
    total: 129.99,
    items: [
      {
        productId: "4",
        name: "Running Shoes",
        quantity: 1,
        price: 129.99,
        image: "/products/shoes.jpg"
      }
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    createdAt: "2024-01-22T09:15:00Z"
  }
];

export async function GET() {
  try {
    return NextResponse.json({
      status: true,
      data: {
        orders: mockOrders,
        total: mockOrders.length
      }
    });
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}