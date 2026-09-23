import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Promotion } from '@/data/types'

export function PromotionCard({ promo, onQuote }: { promo: Promotion; onQuote?: (promo: Promotion) => void }) {
  if (promo.bannerStyle === 'designed') {
    return (
      <article className="space-y-3 rounded-lg border border-border p-3 shadow-sm sm:rounded-2xl">
        <img src={promo.image} alt={promo.heading} className="w-full rounded-md object-contain sm:rounded-xl" />
        <Button className="w-full" onClick={() => onQuote?.(promo)}>
          {promo.ctaLabel}
          <ArrowRight />
        </Button>
      </article>
    )
  }

  return (
    <article className="overflow-hidden rounded-lg border border-border shadow-sm sm:rounded-2xl">
      <div
        className="flex min-h-64 flex-col justify-end bg-cover bg-center p-5"
        style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.05)), url(${promo.image})` }}
      >
        <h3 className="text-2xl font-black text-white">{promo.heading}</h3>
        <p className="mb-4 text-sm font-medium text-white/80">{promo.subheading}</p>
        <Button className="w-fit" onClick={() => onQuote?.(promo)}>
          {promo.ctaLabel}
          <ArrowRight />
        </Button>
      </div>
    </article>
  )
}
