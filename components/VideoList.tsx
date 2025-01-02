import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function VideoList({ videos }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div key={video.id.videoId} className="border rounded-lg p-4">
          <img 
            src={video.snippet.thumbnails.medium.url} 
            alt={video.snippet.title} 
            className="w-full h-48 object-cover mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">{video.snippet.title}</h2>
          <p className="text-gray-600 mb-4">{video.snippet.description}</p>
          <Link href={`/translate/${video.id.videoId}`}>
            <Button>Translate Video</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}

