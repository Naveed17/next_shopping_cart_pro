'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Star, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const spendingData = [
  { month: 'Jan', amount: 120 },
  { month: 'Feb', amount: 200 },
  { month: 'Mar', amount: 150 },
  { month: 'Apr', amount: 300 },
  { month: 'May', amount: 250 },
  { month: 'Jun', amount: 400 },
];

const orderData = [
  { category: 'Electronics', orders: 5 },
  { category: 'Clothing', orders: 3 },
  { category: 'Books', orders: 2 },
  { category: 'Home', orders: 2 },
];

export default function MainCustomer() {
  const stats = [
    { name: 'Total Orders', value: '12', change: '+2 this month', icon: ShoppingCart, color: 'blue' },
    { name: 'Delivered', value: '8', change: 'Last: March 15', icon: Package, color: 'green' },
    { name: 'Total Spent', value: '$2,450', change: '+$340 this month', icon: TrendingUp, color: 'purple' },
    { name: 'Average Rating', value: '4.8', change: 'Based on 8 reviews', icon: Star, color: 'yellow' },
  ];

  const recentOrders = [
    { name: 'Wireless Headphones', date: 'March 15, 2024', status: 'Delivered', amount: '$299' },
    { name: 'Smart Watch', date: 'March 20, 2024', status: 'Shipped', amount: '$199' },
    { name: 'Bluetooth Speaker', date: 'April 5, 2024', status: 'Processing', amount: '$89' },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back!</h1>
        <p className="text-gray-600 dark:text-gray-400">Here&apos;s what&apos;s happening with your orders</p>
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
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10 rounded-xl border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Monthly Spending</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your purchase history</p>
            </div>
            <div className="flex space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <span className="text-gray-600 dark:text-gray-400">Spending</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={spendingData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9}/>
                  <stop offset="50%" stopColor="#6366F1" stopOpacity={0.6}/>
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                </linearGradient>
                <filter id="spendingGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="#E5E7EB" strokeOpacity={0.3} />
              <XAxis 
                dataKey="month" 
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
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Spent']} 
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
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#3B82F6" 
                strokeWidth={4}
                fill="url(#spendingGradient)" 
                dot={{ fill: '#3B82F6', strokeWidth: 4, r: 6, stroke: '#FFFFFF' }}
                activeDot={{ r: 10, fill: '#1D4ED8', stroke: '#FFFFFF', strokeWidth: 4, filter: 'url(#spendingGlow)' }}
                filter="url(#spendingGlow)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Orders by Category */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10 rounded-xl border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Orders by Category</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your shopping preferences</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={orderData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={1}/>
                  <stop offset="50%" stopColor="#14B8A6" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.6}/>
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
                cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
              />
              <Bar 
                dataKey="orders" 
                fill="url(#barGradient)" 
                radius={[8, 8, 0, 0]}
                filter="url(#barGlow)"
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h3>
        <div className="space-y-4">
          {recentOrders.map((order, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{order.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{order.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-white">{order.amount}</p>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  order.status === 'Delivered'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    : order.status === 'Shipped'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}