import React, { useState } from 'react';
import { 
  Building, 
  Plus, 
  Search, 
  X,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  MapPin,
  FileText,
  Users as UsersIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { ESCRITORIOS_DATA, formatarCNPJ, formatarCEP, type Escritorio } from '../../lib/escritorios-data';

interface EscritoriosViewProps {
  onOpenDetalhamento: (escritorio: Escritorio) => void;
}

export default function EscritoriosView({ onOpenDetalhamento }: EscritoriosViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [cadastroModalOpen, setCadastroModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    inscricaoMunicipal: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    uf: '',
    responsavelTecnico: '',
    email: '',
    telefone: '',
    emailNotificacoes: ''
  });

  const escritoriosFiltrados = ESCRITORIOS_DATA.filter(escritorio => {
    const matchesSearch = 
      escritorio.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      escritorio.cnpj.includes(searchQuery) ||
      escritorio.municipio.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'todos' || escritorio.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('todos');
  };

  const handleNewEscritorio = () => {
    setIsEditMode(false);
    setFormData({
      razaoSocial: '',
      nomeFantasia: '',
      cnpj: '',
      inscricaoMunicipal: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      uf: '',
      responsavelTecnico: '',
      email: '',
      telefone: '',
      emailNotificacoes: ''
    });
    setCadastroModalOpen(true);
  };

  const handleEditClick = (escritorio: Escritorio) => {
    setIsEditMode(true);
    setFormData({
      razaoSocial: escritorio.nome,
      nomeFantasia: escritorio.nome,
      cnpj: escritorio.cnpj,
      inscricaoMunicipal: '',
      endereco: escritorio.endereco,
      numero: '', 
      complemento: '',
      bairro: '',
      cep: escritorio.cep,
      cidade: escritorio.municipio,
      uf: escritorio.uf,
      responsavelTecnico: '', 
      email: '', 
      telefone: '',
      emailNotificacoes: ''
    });
    setCadastroModalOpen(true);
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'todos';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[#2e6a50] rounded-xl flex items-center justify-center shrink-0">
          <Building className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#2e2e2e]">Cadastro de Escritórios</h1>
          <p className="text-sm text-[#626262] mt-1">
            Gerencie os escritórios e unidades operacionais do sistema
          </p>
        </div>
        <Button 
          className="bg-[#2e6a50] hover:bg-[#1a3e3e] text-white"
          onClick={handleNewEscritorio}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Escritório
        </Button>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nome, CNPJ ou município..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Status</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
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

      {/* Tabela de Escritórios sem a coluna Endereço */}
      <Card>
        <CardHeader>
          <CardTitle>Escritórios Cadastrados ({escritoriosFiltrados.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Nome</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">CNPJ</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Localização</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-gray-700">Usuários</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-gray-700">Municípios</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {escritoriosFiltrados.map((escritorio) => (
                  <tr key={escritorio.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{escritorio.nome}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {formatarCNPJ(escritorio.cnpj)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {escritorio.municipio}/{escritorio.uf}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center justify-center px-2 py-1 bg-blue-100 rounded-full">
                        <UsersIcon className="w-3 h-3 text-blue-700 mr-1" />
                        <span className="text-sm font-semibold text-blue-700">
                          {escritorio.usuariosVinculados.length}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center justify-center px-2 py-1 bg-green-100 rounded-full">
                        <MapPin className="w-3 h-3 text-green-700 mr-1" />
                        <span className="text-sm font-semibold text-green-700">
                          {escritorio.municipiosVinculados.length}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        escritorio.status === 'Ativo'
                          ? 'bg-green-100 text-green-800 flex items-center gap-1 w-fit'
                          : 'bg-red-100 text-red-800 flex items-center gap-1 w-fit'
                      }>
                        {escritorio.status === 'Ativo' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {escritorio.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onOpenDetalhamento(escritorio)}
                          className="hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-green-50"
                          onClick={() => handleEditClick(escritorio)}
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal permanece igual para permitir o cadastro completo do endereço */}
      <Dialog open={cadastroModalOpen} onOpenChange={setCadastroModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {isEditMode ? 'Editar Escritório' : 'Novo Escritório'}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados da empresa e as informações de contato
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Dados da Empresa */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2e6a50]" />
                Dados da Empresa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="razaoSocial">Razão Social *</Label>
                  <Input
                    id="razaoSocial"
                    value={formData.razaoSocial}
                    onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                    placeholder="Ex: Zaneli Consultoria e Assessoria Ltda"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="nomeFantasia">Nome Fantasia *</Label>
                  <Input
                    id="nomeFantasia"
                    value={formData.nomeFantasia}
                    onChange={(e) => setFormData({ ...formData, nomeFantasia: e.target.value })}
                    placeholder="Ex: Zaneli Fortaleza"
                  />
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
                  <Label htmlFor="inscricaoMunicipal">Inscrição Municipal</Label>
                  <Input
                    id="inscricaoMunicipal"
                    value={formData.inscricaoMunicipal}
                    onChange={(e) => setFormData({ ...formData, inscricaoMunicipal: e.target.value })}
                    placeholder="000000000"
                  />
                </div>
              </div>
            </div>

            {/* Seção de Endereço no Modal (Mantida para cadastro) */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2e6a50]" />
                Endereço
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="cep">CEP *</Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                    placeholder="00000-000"
                  />
                </div>
                <div className="md:col-span-4">
                  <Label htmlFor="endereco">Logradouro *</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    placeholder="Ex: Rua das Flores"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="numero">Número *</Label>
                  <Input
                    id="numero"
                    value={formData.numero}
                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                    placeholder="Ex: 123"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input
                    id="complemento"
                    value={formData.complemento}
                    onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
                    placeholder="Ex: Sala 201"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="bairro">Bairro *</Label>
                  <Input
                    id="bairro"
                    value={formData.bairro}
                    onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                    placeholder="Ex: Centro"
                  />
                </div>
                <div className="md:col-span-4">
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    placeholder="Ex: Fortaleza"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="uf">UF *</Label>
                  <Select 
                    value={formData.uf} 
                    onValueChange={(value) => setFormData({ ...formData, uf: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AC">AC</SelectItem>
                      <SelectItem value="AL">AL</SelectItem>
                      <SelectItem value="AP">AP</SelectItem>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="BA">BA</SelectItem>
                      <SelectItem value="CE">CE</SelectItem>
                      <SelectItem value="DF">DF</SelectItem>
                      <SelectItem value="ES">ES</SelectItem>
                      <SelectItem value="GO">GO</SelectItem>
                      <SelectItem value="MA">MA</SelectItem>
                      <SelectItem value="MT">MT</SelectItem>
                      <SelectItem value="MS">MS</SelectItem>
                      <SelectItem value="MG">MG</SelectItem>
                      <SelectItem value="PA">PA</SelectItem>
                      <SelectItem value="PB">PB</SelectItem>
                      <SelectItem value="PR">PR</SelectItem>
                      <SelectItem value="PE">PE</SelectItem>
                      <SelectItem value="PI">PI</SelectItem>
                      <SelectItem value="RJ">RJ</SelectItem>
                      <SelectItem value="RN">RN</SelectItem>
                      <SelectItem value="RS">RS</SelectItem>
                      <SelectItem value="RO">RO</SelectItem>
                      <SelectItem value="RR">RR</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="SP">SP</SelectItem>
                      <SelectItem value="SE">SE</SelectItem>
                      <SelectItem value="TO">TO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Dados de Contato */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <UsersIcon className="w-4 h-4 text-[#2e6a50]" />
                Dados de Contato
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="responsavelTecnico">Responsável Técnico *</Label>
                  <Input
                    id="responsavelTecnico"
                    value={formData.responsavelTecnico}
                    onChange={(e) => setFormData({ ...formData, responsavelTecnico: e.target.value })}
                    placeholder="Ex: João da Silva"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contato@escritorio.com"
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
                <div className="md:col-span-2">
                  <Label htmlFor="emailNotificacoes">E-mail de Notificações Automáticas</Label>
                  <Input
                    id="emailNotificacoes"
                    type="email"
                    value={formData.emailNotificacoes}
                    onChange={(e) => setFormData({ ...formData, emailNotificacoes: e.target.value })}
                    placeholder="notificacoes@escritorio.com"
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
              className="bg-[#2e6a50] hover:bg-[#1a3e3e] text-white"
              onClick={() => setCadastroModalOpen(false)}
            >
              {isEditMode ? 'Salvar Alterações' : 'Cadastrar Escritório'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}