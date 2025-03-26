'use client'

import { TelegramUser } from '@/components/telegram-login'
import { apiClient } from '@/lib/apiClient'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

// Extended user interface
interface AuthUser extends TelegramUser {
  id: number
  username: string
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (userData: TelegramUser) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const storeToken = (accessToken: string) => {
  // Store in localStorage
  localStorage.setItem('accessToken', accessToken)

  // Set a cookie that the server can read
  document.cookie = `auth_token=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
}

// Helper to get token from localStorage
const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null

  return localStorage.getItem('accessToken')
}

const clearToken = () => {
  // Clear from localStorage
  localStorage.removeItem('accessToken')

  // Also clear the cookie
  document.cookie = 'auth_token=; path=/; max-age=0'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Function to fetch user data using the access token
  // Function to fetch user data using the access token
  const fetchUserData = async (): Promise<AuthUser | null> => {
    try {
      const token = getStoredToken()
      if (!token) return null

      const response = await apiClient.get('/auth/me')
      return response.data.data.user
    } catch (error) {
      console.error('Failed to fetch user data:', error)

      // Check if it's an authentication error (401 or 403)
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        // Clear invalid token
        clearToken()
      }

      return null
    }
  }

  useEffect(() => {
    // Check for existing user session on initial load
    const checkUserSession = async () => {
      try {
        const userData = await fetchUserData()

        if (userData) {
          setUser(userData)
        } else if (pathname !== '/' && pathname !== '/login') {
          clearToken()
          router.push('/login')
        }
      } catch (error) {
        console.error('Failed to fetch user session:', error)
        if (pathname !== '/' && pathname !== '/login') {
          router.push('/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkUserSession()
  }, [router, pathname])

  const login = async (telegramData: TelegramUser) => {
    setIsLoading(true)
    try {
      const response = await apiClient.post('/auth/telegram', telegramData)
      const data = response.data

      console.log('Login response:', data)

      if (data.success) {
        // Store token
        storeToken(data.data.accessToken)

        // Set user data
        setUser(data.data.user)

        router.push('/dashboard')
      } else {
        throw new Error(data.error || 'Authentication failed')
      }
    } catch (error) {
      console.error('Login error:', error)

      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'Authentication failed'
        throw new Error(errorMessage)
      }

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      // apiClient will automatically include the token in the request
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear token and user state regardless of API response
      clearToken()
      setUser(null)
      router.push('/login')
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
