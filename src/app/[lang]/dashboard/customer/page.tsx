import MainCustomer from '@src/components/themes/dashboard/customer/components/main'
import { RoleGuard } from '@src/lib/auth/role-guard'
import React from 'react'
import { Metadata } from 'next/types'
export const metadata = { title: 'Customer Dashboard' } satisfies Metadata;

export default function CustomerDashboard() {
  return (
    <RoleGuard allowedRoles={['customer', 'admin', 'super-admin']}>
      <MainCustomer />
    </RoleGuard>
  )
}