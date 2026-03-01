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
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { CONVENIOS_DATA, calcularDiasRestantes, formatarMoeda } from '../../lib/convenios-data';

interface ConvenioDetalhamentoProps {
  convenioId: string;
  onBack: () => void;
}

export default function ConvenioDetalhamento({ convenioId, onBack }: ConvenioDetalhamentoProps) {
  const [abaAtiva, setAbaAtiva] = useState('informacoes');

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

      {/* Conteúdo Principal com Sidebar */}
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex gap-6">
          {/* Conteúdo Principal */}
          <div className="flex-1">
            <Tabs value={abaAtiva} onValueChange={setAbaAtiva} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6 bg-white shadow-sm">
                <TabsTrigger 
                  value="informacoes"
                  className="data-[state=active]:bg-[#2e6a50] data-[state=active]:text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Informações Gerais
                </TabsTrigger>
                <TabsTrigger 
                  value="ocorrencias"
                  className="data-[state=active]:bg-[#2e6a50] data-[state=active]:text-white"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ocorrências
                </TabsTrigger>
                <TabsTrigger 
                  value="extratos"
                  className="data-[state=active]:bg-[#2e6a50] data-[state=active]:text-white"
                >
                  <Receipt className="w-4 h-4 mr-2" />
                  Extratos
                </TabsTrigger>
                <TabsTrigger 
                  value="refo"
                  className="data-[state=active]:bg-[#2e6a50] data-[state=active]:text-white"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  REFO
                </TabsTrigger>
                <TabsTrigger 
                  value="pcf"
                  className="data-[state=active]:bg-[#2e6a50] data-[state=active]:text-white"
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
                        <h3 className="font-bold text-gray-700 border-b pb-2">Concedente (Estado)</h3>
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
                        <h3 className="font-bold text-gray-700 border-b pb-2">Conveniado (Município)</h3>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Número do {isEstadual ? 'Convênio' : 'Convênio'}
                        </label>
                        <p className="text-base font-bold text-[#2e6a50]">{numeroConvenio}</p>
                      </div>
                      {isEstadual && (convenio as any).numeroSACC && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Número SACC</label>
                          <p className="text-base font-semibold text-gray-900">{(convenio as any).numeroSACC}</p>
                        </div>
                      )}
                      {isEstadual && (convenio as any).codigoPlanoTrabalho && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Código Plano de Trabalho</label>
                          <p className="text-base font-semibold text-gray-900">{(convenio as any).codigoPlanoTrabalho}</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
                      {isEstadual && (convenio as any).tipoObjeto && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Tipo de Objeto</label>
                          <p className="text-base text-gray-900">{(convenio as any).tipoObjeto}</p>
                        </div>
                      )}
                      {isEstadual && (convenio as any).situacaoPrestacaoContas && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Situação da Prestação de Contas</label>
                          <Badge className={
                            (convenio as any).situacaoPrestacaoContas === 'Em Dia' 
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                          }>
                            {(convenio as any).situacaoPrestacaoContas}
                          </Badge>
                        </div>
                      )}
                      {isEstadual && (convenio as any).situacaoFisica && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Situação Física</label>
                          <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                            {(convenio as any).situacaoFisica}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {isEstadual && (convenio as any).ultimaSincronizacao && (
                      <div className="pt-4 border-t">
                        <label className="text-sm font-medium text-gray-500">Última Sincronização</label>
                        <p className="text-base text-gray-900">
                          {new Date((convenio as any).ultimaSincronizacao).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <label className="text-sm font-medium text-gray-500">Objeto do Convênio</label>
                      <p className="text-base text-gray-900 leading-relaxed">{convenio.objeto}</p>
                    </div>

                    {isEstadual && (convenio as any).justificativa && (
                      <div className="pt-4 border-t">
                        <label className="text-sm font-medium text-gray-500">Justificativa</label>
                        <p className="text-base text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                          {(convenio as any).justificativa}
                        </p>
                      </div>
                    )}
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
                          <label className="text-sm font-medium text-gray-500">Data de Assinatura</label>
                          <p className="text-base font-semibold text-gray-900">
                            {new Date((convenio as any).dataAssinatura).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-medium text-gray-500">Vigência Início</label>
                        <p className="text-base font-semibold text-gray-900">
                          {new Date(convenio.vigenciaInicio).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Vigência Fim</label>
                        <p className="text-base font-semibold text-gray-900">
                          {new Date(convenio.vigenciaFim).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                      {isEstadual && (convenio as any).terminoOriginal && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Término Original</label>
                          <p className="text-base text-gray-900">
                            {new Date((convenio as any).terminoOriginal).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      )}
                      {isEstadual && (convenio as any).terminoAposAditivo && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Término Após Aditivo</label>
                          <p className="text-base font-semibold text-blue-600">
                            {new Date((convenio as any).terminoAposAditivo).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      )}
                      {isEstadual && (convenio as any).dataRescisao && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Data de Rescisão</label>
                          <p className="text-base font-semibold text-red-600">
                            {new Date((convenio as any).dataRescisao).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                      {isEstadual && (convenio as any).publicacaoPortal && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Publicação no Portal</label>
                          <p className="text-base text-gray-900">
                            {new Date((convenio as any).publicacaoPortal).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-medium text-gray-500">Vence em</label>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${
                          diasRestantes < 0 
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {isEstadual && (convenio as any).valorOriginal && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <label className="text-sm font-medium text-gray-500">Valor Original</label>
                          <p className="text-xl font-bold text-gray-900">
                            {formatarMoeda((convenio as any).valorOriginal)}
                          </p>
                        </div>
                      )}
                      {isEstadual && (convenio as any).valorAtualizadoTotal && (
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                          <label className="text-sm font-medium text-blue-700">Valor Atualizado Total</label>
                          <p className="text-xl font-bold text-blue-900">
                            {formatarMoeda((convenio as any).valorAtualizadoTotal)}
                          </p>
                        </div>
                      )}
                      {!isEstadual && (
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                          <label className="text-sm font-medium text-blue-700">Valor Global</label>
                          <p className="text-xl font-bold text-blue-900">
                            {formatarMoeda(convenio.valorGlobal)}
                          </p>
                        </div>
                      )}
                    </div>

                    {isEstadual && (convenio as any).valorAtualizadoRepasse && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <label className="text-sm font-medium text-green-700">Valor Atualizado Repasse</label>
                          <p className="text-xl font-bold text-green-900">
                            {formatarMoeda((convenio as any).valorAtualizadoRepasse)}
                          </p>
                          <p className="text-xs text-green-600 mt-1">Recursos do Estado</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <label className="text-sm font-medium text-orange-700">Valor Atualizado Contrapartida</label>
                          <p className="text-xl font-bold text-orange-900">
                            {formatarMoeda((convenio as any).valorAtualizadoContrapartida || 0)}
                          </p>
                          <p className="text-xs text-orange-600 mt-1">Recursos da Prefeitura</p>
                        </div>
                      </div>
                    )}

                    {isEstadual && (convenio as any).valorLiberado !== undefined && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <label className="text-sm font-medium text-purple-700">Valor Liberado</label>
                          <p className="text-xl font-bold text-purple-900">
                            {formatarMoeda((convenio as any).valorLiberado)}
                          </p>
                          <p className="text-xs text-purple-600 mt-1">Transferido para conta do convênio</p>
                        </div>
                        <div className="bg-teal-50 p-4 rounded-lg">
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

              {/* Aba: Ocorrências */}
              <TabsContent value="ocorrencias">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-[#2e6a50]" />
                        Histórico de Ocorrências
                      </CardTitle>
                      <Button className="bg-[#2e6a50] hover:bg-[#1a3e3e]">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Nova Ocorrência
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p>Nenhuma ocorrência registrada</p>
                      <p className="text-sm mt-2">
                        Registre ocorrências para manter o histórico de comunicações e problemas
                      </p>
                    </div>
                  </CardContent>
                </Card>
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
              <TabsContent value="pcf">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FileCheck className="w-5 h-5 text-[#2e6a50]" />
                        PCF - Processo de Coleta Física
                      </CardTitle>
                      <Button className="bg-[#2e6a50] hover:bg-[#1a3e3e]">
                        Anexar Documento
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-500">
                      <FileCheck className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p>Nenhum documento anexado</p>
                      <p className="text-sm mt-2">
                        Anexe documentos relacionados à prestação de contas e execução do convênio
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Fixa - Resumo Crítico */}
          <div className="w-80 space-y-4">
            {/* Card: Resumo Financeiro */}
            <Card className="border-[#2e6a50] shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-br from-[#2e6a50] to-[#1a3e3e] text-white">
                <CardTitle className="text-lg">Resumo Crítico</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Valor Total */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Valor Global</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{formatarMoeda(convenio.valorGlobal)}</p>
                </div>

                {/* Execução Financeira */}
                <div>
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
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#2e6a50] to-[#3d8b64] transition-all"
                        style={{ width: `${convenio.percentualExecucao}%` }}
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-[#2e6a50]">{convenio.percentualExecucao}%</span>
                    </div>
                  </div>
                </div>

                {/* Status de Vigência */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Status de Vigência</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Término</span>
                      <span className="font-medium text-gray-900">
                        {new Date(convenio.vigenciaFim).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className={`px-3 py-2 rounded-lg text-center font-medium ${
                      diasRestantes < 0 
                        ? 'bg-red-100 text-red-800' 
                        : diasRestantes < 60 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {diasRestantes > 0 ? `${diasRestantes} dias restantes` : 'Convênio Vencido'}
                    </div>
                  </div>
                </div>

                {/* Progresso Físico (Estadual) */}
                {isEstadual && (convenio as any).medicoesRealizadas !== undefined && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500">Progresso Físico</span>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-3xl font-bold text-gray-900">
                        {(convenio as any).medicoesRealizadas}/{(convenio as any).totalMedicoes}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">medições realizadas</p>
                    </div>
                  </div>
                )}

                {/* Ações Rápidas */}
                <div className="pt-4 border-t space-y-2">
                  <Button className="w-full bg-[#2e6a50] hover:bg-[#1a3e3e]">
                    <FileText className="w-4 h-4 mr-2" />
                    Plano de Trabalho
                  </Button>
                  <Button variant="outline" className="w-full border-[#2e6a50] text-[#2e6a50] hover:bg-[#e8f3ef]">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Abrir Chamado
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}