import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Building2,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  FileText,
  Clock,
  CheckCircle2,
  MessageSquare,
  Receipt,
  FileCheck,
  BarChart3,
  Download,
  Eye,
  Edit,
  Plus,
  X,
  ExternalLink,
  Upload,
  Trash2,
  Save,
  FileSignature,
  Wallet,
  FolderOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CONVENIOS_DATA, calcularDiasRestantes, formatarMoeda } from '../../lib/convenios-data';

interface ConvenioDetalhamentoProps {
  convenioId: string;
  onBack: () => void;
}

export default function ConvenioDetalhamento({ convenioId, onBack }: ConvenioDetalhamentoProps) {
  const [abaAtiva, setAbaAtiva] = useState('informacoes');
  const [modalNupAberto, setModalNupAberto] = useState(false);
  const [nupEditando, setNupEditando] = useState<any>(null);
  const [nups, setNups] = useState<any[]>([
    {
      id: '1',
      numero: '23080.000123/2024-45',
      tipoProcesso: 'Prestação de Contas',
      dataProtocolo: '2024-01-15',
      unidadeResponsavel: 'Secretaria de Fazenda',
      situacao: 'Em andamento',
      ultimaMovimentacao: '2024-03-10',
      linkProcesso: 'https://suite.gov.br/processo/23080.000123/2024-45',
      observacao: 'Aguardando análise da documentação complementar'
    }
  ]);

  // Estados para PCF
  const [pcfData, setPcfData] = useState({
    situacao: 'Não iniciada',
    dataEnvio: '',
    prazoEnvio: '2024-12-31',
    banco: 'Banco do Brasil',
    agencia: '1234-5',
    conta: '98765-4',
    documentos: [
      { id: '1', nome: 'Extrato da conta bancária específica', situacao: 'Pendente', arquivo: null },
      { id: '2', nome: 'Termo de encerramento', situacao: 'Pendente', arquivo: null },
      { id: '3', nome: 'Comprovante de recolhimento de saldo remanescente', situacao: 'Pendente', arquivo: null }
    ],
    observacoes: ''
  });

  // Estados para Termos Aditivos
  const [modalTermosAberto, setModalTermosAberto] = useState(false);
  const [termoEditando, setTermoEditando] = useState<any>(null);
  const [termosAditivos, setTermosAditivos] = useState<any[]>([
    {
      id: '1',
      tipoAditivo: 'Prorrogação de Vigência',
      dataSolicitacao: '2024-02-15',
      novaVigenciaProposta: '2025-12-31',
      situacao: 'Em análise',
      dataAprovacao: '',
      nupProcesso: '23080.000234/2024-12',
      observacoes: 'Solicitação de prorrogação devido ao atraso na entrega de materiais'
    }
  ]);

  // Estados para Contrapartidas
  const [modalAporteAberto, setModalAporteAberto] = useState(false);
  const [aporteEditando, setAporteEditando] = useState<any>(null);
  const [aportes, setAportes] = useState<any[]>([
    {
      id: '1',
      dataAporte: '2024-01-20',
      valor: 50000,
      comprovante: 'Comprovante_Aporte_Jan2024.pdf',
      status: 'Confirmado',
      observacao: 'Aporte inicial conforme previsto no plano de trabalho'
    },
    {
      id: '2',
      dataAporte: '2024-02-15',
      valor: 30000,
      comprovante: 'Comprovante_Aporte_Fev2024.pdf',
      status: 'Confirmado',
      observacao: 'Segunda parcela da contrapartida'
    }
  ]);

  // Aportes programados (para alertas de contrapartida)
  const aportesPrevistos = [
    { id: '3', dataPrevista: '2024-03-28', valor: 20000, status: 'Pendente' }, // A vencer em 7 dias
    { id: '4', dataPrevista: '2024-04-15', valor: 25000, status: 'Pendente' },
    { id: '5', dataPrevista: '2024-03-15', valor: 15000, status: 'Vencido' }    // Vencido
  ];

  // Estados para Execução Financeira
  const [modalExecucaoAberto, setModalExecucaoAberto] = useState(false);
  const [execucaoEditando, setExecucaoEditando] = useState<any>(null);
  const [registrosExecucao, setRegistrosExecucao] = useState<any[]>([
    {
      id: '1',
      data: '2024-01-15',
      repasseFeito: 100000,
      contrapartidaAportada: 50000,
      obtPagamentosRealizados: 80000,
      saldoEmConta: 70000,
      arquivo: 'Extrato_Jan2024.pdf',
      observacao: 'Primeiro repasse do convênio'
    },
    {
      id: '2',
      data: '2024-02-20',
      repasseFeito: 150000,
      contrapartidaAportada: 30000,
      obtPagamentosRealizados: 120000,
      saldoEmConta: 130000,
      arquivo: 'Extrato_Fev2024.pdf',
      observacao: 'Segunda parcela do repasse'
    }
  ]);

  // Estados para Ocorrências
  const [modalOcorrenciaAberto, setModalOcorrenciaAberto] = useState(false);
  const [ocorrencias, setOcorrencias] = useState<any[]>([
    {
      id: '1',
      data: '2024-02-10',
      descricao: 'Solicitação de documentação complementar para análise da prestação de contas',
      prazoResposta: '2024-02-25',
      documentoSolicitado: 'Comprovantes_Adicionais.pdf',
      status: 'Respondida',
      dataResposta: '2024-02-22'
    },
    {
      id: '2',
      data: '2024-03-05',
      descricao: 'Esclarecimentos sobre divergências nos valores executados',
      prazoResposta: '2024-03-20',
      documentoSolicitado: null,
      status: 'Pendente',
      dataResposta: null
    }
  ]);

  // Buscar o convênio nos dados (procura em estaduais e federais)
  const convenio = React.useMemo(() => {
    for (const cityData of Object.values(CONVENIOS_DATA)) {
      const estadual = cityData.estaduais.find(c => c.id === convenioId);
      if (estadual) return { ...estadual, tipo: 'estadual' as const };

      const federal = cityData.federais.find(c => c.id === convenioId);
      if (federal) return { ...federal, tipo: 'federal' as const };
    }
    return null;
  }, [convenioId]);

  if (!convenio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e8f3ef] via-[#f0f7f4] to-[#e1ede8] p-8">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
            <p className="text-lg">Convênio não encontrado</p>
            <Button onClick={() => onBack()} className="mt-4">
              Voltar para Convênios
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const diasRestantes = calcularDiasRestantes(convenio.vigenciaFim);
  const isEstadual = convenio.tipo === 'estadual';
  const numeroConvenio = isEstadual ? (convenio as any).numeroInstrumento : (convenio as any).numeroConvenio;
  const instituicao = isEstadual ? (convenio as any).instituicao : (convenio as any).ministerio;

  // Cálculos da Contrapartida
  const valorTotalContrapartida = isEstadual && (convenio as any).valorAtualizadoContrapartida
    ? (convenio as any).valorAtualizadoContrapartida
    : 150000;
  const valorAportado = aportes.reduce((acc, aporte) => acc + aporte.valor, 0);
  const saldoAportar = valorTotalContrapartida - valorAportado;
  const percentualExecutadoContrapartida = Math.round((valorAportado / valorTotalContrapartida) * 100);
  const statusContrapartida = percentualExecutadoContrapartida >= 100
    ? 'Completo'
    : percentualExecutadoContrapartida >= 50
      ? 'Em dia'
      : 'Atrasado';

  // Cálculo de alertas de contrapartida
  const hoje = new Date('2024-03-21'); // Data atual do sistema
  const aportesVencidos = aportesPrevistos.filter(a => {
    const dataPrev = new Date(a.dataPrevista);
    return dataPrev < hoje && a.status === 'Pendente';
  });
  const aportesAVencer = aportesPrevistos.filter(a => {
    const dataPrev = new Date(a.dataPrevista);
    const diffDias = Math.ceil((dataPrev.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    return diffDias >= 0 && diffDias <= 10 && a.status === 'Pendente';
  });

  const alertaContrapartida = aportesVencidos.length > 0
    ? { tipo: 'vencido', qtd: aportesVencidos.length, label: `${aportesVencidos.length} aporte(s) vencido(s)` }
    : aportesAVencer.length > 0
      ? { tipo: 'a-vencer', qtd: aportesAVencer.length, label: `${aportesAVencer.length} aporte(s) a vencer em 10 dias` }
      : { tipo: 'no-prazo', qtd: 0, label: 'Todos os aportes no prazo' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f3ef] via-[#f0f7f4] to-[#e1ede8]">
      {/* Header Fixo */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="w-full px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBack()}
                className="hover:bg-[#e8f3ef]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div className="h-8 w-px bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{numeroConvenio}</h1>
                <p className="text-sm text-gray-500">
                  Convênio {isEstadual ? 'Estadual' : 'Federal'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {convenio.status === 'ativo' && (
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Ativo
                </Badge>
              )}
              {convenio.temIrregularidade && (
                <Badge className="bg-red-100 text-red-800 border-red-300">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Com Irregularidade
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Resumo Crítico Horizontal */}
      <div className="w-full px-4 md:px-6 lg:px-8 pt-6">
        <Card className="border-[#2e6a50] shadow-sm mb-6">
          <CardHeader className="bg-gradient-to-r from-[#2e6a50] to-[#1a3e3e] text-white py-3">
            <CardTitle className="text-lg">Resumo Crítico</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-center">
              {/* Valor Total */}
              <div className="lg:border-r lg:pr-6">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-500">Valor Global</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{formatarMoeda(convenio.valorGlobal)}</p>
              </div>

              {/* Execução Financeira */}
              <div className="lg:border-r lg:pr-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-500">Execução Financeira</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Executado</span>
                    <span className="text-sm font-bold text-gray-900">
                      {formatarMoeda((convenio.valorGlobal * convenio.percentualExecucao) / 100)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#2e6a50] to-[#3d8b64] transition-all"
                      style={{ width: `${convenio.percentualExecucao}%` }}
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#2e6a50]">{convenio.percentualExecucao}%</span>
                  </div>
                </div>
              </div>

              {/* Status de Vigência */}
              <div className="lg:border-r lg:pr-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-500">Status de Vigência</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Término</span>
                    <span className="font-medium text-gray-900">
                      {new Date(convenio.vigenciaFim).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className={`px-2 py-1 rounded text-center text-xs font-medium ${diasRestantes < 0
                    ? 'bg-red-100 text-red-800'
                    : diasRestantes < 60
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                    }`}>
                    {diasRestantes > 0 ? `${diasRestantes} dias restantes` : 'Convênio Vencido'}
                  </div>
                </div>
              </div>

              {/* Contrapartida Municipal */}
              <div className="lg:border-r lg:pr-6">
                <div className="flex items-center gap-2 mb-3">
                  <Wallet className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-500">Contrapartida Municipal</span>
                </div>
                <div className="space-y-2">
                  <div className={`px-3 py-2 rounded-lg text-center ${alertaContrapartida.tipo === 'vencido'
                    ? 'bg-red-100 border border-red-300'
                    : alertaContrapartida.tipo === 'a-vencer'
                      ? 'bg-yellow-100 border border-yellow-300'
                      : 'bg-green-100 border border-green-300'
                    }`}>
                    {alertaContrapartida.tipo === 'vencido' ? (
                      <AlertTriangle className="w-5 h-5 text-red-700 mx-auto mb-1" />
                    ) : alertaContrapartida.tipo === 'a-vencer' ? (
                      <Clock className="w-5 h-5 text-yellow-700 mx-auto mb-1" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-700 mx-auto mb-1" />
                    )}
                    <p className={`text-xs font-semibold ${alertaContrapartida.tipo === 'vencido'
                      ? 'text-red-800'
                      : alertaContrapartida.tipo === 'a-vencer'
                        ? 'text-yellow-800'
                        : 'text-green-800'
                      }`}>
                      {alertaContrapartida.label}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ações Rápidas */}
              <div className="flex items-center justify-center">
                <Button size="sm" className="w-full bg-[#2e6a50] hover:bg-[#1a3e3e]">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Abrir Chamado
                </Button>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo Principal (Abas) */}
      <div className="w-full px-4 md:px-6 lg:px-8 pb-6 md:pb-8">
        <Tabs value={abaAtiva} onValueChange={setAbaAtiva} className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8 bg-white shadow-sm rounded-lg border border-gray-100 p-1">
            <TabsTrigger
              value="informacoes"
              className="data-[state=active]:bg-[#2e6a50] data-[state=active]:text-white text-xs py-2 rounded-md transition-all"
            >
              <FileText className="w-4 h-4 mr-2" />
              Informações Gerais
            </TabsTrigger>
            <TabsTrigger
              value="contrapartidas"
              className="data-[state=active]:bg-[#2e6a50] data-[state=active]:text-white text-xs py-2 rounded-md transition-all"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Contrapartidas
            </TabsTrigger>
            <TabsTrigger
              value="refo"
              className="data-[state=active]:bg-[#2e6a50] data-[state=active]:text-white text-xs py-2 rounded-md transition-all"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              REFO
            </TabsTrigger>
            <TabsTrigger
              value="extratos"
              className="data-[state=active]:bg-[#2e6a50] data-[state=active]:text-white text-xs py-2 rounded-md transition-all"
            >
              <Receipt className="w-4 h-4 mr-2" />
              Extratos
            </TabsTrigger>
            <TabsTrigger
              value="execucao-financeira"
              className="data-[state=active]:bg-[#2e6a50] data-[state=active]:text-white text-xs py-2 rounded-md transition-all"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Execução Financeira
            </TabsTrigger>
            <TabsTrigger
              value="nup"
              className="data-[state=active]:bg-[#2e6a50] data-[state=active]:text-white text-xs py-2 rounded-md transition-all"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              NUP
            </TabsTrigger>
            <TabsTrigger
              value="ocorrencias"
              className="data-[state=active]:bg-[#2e6a50] data-[state=active]:text-white text-xs py-2 rounded-md transition-all"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Ocorrências
            </TabsTrigger>
            <TabsTrigger
              value="pcf"
              className="data-[state=active]:bg-[#2e6a50] data-[state=active]:text-white text-xs py-2 rounded-md transition-all"
            >
              <FileCheck className="w-4 h-4 mr-2" />
              PCF
            </TabsTrigger>
          </TabsList>

          {/* Aba: Informações Gerais */}
          <TabsContent value="informacoes" className="space-y-6">
            {/* 🏛️ Partes do Convênio */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-[#e8f3ef] to-white">
                <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                  <Building2 className="w-5 h-5 text-[#2e6a50]" />
                  Partes do Convênio
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Concedente (Estado) */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-700 border-b pb-2">Concedente</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Órgão Concedente</label>
                        <p className="text-base font-semibold text-gray-900">
                          {isEstadual && (convenio as any).orgaoConcedente
                            ? (convenio as any).orgaoConcedente
                            : instituicao}
                        </p>
                      </div>
                      {isEstadual && (convenio as any).unidadeConcedente && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Unidade</label>
                          <p className="text-base text-gray-900">{(convenio as any).unidadeConcedente}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Conveniado (Município) */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-700 border-b pb-2">Convenente</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Nome</label>
                        <p className="text-base font-semibold text-gray-900">
                          {isEstadual && (convenio as any).nomeConveniado
                            ? (convenio as any).nomeConveniado
                            : 'Prefeitura Municipal'}
                        </p>
                      </div>
                      {isEstadual && (convenio as any).cnpjConveniado && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">CNPJ</label>
                          <p className="text-base text-gray-900">{(convenio as any).cnpjConveniado}</p>
                        </div>
                      )}
                      {isEstadual && (convenio as any).localidade && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Localidade</label>
                          <p className="text-base text-gray-900">{(convenio as any).localidade}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 🆔 Identificação do Convênio */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-[#e8f3ef] to-white">
                <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                  <FileText className="w-5 h-5 text-[#2e6a50]" />
                  Identificação do Convênio
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500 block">
                      Número do {isEstadual ? 'Convênio' : 'Convênio'}
                    </label>
                    <p className="text-base font-bold text-[#2e6a50]">{numeroConvenio}</p>
                  </div>
                  {isEstadual && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 block">Nº do MAPP</label>
                      <p className="text-base font-semibold text-gray-900">MAPP-2024-{convenio.id.slice(4, 8).toUpperCase()}</p>
                    </div>
                  )}
                  {isEstadual && (convenio as any).numeroSACC && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 block">Número SACC</label>
                      <p className="text-base font-semibold text-gray-900">{(convenio as any).numeroSACC}</p>
                    </div>
                  )}
                  {isEstadual && (convenio as any).codigoPlanoTrabalho && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 block">Código Plano de Trabalho</label>
                      <p className="text-base font-semibold text-gray-900">{(convenio as any).codigoPlanoTrabalho}</p>
                    </div>
                  )}
                </div>

                {/* Documentos do Convênio */}
                <div className="pt-6 border-t">
                  <h3 className="text-sm font-bold text-gray-700 mb-4">Documentos do Convênio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-[#e8f3ef] hover:border-[#2e6a50]"
                      onClick={() => window.open('#', '_blank')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar Íntegra do Convênio
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-[#e8f3ef] hover:border-[#2e6a50]"
                      onClick={() => {/* Download logic */ }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Íntegra do Convênio
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-[#e8f3ef] hover:border-[#2e6a50]"
                      onClick={() => window.open('#', '_blank')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar Plano de Trabalho
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-[#e8f3ef] hover:border-[#2e6a50]"
                      onClick={() => {/* Download logic */ }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Plano de Trabalho
                    </Button>
                  </div>
                </div>

                {/* Situações e Status - Ajustado para Alinhamento Vertical */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
                  {isEstadual && (convenio as any).tipoObjeto && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 block">Tipo de Objeto</label>
                      <p className="text-base text-gray-900">{(convenio as any).tipoObjeto}</p>
                    </div>
                  )}

                  {isEstadual && (convenio as any).situacaoPrestacaoContas && (
                    <div className="flex flex-col items-start gap-1">
                      <label className="text-sm font-medium text-gray-500">Situação da Prestação de Contas</label>
                      <Badge className={
                        (convenio as any).situacaoPrestacaoContas === 'Em Dia'
                          ? 'bg-green-100 text-green-800 border-green-300 shadow-none'
                          : 'bg-yellow-100 text-yellow-800 border-yellow-300 shadow-none'
                      }>
                        {(convenio as any).situacaoPrestacaoContas}
                      </Badge>
                    </div>
                  )}

                  {isEstadual && (convenio as any).situacaoFisica && (
                    <div className="flex flex-col items-start gap-1">
                      <label className="text-sm font-medium text-gray-500">Situação Física</label>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300 shadow-none">
                        {(convenio as any).situacaoFisica}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <label className="text-sm font-medium text-gray-500 block">Objeto do Convênio</label>
                  <p className="text-base text-gray-900 leading-relaxed">{convenio.objeto}</p>
                </div>

                {isEstadual && (convenio as any).justificativa && (
                  <div className="pt-4 border-t">
                    <label className="text-sm font-medium text-gray-500 block">Justificativa</label>
                    <p className="text-base text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                      {(convenio as any).justificativa}
                    </p>
                  </div>
                )}

                {/* Dados Bancários do Convênio */}
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-bold text-gray-700 mb-4">Dados Bancários do Convênio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 block">Banco</label>
                      <p className="text-base font-semibold text-gray-900">{pcfData.banco}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 block">Agência</label>
                      <p className="text-base font-semibold text-gray-900">{pcfData.agencia}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 block">Conta</label>
                      <p className="text-base font-semibold text-gray-900">{pcfData.conta}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 📅 Datas e Prazos */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-[#e8f3ef] to-white">
                <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                  <Calendar className="w-5 h-5 text-[#2e6a50]" />
                  Datas e Prazos
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {isEstadual && (convenio as any).dataAssinatura && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 block">Data de Assinatura</label>
                      <p className="text-base font-semibold text-gray-900">
                        {new Date((convenio as any).dataAssinatura).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-500 block">Vigência Início</label>
                    <p className="text-base font-semibold text-gray-900">
                      {new Date(convenio.vigenciaInicio).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 block">Vigência Fim</label>
                    <p className="text-base font-semibold text-gray-900">
                      {new Date(convenio.vigenciaFim).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  {isEstadual && (convenio as any).terminoOriginal && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 block">Término Original</label>
                      <p className="text-base text-gray-900">
                        {new Date((convenio as any).terminoOriginal).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  )}
                  {isEstadual && (convenio as any).terminoAposAditivo && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 block">Término Após Aditivo</label>
                      <p className="text-base font-semibold text-blue-600">
                        {new Date((convenio as any).terminoAposAditivo).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  )}
                  {isEstadual && (convenio as any).dataRescisao && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 block">Data de Rescisão</label>
                      <p className="text-base font-semibold text-red-600">
                        {new Date((convenio as any).dataRescisao).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  {isEstadual && (convenio as any).publicacaoPortal && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 block">Publicação no Portal</label>
                      <p className="text-base text-gray-900">
                        {new Date((convenio as any).publicacaoPortal).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  )}

                  {/* Alinhamento do Status "Vence em" */}
                  <div className="flex flex-col items-start gap-1">
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm ${diasRestantes < 0
                      ? 'bg-red-100 text-red-800'
                      : diasRestantes < 60
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                      }`}>
                      <Clock className="w-4 h-4" />
                      {diasRestantes > 0 ? `${diasRestantes} dias` : 'Vencido'}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t mt-6 flex justify-end">
                  <Button
                    className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                    onClick={() => setModalTermosAberto(true)}
                  >
                    <FileSignature className="w-4 h-4 mr-2" />
                    Detalhamento da Vigência e Termos Aditivos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 💰 Valores Financeiros */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-[#e8f3ef] to-white">
                <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                  <DollarSign className="w-5 h-5 text-[#2e6a50]" />
                  Valores Financeiros
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Grid Principal: 3 colunas iguais no Desktop para manter a proporção */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  {/* CARD 1: Valor Original / Global */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col justify-between">
                    <label className="text-sm font-medium text-gray-500">
                      {isEstadual ? "Valor Original" : "Valor Global"}
                    </label>
                    <p className="text-xl font-bold text-gray-900">
                      {formatarMoeda(isEstadual ? (convenio as any).valorOriginal : convenio.valorGlobal)}
                    </p>
                  </div>

                  {/* CARD 2: Valor Atualizado Total (Lógica para manter o card mesmo se não houver dado) */}
                  <div className={`p-4 rounded-lg border-2 flex flex-col justify-between ${isEstadual && (convenio as any).valorAtualizadoTotal
                    ? "bg-blue-50 border-blue-200"
                    : "bg-gray-50 border-gray-100 opacity-60"
                    }`}>
                    <label className={`text-sm font-medium ${isEstadual ? "text-blue-700" : "text-gray-500"}`}>
                      Valor Atualizado Total
                    </label>
                    <p className={`text-xl font-bold ${isEstadual ? "text-blue-900" : "text-gray-900"}`}>
                      {isEstadual && (convenio as any).valorAtualizadoTotal
                        ? formatarMoeda((convenio as any).valorAtualizadoTotal)
                        : formatarMoeda(convenio.valorGlobal) /* Fallback para Federal */}
                    </p>
                  </div>

                  {/* CARD 3: Contrapartida Paga */}
                  <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200 flex flex-col justify-between">
                    <div>
                      <label className="text-sm font-medium text-purple-700">Contrapartida Paga</label>
                      <p className="text-xl font-bold text-purple-900">
                        {formatarMoeda(valorAportado)}
                      </p>
                    </div>
                    <p className="text-xs text-purple-600 mt-1">{percentualExecutadoContrapartida}% realizado</p>
                  </div>
                </div>

                {/* Seção Secundária: Detalhamento de Repasse e Contrapartida (Apenas Estadual) */}
                {isEstadual && (convenio as any).valorAtualizadoRepasse && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <label className="text-sm font-medium text-green-700">Valor Atualizado Repasse</label>
                      <p className="text-xl font-bold text-green-900">
                        {formatarMoeda((convenio as any).valorAtualizadoRepasse)}
                      </p>
                      <p className="text-xs text-green-600 mt-1">Recursos do Estado</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                      <label className="text-sm font-medium text-orange-700">Valor Atualizado Contrapartida</label>
                      <p className="text-xl font-bold text-orange-900">
                        {formatarMoeda((convenio as any).valorAtualizadoContrapartida || 0)}
                      </p>
                      <p className="text-xs text-orange-600 mt-1">Recursos da Prefeitura</p>
                    </div>
                  </div>
                )}

                {/* Seção de Fluxo: Liberado vs Executado */}
                {isEstadual && (convenio as any).valorLiberado !== undefined && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <label className="text-sm font-medium text-purple-700">Valor Liberado</label>
                      <p className="text-xl font-bold text-purple-900">
                        {formatarMoeda((convenio as any).valorLiberado)}
                      </p>
                      <p className="text-xs text-purple-600 mt-1">Transferido para conta do convênio</p>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                      <label className="text-sm font-medium text-teal-700">Valor Executado</label>
                      <p className="text-xl font-bold text-teal-900">
                        {formatarMoeda((convenio as any).valorExecutado || 0)}
                      </p>
                      <p className="text-xs text-teal-600 mt-1">Pago aos fornecedores</p>
                    </div>
                  </div>
                )}

                {/* Gráfico de Execução Financeira */}
                <div className="mt-6 pt-6 border-t">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Execução Financeira ({convenio.percentualExecucao}%)
                  </label>
                  <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#2e6a50] to-[#3d8b64] transition-all duration-500 flex items-center justify-end pr-3"
                      style={{ width: `${convenio.percentualExecucao}%` }}
                    >
                      <span className="text-xs font-bold text-white drop-shadow">
                        {convenio.percentualExecucao}%
                      </span>
                    </div>
                  </div>
                  {isEstadual && (convenio as any).valorAtualizadoTotal && (convenio as any).valorExecutado !== undefined && (
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>Executado: {formatarMoeda((convenio as any).valorExecutado)}</span>
                      <span>Total: {formatarMoeda((convenio as any).valorAtualizadoTotal)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Execução Física */}
            {isEstadual && (convenio as any).medicoesRealizadas !== undefined && (
              <Card>
                <CardHeader className="bg-gradient-to-r from-[#e8f3ef] to-white">
                  <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                    <TrendingUp className="w-5 h-5 text-[#2e6a50]" />
                    Execução Física
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Medições Realizadas</span>
                        <span className="text-lg font-bold text-gray-900">
                          {(convenio as any).medicoesRealizadas} de {(convenio as any).totalMedicoes}
                        </span>
                      </div>
                      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#2e6a50] to-[#3d8b64] transition-all"
                          style={{
                            width: `${((convenio as any).medicoesRealizadas / (convenio as any).totalMedicoes) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empenhos (Federais) */}
            {!isEstadual && (convenio as any).empenhos && (
              <Card>
                <CardHeader className="bg-gradient-to-r from-[#e8f3ef] to-white">
                  <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                    <Receipt className="w-5 h-5 text-[#2e6a50]" />
                    Empenhos
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {(convenio as any).empenhos.map((empenho: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div>
                          <p className="font-medium text-gray-900">{empenho.numero}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(empenho.data).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 text-lg">{formatarMoeda(empenho.valor)}</p>
                          <Badge variant={empenho.status === 'Liquidado' ? 'default' : 'secondary'} className="mt-1">
                            {empenho.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Alertas */}
            {convenio.temIrregularidade && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Este convênio apresenta irregularidades que impedem o prosseguimento normal da execução.
                  Verifique a aba de Ocorrências para mais detalhes.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          {/* Aba: Contrapartidas */}
          <TabsContent value="contrapartidas" className="space-y-6">
            {/* Cards KPI de Contrapartida */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Valor Total</p>
                    <p className="text-2xl font-bold text-[#2e6a50]">
                      {formatarMoeda(valorTotalContrapartida)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Valor Aportado</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatarMoeda(valorAportado)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Saldo a Aportar</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatarMoeda(saldoAportar)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Percentual Executado</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {percentualExecutadoContrapartida}%
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Status</p>
                    <Badge className={
                      statusContrapartida === 'Completo'
                        ? 'bg-green-100 text-green-800 border-green-300 text-lg px-4 py-1'
                        : statusContrapartida === 'Em dia'
                          ? 'bg-blue-100 text-blue-800 border-blue-300 text-lg px-4 py-1'
                          : 'bg-red-100 text-red-800 border-red-300 text-lg px-4 py-1'
                    }>
                      {statusContrapartida}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Aportes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-[#2e6a50]" />
                    Aportes de Contrapartida
                  </CardTitle>
                  <Button
                    className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                    onClick={() => {
                      setAporteEditando(null);
                      setModalAporteAberto(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Registrar Aporte
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {aportes.length > 0 ? (
                  <div className="space-y-3">
                    {aportes.map((aporte) => (
                      <div key={aporte.id} className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <p className="text-lg font-bold text-[#2e6a50]">
                                {formatarMoeda(aporte.valor)}
                              </p>
                              <Badge className={
                                aporte.status === 'Confirmado'
                                  ? 'bg-green-100 text-green-800 border-green-300'
                                  : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                              }>
                                {aporte.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              {new Date(aporte.dataAporte).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {aporte.comprovante && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="hover:bg-[#e8f3ef] hover:border-[#2e6a50]"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  Ver
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="hover:bg-[#e8f3ef] hover:border-[#2e6a50]"
                                >
                                  <Download className="w-4 h-4 mr-1" />
                                  Baixar
                                </Button>
                              </>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-[#e8f3ef] hover:border-[#2e6a50]"
                              onClick={() => {
                                setAporteEditando(aporte);
                                setModalAporteAberto(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {aporte.observacao && (
                          <p className="text-sm text-gray-700 bg-white p-3 rounded mt-2 border border-gray-200">
                            {aporte.observacao}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Wallet className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Nenhum aporte registrado</p>
                    <p className="text-sm mt-2">
                      Registre os aportes de contrapartida realizados pelo município
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Modal de Registro de Aporte */}
            <Dialog open={modalAporteAberto} onOpenChange={setModalAporteAberto}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-[#2e6a50]">
                    {aporteEditando ? 'Editar Aporte' : 'Registrar Novo Aporte'}
                  </DialogTitle>
                  <DialogDescription>
                    Informe os dados do aporte de contrapartida realizado
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dataAporte">Data do Aporte *</Label>
                      <Input
                        id="dataAporte"
                        type="date"
                        defaultValue={aporteEditando?.dataAporte}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="valorAporte">Valor *</Label>
                      <Input
                        id="valorAporte"
                        type="number"
                        placeholder="0,00"
                        defaultValue={aporteEditando?.valor}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="statusAporte">Status *</Label>
                    <Select defaultValue={aporteEditando?.status || 'Pendente'}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                        <SelectItem value="Em análise">Em análise</SelectItem>
                        <SelectItem value="Confirmado">Confirmado</SelectItem>
                        <SelectItem value="Rejeitado">Rejeitado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comprovante">Comprovante</Label>
                    <div className="flex gap-2">
                      <Input
                        id="comprovante"
                        type="text"
                        placeholder="Nome do arquivo"
                        defaultValue={aporteEditando?.comprovante}
                        disabled
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="hover:bg-[#e8f3ef] hover:border-[#2e6a50]"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observacaoAporte">Observação</Label>
                    <Textarea
                      id="observacaoAporte"
                      placeholder="Informações complementares sobre o aporte..."
                      rows={3}
                      defaultValue={aporteEditando?.observacao}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setModalAporteAberto(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                    onClick={() => {
                      setModalAporteAberto(false);
                    }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Aporte
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Aba: NUP */}
          <TabsContent value="nup">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-[#2e6a50]" />
                    NUP - Números Únicos de Protocolo
                  </CardTitle>
                  <Button
                    className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                    onClick={() => {
                      setNupEditando(null);
                      setModalNupAberto(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar NUP
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {nups.length > 0 ? (
                  <div className="space-y-4">
                    {nups.map((nup: any) => (
                      <div key={nup.id} className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-[#2e6a50]">{nup.numero}</h3>
                              <Badge className={
                                nup.situacao === 'Concluído'
                                  ? 'bg-green-100 text-green-800 border-green-300'
                                  : nup.situacao === 'Em andamento'
                                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                                    : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                              }>
                                {nup.situacao}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium text-gray-700">{nup.tipoProcesso}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-[#e8f3ef] hover:border-[#2e6a50]"
                              onClick={() => {
                                setNupEditando(nup);
                                setModalNupAberto(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-red-50 hover:border-red-300"
                              onClick={() => setNups(nups.filter(n => n.id !== nup.id))}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <label className="text-xs font-medium text-gray-500">Data de Protocolo</label>
                            <p className="text-sm font-semibold text-gray-900">
                              {new Date(nup.dataProtocolo).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-500">Unidade Responsável</label>
                            <p className="text-sm font-semibold text-gray-900">{nup.unidadeResponsavel}</p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-500">Última Movimentação</label>
                            <p className="text-sm font-semibold text-gray-900">
                              {new Date(nup.ultimaMovimentacao).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>

                        {nup.observacao && (
                          <div className="mb-3">
                            <label className="text-xs font-medium text-gray-500">Observação</label>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg mt-1">{nup.observacao}</p>
                          </div>
                        )}

                        {nup.linkProcesso && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full justify-center hover:bg-[#e8f3ef] hover:border-[#2e6a50]"
                            onClick={() => window.open(nup.linkProcesso, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Consultar no Sistema SUITE
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Nenhum NUP cadastrado</p>
                    <p className="text-sm mt-2">
                      Cadastre os números únicos de protocolo relacionados ao convênio
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Modal de Cadastro/Edição de NUP */}
            <Dialog open={modalNupAberto} onOpenChange={setModalNupAberto}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-[#2e6a50]">
                    {nupEditando ? 'Editar NUP' : 'Cadastrar Novo NUP'}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha as informações do processo administrativo vinculado ao convênio
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="numero">Número do NUP *</Label>
                      <Input
                        id="numero"
                        placeholder="00000.000000/0000-00"
                        defaultValue={nupEditando?.numero}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tipoProcesso">Tipo de Processo *</Label>
                      <Select defaultValue={nupEditando?.tipoProcesso}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Prestação de Contas">Prestação de Contas</SelectItem>
                          <SelectItem value="Termo Aditivo">Termo Aditivo</SelectItem>
                          <SelectItem value="Liberação de Recursos">Liberação de Recursos</SelectItem>
                          <SelectItem value="Solicitação de Documentos">Solicitação de Documentos</SelectItem>
                          <SelectItem value="Regularização">Regularização</SelectItem>
                          <SelectItem value="Outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dataProtocolo">Data de Protocolo *</Label>
                      <Input
                        id="dataProtocolo"
                        type="date"
                        defaultValue={nupEditando?.dataProtocolo}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unidadeResponsavel">Unidade Responsável *</Label>
                      <Input
                        id="unidadeResponsavel"
                        placeholder="Ex: Secretaria de Fazenda"
                        defaultValue={nupEditando?.unidadeResponsavel}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="situacao">Situação *</Label>
                      <Select defaultValue={nupEditando?.situacao || 'Protocolado'}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a situação" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Protocolado">Protocolado</SelectItem>
                          <SelectItem value="Em andamento">Em andamento</SelectItem>
                          <SelectItem value="Em análise">Em análise</SelectItem>
                          <SelectItem value="Aguardando documentação">Aguardando documentação</SelectItem>
                          <SelectItem value="Concluído">Concluído</SelectItem>
                          <SelectItem value="Arquivado">Arquivado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ultimaMovimentacao">Última Movimentação</Label>
                      <Input
                        id="ultimaMovimentacao"
                        type="date"
                        defaultValue={nupEditando?.ultimaMovimentacao}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkProcesso">Link do Processo no SUITE</Label>
                    <Input
                      id="linkProcesso"
                      type="url"
                      placeholder="https://suite.gov.br/processo/..."
                      defaultValue={nupEditando?.linkProcesso}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observacao">Observação</Label>
                    <Textarea
                      id="observacao"
                      placeholder="Informações adicionais sobre o processo..."
                      rows={3}
                      defaultValue={nupEditando?.observacao}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setModalNupAberto(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                    onClick={() => {
                      // Lógica de salvamento
                      setModalNupAberto(false);
                    }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar NUP
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Aba: Execução Financeira */}
          <TabsContent value="execucao-financeira" className="space-y-6">
            <Card>
              <CardHeader className="bg-gradient-to-r from-[#e8f3ef] to-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                    <DollarSign className="w-5 h-5 text-[#2e6a50]" />
                    Registros de Execução Financeira
                  </CardTitle>
                  <Button
                    className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                    onClick={() => {
                      setExecucaoEditando(null);
                      setModalExecucaoAberto(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Incluir Registro
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {registrosExecucao.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Nenhum registro de execução financeira</p>
                    <p className="text-sm mt-2">
                      Clique em "Incluir Registro" para adicionar informações financeiras
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Totalizadores com o novo indicador Rendimento */}
                    <div className="bg-gradient-to-r from-[#e8f3ef] to-white p-4 rounded-lg border-2 border-[#2e6a50]">
                      <h3 className="text-sm font-bold text-[#1a3e3e] mb-3 uppercase tracking-wider">Resumo Consolidado</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="text-center border-r border-gray-200 last:border-0">
                          <label className="text-xs font-medium text-blue-700 block mb-1">Total Repasses</label>
                          <p className="text-lg font-bold text-blue-900">
                            {formatarMoeda(registrosExecucao.reduce((sum, r) => sum + r.repasseFeito, 0))}
                          </p>
                        </div>
                        <div className="text-center border-r border-gray-200 last:border-0">
                          <label className="text-xs font-medium text-purple-700 block mb-1">Total Contrapartida</label>
                          <p className="text-lg font-bold text-purple-900">
                            {formatarMoeda(registrosExecucao.reduce((sum, r) => sum + r.contrapartidaAportada, 0))}
                          </p>
                        </div>
                        <div className="text-center border-r border-gray-200 last:border-0">
                          <label className="text-xs font-medium text-orange-700 block mb-1">Total Pagamentos</label>
                          <p className="text-lg font-bold text-orange-900">
                            {formatarMoeda(registrosExecucao.reduce((sum, r) => sum + r.obtPagamentosRealizados, 0))}
                          </p>
                        </div>
                        {/* Novo Indicador: Rendimento */}
                        <div className="text-center border-r border-gray-200 last:border-0">
                          <label className="text-xs font-medium text-emerald-700 block mb-1">Rendimento</label>
                          <p className="text-lg font-bold text-emerald-900">
                            {formatarMoeda(registrosExecucao.reduce((sum, r) => sum + (r.rendimentoAplicacoes || 0), 0))}
                          </p>
                        </div>
                        <div className="text-center">
                          <label className="text-xs font-medium text-green-700 block mb-1">Saldo Atual</label>
                          <p className="text-lg font-bold text-green-900">
                            {formatarMoeda(registrosExecucao[registrosExecucao.length - 1]?.saldoEmConta || 0)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tabela de Registros */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left p-3 text-xs font-bold text-gray-700 border-b-2 border-[#2e6a50]">Data</th>
                            <th className="text-right p-3 text-xs font-bold text-gray-700 border-b-2 border-[#2e6a50]">Repasse Feito</th>
                            <th className="text-right p-3 text-xs font-bold text-gray-700 border-b-2 border-[#2e6a50]">Contrapartida Aportada</th>
                            <th className="text-right p-3 text-xs font-bold text-gray-700 border-b-2 border-[#2e6a50]">OBT - Pagamentos</th>
                            <th className="text-right p-3 text-xs font-bold text-gray-700 border-b-2 border-[#2e6a50]">Saldo em Conta</th>
                            <th className="text-center p-3 text-xs font-bold text-gray-700 border-b-2 border-[#2e6a50]">Arquivo</th>
                            <th className="text-center p-3 text-xs font-bold text-gray-700 border-b-2 border-[#2e6a50]">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {registrosExecucao.map((registro, index) => (
                            <tr key={registro.id} className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  <span className="font-semibold text-gray-900 text-sm">
                                    {new Date(registro.data).toLocaleDateString('pt-BR')}
                                  </span>
                                </div>
                                {registro.observacao && (
                                  <p className="text-xs text-gray-500 mt-1 italic">{registro.observacao}</p>
                                )}
                              </td>
                              <td className="p-3 text-right">
                                <span className="font-bold text-blue-700 text-sm">
                                  {formatarMoeda(registro.repasseFeito)}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <span className="font-bold text-purple-700 text-sm">
                                  {formatarMoeda(registro.contrapartidaAportada)}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <span className="font-bold text-orange-700 text-sm">
                                  {formatarMoeda(registro.obtPagamentosRealizados)}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <span className="font-bold text-green-700 text-sm">
                                  {formatarMoeda(registro.saldoEmConta)}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                {registro.arquivo ? (
                                  <Button size="sm" variant="ghost" className="text-xs">
                                    <Download className="w-3 h-3 mr-1" />
                                    Baixar
                                  </Button>
                                ) : (
                                  <span className="text-xs text-gray-400">-</span>
                                )}
                              </td>
                              <td className="p-3">
                                <div className="flex gap-1 justify-center">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setExecucaoEditando(registro);
                                      setModalExecucaoAberto(true);
                                    }}
                                    className="h-7 px-2"
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => {
                                      setRegistrosExecucao(registrosExecucao.filter(r => r.id !== registro.id));
                                    }}
                                    className="h-7 px-2"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Modal de Inclusão/Edição de Registro */}
            <Dialog open={modalExecucaoAberto} onOpenChange={setModalExecucaoAberto}>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {execucaoEditando ? 'Editar Registro' : 'Incluir Novo Registro'} de Execução Financeira
                  </DialogTitle>
                  <DialogDescription>
                    Preencha as informações financeiras do convênio para registro histórico
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Data do Registro</Label>
                      <Input type="date" defaultValue={execucaoEditando?.data || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label>Arquivo Comprobatório</Label>
                      <Input type="file" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Repasse Feito (R$)</Label>
                      <Input type="number" placeholder="0,00" defaultValue={execucaoEditando?.repasseFeito || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label>Contrapartida Aportada (R$)</Label>
                      <Input type="number" placeholder="0,00" defaultValue={execucaoEditando?.contrapartidaAportada || ''} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>OBT - Pagamentos Realizados (R$)</Label>
                      <Input type="number" placeholder="0,00" defaultValue={execucaoEditando?.obtPagamentosRealizados || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label>Saldo em Conta (R$)</Label>
                      <Input type="number" placeholder="0,00" defaultValue={execucaoEditando?.saldoEmConta || ''} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Observações</Label>
                    <Textarea
                      rows={3}
                      placeholder="Informações complementares sobre este registro..."
                      defaultValue={execucaoEditando?.observacao || ''}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setModalExecucaoAberto(false)}>
                    Cancelar
                  </Button>
                  <Button
                    className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                    onClick={() => {
                      // Lógica de salvamento
                      setModalExecucaoAberto(false);
                    }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Registro
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>


          {/* Aba: Ocorrências */}
          <TabsContent value="ocorrencias" className="space-y-6">
            <Card>
              <CardHeader className="bg-gradient-to-r from-[#e8f3ef] to-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                    <MessageSquare className="w-5 h-5 text-[#2e6a50]" />
                    Histórico de Ocorrências
                  </CardTitle>
                  <Button
                    className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                    onClick={() => setModalOcorrenciaAberto(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Ocorrência
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {ocorrencias.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Nenhuma ocorrência registrada</p>
                    <p className="text-sm mt-2">
                      Registre ocorrências para manter o histórico de comunicações
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {ocorrencias.map((ocorrencia) => (
                      <Card key={ocorrencia.id} className={`border-l-4 ${ocorrencia.status === 'Pendente' ? 'border-l-orange-500' : 'border-l-green-500'}`}>
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex flex-col items-start gap-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="font-bold text-gray-900">
                                  {new Date(ocorrencia.data).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                              <Badge className={ocorrencia.status === 'Pendente' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}>
                                {ocorrencia.status}
                              </Badge>
                            </div>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setOcorrencias(ocorrencias.filter(o => o.id !== ocorrencia.id))}
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Excluir
                            </Button>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <label className="text-xs font-medium text-gray-500 uppercase">Descrição da Solicitação</label>
                            <p className="text-sm text-gray-900 mt-1">{ocorrencia.descricao}</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <label className="text-xs font-medium text-gray-500">Prazo para Resposta</label>
                              <p className="text-sm font-bold text-gray-900">
                                {new Date(ocorrencia.prazoResposta).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                            {ocorrencia.destinatario && (
                              <div>
                                <label className="text-xs font-medium text-gray-500">Destinatário</label>
                                <p className="text-sm text-gray-900 font-medium">{ocorrencia.destinatario}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Modal de Nova Ocorrência */}
            <Dialog open={modalOcorrenciaAberto} onOpenChange={setModalOcorrenciaAberto}>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Registrar Nova Ocorrência</DialogTitle>
                  <DialogDescription>
                    A ocorrência será vinculada automaticamente a este convênio e notificada ao destinatário.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  {/* Dados do Convênio */}
                  <div className="bg-gradient-to-r from-[#e8f3ef] to-white p-4 rounded-lg border border-[#2e6a50]">
                    <h3 className="text-sm font-bold text-[#1a3e3e] mb-3">Dados do Convênio</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500">Nº do Convênio</label>
                        <p className="text-sm font-bold text-gray-900">
                          {isEstadual ? (convenio as any).numeroInstrumento : (convenio as any).numeroConvenio}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">Secretaria</label>
                        <p className="text-sm font-bold text-gray-900">
                          {isEstadual ? (convenio as any).instituicao : (convenio as any).ministerio}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Campo Destinatário */}
                  <div className="space-y-2">
                    <Label>Destinatário da Notificação *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar usuário do sistema" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="financeiro">Setor Financeiro</SelectItem>
                          <SelectItem value="contabilidade">Contabilidade</SelectItem>
                          <SelectItem value="juridico">Assessor Jurídico</SelectItem>
                          <SelectItem value="secretario">Secretário(a)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input type="email" placeholder="Ou digite um e-mail externo" />
                    </div>
                  </div>

                  {/* Formulário da Ocorrência */}
                  <div className="space-y-2">
                    <Label>Descrição da Solicitação *</Label>
                    <Textarea
                      rows={4}
                      placeholder="Descreva detalhadamente a solicitação ou ocorrência..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Prazo para Resposta *</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Documento Solicitado (Anexo)</Label>
                      <Input type="file" className="cursor-pointer" />
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setModalOcorrenciaAberto(false)}>
                    Cancelar
                  </Button>
                  <Button
                    className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                    onClick={() => setModalOcorrenciaAberto(false)}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Registrar Ocorrência
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Aba: Extratos */}
          <TabsContent value="extratos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-[#2e6a50]" />
                  Extratos Bancários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Receipt className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>Nenhum extrato disponível</p>
                  <p className="text-sm mt-2">
                    Os extratos bancários serão exibidos aqui quando disponíveis
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba: REFO */}
          <TabsContent value="refo">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#2e6a50]" />
                  REFO - Relatório de Execução Físico-Orçamentária
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>REFO em desenvolvimento</p>
                  <p className="text-sm mt-2">
                    O Relatório de Execução Físico-Orçamentária estará disponível em breve
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba: PCF */}
          <TabsContent value="pcf" className="space-y-6">
            {/* Situação da Prestação de Contas */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-[#e8f3ef] to-white">
                <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                  <FileCheck className="w-5 h-5 text-[#2e6a50]" />
                  Prestação de Contas Final (PCF)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Status e Prazos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Situação da Prestação de Contas</Label>
                    <Select
                      value={pcfData.situacao}
                      onValueChange={(value) => setPcfData({ ...pcfData, situacao: value })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Não iniciada">Não iniciada</SelectItem>
                        <SelectItem value="Em elaboração">Em elaboração</SelectItem>
                        <SelectItem value="Enviada ao concedente">Enviada ao concedente</SelectItem>
                        <SelectItem value="Em análise">Em análise</SelectItem>
                        <SelectItem value="Aprovada">Aprovada</SelectItem>
                        <SelectItem value="Aprovada com ressalvas">Aprovada com ressalvas</SelectItem>
                        <SelectItem value="Reprovada">Reprovada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Prazo de Envio</Label>
                    <Input
                      type="date"
                      value={pcfData.prazoEnvio}
                      onChange={(e) => setPcfData({ ...pcfData, prazoEnvio: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Data de Envio</Label>
                    <Input
                      type="date"
                      value={pcfData.dataEnvio}
                      onChange={(e) => setPcfData({ ...pcfData, dataEnvio: e.target.value })}
                      disabled={pcfData.situacao !== 'Enviada ao concedente' && pcfData.situacao !== 'Em análise' && pcfData.situacao !== 'Aprovada' && pcfData.situacao !== 'Aprovada com ressalvas' && pcfData.situacao !== 'Reprovada'}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500">
                      Disponível apenas quando enviada ao concedente
                    </p>
                  </div>
                </div>

                {/* Observações */}
                <div className="pt-6 border-t">
                  <Label>Observações</Label>
                  <Textarea
                    value={pcfData.observacoes}
                    onChange={(e) => setPcfData({ ...pcfData, observacoes: e.target.value })}
                    placeholder="Informações complementares sobre a prestação de contas..."
                    rows={3}
                    className="mt-2"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button className="bg-[#2e6a50] hover:bg-[#1a3e3e]">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Informações
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Documentos Obrigatórios */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-[#e8f3ef] to-white">
                <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                  <Upload className="w-5 h-5 text-[#2e6a50]" />
                  Documentos Obrigatórios
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {pcfData.documentos.map((doc) => (
                    <div key={doc.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{doc.nome}</h4>
                          <Badge className={
                            doc.situacao === 'Anexado'
                              ? 'bg-green-100 text-green-800 border-green-300 mt-2'
                              : 'bg-yellow-100 text-yellow-800 border-yellow-300 mt-2'
                          }>
                            {doc.situacao}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          {doc.situacao === 'Anexado' ? (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="hover:bg-[#e8f3ef] hover:border-[#2e6a50]"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="hover:bg-[#e8f3ef] hover:border-[#2e6a50]"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Baixar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="hover:bg-red-50 hover:border-red-300"
                                onClick={() => {
                                  const novosDocumentos = pcfData.documentos.map(d =>
                                    d.id === doc.id ? { ...d, situacao: 'Pendente', arquivo: null } : d
                                  );
                                  setPcfData({ ...pcfData, documentos: novosDocumentos });
                                }}
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                              onClick={() => {
                                const novosDocumentos = pcfData.documentos.map(d =>
                                  d.id === doc.id ? { ...d, situacao: 'Anexado', arquivo: 'simulado.pdf' } : d
                                );
                                setPcfData({ ...pcfData, documentos: novosDocumentos });
                              }}
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Anexar Documento
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resumo de Documentos */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Status dos Documentos</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {pcfData.documentos.filter(d => d.situacao === 'Anexado').length} de {pcfData.documentos.length} documentos anexados
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#2e6a50]">
                        {Math.round((pcfData.documentos.filter(d => d.situacao === 'Anexado').length / pcfData.documentos.length) * 100)}%
                      </p>
                      <p className="text-xs text-gray-600">Completo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de Termos Aditivos */}
      <Dialog open={modalTermosAberto} onOpenChange={setModalTermosAberto}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between mt-2">
              <DialogTitle className="flex items-center gap-2 text-xl font-bold text-[#2e6a50]">
                <FileSignature className="w-5 h-5" />
                Controle de Vigência e Termos Aditivos
              </DialogTitle>
              <Button
                className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                onClick={() => setTermoEditando({})}
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Termo Aditivo
              </Button>
            </div>
          </DialogHeader>

          <div className="py-4">
            {termosAditivos.length > 0 ? (
              <div className="space-y-4">
                {termosAditivos.map((termo) => (
                  <div key={termo.id} className="bg-gradient-to-r from-blue-50 to-white p-5 rounded-lg border-2 border-blue-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-bold text-[#2e6a50]">{termo.tipoAditivo}</h4>
                          <Badge className={
                            termo.situacao === 'Aprovado'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : termo.situacao === 'Reprovado'
                                ? 'bg-red-100 text-red-800 border-red-300'
                                : termo.situacao === 'Em análise'
                                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                                  : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                          }>
                            {termo.situacao}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-[#e8f3ef] hover:border-[#2e6a50]"
                          onClick={() => setTermoEditando(termo)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-red-50 hover:border-red-300"
                          onClick={() => setTermosAditivos(termosAditivos.filter(t => t.id !== termo.id))}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <label className="text-xs font-medium text-gray-500">Data da Solicitação</label>
                        <p className="text-sm font-semibold text-gray-900">
                          {new Date(termo.dataSolicitacao).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">Nova Vigência Proposta</label>
                        <p className="text-sm font-semibold text-blue-600">
                          {new Date(termo.novaVigenciaProposta).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      {termo.dataAprovacao && (
                        <div>
                          <label className="text-xs font-medium text-gray-500">Data de Aprovação</label>
                          <p className="text-sm font-semibold text-green-600">
                            {new Date(termo.dataAprovacao).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      )}
                      {termo.nupProcesso && (
                        <div>
                          <label className="text-xs font-medium text-gray-500">NUP do Processo</label>
                          <p className="text-sm font-semibold text-gray-900">{termo.nupProcesso}</p>
                        </div>
                      )}
                    </div>

                    {termo.observacoes && (
                      <div className="mb-3">
                        <label className="text-xs font-medium text-gray-500">Observações</label>
                        <p className="text-sm text-gray-700 bg-white p-3 rounded-lg mt-1 border border-gray-200">
                          {termo.observacoes}
                        </p>
                      </div>
                    )}

                    {termo.situacao !== 'Aprovado' && (
                      <div className="flex gap-2 mt-3 pt-3 border-t">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => {
                            const termosAtualizados = termosAditivos.map(t =>
                              t.id === termo.id
                                ? { ...t, situacao: 'Aprovado', dataAprovacao: new Date().toISOString().split('T')[0] }
                                : t
                            );
                            setTermosAditivos(termosAtualizados);
                            alert('Termo aditivo aprovado! A vigência do convênio será atualizada automaticamente.');
                          }}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Aprovar Termo Aditivo
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-red-50 hover:border-red-300 text-red-600"
                          onClick={() => {
                            const termosAtualizados = termosAditivos.map(t =>
                              t.id === termo.id ? { ...t, situacao: 'Reprovado' } : t
                            );
                            setTermosAditivos(termosAtualizados);
                          }}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reprovar
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                <FileSignature className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Nenhum termo aditivo registrado</p>
                <p className="text-sm mt-2">
                  Registre solicitações de prorrogação de vigência
                </p>
              </div>
            )}

            {/* Formulário de Novo/Editar Termo */}
            {termoEditando !== null && (
              <div className="mt-6 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  {termoEditando.id ? 'Editar Termo Aditivo' : 'Novo Termo Aditivo'}
                </h4>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tipo de Aditivo *</Label>
                      <Select defaultValue={termoEditando?.tipoAditivo || 'Prorrogação de Vigência'}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Prorrogação de Vigência">Prorrogação de Vigência</SelectItem>
                          <SelectItem value="Alteração de Valor">Alteração de Valor</SelectItem>
                          <SelectItem value="Alteração de Objeto">Alteração de Objeto</SelectItem>
                          <SelectItem value="Outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Data da Solicitação *</Label>
                      <Input type="date" defaultValue={termoEditando?.dataSolicitacao} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nova Vigência Proposta *</Label>
                      <Input type="date" defaultValue={termoEditando?.novaVigenciaProposta} />
                    </div>
                    <div className="space-y-2">
                      <Label>Situação do Aditivo *</Label>
                      <Select defaultValue={termoEditando?.situacao || 'Solicitado'}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Solicitado">Solicitado</SelectItem>
                          <SelectItem value="Protocolado">Protocolado</SelectItem>
                          <SelectItem value="Em análise">Em análise</SelectItem>
                          <SelectItem value="Aprovado">Aprovado</SelectItem>
                          <SelectItem value="Reprovado">Reprovado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Data de Aprovação</Label>
                      <Input type="date" defaultValue={termoEditando?.dataAprovacao} />
                    </div>
                    <div className="space-y-2">
                      <Label>NUP do Processo</Label>
                      <Input placeholder="00000.000000/0000-00" defaultValue={termoEditando?.nupProcesso} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Observações</Label>
                    <Textarea
                      placeholder="Justificativa, detalhes da tramitação, etc..."
                      rows={3}
                      defaultValue={termoEditando?.observacoes}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setTermoEditando(null)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                      onClick={() => {
                        setTermoEditando(null);
                        alert('Termo aditivo salvo com sucesso!');
                      }}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Salvar
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}