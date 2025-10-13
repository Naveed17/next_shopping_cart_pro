'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@src/hooks/use-user';
import { UserRole } from '@src/types/dashboard';

export interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export function RoleGuard({ 
  children, 
  allowedRoles, 
  redirectTo = '/dashboard' 
}: RoleGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    if (!isLoading && user) {
      if (!allowedRoles.includes(user.role)) {
        router.replace(redirectTo);
        return;
      }
      setIsChecking(false);
    }
  }, [user, isLoading, allowedRoles, redirectTo, router]);

  if (isLoading || isChecking) {
    return null;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}