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
  MapPin
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
import type { CityData } from '../../lib/data';

interface UsuariosViewProps {
  city: CityData;
}

export default function UsuariosView({ city }: UsuariosViewProps) {
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
    municipiosVinculados: [] as string[]
  });

  const usuariosFiltrados = useMemo(() => {
    return USUARIOS_MOCK.filter(usuario => {
      // Filtro por município (novo)
      const matchesMunicipio = usuario.municipiosVinculados.some(
        municipioId => MUNICIPIOS_MOCK.find(m => m.id === municipioId)?.nome === city.name
      );

      const matchesSearch = 
        usuario.nomeCompleto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        usuario.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        usuario.cpf.includes(searchQuery) ||
        usuario.cargo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'todos' || usuario.status === statusFilter;
      const matchesPerfil = perfilFilter === 'todos' || usuario.tipoPerfil === perfilFilter;

      return matchesMunicipio && matchesSearch && matchesStatus && matchesPerfil;
    });
  }, [city.name, searchQuery, statusFilter, perfilFilter]);

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
      municipiosVinculados: usuario.municipiosVinculados
    });
    setCadastroModalOpen(true);
  };

  const handleVerDetalhes = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setDetalhesModalOpen(true);
  };

  const handleSaveUsuario = () => {
    // Aqui seria a lógica de salvamento via API
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

      {/* Indicador de Município Selecionado */}
      <Card className="border-l-4 border-l-[#2e6a50] bg-gradient-to-r from-[#2e6a50]/5 to-transparent">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2e6a50] rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Filtrando usuários do município</p>
              <p className="text-base font-bold text-[#2e6a50]">
                {city.name} - {city.uf}
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
                {TIPO_PERFIL_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
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

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Usuários</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{USUARIOS_MOCK.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {USUARIOS_MOCK.filter(u => u.status === 'ativo').length}
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

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
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">CPF</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Cargo</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Perfil</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => {
                  const perfilConfig = PERFIS_CONFIG[usuario.tipoPerfil];
                  const statusConfig = STATUS_USUARIO_CONFIG[usuario.status];
                  return (
                    <tr key={usuario.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{usuario.nomeCompleto}</div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{usuario.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{usuario.cpf}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{usuario.cargo}</td>
                      <td className="py-3 px-4">
                        <Badge className={`${perfilConfig.color}`}>
                          {perfilConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`${statusConfig.color} flex items-center gap-1 w-fit`}>
                          {usuario.status === 'ativo' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVerDetalhes(usuario)}
                            className="hover:bg-blue-50"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEdit(usuario)}
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
            {usuariosFiltrados.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhum usuário encontrado com os filtros aplicados.
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
              {isEditMode ? 'Editar Usuário' : 'Novo Usuário'}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do usuário e defina suas permissões de acesso
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Dados Pessoais */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Dados Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="nomeCompleto">Nome Completo *</Label>
                  <Input
                    id="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
                    placeholder="Ex: João da Silva"
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <Label htmlFor="rg">RG *</Label>
                  <Input
                    id="rg"
                    value={formData.rg}
                    onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                    placeholder="0000000"
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <Label htmlFor="cargo">Cargo *</Label>
                  <Input
                    id="cargo"
                    value={formData.cargo}
                    onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                    placeholder="Ex: Analista de Sistemas"
                  />
                </div>
              </div>
            </div>

            {/* Dados de Acesso */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Dados de Acesso</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="usuario@email.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="senha">
                    {isEditMode ? 'Nova Senha (deixe em branco para manter)' : 'Senha *'}
                  </Label>
                  <Input
                    id="senha"
                    type="password"
                    value={formData.senha}
                    onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Perfil e Permissões */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Perfil e Permissões</h3>
              <div className="space-y-4">
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
                      <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase">
                        Zaneli
                      </div>
                      <SelectItem value="zaneli-admin">Admin</SelectItem>
                      <SelectItem value="zaneli-gestor">Gestor</SelectItem>
                      <SelectItem value="zaneli-colaborador">Colaborador</SelectItem>
                      <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase border-t mt-1">
                        Prefeitura
                      </div>
                      <SelectItem value="prefeitura-gestor">Gestor</SelectItem>
                      <SelectItem value="prefeitura-colaborador">Colaborador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Municípios Vinculados *</Label>
                  <p className="text-xs text-gray-500 mb-3">
                    Selecione os municípios que o usuário terá acesso
                  </p>
                  <div className="border rounded-lg p-4 space-y-3 max-h-60 overflow-y-auto">
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
                  <p className="text-xs text-gray-500 mt-2">
                    {formData.municipiosVinculados.length} município(s) selecionado(s)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCadastroModalOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveUsuario}
              className="bg-[#2e6a50] hover:bg-[#1a3e3e] text-white"
            >
              {isEditMode ? 'Salvar Alterações' : 'Cadastrar Usuário'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Detalhes */}
      <Dialog open={detalhesModalOpen} onOpenChange={setDetalhesModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Usuário</DialogTitle>
          </DialogHeader>

          {usuarioSelecionado && (
            <div className="space-y-6 py-4">
              {/* Dados Pessoais */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Dados Pessoais</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500">Nome Completo</Label>
                    <p className="font-semibold">{usuarioSelecionado.nomeCompleto}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">CPF</Label>
                    <p className="font-semibold">{usuarioSelecionado.cpf}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">RG</Label>
                    <p className="font-semibold">{usuarioSelecionado.rg}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Telefone</Label>
                    <p className="font-semibold flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {usuarioSelecionado.telefone}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">E-mail</Label>
                    <p className="font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {usuarioSelecionado.email}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Cargo</Label>
                    <p className="font-semibold flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      {usuarioSelecionado.cargo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Perfil e Status */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Perfil e Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500">Tipo de Perfil</Label>
                    <Badge className={`${PERFIS_CONFIG[usuarioSelecionado.tipoPerfil].color} mt-1`}>
                      {PERFIS_CONFIG[usuarioSelecionado.tipoPerfil].label}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Status</Label>
                    <Badge className={`${STATUS_USUARIO_CONFIG[usuarioSelecionado.status].color} flex items-center gap-1 w-fit mt-1`}>
                      {usuarioSelecionado.status === 'ativo' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {STATUS_USUARIO_CONFIG[usuarioSelecionado.status].label}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Data de Cadastro</Label>
                    <p className="font-semibold">
                      {new Date(usuarioSelecionado.dataCadastro).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  {usuarioSelecionado.ultimoAcesso && (
                    <div>
                      <Label className="text-xs text-gray-500">Último Acesso</Label>
                      <p className="font-semibold">{usuarioSelecionado.ultimoAcesso}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Municípios Vinculados */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Municípios Vinculados ({usuarioSelecionado.municipiosVinculados.length})
                </h3>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    {getMunicipiosNomes(usuarioSelecionado.municipiosVinculados) || 'Nenhum município vinculado'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetalhesModalOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}