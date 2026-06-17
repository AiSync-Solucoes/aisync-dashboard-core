// lib/types.ts

// ── Agentes ────────────────────────────────────────────────────────────────────
export type AgentKey = 'monitoramento' | 'relatorios' | 'assistencia' | 'treinamento'

export interface AgentConfig {
  key:     AgentKey
  label:   string
  color:   string        // CSS hex sólido
  gradient: string       // CSS linear-gradient
  shadow:  string        // CSS box-shadow (opacidade da cor)
  bgTint:  string        // rgba() para background de tile
  border:  string        // rgba() para border de tile
}

export const AGENTS: AgentConfig[] = [
  {
    key:      'monitoramento',
    label:    'Monitoramento',
    color:    '#1A4BFF',
    gradient: 'linear-gradient(135deg,#1A4BFF,#4C6BFF)',
    shadow:   '0 6px 16px rgba(26,75,255,.32)',
    bgTint:   'rgba(26,75,255,.07)',
    border:   'rgba(26,75,255,.16)',
  },
  {
    key:      'relatorios',
    label:    'Relatórios',
    color:    '#0FB6A8',
    gradient: 'linear-gradient(135deg,#13C2B3,#0B8E84)',
    shadow:   '0 6px 16px rgba(11,142,132,.3)',
    bgTint:   'rgba(15,182,168,.08)',
    border:   'rgba(15,182,168,.18)',
  },
  {
    key:      'assistencia',
    label:    'Assistência',
    color:    '#7C5CFF',
    gradient: 'linear-gradient(135deg,#7C5CFF,#5B3CF0)',
    shadow:   '0 6px 16px rgba(124,92,255,.28)',
    bgTint:   'rgba(124,92,255,.07)',
    border:   'rgba(124,92,255,.16)',
  },
  {
    key:      'treinamento',
    label:    'Treinamento',
    color:    '#F59E0B',
    gradient: 'linear-gradient(135deg,#FBBF24,#F59E0B)',
    shadow:   '0 6px 16px rgba(245,158,11,.32)',
    bgTint:   'rgba(245,158,11,.08)',
    border:   'rgba(245,158,11,.18)',
  },
]

// ── Sessões WA ─────────────────────────────────────────────────────────────────
export type WaSessionStatus = 'connected' | 'disconnected' | 'pending_qr' | 'error'

export interface WaSession {
  id:                 string
  sellerName:         string
  cargo:              string
  initials:           string
  avatarGradient:     string   // CSS gradient
  status:             WaSessionStatus
  phoneNumber:        string
  lastActivityAt:     string   // ISO date-time
  providerInstanceId: string | null
}

// ── Conversas ─────────────────────────────────────────────────────────────────
export type AlertType = 'opportunity' | 'risk' | 'personal' | null

export interface Message {
  id:        string
  fromMe:    boolean   // true = vendedor enviou, false = contato enviou
  content:   string
  sentAt:    string    // HH:mm
}

export interface Contact {
  id:          string
  name:        string
  phone:       string
  initials:    string
  avatarColor: string
  category:    'Comercial' | 'Lead' | 'Pessoal'
  relationship?: string
  lastOrder?:    string
  ticket?:       string
}

export interface SellerThread {
  id:           string
  sellerName:   string
  sellerInitials: string
  sellerGradient: string
  cargo:        string
  isOnline:     boolean
  alertLevel:   'red' | 'yellow' | 'green'
  lastMessage:  string
  lastAt:       string
  contact:      Contact
  alertType:    AlertType
  alertText:    string | null
  messages:     Message[]
}

// ── Métricas ───────────────────────────────────────────────────────────────────
export type MetricPeriod = 'hoje' | 'semana' | 'mes'

export interface KpiCard {
  label:     string
  value:     string
  delta?:    string      // ex: "+18%"
  deltaUp?:  boolean
}

export interface SellerMetric {
  name:            string
  initials:        string
  avatarGradient:  string
  conversations:   number
  commercialPct:   number   // 0–100
  avgResponseMin:  number
  score:           number   // 0–10
  scoreDelta:      'up' | 'down' | 'same'
}

// ── Relatórios ────────────────────────────────────────────────────────────────
export type ReportTab = 'gestor' | 'funcionario'

export interface ReportEntry {
  id:           string
  sellerName:   string
  sellerInitials: string
  sellerGradient: string
  date:         string   // ex: "16 Jun"
  score:        number   // 0–10
  highlights:   string[]
  opportunities: string[]
  alerts:       string[]
  kpis: {
    conversations: number
    commercialPct: number
    avgResponseMin: number
    coaching: number
  }
}

// ── Configurações / Onboarding ────────────────────────────────────────────────
export type DeliveryTime  = 'manha' | 'noite'
export type InterventionMode = 'conservador' | 'ativo' | 'reativo'
export type ReasoningLevel   = 'rapido' | 'completo'

export interface AgentSettings {
  // Relatórios
  deliveryTime:     DeliveryTime
  managerSections:  ('produtividade' | 'clientes' | 'followup' | 'suspeitas')[]
  sellerSections:   ('ranking' | 'perdas' | 'linguagem' | 'pontos')[]
  toneRelatorio:    number   // 0–100 (técnico → amigável)
  // Treinamento
  interventionMode: InterventionMode
  toneTreinamento:  number   // 0–100
  // Assistência
  canAnswer:        ('produtos' | 'historico' | 'playbook' | 'precos')[]
  reasoningLevel:   ReasoningLevel
}

export interface OnboardingEmployee {
  id:       string
  name:     string
  cargo:    string
  initials: string
  gradient: string
  status:   'connected' | 'waiting' | 'offline'
}
