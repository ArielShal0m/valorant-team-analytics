const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const apiClient = {
  async getAgents() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/game/agents`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      console.warn('⚠️ Servidor backend offline. Utilizando fallback local para Agentes.');
    }
    return null;
  },

  async getMaps() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/game/maps`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      console.warn('⚠️ Servidor backend offline. Utilizando fallback local para Mapas.');
    }
    return null;
  },

  async linkRiotAccount(tenantId: string, playerProfileId: string, gameName: string, tagLine: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/riot/account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantId, playerProfileId, gameName, tagLine })
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      console.warn('⚠️ Servidor backend offline. Utilizando resolução cliente local para Riot Account.');
    }
    return null;
  },

  async triggerSync(tenantId: string, playerProfileId: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/riot/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantId, playerProfileId })
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      console.warn('⚠️ Servidor backend offline. Utilizando simulador local de sincronização.');
    }
    return null;
  }
};
