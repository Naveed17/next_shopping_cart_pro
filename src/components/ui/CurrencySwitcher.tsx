'use client';

import { useState } from 'react';
import { ChevronDown, DollarSign } from 'lucide-react';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

export default function CurrencySwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <DollarSign className="h-4 w-4" />
        <span className="hidden sm:inline">{selectedCurrency.code}</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => {
                setSelectedCurrency(currency);
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
            >
              <span>{currency.symbol}</span>
              <span>{currency.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}