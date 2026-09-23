import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useArtist } from '@/hooks/useArtist'

export default function ArtistSpotifyPage() {
  const artist = useArtist()
  if (!artist) return null

  return (
    <div className="space-y-5 px-5 pb-16 pt-8">
      <h1 className="text-2xl font-extrabold">Escucha en Spotify</h1>
      <p className="text-muted-foreground">Toda la música de {artist.name}, disponible en Spotify.</p>

      <iframe
        title={`Spotify — ${artist.name}`}
        src={artist.spotify.embedUrl}
        className="h-[154px] w-full rounded-2xl border border-border"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />

      <Button asChild variant="outline" className="w-full">
        <a href={artist.spotify.artistUrl} target="_blank" rel="noreferrer">
          Abrir en Spotify
          <ArrowUpRight />
        </a>
      </Button>
    </div>
  )
}
