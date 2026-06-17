// app/(dash)/metricas/page.tsx
'use client'
import { useState } from 'react'
import GlassCard from '@/components/GlassCard'
import Avatar from '@/components/Avatar'
import SegmentedControl from '@/components/SegmentedControl'
import { MOCK_SELLER_METRICS } from '@/lib/mock-data'
import type { MetricPeriod, SellerMetric } from '@/lib/types'

const KPI_DATA: Record<MetricPeriod, { label: string; value: string; delta?: string; deltaUp?: boolean }[]> = {
  hoje:   [{ label:'Conversas', value:'312', delta:'+18%', deltaUp:true }, { label:'Taxa Comercial', value:'71%', delta:'+4%', deltaUp:true }, { label:'Resp. Médio', value:'8 min', delta:'-2min', deltaUp:true }, { label:'Score Médio', value:'8.2', delta:'+0.3', deltaUp:true }],
  semana: [{ label:'Conversas', value:'1.840', delta:'+12%', deltaUp:true }, { label:'Taxa Comercial', value:'68%', delta:'+2%', deltaUp:true }, { label:'Resp. Médio', value:'9 min', delta:'-1min', deltaUp:true }, { label:'Score Médio', value:'7.9', delta:'+0.1', deltaUp:true }],
  mes:    [{ label:'Conversas', value:'7.214', delta:'+22%', deltaUp:true }, { label:'Taxa Comercial', value:'66%', delta:'+6%', deltaUp:true }, { label:'Resp. Médio', value:'10 min', delta:'-3min', deltaUp:true }, { label:'Score Médio', value:'7.7', delta:'+0.4', deltaUp:true }],
}

function scoreColor(score: number): string {
  if (score >= 8.5) return '#00855A'
  if (score >= 7.5) return '#0B8E84'
  if (score >= 6.5) return '#B45309'
  return '#B91C1C'
}
function scoreBg(score: number): string {
  if (score >= 8.5) return 'rgba(0,168,107,.12)'
  if (score >= 7.5) return 'rgba(15,182,168,.12)'
  if (score >= 6.5) return 'rgba(245,158,11,.12)'
  return 'rgba(220,38,38,.12)'
}

const PODIUM_COLORS = ['#FBBF24', '#C0C6D2', '#C8824A']
const PODIUM_HEIGHT = [96, 72, 56]

export default function MetricasPage() {
  const [period, setPeriod] = useState<MetricPeriod>('hoje')
  const kpis = KPI_DATA[period]
  const top3 = MOCK_SELLER_METRICS.slice(0, 3)

  return (
    <div className="flex flex-col h-full p-[28px_34px] overflow-hidden gap-5">

      {/* ── Header + período ── */}
      <div className="flex items-center justify-between flex-shrink-0">
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0A0E1A', letterSpacing: '-0.015em' }}>Métricas do time</h1>
        <SegmentedControl<MetricPeriod>
          segments={[{ value:'hoje', label:'Hoje' }, { value:'semana', label:'Semana' }, { value:'mes', label:'Mês' }]}
          value={period} onChange={setPeriod}
        />
      </div>

      {/* ── KPI cards ── */}
      <div className="grid grid-cols-4 gap-4 flex-shrink-0">
        {kpis.map(kpi => (
          <GlassCard key={kpi.label} className="p-5">
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#8A93A3', textTransform: 'uppercase', letterSpacing: '.12em', fontFamily: 'var(--font-mono)' }}>{kpi.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#0A0E1A', marginTop: 6, lineHeight: 1 }}>{kpi.value}</div>
            {kpi.delta && (
              <div className="flex items-center gap-1 mt-1.5" style={{ fontSize: 12.5, fontWeight: 700, color: kpi.deltaUp ? '#00855A' : '#B91C1C' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {kpi.deltaUp ? <path d="M3 17l6-6 4 4 7-7"/> : <path d="M3 7l6 6 4-4 7 7"/>}
                  {kpi.deltaUp ? <path d="M14 7h7v7"/> : <path d="M14 17h7v-7"/>}
                </svg>
                {kpi.delta} vs anterior
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      {/* ── Grid tabela + pódio ── */}
      <div className="flex-1 grid gap-5 min-h-0" style={{ gridTemplateColumns: '1.65fr 1fr' }}>

        {/* Tabela */}
        <GlassCard className="flex flex-col overflow-hidden p-5">
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0A0E1A', marginBottom: 14 }}>Desempenho por funcionário</div>
          <div className="overflow-y-auto flex-1">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ borderBottom: '1.5px solid rgba(221,225,232,.6)' }}>
                  {['Funcionário','Conv.','% Comercial','Resp.','Score'].map(h => (
                    <th key={h} className="text-left pb-2 font-mono text-[11px] font-semibold" style={{ color: '#8A93A3', letterSpacing: '.1em', whiteSpace: 'nowrap', paddingRight: 12 }}>
                      {h.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_SELLER_METRICS.map((s, i) => (
                  <tr key={s.name} style={{ borderBottom: i < MOCK_SELLER_METRICS.length - 1 ? '1px solid rgba(221,225,232,.4)' : 'none' }}>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar initials={s.initials} gradient={s.avatarGradient} size={34} />
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: '#161B2A' }}>{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-3" style={{ fontSize: 14, fontWeight: 700, color: '#161B2A' }}>{s.conversations}</td>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-[6px] rounded-full" style={{ background: '#EEF0F4', minWidth: 60 }}>
                          <div className="h-full rounded-full" style={{ width: `${s.commercialPct}%`, background: 'linear-gradient(90deg,#0FB6A8,#0B8E84)' }} />
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#3F4859', minWidth: 32 }}>{s.commercialPct}%</span>
                      </div>
                    </td>
                    <td className="py-3 pr-3" style={{ fontSize: 13.5, fontWeight: 700, color: '#3F4859' }}>{s.avgResponseMin} min</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full text-[12px] font-extrabold"
                          style={{ background: scoreBg(s.score), color: scoreColor(s.score) }}>
                          {s.score.toFixed(1)}
                        </span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                          stroke={s.scoreDelta === 'up' ? '#00A86B' : s.scoreDelta === 'down' ? '#DC2626' : '#8A93A3'}
                          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          {s.scoreDelta === 'up'   && <><path d="M3 17l6-6 4 4 7-7"/><path d="M14 7h7v7"/></>}
                          {s.scoreDelta === 'down' && <><path d="M3 7l6 6 4-4 7 7"/><path d="M14 17h7v-7"/></>}
                          {s.scoreDelta === 'same' && <path d="M5 12h14"/>}
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Pódio */}
        <GlassCard className="flex flex-col p-5">
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0A0E1A', marginBottom: 16 }}>Top 3 do mês</div>
          <div className="flex items-end justify-center gap-4 flex-1">
            {[top3[1], top3[0], top3[2]].filter(Boolean).map((s: SellerMetric, idx) => {
              const rank   = idx === 1 ? 1 : idx === 0 ? 2 : 3
              const color  = PODIUM_COLORS[rank - 1]
              const height = PODIUM_HEIGHT[rank - 1]
              return (
                <div key={s.name} className="flex flex-col items-center gap-2">
                  <Avatar initials={s.initials} gradient={s.avatarGradient} size={rank === 1 ? 52 : 44} />
                  <div className="text-center">
                    <div style={{ fontSize: rank === 1 ? 13 : 12, fontWeight: 800, color: '#161B2A' }}>{s.name.split(' ')[0]}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: scoreColor(s.score) }}>{s.score.toFixed(1)}</div>
                  </div>
                  <div className="flex items-center justify-center rounded-t-2xl w-16 font-extrabold text-white text-lg"
                    style={{ height, background: color, boxShadow: `0 4px 12px ${color}66` }}>
                    {rank}
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
