'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './providers/theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-lg transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
      ) : (
        <Sun className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
      )}
    </button>
  );
}