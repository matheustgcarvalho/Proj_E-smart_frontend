import React, { useState } from 'react';
import {
    ArrowLeft,
    Building,
    MapPin,
    Users,
    Map,
    Calendar,
    Edit,
    Plus,
    Trash2,
    Mail,
    Briefcase,
    CheckCircle2,
    XCircle,
    Eye,
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
import { formatarCNPJ, formatarCEP, type Escritorio } from '../../lib/escritorios-data';

interface EscritorioDetalhamentoProps {
    escritorio: Escritorio;
    onBack: () => void;
}

export default function EscritorioDetalhamento({ escritorio, onBack }: EscritorioDetalhamentoProps) {
    const [modalUsuarioAberto, setModalUsuarioAberto] = useState(false);
    const [modalMunicipioAberto, setModalMunicipioAberto] = useState(false);
    const [detalhesUsuarioModal, setDetalhesUsuarioModal] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<any>(null);

    const handleVerDetalhesUsuario = (usuario: any) => {
        setUsuarioSelecionado(usuario);
        setDetalhesUsuarioModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Barra Superior de Navegação - Padrão Convênios */}
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
                            <Building className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#2e2e2e]">{escritorio.nome}</h1>
                            <p className="text-sm text-[#626262]">Gestão e Detalhamento da Unidade</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card de Dados Principais */}
            <Card>
                <CardHeader>
                    <CardTitle>Dados do Escritório</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <Label className="text-xs text-gray-500 font-medium uppercase">Nome</Label>
                            <p className="font-semibold mt-1 text-gray-900">{escritorio.nome}</p>
                        </div>
                        <div>
                            <Label className="text-xs text-gray-500 font-medium uppercase">CNPJ</Label>
                            <p className="font-semibold mt-1 font-mono text-gray-900">{formatarCNPJ(escritorio.cnpj)}</p>
                        </div>
                        <div>
                            <Label className="text-xs text-gray-500 font-medium uppercase">Data de Cadastro</Label>
                            <p className="font-semibold mt-1 text-gray-900">
                                {new Date(escritorio.dataCadastro).toLocaleDateString('pt-BR')}
                            </p>
                        </div>
                        <div>
                            <Label className="text-xs text-gray-500 font-medium uppercase">Município/UF</Label>
                            <p className="font-semibold mt-1 flex items-center gap-1 text-gray-900">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                {escritorio.municipio}/{escritorio.uf}
                            </p>
                        </div>
                        <div>
                            <Label className="text-xs text-gray-500 font-medium uppercase">CEP</Label>
                            <p className="font-semibold mt-1 font-mono text-gray-900">{formatarCEP(escritorio.cep)}</p>
                        </div>
                        <div>
                            <Label className="text-xs text-gray-500 font-medium uppercase">Status</Label>
                            <div className="mt-1">
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
                            </div>
                        </div>
                        <div className="md:col-span-3">
                            <Label className="text-xs text-gray-500 font-medium uppercase">Endereço Completo</Label>
                            <p className="font-semibold mt-1 text-gray-900">{escritorio.endereco}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Abas */}
            <Tabs defaultValue="usuarios">
                <TabsList className="bg-gray-100/50 p-1 border">
                    <TabsTrigger value="usuarios" className="gap-2">
                        <Users className="w-4 h-4" />
                        Usuários Vinculados
                    </TabsTrigger>
                    <TabsTrigger value="municipios" className="gap-2">
                        <Map className="w-4 h-4" />
                        Municípios Vinculados
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="usuarios">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Usuários Vinculados ({escritorio.usuariosVinculados.length})</CardTitle>
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
                            {escritorio.usuariosVinculados.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 italic">
                                    Nenhum usuário vinculado a este escritório.
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
                                            {escritorio.usuariosVinculados.map((usuario) => (
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
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="hover:bg-red-50 text-red-600"
                                                            title="Desvincular Usuário"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
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

                <TabsContent value="municipios">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Municípios Vinculados ({escritorio.municipiosVinculados.length})</CardTitle>
                                <Button
                                    className="bg-[#2e6a50] hover:bg-[#1a3e3e] text-white"
                                    onClick={() => setModalMunicipioAberto(true)}
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Vincular Município
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 tracking-wider">Município</th>
                                            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700 tracking-wider">UF</th>
                                            <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700 tracking-wider">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {escritorio.municipiosVinculados.map((municipio) => (
                                            <tr key={municipio.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                <td className="py-3 px-4">
                                                    <div className="font-medium text-gray-900 flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-gray-400" />
                                                        {municipio.nome}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600">{municipio.uf}</td>
                                                <td className="py-3 px-4 text-right">
                                                    <Button variant="ghost" size="sm" className="hover:bg-red-50 text-red-600">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Modal Vincular Usuário - APENAS PESQUISA */}
            <Dialog open={modalUsuarioAberto} onOpenChange={setModalUsuarioAberto}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Vincular Usuário</DialogTitle>
                        <DialogDescription>
                            Pesquise e selecione um usuário cadastrado para vincular a este escritório.
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
                                    <SelectItem value="1">Carlos Eduardo Silva - carlos.silva@zaneli.com.br</SelectItem>
                                    <SelectItem value="2">Mariana Costa Oliveira - mariana.oliveira@zaneli.com.br</SelectItem>
                                    <SelectItem value="3">João Pedro Santos - joao.santos@zaneli.com.br</SelectItem>
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

            {/* Modal Vincular Município */}
            <Dialog open={modalMunicipioAberto} onOpenChange={setModalMunicipioAberto}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Vincular Município</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <Label>Selecione o Município</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Fortaleza - CE</SelectItem>
                                <SelectItem value="2">Sobral - CE</SelectItem>
                                <SelectItem value="3">Maracanaú - CE</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setModalMunicipioAberto(false)}>Cancelar</Button>
                        <Button className="bg-[#2e6a50] text-white" onClick={() => setModalMunicipioAberto(false)}>Confirmar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}