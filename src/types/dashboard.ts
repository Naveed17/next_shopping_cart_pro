export type UserRole = 'customer' | 'vendor' | 'admin' | 'super-admin';

export type ModuleId = 'products' | 'orders' | 'categories' | 'users' | 'analytics' | 'inventory';

export interface Module {
  id: ModuleId;
  name: string;
  enabled: boolean;
  permissions: string[];
  icon: string;
}

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

export const MODULES: Record<ModuleId, Module> = {
  products: {
    id: 'products',
    name: 'Products',
    enabled: true,
    permissions: ['view', 'create', 'edit', 'delete'],
    icon: 'Package'
  },
  orders: {
    id: 'orders',
    name: 'Orders',
    enabled: true,
    permissions: ['view', 'create', 'edit', 'delete', 'fulfill'],
    icon: 'ShoppingCart'
  },
  categories: {
    id: 'categories',
    name: 'Categories',
    enabled: true,
    permissions: ['view', 'create', 'edit', 'delete'],
    icon: 'Grid'
  },
  inventory: {
    id: 'inventory',
    name: 'Inventory',
    enabled: true,
    permissions: ['view', 'edit', 'manage_stock'],
    icon: 'Archive'
  },
  analytics: {
    id: 'analytics',
    name: 'Analytics',
    enabled: true,
    permissions: ['view', 'export'],
    icon: 'BarChart'
  },
  users: {
    id: 'users',
    name: 'Users',
    enabled: true,
    permissions: ['view', 'create', 'edit', 'delete'],
    icon: 'Users'
  }
};

export const ROLE_PERMISSIONS: Record<UserRole, { modules: ModuleId[]; actions: string[] }> = {
  customer: {
    modules: ['products', 'orders'],
    actions: ['view', 'purchase']
  },
  vendor: {
    modules: ['products', 'orders', 'inventory', 'analytics'],
    actions: ['view', 'create', 'edit', 'manage_inventory', 'fulfill']
  },
  admin: {
    modules: ['products', 'orders', 'categories', 'inventory', 'analytics', 'users'],
    actions: ['view', 'create', 'edit', 'delete', 'manage_modules']
  },
  'super-admin': {
    modules: ['products', 'orders', 'categories', 'inventory', 'analytics', 'users'],
    actions: ['full_access', 'system_config', 'manage_modules']
  }
};