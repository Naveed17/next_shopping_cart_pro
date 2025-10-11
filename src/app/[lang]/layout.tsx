import * as React from 'react'
import { locales } from '../../../next-intl'
import '@src/css/app.css'
import { Noto_Kufi_Arabic, Source_Sans_3 } from 'next/font/google'
import AppProvider from '@lib/appProvider'



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
