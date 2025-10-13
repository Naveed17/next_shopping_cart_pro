'use client';

import React, { useState } from 'react';
import { useDashboard } from '@src/context/dashboardContext';
import { Table, Column } from '@src/components/themes/dashboard/shared/tables';
import { Edit, Archive, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InventoryForm from './InventoryForm';

interface InventoryItem {
    id: string;
    productName: string;
    sku: string;
    currentStock: number;
    minStock: number;
    maxStock: number;
    location: string;
    lastUpdated: string;
}

export default function MainInventory() {
    const { hasPermission } = useDashboard();
    const [inventory, setInventory] = useState<InventoryItem[]>([
        { id: '1', productName: 'iPhone 14 Pro', sku: 'IP14P-128', currentStock: 45, minStock: 10, maxStock: 100, location: 'A1-B2', lastUpdated: '2024-01-15' },
        { id: '2', productName: 'MacBook Air M2', sku: 'MBA-M2-256', currentStock: 8, minStock: 5, maxStock: 50, location: 'A2-C1', lastUpdated: '2024-01-14' },
        { id: '3', productName: 'AirPods Pro', sku: 'APP-GEN2', currentStock: 2, minStock: 15, maxStock: 200, location: 'B1-A3', lastUpdated: '2024-01-13' },
        { id: '4', productName: 'Samsung Galaxy S23', sku: 'SGS23-256', currentStock: 25, minStock: 10, maxStock: 80, location: 'A3-B1', lastUpdated: '2024-01-12' },
    ]);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState<'list' | 'form'>('list');
    const [editingItem, setEditingItem] = useState<InventoryItem | undefined>();

    if (!hasPermission('inventory', 'view')) {
        return <div>Access denied</div>;
    }

    const handleEdit = (itemId: string) => {
        const item = inventory.find(i => i.id === itemId);
        setEditingItem(item);
        setView('form');
    };

    const handleFormSubmit = async (data: Omit<InventoryItem, 'id' | 'lastUpdated'>) => {
        if (editingItem) {
            setInventory(inventory.map(i => i.id === editingItem.id ? { 
                ...data, 
                id: editingItem.id, 
                lastUpdated: new Date().toISOString().split('T')[0]
            } : i));
        }
        setView('list');
        setEditingItem(undefined);
    };

    const handleBackToList = () => {
        setView('list');
        setEditingItem(undefined);
    };

    const getStockStatus = (current: number, min: number, max: number) => {
        if (current <= min) return { status: 'low', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/20' };
        if (current >= max) return { status: 'high', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/20' };
        return { status: 'normal', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' };
    };

    const columns: Column<InventoryItem>[] = [
        {
            key: 'product',
            title: 'Product',
            sortKey: 'productName',
            render: (_, record) => (
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <Archive className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{record.productName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{record.sku}</p>
                    </div>
                </div>
            ),
            sortable: true,
        },
        {
            key: 'currentStock',
            title: 'Current Stock',
            dataIndex: 'currentStock',
            render: (stock, record) => {
                const { status, color, bg } = getStockStatus(stock, record.minStock, record.maxStock);
                return (
                    <div className="flex items-center space-x-2">
                        <span className={`font-medium ${color}`}>{stock}</span>
                        {status === 'low' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    </div>
                );
            },
            align: 'center',
            sortable: true,
        },
        {
            key: 'minStock',
            title: 'Min Stock',
            dataIndex: 'minStock',
            render: (min) => (
                <span className="text-gray-900 dark:text-white">{min}</span>
            ),
            align: 'center',
            sortable: true,
        },
        {
            key: 'maxStock',
            title: 'Max Stock',
            dataIndex: 'maxStock',
            render: (max) => (
                <span className="text-gray-900 dark:text-white">{max}</span>
            ),
            align: 'center',
            sortable: true,
        },
        {
            key: 'location',
            title: 'Location',
            dataIndex: 'location',
            render: (location) => (
                <span className="text-gray-900 dark:text-white">{location}</span>
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
                    {hasPermission('inventory', 'edit') && (
                        <button
                            onClick={() => handleEdit(record.id)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                            <Edit className="h-4 w-4" />
                        </button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <AnimatePresence mode="wait">
            {view === 'list' ? (
                <motion.div
                    key="list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory</h1>
                            <p className="text-gray-600 dark:text-gray-400">Manage stock levels and locations</p>
                        </div>
                    </div>

                    <Table
                        columns={columns}
                        data={inventory}
                        loading={loading}
                        rowKey="id"
                        emptyText="No inventory items found"
                        defaultSort={{ key: 'product', order: 'asc' }}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: [5, 10, 20, 50]
                        }}
                    />
                </motion.div>
            ) : (
                <InventoryForm
                    key="form"
                    item={editingItem}
                    onSubmit={handleFormSubmit}
                    onBack={handleBackToList}
                />
            )}
        </AnimatePresence>
    );
}