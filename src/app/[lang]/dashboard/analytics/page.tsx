'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, DollarSign, ShoppingCart, Eye } from 'lucide-react';
import { RoleGuard } from '@src/lib/auth/role-guard';
import Card from '@src/components/core/card/card';

const AnalyticsPage = () => {
  const stats = [
    { name: 'Total Revenue', value: '$124,563', change: '+12.5%', icon: DollarSign, color: 'green' },
    { name: 'Total Orders', value: '1,234', change: '+8.2%', icon: ShoppingCart, color: 'blue' },
    { name: 'Active Users', value: '8,945', change: '+15.3%', icon: Users, color: 'purple' },
    { name: 'Page Views', value: '45,678', change: '+22.1%', icon: Eye, color: 'orange' },
  ];

  const topProducts = [
    { name: 'iPhone 14 Pro', sales: 234, revenue: '$234,000' },
    { name: 'MacBook Air M2', sales: 156, revenue: '$187,200' },
    { name: 'AirPods Pro', sales: 445, revenue: '$89,000' },
    { name: 'Samsung Galaxy S23', sales: 123, revenue: '$98,400' },
  ];

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', amount: '$299', status: 'completed' },
    { id: '#12346', customer: 'Jane Smith', amount: '$1,299', status: 'processing' },
    { id: '#12347', customer: 'Bob Johnson', amount: '$199', status: 'shipped' },
    { id: '#12348', customer: 'Alice Brown', amount: '$899', status: 'completed' },
  ];

  return (
    <RoleGuard allowedRoles={['vendor', 'admin', 'super-admin']}>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Business insights and performance metrics</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm font-medium text-green-600">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Products</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{product.revenue}</p>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span className="text-xs">+{index + 5}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
              <ShoppingCart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{order.id}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{order.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : order.status === 'processing'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
      </div>
    </RoleGuard>
  );
};

export default AnalyticsPage;