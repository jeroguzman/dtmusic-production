import type { ComponentType } from 'react'
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import type { ArtistSocials } from '@/data/types'
import { cn } from '@/lib/utils'

const items: { key: keyof ArtistSocials; icon: ComponentType<{ className?: string }>; label: string }[] = [
  { key: 'facebook', icon: FaFacebookF, label: 'Facebook' },
  { key: 'instagram', icon: FaInstagram, label: 'Instagram' },
  { key: 'tiktok', icon: FaTiktok, label: 'TikTok' },
  { key: 'whatsapp', icon: FaWhatsapp, label: 'WhatsApp' },
  { key: 'youtube', icon: FaYoutube, label: 'YouTube' },
]

export function SocialLinks({ socials, className }: { socials: ArtistSocials; className?: string }) {
  const active = items.filter((item) => socials[item.key])

  if (active.length === 0) return null

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {active.map(({ key, icon: Icon, label }) => (
        <a
          key={key}
          href={socials[key]}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="flex size-8 items-center justify-center rounded-full bg-foreground/5 text-foreground/80 transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <Icon className="size-3.5" />
        </a>
      ))}
    </div>
  )
}
