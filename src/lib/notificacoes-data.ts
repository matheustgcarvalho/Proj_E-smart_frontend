// Dados mockados para o módulo de Notificações

export interface Notificacao {
  id: string;
  tipo: 'aprovacao-usuario' | 'alerta-convenio' | 'sistema';
  titulo: string;
  mensagem: string;
  lida: boolean;
  data: string;
  prioridade: 'alta' | 'media' | 'baixa';
  // Dados específicos
  usuarioId?: string;
  usuarioNome?: string;
  convenioId?: string;
  convenioNome?: string;
}

export const NOTIFICACOES_MOCK: Notificacao[] = [
  {
    id: 'notif-1',
    tipo: 'aprovacao-usuario',
    titulo: 'Novo Usuário Aguardando Aprovação',
    mensagem: 'O usuário "Carla Mendes Santos" foi cadastrado e está aguardando aprovação para acessar o sistema.',
    lida: false,
    data: '2024-03-15T14:30:00',
    prioridade: 'alta',
    usuarioId: 'user-pending-1',
    usuarioNome: 'Carla Mendes Santos'
  },
  {
    id: 'notif-2',
    tipo: 'aprovacao-usuario',
    titulo: 'Novo Usuário Aguardando Aprovação',
    mensagem: 'O usuário "Ricardo Oliveira Costa" foi cadastrado e está aguardando aprovação para acessar o sistema.',
    lida: false,
    data: '2024-03-15T10:15:00',
    prioridade: 'alta',
    usuarioId: 'user-pending-2',
    usuarioNome: 'Ricardo Oliveira Costa'
  },
  {
    id: 'notif-3',
    tipo: 'alerta-convenio',
    titulo: 'Convênio Próximo do Vencimento',
    mensagem: 'O convênio "Construção da Escola Municipal" vence em 7 dias. Verifique o andamento.',
    lida: false,
    data: '2024-03-14T16:45:00',
    prioridade: 'alta',
    convenioId: '1',
    convenioNome: 'Construção da Escola Municipal'
  },
  {
    id: 'notif-4',
    tipo: 'alerta-convenio',
    titulo: 'Execução Financeira Baixa',
    mensagem: 'O convênio "Reforma do Posto de Saúde" está com apenas 45% de execução financeira.',
    lida: true,
    data: '2024-03-14T09:20:00',
    prioridade: 'media',
    convenioId: '2',
    convenioNome: 'Reforma do Posto de Saúde'
  },
  {
    id: 'notif-5',
    tipo: 'sistema',
    titulo: 'Atualização do Sistema',
    mensagem: 'O sistema E-Smart será atualizado no dia 20/03/2024 às 22h. Haverá indisponibilidade de 2 horas.',
    lida: true,
    data: '2024-03-13T08:00:00',
    prioridade: 'media'
  },
  {
    id: 'notif-6',
    tipo: 'alerta-convenio',
    titulo: 'Documentação Pendente',
    mensagem: 'O convênio "Pavimentação de Vias" está com documentação pendente de envio.',
    lida: true,
    data: '2024-03-12T14:30:00',
    prioridade: 'media',
    convenioId: '3',
    convenioNome: 'Pavimentação de Vias'
  },
  {
    id: 'notif-7',
    tipo: 'aprovacao-usuario',
    titulo: 'Usuário Aprovado com Sucesso',
    mensagem: 'O usuário "João Silva Santos" foi aprovado e já pode acessar o sistema.',
    lida: true,
    data: '2024-03-11T11:00:00',
    prioridade: 'baixa',
    usuarioId: 'user-approved-1',
    usuarioNome: 'João Silva Santos'
  }
];

export const TIPO_NOTIFICACAO_CONFIG = {
  'aprovacao-usuario': {
    label: 'Aprovação de Usuário',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    icon: '👤'
  },
  'alerta-convenio': {
    label: 'Alerta de Convênio',
    color: 'bg-orange-100 text-orange-800 border-orange-300',
    icon: '📄'
  },
  'sistema': {
    label: 'Notificação do Sistema',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    icon: '⚙️'
  }
};

export const PRIORIDADE_CONFIG = {
  alta: {
    label: 'Alta',
    color: 'bg-red-100 text-red-800 border-red-300'
  },
  media: {
    label: 'Média',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  },
  baixa: {
    label: 'Baixa',
    color: 'bg-gray-100 text-gray-800 border-gray-300'
  }
};