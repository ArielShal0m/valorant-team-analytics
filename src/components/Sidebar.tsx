import React from 'react';
import { store } from '../services/store';
import logoRahnag from '../assets/logo-rahnag.png';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab, onLogout }) => {
  const currentUser = store.users.find(u => u.id === store.currentUserId) || store.users[0];
  const currentMember = store.members.find(
    m => m.tenantId === store.activeTenantId && m.userId === currentUser?.id
  );

  const roleLabels: Record<string, string> = {
    ORGANIZER: 'Admin Team',
    COACH: 'Coach',
    PLAYER: 'Pro Player'
  };

  const navItems = [
    { id: 'painel', label: 'Painel', icon: 'dashboard' },
    { id: 'partidas', label: 'Partidas', icon: 'sports_esports' },
    { id: 'mapas', label: 'Mapas', icon: 'map' },
    { id: 'jogadores', label: 'Jogadores', icon: 'groups' },
    { id: 'treinamento', label: 'Treinamento', icon: 'fitness_center' },
    { id: 'conteudos', label: 'Conteúdos', icon: 'movie' },
    { id: 'analises', label: 'Análises', icon: 'analytics' },
    { id: 'equipe', label: 'Equipe', icon: 'badge' },
    { id: 'configuracoes', label: 'Configurações', icon: 'settings' },
  ];

  return (
    <aside className="w-[260px] h-full fixed left-0 top-0 bg-[#ffffff] border-r border-[#ccc3d8] flex flex-col py-6 gap-2 z-50">
      
      {/* Brand Header com a Logo Oficial da RAHNAG */}
      <div className="px-6 mb-6 flex items-center gap-3">
        <img src={logoRahnag} alt="RAHNAG" className="h-10 w-auto object-contain" />
        <div className="flex flex-col">
          <h1 className="font-extrabold text-xl text-[#630ed4] leading-tight tracking-tight">RAHNAG</h1>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = currentTab === item.id || (currentTab === 'jogadores-perfil' && item.id === 'jogadores');

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all rounded-lg text-left ${
                isActive
                  ? 'bg-[#e3e1ed] text-[#630ed4] font-semibold'
                  : 'text-[#4a4455] hover:bg-[#f9f1ff] hover:text-[#630ed4]'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? 'fill-1' : ''}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Profile Widget at Bottom with Logout Action */}
      <div className="px-5 pt-4 border-t border-[#ccc3d8]">
        <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#f3ebfa] border border-[#e8dfee]">
          <div className="w-8 h-8 rounded-full bg-[#eaddff] flex items-center justify-center text-[#630ed4] font-bold text-xs flex-shrink-0">
            {currentUser?.fullName ? currentUser.fullName.substring(0, 1) : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#1d1a24] truncate">{currentUser?.fullName || 'Usuário'}</p>
            <p className="text-[10px] text-[#630ed4] font-semibold truncate">{roleLabels[currentMember?.role || 'PLAYER']}</p>
          </div>
          <button
            onClick={onLogout}
            title="Sair da conta"
            className="p-1 rounded hover:bg-[#e3e1ed] text-[#7b7487] hover:text-[#ba1a1a] transition-colors"
          >
            <span className="material-symbols-outlined text-base">logout</span>
          </button>
        </div>
      </div>

    </aside>
  );
};
