'use client'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import useDarkMode from '@hooks/useDarkMode';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const CustomCloseButton = ({ closeToast }: { closeToast?: () => void }) => (
    <span
        style={{
            position: 'absolute',
            top: 8,
            right: 10,
            fontWeight: 700,
            fontSize: 18,
            cursor: 'pointer',
            zIndex: 2,
            lineHeight: 1,
        }}
        onClick={closeToast}
        aria-label="close"
    >
        <X size={16} />
    </span>
);

const CustomIcon = ({ type }: { type?: string }) => {
    switch (type) {
        case 'success':
            return <CheckCircle size={24} className='text-green-500' />;
        case 'error':
            return <AlertCircle size={24} className='text-red-500' />;
        case 'warning':
            return <AlertTriangle size={24} className='text-yellow-500' />;
        case 'info':
            return <Info size={24} className='text-blue-500' />;
        default:
            return <Info size={24} className='text-gray-500' />;
    }
};

function ToastContainerEnhance() {
    const [isEnabled] = useDarkMode();
    const isDark = isEnabled ? true : (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        || (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
    return (
        <ToastContainer
            position="top-center"
            autoClose={3000}
            theme={isDark ? 'dark' : 'light'}
            toastClassName={() =>
                `custom-toast ${isDark ? 'custom-toast-dark' : 'custom-toast-light'}`
            }
            closeButton={CustomCloseButton}
            icon={CustomIcon}
        />
    );
}

export default ToastContainerEnhance