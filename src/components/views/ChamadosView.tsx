import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Hourglass,
  FileText,
  MessageSquare,
  Paperclip,
  X,
  Calendar,
  User,
  Archive,
  ListTodo
} from 'lucide-react';
import type { CityData } from '../../lib/data';
import { getChamadosData, getTicketStats } from '../../lib/chamados-data';
import type { Ticket, TicketStatus, TicketPriority } from '../../lib/chamados-data';

interface ChamadosViewProps {
  city: CityData;
}

type TabType = 'active' | 'completed';

export default function ChamadosView({ city }: ChamadosViewProps) {
  // Estado Global
  const [activeTab, setActiveTab] = useState<TabType>('active');
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  
  // Estado Filtros - Ativos
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [filterPriority, setFilterPriority] = useState<string>('todas');

  // Estado Filtros - Concluídos
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  
  // Estado Novo Chamado
  const [newTicketData, setNewTicketData] = useState({
    title: '',
    description: '',
    module: 'CAUC' as const,
    priority: 'Média' as TicketPriority,
    assignee: ''
  });

  // Dados
  const tickets = useMemo(() => getChamadosData(city), [city]);
  const stats = useMemo(() => getTicketStats(tickets), [tickets]);

  // Separar ativos de concluídos
  const activeTickets = useMemo(() => 
    tickets.filter(t => t.status !== 'Resolvido' && t.status !== 'Cancelado'),
    [tickets]
  );

  const completedTickets = useMemo(() => 
    tickets.filter(t => t.status === 'Resolvido' || t.status === 'Cancelado'),
    [tickets]
  );

  // Filtrar Chamados Ativos
  const filteredActiveTickets = useMemo(() => {
    return activeTickets.filter(ticket => {
      const matchesSearch = searchQuery === '' || 
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.module.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === 'todos' || ticket.status === filterStatus;
      const matchesPriority = filterPriority === 'todas' || ticket.priority === filterPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [activeTickets, searchQuery, filterStatus, filterPriority]);

  // Filtrar Chamados Concluídos
  const filteredCompletedTickets = useMemo(() => {
    return completedTickets.filter(ticket => {
      const matchesSearch = historySearchQuery === '' || 
        ticket.title.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
        ticket.module.toLowerCase().includes(historySearchQuery.toLowerCase());
      
      return matchesSearch;
    });
  }, [completedTickets, historySearchQuery]);

  // Limpar filtros
  const clearFilters = () => {
    setSearchQuery('');
    setFilterStatus('todos');
    setFilterPriority('todas');
  };

  const clearHistoryFilters = () => {
    setHistorySearchQuery('');
  };
  
  const handleSubmitNewTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria a lógica de criar o chamado
    console.log('Novo chamado:', newTicketData);
    // Resetar formulário e fechar modal
    setNewTicketData({
      title: '',
      description: '',
      module: 'CAUC',
      priority: 'Média',
      assignee: ''
    });
    setIsNewTicketModalOpen(false);
  };

  // Helpers de estilo
  const getStatusConfig = (status: TicketStatus) => {
    const configs: Record<TicketStatus, any> = {
      'Aberto': { 
        label: 'Aberto', 
        icon: AlertCircle, 
        color: 'text-blue-600', 
        bg: 'bg-blue-50', 
        border: 'border-blue-200' 
      },
      'Em Andamento': { 
        label: 'Em Andamento', 
        icon: Hourglass, 
        color: 'text-amber-600', 
        bg: 'bg-amber-50', 
        border: 'border-amber-200' 
      },
      'Pendente': { 
        label: 'Pendente', 
        icon: Clock, 
        color: 'text-purple-600', 
        bg: 'bg-purple-50', 
        border: 'border-purple-200' 
      },
      'Resolvido': { 
        label: 'Resolvido', 
        icon: CheckCircle2, 
        color: 'text-green-600', 
        bg: 'bg-green-50', 
        border: 'border-green-200' 
      },
      'Cancelado': { 
        label: 'Cancelado', 
        icon: Archive, 
        color: 'text-gray-500', 
        bg: 'bg-gray-50', 
        border: 'border-gray-200' 
      }
    };
    return configs[status];
  };

  const getPriorityConfig = (priority: TicketPriority) => {
    const configs: Record<TicketPriority, any> = {
      'Baixa': { label: 'Baixa', color: 'text-gray-600', bg: 'bg-gray-100' },
      'Média': { label: 'Média', color: 'text-blue-600', bg: 'bg-blue-100' },
      'Alta': { label: 'Alta', color: 'text-amber-600', bg: 'bg-amber-100' },
      'Crítica': { label: 'Crítica', color: 'text-red-600', bg: 'bg-red-100' }
    };
    return configs[priority];
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getDaysOpen = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* CABEÇALHO PADRÃO */}
      <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
        <div className="w-12 h-12 rounded-xl bg-[#2e6a50]/10 flex items-center justify-center shrink-0">
          <ListTodo className="w-6 h-6 text-[#2e6a50]" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-[#1a3e3e] mb-1">Gestão de Chamados</h1>
          <p className="text-sm text-gray-600">
            Acompanhe e gerencie solicitações de suporte técnico e demandas internas da plataforma E-Smart
          </p>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Abertos</span>
            <AlertCircle className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.aberto}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Em Andamento</span>
            <Hourglass className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats['em-andamento']}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Aguardando</span>
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.aguardando}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Concluídos</span>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.concluido}</p>
        </div>
      </div>

      {/* NAVEGAÇÃO POR ABAS */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex items-center gap-2 px-1 py-3 font-medium text-sm transition-all relative ${
              activeTab === 'active'
                ? 'text-[#2e6a50]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ListTodo className="w-4 h-4" />
            <span>Fila de Atendimentos</span>
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
              activeTab === 'active' 
                ? 'bg-gray-100 text-gray-700' 
                : 'bg-gray-50 text-gray-500'
            }`}>
              {activeTickets.length}
            </span>
            {activeTab === 'active' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2e6a50]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex items-center gap-2 px-1 py-3 font-medium text-sm transition-all relative ${
              activeTab === 'completed'
                ? 'text-[#2e6a50]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Archive className="w-4 h-4" />
            <span>Histórico e Concluídos</span>
            {activeTab === 'completed' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2e6a50]" />
            )}
          </button>
        </div>

        <button
          onClick={() => setIsNewTicketModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2e6a50] text-white rounded-lg hover:bg-[#2e6a50]/90 transition-colors font-medium text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Novo Chamado
        </button>
      </div>

      {/* CONTEÚDO DAS ABAS */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          
          {/* FILTROS - ATIVOS */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por ID, título ou módulo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2e6a50]/20 focus:border-[#2e6a50]"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2e6a50]/20 focus:border-[#2e6a50]"
              >
                <option value="todos">Todos os Status</option>
                <option value="Aberto">Aberto</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Pendente">Pendente</option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2e6a50]/20 focus:border-[#2e6a50]"
              >
                <option value="todas">Todas Prioridades</option>
                <option value="Crítica">Crítica</option>
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>

              {(searchQuery || filterStatus !== 'todos' || filterPriority !== 'todas') && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  Limpar
                </button>
              )}
            </div>

            <div className="mt-3 text-xs text-gray-500">
              Exibindo <span className="font-bold text-[#2e6a50]">{filteredActiveTickets.length}</span> de {activeTickets.length} chamados ativos
            </div>
          </div>

          {/* LISTA DE CHAMADOS ATIVOS */}
          <div className="space-y-3">
            {filteredActiveTickets.length > 0 ? (
              filteredActiveTickets.map((ticket) => {
                const statusConfig = getStatusConfig(ticket.status);
                const priorityConfig = getPriorityConfig(ticket.priority);
                const StatusIcon = statusConfig.icon;
                const daysOpen = getDaysOpen(ticket.createdAt);

                return (
                  <div
                    key={ticket.id}
                    className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-[#2e6a50]/50 transition-all cursor-pointer"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg ${statusConfig.bg} flex items-center justify-center shrink-0`}>
                        <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono text-gray-500">#{ticket.id}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityConfig.bg} ${priorityConfig.color}`}>
                                {priorityConfig.label}
                              </span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{ticket.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-1">{ticket.description}</p>
                          </div>

                          <div className={`px-3 py-1 rounded-lg border ${statusConfig.border} ${statusConfig.bg} flex items-center gap-2`}>
                            <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                            <span className={`text-xs font-medium ${statusConfig.color}`}>
                              {statusConfig.label}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            <span>{ticket.module}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{ticket.assignee || 'Não atribuído'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(ticket.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{daysOpen}d aberto</span>
                          </div>
                          {ticket.attachments && ticket.attachments.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Paperclip className="w-3 h-3" />
                              <span>{ticket.attachments.length}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white p-12 rounded-xl border border-gray-200 text-center">
                <ListTodo className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Nenhum chamado ativo encontrado</p>
                {(searchQuery || filterStatus !== 'todos' || filterPriority !== 'todas') && (
                  <button
                    onClick={clearFilters}
                    className="mt-3 text-sm text-[#2e6a50] hover:underline font-medium"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'completed' && (
        <div className="space-y-4">
          
          {/* FILTROS - HISTÓRICO */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar no histórico..."
                  value={historySearchQuery}
                  onChange={(e) => setHistorySearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2e6a50]/20 focus:border-[#2e6a50]"
                />
              </div>

              {historySearchQuery && (
                <button
                  onClick={clearHistoryFilters}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  Limpar
                </button>
              )}
            </div>

            <div className="mt-3 text-xs text-gray-500">
              Exibindo <span className="font-bold text-[#2e6a50]">{filteredCompletedTickets.length}</span> de {completedTickets.length} chamados concluídos
            </div>
          </div>

          {/* LISTA DE CHAMADOS CONCLUÍDOS */}
          <div className="space-y-3">
            {filteredCompletedTickets.length > 0 ? (
              filteredCompletedTickets.map((ticket) => {
                const statusConfig = getStatusConfig(ticket.status);
                const priorityConfig = getPriorityConfig(ticket.priority);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={ticket.id}
                    className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all cursor-pointer opacity-75"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg ${statusConfig.bg} flex items-center justify-center shrink-0`}>
                        <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono text-gray-500">#{ticket.id}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityConfig.bg} ${priorityConfig.color}`}>
                                {priorityConfig.label}
                              </span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{ticket.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-1">{ticket.description}</p>
                          </div>

                          <div className={`px-3 py-1 rounded-lg border ${statusConfig.border} ${statusConfig.bg} flex items-center gap-2`}>
                            <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                            <span className={`text-xs font-medium ${statusConfig.color}`}>
                              {statusConfig.label}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            <span>{ticket.module}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{ticket.assignee || 'Não atribuído'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Criado: {formatDate(ticket.createdAt)}</span>
                          </div>
                          {ticket.closedAt && (
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Finalizado: {formatDate(ticket.closedAt)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white p-12 rounded-xl border border-gray-200 text-center">
                <Archive className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Nenhum chamado concluído encontrado</p>
                {historySearchQuery && (
                  <button
                    onClick={clearHistoryFilters}
                    className="mt-3 text-sm text-[#2e6a50] hover:underline font-medium"
                  >
                    Limpar busca
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Detalhes do Chamado */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-500">#{selectedTicket.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityConfig(selectedTicket.priority).bg} ${getPriorityConfig(selectedTicket.priority).color}`}>
                    {getPriorityConfig(selectedTicket.priority).label}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{selectedTicket.title}</h2>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Descrição</h3>
                <p className="text-sm text-gray-700">{selectedTicket.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Status</h3>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${getStatusConfig(selectedTicket.status).border} ${getStatusConfig(selectedTicket.status).bg}`}>
                    {React.createElement(getStatusConfig(selectedTicket.status).icon, { className: `w-4 h-4 ${getStatusConfig(selectedTicket.status).color}` })}
                    <span className={`text-sm font-medium ${getStatusConfig(selectedTicket.status).color}`}>
                      {getStatusConfig(selectedTicket.status).label}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Módulo</h3>
                  <p className="text-sm text-gray-900">{selectedTicket.module}</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Atribuído a</h3>
                  <p className="text-sm text-gray-900">{selectedTicket.assignee || 'Não atribuído'}</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Data de Abertura</h3>
                  <p className="text-sm text-gray-900">{formatDate(selectedTicket.createdAt)}</p>
                </div>
              </div>

              {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Anexos</h3>
                  <div className="space-y-2">
                    {selectedTicket.attachments.map((attachment, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm">
                        <Paperclip className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{attachment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Novo Chamado */}
      {isNewTicketModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-900 mb-1">Abrir Novo Chamado</h2>
                <p className="text-sm text-gray-600">Preencha os dados para iniciar o fluxo de atendimento.</p>
              </div>
              <button
                onClick={() => setIsNewTicketModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmitNewTicket} className="space-y-5">
                
                {/* TÍTULO CURTO e MÓDULO DE ORIGEM */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Título Curto
                    </label>
                    <input
                      type="text"
                      required
                      value={newTicketData.title}
                      onChange={(e) => setNewTicketData({ ...newTicketData, title: e.target.value })}
                      placeholder="Ex: Pendência Receita Federal - Matriz"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2e6a50]/20 focus:border-[#2e6a50]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Módulo de Origem
                    </label>
                    <select
                      required
                      value={newTicketData.module}
                      onChange={(e) => setNewTicketData({ ...newTicketData, module: e.target.value as any })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2e6a50]/20 focus:border-[#2e6a50] bg-white"
                    >
                      <option value="">Selecione...</option>
                      <option value="CAUC">CAUC</option>
                      <option value="E-Parcerias">E-Parcerias</option>
                      <option value="Certidões">Certidões</option>
                      <option value="Convênios">Convênios</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                </div>

                {/* PRIORIDADE e TIPO DE FLUXO */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Prioridade
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['Baixa', 'Média', 'Alta', 'Crítica'] as TicketPriority[]).map((priority) => (
                        <button
                          key={priority}
                          type="button"
                          onClick={() => setNewTicketData({ ...newTicketData, priority })}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                            newTicketData.priority === priority
                              ? 'bg-[#2e6a50] text-white border-[#2e6a50] shadow-sm'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {priority}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Tipo de Fluxo
                    </label>
                    <select
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2e6a50]/20 focus:border-[#2e6a50] bg-white"
                    >
                      <option>Fluxo Padrão (Triagem → Prefeitura)</option>
                      <option>Fluxo Urgente (Direto → Prefeitura)</option>
                      <option>Fluxo Técnico (Suporte → TI)</option>
                    </select>
                  </div>
                </div>

                {/* DESCRIÇÃO DETALHADA */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Descrição Detalhada
                  </label>
                  <textarea
                    required
                    value={newTicketData.description}
                    onChange={(e) => setNewTicketData({ ...newTicketData, description: e.target.value })}
                    placeholder="Descreva o problema com detalhes, cite números de convênios ou documentos se necessário..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2e6a50]/20 focus:border-[#2e6a50] resize-none"
                    rows={4}
                  />
                </div>

                {/* ANEXOS */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Anexos
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2e6a50] transition-colors cursor-pointer">
                    <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 font-medium mb-1">
                      Arraste arquivos ou clique para selecionar
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG ou PDF até 10MB
                    </p>
                  </div>
                </div>

                {/* BOTÕES */}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsNewTicketModalOpen(false);
                      setNewTicketData({
                        title: '',
                        description: '',
                        module: 'CAUC',
                        priority: 'Média',
                        assignee: ''
                      });
                    }}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-[#2e6a50] text-white rounded-lg hover:bg-[#2e6a50]/90 transition-colors font-medium text-sm shadow-sm"
                  >
                    Criar Chamado
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}