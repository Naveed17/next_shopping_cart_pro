import MainInventory from '@src/components/themes/dashboard/inventory/components/main'
import React from 'react'
import { Metadata } from 'next/types'
export const metadata = { title: 'Inventory' } satisfies Metadata;

export default function InventoryPage() {
  return <MainInventory />
}