import { NextRequest, NextResponse } from "next/server";
import { optimizeImageUrl, IMAGE_SIZES } from "@src/utils/imageOptimizer";

const mockProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    image:
      optimizeImageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e", IMAGE_SIZES.card),
    category: "Electronics",
    vendorId: "1",
    vendor: {
      id: "1",
      name: "TechStore",
      email: "tech@store.com",
      description: "Electronics specialist",
      logo: optimizeImageUrl("https://images.unsplash.com/photo-1560472354-b33ff0c44a43", IMAGE_SIZES.logo),
      rating: 4.5,
      products: [],
    },
    stock: 50,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health monitoring",
    price: 299.99,
    image:
      optimizeImageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30", IMAGE_SIZES.card),
    category: "Electronics",
    vendorId: "1",
    vendor: {
      id: "1",
      name: "TechStore",
      email: "tech@store.com",
      description: "Electronics specialist",
      logo: optimizeImageUrl("https://images.unsplash.com/photo-1560472354-b33ff0c44a43", IMAGE_SIZES.logo),
      rating: 4.5,
      products: [],
    },
    stock: 30,
    rating: 4.7,
    reviews: 89,
  },
  {
    id: "3",
    name: "Organic Coffee Beans",
    description: "Premium organic coffee beans from Colombia",
    price: 24.99,
    image:
      optimizeImageUrl("https://images.unsplash.com/photo-1559056199-641a0ac8b55e", IMAGE_SIZES.card),
    category: "Food",
    vendorId: "2",
    vendor: {
      id: "2",
      name: "Coffee Co",
      email: "hello@coffee.com",
      description: "Premium coffee supplier",
      logo: optimizeImageUrl("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085", IMAGE_SIZES.logo),
      rating: 4.8,
      products: [],
    },
    stock: 100,
    rating: 4.9,
    reviews: 256,
  },
  {
    id: "4",
    name: "Gaming Laptop",
    description: "High-performance gaming laptop with RTX graphics",
    price: 1299.99,
    image:
      optimizeImageUrl("https://images.unsplash.com/photo-1603302576837-37561b2e2302", IMAGE_SIZES.card),
    category: "Electronics",
    vendorId: "1",
    vendor: {
      id: "1",
      name: "TechStore",
      email: "tech@store.com",
      description: "Electronics specialist",
      logo: optimizeImageUrl("https://images.unsplash.com/photo-1560472354-b33ff0c44a43", IMAGE_SIZES.logo),
      rating: 4.5,
      products: [],
    },
    stock: 15,
    rating: 4.8,
    reviews: 67,
  },
  {
    id: "5",
    name: "Designer Sunglasses",
    description: "Premium UV protection sunglasses with polarized lenses",
    price: 149.99,
    image:
      optimizeImageUrl("https://images.unsplash.com/photo-1572635196237-14b3f281503f", IMAGE_SIZES.card),
    category: "Fashion",
    vendorId: "3",
    vendor: {
      id: "3",
      name: "Fashion Hub",
      email: "info@fashionhub.com",
      description: "Trendy fashion accessories",
      logo: optimizeImageUrl("https://images.unsplash.com/photo-1441986300917-64674bd600d8", IMAGE_SIZES.logo),
      rating: 4.3,
      products: [],
    },
    stock: 40,
    rating: 4.4,
    reviews: 92,
  },
  {
    id: "6",
    name: "Yoga Mat Set",
    description: "Eco-friendly yoga mat with carrying strap and blocks",
    price: 79.99,
    image:
      optimizeImageUrl("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b", IMAGE_SIZES.card),
    category: "Sports",
    vendorId: "4",
    vendor: {
      id: "4",
      name: "Wellness Store",
      email: "contact@wellness.com",
      description: "Health and wellness products",
      logo: optimizeImageUrl("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b", IMAGE_SIZES.logo),
      rating: 4.6,
      products: [],
    },
    stock: 25,
    rating: 4.7,
    reviews: 134,
  },
  {
    id: "7",
    name: "Ceramic Plant Pot",
    description: "Handcrafted ceramic pot perfect for indoor plants",
    price: 39.99,
    image:
      optimizeImageUrl("https://images.unsplash.com/photo-1485955900006-10f4d324d411", IMAGE_SIZES.card),
    category: "Home & Garden",
    vendorId: "5",
    vendor: {
      id: "5",
      name: "Home Decor Plus",
      email: "hello@homedecor.com",
      description: "Beautiful home decoration items",
      logo: optimizeImageUrl("https://images.unsplash.com/photo-1586023492125-27b2c045efd7", IMAGE_SIZES.logo),
      rating: 4.2,
      products: [],
    },
    stock: 60,
    rating: 4.3,
    reviews: 78,
  },
  {
    id: "8",
    name: "Bestseller Novel",
    description: "Award-winning fiction novel by renowned author",
    price: 16.99,
    image:
      optimizeImageUrl("https://images.unsplash.com/photo-1481627834876-b7833e8f5570", IMAGE_SIZES.card),
    category: "Books",
    vendorId: "6",
    vendor: {
      id: "6",
      name: "Book Haven",
      email: "info@bookhaven.com",
      description: "Curated collection of books",
      logo: optimizeImageUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", IMAGE_SIZES.logo),
      rating: 4.7,
      products: [],
    },
    stock: 80,
    rating: 4.6,
    reviews: 203,
  },
];

export async function POST(request: NextRequest) {
  try {
    const { category, page = 1, limit = 10, search } = await request.json();

    let filteredProducts = [...mockProducts];

    if (category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === category
      );
    }

    if (search) {
      filteredProducts = filteredProducts.filter(
        (p) =>
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
          totalPages: Math.ceil(filteredProducts.length / limit),
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}