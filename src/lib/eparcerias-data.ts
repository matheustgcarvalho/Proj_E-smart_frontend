import { CityData } from './data';

export type EParceriaStatus = 'regular' | 'irregular' | 'warning';

export interface RegularityItem {
  id: string;
  name: string; // Ex: CADINE, TCE-CE
  description: string;
  status: EParceriaStatus;
  lastVerified: string;
  documentUrl: string;
}

export interface ConvenioItem {
  id: string;
  number: string; // Ex: 034/2023
  object: string; // Ex: Construção de Areninha
  agency: string; // Ex: SOP - Superintendência de Obras
  valueTotal: number;
  valueReleased: number;
  startDate: string;
  endDate: string;
  status: 'Em Execução' | 'Prestação de Contas' | 'Concluído' | 'Paralisado';
  riskLevel: 'low' | 'medium' | 'high'; // Para alertas de prazo
}

// Helper para formatar moeda
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Helper para calcular dias restantes
const getDaysRemaining = (endDate: string) => {
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getEParceriasData = (city: CityData) => {
  // 1. DADOS DE REGULARIDADE (Checklist)
  const regularityItems: RegularityItem[] = [
    {
      id: 'cadine',
      name: 'CADINE',
      description: 'Cadastro de Inadimplentes do Ceará',
      status: 'regular',
      lastVerified: new Date().toISOString(),
      documentUrl: '#'
    },
    {
      id: 'tce',
      name: 'Contas de Gestão (TCE-CE)',
      description: 'Aprovação de contas de governo',
      status: 'regular',
      lastVerified: new Date().toISOString(),
      documentUrl: '#'
    },
    {
      id: 'cge',
      name: 'Regularidade CGE',
      description: 'Controladoria Geral do Estado',
      status: 'regular',
      lastVerified: new Date().toISOString(),
      documentUrl: '#'
    },
    {
      id: 'impostos',
      name: 'Tributos Estaduais',
      description: 'Adimplência SEFAZ/CE',
      status: 'regular',
      lastVerified: new Date().toISOString(),
      documentUrl: '#'
    },
    {
      id: 'cndt',
      name: 'CNDT Trabalhista',
      description: 'Justiça do Trabalho',
      status: 'regular',
      lastVerified: new Date().toISOString(),
      documentUrl: '#'
    }
  ];

  // 2. CONVÊNIOS (Carteira de Projetos)
  const convenios: ConvenioItem[] = [
    {
      id: 'c1',
      number: 'CV-2023/104',
      object: 'Construção de Areninha Tipo 1 - Bairro Centro',
      agency: 'SOP/CE',
      valueTotal: 1250000.00,
      valueReleased: 850000.00,
      startDate: '2023-06-01',
      endDate: '2024-12-31',
      status: 'Em Execução',
      riskLevel: 'low'
    },
    {
      id: 'c2',
      number: 'CV-2022/089',
      object: 'Pavimentação Asfáltica - Vicinal Norte',
      agency: 'SOP/CE',
      valueTotal: 3400000.00,
      valueReleased: 3400000.00,
      startDate: '2022-03-15',
      endDate: '2024-03-30', // Data próxima para gerar alerta
      status: 'Prestação de Contas',
      riskLevel: 'high'
    },
    {
      id: 'c3',
      number: 'CV-2023/212',
      object: 'Reforma do Mercado Público Municipal',
      agency: 'SECULT',
      valueTotal: 890000.00,
      valueReleased: 150000.00,
      startDate: '2023-11-01',
      endDate: '2025-06-30',
      status: 'Em Execução',
      riskLevel: 'low'
    }
  ];

  // LÓGICA DINÂMICA POR CIDADE
  if (city.id === 'caucaia') {
    // Caucaia tem problema no CADINE
    const cadine = regularityItems.find(i => i.id === 'cadine');
    if (cadine) {
        cadine.status = 'irregular';
        cadine.description = 'Pendência identificada em 12/01/2024';
    }
  } 
  else if (city.id === 'maracanau') {
    // Maracanaú tem problema no TCE e Convênio atrasado
    const tce = regularityItems.find(i => i.id === 'tce');
    if (tce) {
        tce.status = 'warning';
        tce.description = 'Contas sob análise (Ressalvas)';
    }
    
    // Adicionar um convênio crítico
    convenios.push({
      id: 'c4',
      number: 'CV-2021/005',
      object: 'Implantação de Sistema de Abastecimento D\'água',
      agency: 'SDA',
      valueTotal: 550000.00,
      valueReleased: 500000.00,
      startDate: '2021-01-20',
      endDate: '2023-12-31', // Vencido
      status: 'Paralisado',
      riskLevel: 'high'
    });
  }

  // Cálculos de Resumo
  const totalCaptado = convenios.reduce((acc, curr) => acc + curr.valueTotal, 0);
  const totalLiberado = convenios.reduce((acc, curr) => acc + curr.valueReleased, 0);
  const regularidadeGeral = regularityItems.every(i => i.status === 'regular');

  return {
    regularityItems,
    convenios,
    summary: {
      totalCaptado,
      totalLiberado,
      execucaoFinanceira: (totalLiberado / totalCaptado) * 100,
      activeCount: convenios.length,
      isRegular: regularidadeGeral
    }
  };
};
