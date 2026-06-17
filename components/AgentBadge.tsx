// components/AgentBadge.tsx
import { AGENTS, type AgentKey } from '@/lib/types'

interface AgentBadgeProps {
  agent:      AgentKey
  size?:      'sm' | 'md'    // sm = 32px icon, md = 38px (default md)
  showLabel?: boolean
  className?: string
}

export default function AgentBadge({
  agent, size = 'md', showLabel = false, className = '',
}: AgentBadgeProps) {
  const cfg   = AGENTS.find(a => a.key === agent)!
  const dim   = size === 'sm' ? 32 : 38
  const r     = size === 'sm' ? 10 : 11
  const iSize = size === 'sm' ? 17 : 20

  const icons: Record<AgentKey, React.ReactNode> = {
    monitoramento: (
      <svg width={iSize} height={iSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 2a10 10 0 0 1 10 10M12 6a6 6 0 0 1 6 6"/>
      </svg>
    ),
    relatorios: (
      <svg width={iSize} height={iSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v5h5M9 13h6M9 17h4"/>
      </svg>
    ),
    assistencia: (
      <svg width={iSize} height={iSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>
      </svg>
    ),
    treinamento: (
      <svg width={iSize} height={iSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2.7 9 2.7 12 0v-5"/>
      </svg>
    ),
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="flex items-center justify-center flex-shrink-0 text-white"
        style={{ width: dim, height: dim, borderRadius: r, background: cfg.gradient, boxShadow: cfg.shadow }}
      >
        {icons[agent]}
      </div>
      {showLabel && (
        <span className="text-[13.5px] font-extrabold text-ink-800">{cfg.label}</span>
      )}
    </div>
  )
}
