'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, type ControllerRenderProps } from 'react-hook-form';
import { z as zod } from 'zod';
import { toast } from 'react-toastify';
import Button from '@src/components/core/button/button';
import Card from '@src/components/core/card/card';
import Input from '@src/components/core/input';
import Link from 'next/link';
import { paths } from '@src/paths';
import { useUser } from '@src/hooks/use-user';
import useLocale from '@hooks/useLocale';

const schema = zod.object({
    name: zod.string().min(1, { message: 'Name is required' }),
    email: zod.string().min(1, { message: 'Email is required' }).email(),
    password: zod.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: zod.string().min(1, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type Values = zod.infer<typeof schema>;

const defaultValues = { name: '', email: '', password: '', confirmPassword: '' } satisfies Values;

export default function SignupForm() {
    const { locale } = useLocale();
    const router = useRouter();
    const { checkSession } = useUser();
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);
    const [isPending, setIsPending] = React.useState<boolean>(false);

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

    const onSubmit = React.useCallback(
        async (values: Values): Promise<void> => {
            setIsPending(true);

            // Mock signup API call - replace with actual implementation
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                await checkSession?.();
                toast.success('Account created successfully');
                router.push(`/${locale}`);
            } catch (error) {
                setError('root', { type: 'server', message: 'Failed to create account' });
            } finally {
                setIsPending(false);
            }
        },
        [checkSession, router, setError]
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Or{' '}
                        <Link href={paths.auth.signIn} className="font-medium text-primary-600 hover:text-primary-500">
                            sign in to your existing account
                        </Link>
                    </p>
                </div>

                <Card className="p-8">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }: { field: ControllerRenderProps<Values, 'name'> }) => (
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Full Name
                                    </label>
                                    <Input
                                        {...field}
                                        id="name"
                                        type="text"
                                        placeholder="Enter your full name"
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
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email address
                                    </label>
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
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
                            name="password"
                            render={({ field }: { field: ControllerRenderProps<Values, 'password'> }) => (
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Password
                                    </label>
                                    <Input
                                        {...field}
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        invalid={!!errors.password}
                                        suffix={
                                            <button
                                                type="button"
                                                className="flex items-center justify-center"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                    </svg>
                                                )}
                                            </button>
                                        }
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                                    )}
                                </div>
                            )}
                        />

                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field }: { field: ControllerRenderProps<Values, 'confirmPassword'> }) => (
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Confirm Password
                                    </label>
                                    <Input
                                        {...field}
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm your password"
                                        invalid={!!errors.confirmPassword}
                                        suffix={
                                            <button
                                                type="button"
                                                className="flex items-center justify-center"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                    </svg>
                                                )}
                                            </button>
                                        }
                                    />
                                    {errors.confirmPassword && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
                                    )}
                                </div>
                            )}
                        />

                        {errors.root && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                                <p className="text-sm text-red-600 dark:text-red-400">{errors.root.message}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            loading={isPending}
                            disabled={isPending}
                        >
                            Create Account
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}