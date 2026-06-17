// app/(dash)/layout.tsx
import DashSidebar from '@/components/DashSidebar'

export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ padding: 36 }}
    >
      {/* Frame */}
      <div
        className="relative flex-shrink-0 overflow-hidden w-full"
        style={{
          height: 'calc(100vh - 72px)',
          borderRadius: 34,
          background: '#EAEEF6',
          boxShadow: '0 50px 100px -34px rgba(18,38,84,.5), 0 10px 30px rgba(18,38,84,.12)',
          border: '1px solid rgba(255,255,255,.7)',
        }}
      >
        {/* Blobs de cor desfocados */}
        <div className="absolute inset-0 z-0" aria-hidden>
          <div
            className="absolute rounded-full float-blob"
            style={{
              top: -130, left: 60, width: 520, height: 520,
              background: 'radial-gradient(circle, rgba(26,75,255,.28), transparent 70%)',
              filter: 'blur(55px)',
              '--duration': '18s', '--delay': '0s',
            } as React.CSSProperties}
          />
          <div
            className="absolute rounded-full float-blob"
            style={{
              top: -90, right: -60, width: 500, height: 500,
              background: 'radial-gradient(circle, rgba(15,182,168,.3), transparent 70%)',
              filter: 'blur(55px)',
              '--duration': '20s', '--delay': '1.5s',
            } as React.CSSProperties}
          />
          <div
            className="absolute rounded-full float-blob"
            style={{
              bottom: -160, left: 200, width: 520, height: 520,
              background: 'radial-gradient(circle, rgba(124,92,255,.22), transparent 70%)',
              filter: 'blur(60px)',
              '--duration': '22s', '--delay': '2.5s',
            } as React.CSSProperties}
          />
          <div
            className="absolute rounded-full float-blob"
            style={{
              bottom: -120, right: 120, width: 420, height: 420,
              background: 'radial-gradient(circle, rgba(245,158,11,.18), transparent 70%)',
              filter: 'blur(55px)',
              '--duration': '16s', '--delay': '0.5s',
            } as React.CSSProperties}
          />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 flex h-full">
          <DashSidebar managerName="Lucas" companyName="Retenlins" />
          <main className="flex-1 min-w-0 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
