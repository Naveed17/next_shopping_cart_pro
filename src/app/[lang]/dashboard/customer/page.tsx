'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Star, TrendingUp } from 'lucide-react';

import StatsCard from '@src/components/themes/dashboard/shared/widgets/StatsCard';

const CustomerDashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your orders</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Orders"
          value="12"
          change="+2 this month"
          changeType="positive"
          icon={ShoppingCart}
          color="blue"
        />
        <StatsCard
          title="Delivered"
          value="8"
          change="Last: March 15"
          changeType="neutral"
          icon={Package}
          color="green"
        />
        <StatsCard
          title="Total Spent"
          value="$2,450"
          change="+$340 this month"
          changeType="positive"
          icon={TrendingUp}
          color="purple"
        />
        <StatsCard
          title="Average Rating"
          value="4.8"
          change="Based on 8 reviews"
          changeType="positive"
          icon={Star}
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
              { name: 'Wireless Headphones', date: 'March 15, 2024', status: 'Delivered', type: 'product' },
              { name: 'Smart Watch', date: 'March 20, 2024', status: 'Shipped', type: 'product' },
              { name: 'Bluetooth Speaker', date: 'April 5, 2024', status: 'Processing', type: 'product' }
            ].map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{order.name}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
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
              <p className="font-medium text-blue-900">Browse Products</p>
              <p className="text-sm text-blue-600">Discover new items</p>
            </button>
            <button className="w-full text-left p-3 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
              <p className="font-medium text-emerald-900">View Cart</p>
              <p className="text-sm text-emerald-600">Complete your purchase</p>
            </button>
            <button className="w-full text-left p-3 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors">
              <p className="font-medium text-sky-900">Track Orders</p>
              <p className="text-sm text-sky-600">Monitor your shipments</p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerDashboard;