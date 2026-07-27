import React from 'react';
import { store } from '../services/store';

interface TeamDashboardViewProps {
  onNavigateTab: (tab: string) => void;
  onRefreshState: () => void;
}

export const TeamDashboardView: React.FC<TeamDashboardViewProps> = ({ onNavigateTab }) => {
  const currentUser = store.users.find(u => u.id === store.currentUserId) || store.users[0];
  const activeTenant = store.tenants.find(t => t.id === store.activeTenantId) || store.tenants[0];

  const tenantMatches = store.matches.filter(m => m.tenantId === store.activeTenantId);
  const tenantInsights = store.insights.filter(i => i.tenantId === store.activeTenantId);
  const tenantMembers = store.members.filter(m => m.tenantId === store.activeTenantId);

  const totalMatchesCount = tenantMatches.length;
  const winsCount = tenantMatches.filter(m => m.isWin).length;
  const winRate = totalMatchesCount > 0 ? Math.round((winsCount / totalMatchesCount) * 100) : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Section */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-3xl font-semibold text-[#1d1a24] tracking-tight">
            Olá, {currentUser.fullName.split(' ')[0]}.
          </h3>
          <p className="text-base text-[#4a4455] opacity-80 mt-1">
            Painel da equipe <strong className="text-[#630ed4]">{activeTenant?.name || 'Sua Equipe'}</strong>.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('jogadores')}
          className="btn-primary-stitch text-xs flex items-center gap-2 self-start sm:self-auto shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          + Adicionar jogador
        </button>
      </section>

      {/* Banner de Estado Zerado para Nova Equipe */}
      {totalMatchesCount === 0 && (
        <section className="bg-white border border-[#ccc3d8] rounded-xl p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-[#f3ebfa] text-[#630ed4] text-xs font-bold rounded-full uppercase tracking-wider">
              Equipe Recém-Criada
            </span>
            <h4 className="text-xl font-bold text-[#1d1a24]">Sua equipe está pronta para começar!</h4>
            <p className="text-xs text-[#4a4455] max-w-xl leading-relaxed">
              Você é o Administrador da equipe <strong className="text-[#1d1a24]">{activeTenant?.name}</strong>. Adicione os jogadores do seu time, vincule as contas da Riot e sincronize as primeiras partidas para gerar os gráficos de análise automatizada.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('jogadores')}
            className="btn-primary-stitch text-xs px-6 py-3 whitespace-nowrap"
          >
            Convidar Jogadores Agora
          </button>
        </section>
      )}

      {/* Section 1: Indicators (Grid com 4 Indicadores) */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Win Rate */}
        <div className="p-6 border border-[#ccc3d8] bg-white rounded-xl hover:border-[#630ed4] transition-all shadow-xs">
          <p className="text-xs font-semibold text-[#4a4455] uppercase tracking-wider mb-1">Taxa de vitória</p>
          <p className="text-3xl font-bold text-[#630ed4]">{winRate}%</p>
          <div className="h-1.5 w-full bg-[#e8dfee] mt-3 overflow-hidden rounded-full">
            <div className="h-full bg-[#630ed4]" style={{ width: `${winRate}%` }}></div>
          </div>
        </div>

        {/* Pistol Round */}
        <div className="p-6 border border-[#ccc3d8] bg-white rounded-xl hover:border-[#630ed4] transition-all shadow-xs">
          <p className="text-xs font-semibold text-[#4a4455] uppercase tracking-wider mb-1">Rounds de Pistol</p>
          <p className="text-3xl font-bold text-[#1d1a24]">{totalMatchesCount > 0 ? '52%' : '0%'}</p>
          <div className="h-1.5 w-full bg-[#e8dfee] mt-3 overflow-hidden rounded-full">
            <div className="h-full bg-[#5d5d67]" style={{ width: totalMatchesCount > 0 ? '52%' : '0%' }}></div>
          </div>
        </div>

        {/* Attack Efficiency */}
        <div className="p-6 border border-[#ccc3d8] bg-white rounded-xl hover:border-[#630ed4] transition-all shadow-xs">
          <p className="text-xs font-semibold text-[#4a4455] uppercase tracking-wider mb-1">Eficiência de Ataque</p>
          <p className="text-3xl font-bold text-[#1d1a24]">{totalMatchesCount > 0 ? '55%' : '0%'}</p>
          <div className="h-1.5 w-full bg-[#e8dfee] mt-3 overflow-hidden rounded-full">
            <div className="h-full bg-[#5d5d67]" style={{ width: totalMatchesCount > 0 ? '55%' : '0%' }}></div>
          </div>
        </div>

        {/* Defense Stability */}
        <div className="p-6 border border-[#ccc3d8] bg-white rounded-xl hover:border-[#630ed4] transition-all shadow-xs">
          <p className="text-xs font-semibold text-[#4a4455] uppercase tracking-wider mb-1">Estabilidade Defensiva</p>
          <p className="text-3xl font-bold text-[#1d1a24]">{totalMatchesCount > 0 ? '60%' : '0%'}</p>
          <div className="h-1.5 w-full bg-[#e8dfee] mt-3 overflow-hidden rounded-full">
            <div className="h-full bg-[#5d5d67]" style={{ width: totalMatchesCount > 0 ? '60%' : '0%' }}></div>
          </div>
        </div>

      </section>

      {/* Main Dashboard Layout (Bento Grid Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Section 2: Performance Graph (8 cols) */}
        <div className="lg:col-span-8 p-6 bg-white border border-[#ccc3d8] rounded-xl shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-semibold text-[#1d1a24]">Tendência de Desempenho</h4>
            <span className="px-3 py-1 rounded-full bg-[#7c3aed] text-[#ede0ff] text-xs font-medium">
              Últimos 30 dias
            </span>
          </div>

          {/* Gráfico SVG Curvo */}
          <div className="h-[280px] w-full relative flex items-end justify-between pt-4">
            {totalMatchesCount > 0 ? (
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 280">
                <path d="M0,230 Q100,220 200,190 T400,160 T600,120 T800,80" fill="none" stroke="#7c3aed" strokeWidth="3.5" />
                <path d="M0,230 Q100,220 200,190 T400,160 T600,120 T800,80 V280 H0 Z" fill="url(#grad1)" opacity="0.12" />
                <defs>
                  <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
              </svg>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-[#7b7487] text-xs font-semibold italic">
                Nenhuma partida registrada ainda para traçar a tendência.
              </div>
            )}

            {/* Marcadores de Semanas */}
            <div className="absolute bottom-0 w-full flex justify-between px-2 pt-2 text-xs text-[#7b7487] border-t border-[#ccc3d8]">
              <span>Semana 1</span>
              <span>Semana 2</span>
              <span>Semana 3</span>
              <span>Semana 4</span>
            </div>
          </div>
        </div>

        {/* Section 5: Key Insights (4 cols) */}
        <div className="lg:col-span-4 p-6 bg-white border border-[#ccc3d8] rounded-xl flex flex-col justify-between shadow-xs">
          <div>
            <h4 className="text-lg font-semibold text-[#1d1a24] mb-6">Análises Relevantes</h4>
            <div className="space-y-4">
              
              {tenantInsights.length > 0 ? (
                tenantInsights.map(ins => (
                  <div key={ins.id} className="flex items-start gap-3 p-3.5 rounded-lg bg-[#f9f1ff] border border-[#e8dfee]">
                    <span className="material-symbols-outlined text-[#ba1a1a] mt-0.5">trending_down</span>
                    <div>
                      <p className="text-xs font-semibold text-[#1d1a24]">{ins.title}</p>
                      <p className="text-[11px] text-[#4a4455] mt-0.5">{ins.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-lg bg-[#f9f1ff] border border-[#e8dfee] text-center space-y-2">
                  <span className="material-symbols-outlined text-[#630ed4] text-[32px]">auto_awesome</span>
                  <p className="text-xs font-bold text-[#1d1a24]">Sem alertas críticos</p>
                  <p className="text-[11px] text-[#4a4455]">
                    Adicione partidas para a IA gerar os diagnósticos de melhoria do time.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Section 3: Last Matches (6 cols) */}
        <div className="lg:col-span-6 p-6 bg-white border border-[#ccc3d8] rounded-xl shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-semibold text-[#1d1a24]">Últimas Partidas</h4>
            {totalMatchesCount > 0 && (
              <button
                onClick={() => onNavigateTab('partidas')}
                className="text-[#630ed4] text-xs font-bold hover:underline"
              >
                Ver histórico
              </button>
            )}
          </div>

          <div className="space-y-3">
            {tenantMatches.length > 0 ? (
              tenantMatches.slice(0, 3).map(m => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-3.5 hover:bg-[#f9f1ff] transition-colors rounded-lg border border-[#e8dfee]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#e3e1ed] flex items-center justify-center font-bold text-[#630ed4] text-sm">
                      {m.mapName.substring(0, 1)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1d1a24]">{m.mapName}</p>
                      <p className="text-[10px] text-[#7b7487]">{m.mode} • {m.playedAt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-extrabold text-[#1d1a24]">{m.scoreTeam} x {m.scoreOpponent}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                        m.isWin
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {m.isWin ? 'Vitória' : 'Derrota'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#7b7487] italic p-4 text-center">Nenhuma partida disputada ainda.</p>
            )}
          </div>
        </div>

        {/* Section 4: Weekly Training (6 cols) */}
        <div className="lg:col-span-6 p-6 bg-white border border-[#ccc3d8] rounded-xl shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-semibold text-[#1d1a24]">Membros da Equipe</h4>
            <span className="text-[#7b7487] text-xs font-semibold">Total: {tenantMembers.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tenantMembers.map(m => (
              <div key={m.id} className="flex items-center gap-3 p-3 border border-[#e8dfee] rounded-lg hover:bg-[#f9f1ff] transition-all">
                <div className="w-9 h-9 rounded-full bg-[#630ed4] text-white flex items-center justify-center font-bold text-xs">
                  {m.user.fullName.substring(0, 1)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#1d1a24] truncate">{m.user.fullName}</p>
                  <p className="text-[10px] text-[#630ed4] font-semibold">
                    {m.role === 'ORGANIZER' ? 'Team Captain (Admin)' : m.role === 'COACH' ? 'Coach' : 'Pro Player'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
