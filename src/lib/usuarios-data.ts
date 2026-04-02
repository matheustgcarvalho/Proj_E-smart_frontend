// Interface atualizada com os novos perfis e status

export interface Usuario {
  id: string;
  nomeCompleto: string;
  email: string;
  cpf: string;
  rg: string;
  telefone: string;
  cargo: string;
  tipoPerfil: 'administrador' | 'aprovador' | 'comum';
  tipoVinculo: 'escritorio' | 'municipio'; 
  escritoriosVinculados?: string[]; 
  municipiosVinculados?: string[]; 
  status: 'ativo' | 'inativo' | 'pendente';
  dataCadastro: string;
  ultimoAcesso?: string;
}

export const USUARIOS_MOCK: Usuario[] = [
  // --- 5 USUÁRIOS DE ESCRITÓRIO ---
  {
    id: 'e1',
    nomeCompleto: 'Carlos Eduardo Silva',
    email: 'admin.zaneli@dominio.com.br',
    cpf: '123.456.789-00',
    rg: '1234567',
    telefone: '(85) 98765-4321',
    cargo: 'Sócio Diretor',
    tipoPerfil: 'administrador',
    tipoVinculo: 'escritorio',
    escritoriosVinculados: ['escrit-1'],
    status: 'ativo',
    dataCadastro: '2024-01-10',
    ultimoAcesso: '2024-03-15 14:30'
  },
  {
    id: 'e2',
    nomeCompleto: 'Mariana Costa Oliveira',
    email: 'mariana.aprovadora@zaneli.com.br',
    cpf: '234.567.890-11',
    rg: '2345678',
    telefone: '(85) 99876-5432',
    cargo: 'Gerente de Contratos',
    tipoPerfil: 'aprovador',
    tipoVinculo: 'escritorio',
    escritoriosVinculados: ['escrit-1'],
    status: 'ativo',
    dataCadastro: '2024-01-15',
    ultimoAcesso: '2024-03-15 16:45'
  },
  {
    id: 'e3',
    nomeCompleto: 'João Pedro Santos',
    email: 'joao.comum@g2.com.br',
    cpf: '345.678.901-22',
    rg: '3456789',
    telefone: '(85) 98888-7777',
    cargo: 'Analista de Suporte',
    tipoPerfil: 'comum',
    tipoVinculo: 'escritorio',
    escritoriosVinculados: ['escrit-2'],
    status: 'ativo',
    dataCadastro: '2024-02-01',
    ultimoAcesso: '2024-03-14 11:20'
  },
  {
    id: 'e4',
    nomeCompleto: 'Ricardo Mont’Alverne',
    email: 'admin.lopes@dominio.com.br',
    cpf: '901.234.567-88',
    rg: '9012345',
    telefone: '(88) 3677-4501',
    cargo: 'Consultor Master',
    tipoPerfil: 'administrador',
    tipoVinculo: 'escritorio',
    escritoriosVinculados: ['escrit-3'],
    status: 'pendente',
    dataCadastro: '2024-03-10',
  },
  {
    id: 'e5',
    nomeCompleto: 'Juliana Pereira Rocha',
    email: 'juliana.r@zaneli.com.br',
    cpf: '890.123.456-77',
    rg: '8901234',
    telefone: '(85) 99123-4567',
    cargo: 'Técnica Contábil',
    tipoPerfil: 'comum',
    tipoVinculo: 'escritorio',
    escritoriosVinculados: ['escrit-1'],
    status: 'inativo',
    dataCadastro: '2024-02-20',
  },

  // --- 5 USUÁRIOS DE MUNICÍPIO ---
  {
    id: 'm1',
    nomeCompleto: 'Ana Paula Lima',
    email: 'admin.fortaleza@dominio.com.br',
    cpf: '456.789.012-33',
    rg: '4567890',
    telefone: '(85) 3452-8900',
    cargo: 'Secretária de Finanças',
    tipoPerfil: 'administrador',
    tipoVinculo: 'municipio',
    municipiosVinculados: ['1'], 
    status: 'ativo',
    dataCadastro: '2024-01-20',
    ultimoAcesso: '2024-03-15 09:15'
  },
  {
    id: 'm2',
    nomeCompleto: 'Roberto Alves Ferreira',
    email: 'roberto.aprovador@sobral.ce.gov.br',
    cpf: '567.890.123-44',
    rg: '5678901',
    telefone: '(85) 3452-8901',
    cargo: 'Controlador Geral',
    tipoPerfil: 'aprovador',
    tipoVinculo: 'municipio',
    municipiosVinculados: ['2'],
    status: 'ativo',
    dataCadastro: '2024-01-25',
    ultimoAcesso: '2024-03-15 13:50'
  },
  {
    id: 'm3',
    nomeCompleto: 'Fernanda Souza Martins',
    email: 'fernanda.comum@sobral.ce.gov.br',
    cpf: '678.901.234-55',
    rg: '6789012',
    telefone: '(88) 3677-4500',
    cargo: 'Auxiliar Administrativo',
    tipoPerfil: 'comum',
    tipoVinculo: 'municipio',
    municipiosVinculados: ['2'],
    status: 'inativo',
    dataCadastro: '2024-02-15',
  },
  {
    id: 'm4',
    nomeCompleto: 'Francisco das Chagas',
    email: 'chagas.aprovador@caninde.ce.gov.br',
    cpf: '012.345.678-99',
    rg: '0123456',
    telefone: '(85) 3343-1234',
    cargo: 'Gestor de Contratos',
    tipoPerfil: 'aprovador',
    tipoVinculo: 'municipio',
    municipiosVinculados: ['6'],
    status: 'ativo',
    dataCadastro: '2024-03-12',
  },
  {
    id: 'm5',
    nomeCompleto: 'Beatriz Vasconcelos',
    email: 'admin.maracanau@dominio.com.br',
    cpf: '321.654.987-11',
    rg: '9876543',
    telefone: '(85) 3371-1000',
    cargo: 'Secretária de Administração',
    tipoPerfil: 'administrador',
    tipoVinculo: 'municipio',
    municipiosVinculados: ['3'],
    status: 'pendente',
    dataCadastro: '2024-03-25',
  }
];

export const PERFIS_CONFIG = {
  'administrador': {
    label: 'Administrador',
    color: 'bg-purple-100 text-purple-700 border-purple-200' // ROXO
  },
  'aprovador': {
    label: 'Aprovador',
    color: 'bg-blue-100 text-blue-700 border-blue-200'     // AZUL
  },
  'comum': {
    label: 'Comum',
    color: 'bg-slate-100 text-slate-600 border-slate-200'   // CINZA
  }
};

export const STATUS_USUARIO_CONFIG = {
  ativo: {
    label: 'Ativo',
    color: 'bg-green-100 text-green-800 border-green-300'   // VERDE
  },
  inativo: {
    label: 'Inativo',
    color: 'bg-gray-100 text-gray-800 border-gray-300'     // CINZA
  },
  pendente: {
    label: 'Pendente',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300' // AMARELO
  }
};

export const TIPO_PERFIL_OPTIONS = [
  { value: 'administrador', label: 'Administrador' },
  { value: 'aprovador', label: 'Aprovador' },
  { value: 'comum', label: 'Comum' }
];