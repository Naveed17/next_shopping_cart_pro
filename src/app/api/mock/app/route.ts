import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { language, currency } = await request.json();
    const languages = [
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "ar", name: "العربية", flag: "🇦🇪" },
      { code: "ch", name: "中文", flag: "🇨🇳" },
      { code: "fr", name: "Français", flag: "🇫🇷" },
      { code: "ge", name: "Deutsch", flag: "🇩🇪" },
      { code: "ru", name: "Русский", flag: "🇷🇺" },
      { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    ];
    const meta = {
      title: "ShopCart Pro - Premium eCommerce Platform",
      description:
        "ShopCart Pro offers a seamless online shopping experience. Explore thousands of products from trusted vendors, enjoy exclusive discounts, and get fast delivery worldwide.",
      keywords:
        "ShopCart Pro, online shopping, ecommerce, buy electronics, fashion store, online deals, shopping cart, multi vendor store, next.js ecommerce",
      author: "ShopCart Pro Team",
      siteName: "ShopCart Pro",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://shopcartpro.com",
      locale: language === "ar" ? "ar_SA" : "en_US",
      image: "/logo.png",
      twitter: {
        card: "summary_large_image",
        site: "@shopcartpro",
        creator: "@shopcartpro",
        title: "ShopCart Pro - Premium Online Shopping Experience",
        description:
          "Discover electronics, fashion, home products & more from top vendors.",
        image: "/logo.png",
      },
      openGraph: {
        type: "website",
        title: "ShopCart Pro - Premium eCommerce Platform",
        description:
          "ShopCart Pro lets you explore thousands of products from trusted sellers with amazing discounts and offers.",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://shopcartpro.com",
        images: [
          {
            url: "/logo.png",
            width: 1200,
            height: 630,
            alt: "ShopCart Pro",
          },
        ],
        siteName: "ShopCart Pro",
      },
    };
    const appData = {
      status: true,
      message: "App data fetched successfully",
      data: {
        site: {
          name: "ShopCart Pro",
          logo: "/logo.png",
          ...meta,
          contact: {
            email: "support@shopcart.com",
            phone: "+1-555-0123",
          },
        },
        settings: {
          language: language || "en",
          currency: currency || "usd",
          supportedLanguages: languages.map((lang) => lang.code),
          supportedCurrencies: ["usd", "eur", "gbp"],
        },
        languages,
        features: {
          wishlist: true,
          reviews: true,
          multiCurrency: true,
          guestCheckout: true,
        },
        slides: [
          {
            id: 1,
            title: "Summer Sale",
            subtitle: "Up to 70% OFF",
            description:
              "Shop the biggest sale of the year! Thousands of products from top vendors at unbeatable prices.",
            image:
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
            gradient: "from-blue-600 to-blue-800",
            badge: "LIMITED TIME",
            offer: "70% OFF",
            cta: "Shop Sale",
          },
          {
            id: 2,
            title: "New Arrivals",
            subtitle: "Latest Tech Gadgets",
            description:
              "Discover cutting-edge electronics and gadgets from premium brands. Free shipping on orders over $50.",
            image:
              "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop",
            gradient: "from-blue-700 to-blue-900",
            badge: "NEW",
            offer: "Free Shipping",
            cta: "Explore Tech",
          },
          {
            id: 3,
            title: "Fashion Week",
            subtitle: "Trending Styles",
            description:
              "Get the latest fashion trends from top designers. Exclusive collections available now.",
            image:
              "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop",
            gradient: "from-blue-800 to-slate-900",
            badge: "EXCLUSIVE",
            offer: "New Collection",
            cta: "Shop Fashion",
          },
        ],
        categories: [
          {
            id: 1,
            name: "Electronics",
            image:
              "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
            count: "2,341 products",
          },
          {
            id: 2,
            name: "Fashion",
            image:
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
            count: "1,892 products",
          },
          {
            id: 3,
            name: "Home & Garden",
            image:
              "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
            count: "956 products",
          },
          {
            id: 4,
            name: "Sports",
            image:
              "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
            count: "743 products",
          },
          {
            id: 5,
            name: "Books",
            image:
              "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
            count: "1,234 products",
          },
          {
            id: 6,
            name: "Food & Beverages",
            image:
              "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
            count: "567 products",
          },
        ],
        featuredProducts: [
          {
            id: "1",
            name: "Premium Wireless Headphones",
            description:
              "High-quality wireless headphones with active noise cancellation",
            price: 299.99,
            image:
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
            category: "Electronics",
            vendorId: "1",
            vendor: {
              id: "1",
              name: "TechStore Pro",
              email: "tech@store.com",
              description: "Premium electronics retailer",
              logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
              rating: 4.8,
              products: [],
            },
            stock: 25,
            rating: 4.7,
            reviews: 342,
          },
          {
            id: "2",
            name: "Smart Fitness Watch",
            description: "Advanced fitness tracking with heart rate monitoring",
            price: 199.99,
            image:
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
            category: "Electronics",
            vendorId: "1",
            vendor: {
              id: "1",
              name: "TechStore Pro",
              email: "tech@store.com",
              description: "Premium electronics retailer",
              logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
              rating: 4.8,
              products: [],
            },
            stock: 15,
            rating: 4.5,
            reviews: 128,
          },
          {
            id: "3",
            name: "Organic Coffee Blend",
            description:
              "Premium organic coffee beans from Colombian highlands",
            price: 34.99,
            image:
              "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
            category: "Food",
            vendorId: "2",
            vendor: {
              id: "2",
              name: "Artisan Coffee Co",
              email: "hello@coffee.com",
              description: "Specialty coffee roasters",
              logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop",
              rating: 4.9,
              products: [],
            },
            stock: 50,
            rating: 4.9,
            reviews: 567,
          },
          {
            id: "4",
            name: "Designer Backpack",
            description: "Stylish and functional backpack for everyday use",
            price: 89.99,
            image:
              "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
            category: "Fashion",
            vendorId: "3",
            vendor: {
              id: "3",
              name: "Urban Style",
              email: "info@urbanstyle.com",
              description: "Contemporary fashion accessories",
              logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
              rating: 4.4,
              products: [],
            },
            stock: 30,
            rating: 4.6,
            reviews: 89,
          },
        ],
        stats: [
          {
            iconName: "Users",
            value: "50K+",
            label: "Happy Customers",
            description: "Satisfied shoppers worldwide",
          },
          {
            iconName: "ShoppingBag",
            value: "100K+",
            label: "Products Sold",
            description: "Items delivered successfully",
          },
          {
            iconName: "Star",
            value: "4.9",
            label: "Average Rating",
            description: "Customer satisfaction score",
          },
          {
            iconName: "TrendingUp",
            value: "99%",
            label: "Success Rate",
            description: "Order completion rate",
          },
        ],
        trendingProducts: [
          {
            id: "1",
            name: "Wireless Gaming Headset",
            description: "Professional gaming headset with 7.1 surround sound",
            price: 159.99,
            image:
              "https://images.unsplash.com/photo-1599669454699-248893623440?w=600&h=400&fit=crop",
            category: "Electronics",
            vendorId: "1",
            vendor: {
              id: "1",
              name: "GameTech",
              email: "info@gametech.com",
              description: "Gaming accessories specialist",
              logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
              rating: 4.8,
              products: [],
            },
            stock: 45,
            rating: 4.8,
            reviews: 1250,
            trend: "+45%",
            views: "25.3k",
            sales: "2.1k",
          },
          {
            id: "2",
            name: "Smart Home Security Camera",
            description: "4K Ultra HD security camera with night vision",
            price: 199.99,
            image:
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
            category: "Electronics",
            vendorId: "2",
            vendor: {
              id: "2",
              name: "SecureHome",
              email: "contact@securehome.com",
              description: "Home security solutions",
              logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
              rating: 4.7,
              products: [],
            },
            stock: 32,
            rating: 4.7,
            reviews: 890,
            trend: "+32%",
            views: "18.7k",
            sales: "1.5k",
          },
          {
            id: "3",
            name: "Eco-Friendly Water Bottle",
            description:
              "Sustainable stainless steel water bottle with temperature control",
            price: 39.99,
            image:
              "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=400&fit=crop",
            category: "Lifestyle",
            vendorId: "3",
            vendor: {
              id: "3",
              name: "EcoLife",
              email: "hello@ecolife.com",
              description: "Sustainable lifestyle products",
              logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
              rating: 4.9,
              products: [],
            },
            stock: 78,
            rating: 4.9,
            reviews: 567,
            trend: "+28%",
            views: "12.4k",
            sales: "3.2k",
          },
        ],
        testimonials: [
          {
            id: 1,
            name: "Sarah Johnson",
            role: "Verified Customer",
            avatar:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
            rating: 5,
            text: "Amazing shopping experience! The variety of vendors and quality of products exceeded my expectations. Fast delivery and excellent customer service.",
          },
          {
            id: 2,
            name: "Michael Chen",
            role: "Tech Enthusiast",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            rating: 5,
            text: "Found the perfect electronics here. The vendor ratings and reviews helped me make informed decisions. Highly recommend this platform!",
          },
          {
            id: 3,
            name: "Emily Davis",
            role: "Fashion Lover",
            avatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
            rating: 5,
            text: "Love the fashion selection from different vendors. Great prices, authentic products, and the checkout process is seamless. Will shop again!",
          },
        ],
      },
    };

    return NextResponse.json(appData);
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to fetch app data" },
      { status: 500 }
    );
  }
}
