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
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 64 64"
                                    fill="currentColor"
                                    className="w-16 h-16 text-white animate-bounce"
                                >
                                    {/* Back bag */}
                                    <g transform="translate(10, 0)">
                                        <path
                                            d="M18 20h28a2 2 0 0 1 2 2v26a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V22a2 2 0 0 1 2-2z"
                                            opacity="0.4"
                                        />
                                        <path
                                            d="M24 22v-2a8 8 0 0 1 16 0v2h-3v-2a5 5 0 0 0-10 0v2h-3z"
                                            opacity="0.4"
                                        />
                                    </g>

                                    {/* Front bag (slightly right shifted) */}
                                    <g transform="translate(4, 2)">
                                        <path
                                            d="M14 26h28a2 2 0 0 1 2 2v24a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V28a2 2 0 0 1 2-2z"
                                        />
                                        <path
                                            d="M20 26v-2a6 6 0 0 1 12 0v2h-2v-2a4 4 0 0 0-8 0v2h-2z"
                                        />
                                    </g>
                                </svg>





                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center animate-pulse">
                                <span className="text-xs font-bold text-white">3</span>
                            </div>
                        </div>

                        {/* Loading Dots */}
                        <div className="flex space-x-2 mb-6">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-3 h-3 bg-blue-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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