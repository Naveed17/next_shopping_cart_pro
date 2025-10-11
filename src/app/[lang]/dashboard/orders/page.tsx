'use client';

import { useDashboard } from '@src/context/dashboardContext';

export default function OrdersPage() {
  const { user, hasPermission } = useDashboard();

  if (!hasPermission('orders', 'view')) {
    return <div>Access denied</div>;
  }

  const pageTitle = user?.role === 'customer' ? 'My Orders' : 'Orders Management';

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Orders interface for {user?.role}</p>
        {user?.role === 'customer' && (
          <p className="mt-2 text-gray-600">View your order history and track shipments</p>
        )}
        {(user?.role === 'vendor' || user?.role === 'admin') && (
          <p className="mt-2 text-gray-600">Manage customer orders and fulfillment</p>
        )}
      </div>
    </div>
  );
}