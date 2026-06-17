// app/(dash)/configuracoes/page.tsx
'use client'
import { useState } from 'react'
import GlassCard from '@/components/GlassCard'
import SelectableTile from '@/components/SelectableTile'
import SelectableRow from '@/components/SelectableRow'
import TomSlider from '@/components/TomSlider'
import SegmentedControl from '@/components/SegmentedControl'
import type { AgentSettings, DeliveryTime, InterventionMode, ReasoningLevel } from '@/lib/types'

type ConfigTab = 'relatorios' | 'treinamento' | 'assistencia'

const TAB_STYLES: Record<ConfigTab, { gradient: string; activeColor: string }> = {
  relatorios:  { gradient: 'linear-gradient(135deg,#13C2B3,#0B8E84)', activeColor: '#fff' },
  treinamento: { gradient: 'linear-gradient(135deg,#FBBF24,#F59E0B)', activeColor: '#fff' },
  assistencia: { gradient: 'linear-gradient(135deg,#7C5CFF,#5B3CF0)', activeColor: '#fff' },
}

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

function IconChip({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{ width: 34, height: 34, borderRadius: 10, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  )
}
function RowIcon({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{ width: 36, height: 36, borderRadius: 11, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  )
}

export default function ConfiguracoesPage() {
  const [tab, setTab] = useState<ConfigTab>('relatorios')
  const [cfg, setCfg] = useState<AgentSettings>(DEFAULT_SETTINGS)
  const [saved, setSaved] = useState(false)

  const update = <K extends keyof AgentSettings>(key: K, val: AgentSettings[K]) =>
    setCfg(c => ({ ...c, [key]: val }))

  const toggleArr = <T extends string>(key: keyof AgentSettings, val: T) => {
    const arr = cfg[key] as T[]
    const next = (arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]) as AgentSettings[typeof key]
    update(key, next)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col h-full p-[28px_34px] overflow-hidden gap-5">

      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0A0E1A', letterSpacing: '-0.015em' }}>Configurações dos agentes</h1>
        <button
          onClick={handleSave}
          className="px-5 py-3 rounded-2xl text-[14px] font-extrabold text-white transition-all"
          style={{
            background: saved ? 'linear-gradient(135deg,#0FB6A8,#0B8E84)' : 'linear-gradient(135deg,#1A4BFF,#3E63FF)',
            boxShadow: '0 6px 16px rgba(26,75,255,.28)',
          }}>
          {saved ? '✓ Salvo!' : 'Salvar alterações'}
        </button>
      </div>

      {/* Abas */}
      <div className="flex-shrink-0">
        <SegmentedControl<ConfigTab>
          segments={[
            { value:'relatorios', label:'Relatórios' },
            { value:'treinamento', label:'Treinamento' },
            { value:'assistencia', label:'Assistência' },
          ]}
          value={tab} onChange={setTab}
          activeGradient={TAB_STYLES[tab].gradient}
          activeColor={TAB_STYLES[tab].activeColor}
        />
      </div>

      {/* Conteúdo por aba */}
      <div className="flex-1 overflow-y-auto">

        {/* ── RELATÓRIOS ── */}
        {tab === 'relatorios' && (
          <div className="grid grid-cols-2 gap-5">
            {/* Gestor */}
            <GlassCard className="p-5 flex flex-col gap-5">
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0A0E1A' }}>Relatório do gestor</div>

              {/* Horário de entrega */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#8A93A3', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>HORÁRIO DE ENTREGA</div>
                <div className="flex gap-3">
                  {(['manha', 'noite'] as DeliveryTime[]).map(dt => (
                    <button key={dt} onClick={() => update('deliveryTime', dt)}
                      className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl transition-all"
                      style={{
                        background: cfg.deliveryTime === dt ? 'rgba(15,182,168,.08)' : 'rgba(255,255,255,.6)',
                        border: `2px solid ${cfg.deliveryTime === dt ? '#0FB6A8' : 'rgba(255,255,255,.8)'}`,
                        boxShadow: cfg.deliveryTime === dt ? '0 0 0 2px rgba(15,182,168,.2)' : 'none',
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
                <div style={{ fontSize: 12, fontWeight: 700, color: '#8A93A3', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>O QUE VOCÊ QUER VER?</div>
                <div className="grid grid-cols-2 gap-3">
                  <SelectableTile selected={cfg.managerSections.includes('produtividade')} onToggle={() => toggleArr('managerSections', 'produtividade')}
                    icon={<IconChip color="linear-gradient(135deg,#1A4BFF,#4C6BFF)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 7-7"/></svg></IconChip>}
                    title="Produtividade" sublabel="Ranking e volume"/>
                  <SelectableTile selected={cfg.managerSections.includes('clientes')} onToggle={() => toggleArr('managerSections', 'clientes')}
                    icon={<IconChip color="linear-gradient(135deg,#FBBF24,#D97706)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></IconChip>}
                    title="Clientes" sublabel="Novos e ativos" accentColor="#F59E0B"/>
                  <SelectableTile selected={cfg.managerSections.includes('followup')} onToggle={() => toggleArr('managerSections', 'followup')}
                    icon={<IconChip color="linear-gradient(135deg,#0891B2,#0B8E84)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></IconChip>}
                    title="Follow-up" sublabel="Abertos e perdidos" accentColor="#0891B2"/>
                  <SelectableTile selected={cfg.managerSections.includes('suspeitas')} onToggle={() => toggleArr('managerSections', 'suspeitas')}
                    icon={<IconChip color="linear-gradient(135deg,#DC2626,#B91C1C)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4m0 4h.01"/></svg></IconChip>}
                    title="Suspeitas" sublabel="Alertas do agente" accentColor="#DC2626"/>
                </div>
              </div>
            </GlassCard>

            {/* Funcionário */}
            <GlassCard className="p-5 flex flex-col gap-5">
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0A0E1A' }}>Relatório do funcionário</div>
              <div className="space-y-1">
                <SelectableRow selected={cfg.sellerSections.includes('ranking')} onToggle={() => toggleArr('sellerSections', 'ranking')}
                  icon={<RowIcon color="linear-gradient(135deg,#FBBF24,#F59E0B)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg></RowIcon>}
                  title="Ranking geral" sublabel="Posição no time"/>
                <SelectableRow selected={cfg.sellerSections.includes('perdas')} onToggle={() => toggleArr('sellerSections', 'perdas')}
                  icon={<RowIcon color="linear-gradient(135deg,#DC2626,#B91C1C)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l6 6 4-4 7 7"/></svg></RowIcon>}
                  title="Conversas perdidas" sublabel="Oportunidades não aproveitadas"/>
                <SelectableRow selected={cfg.sellerSections.includes('linguagem')} onToggle={() => toggleArr('sellerSections', 'linguagem')}
                  icon={<RowIcon color="linear-gradient(135deg,#7C5CFF,#5B3CF0)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></RowIcon>}
                  title="Análise de linguagem" sublabel="Tom e persuasão"/>
                <SelectableRow selected={cfg.sellerSections.includes('pontos')} onToggle={() => toggleArr('sellerSections', 'pontos')}
                  icon={<RowIcon color="linear-gradient(135deg,#0FB6A8,#0B8E84)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg></RowIcon>}
                  title="Pontos de melhoria" sublabel="Ação prioritária"/>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#8A93A3', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>TOM DO FEEDBACK</div>
                <TomSlider value={cfg.toneRelatorio} onChange={v => update('toneRelatorio', v)} />
              </div>
            </GlassCard>
          </div>
        )}

        {/* ── TREINAMENTO ── */}
        {tab === 'treinamento' && (
          <div className="grid grid-cols-2 gap-5">
            <GlassCard className="p-5 flex flex-col gap-5">
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0A0E1A' }}>Quando o agente intervém?</div>
              <div className="space-y-3">
                {(['conservador', 'ativo', 'reativo'] as InterventionMode[]).map(mode => (
                  <button key={mode} onClick={() => update('interventionMode', mode)}
                    className="flex items-center gap-3 w-full p-4 rounded-2xl text-left transition-all"
                    style={{
                      background: cfg.interventionMode === mode ? 'rgba(245,158,11,.08)' : 'rgba(255,255,255,.6)',
                      border: `2px solid ${cfg.interventionMode === mode ? '#F59E0B' : 'rgba(255,255,255,.8)'}`,
                      outline: 'none',
                    }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: cfg.interventionMode === mode ? 'linear-gradient(135deg,#FBBF24,#F59E0B)' : '#EEF0F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={cfg.interventionMode === mode ? 'white' : '#8A93A3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            </GlassCard>
            <GlassCard className="p-5 flex flex-col gap-5">
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0A0E1A' }}>Tom do coaching</div>
              <TomSlider value={cfg.toneTreinamento} onChange={v => update('toneTreinamento', v)} gradient="linear-gradient(90deg,#FBBF24,#F59E0B)" />
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.2)' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#B45309', marginBottom: 8 }}>PRÉVIA DO COACHING</div>
                <div className="flex items-start gap-2">
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#FBBF24,#F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>
                  </div>
                  <p style={{ fontSize: 12.5, fontWeight: 600, color: '#92560B' }}>
                    {cfg.toneTreinamento < 34
                      ? '"Detectei que o cliente questionou o prazo. Recomendo resposta com dados técnicos de SLA."'
                      : cfg.toneTreinamento < 67
                      ? '"Ei, o cliente perguntou sobre prazo! Que tal mencionar que vocês têm 98% de entrega no prazo?"'
                      : '"Ótima oportunidade! O cliente quer saber mais — responde com carinho e menciona a entreginha rápida de vocês 😊"'}
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* ── ASSISTÊNCIA ── */}
        {tab === 'assistencia' && (
          <div className="grid grid-cols-2 gap-5">
            <GlassCard className="p-5 flex flex-col gap-5">
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0A0E1A' }}>O que pode responder?</div>
              <div className="space-y-1">
                <SelectableRow selected={cfg.canAnswer.includes('produtos')} onToggle={() => toggleArr('canAnswer', 'produtos')}
                  icon={<RowIcon color="linear-gradient(135deg,#7C5CFF,#5B3CF0)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></RowIcon>}
                  title="Produtos" sublabel="Catálogo e características" accentColor="#7C5CFF"/>
                <SelectableRow selected={cfg.canAnswer.includes('historico')} onToggle={() => toggleArr('canAnswer', 'historico')}
                  icon={<RowIcon color="linear-gradient(135deg,#0891B2,#0B8E84)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></RowIcon>}
                  title="Histórico" sublabel="Pedidos anteriores" accentColor="#7C5CFF"/>
                <SelectableRow selected={cfg.canAnswer.includes('playbook')} onToggle={() => toggleArr('canAnswer', 'playbook')}
                  icon={<RowIcon color="linear-gradient(135deg,#0FB6A8,#0B8E84)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></RowIcon>}
                  title="Playbook" sublabel="Scripts e objeções" accentColor="#7C5CFF"/>
                <SelectableRow selected={cfg.canAnswer.includes('precos')} onToggle={() => toggleArr('canAnswer', 'precos')}
                  icon={<RowIcon color="linear-gradient(135deg,#F59E0B,#D97706)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></RowIcon>}
                  title="Preços" sublabel="Tabela de valores" accentColor="#7C5CFF"/>
                <SelectableRow selected={false} onToggle={() => {}} locked
                  icon={<RowIcon color="#EEF0F4"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A9B0BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></RowIcon>}
                  title="Confidencial" sublabel="Informações internas"/>
              </div>
            </GlassCard>
            <GlassCard className="p-5 flex flex-col gap-5">
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0A0E1A' }}>Nível de raciocínio</div>
              <div className="space-y-3">
                {(['rapido', 'completo'] as ReasoningLevel[]).map(level => (
                  <button key={level} onClick={() => update('reasoningLevel', level)}
                    className="flex items-center gap-3 w-full p-4 rounded-2xl text-left transition-all"
                    style={{
                      background: cfg.reasoningLevel === level ? 'rgba(124,92,255,.08)' : 'rgba(255,255,255,.6)',
                      border: `2px solid ${cfg.reasoningLevel === level ? '#7C5CFF' : 'rgba(255,255,255,.8)'}`,
                      outline: 'none',
                    }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: cfg.reasoningLevel === level ? 'linear-gradient(135deg,#7C5CFF,#5B3CF0)' : '#EEF0F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={cfg.reasoningLevel === level ? 'white' : '#8A93A3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {level === 'rapido' ? <><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></> : <><path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></>}
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#161B2A', textTransform: 'capitalize' }}>{level === 'rapido' ? 'Rápido' : 'Completo'}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#8A93A3' }}>
                        {level === 'rapido' && 'Responde em <2s, menor contexto'}
                        {level === 'completo' && 'Analisa contexto completo, 4–6s'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  )
}
