import MainOrders from '@src/components/themes/dashboard/orders/components/main'
import React from 'react'
import { Metadata } from 'next/types'
export const metadata = { title: 'Orders' } satisfies Metadata;

export default function OrdersPage() {
  return <MainOrders />
}