import * as React from 'react'
import { locales } from '../../../next-intl'
import '@src/css/app.css'
import { Noto_Kufi_Arabic, Source_Sans_3 } from 'next/font/google'
import AppProvider from '@lib/appProvider'
import { Metadata } from 'next/types'
import { fetchAppData } from '@src/actions'



// Load English font
const FontUrSource_Sans_3 = Source_Sans_3({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
})
const notoKufiArabic = Noto_Kufi_Arabic({
  weight: ['400', '700'], // only supported weights
  subsets: ['arabic'],
  display: 'swap',
})
export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }))
}

export const generateMetadata = async (): Promise<Metadata> => {
  const { data }: any = await fetchAppData({ language: "en", currency: "usd" });
  const meta_data = data?.site;
  const settings = data?.settings;
  const featuredProducts = data?.featuredProducts || [];
  const categories = data?.categories || [];

  if (!meta_data) {
    return {
      title: "404 | ShopCart Pro",
      description: "Page not found.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shopcartpro.com";

  // ✅ Create dynamic keywords based on categories and top products
  const dynamicKeywords = [
    meta_data.name,
    "eCommerce",
    "online shopping",
    "buy online",
    "multi-vendor marketplace",
    "fashion store",
    "electronics deals",
    ...categories.map((cat: any) => cat.name.toLowerCase()),
    ...featuredProducts.map((p: any) => p.name.toLowerCase()),
  ].join(", ");

  // ✅ Generate structured data for SEO (Product + Organization + WebSite)
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: meta_data.siteName,
        url: baseUrl,
        logo: `${baseUrl}${meta_data.logo}`,
        sameAs: [
          "https://www.facebook.com/shopcartpro",
          "https://www.instagram.com/shopcartpro",
          "https://twitter.com/shopcartpro",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: meta_data.contact.email,
          telephone: meta_data.contact.phone,
          contactType: "customer service",
        },
      },
      {
        "@type": "WebSite",
        name: meta_data.name,
        url: baseUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      ...featuredProducts.slice(0, 3).map((product: any) => ({
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.image,
        brand: product.vendor?.name || "ShopCart Vendor",
        offers: {
          "@type": "Offer",
          priceCurrency: settings.currency.toUpperCase(),
          price: product.price,
          availability: product.stock > 0 ? "InStock" : "OutOfStock",
          url: `${baseUrl}/product/${product.id}`,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviews,
        },
      })),
    ],
  };

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "ar-SA": "/ar",
      },
    },
    icons: {
      icon: meta_data.logo || "/logo.png",
      shortcut: meta_data.logo || "/logo.png",
      apple: meta_data.logo || "/apple-touch-icon.png",
    },
    title: {
      default: `${meta_data.name} — Premium eCommerce Platform`,
      template: `%s | ${meta_data.name}`,
    },
    description:
      meta_data.description ||
      "ShopCart Pro — Your premium eCommerce platform offering electronics, fashion, home, and more with fast shipping and secure checkout.",
    keywords: dynamicKeywords,
    authors: [{ name: `${meta_data.name} Team` }],
    robots:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    applicationName: meta_data.name,
    creator: meta_data.name,
    publisher: meta_data.name,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    openGraph: {
      title: `${meta_data.name} — Premium Online Shopping`,
      description:
        meta_data.description ||
        "Discover thousands of products from top vendors. Fast shipping, secure checkout, and exclusive offers.",
      url: baseUrl,
      siteName: meta_data.name,
      images: [
        {
          url: `${baseUrl}${meta_data.logo}`,
          width: 1200,
          height: 630,
          alt: `${meta_data.name} - Online Shopping Platform`,
        },
      ],
      locale: settings.language === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta_data.name} — Shop Smarter Online`,
      description:
        "Shop the latest products and deals from top vendors. Fast checkout, secure payments, and worldwide delivery.",
      images: [`${baseUrl}${meta_data.logo}`],
      creator: "@ShopCartPro",
      site: "@ShopCartPro",
    },
    verification: {
      google: "Uht5KEUhm7MosWB1FXdBCIWjYyIGCsyS-1QBTsw7XXk",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
    },
    category: "Shopping",
    classification: "E-commerce & Retail",
    other: {
      "script:ld+json": JSON.stringify(schemaData),
    },
  };
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params as { lang: 'en' | 'ar' }

  const isArabic = lang === 'ar'
  const fontClass = isArabic ? notoKufiArabic.className : FontUrSource_Sans_3.className


  return (
    <html lang={lang} dir={isArabic ? 'rtl' : 'ltr'}>
      <body className={`${fontClass}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
