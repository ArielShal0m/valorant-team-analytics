import React, { useState } from 'react';
import { store } from '../services/store';
import { RiotAccountModal } from './RiotAccountModal';

export const PlayerAnalyticsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showRiotModal, setShowRiotModal] = useState(false);

  const currentUser = store.users.find(u => u.id === store.currentUserId) || store.users[0];
  const userProfile = store.profiles.find(p => p.tenantId === store.activeTenantId) || store.profiles[0];
  const riotAccount = userProfile?.riotAccount;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Header Section */}
      <section className="bg-white rounded-xl border border-[#ccc3d8] overflow-hidden shadow-xs">
        <div className="h-32 bg-gradient-to-r from-[#630ed4] to-[#7c3aed] relative" />
        
        <div className="px-8 pb-8 -mt-12 relative flex flex-col md:flex-row md:items-end gap-6">
          <div className="relative">
            <div className="h-32 w-32 rounded-2xl border-4 border-white overflow-hidden shadow-lg bg-[#eaddff] flex items-center justify-center font-extrabold text-4xl text-[#630ed4]">
              {currentUser?.fullName ? currentUser.fullName.substring(0, 2).toUpperCase() : 'US'}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 h-6 w-6 rounded-full border-4 border-white" title="Online" />
          </div>

          <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold text-[#1d1a24]">{currentUser?.fullName || 'Usuário RAHNAG'}</h2>
                {riotAccount ? (
                  <span className="px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    {riotAccount.gameName}#{riotAccount.tagLine}
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold rounded-full">
                    Sem Conta Riot Vinculada
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-1 text-xs text-[#4a4455]">
                <span className="flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-sm">person</span> Administrador RAHNAG
                </span>
                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                  <span className="material-symbols-outlined text-sm text-emerald-600">verified</span> Ativo
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowRiotModal(true)}
                className="btn-primary-stitch text-xs flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">sports_esports</span>
                {riotAccount ? 'Alterar Conta Riot' : 'Vincular Conta Riot'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="px-8 border-t border-[#ccc3d8]">
          <div className="flex gap-8 overflow-x-auto custom-scrollbar">
            {[
              { id: 'overview', label: 'Visão geral' },
              { id: 'maps', label: 'Mapas' },
              { id: 'agents', label: 'Agentes' },
              { id: 'matches', label: 'Partidas' },
              { id: 'training', label: 'Treinamentos' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`py-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === t.id
                    ? 'border-[#630ed4] text-[#630ed4]'
                    : 'border-transparent text-[#4a4455] hover:text-[#630ed4]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Card de Aviso caso não haja conta Riot Vinculada */}
      {!riotAccount && (
        <section className="bg-white border border-amber-300 rounded-xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-100 text-amber-800">
              <span className="material-symbols-outlined text-[28px]">sports_esports</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#1d1a24]">Vincule seu Riot ID para puxar histórico real</h4>
              <p className="text-xs text-[#4a4455]">
                Conecte seu Riot ID (ex: Cabeça ツ#BR01 ou SeuNick#BR1) para autorizar a sincronização de estatísticas.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowRiotModal(true)}
            className="btn-primary-stitch text-xs px-5 py-2.5 whitespace-nowrap"
          >
            Vincular Agora
          </button>
        </section>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Win Rate */}
        <div className="bg-white p-6 rounded-xl border border-[#ccc3d8] flex flex-col gap-2 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-[#7b7487] uppercase tracking-wider">Win Rate</span>
            <span className="material-symbols-outlined text-[#630ed4]">trending_up</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#1d1a24]">68%</span>
            <span className="text-emerald-700 text-xs font-bold">+2.4%</span>
          </div>
          <div className="w-full bg-[#e8dfee] h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-[#630ed4] h-full" style={{ width: '68%' }} />
          </div>
        </div>

        {/* K/D Ratio */}
        <div className="bg-white p-6 rounded-xl border border-[#ccc3d8] flex flex-col gap-2 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-[#7b7487] uppercase tracking-wider">K/D Ratio</span>
            <span className="material-symbols-outlined text-[#630ed4]">military_tech</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#1d1a24]">1.2</span>
            <span className="text-xs font-bold text-[#630ed4] bg-[#f3ebfa] px-2 py-0.5 rounded">Elite</span>
          </div>
          <p className="text-xs text-[#7b7487] mt-1">Acima da média da equipe</p>
        </div>

        {/* ACS Score */}
        <div className="bg-white p-6 rounded-xl border border-[#ccc3d8] flex flex-col gap-2 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-[#7b7487] uppercase tracking-wider">ACS Score</span>
            <span className="material-symbols-outlined text-[#630ed4]">bolt</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#1d1a24]">245</span>
            <span className="text-xs text-[#7b7487]">Pontos/Round</span>
          </div>
          <p className="text-xs text-[#7b7487] mt-1">Top 5% regional</p>
        </div>

        {/* KAST */}
        <div className="bg-white p-6 rounded-xl border border-[#ccc3d8] flex flex-col gap-2 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-[#7b7487] uppercase tracking-wider">KAST</span>
            <span className="material-symbols-outlined text-[#630ed4]">handshake</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#1d1a24]">78%</span>
            <span className="text-xs text-[#7b7487]">Utilitários</span>
          </div>
          <p className="text-xs text-[#7b7487] mt-1">Pico de consistência</p>
        </div>

      </div>

      {/* Modal de Vinculação com a Riot */}
      {showRiotModal && (
        <RiotAccountModal
          onSuccess={() => setShowRiotModal(false)}
          onClose={() => setShowRiotModal(false)}
        />
      )}

    </div>
  );
};
