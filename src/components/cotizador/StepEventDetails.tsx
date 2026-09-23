import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon, Wallet } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { type EventLocation, MapPicker } from '@/components/cotizador/MapPicker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Artist } from '@/data/types'
import { formatMXN } from '@/lib/format'

export type EventDetails = {
  date?: Date
  location: EventLocation | null
  packageId?: string
}

export function StepEventDetails({
  artist,
  details,
  onChange,
  onNext,
}: {
  artist: Artist
  details: EventDetails
  onChange: (details: EventDetails) => void
  onNext: () => void
}) {
  const [touched, setTouched] = useState(false)
  const isComplete = Boolean(details.date && details.location && details.packageId)
  const selectedPackage = artist.packages.find((pkg) => pkg.id === details.packageId)

  return (
    <div className="space-y-6 px-5 pb-24 pt-8">
      <header className="space-y-1 text-center">
        <p className="text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase">{artist.name}</p>
        <h1 className="text-3xl font-black">Cotiza tu evento</h1>
      </header>

      <div className="space-y-2">
        <label className="text-sm font-semibold" htmlFor="fecha">
          Fecha del evento
        </label>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button id="fecha" type="button" variant="outline" className="flex-1 justify-start font-normal">
                <CalendarIcon />
                {details.date ? format(details.date, "d 'de' MMMM, yyyy", { locale: es }) : 'Selecciona una fecha'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={details.date}
                onSelect={(date) => onChange({ ...details, date })}
                disabled={{ before: new Date() }}
                locale={es}
                autoFocus
              />
            </PopoverContent>
          </Popover>
          <Button
            type="button"
            variant="outline"
            onClick={() => toast.info('Fecha disponible para tu evento.')}
          >
            Ver disponibilidad
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">Ubicación del evento</label>
        <MapPicker value={details.location} onChange={(location) => onChange({ ...details, location })} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold" htmlFor="paquete">
          Tipo de paquete
        </label>
        <Select value={details.packageId} onValueChange={(packageId) => onChange({ ...details, packageId })}>
          <SelectTrigger id="paquete" className="w-full">
            <SelectValue placeholder="Selecciona un paquete" />
          </SelectTrigger>
          <SelectContent>
            {artist.packages.map((pkg) => (
              <SelectItem key={pkg.id} value={pkg.id}>
                {pkg.name} · {pkg.tagline}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedPackage && (
          <p className="text-xs text-muted-foreground">
            {selectedPackage.includes.map((i) => i.label).join(', ')} — desde {formatMXN(selectedPackage.priceFrom)}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 rounded-2xl bg-accent px-4 py-3 text-accent-foreground">
        <Wallet className="size-5 shrink-0" />
        <p className="text-sm font-medium">Aparta desde el 20% del valor de tu evento</p>
      </div>

      {touched && !isComplete && (
        <p className="text-center text-sm text-destructive">Completa fecha, ubicación y paquete para continuar.</p>
      )}

      <Button
        size="lg"
        className="w-full"
        onClick={() => {
          setTouched(true)
          if (isComplete) onNext()
        }}
      >
        Ver cotización
      </Button>
    </div>
  )
}
