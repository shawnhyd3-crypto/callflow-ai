import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CallFlow AI - AI Phone Agents for Small Business',
  description:
    'Set up AI phone agents that answer calls, book appointments, and more. Perfect for small businesses.',
  keywords: [
    'AI',
    'phone agent',
    'voice AI',
    'appointment booking',
    'small business',
  ],
  authors: [{ name: 'CallFlow AI' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://callflow.ai',
    siteName: 'CallFlow AI',
    title: 'CallFlow AI - AI Phone Agents for Small Business',
    description:
      'Set up AI phone agents that answer calls, book appointments, and more.',
    images: [
      {
        url: 'https://callflow.ai/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CallFlow AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CallFlow AI',
    description: 'AI Phone Agents for Small Business',
    creator: '@callflowai',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geist.variable} ${geistMono.variable} bg-slate-950 text-slate-100`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
