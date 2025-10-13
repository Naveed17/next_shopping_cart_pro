import MainVendor from '@src/components/themes/dashboard/vendor/components/main';
import { RoleGuard } from '@src/lib/auth/role-guard';
import React from 'react';
import { Metadata } from 'next/types';

export const metadata = { title: 'Vendor Dashboard' } satisfies Metadata;

export default async function Page({ params }: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;

  return (
    <RoleGuard allowedRoles={['vendor', 'admin', 'super-admin']}>
      <MainVendor />
    </RoleGuard>
  );
}