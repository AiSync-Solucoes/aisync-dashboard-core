// components/QrModal.tsx
'use client'
import { useEffect } from 'react'

interface QrModalProps {
  instanceName: string          // nome do vendedor / instância
  onClose:      () => void
  onConnected:  () => void
}

export default function QrModal({ instanceName, onClose, onConnected }: QrModalProps) {
  // Fecha com ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(10,14,26,.38)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col text-center"
        onClick={e => e.stopPropagation()}
        style={{
          width: 360,
          background: 'rgba(255,255,255,.92)',
          backdropFilter: 'blur(24px) saturate(160%)',
          borderRadius: 28,
          border: '1.5px solid rgba(255,255,255,.9)',
          boxShadow: '0 40px 80px -20px rgba(18,38,84,.32)',
          padding: '28px 28px 24px',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center rounded-full"
          style={{ width: 30, height: 30, background: 'rgba(238,240,244,.8)' }}
          aria-label="Fechar"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A93A3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        <h3 className="text-[18px] font-extrabold text-ink-900">Conectar WhatsApp</h3>
        <p className="text-[13.5px] text-ink-400 font-semibold mt-1">
          Peça para <strong className="text-ink-800">{instanceName}</strong> escanear o código
        </p>

        {/* QR placeholder */}
        <div
          className="mx-auto my-5 flex items-center justify-center rounded-2xl bg-ink-100"
          style={{ width: 200, height: 200 }}
        >
          <svg
            className="text-ink-400"
            style={{ animation: 'spin 1.4s linear infinite' }}
            width="36" height="36" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
        </div>

        <p className="text-[12px] text-ink-400 font-semibold leading-snug px-2">
          Abra o WhatsApp → Dispositivos vinculados → Vincular dispositivo
        </p>

        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={onConnected}
            className="w-full py-3 rounded-2xl font-extrabold text-[14px] text-white"
            style={{ background: 'linear-gradient(135deg,#0FB6A8,#0B8E84)' }}
          >
            Já escaneei ✓
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl font-extrabold text-[13.5px] text-ink-400"
            style={{ background: 'rgba(238,240,244,.7)' }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
