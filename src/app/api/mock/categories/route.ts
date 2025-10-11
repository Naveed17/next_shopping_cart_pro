import { NextResponse } from "next/server";

const mockCategories = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest gadgets and electronic devices",
    image: "/categories/electronics.jpg",
    productCount: 150
  },
  {
    id: "clothing",
    name: "Clothing",
    description: "Fashion and apparel for all occasions",
    image: "/categories/clothing.jpg",
    productCount: 320
  },
  {
    id: "shoes",
    name: "Shoes",
    description: "Footwear for every style and activity",
    image: "/categories/shoes.jpg",
    productCount: 85
  },
  {
    id: "home",
    name: "Home & Garden",
    description: "Everything for your home and garden",
    image: "/categories/home.jpg",
    productCount: 200
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    description: "Gear for sports and outdoor activities",
    image: "/categories/sports.jpg",
    productCount: 120
  }
];

export async function GET() {
  try {
    return NextResponse.json({
      status: true,
      data: {
        categories: mockCategories
      }
    });
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}