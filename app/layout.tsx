import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blackjack Basic Strategy Trainer',
  description: 'Practice optimal Blackjack decisions with instant feedback.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
