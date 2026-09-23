import { ChevronRight } from 'lucide-react'
import { ArtistCard } from '@/components/artist/ArtistCard'
import { Carousel, CarouselContent, CarouselItem, useCarousel } from '@/components/ui/carousel'
import { CarouselDots } from '@/components/ui/carousel-dots'
import type { Artist } from '@/data/types'

function NextArrow() {
  const { scrollNext, canScrollNext } = useCarousel()
  if (!canScrollNext) return null

  return (
    <button
      type="button"
      onClick={scrollNext}
      aria-label="Siguiente artista"
      className="absolute top-1/2 right-4 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition-colors hover:bg-white"
    >
      <ChevronRight className="size-5" />
    </button>
  )
}

export function ArtistsCarousel({ artists }: { artists: Artist[] }) {
  return (
    <Carousel opts={{ align: 'start' }} className="space-y-3">
      <div className="relative">
        <CarouselContent>
          {artists.map((artist) => (
            <CarouselItem key={artist.slug} className="basis-[85%] sm:basis-1/2">
              <ArtistCard artist={artist} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <NextArrow />
      </div>
      <CarouselDots />
    </Carousel>
  )
}
