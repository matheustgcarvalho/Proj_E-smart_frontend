import { CityData } from '../../lib/data';

export type CaucStatus = 'regular' | 'warning' | 'critical';

export interface CaucItem {
  id: string;
  group: 1 | 2 | 3 | 4;
  description: string; // Nome amigável
  source: string; // Órgão Informante (RFB, Caixa, etc)
  issuedAt: string;
  expiresAt: string;
  status: CaucStatus;
  externalLink: string;
}

export const CAUC_GROUPS = {
  1: "Grupo I - Adimplência Financeira",
  2: "Grupo II - Prestação de Contas",
  3: "Grupo III - Transparência",
  4: "Grupo IV - Limites Constitucionais"
};

// Helper para calcular dias restantes
export const getDaysRemaining = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
};

// Helper para gerar datas relativas
const getDate = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

// Mock Data Generator baseada na cidade selecionada
export const getCaucData = (city: CityData): CaucItem[] => {
  const baseItems: CaucItem[] = [
    // GRUPO I - Adimplência
    {
      id: '1.1',
      group: 1,
      description: 'Regularidade quanto a Tributos, Contribuições e Dívida Ativa',
      source: 'Receita Federal (RFB)',
      issuedAt: getDate(-30),
      expiresAt: getDate(180),
      status: 'regular',
      externalLink: 'https://www.gov.br/receitafederal'
    },
    {
      id: '1.2',
      group: 1,
      description: 'Regularidade quanto a Contribuições Previdenciárias',
      source: 'Receita Federal (RFB)',
      issuedAt: getDate(-45),
      expiresAt: getDate(120),
      status: 'regular',
      externalLink: 'https://www.gov.br/receitafederal'
    },
    {
      id: '1.3',
      group: 1,
      description: 'Regularidade FGTS',
      source: 'Caixa Econômica Federal',
      issuedAt: getDate(-10),
      expiresAt: getDate(20),
      status: 'regular',
      externalLink: 'https://consulta-crf.caixa.gov.br'
    },
    {
      id: '1.4',
      group: 1,
      description: 'Regularidade em Empréstimos e Financiamentos',
      source: 'STN / CADIP',
      issuedAt: getDate(-100),
      expiresAt: getDate(200),
      status: 'regular',
      externalLink: 'https://sadip.tesouro.gov.br'
    },

    // GRUPO II - Prestação de Contas
    {
      id: '2.1',
      group: 2,
      description: 'Prestação de Contas de Convênios',
      source: 'Transferegov.br',
      issuedAt: getDate(-60),
      expiresAt: getDate(30),
      status: 'regular',
      externalLink: 'https://www.transferegov.br'
    },

    // GRUPO III - Transparência
    {
      id: '3.1',
      group: 3,
      description: 'Encaminhamento do RREO (6º Bimestre)',
      source: 'Siconfi / STN',
      issuedAt: getDate(-5),
      expiresAt: getDate(25),
      status: 'regular',
      externalLink: 'https://siconfi.tesouro.gov.br'
    },
    {
      id: '3.2',
      group: 3,
      description: 'Encaminhamento do RGF (3º Quadrimestre)',
      source: 'Siconfi / STN',
      issuedAt: getDate(-5),
      expiresAt: getDate(25),
      status: 'regular',
      externalLink: 'https://siconfi.tesouro.gov.br'
    },
    {
      id: '3.3',
      group: 3,
      description: 'Matriz de Saldos Contábeis (MSC)',
      source: 'Siconfi / STN',
      issuedAt: getDate(-15),
      expiresAt: getDate(45),
      status: 'regular',
      externalLink: 'https://siconfi.tesouro.gov.br'
    },

    // GRUPO IV - Limites
    {
      id: '4.1',
      group: 4,
      description: 'Aplicação Mínima em Saúde (SIOPS)',
      source: 'Ministério da Saúde',
      issuedAt: getDate(-30),
      expiresAt: getDate(330),
      status: 'regular',
      externalLink: 'https://siops.saude.gov.br'
    },
    {
      id: '4.2',
      group: 4,
      description: 'Aplicação Mínima em Educação (SIOPE)',
      source: 'FNDE / MEC',
      issuedAt: getDate(-30),
      expiresAt: getDate(330),
      status: 'regular',
      externalLink: 'https://www.fnde.gov.br/siope'
    },
    {
      id: '4.3',
      group: 4,
      description: 'Certificado de Regularidade Previdenciária (CRP)',
      source: 'Ministério da Previdência',
      issuedAt: getDate(-90),
      expiresAt: getDate(90),
      status: 'regular',
      externalLink: 'https://cadprev.previdencia.gov.br'
    }
  ];

  // Modificadores de Cenário por Cidade
  const items = [...baseItems];

  if (city.id === 'caucaia') {
    // Cenário: Problemas com FGTS (Vencendo) e RREO (Atrasado)
    const fgts = items.find(i => i.id === '1.3');
    if (fgts) {
      fgts.status = 'warning';
      fgts.expiresAt = getDate(5); // Vence em 5 dias
    }

    const rreo = items.find(i => i.id === '3.1');
    if (rreo) {
      rreo.status = 'critical';
      rreo.expiresAt = getDate(-2); // Venceu há 2 dias
    }
  } 
  else if (city.id === 'maracanau') {
    // Cenário: Crítico na Previdência
    const prev = items.find(i => i.id === '1.2');
    if (prev) {
      prev.status = 'critical';
      prev.expiresAt = getDate(-10);
    }
    const crp = items.find(i => i.id === '4.3');
    if (crp) {
      crp.status = 'warning';
      crp.expiresAt = getDate(3);
    }
  }
  else if (city.id === 'sobral') {
    // Cenário: Alertas diversos, mas sem críticos
    const divida = items.find(i => i.id === '1.1');
    if (divida) {
      divida.status = 'warning';
      divida.expiresAt = getDate(6);
    }
    const msc = items.find(i => i.id === '3.3');
    if (msc) {
      msc.status = 'warning';
      msc.expiresAt = getDate(7);
    }
  }

  return items;
};
