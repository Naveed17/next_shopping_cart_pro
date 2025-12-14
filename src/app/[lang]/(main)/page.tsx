import { CategoriesSection, FeaturedProducts, HeroSection, NewsletterSection, StatsSection, TestimonialsSection, TrendingSection, WhyChooseUsSection } from "@components/themes/default";
import { Metadata } from 'next'
import { fetchAppData } from '@src/actions'

export const generateMetadata = async ({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> => {
  const { lang } = await params
  const { data }: any = await fetchAppData({ language: lang, currency: 'usd' })
  const meta = data?.site
  const settings = data?.settings
  const featuredProducts = data?.featuredProducts || []
  const categories = data?.categories || []

  if (!meta) {
    return {
      title: '404 | ShopCart Pro',
      description: 'Page not found',
    }
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://next-shopping-cart-pro.vercel.app'

  const dynamicKeywords = [
    meta.name,
    'eCommerce',
    'online shopping',
    'buy online',
    'multi-vendor marketplace',
    'fashion store',
    'electronics deals',
    ...categories.map((c: any) => c.name.toLowerCase()),
    ...featuredProducts.map((p: any) => p.name.toLowerCase()),
  ].join(', ')

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en',
        'ar-SA': '/ar',
      },
    },
    title: {
      default: `${meta.name} — Premium eCommerce Platform`,
      template: `%s | ${meta.name}`,
    },
    description: meta.description,
    keywords: dynamicKeywords,
    icons: {
      icon: meta.logo || '/logo.png',
      apple: meta.logo || '/apple-touch-icon.png',
    },
    openGraph: {
      title: meta.name,
      description: meta.description,
      url: baseUrl,
      siteName: meta.name,
      images: [
        {
          url: `${baseUrl}${meta.logo}`,
          width: 1200,
          height: 630,
        },
      ],
      locale: settings.language === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.name,
      description: meta.description,
      images: [`${baseUrl}${meta.logo}`],
    },
    verification: {
      google: 'Uht5KEUhm7MosWB1FXdBCIWjYyIGCsyS-1QBTsw7XXk',
    },
    robots:
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    applicationName: meta.name,
    publisher: meta.name,
    generator: 'Next.js',
  }
}

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <StatsSection />
      <TrendingSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}