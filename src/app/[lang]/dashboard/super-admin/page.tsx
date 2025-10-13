import MainSuperAdmin from '@src/components/themes/dashboard/super-admin/components/main'
import { RoleGuard } from '@src/lib/auth/role-guard'
import React from 'react'
import { Metadata } from 'next/types'
export const metadata = { title: 'Super Admin Dashboard' } satisfies Metadata;

export default function SuperAdminDashboard() {
  return (
    <RoleGuard allowedRoles={['super-admin']}>
      <MainSuperAdmin />
    </RoleGuard>
  )
}