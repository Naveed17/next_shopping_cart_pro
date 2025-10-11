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
  Shield
} from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import { UserRole } from '@src/types/dashboard';

const Sidebar = () => {
  const { user, modules } = useDashboard();
  const params = useParams();
  const pathname = usePathname();
  const lang = params?.lang as string || 'en';

  if (!user) return null;

  const getNavigationItems = (role: UserRole) => {
    const baseItems = [
      { name: 'Dashboard', href: `/dashboard/${role}`, icon: LayoutDashboard }
    ];

    const moduleItems = [];
    if (modules.products.enabled) {
      moduleItems.push({ name: 'Products', href: `/dashboard/products`, icon: Package });
    }
    if (modules.orders.enabled) {
      const orderLabel = role === 'customer' ? 'My Orders' : 'Orders';
      moduleItems.push({ name: orderLabel, href: `/dashboard/orders`, icon: ShoppingCart });
    }

    const roleSpecificItems = [];

    if (role === 'vendor') {
      if (modules.users.enabled) {
        roleSpecificItems.push(
          { name: 'Customers', href: `/dashboard/customers`, icon: Users }
        );
      }
    } else if (role === 'admin') {
      if (modules.users.enabled) {
        roleSpecificItems.push(
          { name: 'Vendors', href: `/dashboard/vendors`, icon: Store }
        );
      }
      if (modules.users.enabled) {
        roleSpecificItems.push(
          { name: 'Customers', href: `/dashboard/customers`, icon: Users }
        );
      }
      if (modules.analytics.enabled) {
        roleSpecificItems.push(
          { name: 'Analytics', href: `/dashboard/analytics`, icon: BarChart3 }
        );
      }
      roleSpecificItems.push(
        { name: 'Settings', href: `/dashboard/settings`, icon: Settings }
      );
    }

    return [...baseItems, ...moduleItems, ...roleSpecificItems];
  };

  const navigationItems = getNavigationItems(user.role);

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:block hidden">
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-blue-700">
              {user.name.charAt(0)}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;