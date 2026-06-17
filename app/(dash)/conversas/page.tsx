// app/(dash)/conversas/page.tsx
'use client'
import { useState } from 'react'
import GlassCard from '@/components/GlassCard'
import Avatar from '@/components/Avatar'
import { MOCK_THREADS } from '@/lib/mock-data'
import type { SellerThread } from '@/lib/types'

const ALERT_COLORS = {
  red:    { bg: 'rgba(220,38,38,.09)',  border: 'rgba(220,38,38,.22)',  icon: '#DC2626', text: '#B91C1C', chip: '#DC2626' },
  yellow: { bg: 'rgba(245,158,11,.1)',  border: 'rgba(245,158,11,.24)', icon: '#D97706', text: '#92560B', chip: '#B45309' },
}

const ALERT_DOT = { red: '#DC2626', yellow: '#F59E0B', green: '#00A86B' }
const ALERT_LABEL = { opportunity: 'OPORTUNIDADE DE UPSELL', risk: 'RISCO DE PERDA', personal: 'CONVERSA PESSOAL' }
const CATEGORY_STYLE = {
  Comercial: { bg: 'rgba(26,75,255,.12)', color: '#1A4BFF' },
  Lead:      { bg: 'rgba(15,182,168,.14)', color: '#0B8E84' },
  Pessoal:   { bg: 'rgba(124,92,255,.13)', color: '#5B3CF0' },
}

function AlertBanner({ thread }: { thread: SellerThread }) {
  if (!thread.alertText || thread.alertType === null) return null
  const type = thread.alertLevel === 'red' ? 'red' : thread.alertLevel === 'yellow' ? 'yellow' : null
  if (!type) return null
  const c = ALERT_COLORS[type]

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl flex-shrink-0"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <span className="flex items-center justify-center flex-shrink-0 rounded-xl"
        style={{ width: 34, height: 34, background: type === 'yellow' ? 'linear-gradient(135deg,#FBBF24,#F59E0B)' : 'linear-gradient(135deg,#F87171,#DC2626)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2 3 14h9l-1 8 10-12h-9z"/>
        </svg>
      </span>
      <div className="flex-1 min-w-0">
        <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '.1em', color: c.chip, fontFamily: 'var(--font-mono)' }}>
          {thread.alertType ? ALERT_LABEL[thread.alertType] : ''}
        </div>
        <div className="text-[13px] font-semibold mt-0.5" style={{ color: c.text }}>{thread.alertText}</div>
      </div>
      <button className="flex-shrink-0 px-4 py-2 rounded-xl text-[13px] font-extrabold text-white"
        style={{ background: type === 'yellow' ? 'linear-gradient(135deg,#FBBF24,#F59E0B)' : 'linear-gradient(135deg,#F87171,#DC2626)' }}>
        Orientar
      </button>
    </div>
  )
}

export default function ConversasPage() {
  const [selectedId, setSelectedId] = useState<string>(MOCK_THREADS[0]?.id ?? '')
  const [query, setQuery] = useState('')
  const thread = MOCK_THREADS.find(t => t.id === selectedId) ?? MOCK_THREADS[0]

  const activeCount = MOCK_THREADS.filter(t => t.isOnline).length
  const filtered = MOCK_THREADS.filter(t => t.sellerName.toLowerCase().includes(query.toLowerCase()))
  const cat = CATEGORY_STYLE[thread.contact.category]

  return (
    <div className="flex h-full gap-4 p-[22px_24px] overflow-hidden">

      {/* ── Lista de funcionários ── */}
      <GlassCard className="flex flex-col flex-shrink-0 overflow-hidden p-0" style={{ width: 318 }}>
        <div className="px-5 pt-5 pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 style={{ fontSize: 21, fontWeight: 800, color: '#0A0E1A', letterSpacing: '-0.01em' }}>Conversas</h2>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,168,107,.12)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-success live-pulse" />
              <span style={{ fontSize: 11.5, fontWeight: 800, color: '#00855A' }}>{activeCount} ativos</span>
            </div>
          </div>
          <p style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3', marginTop: 2 }}>{MOCK_THREADS.length} funcionários monitorados</p>

          {/* Search */}
          <div className="flex items-center gap-2 mt-4 px-3 py-2.5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,.7)', border: '1px solid rgba(221,225,232,.7)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A9B0BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar funcionário..."
              className="flex-1 bg-transparent outline-none text-[13px] font-semibold text-ink-800 placeholder:text-ink-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
          {filtered.map(t => {
            const active = selectedId === t.id
            return (
              <button
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className="flex items-center gap-3 w-full px-3 py-3 rounded-2xl text-left transition-all"
                style={{
                  background: active ? '#fff' : 'transparent',
                  boxShadow: active ? '0 6px 18px rgba(20,40,90,.10)' : 'none',
                  outline: 'none',
                }}
              >
                <Avatar initials={t.sellerInitials} gradient={t.sellerGradient} size={42} showDot={t.isOnline} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span style={{ fontSize: 13.5, fontWeight: 800, color: '#161B2A' }}>{t.sellerName}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#A9B0BD', flexShrink: 0 }}>{t.lastAt}</span>
                  </div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: '#8A93A3' }}>{t.cargo}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-[7px] h-[7px] rounded-full flex-shrink-0" style={{ background: ALERT_DOT[t.alertLevel] }} />
                    <span className="truncate" style={{ fontSize: 12, fontWeight: 500, color: '#3F4859' }}>{t.lastMessage}</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </GlassCard>

      {/* ── Thread de mensagens ── */}
      <GlassCard className="flex flex-col flex-1 min-w-0 overflow-hidden p-0">
        {/* Thread header */}
        <div className="flex items-center gap-3 px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(221,225,232,.5)' }}>
          <Avatar initials={thread.contact.initials} gradient={thread.sellerGradient} size={40} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 16, fontWeight: 800, color: '#0A0E1A' }}>{thread.contact.name}</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold" style={{ background: cat.bg, color: cat.color }}>
                {thread.contact.category}
              </span>
            </div>
            <div className="flex items-center gap-1.5" style={{ fontSize: 12, fontWeight: 600, color: '#8A93A3' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              via {thread.sellerName}
            </div>
          </div>
          <button className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{ width: 36, height: 36, background: 'rgba(255,255,255,.7)', border: '1px solid rgba(221,225,232,.6)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A93A3" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
            </svg>
          </button>
        </div>

        {/* Alert + Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          <AlertBanner thread={thread} />
          {/* divisor "Hoje" */}
          <div className="flex justify-center my-1">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: 'rgba(255,255,255,.7)', color: '#8A93A3' }}>Hoje</span>
          </div>
          {thread.messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[68%] px-4 py-2.5 text-[13.5px] font-medium leading-snug"
                style={{
                  background: msg.fromMe ? '#D8F3EE' : '#fff',
                  color: '#161B2A',
                  boxShadow: '0 1px 4px rgba(0,0,0,.05)',
                  borderRadius: msg.fromMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                }}
              >
                {msg.content}
                <div className="text-[10.5px] font-semibold mt-1 text-right" style={{ color: '#A9B0BD' }}>{msg.sentAt}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer — modo monitoramento */}
        <div className="flex items-center justify-between px-5 py-3.5 flex-shrink-0" style={{ borderTop: '1px solid rgba(221,225,232,.5)' }}>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A93A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3' }}>Modo monitoramento · somente leitura</span>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[13px] font-extrabold text-white"
            style={{ background: 'linear-gradient(135deg,#FBBF24,#F59E0B)', boxShadow: '0 6px 16px rgba(245,158,11,.32)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            Enviar dica ao vendedor
          </button>
        </div>
      </GlassCard>

      {/* ── Ficha do contato ── */}
      <GlassCard className="flex flex-col flex-shrink-0 overflow-y-auto p-5" style={{ width: 290 }}>
        <div className="flex flex-col items-center text-center mb-5">
          <Avatar initials={thread.contact.initials} gradient={thread.sellerGradient}
            size={76} fontSize={26} className="mb-3" />
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0A0E1A' }}>{thread.contact.name}</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3', marginTop: 3 }}>{thread.contact.phone}</div>
          <span className="mt-2.5 flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-extrabold"
            style={{ background: cat.bg, color: cat.color }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color }} />
            {thread.contact.category}
          </span>
        </div>

        {/* Label-value rows */}
        <div className="space-y-3 pb-4" style={{ borderBottom: '1px solid rgba(221,225,232,.6)' }}>
          <div className="flex items-center justify-between gap-3">
            <span style={{ fontSize: 13, fontWeight: 600, color: '#8A93A3' }}>Relacionamento</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#161B2A', textAlign: 'right' }}>{thread.contact.relationship ?? '—'}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span style={{ fontSize: 13, fontWeight: 600, color: '#8A93A3' }}>Último pedido</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#161B2A', textAlign: 'right' }}>{thread.contact.lastOrder ?? '—'}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span style={{ fontSize: 13, fontWeight: 600, color: '#8A93A3' }}>Ticket médio</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#161B2A', textAlign: 'right' }}>{thread.contact.ticket ?? '—'}</span>
          </div>
        </div>

        {/* Histórico timeline */}
        {thread.contact.history && thread.contact.history.length > 0 && (
          <div className="pt-4">
            <div style={{ fontSize: 11, fontWeight: 700, color: '#8A93A3', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>HISTÓRICO</div>
            <div className="space-y-3">
              {thread.contact.history.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: h.color }} />
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: '#3F4859', lineHeight: 1.35 }}>{h.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  )
}
