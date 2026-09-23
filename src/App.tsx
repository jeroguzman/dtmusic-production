import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Toaster } from '@/components/ui/sonner'
import { ArtistsProvider } from '@/context/ArtistsProvider'
import ArtistCotizadorPage from '@/pages/ArtistCotizadorPage'
import ArtistOverviewPage from '@/pages/ArtistOverviewPage'
import ArtistPaquetesPage from '@/pages/ArtistPaquetesPage'
import ArtistPromocionesPage from '@/pages/ArtistPromocionesPage'
import ArtistSpotifyPage from '@/pages/ArtistSpotifyPage'
import ArtistVideosPage from '@/pages/ArtistVideosPage'
import CotizadorPage from '@/pages/CotizadorPage'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import VideosPage from '@/pages/VideosPage'

function App() {
  return (
    <BrowserRouter>
      <ArtistsProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="videos" element={<VideosPage />} />
            <Route path="cotizador" element={<CotizadorPage />} />
            <Route path="artistas/:slug" element={<ArtistOverviewPage />} />
            <Route path="artistas/:slug/videos" element={<ArtistVideosPage />} />
            <Route path="artistas/:slug/paquetes" element={<ArtistPaquetesPage />} />
            <Route path="artistas/:slug/promociones" element={<ArtistPromocionesPage />} />
            <Route path="artistas/:slug/spotify" element={<ArtistSpotifyPage />} />
            <Route path="artistas/:slug/cotizador" element={<ArtistCotizadorPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ArtistsProvider>
      <Toaster position="top-center" />
    </BrowserRouter>
  )
}

export default App
