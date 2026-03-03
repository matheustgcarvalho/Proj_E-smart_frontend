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
  FileCheck
} from 'lucide-react';

interface CaucViewProps {
  city: CityData;
}

export default function CaucView({ city }: CaucViewProps) {
  const caucItems = useMemo(() => getCaucData(city), [city]);
  
  // Calculate Summaries
  const pendingCount = caucItems.filter(i => i.status === 'critical').length;
  const warningCount = caucItems.filter(i => i.status === 'warning').length;
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
  const situacaoGeral = pendingCount > 0 ? 'irregular' : warningCount > 0 ? 'atencao' : 'regular';
  
  const situacaoConfig = {
    regular: { 
      label: 'Regular', 
      color: 'text-green-700', 
      bg: 'bg-green-50', 
      border: 'border-green-300',
      icon: CheckCircle2 
    },
    atencao: { 
      label: 'Atenção', 
      color: 'text-yellow-700', 
      bg: 'bg-yellow-50', 
      border: 'border-yellow-300',
      icon: AlertTriangle 
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
          <h1 className="text-3xl font-bold text-gray-900">CAUC - Cadastro Único de Convênios</h1>
          <p className="text-gray-500">Monitoramento de adimplência federal e regularidade fiscal</p>
        </div>
      </div>

      {/* Card de Informações do Município */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Grid de Informações */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Município */}
            <div className="group">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Município
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{city.name}</p>
                  <p className="text-sm text-gray-500">{city.uf}</p>
                </div>
              </div>
            </div>

            {/* Região e Código IBGE */}
            <div className="group">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Região
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{city.region || 'Nordeste'}</p>
                  <p className="text-sm text-gray-500 font-mono">IBGE: {city.ibgeCode || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* População */}
            <div className="group">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                População
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{city.population}</p>
                  <p className="text-sm text-gray-500">habitantes</p>
                </div>
              </div>
            </div>

            {/* Situação Geral */}
            <div className="group">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Situação Geral
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  situacaoGeral === 'regular' 
                    ? 'bg-gradient-to-br from-green-50 to-green-100' 
                    : situacaoGeral === 'atencao'
                    ? 'bg-gradient-to-br from-yellow-50 to-yellow-100'
                    : 'bg-gradient-to-br from-red-50 to-red-100'
                }`}>
                  <SituacaoIcon className={`w-5 h-5 ${
                    situacaoGeral === 'regular' 
                      ? 'text-green-600' 
                      : situacaoGeral === 'atencao'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`} />
                </div>
                <div>
                  <p className={`text-xl font-bold ${situacaoConfig.color}`}>
                    {situacaoConfig.label}
                  </p>
                  <p className="text-sm text-gray-500">
                    {pendingCount > 0 ? `${pendingCount} pendência${pendingCount !== 1 ? 's' : ''}` : 
                     warningCount > 0 ? `${warningCount} alerta${warningCount !== 1 ? 's' : ''}` : 
                     'Nenhuma pendência'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Última Atualização - Linha separada */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center flex-shrink-0">
                  <CalendarDays className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Última Atualização
                  </div>
                  <p className="text-base font-bold text-gray-900">
                    {city.caucLastUpdate 
                      ? new Date(city.caucLastUpdate).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })
                      : 'Não disponível'}
                  </p>
                </div>
              </div>

              {/* Badge de Status Resumido */}
              {situacaoGeral === 'irregular' && (
                <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-xl border border-red-200">
                  <XCircle className="w-4 h-4" />
                  <span className="text-sm font-semibold">Ação Imediata Necessária</span>
                </div>
              )}
              {situacaoGeral === 'atencao' && (
                <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl border border-yellow-200">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-semibold">Requer Atenção</span>
                </div>
              )}
              {situacaoGeral === 'regular' && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl border border-green-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">Tudo em Ordem</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alertas Expandidos (apenas se houver) */}
        {(situacaoGeral === 'irregular' || situacaoGeral === 'atencao') && (
          <div className={`px-8 py-5 border-t ${
            situacaoGeral === 'irregular' 
              ? 'bg-gradient-to-r from-red-50/50 to-red-50/30 border-red-100' 
              : 'bg-gradient-to-r from-yellow-50/50 to-yellow-50/30 border-yellow-100'
          }`}>
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
                      Existem <strong>{warningCount} item{warningCount !== 1 ? 's' : ''}</strong> que 
                      {warningCount !== 1 ? ' requerem' : ' requer'} atenção. 
                      Monitore os prazos para evitar irregularidades futuras.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-[#1a3e3e]">Monitoramento CAUC-SNT</h2>
           <p className="text-[#626262]">Acompanhamento oficial dos requisitos fiscais do Tesouro Nacional</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Summary Badges */}
          <div className="flex items-center gap-2">
             <div className="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg border border-red-100 flex items-center gap-2 text-sm font-bold shadow-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>{pendingCount} Pendências</span>
             </div>
             <div className="bg-[#e8a455]/10 text-[#e8a455] px-3 py-1.5 rounded-lg border border-[#e8a455]/20 flex items-center gap-2 text-sm font-bold shadow-sm">
                <Clock className="w-4 h-4" />
                <span>{expiringSoonCount} vencem em 7 dias</span>
             </div>
          </div>

          <button className="flex items-center gap-2 bg-[#2e6a50] hover:bg-[#1a3e3e] text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-[#2e6a50]/20 active:scale-95">
             <RefreshCw className="w-4 h-4" />
             <span className="hidden md:inline">Sincronizar STN</span>
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
  
  // Status Logic
  const statusConfig = {
    regular: { icon: CheckCircle2, color: 'text-[#2e6a50]', bg: 'bg-[#2e6a50]/10', label: 'Regular' },
    warning: { icon: AlertTriangle, color: 'text-[#e8a455]', bg: 'bg-[#e8a455]/10', label: 'Alerta' },
    critical: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', label: 'Pendente' }
  }[item.status];

  const StatusIcon = statusConfig.icon;

  return (
    <div className="p-5 hover:bg-[#f7f7f7]/50 transition-colors group">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        
        {/* Left: Status & Description */}
        <div className="flex-1 flex items-start gap-4">
           <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${statusConfig.bg} ${statusConfig.color}`}>
              <StatusIcon className="w-5 h-5" />
           </div>
           <div>
              <h4 className="font-bold text-[#1a3e3e] text-base leading-tight mb-1">
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

        {/* Middle: Dates & Countdown */}
        <div className="flex items-center gap-8 shrink-0 min-w-[300px]">
           <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#bbbbbb] uppercase font-bold">
                 <CalendarDays className="w-3 h-3" />
                 Emissão
              </div>
              <p className="text-sm font-medium text-[#1a3e3e]">
                {new Date(item.issuedAt).toLocaleDateString('pt-BR')}
              </p>
           </div>

           <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#bbbbbb] uppercase font-bold">
                 <Clock className="w-3 h-3" />
                 Validade
              </div>
              <div className="flex items-center gap-2">
                <p className={`text-sm font-medium ${daysRemaining < 0 ? 'text-red-600' : 'text-[#1a3e3e]'}`}>
                  {new Date(item.expiresAt).toLocaleDateString('pt-BR')}
                </p>
                {/* Countdown Badge */}
                {item.status !== 'critical' && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    daysRemaining <= 7 
                      ? 'bg-[#e8a455]/10 text-[#e8a455] border-[#e8a455]/20' 
                      : 'bg-[#2e6a50]/10 text-[#2e6a50] border-[#2e6a50]/20'
                  }`}>
                    {daysRemaining} dias
                  </span>
                )}
              </div>
           </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0 lg:border-l lg:border-[#bbbbbb]/20 lg:pl-6">
           <ActionButton 
             icon={ExternalLink} 
             label="Regularizar" 
             onClick={() => window.open(item.externalLink, '_blank')}
             variant="primary"
           />
           <ActionButton 
             icon={Bell} 
             label="Notificar" 
             onClick={() => alert(`Notificando responsável sobre: ${item.description}`)}
           />
           <ActionButton 
             icon={UploadCloud} 
             label="Upload" 
             onClick={() => alert('Abrir modal de upload')}
           />
           <ActionButton 
             icon={History} 
             label="Histórico" 
             onClick={() => alert('Ver histórico')}
           />
        </div>

      </div>
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

function ActionButton({ icon: Icon, label, onClick, variant = 'secondary' }: ActionButtonProps) {
  const baseStyles = "flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 border";
  const variants = {
    primary: "bg-[#2e6a50]/10 text-[#2e6a50] border-[#2e6a50]/20 hover:bg-[#2e6a50] hover:text-white hover:shadow-md",
    secondary: "bg-white text-[#626262] border-[#bbbbbb]/30 hover:bg-[#f7f7f7] hover:border-[#2e6a50]/50 hover:text-[#2e6a50]"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} group/btn relative`}
      title={label}
    >
      <Icon className="w-4 h-4" />
      {/* Tooltip */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#1a3e3e] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
        {label}
      </span>
    </button>
  );
}