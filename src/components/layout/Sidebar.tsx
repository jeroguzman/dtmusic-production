import type { ComponentType } from 'react'
import { ChevronDown, FileText, Home, Package, PlayCircle, Tag, Users } from 'lucide-react'
import { Fragment, useState } from 'react'
import { FaSpotify } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { ArtistsDropdown } from '@/components/layout/ArtistsDropdown'
import { PlatformLogo } from '@/components/layout/BrandLogo'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useArtistsData } from '@/context/ArtistsProvider'
import type { Artist } from '@/data/types'
import { cn } from '@/lib/utils'

type NavItem = {
  to: string
  label: string
  icon: ComponentType<{ className?: string }>
  end?: boolean
}

function navItems(slug: string, isHome: boolean): NavItem[] {
  const base: NavItem[] = [
    { to: '/', label: 'Inicio', icon: Home, end: true },
    { to: isHome ? '/videos' : `/artistas/${slug}/videos`, label: 'Videos', icon: PlayCircle },
  ]

  if (isHome) {
    return [...base, { to: '/cotizador', label: 'Cotizador', icon: FileText }]
  }

  return [
    ...base,
    { to: `/artistas/${slug}/paquetes`, label: 'Paquetes', icon: Package },
    { to: `/artistas/${slug}/promociones`, label: 'Promociones', icon: Tag },
    { to: `/artistas/${slug}/spotify`, label: 'Spotify', icon: FaSpotify },
    { to: `/artistas/${slug}/cotizador`, label: 'Cotizador', icon: FileText },
  ]
}

const navItemClass =
  'relative flex w-full flex-col items-center gap-1.5 rounded-xl py-3.5 text-xs font-semibold transition-colors hover:bg-muted'

/** Left accent bar that marks the selected sidebar item. */
function SelectedBar() {
  return <span className="absolute inset-y-1.5 left-0 w-1 rounded-r-full bg-primary" />
}

function ArtistsMenuItem() {
  const [open, setOpen] = useState(false)
  const { artists } = useArtistsData()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className={cn(navItemClass, open ? 'text-primary' : 'text-foreground')}>
          {open && <SelectedBar />}
          <Users className={cn('size-6', open ? 'text-primary' : 'text-foreground')} />
          <span className="flex items-center gap-1">
            Artistas
            <ChevronDown className={cn('size-3 transition-transform', open && 'rotate-180')} />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" className="w-80 p-0">
        <ArtistsDropdown artists={artists} onNavigate={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  )
}

export function Sidebar({
  linkArtist,
  activeArtist,
}: {
  /** Artist whose slug is used to build the nav links (current artist, or a default when on the global home). */
  linkArtist: Artist
  /** Artist to brand the sidebar with (logo + socials). Undefined on the global home page. */
  activeArtist?: Artist
}) {
  const isHome = !activeArtist

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-24 flex-col overflow-y-auto border-r border-primary bg-background pb-6 sm:w-32">
      <div className="mb-8">
        <PlatformLogo />
      </div>

      <nav className="flex flex-1 flex-col gap-4">
        {navItems(linkArtist.slug, isHome).map(({ to, label, icon: Icon, end }, index) => (
          <Fragment key={label}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) => cn(navItemClass, isActive ? 'text-primary' : 'text-foreground')}
            >
              {({ isActive }) => (
                <>
                  {isActive && <SelectedBar />}
                  <Icon className={cn('size-6', isActive ? 'text-primary' : 'text-foreground')} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
            {isHome && index === 0 && <ArtistsMenuItem />}
          </Fragment>
        ))}
      </nav>

      {activeArtist && <SocialLinks socials={activeArtist.socials} className="mt-6 flex-wrap justify-center px-3" />}
    </aside>
  )
}
