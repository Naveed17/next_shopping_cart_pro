import { NextRequest, NextResponse } from "next/server";

const mockProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones",
    price: 199.99,
    originalPrice: 249.99,
    category: "electronics",
    image: "/products/headphones.jpg",
    images: ["/products/headphones.jpg", "/products/headphones-2.jpg"],
    rating: 4.5,
    reviews: 128,
    inStock: true,
    stock: 25,
    variants: ["Black", "White", "Blue"]
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Advanced fitness tracking smartwatch",
    price: 299.99,
    originalPrice: 399.99,
    category: "electronics",
    image: "/products/smartwatch.jpg",
    images: ["/products/smartwatch.jpg"],
    rating: 4.3,
    reviews: 89,
    inStock: true,
    stock: 15,
    variants: ["Silver", "Gold", "Black"]
  },
  {
    id: "3",
    name: "Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt",
    price: 29.99,
    originalPrice: 39.99,
    category: "clothing",
    image: "/products/tshirt.jpg",
    images: ["/products/tshirt.jpg"],
    rating: 4.2,
    reviews: 45,
    inStock: true,
    stock: 50,
    variants: ["S", "M", "L", "XL"]
  },
  {
    id: "4",
    name: "Running Shoes",
    description: "Lightweight running shoes for athletes",
    price: 129.99,
    originalPrice: 159.99,
    category: "shoes",
    image: "/products/shoes.jpg",
    images: ["/products/shoes.jpg"],
    rating: 4.7,
    reviews: 203,
    inStock: true,
    stock: 30,
    variants: ["7", "8", "9", "10", "11"]
  },
  {
    id: "5",
    name: "Coffee Maker",
    description: "Automatic drip coffee maker",
    price: 89.99,
    originalPrice: 119.99,
    category: "home",
    image: "/products/coffee-maker.jpg",
    images: ["/products/coffee-maker.jpg"],
    rating: 4.1,
    reviews: 67,
    inStock: true,
    stock: 12,
    variants: ["Black", "Silver"]
  }
];

export async function POST(request: NextRequest) {
  try {
    const { category, page = 1, limit = 10, search } = await request.json();

    let filteredProducts = [...mockProducts];

    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (search) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return NextResponse.json({
      status: true,
      data: {
        products: paginatedProducts,
        pagination: {
          page,
          limit,
          total: filteredProducts.length,
          totalPages: Math.ceil(filteredProducts.length / limit)
        }
      }
    });
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}