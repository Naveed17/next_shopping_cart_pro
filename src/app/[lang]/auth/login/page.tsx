
import { LoginForm } from '@src/components/themes/default/components/auth'
import { getDictionary } from '@src/lib/get-dictionary'
import React from 'react'
import { Metadata } from 'next/types'
export const metadata = { title: `Auth | Login` } satisfies Metadata;
export default async function Page({ params }: {
  params: Promise<{ lang: 'en' | 'ar' }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return (

    <LoginForm />


  )
}
