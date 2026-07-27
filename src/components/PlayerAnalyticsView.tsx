import React, { useState } from 'react';
import { store } from '../services/store';

export const PlayerAnalyticsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const currentUser = store.users.find(u => u.id === store.currentUserId) || store.users[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Header Section */}
      <section className="bg-white rounded-xl border border-[#ccc3d8] overflow-hidden shadow-xs">
        <div className="h-32 bg-gradient-to-r from-[#630ed4] to-[#7c3aed] relative" />
        
        <div className="px-8 pb-8 -mt-12 relative flex flex-col md:flex-row md:items-end gap-6">
          <div className="relative">
            <div className="h-32 w-32 rounded-2xl border-4 border-white overflow-hidden shadow-lg bg-[#eaddff] flex items-center justify-center font-extrabold text-4xl text-[#630ed4]">
              {currentUser.fullName.substring(0, 2).toUpperCase()}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 h-6 w-6 rounded-full border-4 border-white" title="Online" />
          </div>

          <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold text-[#1d1a24]">{currentUser.fullName}</h2>
                <span className="px-3 py-1 bg-[#f3ebfa] rounded-full text-xs font-bold text-[#630ed4]">
                  Pedro#BR1
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1 text-xs text-[#4a4455]">
                <span className="flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-sm">person</span> Jogador
                </span>
                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                  <span className="material-symbols-outlined text-sm text-emerald-600">verified</span> Ativo
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="btn-primary-stitch text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">edit</span>
                Editar Perfil
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

      {/* Metrics Grid (4 Cards) */}
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

      {/* Detailed Content Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Desempenho Recente (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#ccc3d8] overflow-hidden shadow-xs">
          <div className="px-6 py-5 border-b border-[#ccc3d8] flex justify-between items-center">
            <h3 className="text-base font-bold text-[#1d1a24]">Desempenho Recente</h3>
            <button className="text-[#630ed4] text-xs font-bold hover:underline">Ver tudo</button>
          </div>

          <div className="p-6 space-y-3">
            <div className="flex items-center gap-4 p-4 rounded-lg border border-[#ccc3d8] hover:bg-[#f9f1ff] transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#eaddff] flex items-center justify-center text-[#630ed4]">
                <span className="material-symbols-outlined">emoji_events</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-[#1d1a24]">Vitória em Ascent</h4>
                  <span className="text-emerald-700 font-bold text-sm">13 - 5</span>
                </div>
                <p className="text-xs text-[#4a4455] mt-0.5">MVP • 24/12/4 • Omen</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#7b7487]">Hoje</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg border border-[#ccc3d8] hover:bg-[#f9f1ff] transition-all">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-[#4a4455]">
                <span className="material-symbols-outlined">close</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-[#1d1a24]">Derrota em Bind</h4>
                  <span className="text-[#ba1a1a] font-bold text-sm">9 - 13</span>
                </div>
                <p className="text-xs text-[#4a4455] mt-0.5">18/19/2 • Raze</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#7b7487]">Ontem</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg border border-[#ccc3d8] hover:bg-[#f9f1ff] transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#eaddff] flex items-center justify-center text-[#630ed4]">
                <span className="material-symbols-outlined">emoji_events</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-[#1d1a24]">Vitória em Lotus</h4>
                  <span className="text-emerald-700 font-bold text-sm">13 - 11</span>
                </div>
                <p className="text-xs text-[#4a4455] mt-0.5">19/15/8 • Breach</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#7b7487]">2 dias atrás</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Agentes (1 col) */}
        <div className="bg-white rounded-xl border border-[#ccc3d8] overflow-hidden shadow-xs">
          <div className="px-6 py-5 border-b border-[#ccc3d8]">
            <h3 className="text-base font-bold text-[#1d1a24]">Top Agentes</h3>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <div className="flex justify-between text-xs font-bold text-[#1d1a24] mb-1">
                <span>Omen</span>
                <span className="text-[#630ed4]">72% Win Rate</span>
              </div>
              <div className="w-full bg-[#e8dfee] h-2 rounded-full overflow-hidden">
                <div className="bg-[#630ed4] h-full" style={{ width: '72%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#1d1a24] mb-1">
                <span>Raze</span>
                <span className="text-[#630ed4]">64% Win Rate</span>
              </div>
              <div className="w-full bg-[#e8dfee] h-2 rounded-full overflow-hidden">
                <div className="bg-[#630ed4] h-full" style={{ width: '64%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#1d1a24] mb-1">
                <span>Breach</span>
                <span className="text-[#630ed4]">58% Win Rate</span>
              </div>
              <div className="w-full bg-[#e8dfee] h-2 rounded-full overflow-hidden">
                <div className="bg-[#630ed4] h-full" style={{ width: '58%' }} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Training Stats Section */}
      <section className="bg-white rounded-xl border border-[#ccc3d8] p-6 shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-[#1d1a24]">Foco de Treinamento</h3>
            <p className="text-xs text-[#4a4455]">Metas de desempenho para a temporada atual.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-[#1d1a24]">
              <span>Headshot Accuracy</span>
              <span className="text-[#630ed4]">28.4%</span>
            </div>
            <div className="w-full bg-[#e8dfee] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#630ed4] h-full rounded-full" style={{ width: '85%' }} />
            </div>
            <p className="text-[11px] text-[#7b7487]">Meta do treinador: 30%</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-[#1d1a24]">
              <span>Reaction Time</span>
              <span className="text-[#630ed4]">185ms</span>
            </div>
            <div className="w-full bg-[#e8dfee] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#630ed4] h-full rounded-full" style={{ width: '92%' }} />
            </div>
            <p className="text-[11px] text-[#7b7487]">Top 1% elite bracket</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-[#1d1a24]">
              <span>Clutch Success</span>
              <span className="text-[#630ed4]">42%</span>
            </div>
            <div className="w-full bg-[#e8dfee] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#630ed4] h-full rounded-full" style={{ width: '65%' }} />
            </div>
            <p className="text-[11px] text-[#7b7487]">Melhoria de 5% desde mês passado</p>
          </div>
        </div>
      </section>

    </div>
  );
};
