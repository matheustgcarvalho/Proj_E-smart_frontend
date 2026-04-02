import React, { useState } from 'react';
import { Eye, EyeOff, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden font-sans">
      {/* Background Layer */}
      <div className="absolute inset-0 flex">
        {/* Lado Esquerdo - 70% Verde (#2e6a50) */}
        <div className="w-[70%] bg-[#2e6a50] relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1a3e3e]/10"></div>
        </div>
        {/* Lado Direito - 30% Branco (#f7f7f7) */}
        <div className="w-[30%] bg-[#f7f7f7] relative">
          {/* Dot pattern background */}
          <div 
            className="absolute inset-0 opacity-[0.4]" 
            style={{ 
              backgroundImage: 'radial-gradient(#bbbbbb 1px, transparent 1px)', 
              backgroundSize: '24px 24px' 
            }}
          ></div>
        </div>
      </div>

      {/* Content Container - Z-Index Higher */}
      <div className="relative z-10 w-full flex h-screen">
        
        {/* Left Content Area */}
        <div className="w-[70%] h-full flex flex-col justify-center pl-32 pr-20">
          <div className="max-w-2xl text-white">
            <div className="flex items-center gap-1 mb-10">
               <h1 className="text-3xl font-bold tracking-tight">E-Smart</h1>
               <span className="text-3xl font-bold text-[#e8a455]">/</span>
            </div>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              A inteligência que <br/> move sua gestão <br/> pública.
            </h2>
            
            <p className="text-[#f7f7f7]/80 text-lg mb-12 leading-relaxed max-w-xl">
              Uma plataforma integrada para prefeitos e contadores que transforma dados fiscais em decisões estratégicas. Segurança, transparência e agilidade em um só lugar.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a3e3e]/30 border border-[#f7f7f7]/20 rounded-full text-[#f7f7f7] text-sm">
              <Shield className="w-4 h-4 text-[#e8a455]" />
              Sincronizado com Tesouro Nacional
            </div>
          </div>
        </div>

        {/* Right Area Spacer */}
        <div className="w-[30%]"></div>

        {/* Floating Login Card - Positioned on the split line */}
        <div className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] px-4">
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-full">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#1a3e3e] mb-1">Acesse sua conta</h3>
              <p className="text-sm text-[#bbbbbb]">Entre com seus dados de acesso.</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#626262] uppercase tracking-wider">Usuário</label>
                <input 
                  type="text" 
                  placeholder="Digite seu usuário"
                  className="w-full px-4 py-3 rounded-lg border border-[#bbbbbb]/40 focus:border-[#2e6a50] focus:ring-1 focus:ring-[#2e6a50] outline-none transition-all bg-white text-[#1a3e3e] placeholder:text-[#bbbbbb]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#626262] uppercase tracking-wider">Senha</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="w-full px-4 py-3 rounded-lg border border-[#bbbbbb]/40 focus:border-[#2e6a50] focus:ring-1 focus:ring-[#2e6a50] outline-none transition-all bg-white text-[#1a3e3e] placeholder:text-[#bbbbbb]"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#bbbbbb] hover:text-[#626262]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#2e6a50] hover:bg-[#1a3e3e] text-white font-bold rounded-lg transition-colors shadow-lg shadow-[#2e6a50]/20 mt-2"
              >
                Entrar
              </button>
            </form>

            <div className="mt-8 text-center border-t border-[#bbbbbb]/10 pt-8">
              <button className="text-sm font-bold text-[#2e6a50] hover:text-[#1a3e3e] hover:underline transition-colors">
                Esqueceu sua senha?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}