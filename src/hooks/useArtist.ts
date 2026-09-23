import { useParams } from 'react-router-dom'
import { getArtistBySlug, useArtistsData } from '@/context/ArtistsProvider'

export function useArtist() {
  const { slug } = useParams<{ slug: string }>()
  const { artists } = useArtistsData()
  return getArtistBySlug(artists, slug)
}

export function useDefaultArtist() {
  const { artists } = useArtistsData()
  return artists[0]
}
