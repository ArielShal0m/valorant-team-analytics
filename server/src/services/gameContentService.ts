import axios from 'axios';
import { supabaseAdmin } from './supabaseAdmin.js';

export interface AgentContent {
  id: string;
  name: string;
  displayName: string;
  role: string;
  iconUrl: string;
}

export interface MapContent {
  id: string;
  name: string;
  displayName: string;
  splashUrl: string;
}

export const gameContentService = {
  async getAgents(): Promise<AgentContent[]> {
    try {
      const res = await axios.get('https://valorant-api.com/v1/agents?language=pt-BR&isPlayableCharacter=true');
      if (res.data && Array.isArray(res.data.data)) {
        const agentsList: AgentContent[] = res.data.data.map((item: any) => ({
          id: item.uuid,
          name: item.developerName || item.displayName,
          displayName: item.displayName,
          role: item.role?.displayName || 'Desconhecido',
          iconUrl: item.displayIconSmall || item.displayIcon
        }));

        // Salvar em cache no Supabase de forma assíncrona
        this.cacheAgentsInSupabase(agentsList).catch(() => {});

        return agentsList;
      }
    } catch (e) {
      console.warn('⚠️ Falha ao buscar agentes da API oficial de conteúdo. Utilizando catálogo padrão.');
    }

    return [
      { id: 'omen', name: 'Omen', displayName: 'Omen', role: 'Controlador', iconUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100' },
      { id: 'raze', name: 'Raze', displayName: 'Raze', role: 'Duelista', iconUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100' },
      { id: 'breach', name: 'Breach', displayName: 'Breach', role: 'Iniciador', iconUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100' },
      { id: 'jett', name: 'Jett', displayName: 'Jett', role: 'Duelista', iconUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=100' }
    ];
  },

  async getMaps(): Promise<MapContent[]> {
    try {
      const res = await axios.get('https://valorant-api.com/v1/maps?language=pt-BR');
      if (res.data && Array.isArray(res.data.data)) {
        const mapsList: MapContent[] = res.data.data
          .filter((item: any) => item.displayName && item.splash)
          .map((item: any) => ({
            id: item.uuid,
            name: item.displayName,
            displayName: item.displayName,
            splashUrl: item.splash
          }));

        // Salvar em cache no Supabase de forma assíncrona
        this.cacheMapsInSupabase(mapsList).catch(() => {});

        return mapsList;
      }
    } catch (e) {
      console.warn('⚠️ Falha ao buscar mapas da API oficial de conteúdo. Utilizando catálogo padrão.');
    }

    return [
      { id: 'ascent', name: 'Ascent', displayName: 'Ascent', splashUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600' },
      { id: 'bind', name: 'Bind', displayName: 'Bind', splashUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600' },
      { id: 'haven', name: 'Haven', displayName: 'Haven', splashUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600' },
      { id: 'icebox', name: 'Icebox', displayName: 'Icebox', splashUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600' },
      { id: 'lotus', name: 'Lotus', displayName: 'Lotus', splashUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600' }
    ];
  },

  async cacheAgentsInSupabase(agents: AgentContent[]) {
    try {
      const records = agents.map(a => ({
        id: a.id,
        name: a.name,
        display_name: a.displayName,
        role: a.role,
        icon_url: a.iconUrl,
        updated_at: new Date().toISOString()
      }));

      await supabaseAdmin.from('agents').upsert(records, { onConflict: 'id' });
    } catch (e) {
      // Ignora erro se Supabase ainda não estiver conectado em produção
    }
  },

  async cacheMapsInSupabase(maps: MapContent[]) {
    try {
      const records = maps.map(m => ({
        id: m.id,
        name: m.name,
        display_name: m.displayName,
        splash_url: m.splashUrl,
        updated_at: new Date().toISOString()
      }));

      await supabaseAdmin.from('maps').upsert(records, { onConflict: 'id' });
    } catch (e) {
      // Ignora erro se Supabase ainda não estiver conectado em produção
    }
  }
};
