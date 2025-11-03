'use client'
import {
    LAYOUT_DEFAULT,
} from '@src/constants/theme.constant';
import type { CommonProps } from '@src/@types/common';
import type { LayoutType } from '@src/@types/theme';
import { useAppSelector } from '@redux/store';
import { layoutType } from '@lib/redux/base';
import DefaultLayout from '@src/components/themes/default/components/layout/components/layout';
import { useConfig } from '@lib/configProvider';
import Spinner from '@components/core/spinner';
const layouts: Record<string, React.ComponentType<CommonProps>> = {
    [LAYOUT_DEFAULT]: DefaultLayout,
};

const Layout = ({ children }: CommonProps) => {
    const { loading } = useConfig();
    const layout: LayoutType = useAppSelector(layoutType);

    if (!loading) {
        return <Spinner />;
    }

    const AppLayout = layouts[layout] ?? layouts[LAYOUT_DEFAULT];
    return <AppLayout>{children}</AppLayout>;
};

export default Layout;
