import MainSettings from '@src/components/themes/dashboard/settings/components/main'
import { RoleGuard } from '@src/lib/auth/role-guard'
import React from 'react'
import { Metadata } from 'next/types'
export const metadata = { title: 'Settings' } satisfies Metadata;

export default function SettingsPage() {
  return (
    <RoleGuard allowedRoles={['admin', 'super-admin']}>
      <MainSettings />
    </RoleGuard>
  )
}