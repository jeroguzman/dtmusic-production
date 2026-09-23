import { useEffect, useState } from 'react'
import { useCarousel } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

export function CarouselDots({ className }: { className?: string }) {
  const { api } = useCarousel()
  const [selected, setSelected] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => setSelected(api.selectedScrollSnap())
    setCount(api.scrollSnapList().length)
    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  if (count <= 1) return null

  return (
    <div className={cn('flex justify-center gap-1.5', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Ir al elemento ${index + 1}`}
          onClick={() => api?.scrollTo(index)}
          className={cn(
            'h-1.5 rounded-full transition-all',
            index === selected ? 'w-5 bg-primary' : 'w-1.5 bg-muted-foreground/30'
          )}
        />
      ))}
    </div>
  )
}
