import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { language, currency } = await request.json();

    const appData = {
      status: true,
      data: {
        site: {
          name: "ShopCart Pro",
          logo: "/logo.png",
          description: "Your premium shopping destination",
          contact: {
            email: "support@shopcart.com",
            phone: "+1-555-0123"
          }
        },
        settings: {
          language: language || "en",
          currency: currency || "usd",
          supportedLanguages: ["en", "ar"],
          supportedCurrencies: ["usd", "eur", "gbp"]
        },
        features: {
          wishlist: true,
          reviews: true,
          multiCurrency: true,
          guestCheckout: true
        }
      }
    };

    return NextResponse.json(appData);
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to fetch app data" },
      { status: 500 }
    );
  }
}