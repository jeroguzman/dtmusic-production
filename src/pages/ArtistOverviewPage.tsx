import { ArrowRight, ChevronRight, CreditCard, Star, Users } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GalleryCarousel } from '@/components/artist/GalleryCarousel'
import { HeroBanner } from '@/components/artist/HeroBanner'
import { VideoCard } from '@/components/artist/VideoCard'
import { VideoModal } from '@/components/artist/VideoModal'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { CarouselDots } from '@/components/ui/carousel-dots'
import type { Video } from '@/data/types'
import { useArtist } from '@/hooks/useArtist'
import { formatMXN } from '@/lib/format'

export default function ArtistOverviewPage() {
  const artist = useArtist()
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null)

  if (!artist) return null

  const promo = artist.promotions[0]
  const videos = artist.videos.slice(0, 3)

  return (
    <div className="pb-16">
      <HeroBanner artist={artist} />

      <section className="px-5 pt-6 text-center">
        <p className="text-muted-foreground">{artist.tagline}</p>
      </section>

      <section className="space-y-3 px-5 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Videos</h3>
          <Link
            to={`/artistas/${artist.slug}/videos`}
            className="flex items-center text-sm font-semibold text-primary"
          >
            Ver todos
            <ChevronRight className="size-4" />
          </Link>
        </div>
        <Carousel opts={{ align: 'start' }} className="space-y-3">
          <CarouselContent>
            {videos.map((video) => (
              <CarouselItem key={video.id} className="basis-[42%] sm:basis-1/4">
                <VideoCard video={video} variant="tile" onClick={setPlayingVideo} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots />
        </Carousel>
      </section>

      <section className="space-y-3 px-5 pt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Paquetes</h3>
          <Link
            to={`/artistas/${artist.slug}/paquetes`}
            className="flex items-center text-sm font-semibold text-primary"
          >
            Ver detalles
            <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {artist.packages.map((pkg, index) => {
            const TierIcon = index === artist.packages.length - 1 ? Star : Users
            return (
              <Link
                key={pkg.id}
                to={`/artistas/${artist.slug}/paquetes`}
                className="rounded-2xl border border-border p-3 text-center transition-colors hover:border-primary"
              >
                <TierIcon className="mx-auto size-5 text-primary" />
                <p className="mt-1.5 text-xs font-semibold text-muted-foreground">{pkg.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">Desde</p>
                <p className="font-black text-primary">{formatMXN(pkg.priceFrom)}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {artist.gallery.length > 0 && (
        <section className="space-y-3 px-5 pt-8">
          <h3 className="text-lg font-bold">Galería de eventos</h3>
          <GalleryCarousel images={artist.gallery} />
        </section>
      )}

      {promo && (
        <section className="px-5 pt-8">
          <Link
            to={`/artistas/${artist.slug}/promociones`}
            className="block rounded-lg bg-linear-to-r from-neutral-950 to-neutral-800 px-5 py-4 sm:rounded-2xl"
          >
            <p className="font-bold text-amber-400">{promo.heading}</p>
            <p className="text-sm text-white/70">{promo.subheading}</p>
          </Link>
        </section>
      )}

      <section className="space-y-3 px-5 pt-8">
        <h3 className="text-lg font-bold">Escucha en Spotify</h3>
        <div className="flex items-start gap-4 rounded-2xl border border-border p-4 sm:items-center">
          <img
            src={artist.spotify.coverImage ?? artist.heroImage}
            alt={artist.name}
            className="size-14 shrink-0 rounded-xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{artist.name}</p>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              Escucha sus éxitos en Spotify y lleva su música a todas partes.
            </p>
          </div>
          <Button asChild size="sm" className="shrink-0">
            <Link to={`/artistas/${artist.slug}/spotify`}>
              Escuchar
              <ChevronRight />
            </Link>
          </Button>
        </div>
      </section>

      <section className="space-y-3 px-5 pt-10">
        <Button asChild size="lg" className="w-full">
          <Link to={`/artistas/${artist.slug}/cotizador`}>
            Cotiza tu evento
            <ArrowRight />
          </Link>
        </Button>
        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <CreditCard className="size-3.5" />
          Paga con tarjeta de crédito o débito
        </p>
      </section>

      <VideoModal video={playingVideo} onOpenChange={(open) => !open && setPlayingVideo(null)} />
    </div>
  )
}
