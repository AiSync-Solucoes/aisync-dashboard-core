// components/DashSidebar.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export type NavItem = {
  key:   string
  href:  string
  label: string
  icon:  React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  {
    key: 'hub', href: '/hub', label: 'Hub',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
      </svg>
    ),
  },
  {
    key: 'conversas', href: '/conversas', label: 'Conversas',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    key: 'relatorios', href: '/relatorios', label: 'Relatórios',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>
        <path d="M14 2v5h5"/><path d="M9 13h6M9 17h4"/>
      </svg>
    ),
  },
  {
    key: 'metricas', href: '/metricas', label: 'Métricas',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l6-6 4 4 7-7"/><path d="M14 7h7v7"/>
      </svg>
    ),
  },
  {
    key: 'sessoes', href: '/sessoes', label: 'Sessões',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>
      </svg>
    ),
  },
  {
    key: 'cargos', href: '/cargos', label: 'Cargos',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <path d="M8 12h8"/>
      </svg>
    ),
  },
  {
    key: 'configuracoes', href: '/configuracoes', label: 'Config',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7h-9"/><path d="M14 17H5"/>
        <circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>
      </svg>
    ),
  },
]

interface DashSidebarProps {
  managerName?:  string
  companyName?:  string
  extraItems?:   NavItem[]
}

export default function DashSidebar({
  managerName = 'Lucas',
  companyName = 'Retenlins',
  extraItems  = [],
}: DashSidebarProps) {
  const pathname = usePathname()
  const initial  = (managerName.trim()[0] ?? 'L').toUpperCase()
  const allItems = extraItems.length > 0 ? [...NAV_ITEMS, ...extraItems] : NAV_ITEMS

  return (
    <aside
      className="flex flex-col items-center h-full flex-shrink-0"
      style={{
        width: 100,
        padding: '26px 12px',
        background: '#0A0E1A',
        borderRight: '1px solid rgba(255,255,255,.08)',
      }}
    >
      {/* Logo */}
      <Link href="/hub" className="block mb-8 flex-shrink-0">
        <Image src="/aisync-symbol-blue.svg" alt="AiSync" width={34} height={34} priority />
      </Link>

      {/* Nav items */}
      <nav className="flex flex-col gap-[7px] w-full items-center flex-1">
        {allItems.map(item => {
          const active = pathname.startsWith(item.href)
          return (
            <Link
              key={item.key}
              href={item.href}
              title={item.label}
              className="flex flex-col items-center gap-[5px] no-underline transition-all"
              style={{
                width: 74,
                padding: '9px 0 7px',
                borderRadius: 16,
                color:      active ? '#fff'        : 'rgba(255,255,255,.38)',
                background: active ? 'linear-gradient(135deg,#1A4BFF,#3E63FF)' : 'transparent',
                boxShadow:  active ? '0 8px 20px rgba(26,75,255,.4)' : 'none',
              }}
            >
              {item.icon}
              <span style={{ fontSize: 10.5, fontWeight: 800 }}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Manager avatar */}
      <div
        title={`${managerName} · ${companyName}`}
        className="flex items-center justify-center text-white font-extrabold select-none"
        style={{
          width: 46, height: 46, borderRadius: 15,
          background: 'linear-gradient(135deg,#1A4BFF,#4C6BFF)',
          fontSize: 17,
          boxShadow: '0 6px 16px rgba(26,75,255,.32)',
        }}
      >
        {initial}
      </div>
    </aside>
  )
}
