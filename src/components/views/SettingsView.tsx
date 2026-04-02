import React, { useState } from 'react';
  import { 
    User, 
    Moon, 
    Sun, 
    Bell, 
    Shield, 
    LogOut, 
    Mail, 
    Camera,
    FileText,
    Phone,
    Briefcase,
    Lock,
    Eye,
    EyeOff,
    X
  } from 'lucide-react';
  import { ImageWithFallback } from '../figma/ImageWithFallback';
  
  interface SettingsViewProps {
    onLogout: () => void;
    isDarkMode: boolean;
    onToggleTheme: () => void;
  }
  
  export default function SettingsView({ onLogout, isDarkMode, onToggleTheme }: SettingsViewProps) {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

    const theme = {
      cardBg: isDarkMode ? 'bg-slate-800' : 'bg-white',
      cardBorder: isDarkMode ? 'border-slate-700' : 'border-gray-200',
      textPrimary: isDarkMode ? 'text-white' : 'text-gray-900',
      textSecondary: isDarkMode ? 'text-gray-400' : 'text-gray-500',
      inputBg: isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50/50',
      inputBorder: isDarkMode ? 'border-slate-600' : 'border-gray-200',
      buttonSecondaryBg: isDarkMode ? 'bg-slate-900 hover:bg-slate-800' : 'bg-gray-50 hover:bg-gray-100',
      buttonSecondaryText: isDarkMode ? 'text-gray-300' : 'text-gray-700',
      modalBg: isDarkMode ? 'bg-slate-800' : 'bg-white',
      modalOverlay: 'fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4',
    };
  
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        
        {/* Cabeçalho */}
        <div className="flex flex-col gap-1 mb-8">
          <h2 className={`text-2xl font-bold ${theme.textPrimary}`}>Configurações</h2>
          <p className={`text-sm ${theme.textSecondary}`}>Visualize seus dados e gerencie suas preferências.</p>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Card de Perfil */}
            <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl p-8 shadow-sm transition-colors duration-300`}>
              <div className={`flex items-center gap-3 mb-8 border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-100'} pb-4`}>
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
                  <User className="w-5 h-5" />
                </div>
                <h3 className={`font-bold text-lg ${theme.textPrimary}`}>Meu Perfil</h3>
              </div>
  
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-3 mx-auto md:mx-0">
                  <div className="relative group cursor-pointer">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc2ODkwNDkxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Profile" 
                      className={`w-32 h-32 rounded-full object-cover border-4 shadow-lg ${isDarkMode ? 'border-slate-700' : 'border-white'}`}
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Camera className="w-8 h-8" />
                    </div>
                  </div>
                  <span className={`text-xs font-medium ${theme.textSecondary}`}>JPG ou PNG até 2MB</span>
                </div>
  
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                  <ReadOnlyField label="Nome Completo" value="Gestor Municipal" icon={<User className="w-4 h-4 opacity-40" />} isDarkMode={isDarkMode} theme={theme} fullWidth />
                  <ReadOnlyField label="CPF" value="000.000.000-00" icon={<FileText className="w-4 h-4 opacity-40" />} isDarkMode={isDarkMode} theme={theme} />
                  <ReadOnlyField label="RG" value="0.000.000-0" icon={<FileText className="w-4 h-4 opacity-40" />} isDarkMode={isDarkMode} theme={theme} />
                  <ReadOnlyField label="Telefone" value="(85) 99999-9999" icon={<Phone className="w-4 h-4 opacity-40" />} isDarkMode={isDarkMode} theme={theme} />
                  <ReadOnlyField label="Cargo" value="Secretário de Finanças" icon={<Briefcase className="w-4 h-4 opacity-40" />} isDarkMode={isDarkMode} theme={theme} />
                  <ReadOnlyField label="E-mail Corporativo" value="gestor.financas@municipio.ce.gov.br" icon={<Mail className="w-4 h-4 opacity-40" />} isDarkMode={isDarkMode} theme={theme} fullWidth />
                </div>
              </div>
            </div>
  
            {/* Card de Aparência */}
            <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl p-8 shadow-sm transition-colors duration-300`}>
               <div className={`flex items-center gap-3 mb-6 border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-100'} pb-4`}>
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
                <div className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${isDarkMode ? 'bg-[#2e6a50]' : 'bg-gray-300'}`}>
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
              </div>
            </div>
          </div>
  
          {/* Coluna da Direita */}
          <div className="space-y-6">
            <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl p-6 shadow-sm transition-colors`}>
              <div className={`flex items-center gap-3 mb-6 border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-100'} pb-4`}>
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className={`font-bold text-lg ${theme.textPrimary}`}>Notificações</h3>
              </div>
              <div className={`flex items-start gap-3 p-3 rounded-lg ${theme.hoverBg}`}>
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                     <p className={`text-sm font-bold ${theme.textPrimary}`}>Alertas por E-mail</p>
                     <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-[#2e6a50] focus:ring-[#2e6a50]" />
                  </div>
                  <p className={`text-sm ${theme.textSecondary}`}>Receba notificações importantes sobre atualizações.</p>
                </div>
              </div>
            </div>
  
            <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl p-6 shadow-sm transition-colors`}>
               <div className={`flex items-center gap-3 mb-6 border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-100'} pb-4`}>
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600'}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className={`font-bold text-lg ${theme.textPrimary}`}>Segurança</h3>
              </div>
              <button 
                onClick={() => setIsPasswordModalOpen(true)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors mb-4 group border ${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} ${theme.cardBorder}`}
              >
                <span className="font-medium">Alterar Senha</span>
                <Lock className="w-4 h-4 text-gray-400 group-hover:text-[#2e6a50] transition-colors" />
              </button>
               <button onClick={onLogout} className={`w-full flex items-center justify-center gap-2 px-4 py-3 border rounded-lg text-sm font-bold transition-all ${isDarkMode ? 'bg-red-900/20 hover:bg-red-900/30 border-red-900/50 text-red-400' : 'bg-red-50 hover:bg-red-100 border-red-200 text-red-700'}`}>
                <LogOut className="w-4 h-4" /> Sair do Sistema
              </button>
            </div>
          </div>
        </div>

        {/* MODAL DE ALTERAÇÃO DE SENHA */}
        {isPasswordModalOpen && (
          <div className={theme.modalOverlay}>
            <div className={`w-full max-w-md ${theme.modalBg} rounded-2xl shadow-2xl p-8 border ${theme.cardBorder} animate-in zoom-in duration-200`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Alterar Senha</h3>
                <button onClick={() => setIsPasswordModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsPasswordModalOpen(false); }}>
                {/* Senha Atual */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-bold tracking-wider ${theme.textSecondary}`}>Senha Atual</label>
                  <div className="relative">
                    <input 
                      type={showPass.current ? "text" : "password"} 
                      placeholder="Digite sua senha atual" 
                      className={`w-full px-4 py-3 rounded-lg border outline-none focus:ring-1 focus:ring-[#2e6a50] transition-all ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary}`}
                    />
                    <button type="button" onClick={() => setShowPass({...showPass, current: !showPass.current})} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2e6a50]">
                      {showPass.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Senha Nova */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-bold tracking-wider ${theme.textSecondary}`}>Senha Nova</label>
                  <div className="relative">
                    <input 
                      type={showPass.new ? "text" : "password"} 
                      placeholder="Nova senha" 
                      className={`w-full px-4 py-3 rounded-lg border outline-none focus:ring-1 focus:ring-[#2e6a50] transition-all ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary}`}
                    />
                    <button type="button" onClick={() => setShowPass({...showPass, new: !showPass.new})} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2e6a50]">
                      {showPass.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Repetir Senha Nova */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-bold tracking-wider ${theme.textSecondary}`}>Repetir Senha Nova</label>
                  <div className="relative">
                    <input 
                      type={showPass.confirm ? "text" : "password"} 
                      placeholder="Confirme a nova senha" 
                      className={`w-full px-4 py-3 rounded-lg border outline-none focus:ring-1 focus:ring-[#2e6a50] transition-all ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary}`}
                    />
                    <button type="button" onClick={() => setShowPass({...showPass, confirm: !showPass.confirm})} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2e6a50]">
                      {showPass.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsPasswordModalOpen(false)}
                    className={`flex-1 py-3 font-bold rounded-lg border transition-colors ${isDarkMode ? 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600' : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-[#2e6a50] hover:bg-[#1a3e3e] text-white font-bold rounded-lg transition-colors shadow-lg shadow-[#2e6a50]/20"
                  >
                    Trocar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  function ReadOnlyField({ label, value, icon, theme, fullWidth }: any) {
    return (
      <div className={`space-y-1.5 ${fullWidth ? 'md:col-span-2' : ''}`}>
        <label className={`text-[10px] font-bold uppercase tracking-wider ${theme.textSecondary}`}>{label}</label>
        <div className={`w-full px-4 py-2.5 rounded-lg text-sm border flex items-center gap-2 ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary}`}>
          {icon}
          {value}
        </div>
      </div>
    );
  }