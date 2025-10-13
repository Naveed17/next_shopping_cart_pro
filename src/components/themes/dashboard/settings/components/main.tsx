'use client';

import React, { useState } from 'react';
import { useDashboard } from '@src/context/dashboardContext';
import { motion } from 'framer-motion';
import { Settings, Save } from 'lucide-react';
import Button from '@src/components/core/button/button';
import Input from '@src/components/core/input';
import { Select } from '@src/components/core/select';
import { toast } from 'react-toastify';

export default function MainSettings() {
    const { hasPermission } = useDashboard();
    const [settings, setSettings] = useState({
        siteName: 'NextShoppingCart',
        siteDescription: 'Modern ecommerce platform',
        currency: 'USD',
        taxRate: 10,
        shippingRate: 5.99,
        emailNotifications: true,
        maintenanceMode: false,
    });
    const [loading, setLoading] = useState(false);

    if (!hasPermission('settings', 'view')) {
        return <div>Access denied</div>;
    }

    const currencyOptions = [
        { value: 'USD', label: 'US Dollar (USD)' },
        { value: 'EUR', label: 'Euro (EUR)' },
        { value: 'GBP', label: 'British Pound (GBP)' },
    ];

    const handleSave = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Settings saved successfully');
        } catch (error) {
            toast.error('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string, value: any) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                    <p className="text-gray-600 dark:text-gray-400">Configure platform settings</p>
                </div>
                <Button
                    onClick={handleSave}
                    loading={loading}
                    disabled={loading}
                    className="flex items-center space-x-2"
                >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <Settings className="h-5 w-5 text-gray-500" />
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">General</h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Site Name
                            </label>
                            <Input
                                value={settings.siteName}
                                onChange={(e) => handleInputChange('siteName', e.target.value)}
                                placeholder="Enter site name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Site Description
                            </label>
                            <textarea
                                value={settings.siteDescription}
                                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                                rows={3}
                                placeholder="Enter site description"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Currency
                            </label>
                            <Select
                                options={currencyOptions}
                                value={currencyOptions.find(opt => opt.value === settings.currency)}
                                onChange={(option) => handleInputChange('currency', option?.value || 'USD')}
                                placeholder="Select currency"
                            />
                        </div>
                    </div>
                </div>

                {/* Financial Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Financial</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tax Rate (%)
                            </label>
                            <Input
                                type="number"
                                value={settings.taxRate}
                                onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value) || 0)}
                                placeholder="0"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Shipping Rate ($)
                            </label>
                            <Input
                                type="number"
                                value={settings.shippingRate}
                                onChange={(e) => handleInputChange('shippingRate', parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                    </div>
                </div>

                {/* System Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email Notifications
                                </label>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Send email notifications to users</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Maintenance Mode
                                </label>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Put site in maintenance mode</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.maintenanceMode}
                                    onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}