// components/FilterBar.tsx
'use client'

export interface FilterOption {
  value: string
  label: string
}

export interface DateRange { from: string; to: string }

/** Controle declarativo de filtro. Extensível — novos `kind` entram aqui. */
export type FilterControl =
  | {
      id: string
      kind: 'select'
      label: string
      options: FilterOption[]
      /** rótulo da opção "todos" (value vazio). default: "Todos" */
      allLabel?: string
    }
  | {
      id: string
      kind: 'toggle'
      label: string
      /** cor de destaque quando ativo. default: âmbar */
      activeColor?: string
    }
  | {
      id: string
      kind: 'daterange'
      label: string
    }

export type FilterValue = string | boolean | DateRange | undefined
export type FilterValues = Record<string, FilterValue>

export interface FilterBarProps {
  controls: FilterControl[]
  values: FilterValues
  onChange: (id: string, value: FilterValue) => void
  className?: string
}

const PILL: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 7,
  height: 36,
  padding: '0 12px',
  borderRadius: 12,
  background: 'rgba(255,255,255,.6)',
  border: '1px solid rgba(255,255,255,.85)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  fontSize: 13,
  fontWeight: 700,
  color: '#3F4859',
  boxShadow: '0 2px 7px rgba(20,40,90,.04)',
}

const DATE_INPUT: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  fontSize: 12,
  fontWeight: 700,
  color: '#161B2A',
  outline: 'none',
  cursor: 'pointer',
  width: 112,
}

function Chevron() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8A93A3" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

/**
 * Barra de filtros reutilizável. O consumidor mantém o estado (`values`) e
 * traduz cada valor para os parâmetros da sua API. Mantém-se "burro" de
 * propósito: nenhuma lógica de domínio mora aqui.
 */
export default function FilterBar({ controls, values, onChange, className = '' }: FilterBarProps) {
  return (
    <div className={`flex items-center flex-wrap gap-2 ${className}`}>
      {controls.map(control => {
        // ── toggle ────────────────────────────────────────────────────────
        if (control.kind === 'toggle') {
          const active = values[control.id] === true
          const color = control.activeColor ?? '#F59E0B'
          return (
            <button
              key={control.id}
              onClick={() => onChange(control.id, !active)}
              style={{
                ...PILL,
                cursor: 'pointer',
                color: active ? '#fff' : '#3F4859',
                background: active ? color : (PILL.background as string),
                border: active ? `1px solid ${color}` : (PILL.border as string),
                boxShadow: active ? `0 4px 12px ${color}55` : (PILL.boxShadow as string),
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: active ? '#fff' : color,
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              {control.label}
            </button>
          )
        }

        // ── daterange ─────────────────────────────────────────────────────
        if (control.kind === 'daterange') {
          const val = (values[control.id] as DateRange | undefined) ?? { from: '', to: '' }
          const hasValue = !!(val.from || val.to)
          return (
            <div
              key={control.id}
              style={{
                ...PILL,
                gap: 6,
                paddingRight: 10,
                border: hasValue ? '1px solid rgba(26,75,255,.3)' : (PILL.border as string),
              }}
            >
              <span style={{ color: '#8A93A3', fontWeight: 700, flexShrink: 0, fontSize: 12.5 }}>{control.label}:</span>
              <input
                type="date"
                value={val.from}
                onChange={e => {
                  const next: DateRange = { from: e.target.value, to: val.to }
                  onChange(control.id, (next.from || next.to) ? next : undefined)
                }}
                style={DATE_INPUT}
              />
              <span style={{ color: '#8A93A3', fontSize: 11, flexShrink: 0 }}>→</span>
              <input
                type="date"
                value={val.to}
                onChange={e => {
                  const next: DateRange = { from: val.from, to: e.target.value }
                  onChange(control.id, (next.from || next.to) ? next : undefined)
                }}
                style={DATE_INPUT}
              />
              {hasValue && (
                <button
                  onClick={() => onChange(control.id, undefined)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A93A3', fontSize: 14, lineHeight: 1, padding: '0 2px', flexShrink: 0 }}
                  title="Limpar datas"
                >
                  ×
                </button>
              )}
            </div>
          )
        }

        // ── select ────────────────────────────────────────────────────────
        const current = (values[control.id] as string | undefined) ?? ''
        return (
          <label key={control.id} style={{ ...PILL, position: 'relative', cursor: 'pointer' }}>
            <span style={{ color: '#8A93A3', fontWeight: 700 }}>{control.label}:</span>
            <span style={{ color: '#161B2A', fontWeight: 800 }}>
              {current
                ? control.options.find(o => o.value === current)?.label ?? current
                : (control.allLabel ?? 'Todos')}
            </span>
            <Chevron />
            <select
              value={current}
              onChange={e => onChange(control.id, e.target.value || undefined)}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
                appearance: 'none',
              }}
            >
              <option value="">{control.allLabel ?? 'Todos'}</option>
              {control.options.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        )
      })}
    </div>
  )
}
