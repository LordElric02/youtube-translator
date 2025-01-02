import { NextRequest, NextResponse } from 'next/server'
import { oauth2Client } from '@/lib/youtube'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (code) {
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    // Here you would typically save the tokens to your database
    // associated with the user's session

    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.redirect(new URL('/', request.url))
}

