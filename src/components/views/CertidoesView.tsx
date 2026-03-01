import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  RefreshCw, 
  History, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  AlertCircle,
  FileCheck,
  Download
} from 'lucide-react';
import { Button } from '../ui/button';
import type { CityData } from '../../lib/data';
import { getCertidoesData, getDaysRemaining } from '../../lib/certidoes-data';
import type { Certidao } from '../../lib/certidoes-data';

interface CertidoesViewProps {
  city: CityData;
  onOpenDetalhamento: (certidao: Certidao) => void;
}

export default function CertidoesView({ city, onOpenDetalhamento }: CertidoesViewProps) {
  const [renewingId, setRenewingId] = useState<string | null>(null);

  const allCertidoes = useMemo(() => getCertidoesData(city), [city]);

  // Estatísticas gerais
  const stats = useMemo(() => {
    return {
      total: allCertidoes.length,
      regular: allCertidoes.filter(c => c.status === 'regular').length,
      warning: allCertidoes.filter(c => c.status === 'warning').length,
      irregular: allCertidoes.filter(c => c.status === 'irregular').length,
    };
  }, [allCertidoes]);

  // Simulação da ação de renovar
  const handleRenew = (id: string) => {
    setRenewingId(id);
    setTimeout(() => {
      setRenewingId(null);
      alert('Solicitação de renovação enviada para o robô de consulta!');
    }, 2000);
  };

  // Download do PDF
  const handleDownload = (certidao: Certidao) => {
    // Simulação de download
    alert(`Download iniciado: ${certidao.name}.pdf`);
    // Em produção, você usaria:
    // window.open(certidao.pdfUrl, '_blank');
  };

  // Renderização do Badge de status
  const renderStatusBadge = (certidao: Certidao) => {
    switch (certidao.status) {
      case 'irregular':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold border border-red-200">
            <XCircle className="w-3.5 h-3.5" />
            Vencida / Irregular
          </div>
        );
      case 'warning':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold border border-yellow-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            Atenção (Vencendo)
          </div>
        );
      case 'regular':
      default:
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#2e6a50]/10 text-[#2e6a50] rounded-full text-xs font-bold border border-[#2e6a50]/20">
            <CheckCircle className="w-3.5 h-3.5" />
            Negativa (Regular)
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#2e6a50] rounded-xl flex items-center justify-center">
          <FileCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Central de Certidões</h1>
          <p className="text-gray-500">Monitoramento automatizado da regularidade fiscal municipal</p>
        </div>
      </div>

      {/* KPI Cards Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bbbbbb]/30 flex items-center gap-4">
          <div className="p-3 bg-[#f7f7f7] rounded-lg">
            <FileText className="w-6 h-6 text-[#626262]" />
          </div>
          <div>
            <p className="text-xs font-medium text-[#bbbbbb] uppercase">Total Monitorado</p>
            <h3 className="text-2xl font-bold text-[#1a3e3e]">{stats.total}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bbbbbb]/30 flex items-center gap-4">
          <div className="p-3 bg-[#2e6a50]/10 rounded-lg">
            <CheckCircle className="w-6 h-6 text-[#2e6a50]" />
          </div>
          <div>
            <p className="text-xs font-medium text-[#bbbbbb] uppercase">Regulares</p>
            <h3 className="text-2xl font-bold text-[#2e6a50]">{stats.regular}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bbbbbb]/30 flex items-center gap-4">
          <div className="p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-[#bbbbbb] uppercase">Vencendo em Breve</p>
            <h3 className="text-2xl font-bold text-yellow-600">{stats.warning}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bbbbbb]/30 flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-lg">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-[#bbbbbb] uppercase">Irregulares</p>
            <h3 className="text-2xl font-bold text-red-600">{stats.irregular}</h3>
          </div>
        </div>
      </div>

      {/* Lista de Certidões */}
      <div className="bg-white rounded-xl shadow-sm border border-[#bbbbbb]/30 overflow-hidden">
        {/* Header da Tabela (Desktop) */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-[#f7f7f7] text-xs font-semibold text-[#626262] uppercase tracking-wider border-b border-[#bbbbbb]/20">
          <div className="col-span-4">Identificação do Documento</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Vigência</div>
          <div className="col-span-4 text-right">Ações</div>
        </div>

        <div className="divide-y divide-[#bbbbbb]/10">
          {allCertidoes.map((certidao) => {
            const daysRemaining = getDaysRemaining(certidao.expirationDate);
            const isExpired = daysRemaining < 0;

            return (
              <div 
                key={certidao.id} 
                className="p-4 hover:bg-[#f7f7f7]/50 transition-colors group cursor-pointer"
                onDoubleClick={() => onOpenDetalhamento(certidao)}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  
                  {/* Identificação */}
                  <div className="col-span-1 md:col-span-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-[#f0fdf4] rounded text-[#2e6a50] shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1a3e3e] text-sm">{certidao.name}</h4>
                        <p className="text-xs text-[#626262]">{certidao.organ}</p>
                        <p className="text-[10px] text-[#bbbbbb] mt-0.5 font-mono">Cód: {certidao.authCode}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-1 md:col-span-2">
                    {renderStatusBadge(certidao)}
                  </div>

                  {/* Vigência e Contador */}
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 text-sm text-[#1a3e3e]">
                      <Calendar className="w-4 h-4 text-[#bbbbbb]" />
                      <span>{new Date(certidao.expirationDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    
                    {/* Contador de Dias */}
                    <div className={`mt-1 text-xs font-bold flex items-center gap-1.5 ${
                      certidao.status === 'irregular' ? 'text-red-600' : certidao.status === 'warning' ? 'text-yellow-600' : 'text-[#2e6a50]'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {isExpired 
                        ? 'Expirada' 
                        : daysRemaining === 0 
                          ? 'Vence hoje' 
                          : `Expira em ${daysRemaining} dias`
                      }
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="col-span-1 md:col-span-4 flex items-center justify-end gap-2">
                    <button 
                      title="Baixar PDF"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(certidao);
                      }}
                      className="p-2 text-[#626262] hover:text-[#1a3e3e] hover:bg-[#bbbbbb]/20 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    
                    <Button
                      variant="default"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetalhamento(certidao);
                      }}
                      className="bg-[#2e6a50]/10 hover:bg-[#2e6a50]/20 text-[#2e6a50] border-none"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Abrir Detalhamento
                    </Button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRenew(certidao.id);
                      }}
                      disabled={renewingId === certidao.id}
                      title="Renovar Certidão"
                      className={`flex items-center gap-2 px-3 py-2 text-xs font-bold text-white rounded-lg transition-all shadow-sm ${
                        renewingId === certidao.id 
                          ? 'bg-[#bbbbbb] cursor-wait' 
                          : certidao.status !== 'regular'
                            ? 'bg-[#e8a455] hover:bg-[#d48f3b] animate-pulse'
                            : 'bg-[#2e6a50] hover:bg-[#23523e]'
                      }`}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${renewingId === certidao.id ? 'animate-spin' : ''}`} />
                      {renewingId === certidao.id ? 'Buscando...' : 'Renovar'}
                    </button>
                  </div>

                </div>

                {/* Área de Alerta para Irregularidades */}
                {(certidao.status === 'irregular') && (
                   <div className="mt-3 ml-0 md:ml-14 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start justify-between">
                     <div className="flex items-start gap-2">
                       <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                       <div>
                         <p className="text-xs font-bold text-red-700">Ação Necessária</p>
                         <p className="text-xs text-red-600">Certidão positiva ou vencida impede o recebimento de recursos.</p>
                       </div>
                     </div>
                     <button className="text-xs font-bold text-red-700 underline hover:text-red-900">
                       Notificar Responsável
                     </button>
                   </div>
                )}
              </div>
            );
          })}

          {allCertidoes.length === 0 && (
             <div className="p-8 text-center text-[#bbbbbb]">
               <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
               <p>Nenhuma certidão encontrada.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}