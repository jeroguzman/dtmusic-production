import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { fetchBootstrap, type Platform } from '@/lib/api'
import type { Artist } from '@/data/types'

type ArtistsContextValue = {
  artists: Artist[]
  platform: Platform
  loading: boolean
  error: string | null
}

const ArtistsContext = createContext<ArtistsContextValue | undefined>(undefined)

const emptyPlatform: Platform = { name: '', heroImage: '', socials: {} }

export function ArtistsProvider({ children }: { children: ReactNode }) {
  const [artists, setArtists] = useState<Artist[]>([])
  const [platform, setPlatform] = useState<Platform>(emptyPlatform)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBootstrap()
      .then((data) => {
        setArtists(data.artists)
        setPlatform(data.platform)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Cargando…
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5 text-center text-muted-foreground">
        No se pudo cargar el contenido. Intenta de nuevo más tarde.
      </div>
    )
  }

  return <ArtistsContext.Provider value={{ artists, platform, loading, error }}>{children}</ArtistsContext.Provider>
}

export function useArtistsData() {
  const ctx = useContext(ArtistsContext)
  if (!ctx) throw new Error('useArtistsData must be used within an ArtistsProvider')
  return ctx
}

export function getArtistBySlug(artists: Artist[], slug: string | undefined) {
  return artists.find((artist) => artist.slug === slug)
}
