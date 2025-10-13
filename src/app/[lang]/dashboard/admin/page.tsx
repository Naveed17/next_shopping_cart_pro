import MainAdmin from '@src/components/themes/dashboard/admin/components/main'
import { RoleGuard } from '@src/lib/auth/role-guard'
import React from 'react'
import { Metadata } from 'next/types'
export const metadata = { title: 'Admin Dashboard' } satisfies Metadata;

export default function AdminDashboard() {
  return (
    <RoleGuard allowedRoles={['admin', 'super-admin']}>
      <MainAdmin />
    </RoleGuard>
  )
}