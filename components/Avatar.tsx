// components/Avatar.tsx
'use client'

interface AvatarProps {
  initials:       string
  gradient:       string   // CSS linear-gradient
  size?:          number   // px, default 44
  radius?:        number   // px, default size*0.32
  fontSize?:      number   // px, default size*0.34
  showDot?:       boolean
  dotColor?:      string   // CSS color, default '#00A86B'
  className?:     string
  style?:         React.CSSProperties
}

export default function Avatar({
  initials, gradient, size = 44, radius, fontSize,
  showDot = false, dotColor = '#00A86B', className = '', style,
}: AvatarProps) {
  const r  = radius   ?? Math.round(size * 0.32)
  const fs = fontSize ?? Math.round(size * 0.34)
  const dotSize = Math.round(size * 0.25)

  return (
    <div
      className={`relative flex-shrink-0 flex items-center justify-center font-extrabold text-white select-none ${className}`}
      style={{ width: size, height: size, borderRadius: r, background: gradient, fontSize: fs, ...style }}
    >
      {initials}
      {showDot && (
        <span
          className="absolute border-2 border-white rounded-full"
          style={{
            width: dotSize, height: dotSize,
            background: dotColor,
            bottom: 0, right: Math.round(size * 0.045),
          }}
        />
      )}
    </div>
  )
}
