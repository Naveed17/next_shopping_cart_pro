'use client';

import React, { useState } from 'react';
import { useDashboard } from '@src/context/dashboardContext';
import { Table, Column } from '@src/components/themes/dashboard/shared/tables';
import { Eye, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: number;
    createdAt: string;
}

export default function MainOrders() {
    const { hasPermission } = useDashboard();
    const [orders, setOrders] = useState<Order[]>([
        { id: '1001', customerName: 'John Doe', customerEmail: 'john@example.com', total: 299.99, status: 'delivered', items: 3, createdAt: '2024-01-15' },
        { id: '1002', customerName: 'Jane Smith', customerEmail: 'jane@example.com', total: 149.50, status: 'shipped', items: 2, createdAt: '2024-01-14' },
        { id: '1003', customerName: 'Bob Johnson', customerEmail: 'bob@example.com', total: 89.99, status: 'processing', items: 1, createdAt: '2024-01-13' },
        { id: '1004', customerName: 'Alice Brown', customerEmail: 'alice@example.com', total: 199.99, status: 'pending', items: 4, createdAt: '2024-01-12' },
    ]);
    const [loading, setLoading] = useState(false);

    if (!hasPermission('orders', 'view')) {
        return <div>Access denied</div>;
    }

    const handleView = (orderId: string) => {
        console.log('View order:', orderId);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            case 'shipped': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
            case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const columns: Column<Order>[] = [
        {
            key: 'order',
            title: 'Order',
            sortKey: 'id',
            render: (_, record) => (
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">#{record.id}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{record.createdAt}</p>
                    </div>
                </div>
            ),
            sortable: true,
        },
        {
            key: 'customer',
            title: 'Customer',
            sortKey: 'customerName',
            render: (_, record) => (
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">{record.customerName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{record.customerEmail}</p>
                </div>
            ),
            sortable: true,
        },
        {
            key: 'items',
            title: 'Items',
            dataIndex: 'items',
            render: (items) => (
                <span className="font-medium text-gray-900 dark:text-white">
                    {items}
                </span>
            ),
            align: 'center',
            sortable: true,
        },
        {
            key: 'total',
            title: 'Total',
            dataIndex: 'total',
            render: (total) => (
                <span className="font-medium text-gray-900 dark:text-white">
                    ${total.toFixed(2)}
                </span>
            ),
            align: 'right',
            sortable: true,
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            render: (status) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(status)}`}>
                    {status}
                </span>
            ),
            align: 'center',
        },
        {
            key: 'actions',
            title: 'Actions',
            align: 'center',
            width: 80,
            render: (_, record) => (
                <div className="flex items-center justify-center">
                    <button
                        onClick={() => handleView(record.id)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="View order"
                    >
                        <Eye className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage customer orders</p>
                </div>
            </div>

            <Table
                columns={columns}
                data={orders}
                loading={loading}
                rowKey="id"
                emptyText="No orders found"
                defaultSort={{ key: 'order', order: 'desc' }}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 20, 50]
                }}
            />
        </motion.div>
    );
}