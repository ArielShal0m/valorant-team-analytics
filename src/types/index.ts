export type UserRole = 'ORGANIZER' | 'COACH' | 'PLAYER';
export type InviteStatus = 'PENDING' | 'ACCEPTED' | 'REVOKED' | 'EXPIRED';
export type TrainingStatus = 'ACTIVE' | 'COMPLETED' | 'AUTO_CLOSED' | 'DISCARDED';
export type InsightSeverity = 'CRITICAL' | 'WARNING' | 'POSITIVE';
export type Side = 'ATTACK' | 'DEFENSE';
export type RoundType = 'PISTOL' | 'ECO' | 'SEMI_ECO' | 'BONUS' | 'FULL_BUY';

export type TrainingFocus = 
  | 'Mata-mata'
  | 'Mira'
  | 'Movimentação'
  | 'Posicionamento'
  | 'Lineups'
  | 'Comunicação'
  | 'Tática'
  | 'Outro';

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logoEmoji: string;
  createdAt: string;
  primaryColor: string;
}

export interface TeamMember {
  id: string;
  tenantId: string;
  userId: string;
  user: User;
  role: UserRole;
  joinedAt: string;
}

export interface Invite {
  id: string;
  tenantId: string;
  token: string;
  role: UserRole;
  expiresAt: string;
  status: InviteStatus;
  createdByUserId: string;
  createdAt: string;
}

export interface PlayerProfile {
  id: string;
  tenantId: string;
  teamMemberId: string;
  nickname: string;
  primaryAgent: string;
  riotAccount?: RiotAccount;
}

export interface RiotAccount {
  id: string;
  playerProfileId: string;
  gameName: string;
  tagLine: string;
  puuid: string;
  verifiedAt: string;
}

export interface Match {
  id: string;
  tenantId: string;
  riotMatchId: string;
  mapName: string;
  durationSeconds: number;
  mode: string;
  isWin: boolean;
  scoreTeam: number;
  scoreOpponent: number;
  playedAt: string;
  players: MatchPlayer[];
  rounds: Round[];
}

export interface MatchPlayer {
  id: string;
  matchId: string;
  playerProfileId: string;
  playerName: string;
  agentPlayed: string;
  kills: number;
  deaths: number;
  assists: number;
  acs: number;
  kastPercentage: number;
  firstKills: number;
  firstDeaths: number;
}

export interface Round {
  id: string;
  matchId: string;
  roundNumber: number;
  side: Side;
  roundType: RoundType;
  won: boolean;
  teamLoadoutValue: number;
  opponentLoadoutValue: number;
  hadMultiPlayerAdvantage: boolean;
  lostWithPlayerAdvantage: boolean;
}

export interface TrainingSession {
  id: string;
  tenantId: string;
  playerProfileId: string;
  playerName: string;
  startedAt: string;
  endedAt?: string;
  durationMinutes?: number;
  status: TrainingStatus;
  focusAreas: TrainingFocus[];
  notes?: string;
}

export interface Insight {
  id: string;
  tenantId: string;
  severity: InsightSeverity;
  category: string;
  title: string;
  description: string;
  recommendedAction: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  tenantId: string;
  actorUserId: string;
  actorName: string;
  action: string;
  details: string;
  createdAt: string;
}
