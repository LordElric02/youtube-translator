import { NextRequest, NextResponse } from 'next/server'
import { youtube } from '@/lib/youtube'

export async function POST(request: NextRequest) {
  const { videoUrl, title, description } = await request.json()

  try {
    const res = await youtube.videos.insert({
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title,
          description,
        },
        status: {
          privacyStatus: 'private',
        },
      },
      media: {
        body: videoUrl,
      },
    })

    return NextResponse.json({ success: true, videoId: res.data.id })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 })
  }
}

