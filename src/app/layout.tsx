import type { Metadata } from 'next'
import { Syne, DM_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const syne = Syne({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-display', display: 'swap' })
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  title: 'Seismic NFT — Genesis Collection',
  description: 'Join the Seismic Genesis NFT campaign. Complete tasks, refer friends, and earn your spot.',
  openGraph: {
    title: 'Seismic NFT — Genesis Collection',
    description: 'Join the Seismic Genesis NFT campaign.',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable}`}>
      <body className="grain">{children}<Analytics /></body>
    </html>
  )
}
