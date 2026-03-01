
export type Status = 'ok' | 'warning' | 'danger';

export interface Indicator {
  label: string;
  value: string;
  status: Status;
  trend?: 'up' | 'down' | 'neutral';
}

export interface CaucData {
  adimplencia: Indicator[];
  contas: Indicator[];
  transparencia: Indicator[];
  lrfScore: number; // 0-100
}

export interface Parceria {
  id: string;
  title: string;
  partner: string;
  value: number;
  status: 'Em Análise' | 'Aprovado' | 'Pendente' | 'Execução';
  deadline: string;
}

export interface ParceriasData {
  propostas: Parceria[];
  totalCaptado: number;
  pendenciasCount: number;
}

export interface CityData {
  id: string;
  name: string;
  uf: string;
  cauc: CaucData;
  parcerias: ParceriasData;
  population: string;
  gdp: string;
}

export const CITIES: CityData[] = [
  {
    id: 'fortaleza',
    name: 'Fortaleza',
    uf: 'CE',
    population: '2.7 mi',
    gdp: 'R$ 67 bi',
    cauc: {
      lrfScore: 92,
      adimplencia: [
        { label: 'Tributos Federais', value: 'Regular', status: 'ok' },
        { label: 'FGTS', value: 'Regular', status: 'ok' },
        { label: 'Previdência (RPPS)', value: 'Regular', status: 'ok' },
      ],
      contas: [
        { label: 'Convênios Federais', value: 'Em dia', status: 'ok' },
        { label: 'Prestação Anual', value: 'Enviada', status: 'ok' },
      ],
      transparencia: [
        { label: 'Min. Educação (25%)', value: '26.5%', status: 'ok' },
        { label: 'Min. Saúde (15%)', value: '18.2%', status: 'ok' },
        { label: 'Despesa Pessoal', value: '48.5%', status: 'warning', trend: 'up' },
      ]
    },
    parcerias: {
      totalCaptado: 15400000,
      pendenciasCount: 2,
      propostas: [
        { id: '1', title: 'Reforma de Escolas', partner: 'MEC/FNDE', value: 2500000, status: 'Execução', deadline: '2024-12-01' },
        { id: '2', title: 'Pavimentação Bairro X', partner: 'Min. Cidades', value: 5000000, status: 'Em Análise', deadline: '2024-10-15' },
        { id: '3', title: 'Equipamentos UBS', partner: 'Min. Saúde', value: 800000, status: 'Pendente', deadline: '2024-09-30' },
      ]
    }
  },
  {
    id: 'sobral',
    name: 'Sobral',
    uf: 'CE',
    population: '210 mil',
    gdp: 'R$ 5 bi',
    cauc: {
      lrfScore: 98,
      adimplencia: [
        { label: 'Tributos Federais', value: 'Regular', status: 'ok' },
        { label: 'FGTS', value: 'Regular', status: 'ok' },
        { label: 'Previdência (RPPS)', value: 'Regular', status: 'ok' },
      ],
      contas: [
        { label: 'Convênios Federais', value: 'Regular', status: 'ok' },
        { label: 'Prestação Anual', value: 'Enviada', status: 'ok' },
      ],
      transparencia: [
        { label: 'Min. Educação (25%)', value: '28.1%', status: 'ok' },
        { label: 'Min. Saúde (15%)', value: '22.0%', status: 'ok' },
        { label: 'Despesa Pessoal', value: '42.0%', status: 'ok' },
      ]
    },
    parcerias: {
      totalCaptado: 8200000,
      pendenciasCount: 0,
      propostas: [
        { id: '1', title: 'Novo Hospital Regional', partner: 'Min. Saúde', value: 12000000, status: 'Execução', deadline: '2025-06-01' },
      ]
    }
  },
  {
    id: 'caucaia',
    name: 'Caucaia',
    uf: 'CE',
    population: '365 mil',
    gdp: 'R$ 10 bi',
    cauc: {
      lrfScore: 75,
      adimplencia: [
        { label: 'Tributos Federais', value: 'Pendente', status: 'danger' },
        { label: 'FGTS', value: 'Regular', status: 'ok' },
        { label: 'Previdência (RPPS)', value: 'Atraso', status: 'warning' },
      ],
      contas: [
        { label: 'Convênios Federais', value: 'Pendente', status: 'warning' },
        { label: 'Prestação Anual', value: 'Enviada', status: 'ok' },
      ],
      transparencia: [
        { label: 'Min. Educação (25%)', value: '25.1%', status: 'ok' },
        { label: 'Min. Saúde (15%)', value: '14.8%', status: 'danger', trend: 'down' },
        { label: 'Despesa Pessoal', value: '53.8%', status: 'danger', trend: 'up' },
      ]
    },
    parcerias: {
      totalCaptado: 3500000,
      pendenciasCount: 5,
      propostas: [
        { id: '1', title: 'Urbanização Orla', partner: 'Min. Turismo', value: 4000000, status: 'Pendente', deadline: '2024-08-01' },
      ]
    }
  },
  {
    id: 'maracanau',
    name: 'Maracanaú',
    uf: 'CE',
    population: '229 mil',
    gdp: 'R$ 9 bi',
    cauc: {
      lrfScore: 88,
      adimplencia: [
        { label: 'Tributos Federais', value: 'Regular', status: 'ok' },
        { label: 'FGTS', value: 'Regular', status: 'ok' },
        { label: 'Previdência (RPPS)', value: 'Regular', status: 'ok' },
      ],
      contas: [
        { label: 'Convênios Federais', value: 'Regular', status: 'ok' },
        { label: 'Prestação Anual', value: 'Enviada', status: 'ok' },
      ],
      transparencia: [
        { label: 'Min. Educação (25%)', value: '26.0%', status: 'ok' },
        { label: 'Min. Saúde (15%)', value: '16.5%', status: 'ok' },
        { label: 'Despesa Pessoal', value: '50.1%', status: 'warning' },
      ]
    },
    parcerias: {
      totalCaptado: 5600000,
      pendenciasCount: 1,
      propostas: [
        { id: '1', title: 'Centro Industrial', partner: 'Min. Economia', value: 2000000, status: 'Em Análise', deadline: '2024-11-20' },
      ]
    }
  }
];
