import React, { useState } from 'react';
import { store } from '../services/store';

export const InsightsView: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const tenantInsights = store.insights.filter(i => i.tenantId === store.activeTenantId);

  const defaultInsights = [
    {
      id: 'ins_1',
      severity: 'CRITICAL',
      category: 'Rounds de Pistol',
      title: 'Baixo aproveitamento nos Pistol Rounds',
      description: 'Nas últimas 10 partidas, a equipe venceu apenas 31% dos pistol rounds.',
      recommendedAction: 'Treinar execuções lentas de pistol no Ataque com utilitários de fumaça e recoleta.'
    },
    {
      id: 'ins_2',
      severity: 'WARNING',
      category: 'Ataque em Ascent',
      title: 'Queda no desempenho de Ataque na Ascent',
      description: 'Seu desempenho no ataque da Ascent caiu 12% em relação às partidas anteriores.',
      recommendedAction: 'Revisar a tomada de espaço do A Main antes da entrada do grupo no bomb site.'
    },
    {
      id: 'ins_3',
      severity: 'POSITIVE',
      category: 'First Kills',
      title: 'Alta conversão após First Kill',
      description: 'Quando a equipe abre a primeira eliminação do round, conquista a vitória em 76% das vezes.',
      recommendedAction: 'Manter a agressividade inicial suportada por utilitários de avanço.'
    },
    {
      id: 'ins_4',
      severity: 'CRITICAL',
      category: 'Rounds em Vantagem',
      title: 'Desperdício de Vantagem Numérica (5v3 / 4v2)',
      description: 'O time perdeu 14 rounds nas últimas 20 partidas após abrir vantagem de dois jogadores.',
      recommendedAction: 'Protocolo estrito de pós-plant: proibir duelos individuais isolados sem troca.'
    },
    {
      id: 'ins_5',
      severity: 'WARNING',
      category: 'Desempenho por Mapa',
      title: 'Sunset possui a menor taxa de vitória da lineup',
      description: 'Sunset possui a menor taxa de vitória da equipe nos últimos 30 dias: 32%.',
      recommendedAction: 'Agendar sessão de VOD Review específica de Sunset com a comissão técnica.'
    },
    {
      id: 'ins_6',
      severity: 'WARNING',
      category: 'Treinamento Individual',
      title: 'Variação na frequência de treinos de Mira',
      description: 'Houve uma queda de 25% na média de horas de treino individual de mira em relação à semana passada.',
      recommendedAction: 'Acompanhar a rotina de aquecimento no Aim Lab antes do treino coletivo.'
    }
  ];

  const displayList = (tenantInsights.length > 0 ? tenantInsights : defaultInsights).filter(item => {
    if (filter === 'ALL') return true;
    return item.severity === filter;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1d1a24] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#630ed4] text-[28px]">analytics</span>
            Análises e Diagnósticos
          </h2>
          <p className="text-xs text-[#4a4455] mt-0.5">
            Diagnóstico estatístico automatizado para identificação imediata de gargalos competitivos
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 bg-white p-1 rounded-lg border border-[#ccc3d8] shadow-xs">
          {[
            { id: 'ALL', label: 'Todos' },
            { id: 'CRITICAL', label: 'Críticos' },
            { id: 'WARNING', label: 'Alertas' },
            { id: 'POSITIVE', label: 'Positivos' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                filter === f.id
                  ? 'bg-[#630ed4] text-white'
                  : 'text-[#4a4455] hover:text-[#1d1a24] hover:bg-[#f9f1ff]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Cards de Análise */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayList.map(item => {
          const isCritical = item.severity === 'CRITICAL';
          const isWarning = item.severity === 'WARNING';

          return (
            <div
              key={item.id}
              className={`bg-white border rounded-xl p-6 space-y-4 shadow-xs hover:border-[#630ed4] transition-all ${
                isCritical
                  ? 'border-rose-200 border-l-4 border-l-[#ba1a1a]'
                  : isWarning
                  ? 'border-amber-200 border-l-4 border-l-amber-600'
                  : 'border-emerald-200 border-l-4 border-l-emerald-600'
              }`}
            >
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-[#f3ebfa] text-[#630ed4] text-[10px] font-bold uppercase tracking-wider">
                  {item.category}
                </span>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 ${
                    isCritical
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : isWarning
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {isCritical ? 'trending_down' : isWarning ? 'warning' : 'trending_up'}
                  </span>
                  {isCritical ? 'Crítico' : isWarning ? 'Alerta' : 'Positivo'}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-bold text-[#1d1a24]">{item.title}</h3>
                <p className="text-xs text-[#4a4455] leading-relaxed mt-1">{item.description}</p>
              </div>

              {/* Recommended Action Box */}
              <div className="p-3.5 rounded-lg bg-[#f9f1ff] border border-[#e8dfee] flex items-start gap-2.5 text-xs text-[#630ed4]">
                <span className="material-symbols-outlined text-[18px] text-[#630ed4] mt-0.5 flex-shrink-0">bolt</span>
                <div>
                  <span className="font-bold block text-[#1d1a24]">Ação Recomendada:</span>
                  <span className="text-[#4a4455] leading-snug block mt-0.5">{item.recommendedAction}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
