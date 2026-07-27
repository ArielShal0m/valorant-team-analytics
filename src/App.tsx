import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TeamDashboardView } from './components/TeamDashboardView';
import { MapPerformanceView } from './components/MapPerformanceView';
import { PlayerAnalyticsView } from './components/PlayerAnalyticsView';
import { TrainingDashboardView } from './components/TrainingDashboardView';
import { TeamManagementView } from './components/TeamManagementView';
import { InsightsView } from './components/InsightsView';
import { ConteudosView } from './components/ConteudosView';
import { InviteAcceptModal } from './components/InviteAcceptModal';

export function App() {
  const [currentTab, setCurrentTab] = useState('painel');
  const [, setTick] = useState(0);
  const [inviteToken, setInviteToken] = useState<string | null>(null);

  const refreshState = () => {
    setTick(t => t + 1);
  };

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/convite/') || path.includes('/invite/')) {
      const token = path.split('/convite/')[1] || path.split('/invite/')[1];
      if (token) {
        setInviteToken(token);
      }
    }
  }, []);

  const tabTitles: Record<string, string> = {
    painel: 'Dashboard',
    partidas: 'Partidas',
    mapas: 'Mapas',
    jogadores: 'Jogadores',
    'jogadores-perfil': 'Perfil do Jogador',
    treinamento: 'Treinamento',
    conteudos: 'Conteúdos',
    analises: 'Análises',
    equipe: 'Equipe',
    configuracoes: 'Configurações'
  };

  return (
    <div className="min-h-screen bg-[#fef7ff] text-[#1d1a24] flex font-sans selection:bg-[#630ed4] selection:text-white">
      
      {/* SideNavBar Fixo (260px) */}
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TopAppBar Fixo (64px) */}
        <Header title={tabTitles[currentTab] || 'Dashboard'} onRefreshState={refreshState} />

        {/* Canvas de Conteúdo com pt-24 (espaço suficiente abaixo do header fixo) */}
        <main className="ml-[260px] pt-24 pb-12 px-6 md:px-8 min-h-screen flex-1 max-w-7xl w-full mx-auto space-y-8 overflow-x-hidden">
          
          {currentTab === 'painel' && (
            <TeamDashboardView onNavigateTab={setCurrentTab} onRefreshState={refreshState} />
          )}

          {currentTab === 'partidas' && (
            <TeamDashboardView onNavigateTab={setCurrentTab} onRefreshState={refreshState} />
          )}

          {currentTab === 'mapas' && (
            <MapPerformanceView />
          )}

          {currentTab === 'jogadores' && (
            <TeamManagementView onRefreshState={refreshState} onSelectPlayerProfile={() => setCurrentTab('jogadores-perfil')} />
          )}

          {currentTab === 'jogadores-perfil' && (
            <PlayerAnalyticsView />
          )}

          {currentTab === 'treinamento' && (
            <TrainingDashboardView onRefreshState={refreshState} />
          )}

          {currentTab === 'conteudos' && (
            <ConteudosView />
          )}

          {currentTab === 'analises' && (
            <InsightsView />
          )}

          {currentTab === 'equipe' && (
            <TeamManagementView onRefreshState={refreshState} />
          )}

          {currentTab === 'configuracoes' && (
            <TeamManagementView onRefreshState={refreshState} />
          )}

        </main>

      </div>

      {/* Modal de Convite via Link `/convite/:token` */}
      {inviteToken && (
        <InviteAcceptModal
          initialToken={inviteToken}
          onSuccess={() => {
            setInviteToken(null);
            window.history.pushState({}, '', '/');
            refreshState();
          }}
          onClose={() => setInviteToken(null)}
        />
      )}

    </div>
  );
}

export default App;
