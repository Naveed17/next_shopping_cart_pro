'use client';

import { useDashboard } from '@src/context/dashboardContext';

export default function CustomersPage() {
  const { user, hasPermission } = useDashboard();

  if (!hasPermission('users', 'view')) {
    return <div>Access denied</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Customers Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Customer management interface for {user?.role}</p>
        {user?.role === 'vendor' && (
          <p className="mt-2 text-gray-600">View customers who purchased your products</p>
        )}
        {user?.role === 'admin' && (
          <p className="mt-2 text-gray-600">Manage all platform customers</p>
        )}
      </div>
    </div>
  );
}