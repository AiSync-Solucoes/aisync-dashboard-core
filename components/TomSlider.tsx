// components/TomSlider.tsx
'use client'
import { useRef, useCallback } from 'react'

interface TomSliderProps {
  value:      number       // 0–100
  onChange:   (v: number) => void
  gradient?:  string       // trilha preenchida, default accent teal
  label?:     boolean      // mostra label abaixo, default true
}

function getLabel(v: number): string {
  if (v < 34)  return 'Mais técnico'
  if (v < 67)  return 'Equilibrado'
  return 'Mais amigável'
}

export default function TomSlider({
  value, onChange,
  gradient = 'linear-gradient(90deg,#13C2B3,#0FB6A8)',
  label = true,
}: TomSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const calcValue = useCallback((clientX: number): number => {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return value
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    return Math.round(pct * 100)
  }, [value])

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    onChange(calcValue(e.clientX))
  }
  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return
    onChange(calcValue(e.clientX))
  }

  return (
    <div className="w-full select-none">
      <div
        ref={trackRef}
        className="relative h-[6px] rounded-full cursor-pointer"
        style={{ background: '#DDE1E8' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        {/* filled track */}
        <div
          className="absolute inset-y-0 left-0 rounded-full pointer-events-none"
          style={{ width: `${value}%`, background: gradient }}
        />
        {/* knob */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full pointer-events-none"
          style={{
            left: `${value}%`,
            width: 18, height: 18,
            border: `2px solid ${gradient.includes('13C2') ? '#0FB6A8' : gradient.includes('FBBF') ? '#F59E0B' : '#7C5CFF'}`,
            boxShadow: '0 2px 6px rgba(0,0,0,.15)',
          }}
        />
      </div>
      {label && (
        <div className="flex justify-between mt-1.5 text-[11px] font-semibold text-ink-400">
          <span>Mais técnico</span>
          <span className="text-ink-600 font-bold">{getLabel(value)}</span>
          <span>Mais amigável</span>
        </div>
      )}
    </div>
  )
}
