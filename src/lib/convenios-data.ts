export type ConvenioStatus = 
  | 'Em Execução' 
  | 'Prestação de Contas' 
  | 'Inadimplente' 
  | 'Concluído'
  | 'Suspenso';

export type EmpenhoStatus = 'Empenhado' | 'Liquidado' | 'Pago';

export interface ConvenioEstadual {
  id: string;
  numeroInstrumento: string;
  objeto: string;
  instituicao: string;
  valorGlobal: number;
  percentualExecucao: number;
  vigenciaFim: string;
  vigenciaInicio: string;
  status: ConvenioStatus;
  medicoesRealizadas: number;
  totalMedicoes: number;
  temIrregularidade: boolean;
  // Partes do Convênio
  orgaoConcedente?: string;
  unidadeConcedente?: string;
  nomeConveniado?: string;
  cnpjConveniado?: string;
  localidade?: string;
  // Identificação
  numeroSACC?: string;
  codigoPlanoTrabalho?: string;
  tipoObjeto?: string;
  situacaoPrestacaoContas?: string;
  situacaoFisica?: string;
  ultimaSincronizacao?: string;
  justificativa?: string;
  // Datas e Prazos
  dataAssinatura?: string;
  terminoOriginal?: string;
  terminoAposAditivo?: string;
  publicacaoPortal?: string;
  // Valores Financeiros
  valorOriginal?: number;
  valorAtualizadoTotal?: number;
  valorAtualizadoRepasse?: number;
  valorAtualizadoContrapartida?: number;
  valorLiberado?: number;
  valorExecutado?: number;
}

export interface ConvenioFederal {
  id: string;
  numeroConvenio: string;
  ministerio: string;
  objeto: string;
  valorGlobal: number;
  situacaoEmpenho: EmpenhoStatus;
  clausulasSuspensivas: boolean;
  motivoSuspensao?: string;
  vigenciaFim: string;
  vigenciaInicio: string;
  status: ConvenioStatus;
  temIrregularidade: boolean;
  percentualExecucao?: number;
  empenhos?: Array<{
    numero: string;
    data: string;
    valor: number;
    status: string;
  }>;
}

export interface ConveniosKPI {
  totalConvenios: number;
  valorTotal: number;
  recursosReceber: number;
  contrapartidasPendentes: number;
  vigenciasProximasFim: number;
}

export interface ConveniosData {
  kpis: ConveniosKPI;
  estaduais: ConvenioEstadual[];
  federais: ConvenioFederal[];
}

// Função auxiliar para calcular dias restantes
export function calcularDiasRestantes(dataVigenciaFim: string): number {
  const hoje = new Date();
  const vigenciaFim = new Date(dataVigenciaFim);
  const diffTime = vigenciaFim.getTime() - hoje.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Função auxiliar para formatar valores monetários
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(valor);
}

// Dados mock por município
export const CONVENIOS_DATA: Record<string, ConveniosData> = {
  fortaleza: {
    kpis: {
      totalConvenios: 23,
      valorTotal: 45800000,
      recursosReceber: 12400000,
      contrapartidasPendentes: 2100000,
      vigenciasProximasFim: 3
    },
    estaduais: [
      {
        id: 'CE-001',
        numeroInstrumento: '2024/0123-SEINFRA',
        objeto: 'Construção de Areninha no Bairro Aldeota',
        instituicao: 'SEINFRA',
        valorGlobal: 850000,
        percentualExecucao: 65,
        vigenciaFim: '2024-09-15',
        vigenciaInicio: '2024-01-01',
        status: 'Em Execução',
        medicoesRealizadas: 4,
        totalMedicoes: 6,
        temIrregularidade: false,
        // Partes do Convênio
        orgaoConcedente: 'Secretaria da Infraestrutura do Estado do Ceará',
        unidadeConcedente: 'Coordenadoria de Obras Municipais',
        nomeConveniado: 'Prefeitura Municipal de Fortaleza',
        cnpjConveniado: '07.954.502/0001-84',
        localidade: 'Fortaleza - CE',
        // Identificação
        numeroSACC: 'SACC-2024-001234',
        codigoPlanoTrabalho: 'PTR-2024-0123',
        tipoObjeto: 'Obras e Instalações',
        situacaoPrestacaoContas: 'Em Dia',
        situacaoFisica: 'Em Execução',
        ultimaSincronizacao: '2024-02-19T14:30:00',
        justificativa: 'A construção da areninha visa atender a demanda da comunidade do bairro Aldeota por espaços de lazer e prática esportiva, contribuindo para a qualidade de vida dos moradores e redução da vulnerabilidade social de crianças e adolescentes.',
        // Datas e Prazos
        dataAssinatura: '2023-12-15',
        terminoOriginal: '2024-06-15',
        terminoAposAditivo: '2024-09-15',
        publicacaoPortal: '2023-12-20',
        // Valores Financeiros
        valorOriginal: 750000,
        valorAtualizadoTotal: 850000,
        valorAtualizadoRepasse: 765000,
        valorAtualizadoContrapartida: 85000,
        valorLiberado: 552500,
        valorExecutado: 425000
      },
      {
        id: 'CE-002',
        numeroInstrumento: '2023/0456-SOP',
        objeto: 'Pavimentação de Ruas no Conjunto Ceará',
        instituicao: 'SOP',
        valorGlobal: 1200000,
        percentualExecucao: 92,
        vigenciaFim: '2024-08-30',
        vigenciaInicio: '2023-05-01',
        status: 'Prestação de Contas',
        medicoesRealizadas: 6,
        totalMedicoes: 6,
        temIrregularidade: false
      },
      {
        id: 'CE-003',
        numeroInstrumento: '2024/0789-SEDUC',
        objeto: 'Reforma de 12 Escolas Municipais',
        instituicao: 'SEDUC',
        valorGlobal: 3500000,
        percentualExecucao: 28,
        vigenciaFim: '2025-03-20',
        vigenciaInicio: '2024-08-01',
        status: 'Em Execução',
        medicoesRealizadas: 2,
        totalMedicoes: 8,
        temIrregularidade: false
      },
      {
        id: 'CE-004',
        numeroInstrumento: '2023/0234-SESA',
        objeto: 'Equipamentos para 5 UBS',
        instituicao: 'SESA',
        valorGlobal: 680000,
        percentualExecucao: 45,
        vigenciaFim: '2024-07-10',
        vigenciaInicio: '2023-03-01',
        status: 'Inadimplente',
        medicoesRealizadas: 2,
        totalMedicoes: 5,
        temIrregularidade: true
      },
      {
        id: 'CE-005',
        numeroInstrumento: '2024/0567-SEINFRA',
        objeto: 'Revitalização de Praças Públicas',
        instituicao: 'SEINFRA',
        valorGlobal: 920000,
        percentualExecucao: 55,
        vigenciaFim: '2024-10-30',
        vigenciaInicio: '2024-06-01',
        status: 'Em Execução',
        medicoesRealizadas: 3,
        totalMedicoes: 5,
        temIrregularidade: false
      }
    ],
    federais: [
      {
        id: 'BR-001',
        numeroConvenio: '912345/2023',
        ministerio: 'MEC/FNDE',
        objeto: 'Construção de Creche no Bairro Messejana',
        valorGlobal: 2800000,
        situacaoEmpenho: 'Liquidado',
        clausulasSuspensivas: false,
        vigenciaFim: '2025-06-15',
        vigenciaInicio: '2023-07-01',
        status: 'Em Execução',
        temIrregularidade: false
      },
      {
        id: 'BR-002',
        numeroConvenio: '887654/2024',
        ministerio: 'Ministério das Cidades',
        objeto: 'Sistema de Drenagem Urbana',
        valorGlobal: 8500000,
        situacaoEmpenho: 'Empenhado',
        clausulasSuspensivas: true,
        motivoSuspensao: 'Pendente aprovação de licença ambiental',
        vigenciaFim: '2025-12-31',
        vigenciaInicio: '2024-01-01',
        status: 'Suspenso',
        temIrregularidade: true
      },
      {
        id: 'BR-003',
        numeroConvenio: '923456/2023',
        ministerio: 'Ministério da Saúde',
        objeto: 'Reforma e Ampliação do Hospital Municipal',
        valorGlobal: 5200000,
        situacaoEmpenho: 'Pago',
        clausulasSuspensivas: false,
        vigenciaFim: '2024-11-20',
        vigenciaInicio: '2023-09-01',
        status: 'Em Execução',
        temIrregularidade: false
      },
      {
        id: 'BR-004',
        numeroConvenio: '898765/2024',
        ministerio: 'Ministério do Esporte',
        objeto: 'Construção de Centro Esportivo Comunitário',
        valorGlobal: 1850000,
        situacaoEmpenho: 'Empenhado',
        clausulasSuspensivas: false,
        vigenciaFim: '2025-04-30',
        vigenciaInicio: '2024-02-01',
        status: 'Em Execução',
        temIrregularidade: false
      },
      {
        id: 'BR-005',
        numeroConvenio: '901234/2023',
        ministerio: 'Ministério do Turismo',
        objeto: 'Revitalização da Orla Marítima',
        valorGlobal: 12000000,
        situacaoEmpenho: 'Liquidado',
        clausulasSuspensivas: false,
        vigenciaFim: '2024-08-15',
        vigenciaInicio: '2023-06-01',
        status: 'Prestação de Contas',
        temIrregularidade: false
      }
    ]
  },
  caucaia: {
    kpis: {
      totalConvenios: 12,
      valorTotal: 18500000,
      recursosReceber: 8200000,
      contrapartidasPendentes: 1500000,
      vigenciasProximasFim: 5
    },
    estaduais: [
      {
        id: 'CE-101',
        numeroInstrumento: '2024/0987-SEINFRA',
        objeto: 'Construção de Ponte sobre Rio Ceará',
        instituicao: 'SEINFRA',
        valorGlobal: 2500000,
        percentualExecucao: 38,
        vigenciaFim: '2024-12-15',
        vigenciaInicio: '2024-01-01',
        status: 'Em Execução',
        medicoesRealizadas: 2,
        totalMedicoes: 5,
        temIrregularidade: false
      },
      {
        id: 'CE-102',
        numeroInstrumento: '2023/0654-SOP',
        objeto: 'Recapeamento de Vias Urbanas',
        instituicao: 'SOP',
        valorGlobal: 1800000,
        percentualExecucao: 15,
        vigenciaFim: '2024-07-20',
        vigenciaInicio: '2023-07-01',
        status: 'Inadimplente',
        medicoesRealizadas: 1,
        totalMedicoes: 4,
        temIrregularidade: true
      }
    ],
    federais: [
      {
        id: 'BR-101',
        numeroConvenio: '945678/2024',
        ministerio: 'MEC/FNDE',
        objeto: 'Construção de 3 Escolas de Ensino Fundamental',
        valorGlobal: 6200000,
        situacaoEmpenho: 'Empenhado',
        clausulasSuspensivas: true,
        motivoSuspensao: 'Aguardando regularização cadastral no SICONV',
        vigenciaFim: '2025-08-30',
        vigenciaInicio: '2024-01-01',
        status: 'Suspenso',
        temIrregularidade: true
      },
      {
        id: 'BR-102',
        numeroConvenio: '934567/2023',
        ministerio: 'Ministério da Saúde',
        objeto: 'Aquisição de Ambulâncias e Equipamentos',
        valorGlobal: 1200000,
        situacaoEmpenho: 'Pago',
        clausulasSuspensivas: false,
        vigenciaFim: '2024-09-10',
        vigenciaInicio: '2023-09-01',
        status: 'Em Execução',
        temIrregularidade: false
      }
    ]
  },
  maracanau: {
    kpis: {
      totalConvenios: 15,
      valorTotal: 28300000,
      recursosReceber: 9800000,
      contrapartidasPendentes: 1800000,
      vigenciasProximasFim: 2
    },
    estaduais: [
      {
        id: 'CE-201',
        numeroInstrumento: '2024/0321-SEINFRA',
        objeto: 'Construção de Complexo Esportivo',
        instituicao: 'SEINFRA',
        valorGlobal: 3200000,
        percentualExecucao: 72,
        vigenciaFim: '2024-11-30',
        vigenciaInicio: '2024-01-01',
        status: 'Em Execução',
        medicoesRealizadas: 5,
        totalMedicoes: 7,
        temIrregularidade: false
      }
    ],
    federais: [
      {
        id: 'BR-201',
        numeroConvenio: '956789/2024',
        ministerio: 'Ministério das Cidades',
        objeto: 'Implantação de Sistema de Esgotamento Sanitário',
        valorGlobal: 15000000,
        situacaoEmpenho: 'Liquidado',
        clausulasSuspensivas: false,
        vigenciaFim: '2025-10-15',
        vigenciaInicio: '2024-01-01',
        status: 'Em Execução',
        temIrregularidade: false
      },
      {
        id: 'BR-202',
        numeroConvenio: '967890/2023',
        ministerio: 'Ministério do Desenvolvimento Social',
        objeto: 'Construção de Centro de Referência de Assistência Social',
        valorGlobal: 980000,
        situacaoEmpenho: 'Pago',
        clausulasSuspensivas: false,
        vigenciaFim: '2024-12-20',
        vigenciaInicio: '2023-12-01',
        status: 'Em Execução',
        temIrregularidade: false
      }
    ]
  },
  sobral: {
    kpis: {
      totalConvenios: 18,
      valorTotal: 35600000,
      recursosReceber: 11200000,
      contrapartidasPendentes: 2300000,
      vigenciasProximasFim: 1
    },
    estaduais: [
      {
        id: 'CE-301',
        numeroInstrumento: '2024/0444-SESA',
        objeto: 'Ampliação da Rede de Atenção Primária',
        instituicao: 'SESA',
        valorGlobal: 2800000,
        percentualExecucao: 88,
        vigenciaFim: '2024-10-10',
        vigenciaInicio: '2024-01-01',
        status: 'Em Execução',
        medicoesRealizadas: 7,
        totalMedicoes: 8,
        temIrregularidade: false
      }
    ],
    federais: [
      {
        id: 'BR-301',
        numeroConvenio: '978901/2024',
        ministerio: 'Ministério da Saúde',
        objeto: 'Construção de Hospital Regional de Alta Complexidade',
        valorGlobal: 25000000,
        situacaoEmpenho: 'Liquidado',
        clausulasSuspensivas: false,
        vigenciaFim: '2026-03-30',
        vigenciaInicio: '2024-01-01',
        status: 'Em Execução',
        temIrregularidade: false
      }
    ]
  }
};