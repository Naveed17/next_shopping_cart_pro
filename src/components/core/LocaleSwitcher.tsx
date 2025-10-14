'use client';

import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useFloating, autoUpdate, offset, flip, shift, useClick, useDismiss, useRole, useInteractions, FloatingPortal } from '@floating-ui/react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

export default function LocaleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'language' | 'currency'>('language');
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{selectedLanguage.code.toUpperCase()}</span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">{selectedCurrency.code}</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="w-64 bg-blue-50/80 dark:bg-blue-900/80 backdrop-blur-xl border border-blue-200/50 dark:border-blue-700/50 rounded-xl shadow-xl z-50"
          >
            {/* Tabs */}
            <div className="flex border-b border-blue-200/30 dark:border-blue-700/30">
              <button
                onClick={() => setActiveTab('language')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'language'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-800/50'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Language
              </button>
              <button
                onClick={() => setActiveTab('currency')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'currency'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-800/50'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Currency
              </button>
            </div>

            {/* Content */}
            <div className="p-2">
              {activeTab === 'language' ? (
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100/50 dark:hover:bg-blue-800/50 rounded-lg transition-colors"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        setSelectedCurrency(currency);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100/50 dark:hover:bg-blue-800/50 rounded-lg transition-colors"
                    >
                      <span className="text-lg font-semibold">{currency.symbol}</span>
                      <span>{currency.code} - {currency.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </FloatingPortal>
    </>
  );
}