import { Outlet, useParams } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { getArtistBySlug, useArtistsData } from '@/context/ArtistsProvider'
import { useDefaultArtist } from '@/hooks/useArtist'
import NotFoundPage from '@/pages/NotFoundPage'

export function AppShell() {
  const { slug } = useParams<{ slug: string }>()
  const { artists } = useArtistsData()
  const defaultArtist = useDefaultArtist()
  const activeArtist = slug ? getArtistBySlug(artists, slug) : undefined

  if (slug && !activeArtist) {
    return <NotFoundPage />
  }

  if (!defaultArtist) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5 text-center text-muted-foreground">
        Todavía no hay artistas publicados.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar linkArtist={activeArtist ?? defaultArtist} activeArtist={activeArtist} />
      <main className="pl-24 sm:pl-32">
        <Outlet />
      </main>
    </div>
  )
}
