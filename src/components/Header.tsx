import React, { useState } from 'react';
import { store } from '../services/store';
import { Plus, Shield } from 'lucide-react';

interface HeaderProps {
  onRefreshState: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onRefreshState, title = 'Dashboard' }) => {
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);
  const [showNewTeamModal, setShowNewTeamModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');

  const activeTenant = store.tenants.find(t => t.id === store.activeTenantId) || store.tenants[0];
  const currentUser = store.users.find(u => u.id === store.currentUserId) || store.users[0];

  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    const newTenantId = `tenant_${Date.now()}`;
    const newTenant = {
      id: newTenantId,
      name: newTeamName,
      slug: newTeamName.toLowerCase().replace(/\s+/g, '-'),
      logoEmoji: '⚔️',
      primaryColor: '#630ed4',
      createdAt: new Date().toISOString()
    };

    store.tenants.push(newTenant);
    store.activeTenantId = newTenantId;

    store.members.push({
      id: `tm_${Date.now()}`,
      tenantId: newTenantId,
      userId: currentUser.id,
      user: currentUser,
      role: 'ORGANIZER',
      joinedAt: new Date().toISOString()
    });

    store.saveToStorage();
    setShowNewTeamModal(false);
    setShowTenantDropdown(false);
    onRefreshState();
  };

  return (
    <header className="h-16 w-[calc(100%-260px)] fixed top-0 right-0 bg-[#fef7ff] border-b border-[#ccc3d8] flex justify-between items-center px-6 z-40">
      
      {/* Title & Multi-tenant Team selector */}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-[#1d1a24]">{title}</h2>

        <div className="relative">
          <button
            onClick={() => setShowTenantDropdown(!showTenantDropdown)}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#f9f1ff] border border-[#ccc3d8] hover:border-[#630ed4] text-xs font-semibold text-[#1d1a24] transition-all"
          >
            <span>{activeTenant.logoEmoji}</span>
            <span className="truncate max-w-[160px]">{activeTenant.name}</span>
            <span className="material-symbols-outlined text-[16px] text-[#7b7487]">expand_more</span>
          </button>

          {showTenantDropdown && (
            <div className="absolute left-0 mt-2 w-64 bg-white border border-[#ccc3d8] rounded-xl shadow-lg z-50 overflow-hidden py-1">
              <div className="px-3 py-2 text-[10px] font-bold text-[#7b7487] uppercase border-b border-[#ccc3d8]">
                Selecione a Equipe
              </div>

              <div className="max-h-48 overflow-y-auto">
                {store.tenants.map(t => (
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
                      <span>{t.logoEmoji}</span>
                      <span>{t.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="border-t border-[#ccc3d8] p-2">
                <button
                  onClick={() => {
                    setShowNewTeamModal(true);
                    setShowTenantDropdown(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-1.5 rounded-lg bg-[#f9f1ff] hover:bg-[#e3e1ed] text-xs font-semibold text-[#630ed4] transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Criar nova equipe
                </button>
              </div>
            </div>
          )}
        </div>
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
            placeholder="Buscar no sistema..."
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
            {currentUser.fullName.substring(0, 1)}
          </div>
        </div>

      </div>

      {/* Modal para criar nova equipe */}
      {showNewTeamModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#ccc3d8] rounded-2xl p-6 w-full max-w-md shadow-xl relative">
            <h3 className="text-base font-bold text-[#1d1a24] flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-[#630ed4]" />
              Criar Nova Equipe
            </h3>

            <form onSubmit={handleCreateTenant} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4a4455] mb-1">
                  Nome da Equipe
                </label>
                <input
                  type="text"
                  placeholder="Ex: Equipe Gamma VCT"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#ccc3d8] text-[#1d1a24] text-xs font-semibold focus:outline-none focus:border-[#630ed4]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewTeamModal(false)}
                  className="px-4 py-2 rounded-lg border border-[#ccc3d8] text-xs font-semibold text-[#4a4455] hover:bg-[#f9f1ff]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary-stitch text-xs"
                >
                  Criar equipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </header>
  );
};
