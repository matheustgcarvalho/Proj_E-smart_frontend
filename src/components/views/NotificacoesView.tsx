import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  Filter,
  Users,
  FileText,
  Settings,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  NOTIFICACOES_MOCK,
  TIPO_NOTIFICACAO_CONFIG,
  PRIORIDADE_CONFIG,
  Notificacao
} from '../../lib/notificacoes-data';

interface NotificacoesViewProps {
  onAprovarUsuario?: (usuarioId: string) => void;
  onReprovarUsuario?: (usuarioId: string, motivo?: string) => void;
  onIrParaConvenio?: (convenioId: string) => void;
  onMarcarComoLida?: (notificacaoId: string) => void;
}

export default function NotificacoesView({
  onAprovarUsuario,
  onReprovarUsuario,
  onIrParaConvenio,
  onMarcarComoLida
}: NotificacoesViewProps) {
  const [notificacoes, setNotificacoes] = useState(NOTIFICACOES_MOCK);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [modalRejeicao, setModalRejeicao] = useState(false);
  const [notificacaoSelecionada, setNotificacaoSelecionada] = useState<Notificacao | null>(null);
  const [motivoRejeicao, setMotivoRejeicao] = useState('');

  const notificacoesFiltradas = notificacoes.filter(n => {
    const matchesTipo = filtroTipo === 'todos' || n.tipo === filtroTipo;
    const matchesStatus = filtroStatus === 'todos' || 
      (filtroStatus === 'nao-lidas' && !n.lida) ||
      (filtroStatus === 'lidas' && n.lida);
    return matchesTipo && matchesStatus;
  });

  const naoLidas = notificacoes.filter(n => !n.lida).length;
  const aprovacoesAguardando = notificacoes.filter(n => n.tipo === 'aprovacao-usuario' && !n.lida).length;
  const alertasAtivos = notificacoes.filter(n => n.tipo === 'alerta-convenio' && !n.lida).length;

  const handleMarcarLida = (id: string) => {
    setNotificacoes(notificacoes.map(n => 
      n.id === id ? { ...n, lida: true } : n
    ));
    if (onMarcarComoLida) {
      onMarcarComoLida(id);
    }
  };

  const handleAbrirAprovacao = (notificacao: Notificacao) => {
    setNotificacoes(notificacoes.map(n => 
      n.id === notificacao.id ? { ...n, lida: true, statusAcao: 'aprovado' } : n
    ));

    if (notificacao.usuarioId && onAprovarUsuario) {
      onAprovarUsuario(notificacao.usuarioId);
    }
  };

  const handleAbrirRejeicao = (notificacao: Notificacao) => {
    setNotificacaoSelecionada(notificacao);
    setModalRejeicao(true);
  };

  const handleFinalizarReprovar = () => {
    if (notificacaoSelecionada) {
      // ATUALIZAÇÃO: Salva o motivo no estado da notificação para exibição no card
      setNotificacoes(notificacoes.map(n => 
        n.id === notificacaoSelecionada.id 
          ? { ...n, lida: true, statusAcao: 'rejeitado', motivoStatus: motivoRejeicao } 
          : n
      ));

      if (notificacaoSelecionada.usuarioId && onReprovarUsuario) {
        onReprovarUsuario(notificacaoSelecionada.usuarioId, motivoRejeicao);
      }
    }
    
    setModalRejeicao(false);
    setNotificacaoSelecionada(null);
    setMotivoRejeicao('');
  };

  const handleIrConvenio = (convenioId: string, notificacaoId: string) => {
    handleMarcarLida(notificacaoId);
    if (onIrParaConvenio) {
      onIrParaConvenio(convenioId);
    }
  };

  const formatarData = (data: string) => {
    const date = new Date(data);
    const agora = new Date();
    const diff = agora.getTime() - date.getTime();
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (horas < 1) return 'Agora há pouco';
    if (horas < 24) return `Há ${horas}h`;
    if (dias < 7) return `Há ${dias}d`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[#2e6a50] rounded-xl flex items-center justify-center shrink-0">
          <Bell className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#2e2e2e]">Notificações</h1>
          <p className="text-sm text-[#626262] mt-1">
            Gerencie alertas, aprovações e notificações do sistema
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Não Lidas</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">{naoLidas}</p>
              </div>
              <Bell className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aprovações Pendentes</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{aprovacoesAguardando}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alertas Ativos</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{alertasAtivos}</p>
              </div>
              <FileText className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="Tipo de Notificação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="aprovacao-usuario">Aprovação de Usuário</SelectItem>
                <SelectItem value="alerta-convenio">Alerta de Convênio</SelectItem>
                <SelectItem value="sistema">Sistema</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="nao-lidas">Não Lidas</SelectItem>
                <SelectItem value="lidas">Lidas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="todas">
        <TabsList>
          <TabsTrigger value="todas">Todas ({notificacoesFiltradas.length})</TabsTrigger>
          <TabsTrigger value="aprovacoes">Aprovações ({notificacoesFiltradas.filter(n => n.tipo === 'aprovacao-usuario').length})</TabsTrigger>
          <TabsTrigger value="alertas">Alertas ({notificacoesFiltradas.filter(n => n.tipo === 'alerta-convenio').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="todas">
          <Card>
            <CardHeader><CardTitle>Todas as Notificações</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notificacoesFiltradas.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">Nenhuma notificação encontrada</div>
                ) : (
                  notificacoesFiltradas.map((notificacao) => (
                    <NotificacaoCard
                      key={notificacao.id}
                      notificacao={notificacao}
                      onAprovar={handleAbrirAprovacao}
                      onReprovar={handleAbrirRejeicao}
                      onIrConvenio={handleIrConvenio}
                      onMarcarLida={handleMarcarLida}
                      formatarData={formatarData}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aprovacoes">
          <Card>
            <CardHeader><CardTitle>Aprovações de Usuários</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notificacoesFiltradas.filter(n => n.tipo === 'aprovacao-usuario').length === 0 ? (
                  <div className="text-center py-8 text-gray-500">Nenhuma aprovação pendente</div>
                ) : (
                  notificacoesFiltradas.filter(n => n.tipo === 'aprovacao-usuario').map((notificacao) => (
                    <NotificacaoCard
                      key={notificacao.id}
                      notificacao={notificacao}
                      onAprovar={handleAbrirAprovacao}
                      onReprovar={handleAbrirRejeicao}
                      onIrConvenio={handleIrConvenio}
                      onMarcarLida={handleMarcarLida}
                      formatarData={formatarData}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alertas">
          <Card>
            <CardHeader><CardTitle>Alertas de Convênios</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notificacoesFiltradas.filter(n => n.tipo === 'alerta-convenio').length === 0 ? (
                  <div className="text-center py-8 text-gray-500">Nenhum alerta ativo</div>
                ) : (
                  notificacoesFiltradas.filter(n => n.tipo === 'alerta-convenio').map((notificacao) => (
                    <NotificacaoCard
                      key={notificacao.id}
                      notificacao={notificacao}
                      onAprovar={handleAbrirAprovacao}
                      onReprovar={handleAbrirRejeicao}
                      onIrConvenio={handleIrConvenio}
                      onMarcarLida={handleMarcarLida}
                      formatarData={formatarData}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={modalRejeicao} onOpenChange={setModalRejeicao}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reprovar Usuário</DialogTitle>
            <DialogDescription>Informe o motivo da rejeição do cadastro para o usuário</DialogDescription>
          </DialogHeader>
          
          {notificacaoSelecionada && (
            <div className="py-4 space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-red-900">{notificacaoSelecionada.usuarioNome}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Motivo da Rejeição</label>
                <textarea
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none"
                  rows={4}
                  placeholder="Ex: Documentação incompleta ou vínculo não reconhecido..."
                  value={motivoRejeicao}
                  onChange={(e) => setMotivoRejeicao(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalRejeicao(false)}>Cancelar</Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleFinalizarReprovar}
              disabled={!motivoRejeicao.trim()}
            >
              <XCircle className="w-4 h-4 mr-2" /> Confirmar Reprovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NotificacaoCard({
  notificacao,
  onAprovar,
  onReprovar,
  onIrConvenio,
  onMarcarLida,
  formatarData
}: NotificacaoCardProps) {
  const tipoConfig = TIPO_NOTIFICACAO_CONFIG[notificacao.tipo];
  const prioridadeConfig = PRIORIDADE_CONFIG[notificacao.prioridade];

  return (
    <div className={`border rounded-lg p-4 transition-all ${!notificacao.lida ? 'bg-blue-50/50 border-blue-200' : 'bg-white border-gray-200'}`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0 ${!notificacao.lida ? 'bg-blue-100' : 'bg-gray-100'}`}>
          {tipoConfig.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-gray-900">{notificacao.titulo}</h3>
                {!notificacao.lida && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
              </div>
              <p className="text-sm text-gray-600 mt-1">{notificacao.mensagem}</p>
              
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <Badge className={`text-xs ${tipoConfig.color}`}>{tipoConfig.label}</Badge>
                <Badge className={`text-xs ${prioridadeConfig.color}`}>{prioridadeConfig.label}</Badge>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {formatarData(notificacao.data)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {!notificacao.lida && (
                <Button variant="ghost" size="sm" onClick={() => onMarcarLida(notificacao.id)} className="text-xs">
                  <Eye className="w-3 h-3 mr-1" /> Marcar como lida
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            {notificacao.tipo === 'aprovacao-usuario' && (
              notificacao.statusAcao === 'aprovado' ? (
                <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 w-fit">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-bold">Solicitação Aprovada</span>
                </div>
              ) : notificacao.statusAcao === 'rejeitado' ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 w-fit">
                    <XCircle className="w-4 h-4" />
                    <span className="text-xs font-bold">Solicitação Recusada</span>
                  </div>
                  {/* EXIBIÇÃO DO MOTIVO: Aparece logo abaixo do selo de recusado */}
                  {notificacao.motivoStatus && (
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
                      <MessageSquare className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        <span className="font-bold not-italic">Motivo:</span> {notificacao.motivoStatus}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white shadow-sm" onClick={() => onAprovar(notificacao)}>
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Aprovar
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => onReprovar(notificacao)}>
                    <XCircle className="w-4 h-4 mr-2" /> Reprovar
                  </Button>
                </div>
              )
            )}
            
            {notificacao.tipo === 'alerta-convenio' && notificacao.convenioId && (
              <Button size="sm" className="bg-[#2e6a50] hover:bg-[#1a3e3e] text-white w-fit" onClick={() => onIrConvenio(notificacao.convenioId!, notificacao.id)}>
                Ver Convênio <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}