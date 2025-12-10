'use client'
import { useState } from 'react';
import { Provider } from 'react-redux';
import { AppStore, store } from "@lib/redux/store";
import PersistGateProvider from './persistGateProvider';


function StoreProvider({ children }: { children: React.ReactNode }) {
    const [storeInstance] = useState(() => store);

    return (
        <Provider store={storeInstance}>
            <PersistGateProvider store={storeInstance}>
                {children}
            </PersistGateProvider>
        </Provider>
    )
}

export default StoreProvider;
