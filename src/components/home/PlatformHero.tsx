import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { Button } from '@/components/ui/button'
import { useArtistsData } from '@/context/ArtistsProvider'

export function PlatformHero({ ctaHref }: { ctaHref: string }) {
  const { platform } = useArtistsData()
  return (
    <div className="relative isolate flex min-h-88 flex-col overflow-hidden p-5 sm:min-h-112">
      <img
        src={platform.heroImage}
        alt={platform.name}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[0%_20%]"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/5 to-transparent" />

      <SocialLinks
        socials={platform.socials}
        className="justify-end [&>a]:bg-white/15 [&>a]:text-white [&>a:hover]:bg-white/30"
      />

      <Button asChild size="lg" className="mt-auto w-full sm:w-auto">
        <Link to={ctaHref}>
          Cotizar evento
          <ArrowRight />
        </Link>
      </Button>
    </div>
  )
}
