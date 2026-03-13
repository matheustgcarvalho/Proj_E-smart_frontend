import React, { useState, useMemo } from 'react';
import { 
  HandshakeIcon, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  DollarSign,
  ExternalLink,
  MessageSquare,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  Building2,
  Search,
  Filter,
  X,
  PlayCircle,
  ShieldAlert,
  Ban
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import type { CityData } from '../../lib/data';
import { CONVENIOS_DATA, calcularDiasRestantes } from '@/lib/convenios-data';
import type { ConvenioEstadual, ConvenioFederal, ConvenioStatus, EmpenhoStatus } from '@/lib/convenios-data';

interface ConveniosViewProps {
  city: CityData;
  onOpenDetalhamento: (id: string) => void;
}

export default function ConveniosView({ city, onOpenDetalhamento }: ConveniosViewProps) {
  const [chamadoModalOpen, setChamadoModalOpen] = useState(false);
  const [convenioSelecionado, setConvenioSelecionado] = useState<{
    id: string;
    numero: string;
    tipo: 'estadual' | 'federal';
  } | null>(null);
  
  const [chamadoForm, setChamadoForm] = useState({
    tipo: '',
    prioridade: '',
    descricao: ''
  });

  // Estados de Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [instituicaoFilter, setInstituicaoFilter] = useState<string>('todos');
  const [vigenciaFilter, setVigenciaFilter] = useState<string>('todos');

  const conveniosData = CONVENIOS_DATA[city.id] || CONVENIOS_DATA['fortaleza'];

  // Calcular KPIs adicionais
  const conveniosEstaduaisRegulares = useMemo(() => {
    return conveniosData.estaduais.filter(c => 
      c.status !== 'Inadimplente' && 
      c.status !== 'Suspenso' && 
      !c.temIrregularidade
    ).length;
  }, [conveniosData]);

  const conveniosEstaduaisIrregulares = useMemo(() => {
    return conveniosData.estaduais.filter(c => 
      c.status === 'Inadimplente' || c.temIrregularidade
    ).length;
  }, [conveniosData]);

  const conveniosEstaduaisBloqueados = useMemo(() => {
    return conveniosData.estaduais.filter(c => c.status === 'Suspenso').length;
  }, [conveniosData]);

  const vigenciasEstaduaisVencer90Dias = useMemo(() => {
    return conveniosData.estaduais.filter(c => {
      const dias = calcularDiasRestantes(c.vigenciaFim);
      return dias > 0 && dias <= 90;
    }).length;
  }, [conveniosData]);

  // Listas únicas para os filtros
  const instituicoesEstaduais = useMemo(() => {
    const unique = new Set(conveniosData.estaduais.map(c => c.instituicao));
    return Array.from(unique);
  }, [conveniosData.estaduais]);

  const ministerios = useMemo(() => {
    const unique = new Set(conveniosData.federais.map(c => c.ministerio));
    return Array.from(unique);
  }, [conveniosData.federais]);

  // Função de filtragem para convênios estaduais
  const conveniosEstaduaisFiltrados = useMemo(() => {
    return conveniosData.estaduais.filter(convenio => {
      const matchesSearch = 
        convenio.numeroInstrumento.toLowerCase().includes(searchQuery.toLowerCase()) ||
        convenio.objeto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        convenio.instituicao.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'todos' || convenio.status === statusFilter;
      
      const matchesInstituicao = instituicaoFilter === 'todos' || convenio.instituicao === instituicaoFilter;

      const diasRestantes = calcularDiasRestantes(convenio.vigenciaFim);
      const matchesVigencia = 
        vigenciaFilter === 'todos' ||
        (vigenciaFilter === 'vencendo' && diasRestantes < 60 && diasRestantes >= 0) ||
        (vigenciaFilter === 'vencidos' && diasRestantes < 0) ||
        (vigenciaFilter === 'normal' && diasRestantes >= 60);

      return matchesSearch && matchesStatus && matchesInstituicao && matchesVigencia;
    });
  }, [conveniosData.estaduais, searchQuery, statusFilter, instituicaoFilter, vigenciaFilter]);

  // Função de filtragem para convênios federais
  const conveniosFederaisFiltrados = useMemo(() => {
    return conveniosData.federais.filter(convenio => {
      const matchesSearch = 
        convenio.numeroConvenio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        convenio.objeto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        convenio.ministerio.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'todos' || convenio.status === statusFilter;
      
      const matchesInstituicao = instituicaoFilter === 'todos' || convenio.ministerio === instituicaoFilter;

      const diasRestantes = calcularDiasRestantes(convenio.vigenciaFim);
      const matchesVigencia = 
        vigenciaFilter === 'todos' ||
        (vigenciaFilter === 'vencendo' && diasRestantes < 60 && diasRestantes >= 0) ||
        (vigenciaFilter === 'vencidos' && diasRestantes < 0) ||
        (vigenciaFilter === 'normal' && diasRestantes >= 60);

      return matchesSearch && matchesStatus && matchesInstituicao && matchesVigencia;
    });
  }, [conveniosData.federais, searchQuery, statusFilter, instituicaoFilter, vigenciaFilter]);

  const limparFiltros = () => {
    setSearchQuery('');
    setStatusFilter('todos');
    setInstituicaoFilter('todos');
    setVigenciaFilter('todos');
  };

  const temFiltrosAtivos = searchQuery || statusFilter !== 'todos' || instituicaoFilter !== 'todos' || vigenciaFilter !== 'todos';

  const abrirChamado = (id: string, numero: string, tipo: 'estadual' | 'federal') => {
    setConvenioSelecionado({ id, numero, tipo });
    setChamadoModalOpen(true);
  };

  const enviarChamado = () => {
    // Lógica de envio do chamado (simulada)
    console.log('Chamado enviado:', {
      convenio: convenioSelecionado,
      municipio: city.name,
      ...chamadoForm
    });
    setChamadoModalOpen(false);
    setChamadoForm({ tipo: '', prioridade: '', descricao: '' });
    setConvenioSelecionado(null);
  };

  const getStatusBadge = (status: ConvenioStatus) => {
    const variants: Record<ConvenioStatus, { variant: any; icon: any }> = {
      'Em Execução': { variant: 'default', icon: TrendingUp },
      'Prestação de Contas': { variant: 'secondary', icon: FileText },
      'Inadimplente': { variant: 'destructive', icon: XCircle },
      'Concluído': { variant: 'outline', icon: CheckCircle2 },
      'Suspenso': { variant: 'destructive', icon: AlertCircle }
    };

    const config = variants[status] || variants['Em Execução'];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const getEmpenhoIcon = (situacao: EmpenhoStatus) => {
    switch (situacao) {
      case 'Empenhado':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'Liquidado':
        return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
      case 'Pago':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    }
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor);
  };

  const getDiasRestantesColor = (dias: number) => {
    if (dias < 30) return 'text-red-600 font-bold';
    if (dias < 60) return 'text-orange-600 font-semibold';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#2e6a50] rounded-xl flex items-center justify-center">
          <HandshakeIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Convênios</h1>
          <p className="text-gray-500">Acompanhamento de convênios estaduais e federais</p>
        </div>
      </div>

      {/* Cards KPI - Apenas para Convênios Estaduais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Convênios Regulares */}
        <Card className="bg-green-50 border-green-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-4">
            <CardTitle className="text-sm font-semibold text-gray-700">Regulares</CardTitle>
            <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-700" />
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-3xl font-bold text-green-700">{conveniosEstaduaisRegulares}</div>
          </CardContent>
        </Card>

        {/* Convênios Irregulares */}
        <Card className="bg-red-50 border-red-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-4">
            <CardTitle className="text-sm font-semibold text-gray-700">Irregulares</CardTitle>
            <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
              <ShieldAlert className="h-3.5 w-3.5 text-red-700" />
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-3xl font-bold text-red-700">{conveniosEstaduaisIrregulares}</div>
          </CardContent>
        </Card>

        {/* Convênios Bloqueados */}
        <Card className="bg-gray-50 border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-4">
            <CardTitle className="text-sm font-semibold text-gray-700">Bloqueados</CardTitle>
            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
              <Ban className="h-3.5 w-3.5 text-gray-700" />
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-3xl font-bold text-gray-700">{conveniosEstaduaisBloqueados}</div>
          </CardContent>
        </Card>

        {/* Vigência a Vencer em até 90 dias */}
        <Card className="bg-orange-50 border-orange-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-4">
            <CardTitle className="text-sm font-semibold text-gray-700">Vigência a Vencer</CardTitle>
            <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
              <Clock className="h-3.5 w-3.5 text-orange-700" />
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-3xl font-bold text-orange-700">{vigenciasEstaduaisVencer90Dias}</div>
            <p className="text-[10px] text-gray-500 mt-0">Próximos 90 dias</p>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Busca Textual */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Buscar por número, objeto ou instituição..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filtro de Status */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="Em Execução">Em Execução</SelectItem>
                <SelectItem value="Prestação de Contas">Prestação de Contas</SelectItem>
                <SelectItem value="Inadimplente">Inadimplente</SelectItem>
                <SelectItem value="Suspenso">Suspenso</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
              </SelectContent>
            </Select>

            {/* Filtro de Instituição/Ministério */}
            <Select value={instituicaoFilter} onValueChange={setInstituicaoFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Instituição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas Instituições</SelectItem>
                {[...instituicoesEstaduais, ...ministerios].map((inst) => (
                  <SelectItem key={inst} value={inst}>{inst}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filtro de Vigência */}
            <Select value={vigenciaFilter} onValueChange={setVigenciaFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Vigência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas Vigências</SelectItem>
                <SelectItem value="vencendo">Vencendo (&lt; 60 dias)</SelectItem>
                <SelectItem value="normal">Normal (&gt;= 60 dias)</SelectItem>
                <SelectItem value="vencidos">Vencidos</SelectItem>
              </SelectContent>
            </Select>

            {/* Botão Limpar Filtros */}
            {temFiltrosAtivos && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={limparFiltros}
                className="shrink-0"
                title="Limpar filtros"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Contador de Resultados */}
          {temFiltrosAtivos && (
            <div className="mt-4 text-sm text-gray-600">
              Mostrando <span className="font-bold">{conveniosEstaduaisFiltrados.length + conveniosFederaisFiltrados.length}</span> convênio(s) de <span className="font-bold">{conveniosData.estaduais.length + conveniosData.federais.length}</span> total
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs: Convênios Estaduais e Federais */}
      <Tabs defaultValue="estaduais" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="estaduais">Convênios Estaduais</TabsTrigger>
          <TabsTrigger value="federais">Convênios Federais</TabsTrigger>
        </TabsList>

        {/* Convênios Estaduais */}
        <TabsContent value="estaduais" className="space-y-3">
          {conveniosEstaduaisFiltrados.map((convenio) => {
            const diasRestantes = calcularDiasRestantes(convenio.vigenciaFim);
            
            return (
              <Card 
                key={convenio.id} 
                className={`${convenio.temIrregularidade ? 'border-l-4 border-l-red-500' : ''} cursor-pointer hover:shadow-lg transition-all hover:scale-[1.01]`}
                onDoubleClick={() => onOpenDetalhamento(convenio.id)}
              >
                <CardContent className="p-5">
                  {convenio.temIrregularidade && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Irregularidade Detectada</AlertTitle>
                      <AlertDescription>
                        Este convênio apresenta pendências que impedem o prosseguimento normal da execução.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex items-center justify-between gap-4">
                    {/* Nº de Convênio e Status */}
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base font-bold text-gray-900">{convenio.numeroInstrumento}</span>
                          {getStatusBadge(convenio.status)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{convenio.instituicao}</span>
                        </div>
                      </div>
                    </div>

                    {/* Botão Abrir Detalhamento */}
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetalhamento(convenio.id);
                      }}
                      className="bg-[#2e6a50] hover:bg-[#1a3e3e] shrink-0"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Abrir Detalhamento
                    </Button>
                  </div>

                  {/* Objeto */}
                  <p className="text-sm text-gray-700 mt-3 mb-4 line-clamp-2">{convenio.objeto}</p>

                  {/* Informações Principais em Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Valor Global */}
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1.5">Valor Global</p>
                      <p className="text-lg font-bold text-gray-900">{formatarMoeda(convenio.valorGlobal)}</p>
                    </div>

                    {/* Vigência */}
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1.5">Vigência</p>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-sm font-bold text-gray-900">
                          {new Date(convenio.vigenciaFim).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className={`text-xs font-semibold ${getDiasRestantesColor(diasRestantes)}`}>
                        {diasRestantes > 0 ? `${diasRestantes} dias restantes` : 'Vencido'}
                      </p>
                    </div>

                    {/* Execução */}
                    <div className="flex items-center justify-end">
                      <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1.5">Execução</p>
                        <p className="text-2xl font-bold text-[#2e6a50]">{convenio.percentualExecucao}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {conveniosEstaduaisFiltrados.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-gray-500 py-8">
                  <HandshakeIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum convênio estadual cadastrado</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Convênios Federais */}
        <TabsContent value="federais" className="space-y-4">
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                  <HandshakeIcon className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Convênios Federais</h3>
                <p className="text-lg text-gray-600 mb-2">Módulo em Desenvolvimento</p>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  A funcionalidade de gestão de convênios federais está sendo desenvolvida e estará disponível em breve.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Abertura de Chamado */}
      <Dialog open={chamadoModalOpen} onOpenChange={setChamadoModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="font-bold text-gray-900">Abrir Chamado - Rastreabilidade Total</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              O chamado será vinculado automaticamente ao convênio e município para garantir rastreabilidade completa.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            
            {/* MUNICÍPIO e CONVÊNIO - Pré-preenchidos */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Município
                </label>
                <Input 
                  value={`${city.name} - ${city.uf}`} 
                  disabled 
                  className="bg-gray-50 text-gray-600 cursor-not-allowed border-gray-300" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Tipo de Convênio
                </label>
                <Input 
                  value={convenioSelecionado?.tipo === 'estadual' ? 'Estadual' : 'Federal'} 
                  disabled 
                  className="bg-gray-50 text-gray-600 cursor-not-allowed border-gray-300" 
                />
              </div>
            </div>

            {/* NÚMERO DO CONVÊNIO - Pré-preenchido */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                Número do Convênio
              </label>
              <Input 
                value={convenioSelecionado?.numero || ''} 
                disabled 
                className="bg-gray-50 text-gray-600 cursor-not-allowed border-gray-300" 
              />
            </div>

            {/* TIPO DE PROBLEMA e PRIORIDADE */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Tipo de Problema
                </label>
                <Select 
                  value={chamadoForm.tipo} 
                  onValueChange={(value) => setChamadoForm({ ...chamadoForm, tipo: value })}
                >
                  <SelectTrigger className="border-gray-300 bg-white">
                    <SelectValue placeholder="Selecione o tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medicao">Problema com Medição</SelectItem>
                    <SelectItem value="repasse">Atraso no Repasse</SelectItem>
                    <SelectItem value="documentacao">Documentação Pendente</SelectItem>
                    <SelectItem value="vigencia">Prorrogação de Vigência</SelectItem>
                    <SelectItem value="prestacao">Prestação de Contas</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Prioridade
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['baixa', 'media', 'alta', 'urgente'].map((prioridade) => (
                    <button
                      key={prioridade}
                      type="button"
                      onClick={() => setChamadoForm({ ...chamadoForm, prioridade })}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                        chamadoForm.prioridade === prioridade
                          ? 'bg-[#2e6a50] text-white border-[#2e6a50] shadow-sm'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {prioridade === 'media' ? 'Média' : prioridade.charAt(0).toUpperCase() + prioridade.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* DESCRIÇÃO DO PROBLEMA */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                Descrição do Problema
              </label>
              <Textarea
                placeholder="Descreva o problema com detalhes, cite números de documentos ou medições se necessário..."
                rows={4}
                value={chamadoForm.descricao}
                onChange={(e) => setChamadoForm({ ...chamadoForm, descricao: e.target.value })}
                className="border-gray-300 resize-none"
              />
            </div>

          </div>

          <DialogFooter className="border-t pt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setChamadoModalOpen(false);
                setChamadoForm({ tipo: '', prioridade: '', descricao: '' });
              }}
              className="flex-1 border-gray-300"
            >
              Cancelar
            </Button>
            <Button 
              onClick={enviarChamado}
              disabled={!chamadoForm.tipo || !chamadoForm.prioridade || !chamadoForm.descricao}
              className="flex-1 bg-[#2e6a50] hover:bg-[#2e6a50]/90 shadow-sm"
            >
              Criar Chamado
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}