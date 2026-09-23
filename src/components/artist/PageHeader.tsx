export function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <header className="space-y-2 px-5 pt-8 pb-6 text-center">
      <p className="text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase">{eyebrow}</p>
      <h1 className="text-4xl font-black sm:text-5xl">{title}</h1>
      <p className="font-semibold text-primary">{subtitle}</p>
    </header>
  )
}
