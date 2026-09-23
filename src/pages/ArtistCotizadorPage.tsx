import { useLocation } from 'react-router-dom'
import { QuoteWizard } from '@/components/cotizador/QuoteWizard'
import { useArtist } from '@/hooks/useArtist'

export default function ArtistCotizadorPage() {
  const artist = useArtist()
  const location = useLocation()
  if (!artist) return null

  const packageId = (location.state as { packageId?: string } | null)?.packageId

  return <QuoteWizard artist={artist} initialPackageId={packageId} />
}
