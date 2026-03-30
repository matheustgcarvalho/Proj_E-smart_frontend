// Dados mockados para o módulo de Municípios atualizados

export interface UnidadeGestora {
  id: string;
  codigo: string;
  nome: string;
  dataCriacao: string;
  cpfResponsavel?: string;
  nomeResponsavel?: string;
  dataInicio?: string;
  orgaoId?: string;
}

export interface Orgao {
  id: string;
  codigo: string;
  nome: string;
  dataCriacao: string;
}

export interface Municipio {
  id: string;
  nome: string;
  uf: string;
  cnpj: string;
  codigoIbge: string;
  codigoTce: string;
  loginTce?: string;
  senhaTce?: string;
  escritorioId: string;
  statusIntegracao: 'ativo' | 'inativo'; // Apenas 2 status agora
  dataCadastro: string;
  orgaos: Orgao[];
  unidadesGestoras: UnidadeGestora[];
}

export const MUNICIPIOS_MOCK: Municipio[] = [
  {
    id: '1',
    nome: 'Fortaleza',
    uf: 'CE',
    cnpj: '07.954.516/0001-39',
    codigoIbge: '2304400',
    codigoTce: '0001',
    loginTce: 'pmf_tech',
    escritorioId: 'escrit-1',
    statusIntegracao: 'ativo',
    dataCadastro: '2024-01-15',
    orgaos: [
      { id: 'org1_30', codigo: '30', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2024' },
      { id: 'org1_35', codigo: '35', nome: 'Secretaria Municipal de Educacao', dataCriacao: '01/01/2024' }
    ],
    unidadesGestoras: [
      { id: 'ug1_30_1', codigo: '0101', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2024', cpfResponsavel: '123******45', nomeResponsavel: 'JOSE SARTO NOGUEIRA MOREIRA', dataInicio: '01/01/2024', orgaoId: 'org1_30' }
    ]
  },
  {
    id: '2',
    nome: 'Sobral',
    uf: 'CE',
    cnpj: '07.599.149/0001-14',
    codigoIbge: '2312908',
    codigoTce: '0002',
    loginTce: 'pms_tech',
    escritorioId: 'escrit-2',
    statusIntegracao: 'ativo',
    dataCadastro: '2024-02-10',
    orgaos: [
      { id: 'org2_30', codigo: '30', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2024' }
    ],
    unidadesGestoras: [
      { id: 'ug2_30_1', codigo: '0101', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2024', cpfResponsavel: '211******34', nomeResponsavel: 'OSCAR RODRIGUES JUNIOR', dataInicio: '01/01/2024', orgaoId: 'org2_30' }
    ]
  },
  {
    id: '3',
    nome: 'Juazeiro do Norte',
    uf: 'CE',
    cnpj: '07.716.628/0001-03',
    codigoIbge: '2307304',
    codigoTce: '0003',
    escritorioId: 'escrit-1',
    statusIntegracao: 'inativo', // Alterado de pendente para inativo
    dataCadastro: '2024-03-05',
    orgaos: [],
    unidadesGestoras: []
  },
  {
    id: '5',
    nome: 'Maracanaú',
    uf: 'CE',
    cnpj: '07.599.321/0001-87',
    codigoIbge: '2307650',
    codigoTce: '0005',
    loginTce: 'pmm_tech',
    escritorioId: 'escrit-3',
    statusIntegracao: 'ativo',
    dataCadastro: '2024-01-22',
    orgaos: [
      { id: 'org5_30', codigo: '30', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2024' }
    ],
    unidadesGestoras: [
      { id: 'ug5_30_1', codigo: '0101', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2024', cpfResponsavel: '411******22', nomeResponsavel: 'ROBERTO PESSOA RODRIGUES', dataInicio: '01/01/2024', orgaoId: 'org5_30' }
    ]
  },
  {
    id: '6',
    nome: 'Canindé',
    uf: 'CE',
    cnpj: '07.681.502/0001-26',
    codigoIbge: '2302800',
    codigoTce: '0006',
    loginTce: 'pmc_tech',
    escritorioId: 'escrit-1',
    statusIntegracao: 'inativo',
    dataCadastro: '2024-01-10',
    orgaos: [
      { id: 'org30', codigo: '30', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2025' }
    ],
    unidadesGestoras: [
      { id: 'ug_30_1', codigo: '0101', nome: 'Gabinete do Prefeito', dataCriacao: '01/01/2025', cpfResponsavel: '056******02', nomeResponsavel: 'ALAN GLEYSON BEZERRA LOPES', dataInicio: '01/01/2025', orgaoId: 'org30' }
    ]
  }
];

export const STATUS_INTEGRACAO_CONFIG = {
  ativo: {
    label: 'Ativo',
    color: 'bg-green-100 text-green-800 border-green-300'
  },
  inativo: {
    label: 'Inativo',
    color: 'bg-gray-100 text-gray-800 border-gray-300'
  }
};

export const UF_OPTIONS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];