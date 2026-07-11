'use client'
import React, { createContext, useContext, ReactNode } from 'react';
import { User, ROLE_PERMISSIONS } from '@src/types/dashboard';
import { useUser } from '@hooks/use-user';

interface DashboardContextType {
  user: User | null;
  hasPermission: (section: string, action?: string) => boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const { user: userData } = useUser();
  const user = userData as User | null;

  const hasPermission = (section: string, action: string = 'view'): boolean => {
    if (!user) return false;
    if (user.role === 'super-admin' || user.role === 'admin') return true;

    const rolePermissions = ROLE_PERMISSIONS[user.role];
    if (!rolePermissions || !rolePermissions.sections.includes(section)) return false;

    return rolePermissions.actions.includes(action) || rolePermissions.actions.includes('full_access');
  };

  return (
    <DashboardContext.Provider value={{
      user,
      hasPermission
    }}>
      {children}
    </DashboardContext.Provider>
  );
};