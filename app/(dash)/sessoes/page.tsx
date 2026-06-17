// app/(dash)/sessoes/page.tsx
'use client'
import { useState } from 'react'
import GlassCard from '@/components/GlassCard'
import Avatar from '@/components/Avatar'
import QrModal from '@/components/QrModal'
import { MOCK_SESSIONS } from '@/lib/mock-data'
import type { WaSession, WaSessionStatus } from '@/lib/types'

function statusLabel(s: WaSessionStatus) {
  return s === 'connected' ? 'Online' : s === 'disconnected' ? 'Offline' : s === 'pending_qr' ? 'Aguardando QR' : 'Erro'
}
function statusColor(s: WaSessionStatus) {
  return s === 'connected' ? '#00A86B' : s === 'disconnected' ? '#DC2626' : '#F59E0B'
}

function formatActivity(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('pt-BR', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })
}

export default function SessoesPage() {
  const [sessions, setSessions] = useState<WaSession[]>(MOCK_SESSIONS)
  const [qrId, setQrId]         = useState<string | null>(null)
  const [discId, setDiscId]     = useState<string | null>(null)

  const online  = sessions.filter(s => s.status === 'connected').length
  const total   = sessions.length

  const confirmQr = () => {
    if (!qrId) return
    setSessions(ss => ss.map(s => s.id === qrId ? { ...s, status: 'connected' } : s))
    setQrId(null)
  }
  const confirmDisc = () => {
    if (!discId) return
    setSessions(ss => ss.map(s => s.id === discId ? { ...s, status: 'disconnected', providerInstanceId: null } : s))
    setDiscId(null)
  }

  const qrSession   = sessions.find(s => s.id === qrId)
  const discSession = sessions.find(s => s.id === discId)

  return (
    <div className="flex flex-col h-full p-[28px_34px] overflow-hidden gap-5">

      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0A0E1A', letterSpacing: '-0.015em' }}>Sessões de WhatsApp</h1>
          <p style={{ fontSize: 13.5, fontWeight: 600, color: '#8A93A3', marginTop: 3 }}>
            <span style={{ color: '#00855A', fontWeight: 800 }}>{online}</span>/{total} conectados
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-3 rounded-2xl text-[14px] font-extrabold text-white"
          style={{ background: 'linear-gradient(135deg,#1A4BFF,#3E63FF)', boxShadow: '0 6px 16px rgba(26,75,255,.32)' }}
          onClick={() => alert('Conectar novo — integrará com API de criação de sessão')}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Conectar novo
        </button>
      </div>

      {/* Grid de cards */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 pb-2">
          {sessions.map(s => (
            <GlassCard key={s.id} className="flex items-center gap-4 p-5">
              <Avatar initials={s.initials} gradient={s.avatarGradient} size={52} showDot={s.status === 'connected'} />
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: 15, fontWeight: 800, color: '#161B2A' }}>{s.sellerName}</div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: '#8A93A3' }}>{s.cargo}</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="w-[8px] h-[8px] rounded-full flex-shrink-0" style={{ background: statusColor(s.status) }} />
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: statusColor(s.status) }}>{statusLabel(s.status)}</span>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#A9B0BD', marginTop: 3, fontFamily: 'var(--font-mono)', letterSpacing: '.06em' }}>
                  {formatActivity(s.lastActivityAt)}
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                {s.status === 'connected' ? (
                  <button
                    onClick={() => setDiscId(s.id)}
                    className="px-4 py-2 rounded-2xl text-[13px] font-extrabold"
                    style={{ background: 'rgba(220,38,38,.1)', color: '#B91C1C', border: '1px solid rgba(220,38,38,.2)' }}>
                    Desconectar
                  </button>
                ) : (
                  <button
                    onClick={() => setQrId(s.id)}
                    className="px-4 py-2 rounded-2xl text-[13px] font-extrabold text-white"
                    style={{ background: 'linear-gradient(135deg,#0FB6A8,#0B8E84)' }}>
                    Reconectar
                  </button>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* QR Modal */}
      {qrSession && (
        <QrModal
          instanceName={qrSession.sellerName}
          onConnected={confirmQr}
          onClose={() => setQrId(null)}
        />
      )}

      {/* Confirmação de desconexão */}
      {discSession && discId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(10,14,26,.45)', backdropFilter: 'blur(4px)' }}>
          <div className="glass p-8 w-[400px] text-center" style={{ borderRadius: 24 }}>
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-4"
              style={{ background: 'rgba(220,38,38,.12)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 2H8L2 8v8l6 6h8l6-6V8z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0A0E1A' }}>Desconectar WhatsApp?</h3>
            <p style={{ fontSize: 13.5, fontWeight: 500, color: '#3F4859', marginTop: 8 }}>
              <strong>{discSession.sellerName}</strong> ficará offline até reconectar o QR code.
            </p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDiscId(null)}
                className="flex-1 py-3 rounded-2xl font-extrabold text-[14px] text-ink-400"
                style={{ background: 'rgba(238,240,244,.7)' }}>
                Cancelar
              </button>
              <button onClick={confirmDisc}
                className="flex-1 py-3 rounded-2xl font-extrabold text-[14px] text-white"
                style={{ background: 'linear-gradient(135deg,#DC2626,#B91C1C)' }}>
                Desconectar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
