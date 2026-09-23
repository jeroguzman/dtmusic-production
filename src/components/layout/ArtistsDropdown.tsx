import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Artist } from '@/data/types'

export function ArtistsDropdown({ artists, onNavigate }: { artists: Artist[]; onNavigate?: () => void }) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl">
      {artists.map((artist) => (
        <Link
          key={artist.slug}
          to={`/artistas/${artist.slug}`}
          onClick={onNavigate}
          className="flex items-center gap-3 p-3 transition-colors hover:bg-muted"
        >
          <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black">
            <img
              src={artist.logoImage ?? artist.heroImage}
              alt={artist.name}
              className={artist.logoImage ? 'h-9 w-9 object-contain' : 'h-full w-full object-cover'}
            />
          </span>
          <span className="flex-1 font-semibold">{artist.name}</span>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        </Link>
      ))}
    </div>
  )
}
