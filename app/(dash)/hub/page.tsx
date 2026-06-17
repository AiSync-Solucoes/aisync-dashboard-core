// app/(dash)/hub/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import GlassCard from '@/components/GlassCard'
import Avatar from '@/components/Avatar'
import Switch from '@/components/Switch'
import AgentBadge from '@/components/AgentBadge'
import { MOCK_SESSIONS, MOCK_THREADS } from '@/lib/mock-data'
import { AGENTS, type AgentKey } from '@/lib/types'

type AgentState = Record<AgentKey, boolean>

const SPARKLINE_POINTS = 'M0,44 L25,40 L50,42 L75,30 L100,33 L125,21 L150,25 L175,13 L200,9'

export default function HubPage() {
  const [agents, setAgents] = useState<AgentState>({
    monitoramento: true, relatorios: true, assistencia: true, treinamento: true,
  })
  const toggle = (key: AgentKey) => setAgents(s => ({ ...s, [key]: !s[key] }))

  const online    = MOCK_SESSIONS.filter(s => s.status === 'connected').length
  const total     = MOCK_SESSIONS.length
  const pct       = online / total
  const circ      = 2 * Math.PI * 50   // r=50 → 314.16
  const offset    = circ * (1 - pct)

  const liveCount  = MOCK_THREADS.filter(t => t.isOnline).length
  const alertCount = MOCK_THREADS.filter(t => t.alertLevel === 'red' || t.alertLevel === 'yellow').length

  return (
    <div className="flex flex-col h-full p-[30px_34px] overflow-hidden">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-6 mb-[22px]">
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#0A0E1A', letterSpacing: '-0.015em', lineHeight: 1.1 }}>
            Bom dia, Lucas
          </h1>
          <p style={{ fontSize: 14.5, fontWeight: 500, color: '#3F4859', marginTop: 4 }}>
            Seu time de IA está cuidando de tudo. Aqui está o resumo de hoje.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Date chip */}
          <div className="flex items-center gap-2 px-4 py-[10px] rounded-2xl font-bold text-ink-600 text-[13.5px]"
            style={{ background: 'rgba(255,255,255,.62)', border: '1px solid rgba(255,255,255,.85)', backdropFilter: 'blur(10px)' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0B8E84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
            Hoje · 17 jun
          </div>
          {/* Bell */}
          <button className="relative flex items-center justify-center rounded-[13px] text-ink-600"
            style={{ width: 42, height: 42, background: 'rgba(255,255,255,.62)', border: '1px solid rgba(255,255,255,.85)', backdropFilter: 'blur(10px)' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
            <span className="absolute top-[9px] right-[10px] w-2 h-2 rounded-full border-2 border-white bg-danger" />
          </button>
        </div>
      </div>

      {/* ── Bento Grid ── */}
      <div className="flex-1 grid gap-[18px] min-h-0"
        style={{
          gridTemplateColumns: '1fr 1fr 0.92fr',
          gridTemplateRows: '242px 168px 150px',
          gridTemplateAreas: `'conv conv sess' 'rel met sess' 'ag ag ag'`,
        }}>

        {/* CONVERSAS AO VIVO */}
        <GlassCard className="p-[22px_24px] flex flex-col" style={{ gridArea: 'conv' }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-white rounded-[13px]"
              style={{ width: 44, height: 44, background: 'linear-gradient(135deg,#1A4BFF,#4C6BFF)', boxShadow: '0 6px 16px rgba(26,75,255,.32)' }}>
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div className="flex-1">
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0A0E1A' }}>Conversas ao vivo</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3' }}>Agente de monitoramento ativo</div>
            </div>
            {/* AO VIVO badge */}
            <div className="flex items-center gap-[7px] px-3 py-[6px] rounded-full"
              style={{ background: 'rgba(0,168,107,.12)', border: '1px solid rgba(0,168,107,.25)' }}>
              <span className="w-2 h-2 rounded-full bg-success live-pulse" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '.1em', color: '#00855A' }}>AO VIVO</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-[18px]">
            <div className="flex items-baseline gap-[10px]">
              <span style={{ fontSize: 50, fontWeight: 800, color: '#0A0E1A', lineHeight: 1, letterSpacing: '-.03em' }}>{liveCount}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#3F4859', maxWidth: 130, lineHeight: 1.2 }}>funcionários ativos agora</span>
            </div>
            {/* Avatar stack */}
            <div className="flex items-center">
              {MOCK_THREADS.slice(0, 4).map((t, i) => (
                <Avatar
                  key={t.id}
                  initials={t.sellerInitials}
                  gradient={t.sellerGradient}
                  size={44}
                  showDot={t.isOnline}
                  className="-mr-3 last:mr-0"
                  style={{ border: '2.5px solid #fff', zIndex: 4 - i } as React.CSSProperties}
                />
              ))}
            </div>
          </div>

          {/* Alert banner */}
          {alertCount > 0 && (
            <div className="flex items-center gap-[11px] mt-auto px-[14px] py-[11px] rounded-2xl"
              style={{ background: 'rgba(245,158,11,.1)', border: '1px solid rgba(245,158,11,.25)' }}>
              <svg className="flex-shrink-0 text-amber-deep" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2 3 14h9l-1 8 10-12h-9z"/>
              </svg>
              <span className="flex-1 text-[13.5px] font-bold" style={{ color: '#92560B' }}>
                {alertCount} conversa{alertCount > 1 ? 's precisam' : ' precisa'} de atenção — oportunidade detectada
              </span>
              <Link href="/conversas" className="flex items-center gap-[6px] text-[13.5px] font-extrabold no-underline flex-shrink-0" style={{ color: '#1A4BFF' }}>
                Ver conversas
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
            </div>
          )}
        </GlassCard>

        {/* SESSÕES */}
        <GlassCard className="p-[22px] flex flex-col" style={{ gridArea: 'sess' }}>
          <div className="flex items-center gap-[11px]">
            <div className="flex items-center justify-center text-white rounded-[12px]"
              style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#13C2B3,#0B8E84)', boxShadow: '0 6px 16px rgba(11,142,132,.3)' }}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>
              </svg>
            </div>
            <div style={{ fontSize: 16.5, fontWeight: 800, color: '#0A0E1A' }}>Sessões conectadas</div>
          </div>

          {/* Anel SVG */}
          <div className="flex flex-col items-center my-[14px]">
            <div className="relative" style={{ width: 118, height: 118 }}>
              <svg width="118" height="118" viewBox="0 0 118 118" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="59" cy="59" r="50" fill="none" stroke="#E4E8EF" strokeWidth="12"/>
                <circle cx="59" cy="59" r="50" fill="none" stroke="url(#sg)" strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={offset}/>
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#13C2B3"/>
                    <stop offset="1" stopColor="#0B8E84"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span style={{ fontSize: 30, fontWeight: 800, color: '#0A0E1A', lineHeight: 1 }}>
                  {online}<span style={{ fontSize: 18, color: '#8A93A3' }}>/{total}</span>
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#8A93A3', marginTop: 2 }}>online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-[14px] text-[12px] font-bold mb-[14px]">
            <span className="flex items-center gap-[6px] text-ink-600"><span className="w-[9px] h-[9px] rounded-full bg-success"/>{online} online</span>
            <span className="flex items-center gap-[6px] text-ink-600"><span className="w-[9px] h-[9px] rounded-full bg-danger"/>{total - online} offline</span>
          </div>

          <Link href="/sessoes"
            className="mt-auto flex items-center justify-center gap-[7px] py-3 rounded-2xl text-[14px] font-extrabold no-underline"
            style={{ background: 'rgba(15,182,168,.12)', color: '#0B8E84' }}>
            Gerenciar sessões
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </GlassCard>

        {/* RELATÓRIOS */}
        <GlassCard className="p-[20px_22px] flex flex-col" style={{ gridArea: 'rel' }}>
          <div className="flex items-center gap-[11px]">
            <div className="flex items-center justify-center text-white rounded-[12px]"
              style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#13C2B3,#0B8E84)', boxShadow: '0 6px 16px rgba(11,142,132,.3)' }}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>
                <path d="M14 2v5h5M9 13h6M9 17h4"/>
              </svg>
            </div>
            <div className="flex-1" style={{ fontSize: 16.5, fontWeight: 800, color: '#0A0E1A' }}>Relatórios</div>
            <div className="flex items-center gap-[6px] px-[10px] py-[5px] rounded-full" style={{ background: 'rgba(0,168,107,.12)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00855A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: '#00855A' }}>Entregue</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-[14px]">
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#8A93A3' }}>Último relatório</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#161B2A', marginTop: 2 }}>Hoje às 7h</div>
            </div>
            <div className="flex items-center justify-center text-white rounded-2xl"
              style={{ width: 50, height: 50, background: 'linear-gradient(135deg,#FBBF24,#F59E0B)', boxShadow: '0 6px 16px rgba(245,158,11,.32)' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6"/><path d="M15.5 12.5 17 22l-5-3-5 3 1.5-9.5"/>
              </svg>
            </div>
          </div>
          <Link href="/relatorios" className="mt-auto flex items-center gap-[6px] text-[14px] font-extrabold no-underline" style={{ color: '#0B8E84' }}>
            Ver relatórios
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </GlassCard>

        {/* MÉTRICAS */}
        <GlassCard className="p-[20px_22px] flex flex-col" style={{ gridArea: 'met' }}>
          <div className="flex items-center gap-[11px]">
            <div className="flex items-center justify-center text-white rounded-[12px]"
              style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#1A4BFF,#4C6BFF)', boxShadow: '0 6px 16px rgba(26,75,255,.3)' }}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l6-6 4 4 7-7"/><path d="M14 7h7v7"/>
              </svg>
            </div>
            <div className="flex-1" style={{ fontSize: 16.5, fontWeight: 800, color: '#0A0E1A' }}>Métricas do time</div>
            <div className="flex items-center gap-1 text-[14px] font-extrabold" style={{ color: '#00855A' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 7-7"/><path d="M14 7h7v7"/></svg>
              +18%
            </div>
          </div>
          <div className="flex flex-1 items-end gap-[14px] mt-2">
            <div className="flex-shrink-0">
              <div style={{ fontSize: 13, fontWeight: 600, color: '#8A93A3' }}>Conversas hoje</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#161B2A', lineHeight: 1.1 }}>312</div>
            </div>
            <svg viewBox="0 0 200 56" preserveAspectRatio="none" className="flex-1" style={{ height: 52 }}>
              <defs>
                <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0FB6A8" stopOpacity=".35"/>
                  <stop offset="1" stopColor="#0FB6A8" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d={`${SPARKLINE_POINTS} L200,56 L0,56 Z`} fill="url(#mg)"/>
              <path d={SPARKLINE_POINTS} fill="none" stroke="#0B8E84" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <Link href="/metricas" className="flex items-center gap-[6px] text-[14px] font-extrabold no-underline mt-1" style={{ color: '#1A4BFF' }}>
            Ver KPIs
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </GlassCard>

        {/* AGENTES */}
        <GlassCard className="p-[16px_22px] flex flex-col" style={{ gridArea: 'ag' }}>
          <div className="flex items-center justify-between mb-3">
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0A0E1A' }}>Seus 4 agentes de IA</div>
            <Link href="/configuracoes" className="flex items-center gap-[6px] text-[13px] font-extrabold no-underline" style={{ color: '#8A93A3' }}>
              Configurar
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-4 gap-3">
            {AGENTS.map(a => (
              <div
                key={a.key}
                className="flex items-center gap-[11px] px-[14px] py-3 rounded-2xl"
                style={{ background: a.bgTint, border: `1px solid ${a.border}` }}
              >
                <AgentBadge agent={a.key} size="sm" className="flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: '#161B2A', whiteSpace: 'nowrap' }}>{a.label}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: agents[a.key] ? a.color : '#8A93A3' }}>
                    {agents[a.key] ? 'Ativo' : 'Pausado'}
                  </div>
                </div>
                <Switch
                  checked={agents[a.key]}
                  onChange={() => toggle(a.key)}
                  onGradient={a.gradient}
                />
              </div>
            ))}
          </div>
        </GlassCard>

      </div>
    </div>
  )
}
