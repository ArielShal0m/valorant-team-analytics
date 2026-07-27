import type { Tenant, User, TeamMember, Invite, PlayerProfile, Match, TrainingSession, Insight, AuditLog } from '../types';

const INITIAL_TENANTS: Tenant[] = [];
const INITIAL_USERS: User[] = [];
const INITIAL_MEMBERS: TeamMember[] = [];
const INITIAL_PROFILES: PlayerProfile[] = [];
const INITIAL_INVITES: Invite[] = [];
const INITIAL_TRAINING_SESSIONS: TrainingSession[] = [];
const INITIAL_MATCHES: Match[] = [];
const INITIAL_INSIGHTS: Insight[] = [];
const INITIAL_AUDIT_LOGS: AuditLog[] = [];

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
      let rawUsers: User[] = savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS;
      // Expurgar usuário antigo de teste Felipe Silva
      this.users = rawUsers.filter(u => u.id !== 'usr_org_1' && u.fullName !== 'Felipe Silva');

      const savedMembers = localStorage.getItem('vta_members');
      let rawMembers: TeamMember[] = savedMembers ? JSON.parse(savedMembers) : INITIAL_MEMBERS;
      this.members = rawMembers.filter(m => m.userId !== 'usr_org_1');

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
      this.activeTenantId = savedActiveTenant !== null && savedActiveTenant !== 'tenant_alpha_vct' ? savedActiveTenant : (this.tenants[0]?.id || '');

      const savedCurrentUser = localStorage.getItem('vta_current_user');
      if (savedCurrentUser && savedCurrentUser !== 'usr_org_1') {
        this.currentUserId = savedCurrentUser;
      } else {
        this.currentUserId = '';
        this.activeTenantId = '';
      }
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
      this.activeTenantId = '';
      this.currentUserId = '';
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

  logout() {
    this.currentUserId = '';
    this.activeTenantId = '';
    localStorage.setItem('vta_current_user', '');
    localStorage.setItem('vta_active_tenant', '');
    this.saveToStorage();
  }

  // Método para criar a conta do Administrador Real da RAHNAG
  createNewAdminAndTenant(adminName: string, email: string, teamName: string) {
    const tenantId = `tenant_${Date.now()}`;
    const userId = `usr_admin_${Date.now()}`;
    const memberId = `tm_${Date.now()}`;
    const profileId = `prof_${Date.now()}`;

    const newTenant: Tenant = {
      id: tenantId,
      name: teamName.trim(),
      slug: teamName.toLowerCase().replace(/\s+/g, '-'),
      logoEmoji: 'sports_esports',
      primaryColor: '#630ed4',
      createdAt: new Date().toISOString()
    };

    const newUser: User = {
      id: userId,
      email: email.trim().toLowerCase(),
      fullName: adminName.trim(),
      createdAt: new Date().toISOString()
    };

    const newMember: TeamMember = {
      id: memberId,
      tenantId: tenantId,
      userId: userId,
      user: newUser,
      role: 'ORGANIZER',
      joinedAt: new Date().toISOString()
    };

    const newProfile: PlayerProfile = {
      id: profileId,
      tenantId: tenantId,
      teamMemberId: memberId,
      nickname: adminName.trim().split(' ')[0],
      primaryAgent: 'Omen'
    };

    this.tenants.unshift(newTenant);
    this.users.unshift(newUser);
    this.members.unshift(newMember);
    this.profiles.unshift(newProfile);

    this.activeTenantId = tenantId;
    this.currentUserId = userId;

    this.logAudit(userId, adminName, 'ADMIN_CRIADO', `Criou a conta de Administrador RAHNAG e a equipe ${teamName}.`);
    this.saveToStorage();

    return { user: newUser, tenant: newTenant, member: newMember };
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
