import { Play } from 'lucide-react'
import type { Video } from '@/data/types'
import { cn } from '@/lib/utils'

export function VideoCard({
  video,
  variant = 'row',
  className,
  onClick,
}: {
  video: Video
  variant?: 'row' | 'tile'
  className?: string
  onClick?: (video: Video) => void
}) {
  if (variant === 'tile') {
    return (
      <button type="button" onClick={() => onClick?.(video)} className={cn('block w-full text-left', className)}>
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play className="size-8 fill-white text-white" />
          </div>
        </div>
        {video.title && <p className="mt-1.5 truncate text-xs font-semibold">{video.title}</p>}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onClick?.(video)}
      className="flex w-full items-center gap-3 border-b border-border py-3 last:border-0"
    >
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
        <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Play className="size-7 fill-white text-white" />
        </div>
      </div>
      {video.title && <p className="truncate text-sm font-semibold">{video.title}</p>}
    </button>
  )
}
