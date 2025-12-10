'use client';

import React, { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, type ControllerRenderProps } from 'react-hook-form';
import { z as zod } from 'zod';
import { toast } from 'react-toastify';
import Button from '@src/components/core/button/button';
import Input from '@src/components/core/input';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const schema = zod.object({
    productName: zod.string().min(1, { message: 'Product name is required' }),
    sku: zod.string().min(1, { message: 'SKU is required' }),
    currentStock: zod.number().min(0, { message: 'Current stock cannot be negative' }),
    minStock: zod.number().min(0, { message: 'Min stock cannot be negative' }),
    maxStock: zod.number().min(1, { message: 'Max stock must be greater than 0' }),
    location: zod.string().min(1, { message: 'Location is required' }),
});

type Values = zod.infer<typeof schema>;

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

interface InventoryFormProps {
    item?: InventoryItem;
    onSubmit: (data: Omit<InventoryItem, 'id' | 'lastUpdated'>) => Promise<void>;
    onBack: () => void;
}

export default function InventoryForm({ item, onSubmit, onBack }: InventoryFormProps) {
    const [isPending, setIsPending] = React.useState(false);

    const defaultValues: Values = useMemo(() => ({
        productName: item?.productName || '',
        sku: item?.sku || '',
        currentStock: item?.currentStock || 0,
        minStock: item?.minStock || 0,
        maxStock: item?.maxStock || 0,
        location: item?.location || '',
    }), [item]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

    React.useEffect(() => {
        reset(defaultValues);
    }, [item, reset, defaultValues]);

    const handleFormSubmit = async (values: Values) => {
        setIsPending(true);
        try {
            await onSubmit(values);
            toast.success('Inventory updated successfully');
            onBack();
        } catch (error) {
            toast.error('Failed to update inventory');
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
                    <span>Back to Inventory</span>
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Update Inventory
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Update stock levels and location information
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Controller
                            control={control}
                            name="productName"
                            render={({ field }: { field: ControllerRenderProps<Values, 'productName'> }) => (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Product Name
                                    </label>
                                    <Input
                                        {...field}
                                        placeholder="Enter product name"
                                        invalid={!!errors.productName}
                                        disabled
                                    />
                                    {errors.productName && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.productName.message}</p>
                                    )}
                                </div>
                            )}
                        />

                        <Controller
                            control={control}
                            name="sku"
                            render={({ field }: { field: ControllerRenderProps<Values, 'sku'> }) => (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        SKU
                                    </label>
                                    <Input
                                        {...field}
                                        placeholder="Enter SKU"
                                        invalid={!!errors.sku}
                                        disabled
                                    />
                                    {errors.sku && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.sku.message}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Controller
                            control={control}
                            name="currentStock"
                            render={({ field }: { field: ControllerRenderProps<Values, 'currentStock'> }) => (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Current Stock
                                    </label>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="0"
                                        invalid={!!errors.currentStock}
                                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                    />
                                    {errors.currentStock && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.currentStock.message}</p>
                                    )}
                                </div>
                            )}
                        />

                        <Controller
                            control={control}
                            name="minStock"
                            render={({ field }: { field: ControllerRenderProps<Values, 'minStock'> }) => (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Min Stock
                                    </label>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="0"
                                        invalid={!!errors.minStock}
                                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                    />
                                    {errors.minStock && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.minStock.message}</p>
                                    )}
                                </div>
                            )}
                        />

                        <Controller
                            control={control}
                            name="maxStock"
                            render={({ field }: { field: ControllerRenderProps<Values, 'maxStock'> }) => (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Max Stock
                                    </label>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="0"
                                        invalid={!!errors.maxStock}
                                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                    />
                                    {errors.maxStock && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.maxStock.message}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    <Controller
                        control={control}
                        name="location"
                        render={({ field }: { field: ControllerRenderProps<Values, 'location'> }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Storage Location
                                </label>
                                <Input
                                    {...field}
                                    placeholder="e.g., A1-B2"
                                    invalid={!!errors.location}
                                />
                                {errors.location && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location.message}</p>
                                )}
                            </div>
                        )}
                    />

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
                            Update Inventory
                        </Button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}