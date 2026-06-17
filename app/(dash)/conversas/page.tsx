// app/(dash)/conversas/page.tsx
'use client'
import { useState } from 'react'
import Avatar from '@/components/Avatar'
import { MOCK_THREADS } from '@/lib/mock-data'
import type { SellerThread } from '@/lib/types'

const ALERT_COLORS = {
  red:    { bg: 'rgba(220,38,38,.1)',  border: 'rgba(220,38,38,.25)',  icon: '#DC2626', text: '#B91C1C' },
  yellow: { bg: 'rgba(245,158,11,.1)', border: 'rgba(245,158,11,.25)', icon: '#D97706', text: '#92560B' },
  green:  { bg: 'rgba(0,168,107,.1)',  border: 'rgba(0,168,107,.25)',  icon: '#00A86B', text: '#00855A' },
}

const ALERT_DOT = { red: '#DC2626', yellow: '#F59E0B', green: '#00A86B' }

function AlertBanner({ thread }: { thread: SellerThread }) {
  if (!thread.alertText || thread.alertType === null) return null
  const type = thread.alertLevel === 'red' ? 'red' : thread.alertLevel === 'yellow' ? 'yellow' : null
  if (!type) return null
  const c = ALERT_COLORS[type]

  const icons = {
    opportunity: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9z"/>
      </svg>
    ),
    risk: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <path d="M12 9v4m0 4h.01"/>
      </svg>
    ),
    personal: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
        <line x1="2" y1="2" x2="22" y2="22"/>
      </svg>
    ),
  }

  return (
    <div className="flex items-start gap-3 px-4 py-3 mx-5 rounded-2xl flex-shrink-0"
      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.icon }}>
      <span className="flex-shrink-0 mt-0.5">{icons[thread.alertType!] ?? icons.opportunity}</span>
      <span className="text-[13px] font-semibold flex-1" style={{ color: c.text }}>{thread.alertText}</span>
    </div>
  )
}

export default function ConversasPage() {
  const [selectedId, setSelectedId] = useState<string>(MOCK_THREADS[0]?.id ?? '')
  const thread = MOCK_THREADS.find(t => t.id === selectedId) ?? MOCK_THREADS[0]

  return (
    <div className="flex h-full overflow-hidden">

      {/* ── Lista de funcionários (300px) ── */}
      <aside className="flex flex-col overflow-y-auto flex-shrink-0"
        style={{ width: 300, borderRight: '1px solid rgba(255,255,255,.6)', background: 'rgba(255,255,255,.3)' }}>
        <div className="px-5 py-4 flex-shrink-0">
          <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0A0E1A' }}>Conversas ao vivo</h2>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#8A93A3', marginTop: 2 }}>{MOCK_THREADS.length} funcionários</p>
        </div>
        {MOCK_THREADS.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedId(t.id)}
            className="flex items-center gap-3 px-4 py-3 mx-2 rounded-2xl text-left transition-all"
            style={{
              background: selectedId === t.id ? 'rgba(26,75,255,.09)' : 'transparent',
              border: selectedId === t.id ? '1.5px solid rgba(26,75,255,.18)' : '1.5px solid transparent',
              outline: 'none',
            }}
          >
            <div className="relative flex-shrink-0">
              <Avatar initials={t.sellerInitials} gradient={t.sellerGradient} size={42} showDot={t.isOnline} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 13.5, fontWeight: 800, color: '#161B2A' }}>{t.sellerName}</span>
                <span className="w-[7px] h-[7px] rounded-full flex-shrink-0"
                  style={{ background: ALERT_DOT[t.alertLevel] }} />
              </div>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: '#8A93A3' }}>{t.cargo}</div>
              <div className="truncate" style={{ fontSize: 12, fontWeight: 500, color: '#3F4859', marginTop: 1 }}>{t.lastMessage}</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#A9B0BD', flexShrink: 0 }}>{t.lastAt}</div>
          </button>
        ))}
      </aside>

      {/* ── Thread de mensagens ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Thread header */}
        <div className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,.6)' }}>
          <Avatar initials={thread.contact.initials} gradient="linear-gradient(135deg,#EEF2FA,#E4E8F4)" size={40}
            style={{ color: '#3F4859' } as React.CSSProperties} />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 16, fontWeight: 800, color: '#0A0E1A' }}>{thread.contact.name}</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold"
                style={{
                  background: thread.contact.category === 'Comercial' ? 'rgba(26,75,255,.12)' : thread.contact.category === 'Lead' ? 'rgba(15,182,168,.12)' : 'rgba(138,147,163,.12)',
                  color: thread.contact.category === 'Comercial' ? '#1A4BFF' : thread.contact.category === 'Lead' ? '#0B8E84' : '#8A93A3',
                }}>
                {thread.contact.category}
              </span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#8A93A3' }}>via {thread.sellerName}</div>
          </div>
        </div>

        {/* Alert banner */}
        <div className="pt-3"><AlertBanner thread={thread} /></div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-2">
          {thread.messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[70%] px-4 py-2.5 rounded-2xl text-[13.5px] font-medium leading-snug"
                style={{
                  background: msg.fromMe ? '#D8F3EE' : '#fff',
                  color: '#161B2A',
                  boxShadow: '0 1px 4px rgba(0,0,0,.06)',
                  borderRadius: msg.fromMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                }}
              >
                {msg.content}
                <div className="text-[10.5px] font-semibold mt-1 text-right" style={{ color: '#8A93A3' }}>{msg.sentAt}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer — modo monitoramento */}
        <div className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,.6)', background: 'rgba(255,255,255,.4)' }}>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A93A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/><path d="M12 2a10 10 0 0 1 10 10M12 6a6 6 0 0 1 6 6"/>
            </svg>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3' }}>Modo monitoramento · somente leitura</span>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-2xl text-[13px] font-extrabold text-white"
            style={{ background: 'linear-gradient(135deg,#1A4BFF,#3E63FF)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2 3 14h9l-1 8 10-12h-9z"/>
            </svg>
            Enviar dica ao vendedor
          </button>
        </div>
      </div>

      {/* ── Ficha do contato (272px) ── */}
      <aside className="flex flex-col overflow-y-auto flex-shrink-0 px-5 py-4"
        style={{ width: 272, borderLeft: '1px solid rgba(255,255,255,.6)', background: 'rgba(255,255,255,.3)' }}>
        <div className="flex flex-col items-center text-center mb-5">
          <Avatar initials={thread.contact.initials} gradient="linear-gradient(135deg,#EEF2FA,#E4E8F4)"
            size={72} style={{ color: '#3F4859', fontSize: 24 } as React.CSSProperties} className="mb-3" />
          <div style={{ fontSize: 17, fontWeight: 800, color: '#0A0E1A' }}>{thread.contact.name}</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3', marginTop: 3 }}>{thread.contact.phone}</div>
          <span className="mt-2 px-3 py-1 rounded-full text-[12px] font-extrabold"
            style={{
              background: thread.contact.category === 'Comercial' ? 'rgba(26,75,255,.12)' : thread.contact.category === 'Lead' ? 'rgba(15,182,168,.12)' : 'rgba(138,147,163,.12)',
              color: thread.contact.category === 'Comercial' ? '#1A4BFF' : thread.contact.category === 'Lead' ? '#0B8E84' : '#8A93A3',
            }}>
            {thread.contact.category}
          </span>
        </div>

        {/* Meta info */}
        <div className="space-y-3">
          {thread.contact.relationship && (
            <div className="p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,.6)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#8A93A3', textTransform: 'uppercase', letterSpacing: '.1em', fontFamily: 'var(--font-mono)' }}>RELACIONAMENTO</div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#161B2A', marginTop: 3 }}>{thread.contact.relationship}</div>
            </div>
          )}
          {thread.contact.lastOrder && (
            <div className="p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,.6)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#8A93A3', textTransform: 'uppercase', letterSpacing: '.1em', fontFamily: 'var(--font-mono)' }}>ÚLTIMO PEDIDO</div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#161B2A', marginTop: 3 }}>{thread.contact.lastOrder}</div>
            </div>
          )}
          {thread.contact.ticket && (
            <div className="p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,.6)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#8A93A3', textTransform: 'uppercase', letterSpacing: '.1em', fontFamily: 'var(--font-mono)' }}>TICKET</div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#161B2A', marginTop: 3 }}>{thread.contact.ticket}</div>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
