import { SignupForm } from '@src/components/themes/default/components/auth'
import { getDictionary } from '@src/get-dictionary'
import { Metadata } from 'next/types'
import React from 'react'
export const metadata = { title: `Auth | Signup` } satisfies Metadata;
export default async function Page({ params }: {
  params: Promise<{ lang: 'en' | 'ar' }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return (


    <SignupForm />


  )
}

