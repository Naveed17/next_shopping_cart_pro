'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

import StatsCard from '@src/components/themes/dashboard/shared/widgets/StatsCard';

const VendorDashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your products and orders</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Products"
          value="45"
          change="+5 this month"
          changeType="positive"
          icon={Package}
          color="blue"
        />
        <StatsCard
          title="Orders"
          value="128"
          change="+12 this week"
          changeType="positive"
          icon={ShoppingCart}
          color="green"
        />
        <StatsCard
          title="Revenue"
          value="$8,450"
          change="+15% this month"
          changeType="positive"
          icon={TrendingUp}
          color="purple"
        />
        <StatsCard
          title="Customers"
          value="89"
          change="+8 new customers"
          changeType="positive"
          icon={Users}
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[
              { product: 'Wireless Headphones', customer: 'John Doe', amount: '$159.99', status: 'Processing' },
              { product: 'Smart Watch', customer: 'Jane Smith', amount: '$299.99', status: 'Shipped' },
              { product: 'Bluetooth Speaker', customer: 'Mike Johnson', amount: '$79.99', status: 'Delivered' }
            ].map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{order.product}</p>
                  <p className="text-sm text-gray-500">{order.customer} • {order.amount}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Delivered'
                    ? 'bg-green-100 text-green-700'
                    : order.status === 'Shipped'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <p className="font-medium text-blue-900">Add New Product</p>
              <p className="text-sm text-blue-600">Expand your inventory</p>
            </button>
            <button className="w-full text-left p-3 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
              <p className="font-medium text-emerald-900">Manage Orders</p>
              <p className="text-sm text-emerald-600">Process customer orders</p>
            </button>
            <button className="w-full text-left p-3 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors">
              <p className="font-medium text-sky-900">View Analytics</p>
              <p className="text-sm text-sky-600">Track your performance</p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorDashboard;