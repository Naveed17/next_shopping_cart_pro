"use client";

import React, { useMemo } from "react";
import { StoreProvider } from "@lib/redux/providers";
import { ConfigProvider } from '@lib/configProvider'
import { buildProvidersTree } from "./buildProvidersTree";
import { QueryClientProvider } from "./react-query";
import { UserProvider } from "@src/context/user-context";
import { ToastContainer } from '@src/components/core/toast';

export default function AppProvider({ children }: { children?: React.ReactNode }) {
    const ProvidersTree = useMemo(() => buildProvidersTree([
        [StoreProvider],
        [QueryClientProvider],
        [UserProvider],
        [ConfigProvider],
    ]), [])
    return (
        <>
            <ProvidersTree>
                {children}
                <ToastContainer />
            </ProvidersTree>

        </>
    );
}
