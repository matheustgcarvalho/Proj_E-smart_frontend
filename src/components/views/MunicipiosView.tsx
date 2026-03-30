import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  X,
  CheckCircle2,
  XCircle,
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
import { 
  MUNICIPIOS_MOCK, 
  STATUS_INTEGRACAO_CONFIG, 
  UF_OPTIONS, 
  Municipio,
  UnidadeGestora 
} from '../../lib/municipios-data';

const ESCRITORIOS_MOCK = [
  { id: 'escrit-1', nome: 'Zaneli Consultoria' },
  { id: 'escrit-2', nome: 'G2 Assessoria' },
  { id: 'escrit-3', nome: 'Lopes e Associados' },
];

interface MunicipiosViewProps {
  onVerUnidadesGestoras?: (municipio: Municipio) => void;
  onVerDetalhamento?: (municipio: Municipio) => void;
}

export default function MunicipiosView({ onVerUnidadesGestoras, onVerDetalhamento }: MunicipiosViewProps = {}) {
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
    email: '',
    codigoIbge: '',
    codigoTce: '',
    loginTce: '',
    senhaTce: '',
    escritorioId: ''
  });

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
      nome: '', uf: '', cnpj: '', email: '', codigoIbge: '',
      codigoTce: '', loginTce: '', senhaTce: '', escritorioId: ''
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
      email: (municipio as any).email || '',
      codigoIbge: municipio.codigoIbge,
      codigoTce: municipio.codigoTce,
      loginTce: municipio.loginTce || '',
      senhaTce: municipio.senhaTce || '',
      escritorioId: (municipio as any).escritorioId || ''
    });
    setUnidadesGestoras(municipio.unidadesGestoras);
    setCadastroModalOpen(true);
  };

  const handleVerDetalhes = (municipio: Municipio) => {
    if (onVerDetalhamento) {
      onVerDetalhamento(municipio);
    } else {
      setMunicipioSelecionado(municipio);
      setDetalhesModalOpen(true);
    }
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
      setTimeout(() => {
        const unidadesMock: UnidadeGestora[] = [
          { id: 'ug-new-1', codigo: '0101', nome: 'Secretaria Municipal de Educação', dataCriacao: new Date().toISOString().split('T')[0], cpfResponsavel: '123.456.789-00', nomeResponsavel: 'Maria Silva Santos', dataInicio: new Date().toISOString().split('T')[0] },
          { id: 'ug-new-2', codigo: '0102', nome: 'Secretaria Municipal de Saúde', dataCriacao: new Date().toISOString().split('T')[0], cpfResponsavel: '234.567.890-11', nomeResponsavel: 'João Carlos Oliveira', dataInicio: new Date().toISOString().split('T')[0] }
        ];
        setUnidadesGestoras(unidadesMock);
        setLoadingUnidades(false);
      }, 1500);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo': return <CheckCircle2 className="w-4 h-4" />;
      case 'inativo': return <XCircle className="w-4 h-4" />;
      default: return null;
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
          <p className="text-sm text-[#626262] mt-1">Gerencie os municípios cadastrados no sistema e suas integrações com TCE</p>
        </div>
        <Button onClick={handleOpenCadastro} className="bg-[#2e6a50] hover:bg-[#1a3e3e] text-white">
          <Plus className="w-4 h-4 mr-2" /> Novo Município
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Buscar por nome, CNPJ ou código IBGE..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select value={ufFilter} onValueChange={setUfFilter}>
              <SelectTrigger className="w-full md:w-40"><SelectValue placeholder="UF" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas UF</SelectItem>
                {UF_OPTIONS.map(uf => <SelectItem key={uf} value={uf}>{uf}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="w-full md:w-auto"><X className="w-4 h-4 mr-2" /> Limpar</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader><CardTitle>Municípios Cadastrados ({municipiosFiltrados.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Município</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">UF</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">CNPJ</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Código IBGE</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Escritório Parceiro</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {municipiosFiltrados.map((municipio) => {
                  const statusConfig = STATUS_INTEGRACAO_CONFIG[municipio.statusIntegracao] || { label: municipio.statusIntegracao, color: 'bg-gray-100' };
                  const escritorio = ESCRITORIOS_MOCK.find(e => e.id === (municipio as any).escritorioId);
                  return (
                    <tr key={municipio.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-900">{municipio.nome}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{municipio.uf}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{municipio.cnpj}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{municipio.codigoIbge}</td>
                      <td className="py-3 px-4 text-sm font-medium text-[#2e6a50]">{escritorio?.nome || 'Zaneli Consultoria'}</td>
                      <td className="py-3 px-4">
                        <Badge className={`${statusConfig.color} flex items-center gap-1 w-fit`}>
                          {getStatusIcon(municipio.statusIntegracao)} {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleVerUnidadesGestoras(municipio)} className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"><List className="w-4 h-4 mr-1" />Unid. Gestoras</Button>
                          <Button variant="ghost" size="sm" onClick={() => handleVerDetalhes(municipio)} className="hover:bg-blue-50"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(municipio)} className="hover:bg-green-50"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" className="hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Cadastro/Edição - VERSÃO VALIDADA RESTAURADA */}
      <Dialog open={cadastroModalOpen} onOpenChange={setCadastroModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Editar Município' : 'Novo Município'}</DialogTitle>
            <DialogDescription>Preencha os dados do município e as credenciais de integração com o TCE</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Dados Básicos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="nome">Nome do Município *</Label>
                  <Input id="nome" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} placeholder="Ex: Fortaleza" />
                </div>
                <div>
                  <Label htmlFor="uf">UF *</Label>
                  <Select value={formData.uf} onValueChange={(value) => setFormData({ ...formData, uf: value })}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>{UF_OPTIONS.map(uf => <SelectItem key={uf} value={uf}>{uf}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input id="cnpj" value={formData.cnpj} onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })} placeholder="00.000.000/0000-00" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">E-mail de contato e alertas do sistema *</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="exemplo@prefeitura.ce.gov.br" />
                </div>
                <div>
                  <Label htmlFor="codigoIbge">Código IBGE *</Label>
                  <Input id="codigoIbge" value={formData.codigoIbge} onChange={(e) => setFormData({ ...formData, codigoIbge: e.target.value })} placeholder="Ex: 2304400" onBlur={handleSimularCarregamento} />
                </div>
                <div>
                  <Label htmlFor="codigoTce">Código TCE *</Label>
                  <Input id="codigoTce" value={formData.codigoTce} onChange={(e) => setFormData({ ...formData, codigoTce: e.target.value })} placeholder="Ex: 0001" onBlur={handleSimularCarregamento} />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="escritorioId">Escritório Parceiro *</Label>
                  <Select value={formData.escritorioId} onValueChange={(value) => setFormData({ ...formData, escritorioId: value })}>
                    <SelectTrigger><SelectValue placeholder="Selecione o escritório responsável" /></SelectTrigger>
                    <SelectContent>{ESCRITORIOS_MOCK.map((esc) => <SelectItem key={esc.id} value={esc.id}>{esc.nome}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Credenciais TCE (Opcional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="loginTce">Login TCE</Label>
                  <Input id="loginTce" value={formData.loginTce} onChange={(e) => setFormData({ ...formData, loginTce: e.target.value })} placeholder="usuário" />
                </div>
                <div>
                  <Label htmlFor="senhaTce">Senha TCE</Label>
                  <Input id="senhaTce" type="password" value={formData.senhaTce} onChange={(e) => setFormData({ ...formData, senhaTce: e.target.value })} placeholder="••••••••" />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCadastroModalOpen(false)}>Cancelar</Button>
            <Button onClick={() => setCadastroModalOpen(false)} className="bg-[#2e6a50] hover:bg-[#1a3e3e] text-white">
              {isEditMode ? 'Salvar Alterações' : 'Cadastrar Município'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}