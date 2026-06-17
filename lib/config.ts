export interface AiSyncConfig {
  brandName?: string
  logoPath?: string
  agents?: {
    monitoramento?: boolean
    relatorios?: boolean
    assistencia?: boolean
    treinamento?: boolean
  }
}

const defaults: Required<AiSyncConfig> = {
  brandName: 'AiSync',
  logoPath: '/aisync-symbol-blue.svg',
  agents: {
    monitoramento: true,
    relatorios: true,
    assistencia: true,
    treinamento: true,
  },
}

export function defineConfig(config: AiSyncConfig): Required<AiSyncConfig> {
  return {
    ...defaults,
    ...config,
    agents: { ...defaults.agents, ...config.agents },
  }
}
