'use client'

import TelegramLogin, { TelegramUser } from '@/components/telegram-login'
import { useAuth } from '@/contexts/auth-context'
import { useState } from 'react'

const TELEGRAM_BOT_NAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || 'YOUR_BOT_NAME'

export default function LoginPage() {
  const { login } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const handleTelegramAuth = async (user: TelegramUser) => {
    try {
      await login(user)
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication')
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
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
            botName={TELEGRAM_BOT_NAME}
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
