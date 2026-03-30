import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Users,
  Building2,
  Calendar,
  Edit,
  Plus,
  Trash2,
  Mail,
  Briefcase,
  CheckCircle2,
  XCircle,
  Eye,
  FileText,
  AlertCircle,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { Municipio } from '../../lib/municipios-data';

interface MunicipioDetalhamentoProps {
  municipio: Municipio;
  onBack: () => void;
}

export default function MunicipioDetalhamento({ municipio, onBack }: MunicipioDetalhamentoProps) {
  const [modalUsuarioAberto, setModalUsuarioAberto] = useState(false);
  const [detalhesUsuarioModal, setDetalhesUsuarioModal] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<any>(null);

  // Mock de usuários vinculados ao município
  const usuariosVinculados = [
    {
      id: '1',
      nome: 'Ana Paula Lima',
      email: 'ana.lima@fortaleza.ce.gov.br',
      cargo: 'Secretária de Finanças',
      dataVinculo: '2024-01-20'
    },
    {
      id: '2',
      nome: 'Roberto Alves Ferreira',
      email: 'roberto.ferreira@fortaleza.ce.gov.br',
      cargo: 'Assessor Técnico',
      dataVinculo: '2024-01-25'
    }
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'inativo':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'erro':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo':
        return <CheckCircle2 className="w-3 h-3" />;
      case 'inativo':
        return <XCircle className="w-3 h-3" />;
      case 'pendente':
        return <AlertCircle className="w-3 h-3" />;
      case 'erro':
        return <XCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      ativo: 'Ativo',
      inativo: 'Inativo',
      pendente: 'Pendente',
      erro: 'Erro'
    };
    return labels[status] || status;
  };

  const handleVerDetalhesUsuario = (usuario: any) => {
    setUsuarioSelecionado(usuario);
    setDetalhesUsuarioModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Barra Superior de Navegação - Layout Restaurado */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="p-0 hover:bg-transparent text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2e6a50] rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2e2e2e]">{municipio.nome} - {municipio.uf}</h1>
              <p className="text-sm text-[#626262]">Detalhamento completo do município</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card de Dados Principais */}
      <Card>
        <CardHeader>
          <CardTitle>Dados do Município</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label className="text-xs text-gray-500 font-medium uppercase">NOME</Label>
              <p className="font-semibold mt-1">{municipio.nome}</p>
            </div>
            <div>
              <Label className="text-xs text-gray-500 font-medium uppercase">CNPJ</Label>
              <p className="font-semibold mt-1 font-mono">{municipio.cnpj}</p>
            </div>
            <div>
              <Label className="text-xs text-gray-500 font-medium uppercase">UF</Label>
              <p className="font-semibold mt-1">{municipio.uf}</p>
            </div>
            <div>
              <Label className="text-xs text-gray-500 font-medium uppercase">CÓDIGO IBGE</Label>
              <p className="font-semibold mt-1 font-mono">{municipio.codigoIbge}</p>
            </div>
            <div>
              <Label className="text-xs text-gray-500 font-medium uppercase">CÓDIGO TCE</Label>
              <p className="font-semibold mt-1 font-mono">{municipio.codigoTce}</p>
            </div>
            <div>
              <Label className="text-xs text-gray-500 font-medium uppercase">STATUS</Label>
              <div className="mt-1">
                <Badge className={`${getStatusBadgeColor(municipio.statusIntegracao)} flex items-center gap-1 w-fit`}>
                  {getStatusIcon(municipio.statusIntegracao)}
                  {getStatusLabel(municipio.statusIntegracao)}
                </Badge>
              </div>
            </div>
            {municipio.loginTce && (
              <div>
                <Label className="text-xs text-gray-500 font-medium uppercase">LOGIN TCE</Label>
                <p className="font-semibold mt-1 font-mono">{municipio.loginTce}</p>
              </div>
            )}
            <div>
              <Label className="text-xs text-gray-500 font-medium uppercase">DATA DE CADASTRO</Label>
              <p className="font-semibold mt-1">
                {new Date(municipio.dataCadastro).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Abas */}
      <Tabs defaultValue="usuarios">
        <TabsList>
          <TabsTrigger value="usuarios">
            <Users className="w-4 h-4 mr-2" />
            Usuários Vinculados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Usuários Vinculados ({usuariosVinculados.length})</CardTitle>
                <Button
                  className="bg-[#2e6a50] hover:bg-[#1a3e3e] text-white"
                  onClick={() => setModalUsuarioAberto(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Vincular Usuário
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {usuariosVinculados.length === 0 ? (
                <div className="text-center py-8 text-gray-500 italic">
                  Nenhum usuário vinculado a este município.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Nome</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">E-mail</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Cargo</th>
                        <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuariosVinculados.map((usuario) => (
                        <tr key={usuario.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">{usuario.nome}</div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-gray-400" />
                              {usuario.email}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3 text-gray-400" />
                              {usuario.cargo}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-red-50 text-red-600"
                                title="Desvincular Usuário"
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
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal Vincular Usuário - APENAS PESQUISA (Igual ao Escritório) */}
      <Dialog open={modalUsuarioAberto} onOpenChange={setModalUsuarioAberto}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Vincular Usuário ao Município</DialogTitle>
            <DialogDescription>
              Pesquise e selecione um usuário cadastrado para vincular a este município.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Pesquisar Usuário</Label>
              <Select>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <SelectValue placeholder="Selecione o usuário..." />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">João Silva - joao@example.com</SelectItem>
                  <SelectItem value="2">Maria Santos - maria@example.com</SelectItem>
                  <SelectItem value="3">Ana Paula Lima - ana.lima@fortaleza.ce.gov.br</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalUsuarioAberto(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-[#2e6a50] hover:bg-[#1a3e3e] text-white"
              onClick={() => setModalUsuarioAberto(false)}
            >
              Confirmar Vínculo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Detalhes do Usuário */}
      <Dialog open={detalhesUsuarioModal} onOpenChange={setDetalhesUsuarioModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Detalhes do Usuário</DialogTitle></DialogHeader>
          {usuarioSelecionado && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-xs text-gray-500">Nome Completo</Label><p className="font-semibold mt-1">{usuarioSelecionado.nome}</p></div>
                <div><Label className="text-xs text-gray-500">E-mail</Label><p className="font-semibold mt-1 flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" />{usuarioSelecionado.email}</p></div>
                <div><Label className="text-xs text-gray-500">Cargo</Label><p className="font-semibold mt-1 flex items-center gap-2"><Briefcase className="w-4 h-4 text-gray-400" />{usuarioSelecionado.cargo}</p></div>
                <div><Label className="text-xs text-gray-500">Data de Vínculo</Label><p className="font-semibold mt-1">{new Date(usuarioSelecionado.dataVinculo).toLocaleDateString('pt-BR')}</p></div>
              </div>
            </div>
          )}
          <DialogFooter><Button variant="outline" onClick={() => setDetalhesUsuarioModal(false)}>Fechar</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}