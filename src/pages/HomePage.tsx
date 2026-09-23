import { ArtistsCarousel } from '@/components/home/ArtistsCarousel'
import { PlatformHero } from '@/components/home/PlatformHero'
import { PromoSlider } from '@/components/home/PromoSlider'
import { SpotifyCarousel } from '@/components/home/SpotifyCarousel'
import { useArtistsData } from '@/context/ArtistsProvider'

export default function HomePage() {
  const { artists } = useArtistsData()
  if (artists.length === 0) return null

  const featured = artists[0]
  const designedPromos = featured.promotions.filter((promo) => promo.bannerStyle === 'designed')

  return (
    <div className="pb-16">
      <PlatformHero ctaHref="/cotizador" />

      <section className="space-y-3 px-5 pt-8">
        <h2 className="text-2xl font-extrabold">Artistas</h2>
        <ArtistsCarousel artists={artists} />
        {designedPromos.length > 0 && (
          <PromoSlider promotions={designedPromos} to={`/artistas/${featured.slug}/promociones`} />
        )}
      </section>

      <section className="space-y-3 px-5 pt-10">
        <h2 className="text-2xl font-extrabold">Escucha nuestra música</h2>
        <SpotifyCarousel artists={artists} />
      </section>
    </div>
  )
}
