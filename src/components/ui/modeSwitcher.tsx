'use client';

import { Moon, Sun } from 'lucide-react';
import useDarkMode from '@hooks/useDarkMode';
export default function ModeSwitcher() {
  const [isEnabled, onModeChange] = useDarkMode();

  return (
    <button
      onClick={() => onModeChange(isEnabled ? 'light' : 'dark')}

      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {!isEnabled ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-600" />
      )}
    </button>
  );
}