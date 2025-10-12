'use client';
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@lib/redux/store";
import { setAppData } from "@lib/redux/appData";
import useLocale from "@hooks/useLocale";

interface LoadingContextType {
    loading: boolean;
    setLoading: (v: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
    loading: false,
    setLoading: () => { },
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [fadeClass, setFadeClass] = useState("opacity-0");
    const { locale } = useLocale()
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                await dispatch(setAppData({ language: locale }));
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [dispatch, locale]);
    // Handle fade-in and fade-out
    useEffect(() => {
        if (loading) {
            setShowOverlay(true);
            setTimeout(() => setFadeClass("opacity-100"), 10);
        } else {
            setFadeClass("opacity-0");
            const timeout = setTimeout(() => setShowOverlay(false), 500);
            return () => clearTimeout(timeout);
        }
    }, [loading]);

    // Detect route changes using pathname
    useEffect(() => {
        setLoading(false); // Reset loading when route actually changes
    }, [pathname]);

    // Alternative approach: Listen to browser navigation events
    useEffect(() => {
        const handleStart = () => {
            setLoading(true);
        };

        const handleComplete = () => {
            setLoading(false);
        };

        // Listen to popstate for browser back/forward
        window.addEventListener('beforeunload', handleStart);
        window.addEventListener('popstate', handleComplete);

        // For programmatic navigation, you'll need to call setLoading manually
        // or use the custom hook approach below

        return () => {
            window.removeEventListener('beforeunload', handleStart);
            window.removeEventListener('popstate', handleComplete);
        };
    }, []);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
            {showOverlay && (
                <div
                    className={`fixed inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-purple-50/80 backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-500 ${fadeClass}`}
                >
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 flex flex-col items-center m-4 max-w-sm w-full">
                        {/* Shopping Cart Icon with Animation */}
                        <div className="relative mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <svg className="w-10 h-10 text-white animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                                    <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
                                </svg>
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                                <span className="text-xs font-bold text-yellow-900">!</span>
                            </div>
                        </div>

                        {/* Loading Dots */}
                        <div className="flex space-x-2 mb-6">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                        </div>

                        {/* Loading Text */}
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">NextShoppingCart</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Preparing your shopping experience...</p>
                        </div>
                    </div>
                </div>
            )}
        </LoadingContext.Provider>
    );
};