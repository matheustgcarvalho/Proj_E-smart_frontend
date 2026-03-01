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
  X
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

      {/* Cards KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total em Convênios</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatarMoeda(conveniosData.kpis.valorTotal)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {conveniosData.kpis.totalConvenios} convênios ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recursos a Receber</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatarMoeda(conveniosData.kpis.recursosReceber)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Aguardando liberação
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contrapartidas Pendentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatarMoeda(conveniosData.kpis.contrapartidasPendentes)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Depósito municipal necessário
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vigências Próximas</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {conveniosData.kpis.vigenciasProximasFim}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Expiram em menos de 60 dias
            </p>
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
        <TabsContent value="estaduais" className="space-y-4">
          {conveniosEstaduaisFiltrados.map((convenio) => {
            const diasRestantes = calcularDiasRestantes(convenio.vigenciaFim);
            
            return (
              <Card 
                key={convenio.id} 
                className={`${convenio.temIrregularidade ? 'border-red-300' : ''} cursor-pointer hover:shadow-md transition-shadow`}
                onDoubleClick={() => onOpenDetalhamento(convenio.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{convenio.numeroInstrumento}</CardTitle>
                        {getStatusBadge(convenio.status)}
                      </div>
                      <p className="text-sm text-gray-600">{convenio.objeto}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {convenio.instituicao}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {convenio.temIrregularidade && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Irregularidade Detectada</AlertTitle>
                      <AlertDescription>
                        Este convênio apresenta pendências que impedem o prosseguimento normal da execução.
                        Clique em "Abrir Chamado" para reportar o problema.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Valor Global</p>
                      <p className="text-lg font-bold">{formatarMoeda(convenio.valorGlobal)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Execução Financeira</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#2e6a50] transition-all"
                            style={{ width: `${convenio.percentualExecucao}%` }}
                          />
                        </div>
                        <span className="text-lg font-bold">{convenio.percentualExecucao}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vigência</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">
                          {new Date(convenio.vigenciaFim).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className={`text-sm ${getDiasRestantesColor(diasRestantes)}`}>
                        {diasRestantes > 0 ? `${diasRestantes} dias restantes` : 'Vencido'}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 text-sm text-gray-600">
                    Medições: {convenio.medicoesRealizadas} de {convenio.totalMedicoes} realizadas
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Plano de Trabalho
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver Medições
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetalhamento(convenio.id);
                      }}
                      className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Abrir Detalhamento
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        abrirChamado(convenio.id, convenio.numeroInstrumento, 'estadual');
                      }}
                      className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Abrir Chamado
                    </Button>
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
          {conveniosFederaisFiltrados.map((convenio) => {
            const diasRestantes = calcularDiasRestantes(convenio.vigenciaFim);
            
            return (
              <Card 
                key={convenio.id} 
                className={`${convenio.temIrregularidade ? 'border-red-300' : ''} cursor-pointer hover:shadow-md transition-shadow`}
                onDoubleClick={() => onOpenDetalhamento(convenio.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{convenio.numeroConvenio}</CardTitle>
                        {getStatusBadge(convenio.status)}
                      </div>
                      <p className="text-sm text-gray-600">{convenio.objeto}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {convenio.ministerio}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {convenio.clausulasSuspensivas && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Cláusula Suspensiva Ativa</AlertTitle>
                      <AlertDescription>
                        {convenio.motivoSuspensao || 'Recurso bloqueado por pendência documental.'}
                      </AlertDescription>
                    </Alert>
                  )}

                  {convenio.temIrregularidade && !convenio.clausulasSuspensivas && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Irregularidade Detectada</AlertTitle>
                      <AlertDescription>
                        Este convênio apresenta pendências. Clique em "Abrir Chamado" para reportar.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Valor Global</p>
                      <p className="text-lg font-bold">{formatarMoeda(convenio.valorGlobal)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Situação do Empenho</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getEmpenhoIcon(convenio.situacaoEmpenho)}
                        <span className="text-sm font-medium">{convenio.situacaoEmpenho}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vigência</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">
                          {new Date(convenio.vigenciaFim).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className={`text-sm ${getDiasRestantesColor(diasRestantes)}`}>
                        {diasRestantes > 0 ? `${diasRestantes} dias restantes` : 'Vencido'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Histórico de Repasses
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetalhamento(convenio.id);
                      }}
                      className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Abrir Detalhamento
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        abrirChamado(convenio.id, convenio.numeroConvenio, 'federal');
                      }}
                      className="bg-[#2e6a50] hover:bg-[#1a3e3e]"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Abrir Chamado
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {conveniosFederaisFiltrados.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-gray-500 py-8">
                  <HandshakeIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum convênio federal cadastrado</p>
                </div>
              </CardContent>
            </Card>
          )}
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