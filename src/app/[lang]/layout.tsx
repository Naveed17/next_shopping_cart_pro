import * as React from 'react'
import { locales } from '../../../next-intl'
import '@src/css/app.css'
import { Noto_Kufi_Arabic, Source_Sans_3 } from 'next/font/google'
import AppProvider from '@lib/appProvider'
import { Metadata } from 'next'
import { fetchAppData } from '@src/actions'
import Script from 'next/script'

// Fonts
const FontUrSource_Sans_3 = Source_Sans_3({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
})

const notoKufiArabic = Noto_Kufi_Arabic({
  weight: ['400', '700'],
  subsets: ['arabic'],
  display: 'swap',
})


export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }))
}



export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const isArabic = lang === 'ar'

  const { data }: any = await fetchAppData({ language: lang, currency: 'usd' })
  const meta = data?.site
  const settings = data?.settings
  const featuredProducts = data?.featuredProducts || []

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://next-shopping-cart-pro.vercel.app'


  const schemaData = meta && {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: meta.siteName,
        url: baseUrl,
        logo: `${baseUrl}${meta.logo}`,
        contactPoint: {
          '@type': 'ContactPoint',
          email: meta.contact?.email,
          telephone: meta.contact?.phone,
          contactType: 'customer service',
        },
      },
      {
        '@type': 'WebSite',
        name: meta.name,
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      ...featuredProducts.slice(0, 3).map((p: any) => ({
        '@type': 'Product',
        name: p.name,
        image: p.image,
        description: p.description,
        offers: {
          '@type': 'Offer',
          price: p.price,
          priceCurrency: settings.currency.toUpperCase(),
          availability: p.stock > 0 ? 'InStock' : 'OutOfStock',
          url: `${baseUrl}/product/${p.id}`,
        },
      })),
    ],
  }

  return (
    <html lang={lang} dir={isArabic ? 'rtl' : 'ltr'}>
      <body
        className={
          isArabic
            ? notoKufiArabic.className
            : FontUrSource_Sans_3.className
        }
      >
        {schemaData && (
          <Script
            id="schema-org"
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schemaData),
            }}
          />
        )}
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
