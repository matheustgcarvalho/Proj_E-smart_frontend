// Dados mockados para o módulo de Usuários atualizados

export interface Usuario {
  id: string;
  nomeCompleto: string;
  email: string;
  cpf: string;
  rg: string;
  telefone: string;
  cargo: string;
  tipoPerfil: 'aprovador' | 'comum';
  tipoVinculo: 'escritorio' | 'municipio'; 
  escritoriosVinculados?: string[]; 
  municipiosVinculados?: string[]; 
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
    tipoPerfil: 'aprovador',
    tipoVinculo: 'escritorio',
    escritoriosVinculados: ['escrit-1'],
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
    tipoPerfil: 'aprovador',
    tipoVinculo: 'escritorio',
    escritoriosVinculados: ['escrit-1'],
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
    tipoPerfil: 'comum',
    tipoVinculo: 'escritorio',
    escritoriosVinculados: ['escrit-2'],
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
    tipoPerfil: 'aprovador',
    tipoVinculo: 'municipio',
    municipiosVinculados: ['1'], 
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
    tipoPerfil: 'comum',
    tipoVinculo: 'municipio',
    municipiosVinculados: ['1'],
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
    tipoPerfil: 'aprovador',
    tipoVinculo: 'municipio',
    municipiosVinculados: ['2'],
    status: 'inativo',
    dataCadastro: '2024-02-15',
    ultimoAcesso: '2024-03-14 17:30'
  },
  {
    id: '8',
    nomeCompleto: 'Juliana Pereira Rocha',
    email: 'juliana.rocha@zaneli.com.br',
    cpf: '890.123.456-77',
    rg: '8901234',
    telefone: '(85) 99123-4567',
    cargo: 'Analista de Dados',
    tipoPerfil: 'comum',
    tipoVinculo: 'escritorio',
    escritoriosVinculados: ['escrit-1'],
    status: 'inativo',
    dataCadastro: '2024-02-20',
    ultimoAcesso: '2024-03-01 08:00'
  },
  {
    id: '9',
    nomeCompleto: 'Ricardo Mont’Alverne',
    email: 'ricardo.m@sobral.ce.gov.br',
    cpf: '901.234.567-88',
    rg: '9012345',
    telefone: '(88) 3677-4501',
    cargo: 'Técnico em Contabilidade',
    tipoPerfil: 'comum',
    tipoVinculo: 'municipio',
    municipiosVinculados: ['2'],
    status: 'ativo',
    dataCadastro: '2024-03-10',
    ultimoAcesso: '2024-03-27 15:20'
  },
  {
    id: '10',
    nomeCompleto: 'Francisco das Chagas',
    email: 'chagas.f@caninde.ce.gov.br',
    cpf: '012.345.678-99',
    rg: '0123456',
    telefone: '(85) 3343-1234',
    cargo: 'Gestor de Contratos',
    tipoPerfil: 'aprovador',
    tipoVinculo: 'municipio',
    municipiosVinculados: ['6'],
    status: 'ativo',
    dataCadastro: '2024-03-12',
    ultimoAcesso: '2024-03-28 09:45'
  }
];

export const PERFIS_CONFIG = {
  'aprovador': {
    label: 'Aprovador',
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  'comum': {
    label: 'Comum',
    color: 'bg-gray-100 text-gray-800 border-gray-200'
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
  { value: 'aprovador', label: 'Aprovador' },
  { value: 'comum', label: 'Comum' }
];