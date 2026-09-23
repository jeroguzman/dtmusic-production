import { Link } from 'react-router-dom'
import type { Artist } from '@/data/types'

export function ArtistCard({ artist, to }: { artist: Artist; to?: string }) {
  return (
    <Link
      to={to ?? `/artistas/${artist.slug}`}
      className="relative block h-72 w-full shrink-0 overflow-hidden rounded-2xl"
    >
      <img src={artist.heroImage} alt={artist.name} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
      <p className="absolute inset-x-0 bottom-0 truncate p-4 text-2xl font-extrabold text-white">{artist.name}</p>
    </Link>
  )
}
