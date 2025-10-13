'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const salesData = [
  { name: 'Jan', sales: 4000, orders: 240 },
  { name: 'Feb', sales: 3000, orders: 198 },
  { name: 'Mar', sales: 5000, orders: 320 },
  { name: 'Apr', sales: 4500, orders: 280 },
  { name: 'May', sales: 6000, orders: 390 },
  { name: 'Jun', sales: 5500, orders: 350 },
];

const productData = [
  { category: 'Electronics', products: 15 },
  { category: 'Accessories', products: 12 },
  { category: 'Gadgets', products: 8 },
  { category: 'Components', products: 10 },
];

export default function MainVendor() {
  const stats = [
    { name: 'Total Products', value: '45', change: '+5 this month', icon: Package, color: 'blue' },
    { name: 'Orders', value: '128', change: '+12 this week', icon: ShoppingCart, color: 'green' },
    { name: 'Revenue', value: '$8,450', change: '+15% this month', icon: TrendingUp, color: 'purple' },
    { name: 'Customers', value: '89', change: '+8 new customers', icon: Users, color: 'yellow' },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vendor Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your products and track performance</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10 rounded-xl border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Sales Performance</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your monthly sales trends</p>
            </div>
            <div className="flex space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <span className="text-gray-600 dark:text-gray-400">Sales</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
                <span className="text-gray-600 dark:text-gray-400">Orders</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.9}/>
                </linearGradient>
                <linearGradient id="ordersGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="#E5E7EB" strokeOpacity={0.3} />
              <XAxis 
                dataKey="name" 
                stroke="#6B7280" 
                fontSize={11} 
                fontWeight={500}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#6B7280" 
                fontSize={11} 
                fontWeight={500}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  backdropFilter: 'blur(10px)'
                }}
                labelStyle={{ color: '#374151', fontWeight: 600 }}
                cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeOpacity: 0.3 }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="url(#salesGradient)" 
                strokeWidth={4} 
                dot={{ fill: '#3B82F6', strokeWidth: 3, r: 6, stroke: '#FFFFFF' }}
                activeDot={{ r: 8, fill: '#1D4ED8', stroke: '#FFFFFF', strokeWidth: 3, filter: 'url(#glow)' }}
                filter="url(#glow)"
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="url(#ordersGradient)" 
                strokeWidth={4}
                dot={{ fill: '#10B981', strokeWidth: 3, r: 6, stroke: '#FFFFFF' }}
                activeDot={{ r: 8, fill: '#059669', stroke: '#FFFFFF', strokeWidth: 3, filter: 'url(#glow)' }}
                filter="url(#glow)"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Product Categories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10 rounded-xl border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Product Categories</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your inventory breakdown</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={productData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1}/>
                  <stop offset="50%" stopColor="#7C3AED" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#6D28D9" stopOpacity={0.6}/>
                </linearGradient>
                <filter id="barGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="#E5E7EB" strokeOpacity={0.3} />
              <XAxis 
                dataKey="category" 
                stroke="#6B7280" 
                fontSize={11} 
                fontWeight={500}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#6B7280" 
                fontSize={11} 
                fontWeight={500}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  backdropFilter: 'blur(10px)'
                }}
                labelStyle={{ color: '#374151', fontWeight: 600 }}
                cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
              />
              <Bar 
                dataKey="products" 
                fill="url(#barGradient)" 
                radius={[8, 8, 0, 0]}
                filter="url(#barGlow)"
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[
              { product: 'Wireless Headphones', customer: 'John Doe', amount: '$159.99', status: 'Processing' },
              { product: 'Smart Watch', customer: 'Jane Smith', amount: '$299.99', status: 'Shipped' },
              { product: 'Bluetooth Speaker', customer: 'Mike Johnson', amount: '$79.99', status: 'Delivered' }
            ].map((order, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{order.product}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer} • {order.amount}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Delivered'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    : order.status === 'Shipped'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
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
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
              <p className="font-medium text-blue-900 dark:text-blue-100">Add New Product</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">Expand your inventory</p>
            </button>
            <button className="w-full text-left p-4 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
              <p className="font-medium text-emerald-900 dark:text-emerald-100">Manage Orders</p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">Process customer orders</p>
            </button>
            <button className="w-full text-left p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors">
              <p className="font-medium text-purple-900 dark:text-purple-100">View Analytics</p>
              <p className="text-sm text-purple-600 dark:text-purple-400">Track your performance</p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}