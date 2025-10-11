'use client';

import { useDashboard } from '@src/context/dashboardContext';

export default function VendorsPage() {
  const { user, hasPermission } = useDashboard();

  if (!hasPermission('users', 'view')) {
    return <div>Access denied</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Vendors Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Vendor management interface for {user?.role}</p>
        {hasPermission('users', 'create') && (
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            Add Vendor
          </button>
        )}
      </div>
    </div>
  );
}