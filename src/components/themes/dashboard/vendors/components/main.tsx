'use client';

import React, { useState } from 'react';
import { useDashboard } from '@src/context/dashboardContext';
import { Table, Column } from '@src/components/themes/dashboard/shared/tables';
import { Edit, Trash2, Plus, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VendorForm from './VendorForm';

interface Vendor {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company: string;
    status: 'active' | 'inactive';
    totalProducts: number;
    totalSales: number;
    joinedAt: string;
}

export default function MainVendors() {
    const { hasPermission } = useDashboard();
    const [vendors, setVendors] = useState<Vendor[]>([
        { id: '1', name: 'Tech Store Inc', email: 'contact@techstore.com', phone: '+1234567890', company: 'Tech Store Inc', status: 'active', totalProducts: 45, totalSales: 15999.99, joinedAt: '2024-01-15' },
        { id: '2', name: 'Fashion Hub', email: 'info@fashionhub.com', phone: '+1234567891', company: 'Fashion Hub LLC', status: 'active', totalProducts: 23, totalSales: 8299.50, joinedAt: '2024-01-10' },
        { id: '3', name: 'Home Goods Co', email: 'sales@homegoods.com', company: 'Home Goods Co', status: 'inactive', totalProducts: 12, totalSales: 2999.99, joinedAt: '2024-01-05' },
    ]);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState<'list' | 'form'>('list');
    const [editingVendor, setEditingVendor] = useState<Vendor | undefined>();

    if (!hasPermission('vendors', 'view')) {
        return <div>Access denied</div>;
    }

    const handleEdit = (vendorId: string) => {
        const vendor = vendors.find(v => v.id === vendorId);
        setEditingVendor(vendor);
        setView('form');
    };

    const handleDelete = (vendorId: string) => {
        if (confirm('Are you sure you want to delete this vendor?')) {
            setVendors(vendors.filter(v => v.id !== vendorId));
        }
    };

    const handleAdd = () => {
        setEditingVendor(undefined);
        setView('form');
    };

    const handleFormSubmit = async (data: Omit<Vendor, 'id' | 'totalProducts' | 'totalSales' | 'joinedAt'>) => {
        if (editingVendor) {
            setVendors(vendors.map(v => v.id === editingVendor.id ? { 
                ...data, 
                id: editingVendor.id, 
                totalProducts: editingVendor.totalProducts,
                totalSales: editingVendor.totalSales,
                joinedAt: editingVendor.joinedAt
            } : v));
        } else {
            const newVendor = { 
                ...data, 
                id: Date.now().toString(), 
                totalProducts: 0, 
                totalSales: 0,
                joinedAt: new Date().toISOString().split('T')[0]
            };
            setVendors([...vendors, newVendor]);
        }
        setView('list');
        setEditingVendor(undefined);
    };

    const handleBackToList = () => {
        setView('list');
        setEditingVendor(undefined);
    };



    const columns: Column<Vendor>[] = [
        {
            key: 'vendor',
            title: 'Vendor',
            sortKey: 'name',
            render: (_, record) => (
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <Store className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{record.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{record.email}</p>
                    </div>
                </div>
            ),
            sortable: true,
        },
        {
            key: 'company',
            title: 'Company',
            dataIndex: 'company',
            render: (company) => (
                <span className="text-gray-900 dark:text-white">
                    {company}
                </span>
            ),
        },
        {
            key: 'totalProducts',
            title: 'Products',
            dataIndex: 'totalProducts',
            render: (products) => (
                <span className="font-medium text-gray-900 dark:text-white">
                    {products}
                </span>
            ),
            align: 'center',
            sortable: true,
        },
        {
            key: 'totalSales',
            title: 'Total Sales',
            dataIndex: 'totalSales',
            render: (sales) => (
                <span className="font-medium text-gray-900 dark:text-white">
                    ${sales.toFixed(2)}
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
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                    {status}
                </span>
            ),
            align: 'center',
        },
        {
            key: 'actions',
            title: 'Actions',
            align: 'center',
            width: 120,
            render: (_, record) => (
                <div className="flex items-center justify-center space-x-2">
                    {hasPermission('vendors', 'edit') && (
                        <button
                            onClick={() => handleEdit(record.id)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                            <Edit className="h-4 w-4" />
                        </button>
                    )}
                    {hasPermission('vendors', 'delete') && (
                        <button
                            onClick={() => handleDelete(record.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                            <Trash2 className="h-4 w-4" />
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
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vendors</h1>
                            <p className="text-gray-600 dark:text-gray-400">Manage vendor accounts</p>
                        </div>
                        {hasPermission('vendors', 'create') && (
                            <button
                                onClick={handleAdd}
                                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add Vendor</span>
                            </button>
                        )}
                    </div>

                    <Table
                        columns={columns}
                        data={vendors}
                        loading={loading}
                        rowKey="id"
                        emptyText="No vendors found"
                        defaultSort={{ key: 'vendor', order: 'asc' }}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: [5, 10, 20, 50]
                        }}
                    />
                </motion.div>
            ) : (
                <VendorForm
                    key="form"
                    vendor={editingVendor}
                    onSubmit={handleFormSubmit}
                    onBack={handleBackToList}
                />
            )}
        </AnimatePresence>
    );
}