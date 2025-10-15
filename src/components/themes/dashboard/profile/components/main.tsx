'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDashboard } from '@src/context/dashboardContext';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Save, X } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '@src/components/core/button/button';
import Input from '@src/components/core/input';
import { FileUpload } from '@src/components/core/fileupload';

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function MainProfile() {
    const { user, hasPermission } = useDashboard();
    const [isEditing, setIsEditing] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarError, setAvatarError] = useState<string>('');

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: '+1 (555) 123-4567',
            address: '123 Main St, City, State 12345',
            bio: 'Passionate about ecommerce and technology.',
        },
    });

    const formData = watch();

    if (!hasPermission('profile', 'view')) {
        return <div>Access denied</div>;
    }

    const handleFileSelect = (files: File | File[]) => {
        const file = Array.isArray(files) ? files[0] : files;
        setAvatarFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setAvatarPreview(result);
        };
        reader.readAsDataURL(file);
        setAvatarError('');
    };

    const handleFileRemove = () => {
        setAvatarFile(null);
        setAvatarPreview(undefined);
        setAvatarError('');
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const onSubmit = async (data: ProfileFormData) => {
        setIsPending(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Profile updated successfully');
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage your account settings</p>
                </div>
                {hasPermission('profile', 'edit') && (
                    <Button
                        onClick={() => setIsEditing(!isEditing)}
                        variant={isEditing ? "outline" : "primary"}
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
                    <div className="mb-6">
                        {avatarPreview ? (
                            <div className="relative inline-block">
                                <Image
                                    src={avatarPreview}
                                    alt="Profile"
                                    width={96}
                                    height={96}
                                    className="w-24 h-24 rounded-full object-cover mx-auto"
                                />
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={handleFileRemove}
                                        className="absolute -top-2 -right-2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-gray-800 dark:text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-all duration-200"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                                    {user?.name.charAt(0)}
                                </span>
                            </div>
                        )}
                    </div>

                    {isEditing && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Profile Picture
                            </label>
                            <FileUpload
                                accept=".png,.jpg,.jpeg"
                                maxSize={1 * 1024 * 1024}
                                onFileSelect={handleFileSelect}
                                onFileRemove={handleFileRemove}
                                placeholder="Click to upload profile picture"
                                description="PNG/JPG format, max 1MB"
                                error={avatarError}
                            />
                        </div>
                    )}

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{formData.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 capitalize mb-4">{user?.role}</p>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center justify-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>{formData.email}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <Phone className="h-4 w-4" />
                            <span>{formData.phone}</span>
                        </div>
                    </div>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h3>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Full Name
                                </label>
                                <Input
                                    {...register('name')}
                                    disabled={!isEditing}
                                    placeholder="Enter your full name"
                                    invalid={!!errors.name}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email Address
                                </label>
                                <Input
                                    type="email"
                                    {...register('email')}
                                    disabled={!isEditing}
                                    placeholder="Enter your email"
                                    invalid={!!errors.email}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Phone Number
                                </label>
                                <Input
                                    type="tel"
                                    {...register('phone')}
                                    disabled={!isEditing}
                                    placeholder="Enter your phone number"
                                    invalid={!!errors.phone}
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Address
                                </label>
                                <Input
                                    {...register('address')}
                                    disabled={!isEditing}
                                    placeholder="Enter your address"
                                    invalid={!!errors.address}
                                />
                                {errors.address && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Bio
                            </label>
                            <textarea
                                {...register('bio')}
                                disabled={!isEditing}
                                rows={4}
                                placeholder="Tell us about yourself"
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-600 ${errors.bio ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`}
                            />
                            {errors.bio && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.bio.message}</p>
                            )}
                        </div>

                        {isEditing && (
                            <div className="flex justify-end space-x-3 pt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsEditing(false);
                                        reset();
                                    }}
                                    disabled={isPending}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    loading={isPending}
                                    disabled={isPending}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </motion.div>
    );
}