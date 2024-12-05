import type { Metadata } from 'next'
import './globals.css'
import dynamic from 'next/dynamic'

const ClientProviders = dynamic(
  () => import('../components/providers/client-providers').then(mod => mod.ClientProviders),
  { ssr: false }
)

export const metadata: Metadata = {
  title: 'Basin - Design Tools',
  description: 'A collection of tools born from our own design challenges, now shared to empower others.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background" suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
