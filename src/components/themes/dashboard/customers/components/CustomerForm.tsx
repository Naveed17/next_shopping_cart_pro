'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, type ControllerRenderProps } from 'react-hook-form';
import { z as zod } from 'zod';
import { toast } from 'react-toastify';
import Button from '@src/components/core/button/button';
import Input from '@src/components/core/input';
import { Select } from '@src/components/core/select';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const schema = zod.object({
    name: zod.string().min(1, { message: 'Customer name is required' }),
    email: zod.string().min(1, { message: 'Email is required' }).email(),
    phone: zod.string().optional(),
    status: zod.enum(['active', 'inactive']),
});

type Values = zod.infer<typeof schema>;

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

interface CustomerFormProps {
    customer?: Customer;
    onSubmit: (data: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'joinedAt'>) => Promise<void>;
    onBack: () => void;
}

const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
];

export default function CustomerForm({ customer, onSubmit, onBack }: CustomerFormProps) {
    const [isPending, setIsPending] = React.useState(false);

    const defaultValues: Values = {
        name: customer?.name || '',
        email: customer?.email || '',
        phone: customer?.phone || '',
        status: customer?.status || 'active',
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

    React.useEffect(() => {
        reset(defaultValues);
    }, [customer, reset]);

    const handleFormSubmit = async (values: Values) => {
        setIsPending(true);
        try {
            await onSubmit(values);
            toast.success(customer ? 'Customer updated successfully' : 'Customer created successfully');
            onBack();
        } catch (error) {
            toast.error('Failed to save customer');
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
                    <span>Back to Customers</span>
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {customer ? 'Edit Customer' : 'Add Customer'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {customer ? 'Update customer information' : 'Create a new customer account'}
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <Controller
                        control={control}
                        name="name"
                        render={({ field }: { field: ControllerRenderProps<Values, 'name'> }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Full Name
                                </label>
                                <Input
                                    {...field}
                                    placeholder="Enter customer name"
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
                        name="email"
                        render={({ field }: { field: ControllerRenderProps<Values, 'email'> }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email Address
                                </label>
                                <Input
                                    {...field}
                                    type="email"
                                    placeholder="Enter email address"
                                    invalid={!!errors.email}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                                )}
                            </div>
                        )}
                    />

                    <Controller
                        control={control}
                        name="phone"
                        render={({ field }: { field: ControllerRenderProps<Values, 'phone'> }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Phone Number (Optional)
                                </label>
                                <Input
                                    {...field}
                                    type="tel"
                                    placeholder="Enter phone number"
                                    invalid={!!errors.phone}
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
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
                            {customer ? 'Update Customer' : 'Create Customer'}
                        </Button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}