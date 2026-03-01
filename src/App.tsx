import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './components/Login';
import DashboardView from './components/views/DashboardView';
import CaucView from './components/views/CaucView';
import ParceriasView from './components/views/ParceriasView';
import CertidoesView from './components/views/CertidoesView';
import ChamadosView from './components/views/ChamadosView';
import ConveniosView from './components/views/ConveniosView';
import ConvenioDetalhamento from './components/convenios/ConvenioDetalhamento';
import CertidaoDetalhamento from './components/certidoes/CertidaoDetalhamento';
import MunicipiosView from './components/views/MunicipiosView';
import UsuariosView from './components/views/UsuariosView';
import UnidadesGestorasView from './components/views/UnidadesGestorasView';
import SettingsView from './components/views/SettingsView';
import { CITIES } from './lib/data';
import type { Municipio } from './lib/municipios-data';
import type { Certidao } from './lib/certidoes-data';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentCityId, setCurrentCityId] = useState('fortaleza');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [municipioSelecionado, setMunicipioSelecionado] = useState<Municipio | null>(null);
  const [convenioSelecionadoId, setConvenioSelecionadoId] = useState<string | null>(null);
  const [certidaoSelecionada, setCertidaoSelecionada] = useState<Certidao | null>(null);
  
  // Estado para o tema (Dark Mode)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const currentCity = CITIES.find(c => c.id === currentCityId) || CITIES[0];

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView city={currentCity} onNavigate={setCurrentView} />; 
      case 'cauc':
        return <CaucView city={currentCity} />;
      case 'parcerias':
        return <ParceriasView city={currentCity} />;
      case 'certidoes':
        return (
          <CertidoesView 
            city={currentCity} 
            onOpenDetalhamento={(certidao: Certidao) => {
              setCertidaoSelecionada(certidao);
              setCurrentView('certidao-detalhamento');
            }}
          />
        );
      case 'convenios':
        return (
          <ConveniosView 
            city={currentCity} 
            onOpenDetalhamento={(id: string) => {
              setConvenioSelecionadoId(id);
              setCurrentView('convenio-detalhamento');
            }}
          />
        );
      case 'convenio-detalhamento':
        return convenioSelecionadoId ? (
          <ConvenioDetalhamento 
            convenioId={convenioSelecionadoId} 
            onBack={() => {
              setConvenioSelecionadoId(null);
              setCurrentView('convenios');
            }}
          />
        ) : null;
      case 'certidao-detalhamento':
        return certidaoSelecionada ? (
          <CertidaoDetalhamento 
            certidao={certidaoSelecionada} 
            onBack={() => {
              setCertidaoSelecionada(null);
              setCurrentView('certidoes');
            }}
          />
        ) : null;
      case 'chamados':
        return <ChamadosView city={currentCity} />;
      case 'municipios':
        return (
          <MunicipiosView 
            onVerUnidadesGestoras={(municipio) => {
              setMunicipioSelecionado(municipio);
              setCurrentView('unidadesgestoras');
            }}
          />
        );
      case 'usuarios':
        return <UsuariosView city={currentCity} />;
      case 'unidadesgestoras':
        return municipioSelecionado ? (
          <UnidadesGestorasView 
            municipio={municipioSelecionado}
            onBack={() => setCurrentView('municipios')}
          />
        ) : null;
      case 'settings':
        return (
          <SettingsView 
            onLogout={handleLogout} 
            isDarkMode={isDarkMode} 
            onToggleTheme={toggleTheme} 
          />
        );
      default:
        return <DashboardView city={currentCity} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'dark bg-[#0f172a] text-gray-100' : 'bg-[#f7f7f7] text-[#626262]'}`}>
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={handleLogout}
      />
      
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <Header 
          currentCity={currentCity} 
          onChangeCity={setCurrentCityId}
          isSidebarOpen={isSidebarOpen}
          onSettingsClick={() => setCurrentView('settings')}
          hideCitySelector={currentView === 'municipios' || currentView === 'unidadesgestoras'}
        />
        
        <main className="flex-1 mt-16 p-6 md:p-8 overflow-y-auto">
          <div className="w-full max-w-[1920px] mx-auto">
             {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;