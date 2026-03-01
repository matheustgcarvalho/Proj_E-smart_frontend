import React from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  PieChart, 
  FileCheck, 
  Handshake,
  ChevronLeft,
  ChevronRight,
  LogOut,
  MessageSquare,
  Briefcase,
  Building2,
  Users
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onChangeView: (view: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

export default function Sidebar({ currentView, onChangeView, isOpen, onToggle, onLogout }: SidebarProps) {
  const menuGroups = [
    {
      title: 'Início',
      items: [
        { id: 'dashboard', label: 'Dashboards', icon: LayoutDashboard },
      ]
    },
    {
      title: 'Monitoramento',
      items: [
        { id: 'cauc', label: 'Cauc-SNT', icon: ShieldCheck },
        { id: 'parcerias', label: 'E-Parcerias', icon: Handshake },
        { id: 'certidoes', label: 'Certidões', icon: FileCheck },
      ]
    },
    {
      title: 'Gestão de Recursos',
      items: [
        { id: 'convenios', label: 'Convênios', icon: Briefcase },
      ]
    },
    {
      title: 'Cadastros',
      items: [
        { id: 'municipios', label: 'Municípios', icon: Building2 },
        { id: 'usuarios', label: 'Usuários', icon: Users },
      ]
    },
    {
      title: 'Sistema',
      items: [
        { id: 'chamados', label: 'Chamados', icon: MessageSquare },
      ]
    }
  ];

  return (
    <div 
      className={`h-screen bg-[#2e6a50] text-white flex flex-col fixed left-0 top-0 shadow-xl z-20 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Brand */}
      <div className={`p-6 border-b border-[#1a3e3e]/30 flex items-center ${isOpen ? 'gap-3' : 'justify-center'}`}>
        <div className="w-8 h-8 bg-[#1a3e3e] rounded-lg flex items-center justify-center shrink-0">
          <PieChart className="w-5 h-5 text-white" />
        </div>
        {isOpen && (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="font-bold text-xl tracking-tight">E-Smart</h1>
            <p className="text-xs text-[#bbbbbb]">Gov. Intelligence</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-6 overflow-y-auto scrollbar-hide">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {isOpen && (
              <p className="px-3 text-xs font-semibold text-[#f7f7f7]/70 uppercase tracking-wider mb-2 animate-in fade-in duration-300">
                {group.title}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                // Considera 'unidadesgestoras' como parte de 'municipios'
                const isActive = currentView === item.id || (item.id === 'municipios' && currentView === 'unidadesgestoras');
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onChangeView(item.id)}
                    title={!isOpen ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#1a3e3e] text-white shadow-lg shadow-black/20'
                        : 'text-[#f7f7f7] hover:text-white hover:bg-[#1a3e3e]/30'
                    } ${!isOpen ? 'justify-center' : ''}`}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    {isOpen && <span className="whitespace-nowrap overflow-hidden">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse Toggle Button - Located near footer */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-20 bg-[#1a3e3e] text-white rounded-full p-1 border border-[#2e6a50] shadow-md hover:bg-[#1a3e3e]/90 transition-colors z-50 hidden md:block"
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-[#1a3e3e]/30">
        <button
          onClick={onLogout}
          title={!isOpen ? "Sair" : undefined}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-[#f7f7f7] hover:text-red-400 hover:bg-[#1a3e3e]/30 transition-colors ${!isOpen ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {isOpen && <span className="whitespace-nowrap overflow-hidden">Sair</span>}
        </button>
      </div>
    </div>
  );
}