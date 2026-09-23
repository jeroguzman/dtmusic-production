import { ArrowRight } from 'lucide-react'
import { PackageIncludeIcon } from '@/components/artist/package-include-icon'
import { Button } from '@/components/ui/button'
import type { Package } from '@/data/types'
import { formatMXN } from '@/lib/format'

export function PackageCard({ pkg, onQuote }: { pkg: Package; onQuote?: (pkg: Package) => void }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <img src={pkg.image} alt={pkg.name} className="h-56 w-full object-cover" />
      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-xl font-extrabold">{pkg.name}</h3>
          <p className="font-semibold text-primary">{pkg.tagline}</p>
        </div>

        <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          {pkg.discountLabel}
        </span>

        <div>
          <p className="text-xs text-muted-foreground">Desde</p>
          <p className="text-3xl font-black">{formatMXN(pkg.priceFrom)}</p>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold">Incluye:</p>
          <ul className="space-y-1.5">
            {pkg.includes.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <PackageIncludeIcon icon={item.icon} className="size-4 text-primary" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <Button className="w-full" size="lg" onClick={() => onQuote?.(pkg)}>
          Cotizar este paquete
          <ArrowRight />
        </Button>
      </div>
    </article>
  )
}
