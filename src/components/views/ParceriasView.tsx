import React, { useState, useMemo } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  Download, 
  DollarSign,
  Briefcase,
  AlertCircle,
  ExternalLink,
  Search,
  Filter,
  X,
  Handshake
} from 'lucide-react';
import type { CityData } from '../../lib/data';
import { getEParceriasData, formatCurrency } from '../../lib/eparcerias-data';
import type { EParceriaStatus, ConvenioItem } from '../../lib/eparcerias-data';

interface ParceriasViewProps {
  city: CityData;
}

export default function ParceriasView({ city }: ParceriasViewProps) {
  const data = getEParceriasData(city);
  const { regularityItems, convenios: initialConvenios, summary } = data;

  // Estados dos Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [agencyFilter, setAgencyFilter] = useState<string>('todos');

  // Extrair opções únicas para os filtros
  const agencies = useMemo(() => {
    const uniqueAgencies = new Set(initialConvenios.map(c => c.agency));
    return Array.from(uniqueAgencies);
  }, [initialConvenios]);

  const statuses = ['Em Execução', 'Prestação de Contas', 'Paralisado', 'Concluído'];

  // Lógica de Filtragem
  const filteredConvenios = useMemo(() => {
    return initialConvenios.filter(item => {
      // Filtro de Texto (Número ou Objeto)
      const matchesSearch = 
        item.object.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.number.toLowerCase().includes(searchQuery.toLowerCase());

      // Filtro de Status
      const matchesStatus = statusFilter === 'todos' || item.status === statusFilter;

      // Filtro de Órgão
      const matchesAgency = agencyFilter === 'todos' || item.agency === agencyFilter;

      return matchesSearch && matchesStatus && matchesAgency;
    });
  }, [initialConvenios, searchQuery, statusFilter, agencyFilter]);

  // Helpers de Renderização (mantidos)
  const renderStatusIcon = (status: EParceriaStatus) => {
    switch (status) {
      case 'regular':
        return <CheckCircle className="w-6 h-6 text-[#2e6a50]" />;
      case 'irregular':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    }
  };

  const renderStatusBadge = (status: EParceriaStatus) => {
    switch (status) {
      case 'regular':
        return <span className="px-2 py-1 text-xs font-bold bg-[#2e6a50]/10 text-[#2e6a50] rounded-full">Regular</span>;
      case 'irregular':
        return <span className="px-2 py-1 text-xs font-bold bg-red-100 text-red-600 rounded-full">Inadimplente</span>;
      case 'warning':
        return <span className="px-2 py-1 text-xs font-bold bg-yellow-100 text-yellow-700 rounded-full">Atenção</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#2e6a50] rounded-xl flex items-center justify-center">
          <Handshake className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">E-Parcerias</h1>
          <p className="text-gray-500">Monitoramento de convênios estaduais e regularidade junto ao governo do estado</p>
        </div>
      </div>

      {/* KPI Cards - Resumo Financeiro e de Situação */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Total Captado */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bbbbbb]/30 flex items-start justify-between relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <DollarSign className="w-24 h-24 text-[#2e6a50]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#bbbbbb] mb-1">Total em Carteira (Captado)</p>
            <h3 className="text-2xl font-bold text-[#1a3e3e]">{formatCurrency(summary.totalCaptado)}</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-24 h-1.5 bg-[#f7f7f7] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#2e6a50]" 
                  style={{ width: `${summary.execucaoFinanceira}%` }}
                />
              </div>
              <span className="text-xs text-[#2e6a50] font-bold">{summary.execucaoFinanceira.toFixed(0)}% Liberado</span>
            </div>
          </div>
        </div>

        {/* Card Convênios Ativos */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bbbbbb]/30 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[#bbbbbb] mb-1">Convênios Ativos</p>
            <h3 className="text-2xl font-bold text-[#1a3e3e]">{summary.activeCount} <span className="text-sm font-normal text-[#626262]">Instrumentos</span></h3>
            <p className="text-xs text-[#626262] mt-2">Obras e aquisições em andamento.</p>
          </div>
          <div className="p-3 bg-[#e8a455]/10 rounded-lg text-[#e8a455]">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* Card Status Geral */}
        <div className={`p-6 rounded-xl shadow-sm border flex items-center gap-4 ${
          summary.isRegular 
            ? 'bg-[#2e6a50] border-[#2e6a50] text-white' 
            : 'bg-white border-red-200'
        }`}>
          <div className={`p-3 rounded-full ${summary.isRegular ? 'bg-white/20' : 'bg-red-100 text-red-600'}`}>
            {summary.isRegular ? <CheckCircle className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
          </div>
          <div>
            <p className={`text-sm font-medium opacity-90 ${summary.isRegular ? 'text-white' : 'text-[#626262]'}`}>Situação no Estado</p>
            <h3 className={`text-xl font-bold ${summary.isRegular ? 'text-white' : 'text-red-600'}`}>
              {summary.isRegular ? 'Apto a Receber' : 'Bloqueado'}
            </h3>
            {!summary.isRegular && (
              <p className="text-xs text-red-500 mt-1 font-medium">Resolva as pendências abaixo.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SEÇÃO 1: Checklist de Regularidade (Esquerda) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
             <h3 className="font-bold text-[#1a3e3e] flex items-center gap-2">
               <CheckCircle className="w-5 h-5 text-[#2e6a50]" />
               Requisitos de Regularidade
             </h3>
             <span className="text-xs text-[#bbbbbb]">Atualizado hoje</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#bbbbbb]/30 divide-y divide-[#bbbbbb]/10 overflow-hidden">
            {regularityItems.map((item) => (
              <div key={item.id} className="p-4 hover:bg-[#f7f7f7] transition-colors group">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{renderStatusIcon(item.status)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-[#1a3e3e] text-sm truncate">{item.name}</p>
                      {renderStatusBadge(item.status)}
                    </div>
                    <p className="text-xs text-[#626262] mb-2">{item.description}</p>
                    
                    <a href="#" className="inline-flex items-center gap-1 text-xs font-medium text-[#2e6a50] hover:underline">
                      <FileText className="w-3 h-3" />
                      Ver Certidão
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-[#e8f5e9] border border-[#2e6a50]/20 rounded-lg p-4 text-xs text-[#1a3e3e]">
            <p className="font-bold mb-1 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#2e6a50]" />
              Dica do Especialista
            </p>
            <p>A regularidade no <strong>CADINE</strong> é pré-requisito obrigatório para qualquer desembolso financeiro do Estado, inclusive de convênios já em andamento.</p>
          </div>
        </div>

        {/* SEÇÃO 2: Carteira de Convênios (Direita - Mais Larga) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
             <h3 className="font-bold text-[#1a3e3e] flex items-center gap-2">
               <Briefcase className="w-5 h-5 text-[#2e6a50]" />
               Carteira de Convênios
             </h3>
             <span className="text-xs font-medium text-[#626262] bg-[#f7f7f7] px-2 py-1 rounded-md">
               {filteredConvenios.length} encontrado(s)
             </span>
          </div>

          {/* BARRA DE FILTROS */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bbbbbb]/30 flex flex-col md:flex-row gap-4 items-center">
            
            {/* Busca Textual */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbbbbb]" />
              <input 
                type="text" 
                placeholder="Buscar por objeto ou número..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#f7f7f7] border border-[#bbbbbb]/30 rounded-lg text-sm focus:outline-none focus:border-[#2e6a50] transition-colors"
              />
            </div>

            {/* Filtro de Status */}
            <div className="relative w-full md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-[#f7f7f7] border border-[#bbbbbb]/30 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#2e6a50] cursor-pointer"
              >
                <option value="todos">Todos os Status</option>
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbbbbb] pointer-events-none" />
            </div>

            {/* Filtro de Órgão */}
            <div className="relative w-full md:w-48">
              <select
                value={agencyFilter}
                onChange={(e) => setAgencyFilter(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-[#f7f7f7] border border-[#bbbbbb]/30 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#2e6a50] cursor-pointer"
              >
                <option value="todos">Todos os Órgãos</option>
                {agencies.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbbbbb] pointer-events-none" />
            </div>
            
            {/* Botão Limpar Filtros (aparece apenas se houver filtros ativos) */}
            {(searchQuery || statusFilter !== 'todos' || agencyFilter !== 'todos') && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('todos');
                  setAgencyFilter('todos');
                }}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Limpar filtros"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="space-y-4">
            {filteredConvenios.length > 0 ? (
              filteredConvenios.map((item) => {
                const daysRemaining = Math.ceil((new Date(item.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                const isUrgent = daysRemaining < 30 && daysRemaining > 0;
                const isExpired = daysRemaining < 0;
                const progress = (item.valueReleased / item.valueTotal) * 100;

                return (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm border border-[#bbbbbb]/30 p-5 hover:shadow-md transition-shadow">
                    {/* Header do Card */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-[#f7f7f7] border border-[#bbbbbb]/30 rounded text-xs font-mono text-[#626262]">
                            {item.number}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                            item.status === 'Em Execução' ? 'bg-blue-50 text-blue-600' :
                            item.status === 'Paralisado' ? 'bg-red-50 text-red-600' :
                            'bg-orange-50 text-orange-600'
                          }`}>
                            {item.status}
                          </span>
                          <span className="text-xs font-semibold text-[#bbbbbb]">• {item.agency}</span>
                        </div>
                        <h4 className="font-bold text-[#1a3e3e] text-lg">{item.object}</h4>
                      </div>
                      
                      <div className="text-right">
                         <p className="text-xs text-[#bbbbbb] uppercase font-semibold">Valor Total</p>
                         <p className="text-xl font-bold text-[#2e6a50]">{formatCurrency(item.valueTotal)}</p>
                      </div>
                    </div>

                    {/* Dados Financeiros e Prazos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#f7f7f7] rounded-lg p-4 mb-4">
                      {/* Barra de Progresso Financeiro */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-[#626262]">Execução Financeira</span>
                          <span className="text-[#1a3e3e]">{progress.toFixed(1)}% ({formatCurrency(item.valueReleased)})</span>
                        </div>
                        <div className="h-2 w-full bg-[#bbbbbb]/30 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.status === 'Paralisado' ? 'bg-red-500' : 'bg-[#2e6a50]'}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Vigência e Alertas */}
                      <div className="flex items-center justify-between md:justify-end gap-4">
                        <div className="text-right">
                          <p className="text-xs text-[#bbbbbb] mb-0.5 flex items-center justify-end gap-1">
                            <Calendar className="w-3 h-3" /> Vigência
                          </p>
                          <p className={`font-semibold text-sm ${
                            isExpired ? 'text-red-600' : isUrgent ? 'text-orange-600' : 'text-[#1a3e3e]'
                          }`}>
                            {new Date(item.startDate).toLocaleDateString()} até {new Date(item.endDate).toLocaleDateString()}
                          </p>
                          
                          {(isUrgent || isExpired) && (
                            <p className="text-xs font-bold text-red-500 flex items-center justify-end gap-1 mt-1">
                              <AlertTriangle className="w-3 h-3" />
                              {isExpired ? 'Vigência Expirada!' : `Expira em ${daysRemaining} dias`}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center gap-3 pt-2 border-t border-[#bbbbbb]/10">
                      <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1a3e3e] bg-white border border-[#bbbbbb]/50 rounded-lg hover:bg-[#f7f7f7] transition-colors">
                        <Download className="w-3 h-3" />
                        Plano de Trabalho
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1a3e3e] bg-white border border-[#bbbbbb]/50 rounded-lg hover:bg-[#f7f7f7] transition-colors">
                        <ExternalLink className="w-3 h-3" />
                        Visualizar no Siconv-CE
                      </button>
                      
                      {isUrgent && (
                        <button className="ml-auto flex items-center gap-2 px-3 py-2 text-xs font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors shadow-sm animate-pulse">
                           Solicitar Aditivo de Prazo
                        </button>
                      )}
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-[#bbbbbb]/30 p-12 text-center">
                <Search className="w-12 h-12 text-[#bbbbbb] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#1a3e3e]">Nenhum convênio encontrado</h3>
                <p className="text-sm text-[#626262]">Tente ajustar seus filtros de busca.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('todos');
                    setAgencyFilter('todos');
                  }}
                  className="mt-4 text-sm font-medium text-[#2e6a50] hover:underline"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}