// components/SelectableTile.tsx
'use client'

interface SelectableTileProps {
  selected:      boolean
  onToggle:      () => void
  icon:          React.ReactNode   // ícone já colorido (div com gradiente)
  title:         string
  sublabel?:     string
  accentColor?:  string            // cor do anel e check, default '#0FB6A8'
  className?:    string
}

export default function SelectableTile({
  selected, onToggle, icon, title, sublabel,
  accentColor = '#0FB6A8', className = '',
}: SelectableTileProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative flex flex-col p-4 rounded-2xl text-left transition-all border ${className}`}
      style={{
        background: selected ? `rgba(${hexToRgb(accentColor)},.07)` : 'rgba(255,255,255,.55)',
        borderColor: selected ? accentColor : 'rgba(255,255,255,.8)',
        boxShadow: selected
          ? `0 0 0 2px ${accentColor}, 0 4px 16px rgba(0,0,0,.06)`
          : '0 2px 8px rgba(20,40,90,.05)',
        outline: 'none',
      }}
    >
      {/* check badge */}
      {selected && (
        <span
          className="absolute top-2.5 right-2.5 flex items-center justify-center rounded-full"
          style={{ width: 20, height: 20, background: accentColor }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </span>
      )}
      <div className="mb-2">{icon}</div>
      <div className="text-[13.5px] font-extrabold text-ink-800 leading-tight">{title}</div>
      {sublabel && <div className="text-[11.5px] font-semibold text-ink-400 mt-0.5">{sublabel}</div>}
    </button>
  )
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)
  return `${r},${g},${b}`
}
