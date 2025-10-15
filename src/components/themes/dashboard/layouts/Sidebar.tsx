'use client'
import React from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  Users,
  Settings,
  BarChart3,
  Grid3X3,
  Archive,
  User,
  Home
} from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import { UserRole } from '@src/types/dashboard';

const Sidebar = () => {
  const { user, hasPermission } = useDashboard();
  const params = useParams();
  const pathname = usePathname();
  const lang = params?.lang as string || 'en';

  if (!user) return null;

  const getNavigationItems = (role: UserRole) => {
    const items = [
      { name: 'Overview', href: `/dashboard`, icon: LayoutDashboard, section: 'dashboard' }
    ];

    // Products
    if (hasPermission('products')) {
      items.push({ name: 'Products', href: `/dashboard/products`, icon: Package, section: 'products' });
    }

    // Orders
    if (hasPermission('orders')) {
      const orderLabel = role === 'customer' ? 'My Orders' : 'Orders';
      items.push({ name: orderLabel, href: `/dashboard/orders`, icon: ShoppingCart, section: 'orders' });
    }

    // Categories (Admin only)
    if (hasPermission('categories')) {
      items.push({ name: 'Categories', href: `/dashboard/categories`, icon: Grid3X3, section: 'categories' });
    }

    // Inventory (Vendor & Admin)
    if (hasPermission('inventory')) {
      items.push({ name: 'Inventory', href: `/dashboard/inventory`, icon: Archive, section: 'inventory' });
    }

    // Analytics (Vendor & Admin)
    if (hasPermission('analytics')) {
      items.push({ name: 'Analytics', href: `/dashboard/analytics`, icon: BarChart3, section: 'analytics' });
    }

    // Users Management
    if (hasPermission('customers')) {
      items.push({ name: 'Customers', href: `/dashboard/customers`, icon: Users, section: 'customers' });
    }
    if (hasPermission('vendors')) {
      items.push({ name: 'Vendors', href: `/dashboard/vendors`, icon: Store, section: 'vendors' });
    }

    // Profile
    if (hasPermission('profile')) {
      items.push({ name: 'Profile', href: `/dashboard/profile`, icon: User, section: 'profile' });
    }

    // Settings (Admin only)
    if (hasPermission('settings')) {
      items.push({ name: 'Settings', href: `/dashboard/settings`, icon: Settings, section: 'settings' });
    }

    return items;
  };

  const navigationItems = getNavigationItems(user.role);

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-lg lg:block hidden border-r border-gray-200 dark:border-gray-700">
      <div className="flex h-16 items-center px-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      </div>

      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
              || (item.href === '/dashboard' && pathname === `/dashboard/${user.role}`);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                  ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700 dark:text-blue-300' : 'text-gray-400 dark:text-gray-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full border-t border-gray-200 dark:border-gray-700">
        <div className="p-3">
          <Link
            href="/"
            className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white w-full"
          >
            <Home className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
            Go to Home
          </Link>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {user.name.charAt(0)}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;