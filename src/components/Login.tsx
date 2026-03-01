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
          {/* Decorative patterns can go here if needed */}
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

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#bbbbbb]/30"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-[#bbbbbb]">Ou acesse com</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#bbbbbb]/40 rounded-lg hover:bg-[#f7f7f7] transition-colors text-sm font-medium text-[#626262]">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#bbbbbb]/40 rounded-lg hover:bg-[#f7f7f7] transition-colors text-sm font-medium text-[#626262]">
                <svg className="w-5 h-5 fill-current text-black" viewBox="0 0 384 512">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
                </svg>
                Apple
              </button>
            </div>

            <div className="mt-8 text-center">
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
