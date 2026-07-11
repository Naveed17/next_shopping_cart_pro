'use client';

import { useEffect } from 'react';
import useDarkMode from '@src/hooks/useDarkMode';

export default function DarkModeHandler() {
  const [isEnabled] = useDarkMode();
  
  useEffect(() => {
    // This component just needs to exist to trigger the dark mode hook
  }, [isEnabled]);

  return null;
}