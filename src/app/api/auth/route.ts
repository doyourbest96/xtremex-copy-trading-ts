import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    // Here you would validate the Telegram auth data
    // This would typically involve checking the hash against your bot token
    // For simplicity, we're just accepting the data as is

    // Set a cookie to maintain the session
    cookies().set({
      name: 'auth_token',
      value: userData.hash,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    // Store user data in a session cookie
    cookies().set({
      name: 'user_data',
      value: JSON.stringify(userData),
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 401 })
  }
}
