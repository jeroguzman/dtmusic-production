import { MapPin } from 'lucide-react'
import { useState } from 'react'
import Map, { Marker } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

const DEFAULT_CENTER = { latitude: 19.4326, longitude: -99.1332 }

export type EventLocation = { latitude: number; longitude: number } | { address: string }

export function locationLabel(location: EventLocation | null) {
  if (!location) return null
  return 'address' in location ? location.address : 'Punto marcado en el mapa'
}

export function MapPicker({
  value,
  onChange,
}: {
  value: EventLocation | null
  onChange: (location: EventLocation) => void
}) {
  const [pickMode, setPickMode] = useState(false)
  const coords = value && 'latitude' in value ? value : null
  const center = coords ?? DEFAULT_CENTER

  if (!MAPBOX_TOKEN) {
    return (
      <div className="space-y-3 rounded-2xl border border-dashed border-border bg-muted/40 p-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <MapPin className="size-6 text-muted-foreground" />
          <p className="text-sm font-medium">Configura tu Mapbox token</p>
          <p className="max-w-xs text-xs text-muted-foreground">
            Agrega <code className="rounded bg-muted px-1 py-0.5">VITE_MAPBOX_TOKEN</code> en tu archivo{' '}
            <code className="rounded bg-muted px-1 py-0.5">.env</code> para habilitar el mapa interactivo. Mientras
            tanto, describe la ubicación manualmente:
          </p>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="direccion-manual">Ubicación del evento</Label>
          <Input
            id="direccion-manual"
            placeholder="Dirección, salón o punto de referencia"
            value={value && 'address' in value ? value.address : ''}
            onChange={(e) => onChange({ address: e.target.value })}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="h-56 overflow-hidden rounded-2xl border border-border">
        <Map
          mapboxAccessToken={MAPBOX_TOKEN}
          initialViewState={{ ...center, zoom: 12 }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          cursor={pickMode ? 'crosshair' : 'grab'}
          onClick={(event) => {
            if (!pickMode) return
            onChange({ latitude: event.lngLat.lat, longitude: event.lngLat.lng })
            setPickMode(false)
          }}
        >
          {coords && (
            <Marker latitude={coords.latitude} longitude={coords.longitude} anchor="bottom">
              <MapPin className="size-8 fill-primary text-primary" />
            </Marker>
          )}
        </Map>
      </div>
      <Button type="button" variant="outline" className="w-full" onClick={() => setPickMode(true)}>
        <MapPin />
        {pickMode ? 'Toca el mapa para marcar el lugar' : 'Elegir en el mapa'}
      </Button>
      <p className="text-center text-xs text-muted-foreground">Marca el lugar exacto, aunque no tenga dirección.</p>
    </div>
  )
}
