import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/artist/PageHeader'
import { PromotionCard } from '@/components/artist/PromotionCard'
import { useArtist } from '@/hooks/useArtist'

export default function ArtistPromocionesPage() {
  const artist = useArtist()
  const navigate = useNavigate()
  if (!artist) return null

  return (
    <div className="space-y-5 pb-16">
      <PageHeader eyebrow={artist.name} title="Promociones" subtitle="Las mejores oportunidades para tu evento" />
      <div className="grid grid-cols-1 gap-5 px-5 sm:grid-cols-2">
        {artist.promotions.map((promo) => (
          <PromotionCard
            key={promo.id}
            promo={promo}
            onQuote={() => navigate(`/artistas/${artist.slug}/cotizador`)}
          />
        ))}
      </div>
    </div>
  )
}
