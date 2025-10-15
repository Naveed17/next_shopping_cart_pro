'use client';

import React, { useState } from 'react';
import { useDashboard } from '@src/context/dashboardContext';
import { Table, Column } from '@src/components/themes/dashboard/shared/tables';
import { DeleteModal } from '@src/components/themes/dashboard/shared/models';
import { Edit, Trash2, Plus, Grid3X3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryForm from './CategoryForm';
import { toast } from 'react-toastify';

interface Category {
    id: string;
    name: string;
    description?: string;
    status: 'active' | 'inactive';
    productCount: number;
}

export default function MainCategory() {
    const { hasPermission } = useDashboard();
    const [categories, setCategories] = useState<Category[]>([
        { id: '1', name: 'Electronics', description: 'Electronic devices and gadgets', status: 'active', productCount: 45 },
        { id: '2', name: 'Clothing', description: 'Fashion and apparel', status: 'active', productCount: 23 },
        { id: '3', name: 'Books', description: 'Books and literature', status: 'inactive', productCount: 12 },
        { id: '4', name: 'Home & Garden', description: 'Home improvement and gardening', status: 'active', productCount: 34 },
    ]);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState<'list' | 'form'>('list');
    const [editingCategory, setEditingCategory] = useState<Category | undefined>();
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; category?: Category }>({ isOpen: false });
    const [isDeleting, setIsDeleting] = useState(false);

    if (!hasPermission('categories', 'view')) {
        return <div>Access denied</div>;
    }

    const handleEdit = (categoryId: string) => {
        const category = categories.find(c => c.id === categoryId);
        setEditingCategory(category);
        setView('form');
    };

    const handleDelete = (categoryId: string) => {
        const category = categories.find(c => c.id === categoryId);
        if (category) {
            setDeleteModal({ isOpen: true, category });
        }
    };

    const confirmDelete = async () => {
        if (!deleteModal.category) return;
        
        setIsDeleting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setCategories(categories.filter(c => c.id !== deleteModal.category!.id));
            toast.success('Category deleted successfully');
            setDeleteModal({ isOpen: false });
        } catch (error) {
            toast.error('Failed to delete category');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleAdd = () => {
        setEditingCategory(undefined);
        setView('form');
    };

    const handleFormSubmit = async (data: Omit<Category, 'id' | 'productCount'>) => {
        if (editingCategory) {
            setCategories(categories.map(c => c.id === editingCategory.id ? { ...data, id: editingCategory.id, productCount: editingCategory.productCount } : c));
        } else {
            const newCategory = { ...data, id: Date.now().toString(), productCount: 0 };
            setCategories([...categories, newCategory]);
        }
        setView('list');
        setEditingCategory(undefined);
    };

    const handleBackToList = () => {
        setView('list');
        setEditingCategory(undefined);
    };

    const columns: Column<Category>[] = [
        {
            key: 'category',
            title: 'Category',
            sortKey: 'name',
            render: (_, record) => (
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <Grid3X3 className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{record.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{record.description}</p>
                    </div>
                </div>
            ),
            sortable: true,
        },
        {
            key: 'productCount',
            title: 'Products',
            dataIndex: 'productCount',
            render: (count) => (
                <span className="font-medium text-gray-900 dark:text-white">
                    {count}
                </span>
            ),
            align: 'center',
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
                    {hasPermission('categories', 'edit') && (
                        <button
                            onClick={() => handleEdit(record.id)}
                            className="p-2 text-blue-600 dark:text-gray-100 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                            <Edit className="h-4 w-4" />
                        </button>
                    )}
                    {hasPermission('categories', 'delete') && (
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
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
                            <p className="text-gray-600 dark:text-gray-400">Manage product categories</p>
                        </div>
                        {hasPermission('categories', 'create') && (
                            <button
                                onClick={handleAdd}
                                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add Category</span>
                            </button>
                        )}
                    </div>

                    <Table
                        columns={columns}
                        data={categories}
                        loading={loading}
                        rowKey="id"
                        emptyText="No categories found"
                        defaultSort={{ key: 'category', order: 'asc' }}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: [5, 10, 20, 50]
                        }}
                    />
                </motion.div>
            ) : (
                <CategoryForm
                    key="form"
                    category={editingCategory}
                    onSubmit={handleFormSubmit}
                    onBack={handleBackToList}
                />
            )}
            
            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false })}
                onConfirm={confirmDelete}
                title="Delete Category"
                message="Are you sure you want to delete"
                itemName={deleteModal.category?.name}
                confirmText="Delete Category"
                isLoading={isDeleting}
            />
        </AnimatePresence>
    );
}