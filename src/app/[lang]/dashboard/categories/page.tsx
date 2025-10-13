import MainCategory from '@src/components/themes/dashboard/categories/components/main'
import React from 'react'
import { Metadata } from 'next/types'
export const metadata = { title: 'Categories' } satisfies Metadata;

export default function CategoriesPage() {
  return <MainCategory />
}