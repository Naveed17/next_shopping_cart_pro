'use client';

import React, { useState } from 'react';
import { useDashboard } from '@src/context/dashboardContext';
import { Table, Column } from '@src/components/themes/dashboard/shared/tables';
import { DeleteModal } from '@src/components/themes/dashboard/shared/models';
import { Edit, Trash2, Plus, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductForm from './ProductForm';
import { toast } from 'react-toastify';

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    status: 'active' | 'inactive';
    description?: string;
}

export default function MainProduct() {
    const { user, hasPermission } = useDashboard();
    const [products, setProducts] = useState<Product[]>([
        { id: '1', name: 'iPhone 14 Pro', price: 999, category: 'Electronics', stock: 45, status: 'active' },
        { id: '2', name: 'MacBook Air M2', price: 1299, category: 'Electronics', stock: 23, status: 'active' },
        { id: '3', name: 'AirPods Pro', price: 249, category: 'Electronics', stock: 0, status: 'inactive' },
        { id: '4', name: 'Samsung Galaxy S23', price: 899, category: 'Electronics', stock: 12, status: 'active' },
    ]);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState<'list' | 'form'>('list');
    const [editingProduct, setEditingProduct] = useState<Product | undefined>();
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; product?: Product }>({ isOpen: false });
    const [isDeleting, setIsDeleting] = useState(false);

    if (!hasPermission('products', 'view')) {
        return <div>Access denied</div>;
    }

    const handleEdit = (productId: string) => {
        const product = products.find(p => p.id === productId);
        setEditingProduct(product);
        setView('form');
    };

    const handleDelete = (productId: string) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            setDeleteModal({ isOpen: true, product });
        }
    };

    const confirmDelete = async () => {
        if (!deleteModal.product) return;
        
        setIsDeleting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setProducts(products.filter(p => p.id !== deleteModal.product!.id));
            toast.success('Product deleted successfully');
            setDeleteModal({ isOpen: false });
        } catch (error) {
            toast.error('Failed to delete product');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleAddProduct = () => {
        setEditingProduct(undefined);
        setView('form');
    };

    const handleFormSubmit = async (data: Omit<Product, 'id'>) => {
        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...data, id: editingProduct.id } : p));
        } else {
            const newProduct = { ...data, id: Date.now().toString() };
            setProducts([...products, newProduct]);
        }
        setView('list');
        setEditingProduct(undefined);
    };

    const handleBackToList = () => {
        setView('list');
        setEditingProduct(undefined);
    };



    const columns: Column<Product>[] = [
        {
            key: 'product',
            title: 'Product',
            sortKey: 'name',
            render: (_, record) => (
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{record.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{record.category}</p>
                    </div>
                </div>
            ),
            sortable: true,
        },
        {
            key: 'price',
            title: 'Price',
            dataIndex: 'price',
            render: (price) => (
                <span className="font-medium text-gray-900 dark:text-white">
                    ${price.toLocaleString()}
                </span>
            ),
            align: 'right',
            sortable: true,
        },
        {
            key: 'stock',
            title: 'Stock',
            dataIndex: 'stock',
            render: (stock) => (
                <span className={`font-medium ${stock === 0 ? 'text-red-600' :
                    stock < 20 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                    {stock}
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
                    {hasPermission('products', 'edit') && (
                        <button
                            onClick={() => handleEdit(record.id)}
                            className="p-2 text-blue-600 dark:text-gray-100 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Edit product"
                        >
                            <Edit className="h-4 w-4" />
                        </button>
                    )}
                    {hasPermission('products', 'delete') && (
                        <button
                            onClick={() => handleDelete(record.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete product"
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
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
                            <p className="text-gray-600 dark:text-gray-400">Manage your product inventory</p>
                        </div>
                        {hasPermission('products', 'create') && (
                            <button
                                onClick={handleAddProduct}
                                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add Product</span>
                            </button>
                        )}
                    </div>

                    <Table
                        columns={columns}
                        data={products}
                        loading={loading}
                        rowKey="id"
                        emptyText="No products found"
                        defaultSort={{ key: 'product', order: 'asc' }}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: [5, 10, 20, 50]
                        }}
                    />
                </motion.div>
            ) : (
                <ProductForm
                    key="form"
                    product={editingProduct}
                    onSubmit={handleFormSubmit}
                    onBack={handleBackToList}
                />
            )}
            
            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false })}
                onConfirm={confirmDelete}
                title="Delete Product"
                message="Are you sure you want to delete"
                itemName={deleteModal.product?.name}
                confirmText="Delete Product"
                isLoading={isDeleting}
            />
        </AnimatePresence>
    );
}