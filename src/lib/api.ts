import type { Artist, Package, Promotion, Video } from '@/data/types'
import { PLACEHOLDER_IMAGE } from '@/lib/placeholder'

const API_URL = import.meta.env.VITE_API_URL

type ApiInclude = { icon: string; label: string }
type ApiPackage = {
  id: number
  name: string
  tagline: string
  image: string | null
  discount_label: string
  price_from: string
  includes: ApiInclude[]
}
type ApiPromotion = {
  id: number
  image: string | null
  heading: string
  subheading: string
  cta_label: string
  banner_style: 'designed' | 'photo'
}
type ApiVideo = {
  id: number
  title: string
  url: string
  thumbnail: string | null
}
type ApiGalleryImage = { id: number; image: string | null }
type ApiArtist = {
  slug: string
  name: string
  tagline: string
  logo_image: string | null
  hero_image: string | null
  accent_color: string
  facebook: string
  instagram: string
  tiktok: string
  whatsapp: string
  youtube: string
  spotify_artist_url: string
  spotify_embed_url: string
  spotify_cover_image: string | null
  packages: ApiPackage[]
  promotions: ApiPromotion[]
  videos: ApiVideo[]
  gallery: ApiGalleryImage[]
}
type ApiPlatform = {
  name: string
  hero_image: string | null
  facebook: string
  instagram: string
  tiktok: string
  whatsapp: string
  youtube: string
}
type ApiBootstrap = { platform: ApiPlatform; artists: ApiArtist[] }

export type Platform = { name: string; heroImage: string; socials: Artist['socials'] }
export type Bootstrap = { platform: Platform; artists: Artist[] }

function mapPackage(p: ApiPackage): Package {
  return {
    id: String(p.id),
    name: p.name,
    tagline: p.tagline,
    image: p.image ?? '',
    discountLabel: p.discount_label,
    priceFrom: Number(p.price_from),
    includes: p.includes,
  }
}

function mapPromotion(p: ApiPromotion): Promotion {
  return {
    id: String(p.id),
    image: p.image ?? '',
    heading: p.heading,
    subheading: p.subheading,
    ctaLabel: p.cta_label,
    bannerStyle: p.banner_style,
  }
}

function mapVideo(v: ApiVideo): Video {
  return {
    id: String(v.id),
    title: v.title,
    url: v.url,
    thumbnail: v.thumbnail ?? '',
  }
}

function mapArtist(a: ApiArtist): Artist {
  return {
    slug: a.slug,
    name: a.name,
    tagline: a.tagline,
    logoImage: a.logo_image ?? undefined,
    heroImage: a.hero_image || PLACEHOLDER_IMAGE,
    accentColor: a.accent_color,
    socials: {
      facebook: a.facebook || undefined,
      instagram: a.instagram || undefined,
      tiktok: a.tiktok || undefined,
      whatsapp: a.whatsapp || undefined,
      youtube: a.youtube || undefined,
    },
    spotify: {
      artistUrl: a.spotify_artist_url,
      embedUrl: a.spotify_embed_url,
      coverImage: a.spotify_cover_image ?? undefined,
    },
    packages: a.packages.map(mapPackage),
    promotions: a.promotions.map(mapPromotion),
    videos: a.videos.map(mapVideo),
    gallery: a.gallery.map((g) => g.image).filter((url): url is string => Boolean(url)),
  }
}

export async function fetchBootstrap(): Promise<Bootstrap> {
  const response = await fetch(`${API_URL}/artists/bootstrap/`)
  if (!response.ok) {
    throw new Error(`No se pudo cargar el contenido (${response.status})`)
  }
  const data: ApiBootstrap = await response.json()
  return {
    platform: {
      name: data.platform.name,
      heroImage: data.platform.hero_image ?? '',
      socials: {
        facebook: data.platform.facebook || undefined,
        instagram: data.platform.instagram || undefined,
        tiktok: data.platform.tiktok || undefined,
        whatsapp: data.platform.whatsapp || undefined,
        youtube: data.platform.youtube || undefined,
      },
    },
    artists: data.artists.map(mapArtist),
  }
}
