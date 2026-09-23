import { FaSpotify } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { CarouselDots } from '@/components/ui/carousel-dots'
import type { Artist } from '@/data/types'

export function SpotifyCarousel({ artists }: { artists: Artist[] }) {
  return (
    <Carousel opts={{ align: 'start' }} className="space-y-3">
      <CarouselContent>
        {artists.map((artist) => (
          <CarouselItem key={artist.slug} className="basis-[80%] sm:basis-1/2">
            <Link
              to={`/artistas/${artist.slug}/spotify`}
              className="flex h-full items-center gap-4 rounded-2xl border border-border p-4 transition-colors hover:border-primary"
            >
              <img
                src={artist.spotify.coverImage ?? artist.heroImage}
                alt={artist.name}
                className="size-16 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{artist.name}</p>
                <p className="flex items-center gap-1.5 text-sm text-[#1DB954]">
                  <FaSpotify className="size-4" />
                  Spotify
                </p>
              </div>
            </Link>
          </CarouselItem>
        ))}
        <CarouselItem className="basis-[80%] sm:basis-1/2">
          <div className="flex h-full flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-border p-4 text-center text-muted-foreground">
            <FaSpotify className="size-6 opacity-50" />
            <p className="text-sm font-medium">Próximamente</p>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  )
}
