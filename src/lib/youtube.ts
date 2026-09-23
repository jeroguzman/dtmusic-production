export function getYouTubeEmbedUrl(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/i,
  )
  if (!match) return null

  const [, id] = match
  const params = new URLSearchParams({ autoplay: '1', rel: '0', modestbranding: '1' })

  return `https://www.youtube.com/embed/${id}?${params.toString()}`
}
