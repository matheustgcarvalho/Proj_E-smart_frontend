import { CityData } from './data';

export type CertidaoStatus = 'regular' | 'irregular' | 'warning';

// Tipos específicos de certidão
export type CertidaoTipo = 
  | 'transparencia_fiscal'
  | 'convenio_tce'
  | 'operacoes_credito'
  | 'regularidade_rfb'
  | 'regularidade_fgts'
  | 'debitos_estaduais'
  | 'debitos_trabalhistas'
  | 'regularidade_precatorios'
  | 'cadastral_parceiro';

// Interface para Inadimplência (usada na Certidão Cadastral do Parceiro)
export interface Inadimplencia {
  orgao: string;
  numeroInstrumento: string;
  motivo: string;
  situacao: string;
}

// Campos específicos por certidão
export interface CamposTransparenciaFiscal {
  municipio: string;
  codigoIBGE: string;
  entidade: string;
  numeroCertidao: string;
  hashCertidao: string;
}

export interface CamposRegularidadeFGTS {
  cnpj: string;
  numeroCertidao: string;
  mensagem: string;
}

export interface CamposDebitosEstaduais {
  numeroCertidao: string;
  razaoSocial: string;
  inscricaoEstadual: string;
  cnpj: string;
}

export interface CamposRegularidadePrecatorios {
  cnpj: string;
  entidade: string;
  codigoValidacao: string;
}

export interface CamposCadastralParceiro {
  razaoSocial: string;
  cnpj: string;
  adimplente: boolean;
  possuiInadimplenciaSuspensa: boolean;
  codigoCertidao: string;
  inadimplencias: Inadimplencia[];
}

export interface Certidao {
  id: string;
  name: string;
  organ: string;
  tipo: CertidaoTipo;
  status: CertidaoStatus;
  emissionDate: string;
  expirationDate: string;
  authCode: string;
  description: string;
  pdfUrl?: string;
  
  // Campos específicos opcionais
  camposTransparenciaFiscal?: CamposTransparenciaFiscal;
  camposRegularidadeFGTS?: CamposRegularidadeFGTS;
  camposDebitosEstaduais?: CamposDebitosEstaduais;
  camposRegularidadePrecatorios?: CamposRegularidadePrecatorios;
  camposCadastralParceiro?: CamposCadastralParceiro;
}

export const getDaysRemaining = (expirationDate: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const exp = new Date(expirationDate);
  const expDate = new Date(exp.getUTCFullYear(), exp.getUTCMonth(), exp.getUTCDate());
  
  const diffTime = expDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const calculateStatus = (expirationDate: string, forceIrregular = false): CertidaoStatus => {
  if (forceIrregular) return 'irregular';
  
  const days = getDaysRemaining(expirationDate);
  
  if (days < 0) return 'irregular';
  if (days <= 15) return 'warning';
  return 'regular';
};

export const getCertidoesData = (city: CityData): Certidao[] => {
  const today = new Date();
  
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const addDays = (days: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + days);
    return formatDate(d);
  };

  const data: Omit<Certidao, 'status'>[] = [
    {
      id: 'cert-01',
      name: 'Transparência da Gestão Fiscal',
      organ: 'Secretaria do Tesouro Nacional',
      tipo: 'transparencia_fiscal',
      emissionDate: addDays(-90),
      expirationDate: addDays(90),
      authCode: 'TGF-2024-001234',
      description: 'Certidão que atesta a conformidade com os limites e condições da Lei de Responsabilidade Fiscal.',
      pdfUrl: '/certidoes/transparencia-fiscal.pdf',
      camposTransparenciaFiscal: {
        municipio: city.name,
        codigoIBGE: '2304400',
        entidade: 'Prefeitura Municipal',
        numeroCertidao: 'TGF-2024-001234',
        hashCertidao: 'A3F8D2B9C4E7F1A5D8C2B6E9F3A7D1C5'
      }
    },
    {
      id: 'cert-02',
      name: 'Convênio Municipal - TCE/CE',
      organ: 'Tribunal de Contas do Estado do Ceará',
      tipo: 'convenio_tce',
      emissionDate: addDays(-45),
      expirationDate: addDays(15),
      authCode: 'TCE-CE-2024-5678',
      description: 'Certidão de regularidade junto ao TCE-CE para celebração de convênios estaduais.',
      pdfUrl: '/certidoes/tce-ce-convenio.pdf'
    },
    {
      id: 'cert-03',
      name: 'Operações de Créditos Municipais',
      organ: 'Ministério da Fazenda / STN',
      tipo: 'operacoes_credito',
      emissionDate: addDays(-60),
      expirationDate: addDays(60),
      authCode: 'OCM-2024-9101',
      description: 'Certidão de adimplência com operações de crédito junto à União.',
      pdfUrl: '/certidoes/operacoes-credito.pdf'
    },
    {
      id: 'cert-04',
      name: 'Regularidade Fiscal - RFB',
      organ: 'Receita Federal do Brasil',
      tipo: 'regularidade_rfb',
      emissionDate: addDays(-30),
      expirationDate: addDays(-5),
      authCode: 'RFB-2024-1122',
      description: 'Certidão Negativa de Débitos relativos a Créditos Tributários Federais e Dívida Ativa da União.',
      pdfUrl: '/certidoes/rfb-regularidade.pdf'
    },
    {
      id: 'cert-05',
      name: 'Regularidade do FGTS - CRF',
      organ: 'Caixa Econômica Federal',
      tipo: 'regularidade_fgts',
      emissionDate: addDays(-20),
      expirationDate: addDays(10),
      authCode: 'CRF-2024-3344',
      description: 'Certificado de Regularidade do FGTS.',
      pdfUrl: '/certidoes/crf-fgts.pdf',
      camposRegularidadeFGTS: {
        cnpj: '07.954.722/0001-24',
        numeroCertidao: '2024031234567890',
        mensagem: 'Certificamos que, nesta data, o empregador acima identificado está em situação regular perante o FGTS.'
      }
    },
    {
      id: 'cert-06',
      name: 'Débitos Estaduais',
      organ: 'Secretaria da Fazenda do Estado - SEFAZ',
      tipo: 'debitos_estaduais',
      emissionDate: addDays(-50),
      expirationDate: addDays(40),
      authCode: 'SEFAZ-CE-2024-5566',
      description: 'Certidão Negativa de Débitos Estaduais (ICMS, IPVA, ITCD).',
      pdfUrl: '/certidoes/debitos-estaduais.pdf',
      camposDebitosEstaduais: {
        numeroCertidao: '20240515001234',
        razaoSocial: `Prefeitura Municipal de ${city.name}`,
        inscricaoEstadual: '06.123.456-7',
        cnpj: '07.954.722/0001-24'
      }
    },
    {
      id: 'cert-07',
      name: 'Débitos Trabalhistas',
      organ: 'Tribunal Superior do Trabalho',
      tipo: 'debitos_trabalhistas',
      emissionDate: addDays(-40),
      expirationDate: addDays(140),
      authCode: 'CNDT-2024-7788',
      description: 'Certidão Negativa de Débitos Trabalhistas.',
      pdfUrl: '/certidoes/debitos-trabalhistas.pdf'
    },
    {
      id: 'cert-08',
      name: 'Regularidade de Precatórios',
      organ: 'Conselho Nacional de Justiça',
      tipo: 'regularidade_precatorios',
      emissionDate: addDays(-70),
      expirationDate: addDays(110),
      authCode: 'CNJ-PREC-2024-9900',
      description: 'Certidão de regularidade no pagamento de precatórios.',
      pdfUrl: '/certidoes/precatorios.pdf',
      camposRegularidadePrecatorios: {
        cnpj: '07.954.722/0001-24',
        entidade: `Município de ${city.name}`,
        codigoValidacao: 'CNJ-VAL-8877665544'
      }
    },
    {
      id: 'cert-09',
      name: 'Certidão Cadastral do Parceiro',
      organ: 'Portal de Convênios / SICONV',
      tipo: 'cadastral_parceiro',
      emissionDate: addDays(-10),
      expirationDate: addDays(350),
      authCode: 'SICONV-2024-1212',
      description: 'Certidão de regularidade cadastral junto ao sistema de convênios federais.',
      pdfUrl: '/certidoes/cadastral-parceiro.pdf',
      camposCadastralParceiro: {
        razaoSocial: `Prefeitura Municipal de ${city.name}`,
        cnpj: '07.954.722/0001-24',
        adimplente: false,
        possuiInadimplenciaSuspensa: true,
        codigoCertidao: 'SICONV-CERT-20240228-1212',
        inadimplencias: [
          {
            orgao: 'Secretaria da Saúde',
            numeroInstrumento: '1256668',
            motivo: 'Prestação de contas irregular',
            situacao: 'Suspensa'
          },
          {
            orgao: 'Ministério da Educação',
            numeroInstrumento: '8934521',
            motivo: 'Documentação pendente',
            situacao: 'Suspensa'
          }
        ]
      }
    }
  ];

  return data.map(item => ({
    ...item,
    status: calculateStatus(item.expirationDate)
  }));
};
