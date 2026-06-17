// components/Switch.tsx
'use client'

interface SwitchProps {
  checked:       boolean
  onChange:      (v: boolean) => void
  onGradient?:   string   // track gradient when ON — default brand blue
  disabled?:     boolean
}

export default function Switch({
  checked, onChange,
  onGradient = 'linear-gradient(135deg,#1A4BFF,#4C6BFF)',
  disabled = false,
}: SwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className="relative flex-shrink-0 focus:outline-none"
      style={{
        width: 44, height: 26, borderRadius: 99,
        background: checked ? onGradient : '#DDE1E8',
        transition: 'background .2s',
        padding: 0, border: 'none',
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <span
        className="absolute top-[3px] left-[3px] bg-white rounded-full"
        style={{
          width: 20, height: 20,
          boxShadow: '0 2px 5px rgba(0,0,0,.25)',
          transform: checked ? 'translateX(18px)' : 'translateX(0)',
          transition: 'transform .2s',
        }}
      />
    </button>
  )
}
