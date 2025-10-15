'use client';

import { ShoppingCart, User, Search, Menu, X, Bell, Heart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/lib/redux/store';
import ModeSwitcher from '@src/components/core/modeSwitcher';
import Button from '@src/components/core/button/button';
import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '@hooks/use-user';
import UserDropdown from '@src/components/core/UserDropdown';
import Input from '@src/components/core/input';
import LocaleSwitcher from '@src/components/core/LocaleSwitcher';
import SearchDropdown from '@src/components/core/SearchDropdown';
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { user, isLoading } = useUser();


  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-b border-blue-200/30 dark:border-blue-800/30 shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-white/10 to-blue-50/20 dark:from-blue-900/10 dark:via-gray-900/20 dark:to-blue-900/10" />
      <div className="relative container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-blue-600/90 backdrop-blur-md rounded-lg flex items-center justify-center border border-blue-500/30">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">NSC</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-6">
            <SearchDropdown placeholder="Search products..." />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <LocaleSwitcher />
            <ModeSwitcher />

            <Link href="/cart" className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {isLoading ? (
              <div className="hidden md:flex items-center space-x-2">
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm hidden md:inline-block text-gray-700 dark:text-gray-300">Hi, {user?.name as string}</span>
                <UserDropdown />
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>


      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="container mx-auto px-4 py-3">
            <div className="mb-3">
              <SearchDropdown placeholder="Search products..." />
            </div>

            {!user && (
              <div className="flex space-x-2">
                <Link href="/auth/login" className="flex-1">
                  <Button variant="ghost" className="w-full">Login</Button>
                </Link>
                <Link href="/auth/signup" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}