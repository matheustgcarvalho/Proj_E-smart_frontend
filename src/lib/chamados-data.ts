import type { CityData } from './data';

export type TicketPriority = 'Baixa' | 'Média' | 'Alta' | 'Crítica';
export type TicketStatus = 'Aberto' | 'Pendente' | 'Em Andamento' | 'Resolvido' | 'Cancelado';
export type TicketStage = 'Triagem (Escritório)' | 'Solicitação (Prefeitura)' | 'Aprovação (Gestor)' | 'Validação (Escritório)' | 'Concluído';
export type ModuleOrigin = 'CAUC' | 'E-Parcerias' | 'Certidões' | 'Outros';

export interface TicketEvent {
  id: string;
  type: 'comment' | 'status_change' | 'attachment' | 'creation';
  author: string;
  timestamp: string;
  content: string;
}

export interface Ticket {
  id: string; // Protocolo ex: #2026-001
  title: string;
  description: string;
  cityId: string;
  module: ModuleOrigin;
  priority: TicketPriority;
  status: TicketStatus;
  stage: TicketStage;
  assignee: string; // Responsável atual
  createdAt: string;
  updatedAt: string;
  slaDueDate: string; // Data limite do SLA
  events: TicketEvent[];
  opener?: string; // Quem abriu o chamado
  attachments?: string[]; // Anexos
  closedAt?: string; // Data de fechamento
}

const MOCK_TICKETS: Ticket[] = [
  // EM ABERTO / ANDAMENTO
  {
    id: '#2026-001',
    title: 'Regularizar FGTS - Competência 12/2025',
    description: 'Consta pendência no CRF do FGTS referente à competência de dezembro de 2025. Necessário envio da GFIP.',
    cityId: 'fortaleza',
    module: 'CAUC',
    priority: 'Alta',
    status: 'Aberto',
    stage: 'Triagem (Escritório)',
    assignee: 'Matheus (Contador)',
    createdAt: '2026-01-20T10:00:00',
    updatedAt: '2026-01-20T10:30:00',
    slaDueDate: '2026-01-22T10:00:00',
    opener: 'Sistema',
    events: [
      { id: 'e1', type: 'creation', author: 'Sistema', timestamp: '2026-01-20T10:00:00', content: 'Chamado criado automaticamente via monitoramento CAUC.' },
      { id: 'e2', type: 'comment', author: 'Matheus', timestamp: '2026-01-20T10:30:00', content: 'Iniciando análise da documentação enviada.' }
    ]
  },
  {
    id: '#2026-002',
    title: 'Assinatura Aditivo Convênio 034/2024',
    description: 'O aditivo de prazo do convênio de pavimentação precisa ser assinado pelo Prefeito até sexta-feira.',
    cityId: 'caucaia',
    module: 'E-Parcerias',
    priority: 'Média',
    status: 'Pendente',
    stage: 'Solicitação (Prefeitura)',
    assignee: 'Gabinete Prefeito',
    createdAt: '2026-01-19T14:00:00',
    updatedAt: '2026-01-21T09:00:00',
    slaDueDate: '2026-01-23T18:00:00',
    opener: 'Ana (Engenharia)',
    events: [
      { id: 'e1', type: 'creation', author: 'Ana (Engenharia)', timestamp: '2026-01-19T14:00:00', content: 'Minuta de aditivo gerada.' }
    ]
  },
  {
    id: '#2026-003',
    title: 'Certidão Negativa Estadual Vencida',
    description: 'A CNE venceu hoje. Necessário emitir nova no site da SEFAZ.',
    cityId: 'fortaleza',
    module: 'Certidões',
    priority: 'Crítica',
    status: 'Aberto',
    stage: 'Validação (Escritório)',
    assignee: 'Equipe Fiscal',
    createdAt: '2026-01-21T08:00:00',
    updatedAt: '2026-01-21T08:00:00',
    slaDueDate: '2026-01-21T16:00:00',
    opener: 'Monitoramento Automático',
    events: []
  },
  // CONCLUÍDOS / RESOLVIDOS
  {
    id: '#2025-150',
    title: 'Prestação de Contas Finalizada',
    description: 'Prestação de contas do convênio da Saúde enviada e aprovada.',
    cityId: 'fortaleza',
    module: 'E-Parcerias',
    priority: 'Baixa',
    status: 'Resolvido',
    stage: 'Concluído',
    assignee: 'Sistema',
    createdAt: '2025-12-15T10:00:00',
    updatedAt: '2026-01-10T11:00:00',
    slaDueDate: '2025-12-20T10:00:00',
    opener: 'João Silva',
    events: []
  },
  {
    id: '#2025-148',
    title: 'Erro no envio SIOPS',
    description: 'Sistema apresentando erro ao tentar transmitir dados do 6º bimestre.',
    cityId: 'fortaleza',
    module: 'Outros',
    priority: 'Alta',
    status: 'Resolvido',
    stage: 'Concluído',
    assignee: 'Suporte Técnico',
    createdAt: '2025-12-10T09:00:00',
    updatedAt: '2025-12-12T15:00:00',
    slaDueDate: '2025-12-12T09:00:00',
    opener: 'Maria Saúde',
    events: []
  },
  {
    id: '#2025-145',
    title: 'Solicitação de Usuário Novo',
    description: 'Criar acesso para novo secretário de obras.',
    cityId: 'fortaleza',
    module: 'Outros',
    priority: 'Baixa',
    status: 'Resolvido',
    stage: 'Concluído',
    assignee: 'Admin',
    createdAt: '2025-11-20T14:00:00',
    updatedAt: '2025-11-21T10:00:00',
    slaDueDate: '2025-11-22T14:00:00',
    opener: 'Prefeito',
    events: []
  },
  {
    id: '#2025-140',
    title: 'Dúvida sobre Lei Paulo Gustavo',
    description: 'Esclarecimento sobre prazos de execução.',
    cityId: 'fortaleza',
    module: 'E-Parcerias',
    priority: 'Média',
    status: 'Cancelado',
    stage: 'Concluído',
    assignee: 'Consultoria',
    createdAt: '2025-10-05T11:00:00',
    updatedAt: '2025-10-06T09:00:00',
    slaDueDate: '2025-10-10T11:00:00',
    opener: 'Sec. Cultura',
    events: []
  }
];

export function getChamadosData(city: CityData): Ticket[] {
  // Em um app real, filtraríamos pelo ID da cidade
  return MOCK_TICKETS; 
}

export function getTicketStats(tickets: Ticket[]) {
  const resolvidos = tickets.filter(t => t.status === 'Resolvido' || t.status === 'Cancelado').length;
  const now = new Date();
  return {
    aberto: tickets.filter(t => t.status === 'Aberto').length,
    'em-andamento': tickets.filter(t => t.status === 'Em Andamento').length,
    aguardando: tickets.filter(t => t.status === 'Pendente').length,
    concluido: resolvidos,
    atrasados: tickets.filter(t => t.status !== 'Resolvido' && t.status !== 'Cancelado' && new Date(t.slaDueDate) < now).length
  };
}