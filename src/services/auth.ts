import { cookies } from 'next/headers'

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  telegramId?: string
  photo_url?: string
  auth_date: number
  hash: string
}

// This should be replaced with your actual bot token's hash
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''

// Verify the authentication data from Telegram
export async function verifyTelegramAuth(telegramUser: TelegramUser): Promise<boolean> {
  // In a real implementation, you should verify the hash using your bot token
  // This is a simplified version
  const { hash, ...userData } = telegramUser

  // Check if the auth_date is not too old (within 24 hours)
  const authDate = telegramUser.auth_date
  const currentTime = Math.floor(Date.now() / 1000)
  if (currentTime - authDate > 86400) {
    return false
  }

  // In a real implementation, you would:
  // 1. Create a data check string from the user data
  // 2. Calculate the hash using HMAC-SHA-256 with your bot token
  // 3. Compare it with the received hash

  // For now, we'll just return true for demonstration
  return true
}

export async function loginWithTelegram(telegramUser: TelegramUser) {
  const isValid = await verifyTelegramAuth(telegramUser)

  if (isValid) {
    // Store user info in cookies or your preferred state management
    const cookieStore = cookies()
    cookieStore.set('telegram_user_id', telegramUser.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })

    return { success: true, user: telegramUser }
  }

  return { success: false, error: 'Invalid authentication' }
}

export async function getCurrentUser() {
  const cookieStore = cookies()
  const userId = cookieStore.get('telegram_user_id')?.value

  if (!userId) {
    return null
  }

  // In a real app, you would fetch the user from your database
  // For now, we'll just return the user ID
  return { id: parseInt(userId) }
}

export async function logout() {
  const cookieStore = cookies()
  cookieStore.delete('telegram_user_id')
  return { success: true }
}
