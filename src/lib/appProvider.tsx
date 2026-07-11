"use client";

import React from "react";
import { StoreProvider } from "@lib/redux/providers";
import { ConfigProvider } from '@lib/configProvider'
import { QueryClientProvider } from "./react-query";
import { UserProvider } from "@src/components/providers/user-context";
import { ToastContainer } from '@src/components/ui/toast';

export default function AppProvider({ children }: { children?: React.ReactNode }) {
    return (
        <StoreProvider>
            <QueryClientProvider>
                <UserProvider>
                    <ConfigProvider>
                        {children}
                        <ToastContainer />
                    </ConfigProvider>
                </UserProvider>
            </QueryClientProvider>
        </StoreProvider>
    );
}
