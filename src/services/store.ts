import type { Tenant, User, TeamMember, Invite, PlayerProfile, Match, TrainingSession, Insight, AuditLog } from '../types';

const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'tenant_alpha_vct',
    name: 'Equipe Alpha Esports',
    slug: 'alpha-esports',
    logoEmoji: 'sports_esports',
    primaryColor: '#630ed4',
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'tenant_beta_challengers',
    name: 'Equipe Beta Academy',
    slug: 'beta-academy',
    logoEmoji: 'shield',
    primaryColor: '#2563EB',
    createdAt: '2026-02-01T14:30:00Z'
  }
];

const INITIAL_USERS: User[] = [
  {
    id: 'usr_org_1',
    email: 'organizador@alpha.gg',
    fullName: 'Felipe Silva',
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'usr_player_1',
    email: 'pedro@alpha.gg',
    fullName: 'Pedro Santos',
    createdAt: '2026-01-11T12:00:00Z'
  },
  {
    id: 'usr_player_2',
    email: 'lucas@alpha.gg',
    fullName: 'Lucas Lima',
    createdAt: '2026-01-12T14:00:00Z'
  },
  {
    id: 'usr_coach_1',
    email: 'coach@alpha.gg',
    fullName: 'Matheus Oliveira',
    createdAt: '2026-01-13T09:00:00Z'
  }
];

const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: 'tm_1',
    tenantId: 'tenant_alpha_vct',
    userId: 'usr_org_1',
    user: INITIAL_USERS[0],
    role: 'ORGANIZER',
    joinedAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'tm_2',
    tenantId: 'tenant_alpha_vct',
    userId: 'usr_player_1',
    user: INITIAL_USERS[1],
    role: 'PLAYER',
    joinedAt: '2026-01-11T12:00:00Z'
  },
  {
    id: 'tm_3',
    tenantId: 'tenant_alpha_vct',
    userId: 'usr_player_2',
    user: INITIAL_USERS[2],
    role: 'PLAYER',
    joinedAt: '2026-01-12T14:00:00Z'
  },
  {
    id: 'tm_4',
    tenantId: 'tenant_alpha_vct',
    userId: 'usr_coach_1',
    user: INITIAL_USERS[3],
    role: 'COACH',
    joinedAt: '2026-01-13T09:00:00Z'
  }
];

const INITIAL_PROFILES: PlayerProfile[] = [
  {
    id: 'prof_1',
    tenantId: 'tenant_alpha_vct',
    teamMemberId: 'tm_2',
    nickname: 'Pedro',
    primaryAgent: 'Omen',
    riotAccount: {
      id: 'riot_1',
      playerProfileId: 'prof_1',
      gameName: 'Pedro',
      tagLine: 'BR1',
      puuid: 'puuid_p1_brazil_123',
      verifiedAt: '2026-01-11T13:00:00Z'
    }
  },
  {
    id: 'prof_2',
    tenantId: 'tenant_alpha_vct',
    teamMemberId: 'tm_3',
    nickname: 'Lucas',
    primaryAgent: 'Jett',
    riotAccount: {
      id: 'riot_2',
      playerProfileId: 'prof_2',
      gameName: 'Lucas',
      tagLine: 'BR1',
      puuid: 'puuid_p2_brazil_456',
      verifiedAt: '2026-01-12T15:00:00Z'
    }
  }
];

const INITIAL_INVITES: Invite[] = [
  {
    id: 'inv_1',
    tenantId: 'tenant_alpha_vct',
    token: 'HD72KS',
    role: 'PLAYER',
    expiresAt: '2026-12-31T23:59:59Z',
    status: 'PENDING',
    createdByUserId: 'usr_org_1',
    createdAt: '2026-01-15T10:00:00Z'
  }
];

const INITIAL_TRAINING_SESSIONS: TrainingSession[] = [
  {
    id: 'ts_1',
    tenantId: 'tenant_alpha_vct',
    playerProfileId: 'prof_1',
    playerName: 'Pedro',
    startedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    endedAt: new Date(Date.now() - 3600000 * 0.5).toISOString(),
    durationMinutes: 90,
    status: 'COMPLETED',
    focusAreas: ['Mata-mata', 'Mira', 'Movimentação'],
    notes: 'Treino individual de aquecimento e controle de mira.'
  },
  {
    id: 'ts_2',
    tenantId: 'tenant_alpha_vct',
    playerProfileId: 'prof_2',
    playerName: 'Lucas',
    startedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    endedAt: new Date(Date.now() - 3600000 * 4.25).toISOString(),
    durationMinutes: 45,
    status: 'COMPLETED',
    focusAreas: ['Mata-mata', 'Posicionamento']
  }
];

const INITIAL_MATCHES: Match[] = [
  {
    id: 'm_1',
    tenantId: 'tenant_alpha_vct',
    riotMatchId: 'BR1_294019201',
    mapName: 'Ascent',
    durationSeconds: 2140,
    mode: 'Competitivo',
    isWin: true,
    scoreTeam: 13,
    scoreOpponent: 8,
    playedAt: 'Hoje, 14:30',
    players: [
      {
        id: 'mp_1',
        matchId: 'm_1',
        playerProfileId: 'prof_1',
        playerName: 'Pedro',
        agentPlayed: 'Omen',
        kills: 22,
        deaths: 11,
        assists: 9,
        acs: 268,
        kastPercentage: 78,
        firstKills: 4,
        firstDeaths: 1
      },
      {
        id: 'mp_2',
        matchId: 'm_1',
        playerProfileId: 'prof_2',
        playerName: 'Lucas',
        agentPlayed: 'Jett',
        kills: 25,
        deaths: 14,
        assists: 3,
        acs: 310,
        kastPercentage: 74,
        firstKills: 6,
        firstDeaths: 2
      }
    ],
    rounds: []
  },
  {
    id: 'm_2',
    tenantId: 'tenant_alpha_vct',
    riotMatchId: 'BR1_294019202',
    mapName: 'Bind',
    durationSeconds: 2450,
    mode: 'Competitivo',
    isWin: false,
    scoreTeam: 9,
    scoreOpponent: 13,
    playedAt: 'Ontem, 20:15',
    players: [],
    rounds: []
  },
  {
    id: 'm_3',
    tenantId: 'tenant_alpha_vct',
    riotMatchId: 'BR1_294019203',
    mapName: 'Haven',
    durationSeconds: 2280,
    mode: 'Treino Tático',
    isWin: true,
    scoreTeam: 13,
    scoreOpponent: 11,
    playedAt: '25/07/2026',
    players: [],
    rounds: []
  }
];

const INITIAL_INSIGHTS: Insight[] = [
  {
    id: 'ins_1',
    tenantId: 'tenant_alpha_vct',
    severity: 'CRITICAL',
    category: 'Rounds de Pistol',
    title: 'Baixo aproveitamento nos Pistol Rounds',
    description: 'Nas últimas 10 partidas, a equipe venceu apenas 31% dos pistol rounds.',
    recommendedAction: 'Treinar execuções lentas de pistol no Ataque com utilitários.',
    createdAt: '2026-07-27T10:00:00Z'
  },
  {
    id: 'ins_2',
    tenantId: 'tenant_alpha_vct',
    severity: 'WARNING',
    category: 'Ataque em Ascent',
    title: 'Queda no desempenho de Ataque na Ascent',
    description: 'Seu desempenho no ataque da Ascent caiu 12% em relação às partidas anteriores.',
    recommendedAction: 'Revisar a tomada de espaço do A Main antes da entrada do grupo.',
    createdAt: '2026-07-26T15:30:00Z'
  },
  {
    id: 'ins_3',
    tenantId: 'tenant_alpha_vct',
    severity: 'POSITIVE',
    category: 'First Kills',
    title: 'Alta conversão com First Kill',
    description: 'Quando o time consegue a First Kill, vence 76% dos rounds.',
    recommendedAction: 'Manter a agressividade inicial suportada por utilitários.',
    createdAt: '2026-07-26T14:00:00Z'
  },
  {
    id: 'ins_4',
    tenantId: 'tenant_alpha_vct',
    severity: 'CRITICAL',
    category: 'Rounds em Vantagem',
    title: 'Desperdício de Vantagem Numérica (5v3 / 4v2)',
    description: 'O time perdeu 14 rounds nas últimas 20 partidas depois de abrir vantagem de dois jogadores.',
    recommendedAction: 'Protocolo estrito de pós-plant: proibir peeks individuais isolados.',
    createdAt: '2026-07-25T11:00:00Z'
  }
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_1',
    tenantId: 'tenant_alpha_vct',
    actorUserId: 'usr_org_1',
    actorName: 'Felipe Silva',
    action: 'CONVITE_GERADO',
    details: 'Gerou convite com código HD72KS para o cargo de Jogador',
    createdAt: '2026-01-15T10:00:00Z'
  }
];

class AppStore {
  tenants: Tenant[] = [];
  users: User[] = [];
  members: TeamMember[] = [];
  invites: Invite[] = [];
  profiles: PlayerProfile[] = [];
  trainingSessions: TrainingSession[] = [];
  matches: Match[] = [];
  insights: Insight[] = [];
  auditLogs: AuditLog[] = [];
  activeTenantId: string = '';
  currentUserId: string = '';

  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const savedTenants = localStorage.getItem('vta_tenants');
      this.tenants = savedTenants ? JSON.parse(savedTenants) : INITIAL_TENANTS;

      const savedUsers = localStorage.getItem('vta_users');
      this.users = savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS;

      const savedMembers = localStorage.getItem('vta_members');
      this.members = savedMembers ? JSON.parse(savedMembers) : INITIAL_MEMBERS;

      const savedInvites = localStorage.getItem('vta_invites');
      this.invites = savedInvites ? JSON.parse(savedInvites) : INITIAL_INVITES;

      const savedProfiles = localStorage.getItem('vta_profiles');
      this.profiles = savedProfiles ? JSON.parse(savedProfiles) : INITIAL_PROFILES;

      const savedTraining = localStorage.getItem('vta_training');
      this.trainingSessions = savedTraining ? JSON.parse(savedTraining) : INITIAL_TRAINING_SESSIONS;

      const savedMatches = localStorage.getItem('vta_matches');
      this.matches = savedMatches ? JSON.parse(savedMatches) : INITIAL_MATCHES;

      const savedInsights = localStorage.getItem('vta_insights');
      this.insights = savedInsights ? JSON.parse(savedInsights) : INITIAL_INSIGHTS;

      const savedLogs = localStorage.getItem('vta_audit');
      this.auditLogs = savedLogs ? JSON.parse(savedLogs) : INITIAL_AUDIT_LOGS;

      const savedActiveTenant = localStorage.getItem('vta_active_tenant');
      this.activeTenantId = savedActiveTenant || INITIAL_TENANTS[0].id;

      const savedCurrentUser = localStorage.getItem('vta_current_user');
      this.currentUserId = savedCurrentUser || INITIAL_USERS[0].id;
    } catch (e) {
      this.tenants = INITIAL_TENANTS;
      this.users = INITIAL_USERS;
      this.members = INITIAL_MEMBERS;
      this.invites = INITIAL_INVITES;
      this.profiles = INITIAL_PROFILES;
      this.trainingSessions = INITIAL_TRAINING_SESSIONS;
      this.matches = INITIAL_MATCHES;
      this.insights = INITIAL_INSIGHTS;
      this.auditLogs = INITIAL_AUDIT_LOGS;
      this.activeTenantId = INITIAL_TENANTS[0].id;
      this.currentUserId = INITIAL_USERS[0].id;
    }
  }

  saveToStorage() {
    localStorage.setItem('vta_tenants', JSON.stringify(this.tenants));
    localStorage.setItem('vta_users', JSON.stringify(this.users));
    localStorage.setItem('vta_members', JSON.stringify(this.members));
    localStorage.setItem('vta_invites', JSON.stringify(this.invites));
    localStorage.setItem('vta_profiles', JSON.stringify(this.profiles));
    localStorage.setItem('vta_training', JSON.stringify(this.trainingSessions));
    localStorage.setItem('vta_matches', JSON.stringify(this.matches));
    localStorage.setItem('vta_insights', JSON.stringify(this.insights));
    localStorage.setItem('vta_audit', JSON.stringify(this.auditLogs));
    localStorage.setItem('vta_active_tenant', this.activeTenantId);
    localStorage.setItem('vta_current_user', this.currentUserId);
  }

  logAudit(actorUserId: string, actorName: string, action: string, details: string) {
    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      tenantId: this.activeTenantId,
      actorUserId,
      actorName,
      action,
      details,
      createdAt: new Date().toISOString()
    };
    this.auditLogs = [newLog, ...this.auditLogs];
    this.saveToStorage();
  }
}

export const store = new AppStore();
