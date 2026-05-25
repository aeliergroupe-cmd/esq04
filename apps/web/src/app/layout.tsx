import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/providers/Providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'NOBILITY — Global Textile Trade Platform',
    template: '%s | NOBILITY',
  },
  description:
    'Manage supplier relationships, track opportunities, and close sourcing deals seamlessly across the global textile ecosystem.',
  keywords: ['textile sourcing', 'fashion supply chain', 'fabric procurement', 'supplier management', 'luxury sourcing'],
  authors: [{ name: 'NOBILITY' }],
  openGraph: {
    title: 'NOBILITY — Global Textile Trade Platform',
    description: 'Your global sourcing partner. Manage supplier relationships, track opportunities, and close sourcing deals seamlessly.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F7F3EE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-ivory text-espresso antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
