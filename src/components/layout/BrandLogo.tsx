import { Link } from 'react-router-dom'
import dtmusicLogo from '@/assets/images/dtmusic-logo.webp'

export function PlatformLogo() {
  return (
    <Link to="/" className="block overflow-hidden bg-primary p-1.5">
      <img src={dtmusicLogo} alt="DT Music Productions" className="w-full" />
    </Link>
  )
}

export function ArtistLogo({
  name,
  slug,
  accentColor,
  logoImage,
}: {
  name: string
  slug: string
  accentColor: string
  logoImage?: string
}) {
  return (
    <Link to={`/artistas/${slug}`} className="flex flex-col items-center gap-1 px-2 pt-6 text-center">
      {logoImage ? (
        <img src={logoImage} alt={name} className="h-14 w-full object-contain" />
      ) : (
        <span
          className="font-black text-base leading-tight tracking-tight uppercase sm:text-xl"
          style={{ color: accentColor }}
        >
          {name}
        </span>
      )}
    </Link>
  )
}
