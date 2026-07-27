import React, { useState } from 'react';
import { store } from '../services/store';

interface HeaderProps {
  onRefreshState: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onRefreshState, title = 'Painel' }) => {
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);

  const activeTenant = store.tenants.find(t => t.id === store.activeTenantId) || store.tenants[0];
  const currentUser = store.users.find(u => u.id === store.currentUserId) || store.users[0];

  // Filtra equipes das quais o usuário faz parte
  const userMemberships = store.members.filter(m => m.userId === currentUser?.id);
  const userTenants = store.tenants.filter(t => userMemberships.some(m => m.tenantId === t.id));

  return (
    <header className="h-16 w-[calc(100%-260px)] fixed top-0 right-0 bg-[#fef7ff] border-b border-[#ccc3d8] flex justify-between items-center px-6 z-40">
      
      {/* Title & Multi-tenant Team selector */}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-extrabold text-[#1d1a24]">{title}</h2>

        {activeTenant && (
          <div className="relative">
            <button
              onClick={() => setShowTenantDropdown(!showTenantDropdown)}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#f9f1ff] border border-[#ccc3d8] hover:border-[#630ed4] text-xs font-semibold text-[#1d1a24] transition-all"
            >
              <span className="material-symbols-outlined text-[16px] text-[#630ed4]">shield</span>
              <span className="truncate max-w-[160px]">{activeTenant.name || 'RAHNAG'}</span>
              {userTenants.length > 1 && (
                <span className="material-symbols-outlined text-[16px] text-[#7b7487]">expand_more</span>
              )}
            </button>

            {showTenantDropdown && userTenants.length > 1 && (
              <div className="absolute left-0 mt-2 w-64 bg-white border border-[#ccc3d8] rounded-xl shadow-lg z-50 overflow-hidden py-1">
                <div className="px-3 py-2 text-[10px] font-bold text-[#7b7487] uppercase border-b border-[#ccc3d8]">
                  Minhas Equipes RAHNAG
                </div>

                <div className="max-h-48 overflow-y-auto">
                  {userTenants.map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        store.activeTenantId = t.id;
                        store.saveToStorage();
                        setShowTenantDropdown(false);
                        onRefreshState();
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-all ${
                        t.id === activeTenant.id
                          ? 'bg-[#e3e1ed] text-[#630ed4] font-bold border-l-2 border-[#630ed4]'
                          : 'text-[#1d1a24] hover:bg-[#f9f1ff]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#630ed4]">shield</span>
                        <span>{t.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Tools & Profile */}
      <div className="flex items-center gap-6">
        
        {/* Search Bar */}
        <div className="relative hidden lg:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7487] text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar na RAHNAG..."
            className="pl-10 pr-4 py-1.5 bg-[#f9f1ff] border border-[#ccc3d8] rounded-full text-xs font-medium text-[#1d1a24] focus:outline-none focus:ring-2 focus:ring-[#630ed4]/20 focus:border-[#630ed4] w-60 transition-all"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4 text-[#4a4455]">
          <span className="material-symbols-outlined hover:text-[#630ed4] cursor-pointer transition-colors">
            notifications
          </span>
          <span className="material-symbols-outlined hover:text-[#630ed4] cursor-pointer transition-colors">
            help_outline
          </span>
          <div className="w-8 h-8 rounded-full bg-[#eaddff] border border-[#ccc3d8] flex items-center justify-center font-bold text-xs text-[#630ed4]">
            {currentUser?.fullName ? currentUser.fullName.substring(0, 1) : 'U'}
          </div>
        </div>

      </div>

    </header>
  );
};
