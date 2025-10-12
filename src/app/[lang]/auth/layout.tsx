import { getDictionary } from '@src/get-dictionary'
import React from 'react'
import { AuthLayout } from '@components/themes/default/components/auth'
import { GuestGuard } from '@lib/auth/guest-guard'
import { Main } from '@components/themes/layout'

export default async function AuthLayoutPage({ params, children }: {
    params: Promise<{ lang: string }>
    children?: React.ReactNode
}) {
    const { lang } = await params
    const dict = await getDictionary(lang as any)
    return (
        <GuestGuard>
            <Main>
                <AuthLayout>
                    {children}
                </AuthLayout>
            </Main>
        </GuestGuard>
    );
}
