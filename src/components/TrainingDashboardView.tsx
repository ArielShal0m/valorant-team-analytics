import React, { useState, useEffect } from 'react';
import { store } from '../services/store';
import { trainingService } from '../services/trainingService';
import type { TrainingFocus } from '../types';
import confetti from 'canvas-confetti';

interface TrainingDashboardViewProps {
  onRefreshState: () => void;
}

const CHECKBOX_ITEMS: { id: TrainingFocus; label: string; icon: string }[] = [
  { id: 'Mata-mata', label: 'Deathmatch', icon: 'target' },
  { id: 'Mira', label: 'Aim', icon: 'ads_click' },
  { id: 'Movimentação', label: 'Movement', icon: 'directions_run' },
  { id: 'Posicionamento', label: 'Positioning', icon: 'location_on' },
  { id: 'Lineups', label: 'Lineups', icon: 'lan' },
  { id: 'Comunicação', label: 'Communication', icon: 'record_voice_over' },
  { id: 'Tática', label: 'Tactics', icon: 'map' },
  { id: 'Outro', label: 'Other', icon: 'more_horiz' }
];

export const TrainingDashboardView: React.FC<TrainingDashboardViewProps> = ({ onRefreshState }) => {
  const currentProfile = store.profiles.find(p => p.tenantId === store.activeTenantId) || store.profiles[0];
  const activeSession = currentProfile ? trainingService.getActiveSession(currentProfile.id) : undefined;
  
  const [seconds, setSeconds] = useState(0);
  const [selectedFocuses, setSelectedFocuses] = useState<TrainingFocus[]>(['Mata-mata', 'Mira']);

  useEffect(() => {
    let interval: any = null;
    if (activeSession) {
      const startMs = new Date(activeSession.startedAt).getTime();
      const calculateSeconds = () => {
        const diffMs = Date.now() - startMs;
        setSeconds(Math.max(0, Math.floor(diffMs / 1000)));
      };
      calculateSeconds();
      interval = setInterval(calculateSeconds, 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [activeSession]);

  const toggleFocus = (focus: TrainingFocus) => {
    if (selectedFocuses.includes(focus)) {
      if (selectedFocuses.length > 1) {
        setSelectedFocuses(selectedFocuses.filter(f => f !== focus));
      }
    } else {
      setSelectedFocuses([...selectedFocuses, focus]);
    }
  };

  const handleStart = () => {
    if (!currentProfile) return;
    try {
      trainingService.startSession(currentProfile.id, currentProfile.nickname, selectedFocuses);
      onRefreshState();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleStop = () => {
    if (!currentProfile) return;
    try {
      trainingService.stopSession(currentProfile.id, selectedFocuses);
      onRefreshState();
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (err) {}
    } catch (e: any) {
      alert(e.message);
    }
  };

  const formatTimeDisplay = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${remMins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatStartTime = (isoDate?: string) => {
    if (!isoDate) return '18:42';
    const date = new Date(isoDate);
    const hrs = date.getHours().toString().padStart(2, '0');
    const mins = date.getMinutes().toString().padStart(2, '0');
    return `${hrs}:${mins}`;
  };

  const tenantLogs = store.trainingSessions.filter(ts => ts.tenantId === store.activeTenantId && ts.status === 'COMPLETED');

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Session / Timer + What did you train? */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Active Timer Box */}
          <div className="bg-white border border-[#ccc3d8] rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-xs">
            <div className="z-10 flex flex-col items-center text-center">
              <span className="px-3 py-1 bg-[#7c3aed] text-[#ede0ff] font-semibold text-xs rounded-full mb-4 uppercase tracking-wider">
                {activeSession ? 'SESSÃO EM CURSO' : 'PRONTO PARA TREINAR'}
              </span>
              
              <h3 className="text-5xl font-extrabold text-[#1d1a24] font-mono tracking-tighter mb-1">
                {activeSession ? formatTimeDisplay(seconds) : '00:00:00'}
              </h3>
              
              <p className="text-sm text-[#4a4455]">
                Iniciado às <span className="font-semibold text-[#1d1a24]">{formatStartTime(activeSession?.startedAt)}</span>
              </p>

              <div className="mt-6 flex gap-4">
                {activeSession ? (
                  <button
                    onClick={handleStop}
                    className="px-8 py-3 bg-[#630ed4] text-white font-bold text-sm rounded-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[20px]">stop_circle</span>
                    Finalizar treinamento
                  </button>
                ) : (
                  <button
                    onClick={handleStart}
                    className="px-8 py-3 bg-[#630ed4] text-white font-bold text-sm rounded-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[20px]">play_circle</span>
                    Iniciar treinamento
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* What did you train? Section */}
          <div className="bg-white border border-[#ccc3d8] rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-[#1d1a24]">O que você treinou?</h4>
              <span className="text-xs text-[#7b7487] italic">Selecione todos que se aplicam</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {CHECKBOX_ITEMS.map((item) => {
                const isChecked = selectedFocuses.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleFocus(item.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border text-center transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-[#f9f1ff] border-[#630ed4] text-[#630ed4]'
                        : 'bg-white border-[#ccc3d8] text-[#4a4455] hover:border-[#630ed4]'
                    }`}
                  >
                    <span className={`material-symbols-outlined mb-2 text-[24px] ${isChecked ? 'text-[#630ed4]' : 'text-[#7b7487]'}`}>
                      {item.icon}
                    </span>
                    <span className="text-xs font-semibold">{item.label}</span>
                    <div className={`w-2 h-2 rounded-full mt-2 transition-all ${isChecked ? 'bg-[#630ed4]' : 'bg-transparent'}`} />
                  </button>
                );
              })}
            </div>
          </div>

        </section>

        {/* Right Column: History & Insights */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Action Box */}
          {!activeSession && (
            <div className="bg-[#f3ebfa] border border-[#ccc3d8] rounded-xl p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#630ed4] text-white rounded-full flex items-center justify-center mb-3 shadow-md">
                <span className="material-symbols-outlined text-[32px]">play_arrow</span>
              </div>
              <h3 className="text-base font-bold text-[#1d1a24] mb-1">Iniciar nova sessão?</h3>
              <p className="text-xs text-[#4a4455] mb-4">Mantenha a consistência para subir de elo.</p>
              <button
                onClick={handleStart}
                className="w-full py-2.5 bg-white border border-[#630ed4] text-[#630ed4] font-bold text-xs rounded-lg hover:bg-[#eaddff] transition-all"
              >
                Iniciar treinamento
              </button>
            </div>
          )}

          {/* History Box */}
          <div className="bg-white border border-[#ccc3d8] rounded-xl overflow-hidden shadow-xs flex flex-col">
            <div className="flex border-b border-[#ccc3d8]">
              <button className="flex-1 py-3 text-xs font-bold text-[#630ed4] border-b-2 border-[#630ed4]">
                Histórico de Treinos
              </button>
            </div>

            <div className="p-5 flex flex-col gap-3">
              {tenantLogs.length === 0 ? (
                <p className="text-xs text-[#7b7487] italic text-center p-4">Nenhum treino concluído ainda.</p>
              ) : (
                tenantLogs.slice(0, 3).map(log => (
                  <div key={log.id} className="flex items-center gap-3 p-3 hover:bg-[#f9f1ff] rounded-lg transition-colors border border-[#e8dfee]">
                    <div className="w-9 h-9 bg-[#e3e1ed] rounded-lg flex items-center justify-center text-[#630ed4]">
                      <span className="material-symbols-outlined text-[20px]">history</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#1d1a24] truncate">{log.playerName}</p>
                      <p className="text-[10px] text-[#7b7487]">
                        {(log.focusAreas || ['Mata-mata']).join(', ')} • {log.durationMinutes || 45}m
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Dica do Dia Quote Box */}
          <div className="bg-gradient-to-br from-[#630ed4] to-[#7c3aed] p-6 rounded-xl text-white shadow-xs space-y-2">
            <span className="material-symbols-outlined opacity-70">lightbulb</span>
            <p className="text-xs font-medium leading-relaxed italic opacity-95">
              "A excelência não é um ato, mas um hábito. O treinamento de posicionamento no Ascent reduz suas mortes em 15%."
            </p>
            <p className="text-[10px] font-bold opacity-80 pt-1">— Análise OPS AI</p>
          </div>

        </section>

      </div>

    </div>
  );
};
