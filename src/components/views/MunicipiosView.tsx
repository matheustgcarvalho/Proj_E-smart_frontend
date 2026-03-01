import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  X,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  List
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  MUNICIPIOS_MOCK, 
  STATUS_INTEGRACAO_CONFIG, 
  UF_OPTIONS, 
  Municipio,
  UnidadeGestora 
} from '../../lib/municipios-data';

interface MunicipiosViewProps {
  onVerUnidadesGestoras?: (municipio: Municipio) => void;
}

export default function MunicipiosView({ onVerUnidadesGestoras }: MunicipiosViewProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [ufFilter, setUfFilter] = useState<string>('todos');
  const [cadastroModalOpen, setCadastroModalOpen] = useState(false);
  const [detalhesModalOpen, setDetalhesModalOpen] = useState(false);
  const [unidadesGestorasModalOpen, setUnidadesGestorasModalOpen] = useState(false);
  const [municipioSelecionado, setMunicipioSelecionado] = useState<Municipio | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    uf: '',
    cnpj: '',
    codigoIbge: '',
    codigoTce: '',
    loginTce: '',
    senhaTce: ''
  });

  // Mock de unidades gestoras que seriam carregadas via API
  const [unidadesGestaras, setUnidadesGestoras] = useState<UnidadeGestora[]>([]);
  const [loadingUnidades, setLoadingUnidades] = useState(false);

  const municipiosFiltrados = useMemo(() => {
    return MUNICIPIOS_MOCK.filter(municipio => {
      const matchesSearch = 
        municipio.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        municipio.cnpj.includes(searchQuery) ||
        municipio.codigoIbge.includes(searchQuery);

      const matchesStatus = statusFilter === 'todos' || municipio.statusIntegracao === statusFilter;
      const matchesUf = ufFilter === 'todos' || municipio.uf === ufFilter;

      return matchesSearch && matchesStatus && matchesUf;
    });
  }, [searchQuery, statusFilter, ufFilter]);

  const handleOpenCadastro = () => {
    setIsEditMode(false);
    setFormData({
      nome: '',
      uf: '',
      cnpj: '',
      codigoIbge: '',
      codigoTce: '',
      loginTce: '',
      senhaTce: ''
    });
    setUnidadesGestoras([]);
    setCadastroModalOpen(true);
  };

  const handleOpenEdit = (municipio: Municipio) => {
    setIsEditMode(true);
    setMunicipioSelecionado(municipio);
    setFormData({
      nome: municipio.nome,
      uf: municipio.uf,
      cnpj: municipio.cnpj,
      codigoIbge: municipio.codigoIbge,
      codigoTce: municipio.codigoTce,
      loginTce: municipio.loginTce || '',
      senhaTce: municipio.senhaTce || ''
    });
    setUnidadesGestoras(municipio.unidadesGestoras);
    setCadastroModalOpen(true);
  };

  const handleVerDetalhes = (municipio: Municipio) => {
    setMunicipioSelecionado(municipio);
    setDetalhesModalOpen(true);
  };

  const handleVerUnidadesGestoras = (municipio: Municipio) => {
    if (onVerUnidadesGestoras) {
      onVerUnidadesGestoras(municipio);
    } else {
      setMunicipioSelecionado(municipio);
      setUnidadesGestorasModalOpen(true);
    }
  };

  const handleSimularCarregamento = () => {
    if (formData.codigoTce && formData.codigoIbge) {
      setLoadingUnidades(true);
      
      // Simulação de carregamento de API
      setTimeout(() => {
        const unidadesMock: UnidadeGestora[] = [
          {
            id: 'ug-new-1',
            codigo: '0101',
            nome: 'Secretaria Municipal de Educação',
            dataCriacao: new Date().toISOString().split('T')[0],
            cpfResponsavel: '123.456.789-00',
            nomeResponsavel: 'Maria Silva Santos',
            dataInicio: new Date().toISOString().split('T')[0]
          },
          {
            id: 'ug-new-2',
            codigo: '0102',
            nome: 'Secretaria Municipal de Saúde',
            dataCriacao: new Date().toISOString().split('T')[0],
            cpfResponsavel: '234.567.890-11',
            nomeResponsavel: 'João Carlos Oliveira',
            dataInicio: new Date().toISOString().split('T')[0]
          },
          {
            id: 'ug-new-3',
            codigo: '0103',
            nome: 'Gabinete do Prefeito',
            dataCriacao: new Date().toISOString().split('T')[0],
            cpfResponsavel: '345.678.901-22',
            nomeResponsavel: 'Ana Paula Costa',
            dataInicio: new Date().toISOString().split('T')[0]
          }
        ];
        setUnidadesGestoras(unidadesMock);
        setLoadingUnidades(false);
      }, 1500);
    }
  };

  const handleSaveMunicipio = () => {
    // Aqui seria a lógica de salvamento via API
    console.log('Salvando município:', formData, unidadesGestaras);
    setCadastroModalOpen(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'inativo':
        return <XCircle className="w-4 h-4" />;
      case 'pendente':
        return <Clock className="w-4 h-4" />;
      case 'erro':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('todos');
    setUfFilter('todos');
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'todos' || ufFilter !== 'todos';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[#2e6a50] rounded-xl flex items-center justify-center shrink-0">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#2e2e2e]">Cadastro de Municípios</h1>
          <p className="text-sm text-[#626262] mt-1">
            Gerencie os municípios cadastrados no sistema e suas integrações com TCE
          </p>
        </div>
        <Button 
          onClick={handleOpenCadastro}
          className="bg-[#2e6a50] hover:bg-[#1a3e3e] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Município
        </Button>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nome, CNPJ ou código IBGE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={ufFilter} onValueChange={setUfFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="UF" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas UF</SelectItem>
                {UF_OPTIONS.map(uf => (
                  <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="erro">Erro</SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="w-full md:w-auto"
              >
                <X className="w-4 h-4 mr-2" />
                Limpar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Municípios */}
      <Card>
        <CardHeader>
          <CardTitle>Municípios Cadastrados ({municipiosFiltrados.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Município</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">UF</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">CNPJ</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Código IBGE</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Unidades</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {municipiosFiltrados.map((municipio) => {
                  const statusConfig = STATUS_INTEGRACAO_CONFIG[municipio.statusIntegracao];
                  return (
                    <tr key={municipio.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{municipio.nome}</div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{municipio.uf}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{municipio.cnpj}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{municipio.codigoIbge}</td>
                      <td className="py-3 px-4">
                        <Badge className={`${statusConfig.color} flex items-center gap-1 w-fit`}>
                          {getStatusIcon(municipio.statusIntegracao)}
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {municipio.unidadesGestoras.length} unidades
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerUnidadesGestoras(municipio)}
                            className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
                          >
                            <List className="w-4 h-4 mr-1" />
                            Unid. Gestoras
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVerDetalhes(municipio)}
                            className="hover:bg-blue-50"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEdit(municipio)}
                            className="hover:bg-green-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-red-50 text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {municipiosFiltrados.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhum município encontrado com os filtros aplicados.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Cadastro/Edição */}
      <Dialog open={cadastroModalOpen} onOpenChange={setCadastroModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Editar Município' : 'Novo Município'}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do município e as credenciais de integração com o TCE
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Dados Básicos */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Dados Básicos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="nome">Nome do Município *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: Fortaleza"
                  />
                </div>
                <div>
                  <Label htmlFor="uf">UF *</Label>
                  <Select value={formData.uf} onValueChange={(value) => setFormData({ ...formData, uf: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {UF_OPTIONS.map(uf => (
                        <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input
                    id="cnpj"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
                <div>
                  <Label htmlFor="codigoIbge">Código IBGE *</Label>
                  <Input
                    id="codigoIbge"
                    value={formData.codigoIbge}
                    onChange={(e) => setFormData({ ...formData, codigoIbge: e.target.value })}
                    placeholder="Ex: 2304400"
                    onBlur={handleSimularCarregamento}
                  />
                </div>
                <div>
                  <Label htmlFor="codigoTce">Código TCE *</Label>
                  <Input
                    id="codigoTce"
                    value={formData.codigoTce}
                    onChange={(e) => setFormData({ ...formData, codigoTce: e.target.value })}
                    placeholder="Ex: 0001"
                    onBlur={handleSimularCarregamento}
                  />
                </div>
              </div>
            </div>

            {/* Credenciais TCE */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Credenciais TCE (Opcional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="loginTce">Login TCE</Label>
                  <Input
                    id="loginTce"
                    value={formData.loginTce}
                    onChange={(e) => setFormData({ ...formData, loginTce: e.target.value })}
                    placeholder="usuário"
                  />
                </div>
                <div>
                  <Label htmlFor="senhaTce">Senha TCE</Label>
                  <Input
                    id="senhaTce"
                    type="password"
                    value={formData.senhaTce}
                    onChange={(e) => setFormData({ ...formData, senhaTce: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCadastroModalOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveMunicipio}
              className="bg-[#2e6a50] hover:bg-[#1a3e3e] text-white"
            >
              {isEditMode ? 'Salvar Alterações' : 'Cadastrar Município'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Detalhes */}
      <Dialog open={detalhesModalOpen} onOpenChange={setDetalhesModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Município</DialogTitle>
          </DialogHeader>

          {municipioSelecionado && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">Município</Label>
                  <p className="font-semibold">{municipioSelecionado.nome}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">UF</Label>
                  <p className="font-semibold">{municipioSelecionado.uf}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">CNPJ</Label>
                  <p className="font-semibold">{municipioSelecionado.cnpj}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Código IBGE</Label>
                  <p className="font-semibold">{municipioSelecionado.codigoIbge}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Código TCE</Label>
                  <p className="font-semibold">{municipioSelecionado.codigoTce}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Status</Label>
                  <Badge className={`${STATUS_INTEGRACAO_CONFIG[municipioSelecionado.statusIntegracao].color} flex items-center gap-1 w-fit mt-1`}>
                    {getStatusIcon(municipioSelecionado.statusIntegracao)}
                    {STATUS_INTEGRACAO_CONFIG[municipioSelecionado.statusIntegracao].label}
                  </Badge>
                </div>
              </div>

              {municipioSelecionado.unidadesGestoras.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Unidades Gestoras ({municipioSelecionado.unidadesGestoras.length})
                  </h3>
                  <div className="border rounded-lg overflow-hidden max-h-60 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="text-left py-2 px-3 font-semibold text-xs text-gray-600">Código</th>
                          <th className="text-left py-2 px-3 font-semibold text-xs text-gray-600">Unidade</th>
                          <th className="text-left py-2 px-3 font-semibold text-xs text-gray-600">Responsável</th>
                        </tr>
                      </thead>
                      <tbody>
                        {municipioSelecionado.unidadesGestoras.map((unidade) => (
                          <tr key={unidade.id} className="border-t border-gray-100">
                            <td className="py-2 px-3 text-gray-600">{unidade.codigo}</td>
                            <td className="py-2 px-3 text-gray-900 font-medium">{unidade.nome}</td>
                            <td className="py-2 px-3 text-gray-600">{unidade.nomeResponsavel}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetalhesModalOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Unidades Gestoras */}
      <Dialog open={unidadesGestorasModalOpen} onOpenChange={setUnidadesGestorasModalOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Unidades Gestoras - {municipioSelecionado?.nome}</DialogTitle>
            <DialogDescription>
              Visualização detalhada das unidades gestoras e orçamentárias
            </DialogDescription>
          </DialogHeader>

          {municipioSelecionado && (
            <div className="space-y-4 py-4">
              {/* Informações do Município */}
              <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">Município</Label>
                  <p className="font-semibold text-sm">{municipioSelecionado.nome} - {municipioSelecionado.uf}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">CNPJ</Label>
                  <p className="font-semibold text-sm">{municipioSelecionado.cnpj}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Código IBGE</Label>
                  <p className="font-semibold text-sm">{municipioSelecionado.codigoIbge}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Total de Unidades</Label>
                  <p className="font-semibold text-sm">{municipioSelecionado.unidadesGestoras.length}</p>
                </div>
              </div>

              {/* Tabela de Unidades Gestoras */}
              {municipioSelecionado.unidadesGestoras.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700">Código</th>
                        <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700">Unidade</th>
                        <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700">CPF Responsável</th>
                        <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700">Nome do Responsável</th>
                        <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700">Data Início</th>
                      </tr>
                    </thead>
                    <tbody>
                      {municipioSelecionado.unidadesGestoras.map((unidade, index) => (
                        <tr 
                          key={unidade.id} 
                          className={`border-t border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-blue-50/30 transition-colors`}
                        >
                          <td className="py-3 px-4 text-gray-900 font-mono">{unidade.codigo}</td>
                          <td className="py-3 px-4 text-gray-900 font-medium">{unidade.nome}</td>
                          <td className="py-3 px-4 text-gray-700">{unidade.cpfResponsavel}</td>
                          <td className="py-3 px-4 text-gray-700">{unidade.nomeResponsavel}</td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(unidade.dataInicio).toLocaleDateString('pt-BR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma unidade gestora cadastrada para este município.
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setUnidadesGestorasModalOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}