import { NextRequest, NextResponse } from 'next/server'
import { youtube } from '@/lib/youtube'
import { generateTranscript, translateTranscript, generateVideo } from '@/lib/ai'

export async function POST(request: NextRequest) {
  const { videoId, targetLanguage } = await request.json()

  try {
    // 1. Fetch video details
    const videoResponse = await youtube.videos.list({
      part: ['snippet'],
      id: [videoId]
    })
    const videoTitle = videoResponse.data.items[0].snippet.title

    // 2. Generate transcript
    const transcript = await generateTranscript(videoId)

    // 3. Translate transcript
    const translatedTranscript = await translateTranscript(transcript, targetLanguage)

    // 4. Generate new video with translated audio
    const newVideoUrl = await generateVideo(videoId, translatedTranscript)

    return NextResponse.json({ success: true, videoUrl: newVideoUrl })
  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json({ success: false, error: 'Translation failed' }, { status: 500 })
  }
}

