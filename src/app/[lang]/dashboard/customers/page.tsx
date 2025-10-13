import MainCustomers from '@src/components/themes/dashboard/customers/components/main'
import { RoleGuard } from '@src/lib/auth/role-guard'
import React from 'react'
import { Metadata } from 'next/types'
export const metadata = { title: 'Customers' } satisfies Metadata;

export default function CustomersPage() {
  return (
    <RoleGuard allowedRoles={['admin', 'super-admin']}>
      <MainCustomers />
    </RoleGuard>
  )
}