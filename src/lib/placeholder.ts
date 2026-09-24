const PLACEHOLDER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <rect width="24" height="24" fill="#e4e4e7"/>
  <path d="M4 17l4.5-5 3 3 3-4L20 17" stroke="#a1a1aa" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="8" cy="8" r="1.6" fill="#a1a1aa"/>
</svg>
`.trim()

/** Neutral "no image" placeholder, shown when an artist has no cover/hero image yet. */
export const PLACEHOLDER_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(PLACEHOLDER_SVG)}`
