// app/(onboarding)/onboarding/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Avatar from '@/components/Avatar'
import SelectableTile from '@/components/SelectableTile'
import SelectableRow from '@/components/SelectableRow'
import TomSlider from '@/components/TomSlider'
import QrModal from '@/components/QrModal'
import { MOCK_ONBOARDING_EMPLOYEES } from '@/lib/mock-data'
import type { AgentSettings, DeliveryTime, InterventionMode, ReasoningLevel } from '@/lib/types'

const TOTAL_STEPS = 6

const STEPS = [
  { n: 1, side: 'Boas-vindas',         title: 'Bem-vindo à AiSync',      subtitle: 'Vamos configurar seu time de IA em poucos passos.' },
  { n: 2, side: 'Conectar WhatsApps',  title: 'Conectar WhatsApps',      subtitle: 'Conecte o WhatsApp de cada vendedor para o agente começar a monitorar.' },
  { n: 3, side: 'Configurar Relatórios', title: 'Configurar Relatórios', subtitle: 'Defina o que entra no relatório diário do gestor e dos vendedores.' },
  { n: 4, side: 'Treinamento',         title: 'Configurar Treinamento',  subtitle: 'Defina quando e como o agente envia coaching no WhatsApp do vendedor.' },
  { n: 5, side: 'Assistência',         title: 'Configurar Assistência',  subtitle: 'Defina o que o agente pode responder quando os vendedores perguntam.' },
  { n: 6, side: 'Tudo pronto',         title: 'Tudo pronto!',            subtitle: 'Seu time de IA está configurado e já começou a trabalhar.' },
]

const DEFAULT_SETTINGS: AgentSettings = {
  deliveryTime: 'noite',
  managerSections: ['produtividade', 'clientes', 'followup'],
  sellerSections: ['ranking', 'perdas', 'linguagem', 'pontos'],
  toneRelatorio: 50,
  interventionMode: 'ativo',
  toneTreinamento: 75,
  canAnswer: ['produtos', 'historico', 'playbook', 'precos'],
  reasoningLevel: 'completo',
}

// ── Ícones de agente ─────────────────────────────────────────────
const AGENT_TILES = [
  { label: 'Monitoramento', gradient: 'linear-gradient(135deg,#1A4BFF,#4C6BFF)', icon: <path d="M5 12a9 9 0 0 1 9 9M5 5a16 16 0 0 1 16 16M6 19a1 1 0 1 0 0 .01" /> },
  { label: 'Relatórios',    gradient: 'linear-gradient(135deg,#13C2B3,#0B8E84)', icon: <><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" /><path d="M14 2v5h5M9 13h6M9 17h4" /></> },
  { label: 'Assistência',   gradient: 'linear-gradient(135deg,#7C5CFF,#5B3CF0)', icon: <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /> },
  { label: 'Treinamento',   gradient: 'linear-gradient(135deg,#FBBF24,#F59E0B)', icon: <><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c3 2.7 9 2.7 12 0v-5" /></> },
]

function AgentIconSquare({ gradient, size = 48, children }: { gradient: string; size?: number; children: React.ReactNode }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.34, background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 6px 16px rgba(20,40,90,.18)' }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </div>
  )
}
function SquareIcon({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{ width: 36, height: 36, borderRadius: 11, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{children}</div>
  )
}

// ════════════════ STEP SIDEBAR ════════════════
function StepSidebar({ step }: { step: number }) {
  return (
    <aside className="flex flex-col flex-shrink-0 h-full px-6 py-7"
      style={{ width: 296, background: 'rgba(255,255,255,.45)', backdropFilter: 'blur(24px) saturate(160%)', borderRight: '1px solid rgba(255,255,255,.6)' }}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-9 px-1">
        <Image src="/aisync-symbol-blue.svg" alt="AiSync" width={34} height={34} priority />
        <div>
          <div style={{ fontSize: 19, fontWeight: 800, color: '#0A0E1A', lineHeight: 1 }}>AiSync</div>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#8A93A3', letterSpacing: '.28em', fontFamily: 'var(--font-mono)' }}>SOLUÇÕES</div>
        </div>
      </div>

      {/* Steps */}
      <nav className="flex-1">
        {STEPS.map((s, i) => {
          const done = s.n < step
          const active = s.n === step
          const accent = '#0FB6A8'
          return (
            <div key={s.n} className="relative">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl"
                style={{ background: active ? '#fff' : 'transparent', boxShadow: active ? '0 6px 18px rgba(20,40,90,.08)' : 'none' }}>
                <div className="flex items-center justify-center flex-shrink-0 rounded-full"
                  style={{
                    width: 30, height: 30,
                    background: done ? accent : active ? 'transparent' : 'rgba(161,175,200,.15)',
                    border: active ? `2px solid ${accent}` : 'none',
                  }}>
                  {done ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  ) : (
                    <span style={{ fontSize: 13, fontWeight: 800, color: active ? accent : '#A9B0BD' }}>{s.n}</span>
                  )}
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: active || done ? '#161B2A' : '#A9B0BD' }}>{s.side}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: done ? accent : active ? accent : '#C4C9D6' }}>
                    {done ? 'Concluído' : active ? 'Em andamento' : 'A seguir'}
                  </div>
                </div>
              </div>
              {/* connector */}
              {i < STEPS.length - 1 && (
                <div className="ml-[27px]" style={{ width: 2, height: 14, background: s.n < step ? accent : 'rgba(161,175,200,.25)' }} />
              )}
            </div>
          )
        })}
      </nav>

      {/* Company card */}
      <div className="flex items-center gap-3 px-3 py-3 rounded-2xl mt-4"
        style={{ background: 'rgba(255,255,255,.6)', border: '1px solid rgba(255,255,255,.8)' }}>
        <div className="flex items-center justify-center text-white font-extrabold flex-shrink-0"
          style={{ width: 40, height: 40, borderRadius: 13, background: 'linear-gradient(135deg,#1A4BFF,#4C6BFF)', fontSize: 16 }}>R</div>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: '#161B2A' }}>Retenlins</div>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: '#8A93A3' }}>Plano · 10 usuários</div>
        </div>
      </div>
    </aside>
  )
}

// ════════════════ STEP 1 — Boas-vindas ════════════════
function StepWelcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full gap-6">
      <div style={{ width: 84, height: 84, borderRadius: 26, background: 'linear-gradient(135deg,#1A4BFF,#4C6BFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 30px rgba(26,75,255,.32)' }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" /><path d="M12 2a10 10 0 0 1 10 10M12 6a6 6 0 0 1 6 6M12 22a10 10 0 0 1-10-10M12 18a6 6 0 0 1-6-6" />
        </svg>
      </div>
      <div>
        <h2 style={{ fontSize: 34, fontWeight: 900, color: '#0A0E1A', letterSpacing: '-0.02em' }}>Olá, Lucas! 👋</h2>
        <p style={{ fontSize: 16, fontWeight: 600, color: '#3F4859', marginTop: 10, maxWidth: 480, lineHeight: 1.5 }}>
          Já temos o cérebro operacional da <strong style={{ color: '#0A0E1A' }}>Retenlins</strong>. Agora é só ajustar os 4 agentes que vão trabalhar pelo seu time no WhatsApp.
        </p>
      </div>
      <div className="flex items-start gap-7 mt-2">
        {AGENT_TILES.map(a => (
          <div key={a.label} className="flex flex-col items-center gap-2">
            <AgentIconSquare gradient={a.gradient} size={56}>{a.icon}</AgentIconSquare>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: '#3F4859' }}>{a.label}</span>
          </div>
        ))}
      </div>
      <button onClick={onStart}
        className="flex items-center gap-2 px-8 py-4 rounded-2xl text-[15px] font-extrabold text-white mt-3"
        style={{ background: 'linear-gradient(135deg,#13C2B3,#0B8E84)', boxShadow: '0 12px 28px rgba(11,142,132,.34)' }}>
        Começar configuração
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>
    </div>
  )
}

// ════════════════ STEP 2 — Conectar WhatsApps ════════════════
const CONNECT_STATUS = {
  connected: { label: 'Conectado', color: '#00855A', bg: 'rgba(0,168,107,.12)' },
  waiting:   { label: 'Aguardando', color: '#B45309', bg: 'rgba(245,158,11,.14)' },
  offline:   { label: 'Offline',   color: '#B91C1C', bg: 'rgba(220,38,38,.1)' },
}
function StepConnect({ onConnect }: { onConnect: (id: string) => void }) {
  return (
    <div className="flex flex-col gap-3">
      {MOCK_ONBOARDING_EMPLOYEES.map(emp => {
        const st = CONNECT_STATUS[emp.status]
        const isConn = emp.status === 'connected'
        return (
          <div key={emp.id} className="flex items-center gap-4 px-5 py-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,.78)', border: '1px solid rgba(255,255,255,.9)', boxShadow: '0 4px 14px rgba(20,40,90,.05)' }}>
            <Avatar initials={emp.initials} gradient={emp.gradient} size={44} showDot={isConn} />
            <div className="flex-1 min-w-0">
              <div style={{ fontSize: 14.5, fontWeight: 800, color: '#161B2A' }}>{emp.name}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3' }}>{emp.cargo}</div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0" style={{ background: st.bg }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.color }} />
              <span style={{ fontSize: 12, fontWeight: 800, color: st.color }}>{st.label}</span>
            </div>
            <button onClick={() => onConnect(emp.id)}
              className="px-4 py-2 rounded-xl text-[13px] font-extrabold flex-shrink-0"
              style={isConn
                ? { background: 'rgba(238,240,244,.9)', color: '#3F4859' }
                : { background: 'linear-gradient(135deg,#13C2B3,#0B8E84)', color: '#fff' }}>
              {isConn ? 'Reconectar' : 'Conectar'}
            </button>
          </div>
        )
      })}
      <p style={{ fontSize: 13, fontWeight: 600, color: '#8A93A3', marginTop: 6 }}>
        Pode pular os que faltam e conectar depois, em <strong style={{ color: '#3F4859' }}>Sessões</strong>.
      </p>
    </div>
  )
}

// ════════════════ STEP 3 — Configurar Relatórios ════════════════
function CardBox({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6 rounded-3xl ${className}`} style={{ background: 'rgba(255,255,255,.72)', border: '1px solid rgba(255,255,255,.9)', boxShadow: '0 8px 24px rgba(20,40,90,.06)' }}>
      {children}
    </div>
  )
}
function StepRelatorios({ cfg, update, toggleArr }: {
  cfg: AgentSettings
  update: <K extends keyof AgentSettings>(key: K, val: AgentSettings[K]) => void
  toggleArr: <T extends string>(key: keyof AgentSettings, val: T) => void
}) {
  return (
    <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
      {/* Gestor */}
      <CardBox>
        <div className="flex items-center gap-3 mb-5">
          <SquareIcon color="linear-gradient(135deg,#1A4BFF,#4C6BFF)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg></SquareIcon>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#0A0E1A' }}>Relatório do gestor</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3' }}>Visão macro, todo dia</div>
          </div>
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: '#3F4859', marginBottom: 10 }}>Quando entregar?</div>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {([['noite', '🌙', 'Hoje à noite', 'às 21h'], ['manha', '🌅', 'Amanhã cedo', 'às 7h']] as [DeliveryTime, string, string, string][]).map(([dt, , label, sub]) => {
            const sel = cfg.deliveryTime === dt
            return (
              <button key={dt} onClick={() => update('deliveryTime', dt)}
                className="flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all"
                style={{ background: sel ? 'rgba(15,182,168,.07)' : 'rgba(255,255,255,.6)', border: `2px solid ${sel ? '#0FB6A8' : 'rgba(221,225,232,.7)'}`, outline: 'none' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={sel ? '#0B8E84' : '#A9B0BD'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {dt === 'noite' ? <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /> : <><path d="M12 9a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4zM12 3v3M5 13H2M22 13h-3M5.6 6.6l1.4 1.4M18.4 6.6 17 8M2 18h20" /></>}
                </svg>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: sel ? '#0B8E84' : '#3F4859' }}>{label}</div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: '#A9B0BD' }}>{sub}</div>
                </div>
              </button>
            )
          })}
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: '#3F4859', marginBottom: 10 }}>O que você quer ver?</div>
        <div className="grid grid-cols-2 gap-3">
          <SelectableTile selected={cfg.managerSections.includes('produtividade')} onToggle={() => toggleArr('managerSections', 'produtividade')} accentColor="#0FB6A8"
            icon={<SquareIcon color="linear-gradient(135deg,#1A4BFF,#4C6BFF)"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg></SquareIcon>}
            title="Produtividade do time" sublabel="Quem conversou mais" />
          <SelectableTile selected={cfg.managerSections.includes('clientes')} onToggle={() => toggleArr('managerSections', 'clientes')} accentColor="#0FB6A8"
            icon={<SquareIcon color="linear-gradient(135deg,#13C2B3,#0B8E84)"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" /></svg></SquareIcon>}
            title="Clientes importantes" sublabel="Como são tratados" />
          <SelectableTile selected={cfg.managerSections.includes('followup')} onToggle={() => toggleArr('managerSections', 'followup')} accentColor="#0FB6A8"
            icon={<SquareIcon color="linear-gradient(135deg,#7C5CFF,#5B3CF0)"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></SquareIcon>}
            title="Alertas de follow-up" sublabel="Conversas paradas" />
          <SelectableTile selected={cfg.managerSections.includes('suspeitas')} onToggle={() => toggleArr('managerSections', 'suspeitas')} accentColor="#DC2626"
            icon={<SquareIcon color="linear-gradient(135deg,#F87171,#DC2626)"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4m0 4h.01" /></svg></SquareIcon>}
            title="Conversas suspeitas" sublabel="Fora do padrão" />
        </div>

        <div className="flex items-center gap-2.5 mt-4 px-4 py-3 rounded-2xl" style={{ background: 'rgba(124,92,255,.07)', border: '1px solid rgba(124,92,255,.18)' }}>
          <SquareIcon color="linear-gradient(135deg,#7C5CFF,#5B3CF0)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /></svg></SquareIcon>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: '#5B3CF0' }}>Sugestão da IA: adicione os nomes dos seus 3 maiores clientes</span>
        </div>
      </CardBox>

      {/* Funcionário */}
      <CardBox>
        <div className="flex items-center gap-3 mb-5">
          <SquareIcon color="linear-gradient(135deg,#13C2B3,#0B8E84)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></SquareIcon>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#0A0E1A' }}>Relatório do funcionário</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3' }}>Coaching individual</div>
          </div>
        </div>
        <div className="space-y-2 mb-5">
          {([['ranking', 'Quantas conversas fez', 'Volume de atividade do dia', 'linear-gradient(135deg,#1A4BFF,#4C6BFF)', <path key="i" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />],
            ['perdas', 'Elogios', 'O que fez bem', 'linear-gradient(135deg,#13C2B3,#0B8E84)', <path key="i" d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z" />],
            ['linguagem', 'Dicas de melhoria', 'O que melhorar amanhã', 'linear-gradient(135deg,#FBBF24,#F59E0B)', <><circle key="c" cx="12" cy="12" r="4" /><path key="p" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.3 11.3 1.4 1.4M2 12h2m16 0h2" /></>],
            ['pontos', 'Lembretes de follow-up', 'Quem retomar', 'linear-gradient(135deg,#7C5CFF,#5B3CF0)', <path key="i" d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />]] as [string, string, string, string, React.ReactNode][]).map(([key, title, sub, grad, ic]) => (
            <SelectableRow key={key} selected={cfg.sellerSections.includes(key as 'ranking')} onToggle={() => toggleArr('sellerSections', key)}
              icon={<SquareIcon color={grad}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ic}</svg></SquareIcon>}
              title={title} sublabel={sub} />
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(221,225,232,.6)', paddingTop: 16 }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 13, fontWeight: 700, color: '#3F4859' }}>Tom do feedback</span>
          </div>
          <TomSlider value={cfg.toneRelatorio} onChange={v => update('toneRelatorio', v)} />
        </div>
      </CardBox>
    </div>
  )
}

// ════════════════ STEP 4 — Configurar Treinamento ════════════════
function StepTreinamento({ cfg, update }: {
  cfg: AgentSettings
  update: <K extends keyof AgentSettings>(key: K, val: AgentSettings[K]) => void
}) {
  const modes: [InterventionMode, string, string, React.ReactNode][] = [
    ['conservador', 'Conservador', 'Só quando errar feio', <path key="i" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />],
    ['ativo', 'Ativo', 'Toda vez que tiver oportunidade', <path key="i" d="M13 2 3 14h9l-1 8 10-12h-9z" />],
    ['reativo', 'Reativo', 'Só quando o cliente reclamar', <path key="i" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />],
  ]
  const preview = cfg.toneTreinamento < 34
    ? 'Carlos, o lead das 14h aguarda retorno. Sugiro contato com dados de SLA e prazo de entrega.'
    : cfg.toneTreinamento < 67
    ? 'Carlos, o lead das 14h ainda está esperando. Que tal mandar um retorno rápido com a proposta?'
    : 'Boa, Carlos! Você fechou bem com a Sandra hoje 👏 Só uma dica: o lead das 14h ainda está esperando — que tal um áudio rápido?'

  return (
    <div className="flex flex-col gap-5">
      <CardBox>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#0A0E1A', marginBottom: 16 }}>Quando o agente intervém?</div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {modes.map(([mode, title, sub, ic]) => {
            const sel = cfg.interventionMode === mode
            return (
              <button key={mode} onClick={() => update('interventionMode', mode)}
                className="flex flex-col p-5 rounded-2xl text-left transition-all"
                style={{ background: sel ? 'rgba(245,158,11,.07)' : 'rgba(255,255,255,.6)', border: `2px solid ${sel ? '#F59E0B' : 'rgba(221,225,232,.7)'}`, outline: 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: sel ? 'linear-gradient(135deg,#FBBF24,#F59E0B)' : 'rgba(245,158,11,.13)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={sel ? 'white' : '#D97706'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ic}</svg>
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#161B2A' }}>{title}</div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3', marginTop: 2 }}>{sub}</div>
              </button>
            )
          })}
        </div>
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontSize: 13, fontWeight: 700, color: '#3F4859' }}>Tom da abordagem</span>
        </div>
        <TomSlider value={cfg.toneTreinamento} onChange={v => update('toneTreinamento', v)} gradient="linear-gradient(90deg,#FBBF24,#F59E0B)" />
      </CardBox>

      {/* Prévia */}
      <div className="p-5 rounded-3xl" style={{ background: 'rgba(245,158,11,.07)', border: '1px solid rgba(245,158,11,.2)' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#B45309', letterSpacing: '.12em', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>PRÉVIA DO COACHING</div>
        <div className="px-4 py-3 rounded-2xl" style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,.05)', maxWidth: 640 }}>
          <p style={{ fontSize: 13.5, fontWeight: 500, color: '#161B2A', lineHeight: 1.45 }}>{preview}</p>
        </div>
      </div>
    </div>
  )
}

// ════════════════ STEP 5 — Configurar Assistência ════════════════
function StepAssistencia({ cfg, update, toggleArr }: {
  cfg: AgentSettings
  update: <K extends keyof AgentSettings>(key: K, val: AgentSettings[K]) => void
  toggleArr: <T extends string>(key: keyof AgentSettings, val: T) => void
}) {
  const answers: [string, string, string, string, React.ReactNode][] = [
    ['produtos', 'Produtos e serviços', 'Catálogo da empresa', 'linear-gradient(135deg,#7C5CFF,#5B3CF0)', <path key="i" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />],
    ['historico', 'Histórico de compras', 'Pedidos do cliente', 'linear-gradient(135deg,#13C2B3,#0B8E84)', <><circle key="c" cx="12" cy="12" r="10" /><polyline key="p" points="12 6 12 12 16 14" /></>],
    ['playbook', 'Playbook de vendas', 'Respostas a objeções', 'linear-gradient(135deg,#1A4BFF,#4C6BFF)', <><path key="a" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path key="b" d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>],
    ['precos', 'Política de preços', 'Descontos permitidos', 'linear-gradient(135deg,#FBBF24,#F59E0B)', <><line key="l" x1="12" y1="1" x2="12" y2="23" /><path key="p" d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>],
  ]
  return (
    <div className="grid gap-5" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
      <CardBox>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#0A0E1A' }}>O que o agente pode responder?</div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3', marginTop: 2, marginBottom: 16 }}>Para perguntas dos vendedores, com base no cérebro da empresa</div>
        <div className="space-y-2">
          {answers.map(([key, title, sub, grad, ic]) => (
            <SelectableRow key={key} selected={cfg.canAnswer.includes(key as 'produtos')} onToggle={() => toggleArr('canAnswer', key)} accentColor="#0FB6A8"
              icon={<SquareIcon color={grad}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ic}</svg></SquareIcon>}
              title={title} sublabel={sub} />
          ))}
          <SelectableRow selected={false} onToggle={() => {}} locked
            icon={<SquareIcon color="rgba(161,175,200,.18)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A9B0BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg></SquareIcon>}
            title="Informações confidenciais" sublabel="Bloqueado por padrão" />
        </div>
      </CardBox>

      <CardBox>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#0A0E1A' }}>Nível de raciocínio</div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3', marginTop: 2, marginBottom: 16 }}>Quanto o agente &quot;pensa&quot; antes de responder</div>
        <div className="space-y-3">
          {([['rapido', 'Rápido e direto', 'Responde em segundos', <path key="i" d="M13 2 3 14h9l-1 8 10-12h-9z" />],
            ['completo', 'Completo e detalhado', 'Pensa mais, resposta mais rica', <><path key="a" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path key="b" d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>]] as [ReasoningLevel, string, string, React.ReactNode][]).map(([level, title, sub, ic]) => {
            const sel = cfg.reasoningLevel === level
            return (
              <button key={level} onClick={() => update('reasoningLevel', level)}
                className="flex items-center gap-3 w-full p-4 rounded-2xl text-left transition-all"
                style={{ background: sel ? 'rgba(124,92,255,.07)' : 'rgba(255,255,255,.6)', border: `2px solid ${sel ? '#7C5CFF' : 'rgba(221,225,232,.7)'}`, outline: 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: sel ? 'linear-gradient(135deg,#7C5CFF,#5B3CF0)' : 'rgba(124,92,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={sel ? 'white' : '#5B3CF0'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ic}</svg>
                </div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 800, color: '#161B2A' }}>{title}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3' }}>{sub}</div>
                </div>
              </button>
            )
          })}
        </div>
      </CardBox>
    </div>
  )
}

// ════════════════ STEP 6 — Tudo pronto ════════════════
function StepDone({ onFinish }: { onFinish: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full gap-6">
      <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'linear-gradient(135deg,#16C77E,#00A86B)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 36px rgba(0,168,107,.34)' }}>
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
      </div>
      <div>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: '#0A0E1A', letterSpacing: '-0.02em' }}>Seu time de IA está pronto! 🎉</h2>
        <p style={{ fontSize: 16, fontWeight: 600, color: '#3F4859', marginTop: 10, maxWidth: 520, lineHeight: 1.5 }}>
          Os 4 agentes já estão ativos. O primeiro relatório chega <strong style={{ color: '#0B8E84' }}>amanhã às 7h</strong> no seu WhatsApp.
        </p>
      </div>
      <div className="flex gap-4 mt-1">
        {AGENT_TILES.map(a => (
          <div key={a.label} className="flex flex-col items-center gap-2.5 px-6 py-5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,.78)', border: '1px solid rgba(255,255,255,.9)', boxShadow: '0 6px 18px rgba(20,40,90,.06)', minWidth: 150 }}>
            <AgentIconSquare gradient={a.gradient} size={48}>{a.icon}</AgentIconSquare>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#161B2A' }}>{a.label}</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-success" /><span style={{ fontSize: 11.5, fontWeight: 700, color: '#00855A' }}>Ativo</span></span>
          </div>
        ))}
      </div>
      <button onClick={onFinish}
        className="flex items-center gap-2 px-8 py-4 rounded-2xl text-[15px] font-extrabold text-white mt-3"
        style={{ background: 'linear-gradient(135deg,#1A4BFF,#3E63FF)', boxShadow: '0 12px 28px rgba(26,75,255,.34)' }}>
        Ver meu dashboard
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>
    </div>
  )
}

// ════════════════ PAGE ════════════════
export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [qrOpen, setQrOpen] = useState<string | null>(null)
  const [cfg, setCfg] = useState<AgentSettings>(DEFAULT_SETTINGS)

  const meta = STEPS[step - 1]

  const update = <K extends keyof AgentSettings>(key: K, val: AgentSettings[K]) => setCfg(c => ({ ...c, [key]: val }))
  const toggleArr = <T extends string>(key: keyof AgentSettings, val: T) => {
    const arr = cfg[key] as T[]
    const next = (arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]) as AgentSettings[typeof key]
    update(key, next)
  }

  const goNext = () => { if (step < TOTAL_STEPS) setStep(s => s + 1); else router.push('/hub') }
  const goBack = () => { if (step > 1) setStep(s => s - 1) }

  const showFooter = step >= 2 && step <= 5
  const centered = step === 1 || step === TOTAL_STEPS

  return (
    <div className="relative flex-shrink-0 overflow-hidden w-full"
      style={{ height: 'calc(100vh - 72px)', borderRadius: 34, background: '#EAEEF6', border: '1px solid rgba(255,255,255,.7)', boxShadow: '0 50px 100px -34px rgba(18,38,84,.5), 0 10px 30px rgba(18,38,84,.12)' }}>

      {/* Blobs */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <div className="absolute rounded-full float-blob" style={{ top: -120, right: -40, width: 480, height: 480, background: 'radial-gradient(circle, rgba(124,92,255,.18), transparent 70%)', filter: 'blur(60px)', '--duration': '20s' } as React.CSSProperties} />
        <div className="absolute rounded-full float-blob" style={{ bottom: -160, left: 240, width: 520, height: 520, background: 'radial-gradient(circle, rgba(15,182,168,.2), transparent 70%)', filter: 'blur(60px)', '--duration': '22s', '--delay': '1.5s' } as React.CSSProperties} />
        <div className="absolute rounded-full float-blob" style={{ bottom: -120, right: 200, width: 420, height: 420, background: 'radial-gradient(circle, rgba(245,158,11,.14), transparent 70%)', filter: 'blur(55px)', '--duration': '18s', '--delay': '.5s' } as React.CSSProperties} />
      </div>

      <div className="relative z-10 flex h-full">
        <StepSidebar step={step} />

        {/* Main */}
        <main className="flex flex-col flex-1 min-w-0 px-10 py-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-6 flex-shrink-0 mb-6">
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: '#0FB6A8', letterSpacing: '.18em', fontFamily: 'var(--font-mono)' }}>
                PASSO {String(step).padStart(2, '0')} — 06
              </div>
              <h1 style={{ fontSize: 30, fontWeight: 900, color: '#0A0E1A', letterSpacing: '-0.02em', marginTop: 6 }}>{meta.title}</h1>
              <p style={{ fontSize: 14.5, fontWeight: 600, color: '#3F4859', marginTop: 4 }}>{meta.subtitle}</p>
            </div>
            {/* Progress */}
            <div className="flex items-center gap-3 flex-shrink-0 mt-1">
              <div className="rounded-full overflow-hidden" style={{ width: 150, height: 6, background: 'rgba(161,175,200,.25)' }}>
                <div className="h-full rounded-full" style={{ width: `${(step / TOTAL_STEPS) * 100}%`, background: 'linear-gradient(90deg,#13C2B3,#0B8E84)', transition: 'width .3s' }} />
              </div>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: '#8A93A3', whiteSpace: 'nowrap' }}>{step} de {TOTAL_STEPS}</span>
            </div>
          </div>

          {/* Content */}
          <div className={`flex-1 min-h-0 ${centered ? '' : 'overflow-y-auto pr-1'}`}>
            {step === 1 && <StepWelcome onStart={goNext} />}
            {step === 2 && <StepConnect onConnect={setQrOpen} />}
            {step === 3 && <StepRelatorios cfg={cfg} update={update} toggleArr={toggleArr} />}
            {step === 4 && <StepTreinamento cfg={cfg} update={update} />}
            {step === 5 && <StepAssistencia cfg={cfg} update={update} toggleArr={toggleArr} />}
            {step === 6 && <StepDone onFinish={goNext} />}
          </div>

          {/* Footer */}
          {showFooter && (
            <div className="flex items-center justify-between flex-shrink-0 mt-6">
              <button onClick={goBack}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl text-[14px] font-extrabold text-ink-600"
                style={{ background: 'rgba(255,255,255,.75)', border: '1px solid rgba(255,255,255,.9)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                Voltar
              </button>
              <div className="flex items-center gap-4">
                {step === 2 && <button onClick={goNext} className="text-[13.5px] font-bold text-ink-400">Pular por agora</button>}
                <button onClick={goNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl text-[14px] font-extrabold text-white"
                  style={{ background: 'linear-gradient(135deg,#13C2B3,#0B8E84)', boxShadow: '0 8px 20px rgba(11,142,132,.32)' }}>
                  Próximo
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* QR Modal */}
      {qrOpen && (
        <QrModal
          instanceName={MOCK_ONBOARDING_EMPLOYEES.find(e => e.id === qrOpen)?.name ?? ''}
          onClose={() => setQrOpen(null)}
          onConnected={() => setQrOpen(null)}
        />
      )}
    </div>
  )
}
