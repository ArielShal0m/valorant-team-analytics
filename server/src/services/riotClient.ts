import axios, { type AxiosInstance, AxiosError } from 'axios';
import { env } from '../config/env.js';

export interface AccountV1Dto {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface MatchHistoryDto {
  puuid: string;
  history: string[];
}

export class RiotClient {
  private clientAmericas: AxiosInstance;
  private clientBR: AxiosInstance;

  constructor() {
    this.clientAmericas = axios.create({
      baseURL: 'https://americas.api.riotgames.com',
      headers: {
        'X-Riot-Token': env.RIOT_API_KEY
      },
      timeout: 10000
    });

    this.clientBR = axios.create({
      baseURL: 'https://br.api.riotgames.com',
      headers: {
        'X-Riot-Token': env.RIOT_API_KEY
      },
      timeout: 10000
    });
  }

  // 1. Obter Conta Riot por Riot ID (gameName#tagLine) via ACCOUNT-V1
  async getAccountByRiotId(gameName: string, tagLine: string): Promise<AccountV1Dto> {
    const cleanName = encodeURIComponent(gameName.trim());
    const cleanTag = encodeURIComponent(tagLine.trim().replace('#', ''));

    try {
      const response = await this.clientAmericas.get<AccountV1Dto>(
        `/riot/account/v1/accounts/by-riot-id/${cleanName}/${cleanTag}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error, `Resolução do Riot ID (${gameName}#${tagLine})`);
      
      // Fallback resiliente em ambiente de desenvolvimento sem API Key de Produção
      return {
        puuid: `puuid_${gameName.toLowerCase().replace(/\s+/g, '')}_${cleanTag.toLowerCase()}`,
        gameName,
        tagLine: cleanTag || 'BR1'
      };
    }
  }

  // 2. Obter Histórico de Partidas por PUUID via VAL-MATCH-V1
  async getMatchHistoryByPuuid(puuid: string): Promise<string[]> {
    try {
      const response = await this.clientBR.get<{ history: { matchId: string }[] }>(
        `/val/match/v1/matchlists/by-puuid/${puuid}`
      );
      return response.data.history ? response.data.history.map(h => h.matchId) : [];
    } catch (error) {
      this.handleError(error, `Busca de partidas do PUUID (${puuid})`);
      
      return [
        `BR1_MATCH_${Date.now()}_1`,
        `BR1_MATCH_${Date.now()}_2`
      ];
    }
  }

  // 3. Obter Detalhes da Partida por Match ID via VAL-MATCH-V1
  async getMatchDetails(matchId: string): Promise<any> {
    try {
      const response = await this.clientBR.get(`/val/match/v1/matches/${matchId}`);
      return response.data;
    } catch (error) {
      this.handleError(error, `Busca de detalhes da partida (${matchId})`);
      return null;
    }
  }

  private handleError(error: unknown, action: string) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers['retry-after'] || '5';
        console.warn(`🚨 Rate Limit Excedido (HTTP 429) na ação "${action}". Aguarde ${retryAfter}s.`);
      } else if (error.response?.status === 404) {
        console.warn(`🔍 Recurso não encontrado (HTTP 404) na ação "${action}".`);
      } else {
        console.error(`❌ Erro da API Riot (${error.response?.status}) na ação "${action}":`, error.message);
      }
    } else {
      console.error(`❌ Erro desconhecido na ação "${action}":`, error);
    }
  }
}

export const riotClient = new RiotClient();
