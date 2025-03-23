import { loginWithTelegram } from '@/services/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const telegramUser = await request.json()

    const result = await loginWithTelegram(telegramUser)

    if (result.success) {
      return NextResponse.json({ success: true, user: result.user })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 401 })
    }
  } catch (error) {
    console.error('Telegram auth error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
