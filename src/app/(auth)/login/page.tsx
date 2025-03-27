'use client'

import TelegramLogin, { TelegramUser } from '@/components/telegram-login'
import { useAuth } from '@/contexts/auth-context'
import { apiClient } from '@/lib/apiClient'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const TELEGRAM_BOT_NAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || 'YOUR_BOT_NAME'

export default function LoginPage() {
  const { login } = useAuth()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('accessToken')
    if (token) {
      // If token exists, update the headers immediately
      apiClient.defaults.headers.common['x-auth-token'] = `Bearer ${token}`
    }
  }, [])

  const handleTelegramAuth = async (user: TelegramUser) => {
    // console.log('Telegram user data:', user)
    try {
      await login(user)
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication')
      console.error(err)
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Background gradient */}
      <div
        className="absolute inset-x-0 top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500 to-purple-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      {/* Header */}
      <div className="px-6 pt-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-white">
              XtremeX
            </Link>
          </div>
        </nav>
      </div>

      <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Welcome to XtremeX</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Sign in with your Telegram account to start trading
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30">
              <div className="text-sm text-red-700 dark:text-red-200">{error}</div>
            </div>
          )}

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                  Secure authentication
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-center">
                <TelegramLogin
                  botName={TELEGRAM_BOT_NAME}
                  onAuth={handleTelegramAuth}
                  buttonSize="large"
                  cornerRadius={8}
                  requestAccess={true}
                />
              </div>

              {/* Modern, simple, clean message with themed color */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-center text-sm text-zinc-500 dark:text-zinc-400">
                <InformationCircleIcon className="h-4 w-4 text-blue-500 dark:text-blue-400" aria-hidden="true" />
                <span>Logging out of XtremeX wont log you out of Telegram</span>
                <InformationCircleIcon className="h-4 w-4 text-blue-500 dark:text-blue-400" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <p className="text-zinc-600 dark:text-zinc-400">
              By signing in, you agree to our{' '}
              <Link href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
