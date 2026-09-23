import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ArrowRight, CheckCircle2, CreditCard, Landmark, Pencil } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Artist, Package } from '@/data/types'
import { cn } from '@/lib/utils'
import { locationLabel } from './MapPicker'
import type { EventDetails } from './StepEventDetails'

const ladas = ['+52', '+1', '+34', '+57', '+54']

const eventTypes = ['Boda', 'XV años', 'Bautizo', 'Cumpleaños', 'Evento corporativo', 'Otro']

const quoteFormSchema = z.object({
  nombreCompleto: z.string().min(3, 'Ingresa tu nombre completo'),
  lada: z.string(),
  whatsapp: z.string().min(10, 'Ingresa un número de 10 dígitos'),
  tipoEvento: z.string().min(1, 'Selecciona el tipo de evento'),
  horaInicio: z.string().min(1, 'Selecciona una hora'),
  correo: z.string().email('Correo inválido').optional().or(z.literal('')),
  anticipoPercent: z.enum(['20', '30', '40']),
  metodoPago: z.enum(['tarjeta', 'transferencia']),
  terminos: z.boolean().refine((v) => v, { message: 'Debes aceptar los términos y condiciones' }),
})

export type QuoteFormValues = z.infer<typeof quoteFormSchema>

export function StepSummaryForm({
  artist,
  details,
  selectedPackage,
  onEdit,
  onSubmitted,
}: {
  artist: Artist
  details: EventDetails
  selectedPackage?: Package
  onEdit: () => void
  onSubmitted: () => void
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      lada: '+52',
      anticipoPercent: '20',
      metodoPago: 'tarjeta',
      terminos: false,
    },
  })

  function onSubmit() {
    toast.success('¡Cotización enviada! Te contactaremos por WhatsApp para confirmar tu reserva.')
    onSubmitted()
  }

  return (
    <form className="space-y-6 px-5 pb-24 pt-8" onSubmit={handleSubmit(onSubmit)}>
      <header className="space-y-1 text-center">
        <p className="text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase">{artist.name}</p>
        <h1 className="text-3xl font-black">Tu cotización</h1>
        <p className="text-sm font-semibold text-primary">PASO FINAL</p>
      </header>

      <section className="space-y-3 rounded-2xl border border-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Tu evento</h2>
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1 text-sm font-semibold text-primary"
          >
            <Pencil className="size-3.5" />
            Editar
          </button>
        </div>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Fecha</dt>
            <dd className="text-right font-medium">
              {details.date ? format(details.date, "d 'de' MMMM, yyyy", { locale: es }) : 'Según tu selección'}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Ubicación</dt>
            <dd className="text-right font-medium">{locationLabel(details.location) ?? 'Según tu selección'}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Paquete</dt>
            <dd className="text-right font-medium">{selectedPackage?.name ?? 'Según tu selección'}</dd>
          </div>
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="font-bold">Completa tus datos</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="nombreCompleto">Nombre completo</Label>
            <Input id="nombreCompleto" placeholder="Tu nombre completo" {...register('nombreCompleto')} />
            {errors.nombreCompleto && <p className="text-xs text-destructive">{errors.nombreCompleto.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <div className="flex gap-2">
              <Controller
                control={control}
                name="lada"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ladas.map((lada) => (
                        <SelectItem key={lada} value={lada}>
                          {lada}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <Input
                id="whatsapp"
                className="flex-1"
                placeholder="Tu número de WhatsApp"
                inputMode="numeric"
                {...register('whatsapp')}
              />
            </div>
            {errors.whatsapp && <p className="text-xs text-destructive">{errors.whatsapp.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tipoEvento">Tipo de evento</Label>
            <Controller
              control={control}
              name="tipoEvento"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="tipoEvento" className="w-full">
                    <SelectValue placeholder="Selecciona el tipo de evento" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.tipoEvento && <p className="text-xs text-destructive">{errors.tipoEvento.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="horaInicio">Hora de inicio (evento de 5 horas)</Label>
            <Input id="horaInicio" type="time" {...register('horaInicio')} />
            {errors.horaInicio && <p className="text-xs text-destructive">{errors.horaInicio.message}</p>}
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="correo">Correo electrónico (opcional)</Label>
            <Input id="correo" type="email" placeholder="tu@email.com" {...register('correo')} />
            {errors.correo && <p className="text-xs text-destructive">{errors.correo.message}</p>}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-bold">Elige tu anticipo</h2>
        <Controller
          control={control}
          name="anticipoPercent"
          render={({ field }) => (
            <RadioGroup value={field.value} onValueChange={field.onChange} className="grid grid-cols-3 gap-3">
              {(['20', '30', '40'] as const).map((percent) => (
                <Label
                  key={percent}
                  htmlFor={`anticipo-${percent}`}
                  className={cn(
                    'flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-border py-4 font-black',
                    field.value === percent && 'border-primary bg-accent'
                  )}
                >
                  <RadioGroupItem id={`anticipo-${percent}`} value={percent} />
                  {percent}%
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        <p className="text-xs text-muted-foreground">El monto exacto se mostrará antes de pagar.</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-bold">Paga tu anticipo</h2>
        <Controller
          control={control}
          name="metodoPago"
          render={({ field }) => (
            <RadioGroup value={field.value} onValueChange={field.onChange} className="gap-3">
              <Label
                htmlFor="pago-tarjeta"
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-2xl border border-border p-4',
                  field.value === 'tarjeta' && 'border-primary bg-accent'
                )}
              >
                <RadioGroupItem id="pago-tarjeta" value="tarjeta" />
                <CreditCard className="size-5" />
                Tarjeta de crédito o débito
              </Label>
              <Label
                htmlFor="pago-transferencia"
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-2xl border border-border p-4',
                  field.value === 'transferencia' && 'border-primary bg-accent'
                )}
              >
                <RadioGroupItem id="pago-transferencia" value="transferencia" />
                <Landmark className="size-5" />
                Transferencia bancaria
              </Label>
            </RadioGroup>
          )}
        />
        <p className="text-xs text-muted-foreground">
          Al elegir transferencia, verás los datos bancarios y podrás enviar tu comprobante por WhatsApp.
        </p>
        <p className="text-xs text-muted-foreground">
          El saldo se puede pagar por transferencia, con tarjeta en sucursal o en efectivo el día del evento.
        </p>
      </section>

      <Controller
        control={control}
        name="terminos"
        render={({ field }) => (
          <div className="space-y-1">
            <label className="flex items-start gap-2 text-sm">
              <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} />
              Acepto los <span className="font-semibold text-primary underline">términos y condiciones</span>
            </label>
            {errors.terminos && <p className="text-xs text-destructive">{errors.terminos.message}</p>}
          </div>
        )}
      />

      <Button type="submit" size="lg" className="w-full">
        Continuar con mi reserva
        <ArrowRight />
      </Button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <CheckCircle2 className="size-3.5" />
        No se realizará ningún cobro en este demo.
      </p>
    </form>
  )
}
