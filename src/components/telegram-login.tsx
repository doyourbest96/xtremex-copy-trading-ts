'use client'

import { useCallback, useEffect, useRef } from 'react'

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
    handleTelegramLogin?: (user: TelegramUser) => void // Make this optional
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

  const handleTelegramLogin = useCallback(
    (user: TelegramUser) => {
      // console.log('Telegram user data:', user)
      onAuth(user)
    },
    [onAuth]
  )

  useEffect(() => {
    // Add a debug log to verify the component is mounting
    console.log('TelegramLogin component mounted, setting up widget for bot:', botName)

    const currentContainer = containerRef.current

    // Attach the function to the window object
    window.handleTelegramLogin = handleTelegramLogin

    // Clean up the container before adding the script
    if (currentContainer) {
      currentContainer.innerHTML = ''

      // Create the Telegram login button script
      const script = document.createElement('script')
      script.src = 'https://telegram.org/js/telegram-widget.js?22'
      script.setAttribute('data-telegram-login', botName)
      script.setAttribute('data-size', buttonSize)
      script.setAttribute('data-radius', cornerRadius.toString())
      script.setAttribute('data-request-access', requestAccess ? 'write' : 'read')
      script.setAttribute('data-userpic', usePic.toString())
      script.setAttribute('data-onauth', 'window.handleTelegramLogin(user)')
      script.async = true

      // Add event listeners to debug script loading
      script.onload = () => console.log('Telegram widget script loaded successfully')
      script.onerror = (e) => console.error('Error loading Telegram widget script:', e)

      currentContainer.appendChild(script)
      console.log('Telegram login script added to DOM')
    }

    return () => {
      // Clean up
      if (currentContainer) {
        currentContainer.innerHTML = ''
      }
      console.log('TelegramLogin component unmounted')
      window.handleTelegramLogin = undefined // Set to undefined instead of deleting
    }
  }, [botName, buttonSize, cornerRadius, requestAccess, usePic, handleTelegramLogin])

  return <div ref={containerRef} className={className} />
}
