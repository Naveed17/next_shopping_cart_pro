'use client';

import { useDashboard } from '@src/context/dashboardContext';

export default function SettingsPage() {
  const { user } = useDashboard();

  if (user?.role !== 'admin') {
    return <div>Access denied</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Platform settings and configuration</p>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-semibold">Module Management</h3>
            <p className="text-gray-600">Enable/disable platform modules</p>
          </div>
          <div>
            <h3 className="font-semibold">System Configuration</h3>
            <p className="text-gray-600">Configure platform settings</p>
          </div>
        </div>
      </div>
    </div>
  );
}