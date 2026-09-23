export type PackageInclude = {
  icon: string
  label: string
}

export type Package = {
  id: string
  name: string
  tagline: string
  image: string
  discountLabel: string
  priceFrom: number
  includes: PackageInclude[]
}

export type Promotion = {
  id: string
  image: string
  heading: string
  subheading: string
  ctaLabel: string
  /** 'designed' = image is a finished banner with its own text baked in (rendered as-is). 'photo' (default) = plain photo, heading/subheading are overlaid. */
  bannerStyle?: 'designed' | 'photo'
}

export type Video = {
  id: string
  title: string
  url: string
  thumbnail: string
}

export type ArtistSocials = {
  facebook?: string
  instagram?: string
  tiktok?: string
  whatsapp?: string
  youtube?: string
}

export type Artist = {
  slug: string
  name: string
  tagline: string
  /** Stylized logo/wordmark image. Falls back to a styled text rendering of `name` when absent. */
  logoImage?: string
  heroImage: string
  accentColor: string
  socials: ArtistSocials
  spotify: {
    artistUrl: string
    embedUrl: string
    coverImage?: string
  }
  packages: Package[]
  promotions: Promotion[]
  videos: Video[]
  gallery: string[]
}
