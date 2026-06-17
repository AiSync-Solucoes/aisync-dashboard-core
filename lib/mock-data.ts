// lib/mock-data.ts
import type {
  WaSession, SellerThread, SellerMetric, ReportEntry, OnboardingEmployee,
} from './types'

// ── Sessões ───────────────────────────────────────────────────────────────────
export const MOCK_SESSIONS: WaSession[] = [
  { id:'s1', sellerName:'Bruno Costa',    cargo:'Vendedor',  initials:'BC', avatarGradient:'linear-gradient(135deg,#1A4BFF,#4C6BFF)', status:'connected',    phoneNumber:'+55 27 99983-0102', lastActivityAt:'2026-06-17T08:42:00Z', providerInstanceId:'retenlins-bc' },
  { id:'s2', sellerName:'Carla Lima',     cargo:'Vendedora', initials:'CL', avatarGradient:'linear-gradient(135deg,#0FB6A8,#0B8E84)', status:'connected',    phoneNumber:'+55 27 99812-3344', lastActivityAt:'2026-06-17T08:39:00Z', providerInstanceId:'retenlins-cl' },
  { id:'s3', sellerName:'Daniel Araujo', cargo:'Vendedor',  initials:'DA', avatarGradient:'linear-gradient(135deg,#7C5CFF,#5B3CF0)', status:'connected',    phoneNumber:'+55 27 98877-5566', lastActivityAt:'2026-06-17T08:35:00Z', providerInstanceId:'retenlins-da' },
  { id:'s4', sellerName:'Ana Silva',     cargo:'Vendedora', initials:'AS', avatarGradient:'linear-gradient(135deg,#F59E0B,#D97706)', status:'connected',    phoneNumber:'+55 27 99001-2233', lastActivityAt:'2026-06-17T07:55:00Z', providerInstanceId:'retenlins-as' },
  { id:'s5', sellerName:'Fábio Torres',  cargo:'Vendedor',  initials:'FT', avatarGradient:'linear-gradient(135deg,#1A4BFF,#4C6BFF)', status:'connected',    phoneNumber:'+55 27 99223-4455', lastActivityAt:'2026-06-17T08:10:00Z', providerInstanceId:'retenlins-ft' },
  { id:'s6', sellerName:'Gabi Rocha',    cargo:'Vendedora', initials:'GR', avatarGradient:'linear-gradient(135deg,#0FB6A8,#0B8E84)', status:'connected',    phoneNumber:'+55 27 98800-9988', lastActivityAt:'2026-06-17T07:30:00Z', providerInstanceId:'retenlins-gr' },
  { id:'s7', sellerName:'Hugo Melo',     cargo:'Vendedor',  initials:'HM', avatarGradient:'linear-gradient(135deg,#7C5CFF,#5B3CF0)', status:'connected',    phoneNumber:'+55 27 99445-6677', lastActivityAt:'2026-06-17T06:50:00Z', providerInstanceId:'retenlins-hm' },
  { id:'s8', sellerName:'Inês Castro',   cargo:'Vendedora', initials:'IC', avatarGradient:'linear-gradient(135deg,#F59E0B,#D97706)', status:'connected',    phoneNumber:'+55 27 98660-1122', lastActivityAt:'2026-06-17T08:28:00Z', providerInstanceId:'retenlins-ic' },
  { id:'s9', sellerName:'João Pires',    cargo:'Vendedor',  initials:'JP', avatarGradient:'linear-gradient(135deg,#1A4BFF,#4C6BFF)', status:'disconnected', phoneNumber:'+55 27 99778-3344', lastActivityAt:'2026-06-16T17:00:00Z', providerInstanceId:null },
  { id:'s10',sellerName:'Karen Freitas', cargo:'Vendedora', initials:'KF', avatarGradient:'linear-gradient(135deg,#0FB6A8,#0B8E84)', status:'disconnected', phoneNumber:'+55 27 98990-5566', lastActivityAt:'2026-06-16T16:30:00Z', providerInstanceId:null },
]

// ── Conversas ─────────────────────────────────────────────────────────────────
export const MOCK_THREADS: SellerThread[] = [
  {
    id:'t1', sellerName:'Bruno Costa', sellerInitials:'BC',
    sellerGradient:'linear-gradient(135deg,#1A4BFF,#4C6BFF)',
    cargo:'Vendedor', isOnline:true, alertLevel:'red',
    lastMessage:'Posso fazer 15% de desconto nesse lote.', lastAt:'08:42',
    contact:{ id:'c1', name:'Roberto Mendes', phone:'27 99123-4567',
      initials:'RM', avatarColor:'#E8EDF8', category:'Comercial',
      relationship:'Cliente desde 2023', lastOrder:'Mai 2026', ticket:'R$ 18.400' },
    alertType:'opportunity',
    alertText:'Oportunidade de upsell detectada — cliente perguntou sobre plano maior',
    messages:[
      { id:'m1', fromMe:false, content:'Oi Bruno, queria ver uma opção de compra maior dessa vez', sentAt:'08:38' },
      { id:'m2', fromMe:true,  content:'Claro Roberto! Posso montar uma proposta personalizada. Qual volume tá em mente?', sentAt:'08:39' },
      { id:'m3', fromMe:false, content:'Pensando em umas 200 unidades. Tem desconto progressivo?', sentAt:'08:40' },
      { id:'m4', fromMe:true,  content:'Posso fazer 15% de desconto nesse lote.', sentAt:'08:42' },
    ],
  },
  {
    id:'t2', sellerName:'Carla Lima', sellerInitials:'CL',
    sellerGradient:'linear-gradient(135deg,#0FB6A8,#0B8E84)',
    cargo:'Vendedora', isOnline:true, alertLevel:'yellow',
    lastMessage:'Vou verificar e te retorno amanhã, pode ser?', lastAt:'08:39',
    contact:{ id:'c2', name:'Fernanda Souza', phone:'27 99234-5678',
      initials:'FS', avatarColor:'#E8F5F4', category:'Lead',
      relationship:'Primeiro contato', lastOrder:undefined, ticket:undefined },
    alertType:'risk',
    alertText:'Lead pode estar perdendo interesse — sem resposta há 40min',
    messages:[
      { id:'m5', fromMe:false, content:'Boa tarde! Vi o anúncio de vocês e fiquei interessada', sentAt:'07:55' },
      { id:'m6', fromMe:true,  content:'Oi Fernanda! Que ótimo. Posso te contar mais sobre nossos planos?', sentAt:'08:00' },
      { id:'m7', fromMe:false, content:'Sim! Mas preciso saber antes se tem contrato mínimo', sentAt:'08:02' },
      { id:'m8', fromMe:true,  content:'Vou verificar e te retorno amanhã, pode ser?', sentAt:'08:39' },
    ],
  },
  {
    id:'t3', sellerName:'Daniel Araujo', sellerInitials:'DA',
    sellerGradient:'linear-gradient(135deg,#7C5CFF,#5B3CF0)',
    cargo:'Vendedor', isOnline:true, alertLevel:'green',
    lastMessage:'Tô bem sim! Obrigado por perguntar 😊', lastAt:'08:35',
    contact:{ id:'c3', name:'Paula Gomes', phone:'27 99345-6789',
      initials:'PG', avatarColor:'#EEE8F8', category:'Pessoal',
      relationship:'Colega pessoal', lastOrder:undefined, ticket:undefined },
    alertType:'personal',
    alertText:'Conversa pessoal detectada — não monitorar conteúdo',
    messages:[
      { id:'m9',  fromMe:false, content:'Oi Daniel! Tudo bem com você?', sentAt:'08:33' },
      { id:'m10', fromMe:true,  content:'Oi Paula! Tô bem sim! Obrigado por perguntar 😊', sentAt:'08:35' },
    ],
  },
  {
    id:'t4', sellerName:'Ana Silva', sellerInitials:'AS',
    sellerGradient:'linear-gradient(135deg,#F59E0B,#D97706)',
    cargo:'Vendedora', isOnline:true, alertLevel:'green',
    lastMessage:'Perfeito! Confirmo o pedido então.', lastAt:'07:55',
    contact:{ id:'c4', name:'Marcos Lima', phone:'27 99456-7890',
      initials:'ML', avatarColor:'#FEF3E2', category:'Comercial',
      relationship:'Cliente recorrente', lastOrder:'Jun 2026', ticket:'R$ 7.200' },
    alertType:null, alertText:null,
    messages:[
      { id:'m11', fromMe:false, content:'Ana, vou fechar as 50 unidades que conversamos', sentAt:'07:52' },
      { id:'m12', fromMe:true,  content:'Perfeito! Confirmo o pedido então.', sentAt:'07:55' },
    ],
  },
]

// ── Métricas ──────────────────────────────────────────────────────────────────
export const MOCK_SELLER_METRICS: SellerMetric[] = [
  { name:'Bruno Costa',   initials:'BC', avatarGradient:'linear-gradient(135deg,#1A4BFF,#4C6BFF)', conversations:47, commercialPct:82, avgResponseMin:4,  score:9.2, scoreDelta:'up' },
  { name:'Ana Silva',     initials:'AS', avatarGradient:'linear-gradient(135deg,#F59E0B,#D97706)', conversations:41, commercialPct:76, avgResponseMin:6,  score:8.7, scoreDelta:'up' },
  { name:'Carla Lima',    initials:'CL', avatarGradient:'linear-gradient(135deg,#0FB6A8,#0B8E84)', conversations:38, commercialPct:71, avgResponseMin:9,  score:7.9, scoreDelta:'same' },
  { name:'Daniel Araujo', initials:'DA', avatarGradient:'linear-gradient(135deg,#7C5CFF,#5B3CF0)', conversations:33, commercialPct:58, avgResponseMin:12, score:7.1, scoreDelta:'down' },
  { name:'Fábio Torres',  initials:'FT', avatarGradient:'linear-gradient(135deg,#1A4BFF,#4C6BFF)', conversations:29, commercialPct:65, avgResponseMin:8,  score:7.4, scoreDelta:'up' },
  { name:'Gabi Rocha',    initials:'GR', avatarGradient:'linear-gradient(135deg,#0FB6A8,#0B8E84)', conversations:25, commercialPct:60, avgResponseMin:15, score:6.8, scoreDelta:'down' },
]

// ── Relatórios ────────────────────────────────────────────────────────────────
export const MOCK_REPORTS: ReportEntry[] = [
  {
    id:'r1', sellerName:'Bruno Costa', sellerInitials:'BC',
    sellerGradient:'linear-gradient(135deg,#1A4BFF,#4C6BFF)',
    date:'17 Jun', score:9.2,
    highlights:['Fechou 3 negócios acima da meta','Tom consultivo excelente','Resposta rápida (<4min)'],
    opportunities:['Explorar mais cross-sell em clientes de ticket médio'],
    alerts:[],
    kpis:{ conversations:47, commercialPct:82, avgResponseMin:4, coaching:3 },
  },
  {
    id:'r2', sellerName:'Carla Lima', sellerInitials:'CL',
    sellerGradient:'linear-gradient(135deg,#0FB6A8,#0B8E84)',
    date:'17 Jun', score:7.9,
    highlights:['Boa qualificação de leads','Linguagem empática'],
    opportunities:['Reduzir tempo de resposta no turno da tarde','Seguir mais o playbook de objeções'],
    alerts:['Lead sem resposta por 40min — risco de perda'],
    kpis:{ conversations:38, commercialPct:71, avgResponseMin:9, coaching:8 },
  },
  {
    id:'r3', sellerName:'Daniel Araujo', sellerInitials:'DA',
    sellerGradient:'linear-gradient(135deg,#7C5CFF,#5B3CF0)',
    date:'17 Jun', score:7.1,
    highlights:['Bom relacionamento com base ativa'],
    opportunities:['Aumentar foco em conversas comerciais','Evitar desvios para assuntos pessoais no horário pico'],
    alerts:['2 conversas pessoais no horário comercial'],
    kpis:{ conversations:33, commercialPct:58, avgResponseMin:12, coaching:12 },
  },
]

// ── Onboarding ────────────────────────────────────────────────────────────────
export const MOCK_ONBOARDING_EMPLOYEES: OnboardingEmployee[] = [
  { id:'e1', name:'Bruno Costa',    cargo:'Vendedor',  initials:'BC', gradient:'linear-gradient(135deg,#1A4BFF,#4C6BFF)', status:'connected' },
  { id:'e2', name:'Carla Lima',     cargo:'Vendedora', initials:'CL', gradient:'linear-gradient(135deg,#0FB6A8,#0B8E84)', status:'waiting' },
  { id:'e3', name:'Daniel Araujo', cargo:'Vendedor',  initials:'DA', gradient:'linear-gradient(135deg,#7C5CFF,#5B3CF0)', status:'offline' },
  { id:'e4', name:'Ana Silva',     cargo:'Vendedora', initials:'AS', gradient:'linear-gradient(135deg,#F59E0B,#D97706)', status:'offline' },
]
