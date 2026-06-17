// components/SelectableRow.tsx
'use client'

interface SelectableRowProps {
  selected:     boolean
  onToggle:     () => void
  icon:         React.ReactNode   // div colorido 36px
  title:        string
  sublabel?:    string
  accentColor?: string
  locked?:      boolean           // cadeado — não-toggleável
  className?:   string
}

export default function SelectableRow({
  selected, onToggle, icon, title, sublabel,
  accentColor = '#0FB6A8', locked = false, className = '',
}: SelectableRowProps) {
  return (
    <button
      onClick={() => !locked && onToggle()}
      disabled={locked}
      className={`flex items-center gap-3 w-full p-3 rounded-2xl text-left transition-colors ${className}`}
      style={{
        background: 'transparent',
        outline: 'none',
        cursor: locked ? 'not-allowed' : 'pointer',
        opacity: locked ? 0.55 : 1,
        border: 'none',
      }}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[13.5px] font-extrabold text-ink-800 leading-tight">{title}</div>
        {sublabel && <div className="text-[11.5px] font-semibold text-ink-400 mt-0.5">{sublabel}</div>}
      </div>
      {locked ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DDE1E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ) : (
        <span
          className="flex-shrink-0 flex items-center justify-center rounded-full transition-all"
          style={{
            width: 24, height: 24,
            background: selected ? accentColor : 'transparent',
            border: `2px solid ${selected ? accentColor : '#DDE1E8'}`,
          }}
        >
          {selected && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          )}
        </span>
      )}
    </button>
  )
}
