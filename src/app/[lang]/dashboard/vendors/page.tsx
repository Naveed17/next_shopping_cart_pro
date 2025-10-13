import MainVendors from '@src/components/themes/dashboard/vendors/components/main'
import { RoleGuard } from '@src/lib/auth/role-guard'
import React from 'react'
import { Metadata } from 'next/types'
export const metadata = { title: 'Vendors' } satisfies Metadata;

export default function VendorsPage() {
  return (
    <RoleGuard allowedRoles={['admin', 'super-admin']}>
      <MainVendors />
    </RoleGuard>
  )
}