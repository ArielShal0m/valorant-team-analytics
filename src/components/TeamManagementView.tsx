import React, { useState } from 'react';
import { store } from '../services/store';
import { inviteService } from '../services/inviteService';
import type { UserRole } from '../types';

interface TeamManagementViewProps {
  onRefreshState: () => void;
  onSelectPlayerProfile?: (profileId: string) => void;
}

export const TeamManagementView: React.FC<TeamManagementViewProps> = ({ onRefreshState, onSelectPlayerProfile }) => {
  const currentUser = store.users.find(u => u.id === store.currentUserId) || store.users[0];
  const currentMember = store.members.find(
    m => m.tenantId === store.activeTenantId && m.userId === currentUser.id
  ) || store.members[0];

  const isOrganizer = currentMember?.role === 'ORGANIZER';

  const [showAddModal, setShowAddModal] = useState(false);
  const [inviteRole, setInviteRole] = useState<UserRole>('PLAYER');
  const [generatedInviteLink, setGeneratedInviteLink] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const tenantMembers = store.members.filter(m => m.tenantId === store.activeTenantId);
  const tenantProfiles = store.profiles.filter(p => p.tenantId === store.activeTenantId);

  const handleCreateInvite = () => {
    if (!isOrganizer) return;
    const invite = inviteService.createInvite(inviteRole, 7);
    const link = `${window.location.origin}/convite/${invite.token}`;
    setGeneratedInviteLink(link);
    onRefreshState();
  };

  const handleCopy = (linkToCopy: string) => {
    navigator.clipboard.writeText(linkToCopy);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1d1a24]">Jogadores</h2>
          <p className="text-xs text-[#4a4455] mt-0.5">Gerencie os membros da equipe e os convites de acesso</p>
        </div>

        {isOrganizer && (
          <button
            onClick={() => {
              setGeneratedInviteLink(null);
              setShowAddModal(true);
            }}
            className="btn-primary-stitch text-xs flex items-center gap-2 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Adicionar jogador
          </button>
        )}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-[#ccc3d8] overflow-hidden shadow-xs">
        
        {/* Filter Controls */}
        <div className="p-4 border-b border-[#ccc3d8] flex justify-between items-center bg-white">
          <div className="flex gap-2">
            <button className="px-3.5 py-1 text-xs font-semibold rounded-lg bg-[#e3e1ed] text-[#630ed4]">
              Todos ({tenantMembers.length})
            </button>
            <button className="px-3.5 py-1 text-xs font-semibold rounded-lg text-[#4a4455] hover:bg-[#f9f1ff]">
              Ativos
            </button>
            <button className="px-3.5 py-1 text-xs font-semibold rounded-lg text-[#4a4455] hover:bg-[#f9f1ff]">
              Em reserva
            </button>
          </div>

          <button className="flex items-center gap-1 text-xs text-[#4a4455] hover:text-[#630ed4] font-medium">
            <span className="material-symbols-outlined text-[16px]">filter_list</span>
            Filtros
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9f1ff]/50 text-xs font-bold text-[#7b7487] uppercase border-b border-[#ccc3d8]">
                <th className="px-6 py-4">Player</th>
                <th className="px-6 py-4">Riot ID</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ccc3d8]">
              {tenantMembers.map(m => {
                const profile = tenantProfiles.find(p => p.teamMemberId === m.id);
                const riotId = profile?.riotAccount ? `${profile.riotAccount.gameName}#${profile.riotAccount.tagLine}` : 'Pedro#BR1';

                return (
                  <tr key={m.id} className="hover:bg-[#f9f1ff]/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-[#630ed4]/20 bg-[#eaddff] flex items-center justify-center font-bold text-[#630ed4] text-sm">
                          {m.user.fullName.substring(0, 1)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1d1a24]">{m.user.fullName}</p>
                          <p className="text-[10px] text-[#630ed4] font-bold uppercase tracking-wider">
                            {m.role === 'ORGANIZER' ? 'Team Captain' : m.role === 'COACH' ? 'Coach' : 'Pro Player'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-[#4a4455] bg-[#f3ebfa] px-2.5 py-1 rounded border border-[#ccc3d8]/40 font-semibold">
                        {riotId}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-[#1d1a24]">
                      {profile?.primaryAgent ? `${profile.primaryAgent} / Flex` : 'Duelist / IGL'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-[#7b7487]">Hoje, 14:30</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onSelectPlayerProfile && profile && onSelectPlayerProfile(profile.id)}
                        className="text-[#630ed4] hover:bg-[#630ed4]/10 p-1.5 rounded-lg transition-colors font-bold text-xs"
                      >
                        [Ver perfil]
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Bento Grid Stats Cards Below Table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white border border-[#ccc3d8] p-6 rounded-xl shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-[#7b7487] uppercase tracking-wider">Média de Horas</p>
            <span className="material-symbols-outlined text-[#630ed4]">schedule</span>
          </div>
          <p className="text-4xl font-bold text-[#1d1a24]">6.4<span className="text-base font-normal text-[#7b7487] ml-1">h/dia</span></p>
          <p className="text-xs text-emerald-700 font-bold mt-2 flex items-center">
            <span className="material-symbols-outlined text-xs mr-0.5">arrow_upward</span>
            +12% vs última semana
          </p>
        </div>

        <div className="bg-white border border-[#ccc3d8] p-6 rounded-xl shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-[#7b7487] uppercase tracking-wider">Performance Geral</p>
            <span className="material-symbols-outlined text-[#630ed4]">insights</span>
          </div>
          <p className="text-4xl font-bold text-[#1d1a24]">A+</p>
          <div className="w-full bg-[#e8dfee] h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#630ed4] h-full rounded-full w-[88%]" />
          </div>
          <p className="text-xs text-[#7b7487] mt-2">Ranked: Top 5% Global</p>
        </div>

        <div className="bg-white border border-[#ccc3d8] p-6 rounded-xl shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-[#7b7487] uppercase tracking-wider">Próxima partida</p>
            <span className="material-symbols-outlined text-[#630ed4]">event</span>
          </div>
          <p className="text-base font-bold text-[#1d1a24]">vs DRX Academy</p>
          <p className="text-xs text-[#7b7487] mt-0.5">Amanhã às 18:00</p>
        </div>

      </div>

      {/* Modal Adicionar Jogador / Gerar Convite */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#ccc3d8] rounded-2xl p-6 w-full max-w-md shadow-xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-[#ccc3d8] pb-3">
              <h3 className="text-base font-bold text-[#1d1a24]">Adicionar jogador</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#7b7487] hover:text-[#1d1a24]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {!generatedInviteLink ? (
              <div className="space-y-4">
                <p className="text-xs text-[#4a4455]">
                  O sistema gerará um link de convite único. Ao abrir o link, o jogador criará sua conta e entrará automaticamente na equipe.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-[#4a4455] mb-1">
                    Cargo no time:
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#ccc3d8] text-[#1d1a24] text-xs font-semibold focus:outline-none focus:border-[#630ed4]"
                  >
                    <option value="PLAYER">Jogador</option>
                    <option value="COACH">Coach</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-lg border border-[#ccc3d8] text-xs font-semibold text-[#4a4455] hover:bg-[#f9f1ff]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateInvite}
                    className="btn-primary-stitch text-xs"
                  >
                    Gerar convite
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-center py-2">
                <div className="p-4 rounded-xl bg-[#eaddff] border border-[#ccc3d8] text-[#630ed4]">
                  <span className="text-xs font-semibold block mb-1">Link de Convite Gerado!</span>
                  <span className="text-sm font-mono font-bold block break-all">{generatedInviteLink}</span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(generatedInviteLink)}
                    className="btn-primary-stitch text-xs flex items-center gap-1.5"
                  >
                    {copiedLink ? 'Copiado!' : 'Copiar convite'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-lg border border-[#ccc3d8] text-xs font-semibold text-[#4a4455]"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
