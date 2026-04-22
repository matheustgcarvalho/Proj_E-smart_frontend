import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Power, Calendar, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import type { CityData } from '../../lib/data';

interface RelatorioProgramado {
  id: string;
  relatorio: string;
  data: string; // Frequência ou próximo envio
  hora: string;
  mensagem: string;
  status: 'Ativo' | 'Inativo';
  diasSemana: string[];
}

interface EnvioRelatoriosViewProps {
  city: CityData;
}

const MOCK_RELATORIOS: RelatorioProgramado[] = [
  { id: '1', relatorio: 'Relatório Financeiro', data: 'Diário', hora: '08:00', mensagem: 'Olá @Nome do prefeito, segue o relatório financeiro.', status: 'Ativo', diasSemana: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'] },
  { id: '2', relatorio: 'Relatório de Convênios', data: 'Semanal', hora: '09:00', mensagem: 'Bom dia @Nome do prefeito, acompanhe seus convênios.', status: 'Ativo', diasSemana: ['Seg'] },
];

export default function EnvioRelatoriosView({ city }: EnvioRelatoriosViewProps) {
  const [relatorios, setRelatorios] = useState<RelatorioProgramado[]>(MOCK_RELATORIOS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRelatorio, setEditingRelatorio] = useState<RelatorioProgramado | null>(null);

  const handleOpenModal = (relatorio?: RelatorioProgramado) => {
    setEditingRelatorio(relatorio || null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setRelatorios(relatorios.filter(r => r.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setRelatorios(relatorios.map(r => r.id === id ? { ...r, status: r.status === 'Ativo' ? 'Inativo' : 'Ativo' } : r));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a3e3e]">Envio de Relatórios - {city.name}</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#2e6a50] text-white px-4 py-2 rounded-lg hover:bg-[#1a3e3e] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Agendamento
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-4">Relatório</th>
              <th className="px-6 py-4">Frequência</th>
              <th className="px-6 py-4">Hora</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {relatorios.map((rel) => (
              <tr key={rel.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{rel.relatorio}</td>
                <td className="px-6 py-4">{rel.data} ({rel.diasSemana.join(', ')})</td>
                <td className="px-6 py-4">{rel.hora}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${rel.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                    {rel.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button onClick={() => handleToggleStatus(rel.id)} title={rel.status === 'Ativo' ? 'Desativar' : 'Ativar'}>
                    <Power className={`w-4 h-4 ${rel.status === 'Ativo' ? 'text-emerald-600' : 'text-gray-400'}`} />
                  </button>
                  <button onClick={() => handleOpenModal(rel)}><Edit2 className="w-4 h-4 text-blue-600" /></button>
                  <button onClick={() => handleDelete(rel.id)}><Trash2 className="w-4 h-4 text-red-600" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-[#1a3e3e]">
              {editingRelatorio ? 'Editar Agendamento' : 'Novo Agendamento'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Relatório</label>
                <select 
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  defaultValue={editingRelatorio?.relatorio}
                >
                  <option>Relatório Financeiro</option>
                  <option>Relatório de Convênios</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dias da semana</label>
                <div className="flex gap-2 flex-wrap">
                  {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map(dia => (
                    <label key={dia} className="flex items-center gap-1 text-xs">
                      <input 
                        type="checkbox" 
                        defaultChecked={editingRelatorio?.diasSemana.includes(dia)}
                      /> {dia}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Hora</label>
                <input 
                  type="time" 
                  className="w-full p-2 border border-gray-200 rounded-lg" 
                  defaultValue={editingRelatorio?.hora}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mensagem</label>
                <textarea 
                  className="w-full p-2 border border-gray-200 rounded-lg" 
                  rows={4}
                  placeholder="Digite @ para mencionar..."
                  defaultValue={editingRelatorio?.mensagem}
                  onChange={(e) => {
                    if (e.target.value.endsWith('@')) {
                      // Simulação de mostrar tags
                      alert('Tags disponíveis: {Nome do prefeito}');
                    }
                  }}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Cancelar</button>
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-[#2e6a50] text-white rounded-lg">Salvar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
