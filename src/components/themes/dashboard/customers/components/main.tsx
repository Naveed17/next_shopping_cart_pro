'use client';

import React, { useState } from 'react';
import { useDashboard } from '@src/context/dashboardContext';
import { Table, Column } from '@src/components/themes/dashboard/shared/tables';
import { DeleteModal } from '@src/components/themes/dashboard/shared/models';
import { Edit, Trash2, Plus, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomerForm from './CustomerForm';
import { toast } from 'react-toastify';

interface Customer {
    id: string;
    name: string;
    email: string;
    phone?: string;
    status: 'active' | 'inactive';
    totalOrders: number;
    totalSpent: number;
    joinedAt: string;
}

export default function MainCustomers() {
    const { hasPermission } = useDashboard();
    const [customers, setCustomers] = useState<Customer[]>([
        { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', status: 'active', totalOrders: 15, totalSpent: 2499.99, joinedAt: '2024-01-15' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', status: 'active', totalOrders: 8, totalSpent: 1299.50, joinedAt: '2024-01-10' },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive', totalOrders: 3, totalSpent: 299.99, joinedAt: '2024-01-05' },
    ]);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState<'list' | 'form'>('list');
    const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>();
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; customer?: Customer }>({ isOpen: false });
    const [isDeleting, setIsDeleting] = useState(false);

    if (!hasPermission('customers', 'view')) {
        return <div>Access denied</div>;
    }

    const handleEdit = (customerId: string) => {
        const customer = customers.find(c => c.id === customerId);
        setEditingCustomer(customer);
        setView('form');
    };

    const handleDelete = (customerId: string) => {
        const customer = customers.find(c => c.id === customerId);
        if (customer) {
            setDeleteModal({ isOpen: true, customer });
        }
    };

    const confirmDelete = async () => {
        if (!deleteModal.customer) return;
        
        setIsDeleting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setCustomers(customers.filter(c => c.id !== deleteModal.customer!.id));
            toast.success('Customer deleted successfully');
            setDeleteModal({ isOpen: false });
        } catch (error) {
            toast.error('Failed to delete customer');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleAdd = () => {
        setEditingCustomer(undefined);
        setView('form');
    };

    const handleFormSubmit = async (data: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'joinedAt'>) => {
        if (editingCustomer) {
            setCustomers(customers.map(c => c.id === editingCustomer.id ? {
                ...data,
                id: editingCustomer.id,
                totalOrders: editingCustomer.totalOrders,
                totalSpent: editingCustomer.totalSpent,
                joinedAt: editingCustomer.joinedAt
            } : c));
        } else {
            const newCustomer = {
                ...data,
                id: Date.now().toString(),
                totalOrders: 0,
                totalSpent: 0,
                joinedAt: new Date().toISOString().split('T')[0]
            };
            setCustomers([...customers, newCustomer]);
        }
        setView('list');
        setEditingCustomer(undefined);
    };

    const handleBackToList = () => {
        setView('list');
        setEditingCustomer(undefined);
    };

    const columns: Column<Customer>[] = [
        {
            key: 'customer',
            title: 'Customer',
            sortKey: 'name',
            render: (_, record) => (
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
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
            key: 'phone',
            title: 'Phone',
            dataIndex: 'phone',
            render: (phone) => (
                <span className="text-gray-900 dark:text-white">
                    {phone || '-'}
                </span>
            ),
        },
        {
            key: 'totalOrders',
            title: 'Orders',
            dataIndex: 'totalOrders',
            render: (orders) => (
                <span className="font-medium text-gray-900 dark:text-white">
                    {orders}
                </span>
            ),
            align: 'center',
            sortable: true,
        },
        {
            key: 'totalSpent',
            title: 'Total Spent',
            dataIndex: 'totalSpent',
            render: (spent) => (
                <span className="font-medium text-gray-900 dark:text-white">
                    ${spent.toFixed(2)}
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
                    {hasPermission('customers', 'edit') && (
                        <button
                            onClick={() => handleEdit(record.id)}
                            className="p-2 text-blue-600 dark:text-gray-100 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                            <Edit className="h-4 w-4" />
                        </button>
                    )}
                    {hasPermission('customers', 'delete') && (
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
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
                            <p className="text-gray-600 dark:text-gray-400">Manage customer accounts</p>
                        </div>
                        {hasPermission('customers', 'create') && (
                            <button
                                onClick={handleAdd}
                                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add Customer</span>
                            </button>
                        )}
                    </div>

                    <Table
                        columns={columns}
                        data={customers}
                        loading={loading}
                        rowKey="id"
                        emptyText="No customers found"
                        defaultSort={{ key: 'customer', order: 'asc' }}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: [5, 10, 20, 50]
                        }}
                    />
                </motion.div>
            ) : (
                <CustomerForm
                    key="form"
                    customer={editingCustomer}
                    onSubmit={handleFormSubmit}
                    onBack={handleBackToList}
                />
            )}
            
            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false })}
                onConfirm={confirmDelete}
                title="Delete Customer"
                message="Are you sure you want to delete"
                itemName={deleteModal.customer?.name}
                confirmText="Delete Customer"
                isLoading={isDeleting}
            />
        </AnimatePresence>
    );
}