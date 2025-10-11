'use client'
import dynamic from 'next/dynamic';
import {
    LAYOUT_DEFAULT,
} from '@src/constants/theme.constant';
import type { CommonProps } from '@src/@types/common';
import type { LayoutType } from '@src/@types/theme';
import { useAppSelector } from '@redux/store';
import { layoutType } from '@lib/redux/base';

const DefaultLayout = dynamic(
    // @ts-expect-error - Dynamic import type issue
    () => import('@src/components/themes/default/components/layout/components/layout.tsx'),
    {
        ssr: false
    }
);

const layouts: Record<string, React.ComponentType<CommonProps>> = {
    [LAYOUT_DEFAULT]: DefaultLayout,
};

const Layout = ({ children }: CommonProps) => {
    const layout: LayoutType = useAppSelector(layoutType);

    const AppLayout = layouts[layout] ?? layouts[LAYOUT_DEFAULT];
    return <AppLayout>{children}</AppLayout>;
};

export default Layout;
