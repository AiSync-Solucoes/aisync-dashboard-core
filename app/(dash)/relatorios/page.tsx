// app/(dash)/relatorios/page.tsx
'use client'
import { useState } from 'react'
import GlassCard from '@/components/GlassCard'
import Avatar from '@/components/Avatar'
import SegmentedControl from '@/components/SegmentedControl'
import { MOCK_REPORTS } from '@/lib/mock-data'
import type { ReportTab, ReportEntry } from '@/lib/types'

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
function scoreLabel(score: number): string {
  if (score >= 8.5) return 'Excelente'
  if (score >= 7.5) return 'Muito bom'
  if (score >= 6.5) return 'Regular'
  return 'Precisa melhorar'
}

function SectionCard({ tone, icon, title, children }: {
  tone: 'green' | 'amber'
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  const c = tone === 'green'
    ? { bg: 'rgba(0,168,107,.07)', border: 'rgba(0,168,107,.18)', chip: 'linear-gradient(135deg,#16C77E,#00A86B)', title: '#00855A' }
    : { bg: 'rgba(245,158,11,.08)', border: 'rgba(245,158,11,.2)', chip: 'linear-gradient(135deg,#FBBF24,#F59E0B)', title: '#B45309' }
  return (
    <div className="p-4 rounded-2xl" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <div className="flex items-center gap-2.5 mb-3">
        <span className="flex items-center justify-center rounded-lg flex-shrink-0" style={{ width: 28, height: 28, background: c.chip }}>
          {icon}
        </span>
        <span style={{ fontSize: 14, fontWeight: 800, color: '#161B2A' }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function ScoreDetail({ report }: { report: ReportEntry }) {
  const kpis = [
    { label: 'Conversas',   value: String(report.kpis.conversations) },
    { label: '% comercial', value: `${report.kpis.commercialPct}%` },
    { label: 'Resp. média', value: `${report.kpis.avgResponseMin} min` },
    { label: 'Coaching',    value: `${report.kpis.coaching}×` },
  ]
  return (
    <div className="flex flex-col h-full overflow-y-auto p-6 gap-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Avatar initials={report.sellerInitials} gradient={report.sellerGradient} size={56} />
        <div className="flex-1">
          <div style={{ fontSize: 22, fontWeight: 800, color: '#0A0E1A' }}>{report.sellerName}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#8A93A3', fontFamily: 'var(--font-mono)' }}>{report.date} · Vendas</div>
        </div>
        {/* Score box */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl" style={{ background: scoreBg(report.score), border: `1px solid ${scoreColor(report.score)}22` }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={scoreColor(report.score)} stroke="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
          </svg>
          <div className="text-center">
            <div style={{ fontSize: 26, fontWeight: 800, color: scoreColor(report.score), lineHeight: 1 }}>{report.score.toFixed(1)}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: scoreColor(report.score) }}>{scoreLabel(report.score)}</div>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-3">
        {kpis.map(k => (
          <div key={k.label} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,.72)', border: '1px solid rgba(255,255,255,.9)', boxShadow: '0 2px 8px rgba(20,40,90,.04)' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0A0E1A', lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#8A93A3', marginTop: 5 }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Destaques */}
      {report.highlights.length > 0 && (
        <SectionCard tone="green" title="Destaques positivos"
          icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}>
          {report.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 mb-1.5 last:mb-0">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#00A86B' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#2E3A2E' }}>{h}</span>
            </div>
          ))}
        </SectionCard>
      )}

      {/* Oportunidades */}
      {report.opportunities.length > 0 && (
        <SectionCard tone="amber" title="Oportunidades de melhoria"
          icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 7-7"/><path d="M14 7h7v7"/></svg>}>
          {report.opportunities.map((o, i) => (
            <div key={i} className="flex items-start gap-2 mb-1.5 last:mb-0">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#F59E0B' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#7A4E0B' }}>{o}</span>
            </div>
          ))}
        </SectionCard>
      )}

      {/* Alertas */}
      <SectionCard tone={report.alerts.length > 0 ? 'amber' : 'green'} title="Alertas"
        icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4m0 4h.01"/></svg>}>
        {report.alerts.length > 0 ? (
          report.alerts.map((a, i) => (
            <div key={i} className="flex items-start gap-2 mb-1.5 last:mb-0">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#F59E0B' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#7A4E0B' }}>{a}</span>
            </div>
          ))
        ) : (
          <span style={{ fontSize: 13, fontWeight: 700, color: '#00855A' }}>Tudo certo — nenhum alerta neste relatório.</span>
        )}
      </SectionCard>

      {/* CTA */}
      <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-[14px] font-extrabold text-white mt-auto self-end"
        style={{ background: 'linear-gradient(135deg,#1A4BFF,#3E63FF)', boxShadow: '0 6px 16px rgba(26,75,255,.3)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        Ver conversa original
      </button>
    </div>
  )
}

export default function RelatoriosPage() {
  const [tab, setTab]       = useState<ReportTab>('funcionario')
  const [selectedId, setId] = useState<string>(MOCK_REPORTS[0]?.id ?? '')
  const selected = MOCK_REPORTS.find(r => r.id === selectedId) ?? MOCK_REPORTS[0]

  return (
    <div className="flex h-full gap-4 p-[22px_24px] overflow-hidden">

      {/* Lista */}
      <GlassCard className="flex flex-col flex-shrink-0 overflow-hidden p-0" style={{ width: 340 }}>
        <div className="px-5 pt-5 pb-4 flex-shrink-0">
          <h2 style={{ fontSize: 21, fontWeight: 800, color: '#0A0E1A', letterSpacing: '-0.01em' }}>Relatórios</h2>
          <p style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3', marginTop: 2, marginBottom: 14 }}>Gerados toda manhã pelo agente</p>

          <SegmentedControl<ReportTab>
            segments={[{ value:'gestor', label:'Gestor' }, { value:'funcionario', label:'Funcionário' }]}
            value={tab} onChange={setTab}
            activeGradient="#fff" activeColor="#0A0E1A"
            className="w-full"
          />

          {/* Date dropdown (placeholder) */}
          <button className="flex items-center gap-2 w-full mt-3 px-3 py-2.5 rounded-2xl text-[13px] font-bold text-ink-600"
            style={{ background: 'rgba(255,255,255,.7)', border: '1px solid rgba(221,225,232,.7)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0B8E84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
            <span className="flex-1 text-left">Últimos 7 dias</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A9B0BD" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
          {MOCK_REPORTS.map(r => {
            const active = selectedId === r.id
            return (
              <button key={r.id} onClick={() => setId(r.id)}
                className="flex items-center gap-3 w-full px-3 py-3 rounded-2xl text-left transition-all"
                style={{
                  background: active ? '#fff' : 'transparent',
                  boxShadow: active ? '0 6px 18px rgba(20,40,90,.10)' : 'none',
                  outline: 'none',
                }}>
                <Avatar initials={r.sellerInitials} gradient={r.sellerGradient} size={42} />
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: '#161B2A' }}>{r.sellerName}</div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: '#8A93A3', fontFamily: 'var(--font-mono)' }}>{r.date}, 7h</div>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full flex-shrink-0" style={{ background: scoreBg(r.score) }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill={scoreColor(r.score)} stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                  </svg>
                  <span style={{ fontSize: 12, fontWeight: 800, color: scoreColor(r.score) }}>{r.score.toFixed(1)}</span>
                </div>
              </button>
            )
          })}
        </div>
      </GlassCard>

      {/* Detalhe */}
      <GlassCard className="flex-1 min-w-0 overflow-hidden p-0">
        {selected ? <ScoreDetail report={selected} /> : (
          <div className="flex items-center justify-center h-full text-ink-400 font-semibold">Selecione um relatório</div>
        )}
      </GlassCard>
    </div>
  )
}
