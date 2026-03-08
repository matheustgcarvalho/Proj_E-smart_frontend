import React, { useMemo } from 'react';
import type { CityData } from '../../lib/data';
import { 
  getCaucData, 
  CAUC_GROUPS, 
  getDaysRemaining
} from '../../lib/cauc-data';
import type { CaucItem } from '../../lib/cauc-data';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Bell, 
  UploadCloud, 
  History,
  RefreshCw,
  CalendarDays,
  Clock,
  ShieldCheck,
  MapPin,
  Users,
  Hash,
  FileCheck,
  Download
} from 'lucide-react';

interface CaucViewProps {
  city: CityData;
}

export default function CaucView({ city }: CaucViewProps) {
  const caucItems = useMemo(() => getCaucData(city), [city]);
  
  // Calculate Summaries
  const pendingCount = caucItems.filter(i => i.status === 'critical').length;
  const expiringSoonCount = caucItems.filter(i => {
    const days = getDaysRemaining(i.expiresAt);
    return days > 0 && days <= 7;
  }).length;

  const groupedItems = useMemo(() => {
    const groups: Record<number, CaucItem[]> = { 1: [], 2: [], 3: [], 4: [] };
    caucItems.forEach(item => {
      if (groups[item.group]) groups[item.group].push(item);
    });
    return groups;
  }, [caucItems]);

  // Calcular situação geral do município
  const situacaoGeral = pendingCount > 0 ? 'irregular' : 'regular';
  
  const situacaoConfig = {
    regular: { 
      label: 'Regular', 
      color: 'text-green-700', 
      bg: 'bg-green-50', 
      border: 'border-green-300',
      icon: CheckCircle2 
    },
    irregular: { 
      label: 'Irregular', 
      color: 'text-red-700', 
      bg: 'bg-red-50', 
      border: 'border-red-300',
      icon: XCircle 
    }
  }[situacaoGeral];

  const SituacaoIcon = situacaoConfig.icon;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#2e6a50] rounded-xl flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cauc-SNT</h1>
          <p className="text-gray-500">Sistema de Informações sobre Requisitos Fiscais</p>
        </div>
      </div>

      {/* Card de Informações do Município - Compacto */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-wrap items-center gap-8">
          {/* Município e UF */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Município</div>
              <p className="text-lg font-bold text-gray-900">{city.name} - {city.uf}</p>
            </div>
          </div>

          {/* Região e IBGE */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Região / IBGE</div>
              <p className="text-lg font-bold text-gray-900">{city.region || 'Nordeste'} <span className="font-mono text-sm text-gray-500">· {city.ibgeCode || 'N/A'}</span></p>
            </div>
          </div>

          {/* População */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">População</div>
              <p className="text-lg font-bold text-gray-900">{city.population}</p>
            </div>
          </div>

          {/* Situação Geral */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              situacaoGeral === 'regular' 
                ? 'bg-gradient-to-br from-green-50 to-green-100' 
                : 'bg-gradient-to-br from-red-50 to-red-100'
            }`}>
              <SituacaoIcon className={`w-5 h-5 ${
                situacaoGeral === 'regular' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`} />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Situação Geral</div>
              <p className={`text-lg font-bold ${situacaoConfig.color}`}>
                {situacaoConfig.label}
              </p>
            </div>
          </div>

          {/* Última Atualização */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center flex-shrink-0">
              <CalendarDays className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Última Atualização</div>
              <p className="text-lg font-bold text-gray-900">
                {city.caucLastUpdate 
                  ? new Date(city.caucLastUpdate).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Alertas Expandidos (apenas se houver) */}
        {(situacaoGeral === 'irregular') && (
          <div className={`mt-6 pt-6 border-t border-gray-100`}>
            <div className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                situacaoGeral === 'irregular' ? 'bg-red-100' : 'bg-yellow-100'
              }`}>
                {situacaoGeral === 'irregular' ? (
                  <XCircle className="w-5 h-5 text-red-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  situacaoGeral === 'irregular' ? 'text-red-900' : 'text-yellow-900'
                }`}>
                  {situacaoGeral === 'irregular' ? (
                    <>
                      O município possui <strong>{pendingCount} pendência{pendingCount !== 1 ? 's' : ''} crítica{pendingCount !== 1 ? 's' : ''}</strong> que 
                      {pendingCount !== 1 ? ' impedem' : ' impede'} a celebração de novos convênios. 
                      Regularize imediatamente para evitar bloqueios nos repasses federais.
                    </>
                  ) : (
                    <>
                      Existem <strong>{pendingCount} item{pendingCount !== 1 ? 's' : ''}</strong> que 
                      {pendingCount !== 1 ? ' requerem' : ' requer'} atenção. 
                      Monitore os prazos para evitar irregularidades futuras.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botões de Ação Global */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-100 flex items-center gap-2 text-sm font-bold shadow-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>{pendingCount} Pendências</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Botão Histórico */}
          <button 
            onClick={() => alert('Abrir histórico de atualizações')}
            className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border border-slate-200 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            title="Histórico"
          >
            <History className="w-5 h-5 text-slate-600 group-hover:text-slate-700 transition-colors" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
              Histórico
            </span>
          </button>

          {/* Botão Notificar */}
          <button 
            onClick={() => alert('Notificar responsáveis sobre pendências')}
            className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 border border-amber-200 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            title="Notificar"
          >
            <Bell className="w-5 h-5 text-amber-600 group-hover:text-amber-700 transition-colors" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
              Notificar
            </span>
          </button>

          {/* Botão Acessar CAUC-SNT */}
          <button 
            onClick={() => window.open('https://www.gov.br/tesouronacional/pt-br/sistemas/cauc-snt', '_blank')}
            className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            title="Acessar CAUC-SNT"
          >
            <ExternalLink className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg z-10">
              Acessar CAUC-SNT
            </span>
          </button>

          {/* Separador */}
          <div className="h-8 w-px bg-gray-300 mx-1"></div>

          {/* Botão Baixar Relatório */}
          <button 
            onClick={() => alert('Baixando relatório completo...')}
            className="flex items-center gap-2.5 bg-gradient-to-br from-[#2e6a50] to-[#1a3e3e] hover:from-[#1a3e3e] hover:to-[#0f2420] text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-[#2e6a50]/25 hover:shadow-xl hover:shadow-[#2e6a50]/40 active:scale-95 hover:scale-105"
          >
            <Download className="w-5 h-5" />
            <span>Baixar Relatório</span>
          </button>
        </div>
      </div>

      {/* Main List Content */}
      <div className="space-y-8">
        {[1, 2, 3, 4].map((groupId) => (
          <div key={groupId} className="bg-white rounded-xl border border-[#bbbbbb]/30 shadow-sm overflow-hidden">
            {/* Group Header */}
            <div className="px-6 py-4 bg-[#f7f7f7] border-b border-[#bbbbbb]/30 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2e6a50]/10 text-[#2e6a50] flex items-center justify-center font-bold">
                {groupId === 1 ? 'I' : groupId === 2 ? 'II' : groupId === 3 ? 'III' : 'IV'}
              </div>
              <h3 className="font-bold text-[#1a3e3e] text-lg">
                {CAUC_GROUPS[groupId as 1|2|3|4]}
              </h3>
            </div>

            {/* Items List */}
            <div className="divide-y divide-[#bbbbbb]/20">
              {groupedItems[groupId].map((item) => (
                <CaucItemRow key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaucItemRow({ item }: { item: CaucItem }) {
  const daysRemaining = getDaysRemaining(item.expiresAt);
  
  // Status Logic - Ajustado para novos labels
  const statusConfig = {
    regular: { 
      icon: CheckCircle2, 
      color: 'text-[#2e6a50]', 
      bg: 'bg-[#2e6a50]/10', 
      label: 'CONFIRMADO',
      badgeBg: 'bg-green-50',
      badgeText: 'text-green-700',
      badgeBorder: 'border-green-300'
    },
    warning: { 
      icon: AlertTriangle, 
      color: 'text-gray-500', 
      bg: 'bg-gray-100', 
      label: 'DESABILITADO',
      badgeBg: 'bg-gray-100',
      badgeText: 'text-gray-600',
      badgeBorder: 'border-gray-300'
    },
    critical: { 
      icon: XCircle, 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      label: 'A CONFIRMAR',
      badgeBg: 'bg-red-50',
      badgeText: 'text-red-700',
      badgeBorder: 'border-red-300'
    }
  }[item.status];

  const StatusIcon = statusConfig.icon;

  return (
    <div className="p-5 hover:bg-[#f7f7f7]/50 transition-colors group">
      <div className="flex items-center justify-between gap-8">
        
        {/* Left: Icon + Description */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className={`w-10 h-10 rounded-lg ${statusConfig.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
            <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-[#1a3e3e] text-base leading-tight mb-1.5">
              {item.description}
            </h4>
            <div className="flex items-center gap-2 text-sm text-[#626262]">
              <span className="font-medium bg-[#f7f7f7] px-2 py-0.5 rounded text-xs border border-[#bbbbbb]/20">
                {item.source}
              </span>
              {item.status === 'critical' && (
                <span className="text-red-600 font-bold text-xs uppercase tracking-wide">Ação Necessária</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Emissão, Validade e Status - Design Moderno */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Emissão */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 mb-1">
              <CalendarDays className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Emissão</span>
            </div>
            <span className="text-sm font-bold text-[#1a3e3e]">
              {new Date(item.issuedAt).toLocaleDateString('pt-BR')}
            </span>
          </div>

          {/* Separador */}
          <div className="h-10 w-px bg-gray-200"></div>

          {/* Validade */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Validade</span>
            </div>
            <span className={`text-sm font-bold ${daysRemaining < 0 ? 'text-red-600' : 'text-[#1a3e3e]'}`}>
              {new Date(item.expiresAt).toLocaleDateString('pt-BR')}
            </span>
          </div>

          {/* Separador */}
          <div className="h-10 w-px bg-gray-200"></div>

          {/* Status Badge */}
          <div className="min-w-[130px]">
            <div className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 ${statusConfig.badgeBg} ${statusConfig.badgeText} ${statusConfig.badgeBorder} transition-all duration-200`}>
              <StatusIcon className="w-4 h-4" />
              <span className="text-xs font-bold tracking-wide">{statusConfig.label}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}