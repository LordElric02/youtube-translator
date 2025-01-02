import { oauth2Client, youtube } from '@/lib/youtube'
import VideoList from '@/components/VideoList'

export default async function Dashboard() {
  const scopes = [
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtube.upload'
  ]
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  })
  const response = await youtube.search.list({
    part: ['snippet'],
    forMine: true,
    type: ['video'],
    maxResults: 50
  })

  const videos = response.data.items || []

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your YouTube Videos</h1>
      <VideoList videos={videos} />
    </div>
  )
}

