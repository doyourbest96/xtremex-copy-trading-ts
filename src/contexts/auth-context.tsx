'use client'

import { TelegramUser } from '@/components/telegram-login'
import { usePathname, useRouter } from 'next/navigation'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  user: TelegramUser | null
  isLoading: boolean
  login: (userData: TelegramUser) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check for existing user session on initial load
    const checkUserSession = async () => {
      try {
        const response = await fetch('/api/auth/session')
        console.log('Response from /api/auth/session:', response)
        const data = await response.json()
        console.log('Data from /api/auth/session:', data)

        if (data.user) {
          setUser(data.user)
          router.push('/dashboard')
        } else if (pathname !== '/' && pathname !== '/login') {
          router.push('/login')
        }
      } catch (error) {
        console.error('Failed to fetch user session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUserSession()
  }, [router, pathname])

  const login = async (userData: TelegramUser) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      console.log('Login response:', data)

      if (data.success) {
        setUser(userData)
        router.push('/dashboard')
      } else {
        throw new Error(data.error || 'Authentication failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
