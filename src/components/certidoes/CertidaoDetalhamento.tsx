import React from 'react';
import {
  ArrowLeft,
  FileText,
  Calendar,
  Building2,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  History,
  Info,
  MapPin,
  Hash,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { getDaysRemaining } from '../../lib/certidoes-data';
import type { Certidao, Inadimplencia } from '../../lib/certidoes-data';

interface CertidaoDetalhamentoProps {
  certidao: Certidao;
  onBack: () => void;
}

export default function CertidaoDetalhamento({ certidao, onBack }: CertidaoDetalhamentoProps) {
  const diasRestantes = getDaysRemaining(certidao.expirationDate);
  const isExpired = diasRestantes < 0;

  const getStatusInfo = () => {
    switch (certidao.status) {
      case 'irregular':
        return {
          icon: AlertTriangle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          borderColor: 'border-red-300',
          label: 'Vencida / Irregular',
          message: 'Esta certidão está vencida e precisa ser renovada imediatamente para evitar bloqueios.'
        };
      case 'warning':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          borderColor: 'border-yellow-300',
          label: 'Atenção (Vencendo)',
          message: 'Esta certidão está próxima do vencimento. Programe a renovação.'
        };
      default:
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-300',
          label: 'Negativa (Regular)',
          message: 'Esta certidão está válida e regular.'
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  // Renderiza campos específicos baseado no tipo de certidão
  const renderCamposEspecificos = () => {
    switch (certidao.tipo) {
      case 'transparencia_fiscal':
        if (!certidao.camposTransparenciaFiscal) return null;
        const { municipio, codigoIBGE, entidade, numeroCertidao, hashCertidao } = certidao.camposTransparenciaFiscal;
        return (
          <Card>
            <CardHeader className="bg-[#f7f7f7]">
              <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                <FileCheck className="w-5 h-5 text-[#2e6a50]" />
                Informações Específicas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Município</label>
                  <p className="text-base font-semibold text-gray-900">{municipio}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Código IBGE</label>
                  <p className="text-base font-mono text-gray-900">{codigoIBGE}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Entidade</label>
                  <p className="text-base font-semibold text-gray-900">{entidade}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Número da Certidão</label>
                  <p className="text-base font-mono text-gray-900">{numeroCertidao}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">Hash da Certidão</label>
                  <p className="text-sm font-mono text-gray-900 bg-gray-50 p-3 rounded-lg mt-1 break-all">
                    {hashCertidao}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'regularidade_fgts':
        if (!certidao.camposRegularidadeFGTS) return null;
        const fgts = certidao.camposRegularidadeFGTS;
        return (
          <Card>
            <CardHeader className="bg-[#f7f7f7]">
              <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                <FileCheck className="w-5 h-5 text-[#2e6a50]" />
                Informações Específicas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">CNPJ</label>
                  <p className="text-base font-mono text-gray-900">{fgts.cnpj}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Número da Certidão</label>
                  <p className="text-base font-mono text-gray-900">{fgts.numeroCertidao}</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <label className="text-sm font-medium text-gray-500">Mensagem</label>
                <p className="text-base text-gray-700 leading-relaxed mt-2 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  {fgts.mensagem}
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 'debitos_estaduais':
        if (!certidao.camposDebitosEstaduais) return null;
        const debitos = certidao.camposDebitosEstaduais;
        return (
          <Card>
            <CardHeader className="bg-[#f7f7f7]">
              <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                <FileCheck className="w-5 h-5 text-[#2e6a50]" />
                Informações Específicas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Número da Certidão</label>
                  <p className="text-base font-mono text-gray-900">{debitos.numeroCertidao}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">CNPJ</label>
                  <p className="text-base font-mono text-gray-900">{debitos.cnpj}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Razão Social</label>
                  <p className="text-base font-semibold text-gray-900">{debitos.razaoSocial}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Inscrição Estadual (CGF)</label>
                  <p className="text-base font-mono text-gray-900">{debitos.inscricaoEstadual}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'regularidade_precatorios':
        if (!certidao.camposRegularidadePrecatorios) return null;
        const precatorios = certidao.camposRegularidadePrecatorios;
        return (
          <Card>
            <CardHeader className="bg-[#f7f7f7]">
              <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                <FileCheck className="w-5 h-5 text-[#2e6a50]" />
                Informações Específicas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">CNPJ</label>
                  <p className="text-base font-mono text-gray-900">{precatorios.cnpj}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Entidade</label>
                  <p className="text-base font-semibold text-gray-900">{precatorios.entidade}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">Código de Validação</label>
                  <p className="text-base font-mono text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
                    {precatorios.codigoValidacao}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'cadastral_parceiro':
        if (!certidao.camposCadastralParceiro) return null;
        const parceiro = certidao.camposCadastralParceiro;
        return (
          <>
            <Card>
              <CardHeader className="bg-[#f7f7f7]">
                <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                  <FileCheck className="w-5 h-5 text-[#2e6a50]" />
                  Informações Específicas
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Razão Social</label>
                    <p className="text-base font-semibold text-gray-900">{parceiro.razaoSocial}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">CNPJ</label>
                    <p className="text-base font-mono text-gray-900">{parceiro.cnpj}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Adimplente?</label>
                    <div className="flex items-center gap-2 mt-1">
                      {parceiro.adimplente ? (
                        <Badge className="bg-green-100 text-green-800 border-green-300">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Sim
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 border-red-300">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Não
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Possui Inadimplência Suspensa?</label>
                    <div className="flex items-center gap-2 mt-1">
                      {parceiro.possuiInadimplenciaSuspensa ? (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Sim
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 border-green-300">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Não
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-500">Código da Certidão</label>
                    <p className="text-base font-mono text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
                      {parceiro.codigoCertidao}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card de Inadimplências */}
            {parceiro.inadimplencias && parceiro.inadimplencias.length > 0 && (
              <Card className="border-2 border-yellow-300">
                <CardHeader className="bg-yellow-50">
                  <CardTitle className="flex items-center gap-2 text-yellow-900">
                    <AlertTriangle className="w-5 h-5" />
                    Inadimplências ({parceiro.inadimplencias.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {parceiro.inadimplencias.map((inad: Inadimplencia, index: number) => (
                      <div key={index} className="p-4 bg-white border border-yellow-200 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-medium text-gray-500">Órgão</label>
                            <p className="text-sm font-semibold text-gray-900">{inad.orgao}</p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-500">Número do Instrumento</label>
                            <p className="text-sm font-mono text-gray-900">{inad.numeroInstrumento}</p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-500">Motivo</label>
                            <p className="text-sm text-gray-900">{inad.motivo}</p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-500">Situação</label>
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 mt-1">
                              {inad.situacao}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* Header Fixo */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="hover:bg-[#f7f7f7]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div className="h-8 w-px bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{certidao.name}</h1>
                <p className="text-sm text-gray-500">{certidao.organ}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${statusInfo.bgColor} ${statusInfo.color} ${statusInfo.borderColor} border`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusInfo.label}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-[1400px] mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status e Alerta */}
            <Card className={`${statusInfo.borderColor} border-2`}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${statusInfo.bgColor} rounded-lg`}>
                    <StatusIcon className={`w-8 h-8 ${statusInfo.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {statusInfo.label}
                    </h3>
                    <p className="text-gray-700">{statusInfo.message}</p>
                    {isExpired && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm font-semibold text-red-800">
                          ⚠️ Ação Urgente Necessária
                        </p>
                        <p className="text-xs text-red-700 mt-1">
                          Certidão vencida há {Math.abs(diasRestantes)} dias. O município pode estar impedido de receber repasses.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações da Certidão */}
            <Card>
              <CardHeader className="bg-[#f7f7f7]">
                <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                  <FileText className="w-5 h-5 text-[#2e6a50]" />
                  Informações Gerais
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Documento</label>
                    <p className="text-base font-bold text-gray-900">{certidao.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Órgão Emissor</label>
                    <p className="text-base font-semibold text-gray-900">{certidao.organ}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <label className="text-sm font-medium text-gray-500">Código de Autenticação</label>
                  <p className="text-base font-mono text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
                    {certidao.authCode}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <label className="text-sm font-medium text-gray-500">Descrição</label>
                  <p className="text-base text-gray-700 leading-relaxed mt-1">
                    {certidao.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Campos Específicos por Tipo de Certidão */}
            {renderCamposEspecificos()}

            {/* Datas e Vigência */}
            <Card>
              <CardHeader className="bg-[#f7f7f7]">
                <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                  <Calendar className="w-5 h-5 text-[#2e6a50]" />
                  Datas e Vigência
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Data de Emissão</label>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(certidao.emissionDate).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Data de Validade</label>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(certidao.expirationDate).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <label className="text-sm font-medium text-gray-500 mb-3 block">
                    Tempo de Validade
                  </label>
                  <div className="flex items-center gap-4">
                    <div className={`flex-1 h-3 bg-gray-200 rounded-full overflow-hidden`}>
                      <div
                        className={`h-full transition-all ${
                          certidao.status === 'irregular'
                            ? 'bg-red-600'
                            : certidao.status === 'warning'
                            ? 'bg-yellow-500'
                            : 'bg-green-600'
                        }`}
                        style={{
                          width: isExpired ? '100%' : `${Math.max(0, Math.min(100, ((180 - diasRestantes) / 180) * 100))}%`
                        }}
                      />
                    </div>
                    <span className={`text-sm font-bold whitespace-nowrap ${statusInfo.color}`}>
                      {isExpired ? 'Expirada' : `${diasRestantes} dias restantes`}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Histórico */}
            <Card>
              <CardHeader className="bg-[#f7f7f7]">
                <CardTitle className="flex items-center gap-2 text-[#1a3e3e]">
                  <History className="w-5 h-5 text-[#2e6a50]" />
                  Histórico de Emissões
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">Emissão Atual</p>
                      <p className="text-sm text-gray-600">
                        {new Date(certidao.emissionDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <Badge className="bg-[#2e6a50] text-white">Vigente</Badge>
                  </div>
                  
                  <div className="text-center py-6 text-gray-400">
                    <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Emissões anteriores serão exibidas aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar de Ações */}
          <div className="space-y-6">
            {/* Card de Ações Rápidas */}
            <Card>
              <CardHeader className="bg-[#2e6a50] text-white">
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                <Button
                  className="w-full bg-[#2e6a50] hover:bg-[#23523e] text-white"
                  onClick={() => {
                    alert('Download do PDF iniciado!');
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar PDF
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-[#2e6a50] text-[#2e6a50] hover:bg-[#2e6a50]/10"
                  onClick={() => {
                    alert('Solicitação de renovação enviada!');
                  }}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Renovar Certidão
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    window.open(`https://www.gov.br/validar?code=${certidao.authCode}`, '_blank');
                  }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Validar Autenticidade
                </Button>
              </CardContent>
            </Card>

            {/* Card de Resumo */}
            <Card>
              <CardHeader className="bg-[#f7f7f7]">
                <CardTitle className="text-base">Resumo Crítico</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                  <p className={`text-base font-bold ${statusInfo.color}`}>
                    {statusInfo.label}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <label className="text-xs font-medium text-gray-500 uppercase">Validade</label>
                  <p className="text-base font-semibold text-gray-900">
                    {isExpired ? (
                      <span className="text-red-600">Expirada</span>
                    ) : (
                      `${diasRestantes} dias`
                    )}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <label className="text-xs font-medium text-gray-500 uppercase">Órgão</label>
                  <p className="text-sm text-gray-900">{certidao.organ}</p>
                </div>

                <div className="pt-4 border-t">
                  <label className="text-xs font-medium text-gray-500 uppercase">Código</label>
                  <p className="text-xs font-mono text-gray-900 break-all">{certidao.authCode}</p>
                </div>
              </CardContent>
            </Card>

            {/* Avisos Importantes */}
            {(certidao.status === 'irregular' || certidao.status === 'warning') && (
              <Card className="border-2 border-orange-300">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="text-base text-orange-800 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Atenção
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-orange-900">
                    {certidao.status === 'irregular'
                      ? 'Certidão irregular pode bloquear repasses e convênios. Providencie a regularização imediatamente.'
                      : 'Programe a renovação desta certidão para evitar problemas futuros.'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
