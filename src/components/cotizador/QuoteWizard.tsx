import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StepEventDetails, type EventDetails } from '@/components/cotizador/StepEventDetails'
import { StepSummaryForm } from '@/components/cotizador/StepSummaryForm'
import { Button } from '@/components/ui/button'
import type { Artist } from '@/data/types'

type WizardStep = 'evento' | 'resumen' | 'confirmado'

export function QuoteWizard({ artist, initialPackageId }: { artist: Artist; initialPackageId?: string }) {
  const [step, setStep] = useState<WizardStep>('evento')
  const [details, setDetails] = useState<EventDetails>({
    location: null,
    packageId: initialPackageId,
  })

  const selectedPackage = artist.packages.find((pkg) => pkg.id === details.packageId)

  if (step === 'confirmado') {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-5 text-center">
        <CheckCircle2 className="size-16 text-primary" />
        <h1 className="text-2xl font-black">¡Listo, {artist.name} confirma tu evento!</h1>
        <p className="max-w-sm text-muted-foreground">
          Recibimos tu solicitud para el{' '}
          {details.date ? format(details.date, "d 'de' MMMM, yyyy", { locale: es }) : 'día seleccionado'}. Te
          contactaremos por WhatsApp para confirmar los detalles y tu anticipo.
        </p>
        <Button asChild size="lg">
          <Link to={`/artistas/${artist.slug}`}>Volver al inicio</Link>
        </Button>
      </div>
    )
  }

  if (step === 'resumen') {
    return (
      <StepSummaryForm
        artist={artist}
        details={details}
        selectedPackage={selectedPackage}
        onEdit={() => setStep('evento')}
        onSubmitted={() => setStep('confirmado')}
      />
    )
  }

  return (
    <StepEventDetails artist={artist} details={details} onChange={setDetails} onNext={() => setStep('resumen')} />
  )
}
