import React from 'react';
import { DashboardLayout } from '@src/components/themes/dashboard/layouts';
import { AuthGuard } from '@lib/auth/auth-guard';
interface DashboardRootLayoutProps {
  children: React.ReactNode;
}

const DashboardRootLayout = ({ children }: DashboardRootLayoutProps) => {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  )
};

export default DashboardRootLayout;