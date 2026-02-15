'use client';

import { useState } from 'react';
import { User, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { useFloating, autoUpdate, offset, flip, shift, useClick, useDismiss, useRole, useInteractions, FloatingPortal } from '@floating-ui/react';
import Button from './button/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@hooks/use-user';
import { authClient } from '@src/lib/auth/client';
import { toast } from 'react-toastify';
import useLocale from '@hooks/useLocale';

export default function UserDropdown() {
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, checkSession } = useUser();
  const router = useRouter();
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut();
      await checkSession?.();
      router.refresh();
      toast.success('Logged out successfully');
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to logout');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <Button
        ref={refs.setReference}
        variant="ghost"
        size="sm"
        {...getReferenceProps()}
      >
        <User className="h-4 w-4" />
      </Button>

      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-50 min-w-[200px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
          >
            <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.name as string}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email as string}
              </p>
            </div>

            <div className="py-1">
              <Link
                href={`/${locale}/dashboard`}
                className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>

              <Link
                href={`/${locale}/dashboard/profile`}
                className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? (
                  <div className="h-4 w-4 mr-2 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4 mr-2" />
                )}
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        )}
      </FloatingPortal>
    </>
  );
}