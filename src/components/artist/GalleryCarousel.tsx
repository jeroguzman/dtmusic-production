import { ChevronRight } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, useCarousel } from '@/components/ui/carousel'
import { CarouselDots } from '@/components/ui/carousel-dots'

function NextArrow() {
  const { scrollNext, canScrollNext } = useCarousel()
  if (!canScrollNext) return null

  return (
    <button
      type="button"
      onClick={scrollNext}
      aria-label="Siguiente foto"
      className="absolute top-1/2 right-4 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition-colors hover:bg-white"
    >
      <ChevronRight className="size-5" />
    </button>
  )
}

export function GalleryCarousel({ images }: { images: string[] }) {
  return (
    <Carousel opts={{ align: 'start' }} className="space-y-3">
      <div className="relative">
        <CarouselContent>
          {images.map((src) => (
            <CarouselItem key={src}>
              <img src={src} alt="Galería" className="h-64 w-full rounded-2xl object-cover sm:h-96" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <NextArrow />
      </div>
      <CarouselDots />
    </Carousel>
  )
}
