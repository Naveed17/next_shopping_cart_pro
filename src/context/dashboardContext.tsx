'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ModuleId, Module, User, MODULES, ROLE_PERMISSIONS } from '@src/types/dashboard';
import { useUser } from '@hooks/use-user';

interface DashboardContextType {
  modules: Record<ModuleId, Module>;
  user: User | null;
  toggleModule: (moduleId: ModuleId) => void;
  hasPermission: (moduleId: ModuleId, action: string) => boolean;
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
  const [modules, setModules] = useState<Record<ModuleId, Module>>(MODULES);

  const toggleModule = (moduleId: ModuleId) => {
    setModules(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        enabled: !prev[moduleId].enabled
      }
    }));
  };

  const hasPermission = (moduleId: ModuleId, action: string): boolean => {
    if (!user) return false;
    const moduleConfig = modules[moduleId];
    if (!moduleConfig?.enabled) return false;

    if (user.role === 'super-admin') return true;

    const rolePermissions = ROLE_PERMISSIONS[user.role];
    if (!rolePermissions.modules.includes(moduleId)) return false;

    return rolePermissions.actions.includes(action) || rolePermissions.actions.includes('full_access');
  };

  return (
    <DashboardContext.Provider value={{
      modules,
      user,
      toggleModule,
      hasPermission
    }}>
      {children}
    </DashboardContext.Provider>
  );
};