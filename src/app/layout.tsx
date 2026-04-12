import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Seismic NFT — Genesis Collection',
  description: 'Join the Seismic Genesis NFT campaign. Complete tasks, refer friends, and earn your spot.',
  openGraph: {
    title: 'Seismic NFT — Genesis Collection',
    description: 'Join the Seismic Genesis NFT campaign.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain">{children}</body>
    </html>
  )
}
