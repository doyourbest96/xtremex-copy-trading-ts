'use client'

import TelegramLogin from '@/components/telegram-login'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const TELEGRAM_BOT_NAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || 'YOUR_BOT_NAME'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleTelegramAuth = async (user: any) => {
    try {
      const response = await fetch('/api/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/')
      } else {
        setError(data.error || 'Authentication failed')
      }
    } catch (err) {
      setError('An error occurred during authentication')
      console.error(err)
    }
  }

  console.log(TELEGRAM_BOT_NAME);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">Sign in to XtremeX Copy Trading</h2>
          <p className="mt-2 text-center text-sm">Use your Telegram account to sign in</p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30">
            <div className="text-sm text-red-700 dark:text-red-200">{error}</div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <TelegramLogin
            botName={TELEGRAM_BOT_NAME} // Replace with your actual bot name
            onAuth={handleTelegramAuth}
            buttonSize="large"
            cornerRadius={8}
            requestAccess={true}
          />
        </div>
      </div>
    </div>
  )
}
