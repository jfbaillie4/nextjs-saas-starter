import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'My App',
  description: 'A multi-tenant B2B SaaS application.',
}

// ClerkProvider wraps the entire app so auth state is available everywhere.
// This is the root layout — every page inherits from it.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
