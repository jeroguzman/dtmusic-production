import { useNavigate } from 'react-router-dom'
import { PackageCard } from '@/components/artist/PackageCard'
import { PageHeader } from '@/components/artist/PageHeader'
import type { Package } from '@/data/types'
import { useArtist } from '@/hooks/useArtist'

export default function ArtistPaquetesPage() {
  const artist = useArtist()
  const navigate = useNavigate()
  if (!artist) return null

  function goToQuote(pkg: Package) {
    navigate(`/artistas/${artist!.slug}/cotizador`, { state: { packageId: pkg.id } })
  }

  return (
    <div className="pb-16">
      <PageHeader eyebrow={artist.name} title="Paquetes" subtitle="Sonido profesional para cada momento" />
      <div className="grid grid-cols-1 gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {artist.packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} onQuote={goToQuote} />
        ))}
      </div>
    </div>
  )
}
