// app/(dash)/relatorios/page.tsx
'use client'
import { useState } from 'react'
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

function ScoreDetail({ report }: { report: ReportEntry }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto p-6 gap-5">
      {/* Header detalhe */}
      <div className="flex items-center gap-4">
        <Avatar initials={report.sellerInitials} gradient={report.sellerGradient} size={56} />
        <div className="flex-1">
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0A0E1A' }}>{report.sellerName}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#8A93A3' }}>{report.date}</div>
        </div>
        <div className="flex flex-col items-end">
          <div style={{ fontSize: 42, fontWeight: 800, color: scoreColor(report.score), lineHeight: 1 }}>
            {report.score.toFixed(1)}
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: scoreColor(report.score) }}>{scoreLabel(report.score)}</div>
        </div>
      </div>

      {/* KPI mini-grid */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label:'Conversas', value: String(report.kpis.conversations) },
          { label:'% Comercial', value: `${report.kpis.commercialPct}%` },
          { label:'Resp. Médio', value: `${report.kpis.avgResponseMin}min` },
          { label:'Coaching', value: `${report.kpis.coaching}×` },
        ].map(k => (
          <div key={k.label} className="p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,.6)' }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: '#8A93A3', textTransform: 'uppercase', letterSpacing: '.1em', fontFamily: 'var(--font-mono)' }}>{k.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#161B2A', marginTop: 3 }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Destaques positivos */}
      {report.highlights.length > 0 && (
        <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,168,107,.07)', border: '1px solid rgba(0,168,107,.2)' }}>
          <div className="flex items-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00855A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
            <span style={{ fontSize: 13.5, fontWeight: 800, color: '#00855A' }}>Destaques positivos</span>
          </div>
          {report.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#00A86B' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#00855A' }}>{h}</span>
            </div>
          ))}
        </div>
      )}

      {/* Oportunidades */}
      {report.opportunities.length > 0 && (
        <div className="p-4 rounded-2xl" style={{ background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.2)' }}>
          <div className="flex items-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M2 12h20"/>
            </svg>
            <span style={{ fontSize: 13.5, fontWeight: 800, color: '#B45309' }}>Oportunidades</span>
          </div>
          {report.opportunities.map((o, i) => (
            <div key={i} className="flex items-start gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#F59E0B' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#B45309' }}>{o}</span>
            </div>
          ))}
        </div>
      )}

      {/* Alertas ou tudo certo */}
      {report.alerts.length > 0 ? (
        <div className="p-4 rounded-2xl" style={{ background: 'rgba(220,38,38,.07)', border: '1px solid rgba(220,38,38,.2)' }}>
          <div className="flex items-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <path d="M12 9v4m0 4h.01"/>
            </svg>
            <span style={{ fontSize: 13.5, fontWeight: 800, color: '#B91C1C' }}>Alertas</span>
          </div>
          {report.alerts.map((a, i) => (
            <div key={i} className="flex items-start gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#DC2626' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#B91C1C' }}>{a}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-2xl flex items-center gap-3" style={{ background: 'rgba(0,168,107,.07)', border: '1px solid rgba(0,168,107,.2)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00855A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/>
          </svg>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: '#00855A' }}>Sem alertas — tudo certo hoje!</span>
        </div>
      )}

      <button className="flex items-center justify-center gap-2 py-3 rounded-2xl text-[14px] font-extrabold mt-auto"
        style={{ background: 'rgba(26,75,255,.1)', color: '#1A4BFF', border: '1px solid rgba(26,75,255,.2)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        Ver conversa original
      </button>
    </div>
  )
}

export default function RelatoriosPage() {
  const [tab, setTab]         = useState<ReportTab>('funcionario')
  const [selectedId, setId]   = useState<string>(MOCK_REPORTS[0]?.id ?? '')
  const selected = MOCK_REPORTS.find(r => r.id === selectedId) ?? MOCK_REPORTS[0]

  return (
    <div className="flex h-full overflow-hidden">

      {/* Lista (330px) */}
      <aside className="flex flex-col flex-shrink-0 overflow-hidden"
        style={{ width: 330, borderRight: '1px solid rgba(255,255,255,.6)', background: 'rgba(255,255,255,.3)' }}>
        {/* Abas */}
        <div className="px-4 pt-4 pb-3 flex-shrink-0">
          <SegmentedControl<ReportTab>
            segments={[{ value:'gestor', label:'Gestor' }, { value:'funcionario', label:'Funcionário' }]}
            value={tab} onChange={setTab}
            activeGradient="linear-gradient(135deg,#13C2B3,#0B8E84)"
            activeColor="#fff"
            className="w-full"
          />
        </div>
        {/* Filtro de data — placeholder */}
        <div className="px-4 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl text-[13px] font-semibold text-ink-400"
            style={{ background: 'rgba(255,255,255,.6)', border: '1px solid rgba(255,255,255,.8)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0B8E84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
            Jun 2026
          </div>
        </div>
        {/* Lista */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
          {MOCK_REPORTS.map(r => (
            <button key={r.id} onClick={() => setId(r.id)}
              className="flex items-center gap-3 w-full px-3 py-3 rounded-2xl text-left transition-all"
              style={{
                background: selectedId === r.id ? 'rgba(15,182,168,.1)' : 'transparent',
                border: selectedId === r.id ? '1.5px solid rgba(15,182,168,.25)' : '1.5px solid transparent',
                outline: 'none',
              }}>
              <Avatar initials={r.sellerInitials} gradient={r.sellerGradient} size={42} />
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: 13.5, fontWeight: 800, color: '#161B2A' }}>{r.sellerName}</div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: '#8A93A3' }}>{r.date}</div>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                style={{ background: scoreBg(r.score) }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill={scoreColor(r.score)} stroke="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                </svg>
                <span style={{ fontSize: 12, fontWeight: 800, color: scoreColor(r.score) }}>{r.score.toFixed(1)}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Detalhe */}
      <main className="flex-1 min-w-0 overflow-hidden">
        {selected ? (
          <ScoreDetail report={selected} />
        ) : (
          <div className="flex items-center justify-center h-full text-ink-400 font-semibold">
            Selecione um relatório
          </div>
        )}
      </main>
    </div>
  )
}
