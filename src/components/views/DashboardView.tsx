import React, { useMemo } from 'react';
import type { CityData } from '../../lib/data';
import { 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  Building2, 
  FileCheck, 
  Landmark,
  RefreshCw,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend 
} from 'recharts';

// Importação de Dados Reais
import { getCaucData } from '../../lib/cauc-data';
import { getEParceriasData, formatCurrency } from '../../lib/eparcerias-data';
import { getCertidoesData, getDaysRemaining } from '../../lib/certidoes-data';

interface DashboardViewProps {
  city: CityData;
  onNavigate: (view: string) => void;
}

const COLORS = {
  regular: '#2e6a50', // Verde E-Smart
  warning: '#e8a455', // Amarelo
  critical: '#ef4444', // Vermelho
  blue: '#3b82f6',
  gray: '#94a3b8',
  background: '#f8fafc'
};

const ChartWrapper = ({ children, height = 250 }: { children: React.ReactNode; height?: number }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (!ref.current) return;
    
    // Increased delay to ensure parent container is fully rendered
    const timeoutId = setTimeout(() => {
      if (!ref.current) return;
      
      const observer = new ResizeObserver((entries) => {
        window.requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) return;
          const entry = entries[0];
          const width = Math.max(0, entry.contentRect.width);
          const height = Math.max(0, entry.contentRect.height);
          
          // Update dimensions only if positive and reasonable
          if (width > 10 && height > 10) {
            setDimensions({ width, height });
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      });

      observer.observe(ref.current);
      
      // Check immediately in case it's already visible
      const rect = ref.current.getBoundingClientRect();
      const immediateWidth = Math.max(0, rect.width);
      const immediateHeight = Math.max(0, rect.height);
      
      if (immediateWidth > 10 && immediateHeight > 10) {
        setDimensions({ width: immediateWidth, height: immediateHeight });
        setIsVisible(true);
      }

      return () => observer.disconnect();
    }, 100); // Increased to 100ms delay to ensure layout is ready

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div 
      ref={ref} 
      className="w-full relative" 
      style={{ 
        height: `${Math.max(height, 200)}px`, 
        minWidth: '200px', 
        minHeight: `${Math.max(height, 200)}px`,
        overflow: 'hidden'
      }}
    >
      {isVisible && dimensions.width > 10 && dimensions.height > 10 ? children : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Carregando gráfico...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function DashboardView({ city, onNavigate }: DashboardViewProps) {
  
  // 1. CARREGAMENTO DE DADOS
  const caucItems = useMemo(() => getCaucData(city), [city]);
  const parceriasData = useMemo(() => getEParceriasData(city), [city]);
  const certidoesItems = useMemo(() => getCertidoesData(city), [city]);

  // Bugfix: Evitar renderização inicial sem dimensões (Recharts width(-1) error)
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // 2. LÓGICA DE STATUS E CONTADORES
  
  // CAUC (Federal)
  const caucPendencias = caucItems.filter(i => i.status !== 'regular');
  const isCaucClean = caucPendencias.length === 0;

  // E-Parcerias (Estadual)
  const parceriasPendencias = parceriasData.regularityItems.filter(i => i.status !== 'regular');
  const isParceriasClean = parceriasPendencias.length === 0;

  // Certidões (Documentos)
  const certidoesVencidasOrWarning = certidoesItems.filter(c => getDaysRemaining(c.expirationDate) <= 15);
  
  // Status Geral
  const isAdimplente = isCaucClean && isParceriasClean;

  // Simulação de Limites Constitucionais (Logica baseada na cidade para variar os dados)
  const limitesData = useMemo(() => {
    // Simulando que Caucaia está com problema na Educação
    const isCaucaia = city.id === 'caucaia';
    return {
      saude: { current: 18.5, min: 15, status: 'ok' },
      educacao: { current: isCaucaia ? 24.1 : 26.2, min: 25, status: isCaucaia ? 'critical' : 'ok' },
      pessoal: { current: 48.2, max: 54, status: 'ok' }
    };
  }, [city]);

  // Convênios a Vencer (Top 3)
  const conveniosVencendo = useMemo(() => {
    return [...parceriasData.convenios]
      .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
      .slice(0, 3);
  }, [parceriasData]);

  // Saldo a Receber
  const saldoAReceber = parceriasData.summary.totalCaptado - parceriasData.summary.totalLiberado;

  // 3. PREPARAÇÃO DOS GRÁFICOS

  // Gráfico de Rosca: Composição da Dívida/Pendências
  const compositionData = useMemo(() => {
    const counts = { 'Previdenciário': 0, 'Fiscal/Tributário': 0, 'Prest. Contas': 0, 'Transparência': 0 };
    
    // Mapear grupos do CAUC para categorias legíveis
    caucItems.forEach(i => {
      if (i.status !== 'regular') {
        if (i.group === 1) counts['Fiscal/Tributário']++;
        else if (i.group === 2) counts['Previdenciário']++; // Simplificação para demo
        else if (i.group === 3) counts['Prest. Contas']++;
        else counts['Transparência']++;
      }
    });

    // Adicionar pendências estaduais
    parceriasPendencias.forEach(i => counts['Prest. Contas']++);

    return Object.entries(counts)
      .filter(([_, val]) => val > 0)
      .map(([name, value]) => ({ name, value }));
  }, [caucItems, parceriasPendencias]);

  // Gráfico de Barras: Execução Financeira
  const executionData = [
    {
      name: 'Convênios Estaduais',
      planejado: parceriasData.summary.totalCaptado,
      executado: parceriasData.summary.totalLiberado
    }
  ];

  // 4. TABELA DE AÇÕES RECOMENDADAS
  const recommendedActions = useMemo(() => {
    const actions: any[] = [];

    // Ações CAUC
    caucPendencias.forEach(p => {
      actions.push({
        id: p.id,
        module: 'CAUC',
        text: `Pendência no ${p.source}: ${p.description}`,
        actionLabel: 'Ver Detalhes',
        target: 'cauc',
        urgency: 'high'
      });
    });

    // Ações Certidões
    certidoesVencidasOrWarning.forEach(c => {
      const days = getDaysRemaining(c.expirationDate);
      actions.push({
        id: c.id,
        module: 'Certidões',
        text: `A Certidão ${c.organ} (${c.type}) ${days < 0 ? 'está vencida' : `vence em ${days} dias`}.`,
        actionLabel: days < 0 ? 'Renovar Agora' : 'Agendar',
        target: 'certidoes',
        urgency: days < 0 ? 'high' : 'medium'
      });
    });

    // Ações Convênios
    conveniosVencendo.forEach(c => {
      const days = getDaysRemaining(c.endDate);
      if (days < 60) {
        actions.push({
          id: c.id,
          module: 'E-Parcerias',
          text: `Convênio "${c.object}" encerra em ${days} dias. Necessário aditivo.`,
          actionLabel: 'Solicitar Aditivo',
          target: 'parcerias',
          urgency: 'medium'
        });
      }
    });

    return actions.sort((a, b) => (a.urgency === 'high' ? -1 : 1));
  }, [caucPendencias, certidoesVencidasOrWarning, conveniosVencendo]);


  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      
      {/* 1. PAINEL DE STATUS IMEDIATO (HEADLINE) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Badge de Situação Fiscal */}
          <div className="flex items-center gap-5 w-full lg:w-auto">
            <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-sm border ${
              isAdimplente 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                : 'bg-red-50 border-red-100 text-red-800'
            }`}>
              {isAdimplente ? <CheckCircle className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider opacity-70">Situação Fiscal</p>
                <h1 className="text-2xl font-bold">{isAdimplente ? 'ADIMPLENTE' : 'INADIMPLENTE'}</h1>
              </div>
            </div>
          </div>

          {/* Ranking de Gravidade (Contadores) */}
          <div className="grid grid-cols-3 gap-4 w-full lg:w-auto flex-1 max-w-2xl">
            {/* Federal */}
            <div 
              className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onNavigate('cauc')}
            >
              <span className="text-xs font-bold text-gray-500 uppercase mb-1">Federal (CAUC)</span>
              <div className="flex items-center gap-2">
                <Landmark className={`w-4 h-4 ${caucPendencias.length > 0 ? 'text-red-500' : 'text-gray-400'}`} />
                <span className={`text-2xl font-bold ${caucPendencias.length > 0 ? 'text-red-600' : 'text-[#2e6a50]'}`}>
                  {caucPendencias.length}
                </span>
              </div>
            </div>

            {/* Estadual */}
            <div 
              className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onNavigate('parcerias')}
            >
              <span className="text-xs font-bold text-gray-500 uppercase mb-1">Estadual (Parcerias)</span>
              <div className="flex items-center gap-2">
                <Building2 className={`w-4 h-4 ${parceriasPendencias.length > 0 ? 'text-red-500' : 'text-gray-400'}`} />
                <span className={`text-2xl font-bold ${parceriasPendencias.length > 0 ? 'text-red-600' : 'text-[#2e6a50]'}`}>
                  {parceriasPendencias.length}
                </span>
              </div>
            </div>

            {/* Certidões */}
            <div 
              className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onNavigate('certidoes')}
            >
              <span className="text-xs font-bold text-gray-500 uppercase mb-1">Certidões</span>
              <div className="flex items-center gap-2">
                <FileCheck className={`w-4 h-4 ${certidoesVencidasOrWarning.length > 0 ? 'text-amber-500' : 'text-gray-400'}`} />
                <span className={`text-2xl font-bold ${certidoesVencidasOrWarning.length > 0 ? 'text-amber-500' : 'text-[#2e6a50]'}`}>
                  {certidoesVencidasOrWarning.length}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. WIDGETS DE MONITORAMENTO ATIVO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* A. CARD CAUC: Alerta de Repasses & Limites */}
        <div 
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col cursor-pointer hover:border-[#2e6a50]/50 transition-colors"
          onClick={() => onNavigate('cauc')}
        >
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <h3 className="font-bold text-[#1a3e3e]">CAUC: Repasses Federais</h3>
            <ShieldAlert className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-600">Aplicação Saúde (Min 15%)</span>
                <span className={limitesData.saude.status === 'critical' ? 'text-red-600 font-bold' : 'text-[#2e6a50]'}>
                  {limitesData.saude.current}%
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${limitesData.saude.status === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-[#2e6a50]'}`} 
                  style={{ width: `${(limitesData.saude.current / 20) * 100}%` }} 
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-600">Aplicação Educação (Min 25%)</span>
                <span className={limitesData.educacao.status === 'critical' ? 'text-red-600 font-bold' : 'text-[#2e6a50]'}>
                  {limitesData.educacao.current}%
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${limitesData.educacao.status === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-[#2e6a50]'}`} 
                  style={{ width: `${(limitesData.educacao.current / 30) * 100}%` }} 
                />
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Pendências Críticas</p>
            {caucPendencias.length > 0 ? (
              <ul className="space-y-2">
                {caucPendencias.slice(0, 2).map((item) => (
                  <li key={item.id} className="flex items-start gap-2 text-xs text-red-700 bg-red-50 p-2 rounded">
                    <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                    <span className="line-clamp-1">{item.description}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center gap-2 text-xs text-[#2e6a50] bg-[#2e6a50]/10 p-2 rounded">
                <CheckCircle className="w-3 h-3" /> Sem bloqueios ativos
              </div>
            )}
          </div>
        </div>

        {/* B. CARD E-PARCERIAS: Gestão de Convênios */}
        <div 
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col cursor-pointer hover:border-[#2e6a50]/50 transition-colors relative overflow-hidden group"
          onClick={() => onNavigate('parcerias')}
        >
          {/* Background Decorativo Removido */}


          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 relative z-10">
            <h3 className="font-bold text-[#1a3e3e]">Convênios Estaduais</h3>
            <Building2 className="w-5 h-5 text-gray-400" />
          </div>

          <div className="mb-6 relative z-10">
            <p className="text-xs font-medium text-gray-500 uppercase mb-1">Saldo a Receber</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold text-[#1a3e3e]">{formatCurrency(saldoAReceber)}</h2>
              <span className="text-xs font-medium text-[#2e6a50] bg-[#2e6a50]/10 px-2 py-0.5 rounded-full">Disponível</span>
            </div>
          </div>

          <div className="mt-auto relative z-10">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Próximos Vencimentos</p>
            <div className="space-y-3">
              {conveniosVencendo.map((conv) => (
                <div key={conv.id} className="flex items-center justify-between text-xs">
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="font-medium text-gray-900 truncate">{conv.object}</p>
                    <p className="text-gray-500 text-[10px]">{conv.agency}</p>
                  </div>
                  <span className="font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    {new Date(conv.endDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* C. CARD CERTIDÕES: Linha do Tempo */}
        <div 
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col cursor-pointer hover:border-[#2e6a50]/50 transition-colors"
          onClick={() => onNavigate('certidoes')}
        >
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <h3 className="font-bold text-[#1a3e3e]">Linha do Tempo (15 dias)</h3>
            <FileCheck className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex-1 overflow-hidden">
             {certidoesVencidasOrWarning.length > 0 ? (
               <div className="space-y-4">
                 {certidoesVencidasOrWarning.slice(0, 4).map((cert) => {
                   const days = getDaysRemaining(cert.expirationDate);
                   return (
                     <div key={cert.id} className="flex items-start gap-3">
                       <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${days < 0 ? 'bg-red-500' : 'bg-amber-500'}`} />
                       <div className="flex-1">
                         <div className="flex justify-between items-start">
                           <span className="text-xs font-bold text-gray-900 line-clamp-1">{cert.name}</span>
                           <span className={`text-[10px] font-bold px-1.5 rounded ${days < 0 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                             {days < 0 ? 'Vencida' : `${days}d`}
                           </span>
                         </div>
                         <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
                           <RefreshCw className="w-3 h-3" />
                           <span>Renovação automática: <span className="text-[#2e6a50] font-medium">Ativa</span></span>
                         </div>
                       </div>
                     </div>
                   );
                 })}
               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-gray-400">
                 <CheckCircle className="w-10 h-10 mb-2 opacity-30" />
                 <p className="text-xs">Nenhuma certidão vencendo.</p>
               </div>
             )}
          </div>
        </div>

      </div>

      {/* 3. GRÁFICOS DE GESTÃO CONTEXTUALIZADOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Rosca: Composição de Dívida */}
        <div 
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col cursor-pointer min-w-0"
          onClick={() => onNavigate('cauc')}
        >
          <h3 className="font-bold text-[#1a3e3e] mb-2">Composição de Pendências</h3>
          <p className="text-xs text-gray-500 mb-4">Distribuição por natureza da irregularidade</p>
          
          <ChartWrapper height={250}>
            {compositionData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <PieChart>
                  <Pie
                    data={compositionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {compositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[COLORS.warning, COLORS.critical, COLORS.blue, COLORS.regular][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 animate-in fade-in zoom-in duration-300">
                <div className="w-14 h-14 rounded-full bg-[#2e6a50]/10 flex items-center justify-center mb-3 shadow-sm border border-[#2e6a50]/20">
                  <CheckCircle className="w-7 h-7 text-[#2e6a50]" />
                </div>
                <h4 className="text-xl font-bold text-[#2e6a50]">0 Pendências</h4>
                <p className="text-xs text-gray-500 mt-1 font-medium max-w-[180px]">
                  Excelente! O município está com a situação regularizada.
                </p>
              </div>
            )}
          </ChartWrapper>
        </div>

        {/* Barras: Execução Financeira */}
        <div 
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col cursor-pointer min-w-0"
          onClick={() => onNavigate('parcerias')}
        >
          <h3 className="font-bold text-[#1a3e3e] mb-2">Execução Financeira</h3>
          <p className="text-xs text-gray-500 mb-4">Total Captado vs. Total Liberado (E-Parcerias)</p>
          
          <ChartWrapper height={250}>
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={executionData} layout="vertical" margin={{ left: 0, right: 20, top: 0, bottom: 0 }} barGap={0}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" hide width={10} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  formatter={(value: any) => [formatCurrency(value), '']}
                />
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                <Bar name="Planejado (Captado)" dataKey="planejado" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={32} />
                <Bar name="Executado (Liberado)" dataKey="executado" fill="#2e6a50" radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>

      </div>

      {/* 4. TABELA DE "AÇÕES RECOMENDADAS" */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#2e6a50]" />
            <h3 className="font-bold text-[#1a3e3e]">Ações Recomendadas</h3>
          </div>
          <span className="text-xs bg-[#2e6a50]/10 text-[#2e6a50] px-2 py-1 rounded-full font-bold">
            {recommendedActions.length} Pendentes
          </span>
        </div>
        
        <div className="divide-y divide-gray-100">
          {recommendedActions.length > 0 ? (
            recommendedActions.map((action, idx) => (
              <div 
                key={`${action.id}-${idx}`} 
                className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                onClick={() => onNavigate(action.target)}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${action.urgency === 'high' ? 'bg-red-500' : 'bg-amber-500'}`} />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase text-gray-500 border border-gray-200 px-1.5 rounded">
                        {action.module}
                      </span>
                      {action.urgency === 'high' && (
                        <span className="text-[10px] font-bold uppercase text-red-600">Urgente</span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{action.text}</p>
                  </div>
                </div>
                
                <button className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#2e6a50] bg-[#2e6a50]/5 px-3 py-1.5 rounded-lg group-hover:bg-[#2e6a50] group-hover:text-white transition-all">
                  {action.actionLabel}
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 text-sm">
              Nenhuma ação pendente no momento. Excelente gestão!
            </div>
          )}
        </div>
      </div>

    </div>
  );
}