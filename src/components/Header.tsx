import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, ChevronDown, MapPin, Settings, X, Clock, CheckCircle2, FileText } from 'lucide-react';
import { CITIES } from '../lib/data';
import type { CityData } from '../lib/data';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { NOTIFICACOES_MOCK } from '../lib/notificacoes-data';

interface HeaderProps {
  currentCity: CityData;
  onChangeCity: (cityId: string) => void;
  isSidebarOpen: boolean;
  onSettingsClick?: () => void;
  hideCitySelector?: boolean;
  usuariosMode?: boolean;
  usuariosFiltro?: 'escritorio' | 'municipio';
  onUsuariosFiltroChange?: (filtro: 'escritorio' | 'municipio') => void;
  onNotificacaoClick?: () => void;
}

export default function Header({ 
  currentCity, 
  onChangeCity, 
  isSidebarOpen, 
  onSettingsClick, 
  hideCitySelector = false,
  usuariosMode = false,
  usuariosFiltro = 'municipio',
  onUsuariosFiltroChange,
  onNotificacaoClick
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);

  // Obter últimas 3 notificações não lidas
  const notificacoesNaoLidas = NOTIFICACOES_MOCK.filter(n => !n.lida).slice(0, 3);
  const totalNaoLidas = NOTIFICACOES_MOCK.filter(n => !n.lida).length;

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
        setIsNotifDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filtrar cidades
  const filteredCities = CITIES.filter(city => 
    city.name.toLowerCase().includes(citySearch.toLowerCase()) ||
    city.uf.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <header 
      className={`h-16 bg-white border-b border-[#bbbbbb]/30 flex items-center justify-between px-8 fixed top-0 right-0 z-10 shadow-sm transition-all duration-300 ${
        isSidebarOpen ? 'left-64' : 'left-20'
      }`}
    >
      {/* City Selector ou Modo Usuários */}
      {usuariosMode ? (
        <div className="flex items-center gap-6">
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-1 bg-[#f7f7f7] hover:bg-[#efefef] border border-[#bbbbbb]/50 rounded-lg text-[#626262] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#2e6a50]/10 flex items-center justify-center text-[#2e6a50]">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs text-[#bbbbbb] font-medium">Filtrar Usuários por</p>
                <p className="text-sm font-bold flex items-center gap-1 text-[#1a3e3e]">
                  {usuariosFiltro === 'escritorio' ? 'Escritório' : 'Município'}
                  <ChevronDown className={`w-4 h-4 text-[#bbbbbb] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </p>
              </div>
            </button>
            
            {/* Dropdown Content para Usuários */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#bbbbbb]/30 rounded-xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50 overflow-hidden">
                <div className="p-1">
                  <button
                    onClick={() => {
                      onUsuariosFiltroChange?.('escritorio');
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                      usuariosFiltro === 'escritorio'
                        ? 'bg-[#2e6a50]/10 text-[#2e6a50]'
                        : 'hover:bg-[#f7f7f7] text-[#626262]'
                    }`}
                  >
                    <MapPin className={`w-4 h-4 ${usuariosFiltro === 'escritorio' ? 'text-[#2e6a50]' : 'text-[#bbbbbb]'}`} />
                    <span className="font-medium">Escritório</span>
                    {usuariosFiltro === 'escritorio' && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-[#2e6a50]"></span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      onUsuariosFiltroChange?.('municipio');
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                      usuariosFiltro === 'municipio'
                        ? 'bg-[#2e6a50]/10 text-[#2e6a50]'
                        : 'hover:bg-[#f7f7f7] text-[#626262]'
                    }`}
                  >
                    <MapPin className={`w-4 h-4 ${usuariosFiltro === 'municipio' ? 'text-[#2e6a50]' : 'text-[#bbbbbb]'}`} />
                    <span className="font-medium">Município</span>
                    {usuariosFiltro === 'municipio' && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-[#2e6a50]"></span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-8 w-px bg-[#bbbbbb]/30"></div>

          <div className="flex items-center gap-2 text-[#bbbbbb] bg-[#f7f7f7] px-3 py-1.5 rounded-md border border-[#bbbbbb]/30">
            <Search className="w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar indicadores, convênios..." 
              className="bg-transparent border-none outline-none text-sm w-64 placeholder:text-[#bbbbbb] text-[#626262]"
            />
          </div>
        </div>
      ) : !hideCitySelector ? (
        <div className="flex items-center gap-6">
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-1 bg-[#f7f7f7] hover:bg-[#efefef] border border-[#bbbbbb]/50 rounded-lg text-[#626262] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#2e6a50]/10 flex items-center justify-center text-[#2e6a50]">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs text-[#bbbbbb] font-medium">Município Selecionado</p>
                <p className="text-sm font-bold flex items-center gap-1 text-[#1a3e3e]">
                  {currentCity.name} - {currentCity.uf}
                  <ChevronDown className={`w-4 h-4 text-[#bbbbbb] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </p>
              </div>
            </button>
            
            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-[#bbbbbb]/30 rounded-xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50 overflow-hidden">
                {/* Search Header */}
                <div className="p-3 border-b border-[#bbbbbb]/10 bg-[#f7f7f7]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Buscar cidade..."
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      className="w-full pl-8 pr-8 py-2 bg-white border border-[#bbbbbb]/30 rounded-lg text-sm focus:outline-none focus:border-[#2e6a50] transition-colors"
                    />
                    {citySearch && (
                      <button 
                        onClick={() => setCitySearch('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* City List */}
                <div className="max-h-64 overflow-y-auto p-1">
                  {filteredCities.length > 0 ? (
                    filteredCities.map(city => (
                      <button
                        key={city.id}
                        onClick={() => {
                          onChangeCity(city.id);
                          setIsDropdownOpen(false);
                          setCitySearch('');
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                          currentCity.id === city.id
                            ? 'bg-[#2e6a50]/10 text-[#2e6a50]'
                            : 'hover:bg-[#f7f7f7] text-[#626262]'
                        }`}
                      >
                        <MapPin className={`w-4 h-4 ${currentCity.id === city.id ? 'text-[#2e6a50]' : 'text-[#bbbbbb]'}`} />
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{city.name}</span>
                          <span className="text-[10px] text-gray-400">{city.uf}</span>
                        </div>
                        {currentCity.id === city.id && (
                          <span className="ml-auto w-2 h-2 rounded-full bg-[#2e6a50]"></span>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-400 text-xs">
                      Nenhum município encontrado.
                    </div>
                  )}
                </div>
                
                {/* Footer hint */}
                <div className="px-3 py-2 bg-gray-50 border-t border-[#bbbbbb]/10 text-[10px] text-center text-gray-400">
                  Mostrando {filteredCities.length} de {CITIES.length} municípios
                </div>
              </div>
            )}
          </div>

          <div className="h-8 w-px bg-[#bbbbbb]/30"></div>

          <div className="flex items-center gap-2 text-[#bbbbbb] bg-[#f7f7f7] px-3 py-1.5 rounded-md border border-[#bbbbbb]/30">
            <Search className="w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar indicadores, convênios..." 
              className="bg-transparent border-none outline-none text-sm w-64 placeholder:text-[#bbbbbb] text-[#626262]"
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {/* User Profile */}
      <div className="flex items-center gap-6">
        <div className="relative" ref={notifDropdownRef}>
          <button 
            onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
            className="relative p-2 text-[#bbbbbb] hover:text-[#626262] transition-colors"
          >
            <Bell className="w-5 h-5" />
            {totalNaoLidas > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#e8a455] rounded-full border-2 border-white"></span>
            )}
          </button>

          {/* Dropdown de Notificações */}
          {isNotifDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-[#bbbbbb]/30 rounded-xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50 overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 bg-[#f7f7f7]">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Notificações</h3>
                  {totalNaoLidas > 0 && (
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                      {totalNaoLidas} nova{totalNaoLidas > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>

              {/* Lista de Notificações */}
              <div className="max-h-80 overflow-y-auto">
                {notificacoesNaoLidas.length > 0 ? (
                  notificacoesNaoLidas.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 border-b border-gray-100 hover:bg-blue-50/30 transition-colors cursor-pointer"
                      onClick={() => {
                        if (onNotificacaoClick) {
                          onNotificacaoClick();
                          setIsNotifDropdownOpen(false);
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 ${
                          notif.tipo === 'aprovacao-usuario' ? 'bg-blue-100' :
                          notif.tipo === 'alerta-convenio' ? 'bg-orange-100' :
                          'bg-purple-100'
                        }`}>
                          {notif.tipo === 'aprovacao-usuario' ? '👤' :
                           notif.tipo === 'alerta-convenio' ? '📄' : '⚙️'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-gray-900">{notif.titulo}</h4>
                            <span className="w-2 h-2 bg-blue-600 rounded-full shrink-0"></span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notif.mensagem}</p>
                          <div className="flex items-center gap-2 mt-2">
                            {notif.prioridade === 'alta' && (
                              <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">
                                Alta Prioridade
                              </span>
                            )}
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(notif.data).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">Nenhuma notificação nova</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-gray-200 bg-[#f7f7f7]">
                <button
                  onClick={() => {
                    if (onNotificacaoClick) {
                      onNotificacaoClick();
                      setIsNotifDropdownOpen(false);
                    }
                  }}
                  className="w-full py-2 text-sm font-medium text-[#2e6a50] hover:text-[#1a3e3e] transition-colors"
                >
                  Ver todas as notificações
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-[#bbbbbb]/30">
          <div className="text-right">
            <p className="text-sm font-bold text-[#1a3e3e]">Olá, Gestor</p>
            <p className="text-xs text-[#bbbbbb]">Secretaria de Finanças</p>
          </div>
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc2ODkwNDkxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="User" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <button 
            onClick={onSettingsClick}
            className="p-2 ml-1 text-[#bbbbbb] hover:text-[#2e6a50] transition-colors rounded-full hover:bg-[#f7f7f7]"
            title="Configurações"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}