import { useState } from 'react'
import { VideoCard } from '@/components/artist/VideoCard'
import { VideoModal } from '@/components/artist/VideoModal'
import type { Video } from '@/data/types'
import { useArtist } from '@/hooks/useArtist'

export default function ArtistVideosPage() {
  const artist = useArtist()
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null)

  if (!artist) return null

  return (
    <div className="space-y-5 px-5 pb-16 pt-8">
      <h1 className="text-2xl font-extrabold">Videos</h1>

      <div>
        {artist.videos.map((video) => (
          <VideoCard key={video.id} video={video} onClick={setPlayingVideo} />
        ))}
      </div>

      {artist.videos.length === 0 && (
        <p className="py-10 text-center text-muted-foreground">No hay videos todavía.</p>
      )}

      <VideoModal video={playingVideo} onOpenChange={(open) => !open && setPlayingVideo(null)} />
    </div>
  )
}
