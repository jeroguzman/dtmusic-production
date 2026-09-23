import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Promotion } from '@/data/types'

export function PromoSlider({ promotions, to }: { promotions: Promotion[]; to: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (promotions.length <= 1) return

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % promotions.length)
    }, 4000)

    return () => clearInterval(id)
  }, [promotions.length])

  return (
    <div className="overflow-hidden rounded-lg sm:rounded-2xl">
      <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {promotions.map((promo) => (
          <Link key={promo.id} to={to} className="w-full shrink-0">
            <img src={promo.image} alt={promo.heading} className="h-auto w-full" />
          </Link>
        ))}
      </div>
    </div>
  )
}
