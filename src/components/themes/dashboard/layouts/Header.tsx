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

const Header = () => {
  const { user, modules } = useDashboard();
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
        <div className="bg-white/60 backdrop-blur-md border-b border-gray-200 rounded-2xl ">
          <div className="flex items-center justify-between px-6 py-2">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="ml-4 lg:ml-0 flex-1 min-w-0">
                <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                  Dashboard
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">

              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="p-1 text-gray-400 hover:text-gray-500 relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {isNotificationOpen && (
                  <div className="fixed right-16 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-[60] backdrop-blur-sm">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                        <p className="text-sm text-gray-900">New order received</p>
                        <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                        <p className="text-sm text-gray-900">Payment confirmed</p>
                        <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50">
                        <p className="text-sm text-gray-900">Product stock low</p>
                        <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100">
                      <button className="text-xs text-blue-600 hover:text-blue-800">View all notifications</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-xs sm:text-sm font-medium text-blue-700">
                      {user?.name.charAt(0)}
                    </span>
                  </div>
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 hidden xs:block" />
                </button>

                {isDropdownOpen && (
                  <div className="fixed right-4 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[60] backdrop-blur-sm">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
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
                        ? 'bg-blue-50 text-blue-700'
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

            <div className="p-4 border-t border-gray-200 mt-auto">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-700">
                    {user?.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
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
    const baseItems = [
      { name: 'Dashboard', href: `/dashboard/${role}`, icon: LayoutDashboard }
    ];

    const moduleItems = [];
    if (modules.products?.enabled) {
      moduleItems.push({ name: 'Products', href: `/dashboard/products`, icon: Package });
    }
    if (modules.orders?.enabled) {
      const orderLabel = role === 'customer' ? 'My Orders' : 'Orders';
      moduleItems.push({ name: orderLabel, href: `/dashboard/orders`, icon: ShoppingCart });
    }

    const roleSpecificItems = [];

    if (role === 'vendor') {
      if (modules.users?.enabled) {
        roleSpecificItems.push(
          { name: 'Customers', href: `/dashboard/customers`, icon: Users }
        );
      }
    } else if (role === 'admin') {
      if (modules.users?.enabled) {
        roleSpecificItems.push(
          { name: 'Vendors', href: `/dashboard/vendors`, icon: Store }
        );
      }
      if (modules.users?.enabled) {
        roleSpecificItems.push(
          { name: 'Customers', href: `/dashboard/customers`, icon: Users }
        );
      }
      if (modules.analytics?.enabled) {
        roleSpecificItems.push(
          { name: 'Analytics', href: `/dashboard/analytics`, icon: BarChart3 }
        );
      }
      roleSpecificItems.push(
        { name: 'Settings', href: `/dashboard/settings`, icon: Settings }
      );
    }

    return [...baseItems, ...moduleItems, ...roleSpecificItems];
  }
};

export default Header;