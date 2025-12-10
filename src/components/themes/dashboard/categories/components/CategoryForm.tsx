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
    name: zod.string().min(1, { message: 'Category name is required' }),
    description: zod.string().optional(),
    status: zod.enum(['active', 'inactive']),
    image: zod.string().optional(),
});

type Values = zod.infer<typeof schema>;

interface Category {
    id: string;
    name: string;
    description?: string;
    status: 'active' | 'inactive';
    productCount: number;
    image?: string;
}

interface CategoryFormProps {
    category?: Category;
    onSubmit: (data: Omit<Category, 'id' | 'productCount'>) => Promise<void>;
    onBack: () => void;
}

const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
];

export default function CategoryForm({ category, onSubmit, onBack }: CategoryFormProps) {
    const [isPending, setIsPending] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState<string | undefined>(category?.image);
    const [imageFile, setImageFile] = React.useState<File | null>(null);
    const [imageError, setImageError] = React.useState<string>('');

    const defaultValues: Values = useMemo(() => ({
        name: category?.name || '',
        description: category?.description || '',
        status: category?.status || 'active',
        image: category?.image || '',
    }), [category]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

    React.useEffect(() => {
        reset(defaultValues);
        setImagePreview(category?.image);
        setImageFile(null);
        setImageError('');
    }, [category, reset, defaultValues]);

    const handleFileSelect = (files: File | File[]) => {
        const file = Array.isArray(files) ? files[0] : files;
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setImagePreview(result);
        };
        reader.readAsDataURL(file);
        setImageError('');
    };

    const handleFileRemove = () => {
        setImageFile(null);
        setImagePreview(undefined);
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
            toast.success(category ? 'Category updated successfully' : 'Category created successfully');
            onBack();
        } catch (error) {
            toast.error('Failed to save category');
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
                    <span>Back to Categories</span>
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {category ? 'Edit Category' : 'Add Category'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {category ? 'Update category information' : 'Create a new category'}
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <Controller
                        control={control}
                        name="name"
                        render={({ field }: { field: ControllerRenderProps<Values, 'name'> }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Category Name
                                </label>
                                <Input
                                    {...field}
                                    placeholder="Enter category name"
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
                                    placeholder="Enter category description"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        )}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Category Image (Optional)
                        </label>
                        <FileUpload
                            accept=".png,.jpg,.jpeg,.webp"
                            maxSize={1 * 1024 * 1024}
                            onFileSelect={handleFileSelect}
                            onFileRemove={handleFileRemove}
                            previews={imagePreview ? [imagePreview] : []}
                            fileNames={imageFile ? [imageFile.name] : []}
                            fileSizes={imageFile ? [formatFileSize(imageFile.size)] : []}
                            placeholder="Click to upload category image"
                            description="PNG/JPG/WEBP format, max 1MB"
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
                            {category ? 'Update Category' : 'Create Category'}
                        </Button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}