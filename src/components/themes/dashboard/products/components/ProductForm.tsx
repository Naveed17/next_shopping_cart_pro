'use client';

import React, { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, type ControllerRenderProps } from 'react-hook-form';
import { z as zod } from 'zod';
import { toast } from 'react-toastify';
import Button from '@src/components/core/button/button';
import Input from '@src/components/core/input';
import { Select } from '@src/components/core/select';
import { FileUpload } from '@src/components/core/fileupload';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const schema = zod.object({
    name: zod.string().min(1, { message: 'Product name is required' }),
    price: zod.number().min(0.01, { message: 'Price must be greater than 0' }),
    category: zod.string().min(1, { message: 'Category is required' }),
    stock: zod.number().min(0, { message: 'Stock cannot be negative' }),
    status: zod.enum(['active', 'inactive']),
    description: zod.string().optional(),
    image: zod.string().optional(),
});

type Values = zod.infer<typeof schema>;

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    status: 'active' | 'inactive';
    description?: string;
    image?: string;
}

interface ProductFormProps {
    product?: Product;
    onSubmit: (data: Omit<Product, 'id'>) => Promise<void>;
    onBack: () => void;
}

const categoryOptions = [
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Books', label: 'Books' },
    { value: 'Home & Garden', label: 'Home & Garden' },
    { value: 'Sports', label: 'Sports' },
];

const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
];

export default function ProductForm({ product, onSubmit, onBack }: ProductFormProps) {
    const [isPending, setIsPending] = React.useState(false);
    const [imagePreviews, setImagePreviews] = React.useState<string[]>(product?.image ? [product.image] : []);
    const [imageFiles, setImageFiles] = React.useState<File[]>([]);
    const [imageNames, setImageNames] = React.useState<string[]>([]);
    const [imageSizes, setImageSizes] = React.useState<string[]>([]);
    const [imageError, setImageError] = React.useState<string>('');

    const defaultValues: Values = useMemo(() => ({
        name: product?.name || '',
        price: product?.price || 0,
        category: product?.category || '',
        stock: product?.stock || 0,
        status: product?.status || 'active',
        description: product?.description || '',
        image: product?.image || '',
    }), [product]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

    React.useEffect(() => {
        reset(defaultValues);
        setImagePreviews(product?.image ? [product.image] : []);
        setImageFiles([]);
        setImageNames([]);
        setImageSizes([]);
        setImageError('');
    }, [product, reset, defaultValues]);

    const handleFileSelect = (files: File | File[]) => {
        const fileArray = Array.isArray(files) ? files : [files];
        const newFiles = [...imageFiles, ...fileArray];
        const newNames = [...imageNames, ...fileArray.map(f => f.name)];
        const newSizes = [...imageSizes, ...fileArray.map(f => formatFileSize(f.size))];
        
        setImageFiles(newFiles);
        setImageNames(newNames);
        setImageSizes(newSizes);
        
        // Create previews for new files
        const newPreviews = [...imagePreviews];
        fileArray.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                newPreviews.push(result);
                setImagePreviews([...newPreviews]);
            };
            reader.readAsDataURL(file);
        });
        
        setImageError('');
    };

    const handleFileRemove = (index?: number) => {
        if (index !== undefined) {
            const newPreviews = imagePreviews.filter((_, i) => i !== index);
            const newFiles = imageFiles.filter((_, i) => i !== index);
            const newNames = imageNames.filter((_, i) => i !== index);
            const newSizes = imageSizes.filter((_, i) => i !== index);
            
            setImagePreviews(newPreviews);
            setImageFiles(newFiles);
            setImageNames(newNames);
            setImageSizes(newSizes);
        } else {
            setImagePreviews([]);
            setImageFiles([]);
            setImageNames([]);
            setImageSizes([]);
        }
        setImageError('');
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleFormSubmit = async (values: Values) => {
        setIsPending(true);
        try {
            await onSubmit(values);
            toast.success(product ? 'Product updated successfully' : 'Product created successfully');
            onBack();
        } catch (error) {
            toast.error('Failed to save product');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="flex items-center space-x-4">
                <button
                    onClick={onBack}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Products</span>
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {product ? 'Edit Product' : 'Add Product'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {product ? 'Update product information' : 'Create a new product'}
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <Controller
                        control={control}
                        name="name"
                        render={({ field }: { field: ControllerRenderProps<Values, 'name'> }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Product Name
                                </label>
                                <Input
                                    {...field}
                                    placeholder="Enter product name"
                                    invalid={!!errors.name}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                                )}
                            </div>
                        )}
                    />

                    <Controller
                        control={control}
                        name="price"
                        render={({ field }: { field: ControllerRenderProps<Values, 'price'> }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Price ($)
                                </label>
                                <Input
                                    {...field}
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    invalid={!!errors.price}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                                {errors.price && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.price.message}</p>
                                )}
                            </div>
                        )}
                    />

                    <Controller
                        control={control}
                        name="category"
                        render={({ field }: { field: ControllerRenderProps<Values, 'category'> }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Category
                                </label>
                                <Select
                                    options={categoryOptions}
                                    value={categoryOptions.find(opt => opt.value === field.value)}
                                    onChange={(option) => field.onChange(option?.value || '')}
                                    placeholder="Select category"
                                    invalid={!!errors.category}
                                />
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category.message}</p>
                                )}
                            </div>
                        )}
                    />

                    <Controller
                        control={control}
                        name="stock"
                        render={({ field }: { field: ControllerRenderProps<Values, 'stock'> }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Stock Quantity
                                </label>
                                <Input
                                    {...field}
                                    type="number"
                                    placeholder="0"
                                    invalid={!!errors.stock}
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                                {errors.stock && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.stock.message}</p>
                                )}
                            </div>
                        )}
                    />

                    <Controller
                        control={control}
                        name="status"
                        render={({ field }: { field: ControllerRenderProps<Values, 'status'> }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Status
                                </label>
                                <Select
                                    options={statusOptions}
                                    value={statusOptions.find(opt => opt.value === field.value)}
                                    onChange={(option) => field.onChange(option?.value || 'active')}
                                    placeholder="Select status"
                                />
                            </div>
                        )}
                    />

                    <Controller
                        control={control}
                        name="description"
                        render={({ field }: { field: ControllerRenderProps<Values, 'description'> }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description (Optional)
                                </label>
                                <textarea
                                    {...field}
                                    rows={3}
                                    placeholder="Enter product description"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        )}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Product Images (Optional)
                        </label>
                        <FileUpload
                            accept=".png,.jpg,.jpeg,.webp"
                            maxSize={2 * 1024 * 1024}
                            multiple={true}
                            onFileSelect={handleFileSelect}
                            onFileRemove={handleFileRemove}
                            previews={imagePreviews}
                            fileNames={imageNames}
                            fileSizes={imageSizes}
                            placeholder="Click to upload product images"
                            description="PNG/JPG/WEBP format, max 2MB each"
                            error={imageError}
                        />
                    </div>

                    <div className="flex space-x-3 pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onBack}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            loading={isPending}
                            disabled={isPending}
                        >
                            {product ? 'Update Product' : 'Create Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}