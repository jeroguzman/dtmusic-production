import { Dialog, DialogContent } from '@/components/ui/dialog'
import type { Video } from '@/data/types'
import { getYouTubeEmbedUrl } from '@/lib/youtube'

export function VideoModal({ video, onOpenChange }: { video: Video | null; onOpenChange: (open: boolean) => void }) {
  const embedUrl = video ? getYouTubeEmbedUrl(video.url) : null

  return (
    <Dialog open={video !== null} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-xl p-0">
        {video?.title && <p className="px-4 pt-4 text-sm font-semibold">{video.title}</p>}
        {embedUrl && (
          <iframe
            src={embedUrl}
            className="aspect-video w-full"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            allowFullScreen
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
