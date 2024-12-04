import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteNav } from '@/components/site-nav';
import { Toaster } from '@/components/ui/toaster';
import { Container } from '@/components/ui/container';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif']
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300'],
  display: 'swap',
  preload: true,
  fallback: ['monospace']
});

export const metadata: Metadata = {
  title: 'Sandworm | AuthZed Design System',
  description: 'AuthZed\'s unified design system, providing the structure and resources to create cohesive, scalable, and user-friendly experiences.',
  metadataBase: new URL('https://design-authzed.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.variable,
        jetbrainsMono.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
              <SiteNav className="hidden md:block" />
              <main className="relative py-6 md:py-8">
                <Container>
                  <div className="mx-auto w-full min-w-0">
                    {children}
                  </div>
                </Container>
              </main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}