export type UserRole = 'customer' | 'vendor' | 'admin' | 'super-admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
  conversionRate: number;
  totalProducts: number;
  lowStockItems: number;
}

export const ROLE_PERMISSIONS: Record<UserRole, { sections: string[]; actions: string[] }> = {
  customer: {
    sections: ['orders', 'profile'],
    actions: ['view', 'edit_profile']
  },
  vendor: {
    sections: ['products', 'orders', 'inventory', 'analytics', 'profile'],
    actions: ['view', 'create', 'edit', 'delete', 'manage_inventory']
  },
  admin: {
    sections: ['products', 'orders', 'categories', 'inventory', 'analytics', 'users', 'vendors', 'customers', 'settings'],
    actions: ['view', 'create', 'edit', 'delete', 'manage_users']
  },
  'super-admin': {
    sections: ['products', 'orders', 'categories', 'inventory', 'analytics', 'users', 'vendors', 'customers', 'settings', 'system'],
    actions: ['full_access']
  }
};