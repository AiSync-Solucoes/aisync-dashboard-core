// Components
export { default as AgentBadge } from './components/AgentBadge'
export { default as Avatar } from './components/Avatar'
export { default as DashSidebar } from './components/DashSidebar'
export { default as FilterBar } from './components/FilterBar'
export type { FilterControl, FilterOption, FilterValue, FilterValues, DateRange } from './components/FilterBar'
export { default as GlassCard } from './components/GlassCard'
export { default as QrModal } from './components/QrModal'
export { default as SegmentedControl } from './components/SegmentedControl'
export { default as SelectableRow } from './components/SelectableRow'
export { default as SelectableTile } from './components/SelectableTile'
export { default as Switch } from './components/Switch'
export { default as TomSlider } from './components/TomSlider'

// Config
export { defineConfig } from './lib/config'
export type { AiSyncConfig } from './lib/config'

// Types
export type {
  AgentKey,
  AgentConfig,
  WaSessionStatus,
  WaSession,
  AlertType,
  Message,
  Contact,
  SellerThread,
  MetricPeriod,
  KpiCard,
  SellerMetric,
  ReportTab,
  ReportEntry,
  DeliveryTime,
  InterventionMode,
  ReasoningLevel,
  AgentSettings,
  OnboardingEmployee,
} from './lib/types'
export { AGENTS } from './lib/types'
