import { Lightbulb, MonitorSpeaker, Music2, Sparkles, Speaker } from 'lucide-react'

const iconMap = {
  bass: Music2,
  speaker: Speaker,
  monitor: MonitorSpeaker,
  lights: Lightbulb,
  robotic: Sparkles,
} as const

export function PackageIncludeIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = iconMap[icon as keyof typeof iconMap] ?? Sparkles
  return <Icon className={className} />
}
