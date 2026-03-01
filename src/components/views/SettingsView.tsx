  import React from 'react';
  import { 
    User, 
    Moon, 
    Sun, 
    Bell, 
    Shield, 
    LogOut, 
    Mail, 
    Smartphone,
    Check,
    Camera
  } from 'lucide-react';
  import { ImageWithFallback } from '../figma/ImageWithFallback';
  
  interface SettingsViewProps {
    onLogout: () => void;
    isDarkMode: boolean;
    onToggleTheme: () => void;
  }
  
  export default function SettingsView({ onLogout, isDarkMode, onToggleTheme }: SettingsViewProps) {
    
    // Helpers para controle manual de tema, ignorando preferência do SO
    const theme = {
      cardBg: isDarkMode ? 'bg-slate-800' : 'bg-white',
      cardBorder: isDarkMode ? 'border-slate-700' : 'border-gray-200',
      textPrimary: isDarkMode ? 'text-white' : 'text-gray-900',
      textSecondary: isDarkMode ? 'text-gray-400' : 'text-gray-500',
      inputBg: isDarkMode ? 'bg-slate-900' : 'bg-gray-50',
      inputBorder: isDarkMode ? 'border-slate-600' : 'border-gray-300',
      divider: isDarkMode ? 'border-slate-700' : 'border-gray-100',
      iconBgBase: isDarkMode ? 'bg-opacity-30' : '',
      hoverBg: isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50',
      sectionTitleBorder: isDarkMode ? 'border-slate-700' : 'border-gray-100',
      buttonSecondaryBg: isDarkMode ? 'bg-slate-900 hover:bg-slate-800' : 'bg-gray-50 hover:bg-gray-100',
      buttonSecondaryText: isDarkMode ? 'text-gray-300' : 'text-gray-700',
    };
  
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col gap-1 mb-8">
          <h2 className={`text-2xl font-bold ${theme.textPrimary}`}>Configurações</h2>
          <p className={`text-sm ${theme.textSecondary}`}>Gerencie suas preferências, perfil e segurança.</p>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna da Esquerda - Perfil e Aparência */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Card de Perfil */}
            <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl p-8 shadow-sm transition-colors duration-300`}>
              <div className={`flex items-center gap-3 mb-8 border-b ${theme.sectionTitleBorder} pb-4`}>
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
                  <User className="w-5 h-5" />
                </div>
                <h3 className={`font-bold text-lg ${theme.textPrimary}`}>Meu Perfil</h3>
              </div>
  
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Foto de Perfil */}
                <div className="flex flex-col items-center gap-3 mx-auto md:mx-0">
                  <div className="relative group cursor-pointer">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc2ODkwNDkxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Profile" 
                      className={`w-32 h-32 rounded-full object-cover border-4 shadow-lg ${isDarkMode ? 'border-slate-700' : 'border-white'}`}
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <button className={`absolute bottom-1 right-1 bg-[#2e6a50] text-white p-2 rounded-full hover:bg-[#1a3e3e] transition-colors shadow-md border-2 ${isDarkMode ? 'border-slate-800' : 'border-white'}`}>
                      <User className="w-4 h-4" />
                    </button>
                  </div>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>JPG ou PNG até 2MB</span>
                </div>
  
                {/* Formulário */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold uppercase tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nome Completo</label>
                    <input 
                      type="text" 
                      defaultValue="Gestor Municipal" 
                      className={`w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#2e6a50] focus:ring-1 focus:ring-[#2e6a50] transition-all ${theme.inputBg} ${theme.inputBorder} border ${theme.textPrimary}`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold uppercase tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cargo</label>
                    <input 
                      type="text" 
                      defaultValue="Secretário de Finanças" 
                      className={`w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#2e6a50] focus:ring-1 focus:ring-[#2e6a50] transition-all ${theme.inputBg} ${theme.inputBorder} border ${theme.textPrimary}`}
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className={`text-xs font-bold uppercase tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>E-mail Corporativo</label>
                    <input 
                      type="email" 
                      defaultValue="gestor.financas@municipio.ce.gov.br" 
                      className={`w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#2e6a50] focus:ring-1 focus:ring-[#2e6a50] transition-all ${theme.inputBg} ${theme.inputBorder} border ${theme.textPrimary}`}
                    />
                  </div>
                </div>
              </div>
              
              <div className={`mt-8 flex justify-end pt-6 border-t ${theme.divider}`}>
                <button className="px-6 py-2.5 bg-[#2e6a50] hover:bg-[#1a3e3e] text-white text-sm font-bold rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Salvar Alterações
                </button>
              </div>
            </div>
  
            {/* Card de Aparência e Preferências */}
            <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl p-8 shadow-sm transition-colors duration-300`}>
               <div className={`flex items-center gap-3 mb-6 border-b ${theme.sectionTitleBorder} pb-4`}>
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
                  <Sun className="w-5 h-5" />
                </div>
                <h3 className={`font-bold text-lg ${theme.textPrimary}`}>Aparência do Sistema</h3>
              </div>
  
              <div 
                className={`flex items-center justify-between p-5 rounded-xl border transition-colors cursor-pointer ${isDarkMode ? 'bg-slate-900 border-slate-700 hover:border-slate-600' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`} 
                onClick={onToggleTheme}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-slate-700 text-yellow-400' : 'bg-white text-yellow-600 shadow-sm border border-gray-100'}`}>
                    {isDarkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className={`font-bold ${theme.textPrimary}`}>Modo Escuro</p>
                    <p className={`text-sm ${theme.textSecondary}`}>Alterne entre temas claro e escuro.</p>
                  </div>
                </div>
                
                <div className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none ${isDarkMode ? 'bg-[#2e6a50]' : 'bg-gray-300'}`}>
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
              </div>
            </div>
  
          </div>
  
          {/* Coluna da Direita - Notificações e Segurança */}
          <div className="space-y-6">
            
            {/* Notificações */}
            <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl p-6 shadow-sm transition-colors duration-300`}>
              <div className={`flex items-center gap-3 mb-6 border-b ${theme.sectionTitleBorder} pb-4`}>
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className={`font-bold text-lg ${theme.textPrimary}`}>Notificações</h3>
              </div>
  
              <div className="space-y-5">
                <div className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer ${theme.hoverBg}`}>
                  <div className="mt-0.5 text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                       <p className={`text-sm font-bold ${theme.textPrimary}`}>Alertas por E-mail</p>
                       <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-[#2e6a50] focus:ring-[#2e6a50]" />
                    </div>
                    <p className={`text-xs leading-relaxed ${theme.textSecondary}`}>Receba resumos semanais do CAUC diretamente na sua caixa de entrada.</p>
                  </div>
                </div>
  
                <div className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer border-t ${isDarkMode ? 'border-slate-700/50' : 'border-gray-100'} ${theme.hoverBg}`}>
                  <div className="mt-0.5 text-gray-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                       <p className={`text-sm font-bold ${theme.textPrimary}`}>Push Notifications</p>
                       <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-[#2e6a50] focus:ring-[#2e6a50]" />
                    </div>
                    <p className={`text-xs leading-relaxed ${theme.textSecondary}`}>Alertas em tempo real no app sobre vencimentos de certidões.</p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Segurança e Zona de Perigo */}
            <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl p-6 shadow-sm transition-colors duration-300`}>
               <div className={`flex items-center gap-3 mb-6 border-b ${theme.sectionTitleBorder} pb-4`}>
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600'}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className={`font-bold text-lg ${theme.textPrimary}`}>Segurança</h3>
              </div>
  
              <button className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors mb-4 group border ${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} ${theme.cardBorder}`}>
                <span className="font-medium">Alterar Senha</span>
                <Shield className="w-4 h-4 text-gray-400 group-hover:text-[#2e6a50] transition-colors" />
              </button>
  
               <button 
                onClick={onLogout}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 border rounded-lg text-sm font-bold transition-all hover:shadow-sm active:scale-95 ${isDarkMode ? 'bg-red-900/20 hover:bg-red-900/30 border-red-900/50 text-red-400' : 'bg-red-50 hover:bg-red-100 border-red-200 text-red-700'}`}
              >
                <LogOut className="w-4 h-4" />
                Sair do Sistema
              </button>
            </div>
  
          </div>
        </div>
      </div>
    );
  }
