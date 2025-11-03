import React from 'react';

interface SpinnerProps {
    show?: boolean;
    message?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ show = true, message = 'Loading...' }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/20 via-black/30 to-black/40 dark:from-black/40 dark:via-black/60 dark:to-black/70 backdrop-blur-lg backdrop-saturate-150">
            <div className="flex  space-x-1 max-w-sm mx-4">
                <div className="relative mt-1">
                    <div className="w-6 h-6 border-3 border-gray-300/50 dark:border-gray-600/50 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
                    <div className="absolute inset-0 w-6 h-6 border-3 border-transparent rounded-full animate-pulse border-t-blue-400/60 dark:border-t-blue-300/60"></div>
                </div>
                <div className="text-center">
                    <p className="text-gray-800 dark:text-gray-200 font-medium text-2xl">{message}</p>
                    <div className="flex space-x-1.5 mt-2 justify-center">
                        <div className="w-2.5 h-2.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2.5 h-2.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2.5 h-2.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Spinner };
export default Spinner;
