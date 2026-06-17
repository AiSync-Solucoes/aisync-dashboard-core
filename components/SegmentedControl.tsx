// components/SegmentedControl.tsx
'use client'

interface Segment<T extends string> {
  value:  T
  label:  string
}

interface SegmentedControlProps<T extends string> {
  segments:    Segment<T>[]
  value:       T
  onChange:    (v: T) => void
  activeGradient?: string   // default: white pill (neutral)
  activeColor?:    string   // text color when active, default '#0A0E1A'
  className?:      string
}

export default function SegmentedControl<T extends string>({
  segments, value, onChange,
  activeGradient = '#fff',
  activeColor = '#0A0E1A',
  className = '',
}: SegmentedControlProps<T>) {
  return (
    <div
      className={`relative flex items-center p-[3px] rounded-[99px] ${className}`}
      style={{ background: 'rgba(255,255,255,.45)', backdropFilter: 'blur(10px)' }}
    >
      {segments.map(seg => {
        const active = seg.value === value
        return (
          <button
            key={seg.value}
            onClick={() => onChange(seg.value)}
            className="relative z-10 flex-1 px-4 py-[7px] rounded-[99px] text-[13.5px] font-extrabold transition-colors"
            style={{
              color: active ? activeColor : '#8A93A3',
              background: active ? activeGradient : 'transparent',
              boxShadow: active ? '0 2px 8px rgba(20,40,90,.10)' : 'none',
              transition: 'background .2s, color .2s',
              border: 'none',
            }}
          >
            {seg.label}
          </button>
        )
      })}
    </div>
  )
}
