// Dados mockados para o módulo de Usuários

export interface Usuario {
  id: string;
  nomeCompleto: string;
  email: string;
  cpf: string;
  rg: string;
  telefone: string;
  cargo: string;
  tipoPerfil: 'zaneli-admin' | 'zaneli-gestor' | 'zaneli-colaborador' | 'prefeitura-gestor' | 'prefeitura-colaborador';
  municipiosVinculados: string[]; // IDs dos municípios
  status: 'ativo' | 'inativo';
  dataCadastro: string;
  ultimoAcesso?: string;
}

export const USUARIOS_MOCK: Usuario[] = [
  {
    id: '1',
    nomeCompleto: 'Carlos Eduardo Silva',
    email: 'carlos.silva@zaneli.com.br',
    cpf: '123.456.789-00',
    rg: '1234567',
    telefone: '(85) 98765-4321',
    cargo: 'Coordenador de TI',
    tipoPerfil: 'zaneli-admin',
    municipiosVinculados: ['1', '2', '3', '4', '5'], // Todos
    status: 'ativo',
    dataCadastro: '2024-01-10',
    ultimoAcesso: '2024-03-15 14:30'
  },
  {
    id: '2',
    nomeCompleto: 'Mariana Costa Oliveira',
    email: 'mariana.oliveira@zaneli.com.br',
    cpf: '234.567.890-11',
    rg: '2345678',
    telefone: '(85) 99876-5432',
    cargo: 'Analista de Sistemas',
    tipoPerfil: 'zaneli-gestor',
    municipiosVinculados: ['1', '2', '5'],
    status: 'ativo',
    dataCadastro: '2024-01-15',
    ultimoAcesso: '2024-03-15 16:45'
  },
  {
    id: '3',
    nomeCompleto: 'João Pedro Santos',
    email: 'joao.santos@zaneli.com.br',
    cpf: '345.678.901-22',
    rg: '3456789',
    telefone: '(85) 98888-7777',
    cargo: 'Analista de Suporte',
    tipoPerfil: 'zaneli-colaborador',
    municipiosVinculados: ['1'],
    status: 'ativo',
    dataCadastro: '2024-02-01',
    ultimoAcesso: '2024-03-14 11:20'
  },
  {
    id: '4',
    nomeCompleto: 'Ana Paula Lima',
    email: 'ana.lima@fortaleza.ce.gov.br',
    cpf: '456.789.012-33',
    rg: '4567890',
    telefone: '(85) 3452-8900',
    cargo: 'Secretária de Finanças',
    tipoPerfil: 'prefeitura-gestor',
    municipiosVinculados: ['1'], // Fortaleza
    status: 'ativo',
    dataCadastro: '2024-01-20',
    ultimoAcesso: '2024-03-15 09:15'
  },
  {
    id: '5',
    nomeCompleto: 'Roberto Alves Ferreira',
    email: 'roberto.ferreira@fortaleza.ce.gov.br',
    cpf: '567.890.123-44',
    rg: '5678901',
    telefone: '(85) 3452-8901',
    cargo: 'Assessor Técnico',
    tipoPerfil: 'prefeitura-colaborador',
    municipiosVinculados: ['1'], // Fortaleza
    status: 'ativo',
    dataCadastro: '2024-01-25',
    ultimoAcesso: '2024-03-15 13:50'
  },
  {
    id: '6',
    nomeCompleto: 'Fernanda Souza Martins',
    email: 'fernanda.martins@sobral.ce.gov.br',
    cpf: '678.901.234-55',
    rg: '6789012',
    telefone: '(88) 3677-4500',
    cargo: 'Secretária de Administração',
    tipoPerfil: 'prefeitura-gestor',
    municipiosVinculados: ['2'], // Sobral
    status: 'ativo',
    dataCadastro: '2024-02-15',
    ultimoAcesso: '2024-03-14 17:30'
  },
  {
    id: '7',
    nomeCompleto: 'Paulo Henrique Costa',
    email: 'paulo.costa@maracanau.ce.gov.br',
    cpf: '789.012.345-66',
    rg: '7890123',
    telefone: '(85) 3371-1500',
    cargo: 'Diretor de Contratos',
    tipoPerfil: 'prefeitura-colaborador',
    municipiosVinculados: ['5'], // Maracanaú
    status: 'ativo',
    dataCadastro: '2024-01-28',
    ultimoAcesso: '2024-03-12 10:45'
  },
  {
    id: '8',
    nomeCompleto: 'Juliana Pereira Rocha',
    email: 'juliana.rocha@zaneli.com.br',
    cpf: '890.123.456-77',
    rg: '8901234',
    telefone: '(85) 99123-4567',
    cargo: 'Analista de Dados',
    tipoPerfil: 'zaneli-colaborador',
    municipiosVinculados: ['1', '2', '3', '4', '5'],
    status: 'inativo',
    dataCadastro: '2024-02-20',
    ultimoAcesso: '2024-03-01 08:00'
  }
];

export const PERFIS_CONFIG = {
  'zaneli-admin': {
    label: 'Zaneli - Admin',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    empresa: 'Zaneli'
  },
  'zaneli-gestor': {
    label: 'Zaneli - Gestor',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    empresa: 'Zaneli'
  },
  'zaneli-colaborador': {
    label: 'Zaneli - Colaborador',
    color: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    empresa: 'Zaneli'
  },
  'prefeitura-gestor': {
    label: 'Prefeitura - Gestor',
    color: 'bg-green-100 text-green-800 border-green-300',
    empresa: 'Prefeitura'
  },
  'prefeitura-colaborador': {
    label: 'Prefeitura - Colaborador',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    empresa: 'Prefeitura'
  }
};

export const STATUS_USUARIO_CONFIG = {
  ativo: {
    label: 'Ativo',
    color: 'bg-green-100 text-green-800 border-green-300'
  },
  inativo: {
    label: 'Inativo',
    color: 'bg-gray-100 text-gray-800 border-gray-300'
  }
};

export const TIPO_PERFIL_OPTIONS = [
  { value: 'zaneli-admin', label: 'Zaneli - Admin', empresa: 'zaneli' },
  { value: 'zaneli-gestor', label: 'Zaneli - Gestor', empresa: 'zaneli' },
  { value: 'zaneli-colaborador', label: 'Zaneli - Colaborador', empresa: 'zaneli' },
  { value: 'prefeitura-gestor', label: 'Prefeitura - Gestor', empresa: 'prefeitura' },
  { value: 'prefeitura-colaborador', label: 'Prefeitura - Colaborador', empresa: 'prefeitura' }
];