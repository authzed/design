'use client';

import { ThemeProvider } from './theme-provider';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
