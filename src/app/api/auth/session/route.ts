import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const authToken = cookies().get('auth_token')
  const userData = cookies().get('user_data')

  if (authToken && userData) {
    try {
      const user = JSON.parse(userData.value)
      return NextResponse.json({ user })
    } catch (error) {
      return NextResponse.json({ user: null })
    }
  }

  return NextResponse.json({ user: null })
}
