// components/GlassCard.tsx

interface GlassCardProps {
  children:   React.ReactNode
  className?: string
  style?:     React.CSSProperties
  as?:        React.ElementType
}

export default function GlassCard({ children, className = '', style, as: Tag = 'div' }: GlassCardProps) {
  return (
    <Tag
      className={`glass ${className}`}
      style={style}
    >
      {children}
    </Tag>
  )
}
