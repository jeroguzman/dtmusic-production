# DT Music Productions

Sitio web de la productora musical DT Music. Muestra a los artistas representados y le da a cada uno su propio micrositio con paquetes, videos, promociones, Spotify y un cotizador de eventos.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- shadcn/ui (estilo "nova")
- React Router
- react-hook-form + zod
- Mapbox (`react-map-gl`) para el picker de ubicación del cotizador

## Empezar

```bash
npm install
cp .env.example .env
npm run dev
```

El sitio consume su contenido (artistas, paquetes, promociones, videos, info general) desde la API del backend Django del proyecto `dtmusic`. Necesitas ese backend corriendo localmente (`python manage.py runserver` en `dtmusic/backend`) para ver datos reales en desarrollo; sin él, el sitio muestra un estado de carga/error.

### Mapa del cotizador

El paso de "Ubicación del evento" usa un mapa real de Mapbox. Sin token, muestra un campo de texto para describir la ubicación manualmente. Para habilitar el mapa interactivo:

1. Crea un token en [mapbox.com](https://account.mapbox.com/access-tokens/).
2. Copia `.env.example` a `.env` y agrega el token:

   ```
   VITE_MAPBOX_TOKEN=tu_token_aqui
   ```

### Pagos

El formulario de anticipo del cotizador es solo interfaz: valida los datos y muestra una confirmación simulada, sin procesar ningún cobro. Conectar una pasarela real (Stripe, Conekta, etc.) es trabajo pendiente.

## Datos de artistas

El contenido (artistas, paquetes, promociones, videos, galería e info general de la plataforma) se administra desde el panel admin de DT Music (`/admin/artistas` y `/admin/plataforma` en el frontend Next.js del proyecto `dtmusic`), no desde archivos estáticos. El sitio carga todo en un solo request a `GET {VITE_API_URL}/artists/bootstrap/` al montar la app (ver `src/context/ArtistsProvider.tsx` y `src/lib/api.ts`); los tipos del contrato siguen viviendo en `src/data/types.ts`. Un artista nuevo se agrega desde el panel admin — su micrositio (`/artistas/:slug`, `/videos`, `/paquetes`, `/promociones`, `/spotify`, `/cotizador`) se genera automáticamente a partir del slug.

Variable de entorno requerida: `VITE_API_URL` (ver `.env.example`), apuntando a la API del backend Django (`http://localhost:8000/api` en desarrollo).

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción (`tsc -b && vite build`)
- `npm run lint` — oxlint
- `npm run preview` — sirve el build de producción localmente
