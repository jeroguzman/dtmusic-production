import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-6xl font-black text-primary">404</p>
      <h1 className="text-2xl font-bold">No encontramos esta página</h1>
      <p className="text-muted-foreground">El artista o la sección que buscas no existe.</p>
      <Button asChild>
        <Link to="/">Volver al inicio</Link>
      </Button>
    </div>
  )
}
