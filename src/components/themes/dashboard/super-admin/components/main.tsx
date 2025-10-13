'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Package, ShoppingCart, DollarSign, Server, Database, Shield, Activity, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45000, users: 1200 },
  { month: 'Feb', revenue: 52000, users: 1350 },
  { month: 'Mar', revenue: 48000, users: 1280 },
  { month: 'Apr', revenue: 61000, users: 1450 },
  { month: 'May', revenue: 55000, users: 1380 },
  { month: 'Jun', revenue: 67000, users: 1520 },
];

const systemMetrics = [
  { name: 'CPU Usage', value: 45 },
  { name: 'Memory', value: 62 },
  { name: 'Storage', value: 38 },
  { name: 'Network', value: 71 },
];

const userGrowth = [
  { month: 'Jan', customers: 800, vendors: 45 },
  { month: 'Feb', customers: 950, vendors: 52 },
  { month: 'Mar', customers: 1100, vendors: 48 },
  { month: 'Apr', customers: 1280, vendors: 61 },
  { month: 'May', customers: 1450, vendors: 68 },
  { month: 'Jun', customers: 1620, vendors: 75 },
];

export default function MainSuperAdmin() {
  const stats = [
    { name: 'Total Users', value: '12,345', change: '+12%', icon: Users, color: 'blue' },
    { name: 'Total Products', value: '8,901', change: '+8%', icon: Package, color: 'green' },
    { name: 'Total Orders', value: '23,456', change: '+15%', icon: ShoppingCart, color: 'purple' },
    { name: 'Revenue', value: '$1.2M', change: '+22%', icon: DollarSign, color: 'yellow' },
  ];

  const systemHealth = [
    { name: 'API Server', status: 'healthy', uptime: '99.9%', icon: Server },
    { name: 'Database', status: 'healthy', uptime: '99.8%', icon: Database },
    { name: 'Security', status: 'secure', uptime: '100%', icon: Shield },
    { name: 'Performance', status: 'optimal', uptime: '98.5%', icon: Activity },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Super Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Complete system overview and management</p>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-600">All Systems Operational</span>
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
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Users Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10 rounded-xl border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Revenue & User Growth</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Platform performance metrics</p>
            </div>
            <div className="flex space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <span className="text-gray-600 dark:text-gray-400">Revenue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
                <span className="text-gray-600 dark:text-gray-400">Users</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9}/>
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity={0.6}/>
                  <stop offset="100%" stopColor="#D946EF" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="50%" stopColor="#14B8A6" stopOpacity={0.5}/>
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.1}/>
                </linearGradient>
                <filter id="areaGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
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
              />
              <Tooltip 
                formatter={(value, name) => [name === 'revenue' ? `$${value.toLocaleString()}` : value.toLocaleString(), name === 'revenue' ? 'Revenue' : 'Users']} 
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
                dataKey="revenue" 
                stackId="1" 
                stroke="#3B82F6" 
                strokeWidth={3}
                fill="url(#revenueGradient)" 
                filter="url(#areaGlow)"
              />
              <Area 
                type="monotone" 
                dataKey="users" 
                stackId="2" 
                stroke="#10B981" 
                strokeWidth={3}
                fill="url(#usersGradient)" 
                filter="url(#areaGlow)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* System Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10 rounded-xl border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">System Metrics</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time system performance</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={systemMetrics} layout="horizontal" margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
              <defs>
                <linearGradient id="systemGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={1}/>
                  <stop offset="50%" stopColor="#EF4444" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#DC2626" stopOpacity={0.6}/>
                </linearGradient>
                <filter id="systemGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="#E5E7EB" strokeOpacity={0.3} />
              <XAxis 
                type="number" 
                domain={[0, 100]} 
                stroke="#6B7280" 
                fontSize={11} 
                fontWeight={500}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="#6B7280" 
                fontSize={11} 
                fontWeight={500}
                axisLine={false}
                tickLine={false}
                width={50}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Usage']} 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  backdropFilter: 'blur(10px)'
                }}
                labelStyle={{ color: '#374151', fontWeight: 600 }}
                cursor={{ fill: 'rgba(245, 158, 11, 0.1)' }}
              />
              <Bar 
                dataKey="value" 
                fill="url(#systemGradient)" 
                radius={[0, 8, 8, 0]}
                filter="url(#systemGlow)"
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Growth Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="customers" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, fill: '#1D4ED8' }}
              />
              <Line 
                type="monotone" 
                dataKey="vendors" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, fill: '#D97706' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Health</h3>
          <div className="space-y-4">
            {systemHealth.map((system) => (
              <div key={system.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <system.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{system.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Uptime: {system.uptime}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600 capitalize">{system.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}