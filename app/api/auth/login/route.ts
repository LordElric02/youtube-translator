import { NextResponse } from 'next/server'
import { oauth2Client } from '@/lib/youtube'

export async function GET() {
  const scopes = [
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtube.upload'
  ]

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  })

  return NextResponse.redirect(authUrl)
}

