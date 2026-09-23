import { ArtistCard } from '@/components/artist/ArtistCard'
import { useArtistsData } from '@/context/ArtistsProvider'

export default function VideosPage() {
  const { artists } = useArtistsData()
  return (
    <div className="space-y-3 px-5 pb-16 pt-8">
      <h1 className="text-2xl font-extrabold">Videos</h1>
      <p className="text-muted-foreground">Elige un artista para ver sus videos.</p>

      <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist) => (
          <ArtistCard key={artist.slug} artist={artist} to={`/artistas/${artist.slug}/videos`} />
        ))}
      </div>
    </div>
  )
}
