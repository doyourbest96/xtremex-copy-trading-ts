'use client'

import { useEffect, useRef } from 'react'

interface TelegramLoginProps {
  botName: string
  buttonSize?: 'large' | 'medium' | 'small'
  cornerRadius?: number
  requestAccess?: boolean
  usePic?: boolean
  onAuth: (user: TelegramUser) => void
  className?: string
}

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

declare global {
  interface Window {
    TelegramLoginWidget: {
      dataOnauth: (user: TelegramUser) => void
    }
  }
}

export default function TelegramLogin({
  botName,
  buttonSize = 'large',
  cornerRadius = 4,
  requestAccess = true,
  usePic = true,
  onAuth,
  className = '',
}: TelegramLoginProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Define the callback function for Telegram login
    window.TelegramLoginWidget = {
      dataOnauth: (user: TelegramUser) => {
        console.log('Telegram user data:', user)
        onAuth(user)
      },
    }

    // Clean up the container before adding the script
    if (containerRef.current) {
      containerRef.current.innerHTML = ''

      // Create the Telegram login button script
      const script = document.createElement('script')
      script.src = 'https://telegram.org/js/telegram-widget.js?22'
      script.setAttribute('data-telegram-login', botName)
      script.setAttribute('data-size', buttonSize)
      script.setAttribute('data-radius', cornerRadius.toString())
      script.setAttribute('data-request-access', requestAccess ? 'write' : 'read')
      script.setAttribute('data-userpic', usePic.toString())
      // Fix the user reference issue by using a global callback function name
      script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth')
      script.async = true

      containerRef.current.appendChild(script)
    }

    return () => {
      // Clean up
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [botName, buttonSize, cornerRadius, requestAccess, usePic, onAuth])

  // Return a div element (ReactNode) instead of void
  return <div ref={containerRef} className={className} />
}
