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
import { LoginView } from './components/LoginView';
import { UnassignedUserView } from './components/UnassignedUserView';
import { store } from './services/store';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(store.currentUserId);
  });
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

  // Atualização dinâmica do Título do Navegador (<title>)
  useEffect(() => {
    if (!isAuthenticated) {
      document.title = 'Login | RAHNAG';
      return;
    }

    const tabTitles: Record<string, string> = {
      painel: 'Painel | RAHNAG',
      partidas: 'Partidas | RAHNAG',
      mapas: 'Mapas | RAHNAG',
      jogadores: 'Jogadores | RAHNAG',
      'jogadores-perfil': 'Perfil do Jogador | RAHNAG',
      treinamento: 'Treinamento | RAHNAG',
      conteudos: 'Conteúdos | RAHNAG',
      analises: 'Análises | RAHNAG',
      equipe: 'Equipe | RAHNAG',
      configuracoes: 'Configurações | RAHNAG'
    };

    document.title = tabTitles[currentTab] || 'RAHNAG';
  }, [currentTab, isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    store.currentUserId = '';
    store.activeTenantId = '';
    store.saveToStorage();
    document.title = 'Login | RAHNAG';
    refreshState();
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    refreshState();
  };

  // 1. Se não estiver autenticado -> Forçar tela de Login
  if (!isAuthenticated) {
    return (
      <>
        <LoginView onLoginSuccess={handleLoginSuccess} />

        {inviteToken && (
          <InviteAcceptModal
            initialToken={inviteToken}
            onSuccess={() => {
              setInviteToken(null);
              window.history.pushState({}, '', '/');
              setIsAuthenticated(true);
              refreshState();
            }}
            onClose={() => setInviteToken(null)}
          />
        )}
      </>
    );
  }

  // 2. Verificar se o usuário autenticado pertence a alguma equipe
  const currentUser = store.users.find(u => u.id === store.currentUserId);
  const currentMember = store.members.find(
    m => m.userId === currentUser?.id && m.tenantId === store.activeTenantId
  ) || store.members.find(m => m.userId === currentUser?.id);

  if (currentUser && !currentMember) {
    return <UnassignedUserView onLogout={handleLogout} />;
  }

  const tabHeaderTitles: Record<string, string> = {
    painel: 'Painel',
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
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onLogout={handleLogout}
      />

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TopAppBar Fixo (64px) */}
        <Header title={tabHeaderTitles[currentTab] || 'Painel'} onRefreshState={refreshState} />

        {/* Canvas de Conteúdo com pt-24 (espaço desobstruído abaixo do header fixo) */}
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
            setIsAuthenticated(true);
            refreshState();
          }}
          onClose={() => setInviteToken(null)}
        />
      )}

    </div>
  );
}

export default App;
