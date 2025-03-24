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

  const handleTelegramLogin = (user: TelegramUser) => {
    console.log('Telegram user data:', user)
    onAuth(user)
  }

  useEffect(() => {
    // Add a debug log to verify the component is mounting
    console.log('TelegramLogin component mounted, setting up widget for bot:', botName)

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
      script.setAttribute('data-onauth', 'handleTelegramLogin(user)')
      script.async = true

      // Add event listeners to debug script loading
      script.onload = () => console.log('Telegram widget script loaded successfully')
      script.onerror = (e) => console.error('Error loading Telegram widget script:', e)

      containerRef.current.appendChild(script)
      console.log('Telegram login script added to DOM')
    }

    return () => {
      // Clean up
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      console.log('TelegramLogin component unmounted')
    }
  }, [botName, buttonSize, cornerRadius, requestAccess, usePic, onAuth])

  return <div ref={containerRef} className={className} />
}
