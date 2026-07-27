import { store } from './store';
import type { TrainingSession, TrainingFocus } from '../types';

export const trainingService = {
  getActiveSession(playerProfileId: string): TrainingSession | undefined {
    this.checkAndAutoCloseExpiredSessions();

    return store.trainingSessions.find(
      ts => ts.tenantId === store.activeTenantId && 
            ts.playerProfileId === playerProfileId && 
            ts.status === 'ACTIVE'
    );
  },

  startSession(playerProfileId: string, playerName: string, initialFocuses: TrainingFocus[] = ['Mata-mata']): TrainingSession {
    const active = this.getActiveSession(playerProfileId);
    if (active) {
      throw new Error('Você já possui um treinamento em andamento! Finalize a sessão atual antes de iniciar outra.');
    }

    const newSession: TrainingSession = {
      id: `ts_${Date.now()}`,
      tenantId: store.activeTenantId,
      playerProfileId,
      playerName,
      startedAt: new Date().toISOString(),
      status: 'ACTIVE',
      focusAreas: initialFocuses
    };

    store.trainingSessions = [newSession, ...store.trainingSessions];
    store.logAudit(store.currentUserId, playerName, 'TREINO_INICIADO', `Iniciou treinamento individual`);
    store.saveToStorage();
    return newSession;
  },

  stopSession(playerProfileId: string, focusAreas?: TrainingFocus[], notes?: string): TrainingSession {
    const sessionIndex = store.trainingSessions.findIndex(
      ts => ts.tenantId === store.activeTenantId && 
            ts.playerProfileId === playerProfileId && 
            ts.status === 'ACTIVE'
    );

    if (sessionIndex === -1) {
      throw new Error('Nenhum treinamento em andamento foi encontrado.');
    }

    const session = store.trainingSessions[sessionIndex];
    const endedAt = new Date().toISOString();
    const startedMs = new Date(session.startedAt).getTime();
    const endedMs = new Date(endedAt).getTime();
    const durationMinutes = Math.max(1, Math.round((endedMs - startedMs) / 60000));

    const updatedSession: TrainingSession = {
      ...session,
      endedAt,
      durationMinutes,
      status: 'COMPLETED',
      focusAreas: focusAreas && focusAreas.length > 0 ? focusAreas : session.focusAreas,
      notes: notes || session.notes
    };

    store.trainingSessions[sessionIndex] = updatedSession;
    store.logAudit(store.currentUserId, session.playerName, 'TREINO_FINALIZADO', `Treinamento finalizado (${durationMinutes} min).`);
    store.saveToStorage();
    return updatedSession;
  },

  checkAndAutoCloseExpiredSessions() {
    const maxDurationMs = 4 * 3600 * 1000;
    const nowMs = Date.now();
    let updated = false;

    store.trainingSessions = store.trainingSessions.map(ts => {
      if (ts.status === 'ACTIVE') {
        const startMs = new Date(ts.startedAt).getTime();
        if (nowMs - startMs > maxDurationMs) {
          updated = true;
          const autoEndedAt = new Date(startMs + maxDurationMs).toISOString();
          return {
            ...ts,
            endedAt: autoEndedAt,
            durationMinutes: 240,
            status: 'AUTO_CLOSED',
            notes: 'Sessão encerrada automaticamente após atingir o limite máximo de 4 horas.'
          };
        }
      }
      return ts;
    });

    if (updated) {
      store.saveToStorage();
    }
  },

  getTrainingStats(playerProfileId?: string) {
    this.checkAndAutoCloseExpiredSessions();

    const tenantSessions = store.trainingSessions.filter(
      ts => ts.tenantId === store.activeTenantId && ts.status === 'COMPLETED'
    );

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())).getTime();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    const filterByPlayer = (sessions: TrainingSession[]) => 
      playerProfileId ? sessions.filter(s => s.playerProfileId === playerProfileId) : sessions;

    const todayMinutes = filterByPlayer(tenantSessions)
      .filter(s => new Date(s.startedAt).getTime() >= startOfToday)
      .reduce((acc, s) => acc + (s.durationMinutes || 0), 0);

    const weekMinutes = filterByPlayer(tenantSessions)
      .filter(s => new Date(s.startedAt).getTime() >= startOfWeek)
      .reduce((acc, s) => acc + (s.durationMinutes || 0), 0);

    const monthMinutes = filterByPlayer(tenantSessions)
      .filter(s => new Date(s.startedAt).getTime() >= startOfMonth)
      .reduce((acc, s) => acc + (s.durationMinutes || 0), 0);

    return {
      todayFormatted: this.formatMinutes(todayMinutes),
      weekFormatted: this.formatMinutes(weekMinutes),
      monthFormatted: this.formatMinutes(monthMinutes),
      todayMinutes,
      weekMinutes,
      monthMinutes
    };
  },

  getTeamRankingThisWeek() {
    this.checkAndAutoCloseExpiredSessions();
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())).getTime();

    const tenantSessions = store.trainingSessions.filter(
      ts => ts.tenantId === store.activeTenantId && 
            ts.status === 'COMPLETED' && 
            new Date(ts.startedAt).getTime() >= startOfWeek
    );

    const playerMap: Record<string, { name: string; minutes: number }> = {};

    const profiles = store.profiles.filter(p => p.tenantId === store.activeTenantId);
    profiles.forEach(p => {
      playerMap[p.id] = { name: p.nickname, minutes: 0 };
    });

    tenantSessions.forEach(s => {
      if (playerMap[s.playerProfileId]) {
        playerMap[s.playerProfileId].minutes += s.durationMinutes || 0;
      } else {
        playerMap[s.playerProfileId] = { name: s.playerName, minutes: s.durationMinutes || 0 };
      }
    });

    const ranking = Object.values(playerMap)
      .sort((a, b) => b.minutes - a.minutes)
      .map((item, idx) => ({
        position: idx + 1,
        playerName: item.name,
        minutes: item.minutes,
        formattedTime: this.formatMinutes(item.minutes)
      }));

    return ranking;
  },

  formatMinutes(totalMins: number): string {
    if (totalMins < 60) return `${totalMins}min`;
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    return mins > 0 ? `${hrs}h ${mins}min` : `${hrs}h`;
  }
};
