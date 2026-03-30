export interface Escritorio {
  id: string;
  nome: string;
  cnpj: string;
  tipoUnidade: 'Matriz' | 'Filial' | 'Unidade Operacional';
  cep: string;
  endereco: string;
  municipio: string;
  uf: string;
  dataCadastro: string;
  status: 'Ativo' | 'Inativo';
  usuariosVinculados: {
    id: string;
    nome: string;
    email: string;
    cargo: string;
    dataVinculo: string;
  }[];
  municipiosVinculados: {
    id: string;
    nome: string;
    uf: string;
    dataVinculo: string;
  }[];
}

export const ESCRITORIOS_DATA: Escritorio[] = [
  {
    id: '1',
    nome: 'Escritório Central - Fortaleza',
    cnpj: '12.345.678/0001-90',
    tipoUnidade: 'Matriz',
    cep: '60160-230',
    endereco: 'Av. Washington Soares, 1400 - Edson Queiroz',
    municipio: 'Fortaleza',
    uf: 'CE',
    dataCadastro: '2023-01-15',
    status: 'Ativo',
    usuariosVinculados: [
      {
        id: '1',
        nome: 'Ana Paula Silva',
        email: 'ana.silva@esmart.gov.br',
        cargo: 'Coordenadora Geral',
        dataVinculo: '2023-01-15'
      },
      {
        id: '2',
        nome: 'Carlos Eduardo Santos',
        email: 'carlos.santos@esmart.gov.br',
        cargo: 'Analista de Convênios',
        dataVinculo: '2023-02-20'
      },
      {
        id: '3',
        nome: 'Mariana Costa',
        email: 'mariana.costa@esmart.gov.br',
        cargo: 'Técnica Administrativa',
        dataVinculo: '2023-03-10'
      }
    ],
    municipiosVinculados: [
      { id: '1', nome: 'Fortaleza', uf: 'CE', dataVinculo: '2023-01-15' },
      { id: '2', nome: 'Caucaia', uf: 'CE', dataVinculo: '2023-02-01' },
      { id: '3', nome: 'Maracanaú', uf: 'CE', dataVinculo: '2023-02-15' },
      { id: '4', nome: 'Aquiraz', uf: 'CE', dataVinculo: '2023-03-01' }
    ]
  },
  {
    id: '2',
    nome: 'Escritório Regional - Sobral',
    cnpj: '12.345.678/0002-71',
    tipoUnidade: 'Filial',
    cep: '62040-100',
    endereco: 'Rua Coronel Mont\'Alverne, 750 - Centro',
    municipio: 'Sobral',
    uf: 'CE',
    dataCadastro: '2023-04-20',
    status: 'Ativo',
    usuariosVinculados: [
      {
        id: '4',
        nome: 'Roberto Almeida',
        email: 'roberto.almeida@esmart.gov.br',
        cargo: 'Coordenador Regional',
        dataVinculo: '2023-04-20'
      },
      {
        id: '5',
        nome: 'Juliana Ferreira',
        email: 'juliana.ferreira@esmart.gov.br',
        cargo: 'Analista Financeiro',
        dataVinculo: '2023-05-10'
      }
    ],
    municipiosVinculados: [
      { id: '5', nome: 'Sobral', uf: 'CE', dataVinculo: '2023-04-20' },
      { id: '6', nome: 'Itapipoca', uf: 'CE', dataVinculo: '2023-05-01' },
      { id: '7', nome: 'Camocim', uf: 'CE', dataVinculo: '2023-05-15' }
    ]
  },
  {
    id: '3',
    nome: 'Escritório Regional - Juazeiro do Norte',
    cnpj: '12.345.678/0003-52',
    tipoUnidade: 'Filial',
    cep: '63010-015',
    endereco: 'Av. Leão Sampaio, 1000 - Lagoa Seca',
    municipio: 'Juazeiro do Norte',
    uf: 'CE',
    dataCadastro: '2023-06-10',
    status: 'Ativo',
    usuariosVinculados: [
      {
        id: '6',
        nome: 'Francisco Lima',
        email: 'francisco.lima@esmart.gov.br',
        cargo: 'Coordenador Regional',
        dataVinculo: '2023-06-10'
      }
    ],
    municipiosVinculados: [
      { id: '8', nome: 'Juazeiro do Norte', uf: 'CE', dataVinculo: '2023-06-10' },
      { id: '9', nome: 'Crato', uf: 'CE', dataVinculo: '2023-06-20' },
      { id: '10', nome: 'Barbalha', uf: 'CE', dataVinculo: '2023-07-01' }
    ]
  },
  {
    id: '4',
    nome: 'Unidade Operacional - Iguatu',
    cnpj: '12.345.678/0004-33',
    tipoUnidade: 'Unidade Operacional',
    cep: '63500-000',
    endereco: 'Rua Monsenhor Tabosa, 500 - Centro',
    municipio: 'Iguatu',
    uf: 'CE',
    dataCadastro: '2024-01-15',
    status: 'Ativo',
    usuariosVinculados: [
      {
        id: '7',
        nome: 'Patrícia Souza',
        email: 'patricia.souza@esmart.gov.br',
        cargo: 'Supervisora Operacional',
        dataVinculo: '2024-01-15'
      }
    ],
    municipiosVinculados: [
      { id: '11', nome: 'Iguatu', uf: 'CE', dataVinculo: '2024-01-15' },
      { id: '12', nome: 'Icó', uf: 'CE', dataVinculo: '2024-02-01' }
    ]
  },
  {
    id: '5',
    nome: 'Escritório Regional - Quixadá',
    cnpj: '12.345.678/0005-14',
    tipoUnidade: 'Filial',
    cep: '63900-000',
    endereco: 'Av. José de Freitas Queiroz, 800 - Centro',
    municipio: 'Quixadá',
    uf: 'CE',
    dataCadastro: '2024-02-20',
    status: 'Inativo',
    usuariosVinculados: [],
    municipiosVinculados: []
  }
];

export function formatarCNPJ(cnpj: string): string {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

export function formatarCEP(cep: string): string {
  return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}
