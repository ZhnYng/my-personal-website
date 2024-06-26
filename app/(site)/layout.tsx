import '../globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import clsx from 'clsx'
import { Search } from 'lucide-react'
import React from 'react'
import { Input } from '@/components/ui/input'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Toaster } from '@/components/ui/toaster'
import { Footer } from '@/components/footer'

const poppins = Poppins({ subsets: ['latin'], weight: ["100", "300", "400", "700", "900"] })

export const metadata: Metadata = {
  title: 'Lim Zhen Yang - Software Developer',
  description: 'Lim Zhen Yang',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx("flex flex-col items-center relative tracking-tight min-h-screen max-w-screen", poppins.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className='max-w-6xl w-full'>
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
