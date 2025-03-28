import { AuthProvider } from '@/contexts/auth-context'
import type { Metadata } from 'next'
import type React from 'react'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - XtremeX Copy Trading',
    default: 'XtremeX Copy Trading',
  },
  description: 'Copy trading platform with Telegram authentication',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
