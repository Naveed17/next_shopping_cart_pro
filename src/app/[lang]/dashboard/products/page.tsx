
import { MainProduct } from '@src/components/themes/dashboard/products'
import React from 'react'
import { Metadata } from 'next/types'
export const metadata = { title: 'Product Page' } satisfies Metadata;
export default async function Page({ params }: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (

    <MainProduct />


  )
}
