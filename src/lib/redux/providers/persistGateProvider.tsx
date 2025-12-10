'use client'
import { Persistor } from "redux-persist/es/types";
import { PersistGate } from 'redux-persist/integration/react';
import { useState } from "react";
import { persistStore } from "redux-persist";
import { AppStore } from "../store";

function PersistGateProvider({ children, store }: { children: React.ReactNode, store: AppStore }) {
    const [persistor] = useState(() => persistStore(store));

    return (
        <PersistGate loading={false} persistor={persistor}>
            {children}
        </PersistGate>
    )
}

export default PersistGateProvider
