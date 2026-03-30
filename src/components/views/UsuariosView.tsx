import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  X,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Building
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { 
  USUARIOS_MOCK, 
  PERFIS_CONFIG, 
  STATUS_USUARIO_CONFIG,
  TIPO_PERFIL_OPTIONS,
  Usuario 
} from '../../lib/usuarios-data';
import { MUNICIPIOS_MOCK } from '../../lib/municipios-data';
import { ESCRITORIOS_DATA } from '../../lib/escritorios-data';
import type { CityData } from '../../lib/data';

interface UsuariosViewProps {
  city: CityData;
  filtro: 'escritorio' | 'municipio';
}

export default function UsuariosView({ city, filtro }: UsuariosViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [perfilFilter, setPerfilFilter] = useState<string>('todos');
  const [cadastroModalOpen, setCadastroModalOpen] = useState(false);
  const [detalhesModalOpen, setDetalhesModalOpen] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    senha: '',
    cpf: '',
    rg: '',
    telefone: '',
    cargo: '',
    tipoPerfil: '' as any,
    tipoVinculo: '' as 'escritorio' | 'municipio' | '',
    escritoriosVinculados: [] as string[],
    municipiosVinculados: [] as string[]
  });

  const usuariosFiltrados = useMemo(() => {
    return USUARIOS_MOCK.filter(usuario => {
      const matchesTipo = usuario.tipoVinculo === filtro;

      const matchesSearch = 
        usuario.nomeCompleto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        usuario.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        usuario.cpf.includes(searchQuery) ||
        usuario.cargo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'todos' || usuario.status === statusFilter;
      const matchesPerfil = perfilFilter === 'todos' || usuario.tipoPerfil === perfilFilter;

      return matchesTipo && matchesSearch && matchesStatus && matchesPerfil;
    });
  }, [filtro, searchQuery, statusFilter, perfilFilter]);

  const handleOpenCadastro = () => {
    setIsEditMode(false);
    setFormData({
      nomeCompleto: '',
      email: '',
      senha: '',
      cpf: '',
      rg: '',
      telefone: '',
      cargo: '',
      tipoPerfil: '',
      tipoVinculo: '',
      escritoriosVinculados: [],
      municipiosVinculados: []
    });
    setCadastroModalOpen(true);
  };

  const handleOpenEdit = (usuario: Usuario) => {
    setIsEditMode(true);
    setUsuarioSelecionado(usuario);
    setFormData({
      nomeCompleto: usuario.nomeCompleto,
      email: usuario.email,
      senha: '',
      cpf: usuario.cpf,
      rg: usuario.rg,
      telefone: usuario.telefone,
      cargo: usuario.cargo,
      tipoPerfil: usuario.tipoPerfil,
      tipoVinculo: usuario.tipoVinculo,
      escritoriosVinculados: usuario.escritoriosVinculados || (usuario.escritorioVinculado ? [usuario.escritorioVinculado] : []),
      municipiosVinculados: usuario.municipiosVinculados || []
    });
    setCadastroModalOpen(true);
  };

  const handleVerDetalhes = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setDetalhesModalOpen(true);
  };

  const handleSaveUsuario = () => {
    console.log('Salvando usuário:', formData);
    setCadastroModalOpen(false);
  };

  const handleToggleMunicipio = (municipioId: string) => {
    setFormData(prev => ({
      ...prev,
      municipiosVinculados: prev.municipiosVinculados.includes(municipioId)
        ? prev.municipiosVinculados.filter(id => id !== municipioId)
        : [...prev.municipiosVinculados, municipioId]
    }));
  };

  const handleToggleEscritorio = (escritorioId: string) => {
    setFormData(prev => ({
      ...prev,
      escritoriosVinculados: prev.escritoriosVinculados.includes(escritorioId)
        ? prev.escritoriosVinculados.filter(id => id !== escritorioId)
        : [...prev.escritoriosVinculados, escritorioId]
    }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('todos');
    setPerfilFilter('todos');
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'todos' || perfilFilter !== 'todos';

  const getMunicipiosNomes = (municipioIds: string[]) => {
    return municipioIds
      .map(id => MUNICIPIOS_MOCK.find(m => m.id === id)?.nome)
      .filter(Boolean)
      .join(', ');
  };

  const getEscritorioNome = (escritorioId: string) => {
    return ESCRITORIOS_DATA.find(e => e.id === escritorioId)?.nome || 'N/A';
  };

  const getVinculoDisplay = (usuario: Usuario) => {
    if (usuario.tipoVinculo === 'escritorio') {
      const ids = usuario.escritoriosVinculados && usuario.escritoriosVinculados.length > 0 
        ? usuario.escritoriosVinculados 
        : (usuario.escritorioVinculado ? [usuario.escritorioVinculado] : []);
      return ids.map(id => getEscritorioNome(id)).join(', ');
    } else if (usuario.tipoVinculo === 'municipio' && usuario.municipiosVinculados && usuario.municipiosVinculados.length > 0) {
      return getMunicipiosNomes(usuario.municipiosVinculados);
    }
    return 'N/A';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[#2e6a50] rounded-xl flex items-center justify-center shrink-0">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#2e2e2e]">Cadastro de Usuários</h1>
          <p className="text-sm text-[#626262] mt-1">
            Gerencie os usuários do sistema e seus perfis de acesso
          </p>
        </div>
        <Button 
          onClick={handleOpenCadastro}
          className="bg-[#2e6a50] hover:bg-[#1a3e3e] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      {/* Indicador de Filtro Selecionado */}
      <Card className="border-l-4 border-l-[#2e6a50] bg-gradient-to-r from-[#2e6a50]/5 to-transparent">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2e6a50] rounded-lg flex items-center justify-center">
              {filtro === 'escritorio' ? (
                <Building className="w-5 h-5 text-white" />
              ) : (
                <MapPin className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Exibindo usuários de</p>
              <p className="text-base font-bold text-[#2e6a50]">
                {filtro === 'escritorio' ? 'Escritório' : 'Município'}
              </p>
            </div>
            <div className="ml-auto">
              <Badge className="bg-[#2e6a50] text-white">
                {usuariosFiltrados.length} {usuariosFiltrados.length === 1 ? 'usuário' : 'usuários'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nome, e-mail, CPF ou cargo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={perfilFilter} onValueChange={setPerfilFilter}>
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="Tipo de Perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Perfis</SelectItem>
                <SelectItem value="aprovador">Aprovador</SelectItem>
                <SelectItem value="comum">Comum</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="w-full md:w-auto">
                <X className="w-4 h-4 mr-2" />
                Limpar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Usuários */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários Cadastrados ({usuariosFiltrados.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Nome</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">E-mail</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Cargo</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Perfil</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                    {filtro === 'escritorio' ? 'Escritório' : 'Município'}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => {
                  const perfilConfig = PERFIS_CONFIG[usuario.tipoPerfil] || { label: usuario.tipoPerfil, color: 'bg-gray-100' };
                  const statusConfig = STATUS_USUARIO_CONFIG[usuario.status];
                  return (
                    <tr key={usuario.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{usuario.nomeCompleto}</div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{usuario.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{usuario.cargo}</td>
                      <td className="py-3 px-4">
                        <Badge className={`${perfilConfig.color}`}>
                          {perfilConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {usuario.tipoVinculo === 'escritorio' ? (
                            <Building className="w-3 h-3 text-gray-400" />
                          ) : (
                            <MapPin className="w-3 h-3 text-gray-400" />
                          )}
                          <span className="text-sm text-gray-900">{getVinculoDisplay(usuario)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`${statusConfig.color} flex items-center gap-1 w-fit`}>
                          {usuario.status === 'ativo' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleVerDetalhes(usuario)} className="hover:bg-blue-50">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(usuario)} className="hover:bg-green-50">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-red-50 text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
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

      {/* Modal de Cadastro/Edição */}
      <Dialog open={cadastroModalOpen} onOpenChange={setCadastroModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
            <DialogDescription>Preencha os dados do usuário e defina suas permissões de acesso</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* PERFIL E PERMISSÕES - REORDENADO PARA O TOPO */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Vínculo e Perfil</h3>
              <div className="space-y-4">
                <div>
                  <Label>Tipo de Vínculo *</Label>
                  <Select 
                    value={formData.tipoVinculo} 
                    onValueChange={(value: 'escritorio' | 'municipio') => setFormData({ ...formData, tipoVinculo: value, escritoriosVinculados: [], municipiosVinculados: [] })}
                  >
                    <SelectTrigger><SelectValue placeholder="Selecione o tipo de vínculo" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="escritorio">Escritório</SelectItem>
                      <SelectItem value="municipio">Prefeitura/Município</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* LISTAGEM DE ESCRITÓRIOS COM CHECKBOX */}
                {formData.tipoVinculo === 'escritorio' && (
                  <div>
                    <Label>Escritórios Vinculados *</Label>
                    <div className="border rounded-lg p-4 space-y-3 max-h-48 overflow-y-auto mt-2 bg-white shadow-sm">
                      {ESCRITORIOS_DATA.map((escritorio) => (
                        <div key={escritorio.id} className="flex items-start gap-3">
                          <Checkbox 
                            id={`escritorio-${escritorio.id}`} 
                            checked={formData.escritoriosVinculados.includes(escritorio.id)} 
                            onCheckedChange={() => handleToggleEscritorio(escritorio.id)} 
                          />
                          <Label htmlFor={`escritorio-${escritorio.id}`} className="text-sm font-normal cursor-pointer flex-1">
                            <div className="font-medium text-gray-900">{escritorio.nome}</div>
                            <div className="text-xs text-gray-500">{escritorio.municipio} - {escritorio.uf}</div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* LISTAGEM DE MUNICÍPIOS COM CHECKBOX */}
                {formData.tipoVinculo === 'municipio' && (
                  <div>
                    <Label>Municípios Vinculados *</Label>
                    <div className="border rounded-lg p-4 space-y-3 max-h-60 overflow-y-auto mt-2 bg-white shadow-sm">
                      {MUNICIPIOS_MOCK.map((municipio) => (
                        <div key={municipio.id} className="flex items-start gap-3">
                          <Checkbox
                            id={`municipio-${municipio.id}`}
                            checked={formData.municipiosVinculados.includes(municipio.id)}
                            onCheckedChange={() => handleToggleMunicipio(municipio.id)}
                          />
                          <Label 
                            htmlFor={`municipio-${municipio.id}`}
                            className="text-sm font-normal cursor-pointer flex-1"
                          >
                            <div className="font-medium text-gray-900">{municipio.nome} - {municipio.uf}</div>
                            <div className="text-xs text-gray-500">CNPJ: {municipio.cnpj}</div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="tipoPerfil">Tipo de Perfil *</Label>
                  <Select 
                    value={formData.tipoPerfil} 
                    onValueChange={(value: any) => setFormData({ ...formData, tipoPerfil: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o perfil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aprovador">Aprovador</SelectItem>
                      <SelectItem value="comum">Comum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* DADOS PESSOAIS */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Dados Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="nomeCompleto">Nome Completo *</Label>
                  <Input id="nomeCompleto" value={formData.nomeCompleto} onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })} placeholder="Ex: João da Silva" />
                </div>
                <div><Label htmlFor="cpf">CPF *</Label><Input id="cpf" value={formData.cpf} onChange={(e) => setFormData({ ...formData, cpf: e.target.value })} placeholder="000.000.000-00" /></div>
                <div><Label htmlFor="rg">RG *</Label><Input id="rg" value={formData.rg} onChange={(e) => setFormData({ ...formData, rg: e.target.value })} placeholder="0000000" /></div>
                <div><Label htmlFor="telefone">Telefone *</Label><Input id="telefone" value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: e.target.value })} placeholder="(00) 00000-0000" /></div>
                <div><Label htmlFor="cargo">Cargo *</Label><Input id="cargo" value={formData.cargo} onChange={(e) => setFormData({ ...formData, cargo: e.target.value })} placeholder="Ex: Analista de Sistemas" /></div>
              </div>
            </div>

            {/* DADOS DE ACESSO */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Dados de Acesso</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2"><Label htmlFor="email">E-mail *</Label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="usuario@email.com" /></div>
                <div className="md:col-span-2"><Label htmlFor="senha">{isEditMode ? 'Nova Senha (deixe em branco para manter)' : 'Senha *'}</Label><Input id="senha" type="password" value={formData.senha} onChange={(e) => setFormData({ ...formData, senha: e.target.value })} placeholder="••••••••" /></div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCadastroModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveUsuario} className="bg-[#2e6a50] hover:bg-[#1a3e3e] text-white">
              {isEditMode ? 'Salvar Alterações' : 'Cadastrar Usuário'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Detalhes - Visual Estruturado e Fontes Padronizadas */}
      <Dialog open={detalhesModalOpen} onOpenChange={setDetalhesModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl flex items-center gap-2 text-[#2e2e2e]">
              <div className="w-8 h-8 bg-[#2e6a50]/10 rounded flex items-center justify-center">
                <Users className="w-5 h-5 text-[#2e6a50]" />
              </div>
              Detalhes do Usuário
            </DialogTitle>
          </DialogHeader>
          
          {usuarioSelecionado && (
            <div className="py-4 space-y-8">
              
              {/* BLOCO 1: IDENTIFICAÇÃO */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                   <div className="h-4 w-1 bg-[#2e6a50] rounded-full" />
                   <h3 className="text-sm font-semibold text-gray-800 uppercase">Identificação</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-1">
                  <div className="md:col-span-3">
                    <Label className="text-xs text-gray-500">Nome completo</Label>
                    <p className="font-semibold mt-1 text-gray-900 text-base">{usuarioSelecionado.nomeCompleto}</p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">CPF</Label>
                    <p className="font-semibold mt-1 text-gray-900 font-mono italic">
                      {usuarioSelecionado.cpf}
                    </p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">RG</Label>
                    <p className="font-semibold mt-1 text-gray-900 font-mono italic">
                      {usuarioSelecionado.rg || '---'}
                    </p>
                  </div>
                </div>
              </section>

              {/* BLOCO 2: CONTATO E CARGO */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                   <div className="h-4 w-1 bg-[#2e6a50] rounded-full" />
                   <h3 className="text-sm font-semibold text-gray-800 uppercase">Contato profissional</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
                  <div>
                    <Label className="text-xs text-gray-500">Telefone</Label>
                    <p className="font-semibold mt-1 text-gray-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {usuarioSelecionado.telefone || '---'}
                    </p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">Cargo</Label>
                    <p className="font-semibold mt-1 text-gray-900 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      {usuarioSelecionado.cargo}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-xs text-gray-500">E-mail</Label>
                    <p className="font-semibold mt-1 text-gray-900 flex items-center gap-2 lowercase">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {usuarioSelecionado.email}
                    </p>
                  </div>
                </div>
              </section>

              {/* BLOCO 3: ACESSO E VÍNCULOS */}
              <section className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <Label className="text-xs text-gray-500">Tipo de vinculo</Label>
                    <p className="font-semibold mt-1 text-[#2e6a50] capitalize flex items-center gap-1">
                      {usuarioSelecionado.tipoVinculo === 'escritorio' ? <Building className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                      {usuarioSelecionado.tipoVinculo}
                    </p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">Tipo de perfil</Label>
                    <div className="mt-1">
                      <Badge className={`${PERFIS_CONFIG[usuarioSelecionado.tipoPerfil]?.color || 'bg-gray-100'} border shadow-sm`}>
                        {PERFIS_CONFIG[usuarioSelecionado.tipoPerfil]?.label || usuarioSelecionado.tipoPerfil}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">Status</Label>
                    <div className="mt-1">
                      <Badge className={`${STATUS_USUARIO_CONFIG[usuarioSelecionado.status]?.color || 'bg-gray-100'} flex items-center gap-1 w-fit border shadow-sm`}>
                        {usuarioSelecionado.status === 'ativo' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {STATUS_USUARIO_CONFIG[usuarioSelecionado.status]?.label || usuarioSelecionado.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-500 uppercase">
                    {usuarioSelecionado.tipoVinculo === 'escritorio' ? 'Escritórios Vinculados' : 'Municípios Vinculados'}
                  </Label>
                  <div className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200 font-medium">
                    {getVinculoDisplay(usuarioSelecionado)}
                  </div>
                </div>
              </section>

            </div>
          )}
          
          <DialogFooter className="border-t pt-4">
            <Button 
              variant="outline" 
              onClick={() => setDetalhesModalOpen(false)}
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}