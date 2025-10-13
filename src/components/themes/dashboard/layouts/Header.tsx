'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, Menu, LogOut, User, ChevronDown, X } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import { useUser } from '@hooks/use-user';
import { useParams, useRouter } from 'next/navigation';
import Drawer from '@components/core/drawer/drawer';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, Store, Users, Settings, BarChart3 } from 'lucide-react';
import Container from '@components/core/container';
import ModeSwitcher from '@src/components/core/modeSwitcher';

const Header = () => {
  const { user, hasPermission } = useDashboard();
  const { logout, isLoading } = useUser();
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang as string || 'en';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    if (isDropdownOpen || isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, isNotificationOpen]);

  const handleLogout = async () => {
    if (logout) {
      await logout();
      router.refresh()
    }
  };

  return (

    <header className="fixed top-4 left-0 right-0 lg:left-64 z-50 min-h-14 ">
      <Container>
        <div className="bg-white/60 dark:bg-gray-600/60 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 rounded-2xl ">
          <div className="flex items-center justify-between px-6 py-2">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="ml-4 lg:ml-0 flex-1 min-w-0">
                <h1 className="text-base text-gray-900 dark:text-gray-100 sm:text-xl md:text-2xl font-bold truncate">
                  {user?.role === 'super-admin' ? 'Super Admin' : user ? user?.role.charAt(0).toUpperCase() + user?.role.slice(1) : 'Admin'} Dashboard
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <ModeSwitcher />

              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="p-1 text-gray-400 hover:text-gray-500 relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {isNotificationOpen && (
                  <div className="fixed right-16 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-[60] backdrop-blur-sm">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm text-gray-900 dark:text-gray-100">New order received</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 minutes ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm text-gray-900 dark:text-gray-100">Payment confirmed</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 hour ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <p className="text-sm text-gray-900 dark:text-gray-100">Product stock low</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">3 hours ago</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
                      <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">View all notifications</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-sm font-medium text-blue-700 dark:text-gray-300">
                      {user?.name.charAt(0)}
                    </span>
                  </div>
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 dark:text-gray-400 hidden xs:block" />
                </button>

                {isDropdownOpen && (
                  <div className="fixed right-4 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-[60] backdrop-blur-sm">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Drawer */}
          <Drawer
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            title="Dashboard"
            width={320}
            placement="left"
            bodyClass="p-0"
          >
            <nav className="p-4 flex-1">
              <div className="space-y-1">
                {getNavigationItems(user?.role).map((item) => {
                  const isActive = window.location.pathname === item.href || window.location.pathname.startsWith(item.href + '/');
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                        ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                      <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-700 dark:text-100">
                    {user?.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </Drawer>
        </div>
      </Container>

    </header>
  );

  function getNavigationItems(role: string | undefined) {
    const items = [
      { name: 'Overview', href: `/dashboard`, icon: LayoutDashboard }
    ];

    if (hasPermission('products')) {
      items.push({ name: 'Products', href: `/dashboard/products`, icon: Package });
    }

    if (hasPermission('orders')) {
      const orderLabel = role === 'customer' ? 'My Orders' : 'Orders';
      items.push({ name: orderLabel, href: `/dashboard/orders`, icon: ShoppingCart });
    }

    if (hasPermission('customers')) {
      items.push({ name: 'Customers', href: `/dashboard/customers`, icon: Users });
    }

    if (hasPermission('vendors')) {
      items.push({ name: 'Vendors', href: `/dashboard/vendors`, icon: Store });
    }

    if (hasPermission('analytics')) {
      items.push({ name: 'Analytics', href: `/dashboard/analytics`, icon: BarChart3 });
    }

    if (hasPermission('settings')) {
      items.push({ name: 'Settings', href: `/dashboard/settings`, icon: Settings });
    }

    return items;
  }
};

export default Header;