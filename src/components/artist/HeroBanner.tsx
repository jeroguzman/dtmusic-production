import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { Button } from '@/components/ui/button'
import type { Artist } from '@/data/types'

export function HeroBanner({ artist }: { artist: Artist }) {
  return (
    <div className="relative isolate flex min-h-88 flex-col overflow-hidden px-5 pt-5 pb-5 sm:min-h-112">
      <img src={artist.heroImage} alt={artist.name} className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/25 to-black/10" />

      <SocialLinks socials={artist.socials} className="justify-end [&>a]:bg-white/15 [&>a]:text-white [&>a:hover]:bg-white/30" />

      <div className="mt-auto flex flex-col items-center gap-0">
        {artist.logoImage ? (
          <img
            src={artist.logoImage}
            alt={artist.name}
            className="h-48 w-auto max-w-[92%] object-contain sm:h-64"
          />
        ) : (
          <h1
            className="text-center text-4xl font-black uppercase tracking-tight sm:text-5xl"
            style={{ color: artist.accentColor, textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}
          >
            {artist.name}
          </h1>
        )}

        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link to={`/artistas/${artist.slug}/cotizador`}>
            Cotizar evento
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  )
}
