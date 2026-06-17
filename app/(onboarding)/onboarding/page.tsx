// app/(onboarding)/onboarding/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Avatar from '@/components/Avatar'
import SelectableTile from '@/components/SelectableTile'
import SelectableRow from '@/components/SelectableRow'
import TomSlider from '@/components/TomSlider'
import QrModal from '@/components/QrModal'
import { MOCK_ONBOARDING_EMPLOYEES } from '@/lib/mock-data'
import type { AgentSettings, DeliveryTime, InterventionMode, ReasoningLevel } from '@/lib/types'

// ── Defaults ────────────────────────────────────────────────────
const DEFAULT_SETTINGS: AgentSettings = {
  deliveryTime:    'manha',
  managerSections: ['produtividade', 'clientes'],
  sellerSections:  ['ranking', 'perdas'],
  toneRelatorio:   50,
  interventionMode: 'ativo',
  toneTreinamento: 40,
  canAnswer:       ['produtos', 'historico', 'playbook'],
  reasoningLevel:  'completo',
}

const TOTAL_STEPS = 6

// ── StepDot ─────────────────────────────────────────────────────
function StepDot({ step, current, color }: { step: number; current: number; color: string }) {
  const done    = step < current
  const active  = step === current
  return (
    <div className="flex items-center gap-2">
      <div
        style={{
          width: 28, height: 28, borderRadius: 9,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: done ? color : active ? color : 'rgba(161,175,200,.22)',
          opacity: done || active ? 1 : 0.4,
          transition: 'all .3s',
        }}
      >
        {done ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        ) : (
          <span style={{ fontSize: 12, fontWeight: 900, color: active ? 'white' : '#8A93A3' }}>{step}</span>
        )}
      </div>
    </div>
  )
}

// ── IconWrap ─────────────────────────────────────────────────────
function AgentIcon({ color, size = 48, children }: { color: string; size?: number; children: React.ReactNode }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.35, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {children}
    </div>
  )
}

// ── STEP 1 — Boas-vindas ─────────────────────────────────────────
function StepWelcome() {
  const features = [
    { icon: '#1A4BFF', label: 'Monitoramento em tempo real', desc: 'Acompanhe todas as conversas do seu time ao vivo' },
    { icon: '#0FB6A8', label: 'Relatórios inteligentes',     desc: 'Análises automáticas de desempenho por vendedor' },
    { icon: '#F59E0B', label: 'Coaching personalizado',      desc: 'Dicas em tempo real baseadas no contexto da conversa' },
    { icon: '#7C5CFF', label: 'Assistência instantânea',     desc: 'Respostas automáticas para dúvidas comuns dos clientes' },
  ]

  return (
    <div className="flex flex-col items-center text-center gap-8">
      {/* Logo + título */}
      <div className="flex flex-col items-center gap-4">
        <div style={{ width: 72, height: 72, borderRadius: 22, background: 'linear-gradient(135deg,#1A4BFF,#4C6BFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 28px rgba(26,75,255,.32)' }}>
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/><path d="M12 2a10 10 0 0 1 10 10M12 6a6 6 0 0 1 6 6"/><path d="M12 22a10 10 0 0 1-10-10M12 18a6 6 0 0 1-6-6"/>
          </svg>
        </div>
        <div>
          <h1 style={{ fontSize: 34, fontWeight: 900, color: '#0A0E1A', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Bem-vindo ao AiSync
          </h1>
          <p style={{ fontSize: 17, fontWeight: 600, color: '#8A93A3', marginTop: 8 }}>
            Seu time de vendas turbinado por inteligência artificial
          </p>
        </div>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {features.map(f => (
          <div key={f.label} className="flex items-start gap-3 p-4 rounded-2xl text-left"
            style={{ background: 'rgba(255,255,255,.7)', border: '1.5px solid rgba(255,255,255,.9)' }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: f.icon, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#161B2A' }}>{f.label}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#8A93A3', marginTop: 2 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 14, fontWeight: 600, color: '#A9B0BD' }}>
        Vamos configurar sua conta em 5 passos rápidos.
      </p>
    </div>
  )
}

// ── STEP 2 — Conectar WhatsApps ──────────────────────────────────
function StepConnect({ setQrOpen }: { setQrOpen: (id: string | null) => void }) {
  const connected = MOCK_ONBOARDING_EMPLOYEES.filter(e => e.status === 'connected').length
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0A0E1A' }}>Conectar WhatsApps</h2>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#8A93A3', marginTop: 4 }}>
          Escaneie o QR Code no celular de cada vendedor para conectar.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: 'rgba(26,75,255,.07)', border: '1px solid rgba(26,75,255,.15)' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#8A93A3', fontFamily: 'var(--font-mono)' }}>DISPOSITIVOS CONECTADOS</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#1A4BFF', lineHeight: 1.2 }}>
            {connected} <span style={{ fontSize: 15, fontWeight: 700, color: '#8A93A3' }}>/ {MOCK_ONBOARDING_EMPLOYEES.length}</span>
          </div>
        </div>
        <svg width="40" height="40" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(26,75,255,.15)" strokeWidth="10"/>
          <circle cx="50" cy="50" r="42" fill="none" stroke="#1A4BFF" strokeWidth="10"
            strokeDasharray={`${2 * Math.PI * 42 * connected / MOCK_ONBOARDING_EMPLOYEES.length} ${2 * Math.PI * 42}`}
            strokeLinecap="round" transform="rotate(-90 50 50)"/>
        </svg>
      </div>

      {/* Employee list */}
      <div className="space-y-2">
        {MOCK_ONBOARDING_EMPLOYEES.map(emp => (
          <div key={emp.id} className="flex items-center gap-3 p-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,.7)', border: '1.5px solid rgba(255,255,255,.9)' }}>
            <Avatar initials={emp.initials} gradient={emp.gradient} size={44} showDot={emp.status === 'connected'} />
            <div className="flex-1 min-w-0">
              <div style={{ fontSize: 14, fontWeight: 800, color: '#161B2A' }}>{emp.name}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3' }}>{emp.cargo}</div>
            </div>
            {emp.status === 'connected' ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,168,107,.1)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00855A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#00855A' }}>Conectado</span>
              </div>
            ) : (
              <button onClick={() => setQrOpen(emp.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-2xl text-[13px] font-extrabold"
                style={{ background: 'linear-gradient(135deg,#1A4BFF,#3E63FF)', color: 'white', boxShadow: '0 4px 12px rgba(26,75,255,.3)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="4" height="4" rx="1"/>
                </svg>
                QR Code
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── STEP 3 — Configurar Relatórios ───────────────────────────────
function StepRelatorios({ cfg, update, toggleArr }: {
  cfg: AgentSettings
  update: <K extends keyof AgentSettings>(key: K, val: AgentSettings[K]) => void
  toggleArr: <T extends string>(key: keyof AgentSettings, val: T) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <AgentIcon color="linear-gradient(135deg,#0FB6A8,#0B8E84)" size={44}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>
              <path d="M14 2v5h5"/><path d="M9 13h6M9 17h4"/>
            </svg>
          </AgentIcon>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0A0E1A' }}>Configurar Relatórios</h2>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#8A93A3' }}>Agente de análise de desempenho</p>
          </div>
        </div>
      </div>

      {/* Horário */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#8A93A3', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>HORÁRIO DE ENTREGA</div>
        <div className="flex gap-3">
          {(['manha', 'noite'] as DeliveryTime[]).map(dt => (
            <button key={dt} onClick={() => update('deliveryTime', dt)}
              className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl transition-all"
              style={{
                background: cfg.deliveryTime === dt ? 'rgba(15,182,168,.08)' : 'rgba(255,255,255,.6)',
                border: `2px solid ${cfg.deliveryTime === dt ? '#0FB6A8' : 'rgba(255,255,255,.8)'}`,
                outline: 'none',
              }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={cfg.deliveryTime === dt ? '#0B8E84' : '#8A93A3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {dt === 'manha' ? <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41"/></> : <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>}
              </svg>
              <span style={{ fontSize: 13, fontWeight: 800, color: cfg.deliveryTime === dt ? '#0B8E84' : '#8A93A3' }}>
                {dt === 'manha' ? 'Manhã' : 'Noite'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* O que ver */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#8A93A3', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>O QUE VOCÊ QUER VER NO SEU RELATÓRIO?</div>
        <div className="grid grid-cols-2 gap-3">
          <SelectableTile selected={cfg.managerSections.includes('produtividade')} onToggle={() => toggleArr('managerSections', 'produtividade')}
            accentColor="#0FB6A8"
            icon={<div style={{ width:34,height:34,borderRadius:10,background:'linear-gradient(135deg,#0FB6A8,#0B8E84)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 7-7"/></svg></div>}
            title="Produtividade" sublabel="Ranking e volume"/>
          <SelectableTile selected={cfg.managerSections.includes('clientes')} onToggle={() => toggleArr('managerSections', 'clientes')}
            accentColor="#0FB6A8"
            icon={<div style={{ width:34,height:34,borderRadius:10,background:'linear-gradient(135deg,#FBBF24,#F59E0B)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>}
            title="Clientes" sublabel="Novos e ativos"/>
          <SelectableTile selected={cfg.managerSections.includes('followup')} onToggle={() => toggleArr('managerSections', 'followup')}
            accentColor="#0FB6A8"
            icon={<div style={{ width:34,height:34,borderRadius:10,background:'linear-gradient(135deg,#0891B2,#0B8E84)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div>}
            title="Follow-up" sublabel="Abertos e perdidos"/>
          <SelectableTile selected={cfg.managerSections.includes('suspeitas')} onToggle={() => toggleArr('managerSections', 'suspeitas')}
            accentColor="#0FB6A8"
            icon={<div style={{ width:34,height:34,borderRadius:10,background:'linear-gradient(135deg,#DC2626,#B91C1C)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4m0 4h.01"/></svg></div>}
            title="Suspeitas" sublabel="Alertas do agente"/>
        </div>
      </div>
    </div>
  )
}

// ── STEP 4 — Configurar Treinamento ─────────────────────────────
function StepTreinamento({ cfg, update }: {
  cfg: AgentSettings
  update: <K extends keyof AgentSettings>(key: K, val: AgentSettings[K]) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <AgentIcon color="linear-gradient(135deg,#FBBF24,#F59E0B)" size={44}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>
          </svg>
        </AgentIcon>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0A0E1A' }}>Configurar Treinamento</h2>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#8A93A3' }}>Agente de coaching em tempo real</p>
        </div>
      </div>

      {/* Modo de intervenção */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#8A93A3', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>QUANDO O AGENTE INTERVÉM?</div>
        <div className="space-y-3">
          {(['conservador', 'ativo', 'reativo'] as InterventionMode[]).map(mode => (
            <button key={mode} onClick={() => update('interventionMode', mode)}
              className="flex items-center gap-3 w-full p-4 rounded-2xl text-left transition-all"
              style={{
                background: cfg.interventionMode === mode ? 'rgba(245,158,11,.08)' : 'rgba(255,255,255,.6)',
                border: `2px solid ${cfg.interventionMode === mode ? '#F59E0B' : 'rgba(255,255,255,.8)'}`,
                outline: 'none',
              }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: cfg.interventionMode === mode ? 'linear-gradient(135deg,#FBBF24,#F59E0B)' : '#EEF0F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={cfg.interventionMode === mode ? 'white' : '#8A93A3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2.7 9 2.7 12 0v-5"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#161B2A', textTransform: 'capitalize' }}>{mode}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#8A93A3' }}>
                  {mode === 'conservador' && 'Intervém somente em riscos críticos'}
                  {mode === 'ativo' && 'Detecta e sugere em tempo real'}
                  {mode === 'reativo' && 'Atua após solicitação do vendedor'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tom */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#8A93A3', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>TOM DO COACHING</div>
        <TomSlider value={cfg.toneTreinamento} onChange={v => update('toneTreinamento', v)} gradient="linear-gradient(90deg,#FBBF24,#F59E0B)" />
      </div>
    </div>
  )
}

// ── STEP 5 — Configurar Assistência ─────────────────────────────
function StepAssistencia({ cfg, update, toggleArr }: {
  cfg: AgentSettings
  update: <K extends keyof AgentSettings>(key: K, val: AgentSettings[K]) => void
  toggleArr: <T extends string>(key: keyof AgentSettings, val: T) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <AgentIcon color="linear-gradient(135deg,#7C5CFF,#5B3CF0)" size={44}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </AgentIcon>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0A0E1A' }}>Configurar Assistência</h2>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#8A93A3' }}>Agente de respostas automáticas</p>
        </div>
      </div>

      {/* O que pode responder */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#8A93A3', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>O QUE O AGENTE PODE RESPONDER?</div>
        <div className="space-y-1">
          <SelectableRow selected={cfg.canAnswer.includes('produtos')} onToggle={() => toggleArr('canAnswer', 'produtos')}
            icon={<div style={{ width:36,height:36,borderRadius:11,background:'linear-gradient(135deg,#7C5CFF,#5B3CF0)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>}
            title="Produtos" sublabel="Catálogo e características" accentColor="#7C5CFF"/>
          <SelectableRow selected={cfg.canAnswer.includes('historico')} onToggle={() => toggleArr('canAnswer', 'historico')}
            icon={<div style={{ width:36,height:36,borderRadius:11,background:'linear-gradient(135deg,#0891B2,#0B8E84)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>}
            title="Histórico" sublabel="Pedidos anteriores" accentColor="#7C5CFF"/>
          <SelectableRow selected={cfg.canAnswer.includes('playbook')} onToggle={() => toggleArr('canAnswer', 'playbook')}
            icon={<div style={{ width:36,height:36,borderRadius:11,background:'linear-gradient(135deg,#0FB6A8,#0B8E84)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>}
            title="Playbook" sublabel="Scripts e objeções" accentColor="#7C5CFF"/>
          <SelectableRow selected={cfg.canAnswer.includes('precos')} onToggle={() => toggleArr('canAnswer', 'precos')}
            icon={<div style={{ width:36,height:36,borderRadius:11,background:'linear-gradient(135deg,#F59E0B,#D97706)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>}
            title="Preços" sublabel="Tabela de valores" accentColor="#7C5CFF"/>
          <SelectableRow selected={false} onToggle={() => {}} locked
            icon={<div style={{ width:36,height:36,borderRadius:11,background:'#EEF0F4',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A9B0BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>}
            title="Confidencial" sublabel="Informações internas"/>
        </div>
      </div>

      {/* Raciocínio */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#8A93A3', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>NÍVEL DE RACIOCÍNIO</div>
        <div className="flex gap-3">
          {(['rapido', 'completo'] as ReasoningLevel[]).map(level => (
            <button key={level} onClick={() => update('reasoningLevel', level)}
              className="flex-1 flex items-center gap-3 p-4 rounded-2xl text-left transition-all"
              style={{
                background: cfg.reasoningLevel === level ? 'rgba(124,92,255,.08)' : 'rgba(255,255,255,.6)',
                border: `2px solid ${cfg.reasoningLevel === level ? '#7C5CFF' : 'rgba(255,255,255,.8)'}`,
                outline: 'none',
              }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: cfg.reasoningLevel === level ? 'linear-gradient(135deg,#7C5CFF,#5B3CF0)' : '#EEF0F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={cfg.reasoningLevel === level ? 'white' : '#8A93A3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {level === 'rapido' ? <><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></> : <><path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></>}
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#161B2A' }}>{level === 'rapido' ? 'Rápido' : 'Completo'}</div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: '#8A93A3' }}>
                  {level === 'rapido' ? '<2s · menor contexto' : '4–6s · contexto completo'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── STEP 6 — Tudo pronto ─────────────────────────────────────────
function StepDone() {
  const checks = [
    { label: 'Monitoramento ativado',  color: '#1A4BFF' },
    { label: 'Relatórios configurados', color: '#0FB6A8' },
    { label: 'Treinamento configurado', color: '#F59E0B' },
    { label: 'Assistência configurada', color: '#7C5CFF' },
  ]
  return (
    <div className="flex flex-col items-center text-center gap-8">
      {/* Trophy */}
      <div style={{ width: 88, height: 88, borderRadius: 26, background: 'linear-gradient(135deg,#00A86B,#00855A)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 36px rgba(0,168,107,.32)' }}>
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
          <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
        </svg>
      </div>

      <div>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: '#0A0E1A', letterSpacing: '-0.025em' }}>Tudo pronto!</h2>
        <p style={{ fontSize: 16, fontWeight: 600, color: '#8A93A3', marginTop: 8, lineHeight: 1.5 }}>
          Seu AiSync está configurado e os agentes<br/>já estão trabalhando para o seu time.
        </p>
      </div>

      {/* Checks */}
      <div className="w-full space-y-2">
        {checks.map((c, i) => (
          <div key={c.label} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,.7)', border: '1.5px solid rgba(255,255,255,.9)', animationDelay: `${i * 80}ms` }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#161B2A' }}>{c.label}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 13, fontWeight: 600, color: '#A9B0BD' }}>
        Você pode ajustar as configurações a qualquer momento em <strong style={{ color: '#7C5CFF' }}>Configurações</strong>.
      </p>
    </div>
  )
}

// ── STEP COLORS ──────────────────────────────────────────────────
const STEP_COLORS: Record<number, string> = {
  1: '#1A4BFF',
  2: '#1A4BFF',
  3: '#0FB6A8',
  4: '#F59E0B',
  5: '#7C5CFF',
  6: '#00A86B',
}

const STEP_LABELS = ['Boas-vindas', 'Conectar', 'Relatórios', 'Treinamento', 'Assistência', 'Concluído']

// ── PAGE ─────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep]   = useState(1)
  const [qrOpen, setQrOpen] = useState<string | null>(null)
  const [cfg, setCfg]     = useState<AgentSettings>(DEFAULT_SETTINGS)

  const color = STEP_COLORS[step]

  const update = <K extends keyof AgentSettings>(key: K, val: AgentSettings[K]) =>
    setCfg(c => ({ ...c, [key]: val }))

  const toggleArr = <T extends string>(key: keyof AgentSettings, val: T) => {
    const arr = cfg[key] as T[]
    const next = (arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]) as AgentSettings[typeof key]
    update(key, next)
  }

  const next = () => {
    if (step < TOTAL_STEPS) setStep(s => s + 1)
    else router.push('/hub')
  }
  const back = () => { if (step > 1) setStep(s => s - 1) }

  const isLast = step === TOTAL_STEPS

  return (
    <>
      {/* Card */}
      <div className="relative flex flex-col"
        style={{
          width: 560, minHeight: 640, maxHeight: '90vh',
          background: 'rgba(255,255,255,.72)',
          backdropFilter: 'blur(28px) saturate(160%)',
          WebkitBackdropFilter: 'blur(28px) saturate(160%)',
          borderRadius: 32,
          border: '1.5px solid rgba(255,255,255,.9)',
          boxShadow: '0 40px 80px -20px rgba(18,38,84,.22), 0 8px 24px rgba(18,38,84,.08)',
          padding: '36px 40px',
          overflow: 'hidden',
        }}>

        {/* Progress bar */}
        <div className="flex-shrink-0 mb-8">
          <div className="flex items-center justify-between mb-4">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(s => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <StepDot step={s} current={step} color={STEP_COLORS[s]} />
                {s < TOTAL_STEPS && (
                  <div className="flex-1 h-[2px] rounded-full mx-1"
                    style={{ background: step > s ? color : 'rgba(161,175,200,.22)', transition: 'background .3s' }} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {STEP_LABELS.map((label, i) => (
              <span key={label} style={{
                fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)',
                color: step === i + 1 ? color : '#C4C9D6',
                textTransform: 'uppercase', letterSpacing: '.08em',
                textAlign: i === 0 ? 'left' : i === STEP_LABELS.length - 1 ? 'right' : 'center',
                flex: 1,
              }}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto">
          {step === 1 && <StepWelcome />}
          {step === 2 && <StepConnect setQrOpen={setQrOpen} />}
          {step === 3 && <StepRelatorios cfg={cfg} update={update} toggleArr={toggleArr} />}
          {step === 4 && <StepTreinamento cfg={cfg} update={update} />}
          {step === 5 && <StepAssistencia cfg={cfg} update={update} toggleArr={toggleArr} />}
          {step === 6 && <StepDone />}
        </div>

        {/* Footer nav */}
        <div className="flex items-center gap-3 mt-8 flex-shrink-0">
          {step > 1 && !isLast && (
            <button onClick={back}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl text-[14px] font-extrabold"
              style={{ background: 'rgba(255,255,255,.7)', color: '#3F4859', border: '1.5px solid rgba(255,255,255,.9)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Voltar
            </button>
          )}
          <button onClick={next}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[15px] font-extrabold text-white transition-all"
            style={{
              background: `linear-gradient(135deg,${color},${color}CC)`,
              boxShadow: `0 8px 20px ${color}44`,
            }}>
            {isLast ? 'Ir para o dashboard' : step === 2 ? 'Continuar' : 'Próximo'}
            {!isLast && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* QrModal */}
      {qrOpen && (
        <QrModal
          instanceName={MOCK_ONBOARDING_EMPLOYEES.find(e => e.id === qrOpen)?.name ?? ''}
          onClose={() => setQrOpen(null)}
          onConnected={() => setQrOpen(null)}
        />
      )}
    </>
  )
}
