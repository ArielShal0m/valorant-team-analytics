import { store } from './store';
import type { Invite, UserRole, User, TeamMember, PlayerProfile } from '../types';

export const inviteService = {
  // Gerar novo convite (Apenas ORGANIZER)
  createInvite(role: UserRole = 'PLAYER', daysValid: number = 7): Invite {
    const token = Math.random().toString(36).substring(2, 10).toUpperCase();
    const expiresAt = new Date(Date.now() + daysValid * 24 * 3600 * 1000).toISOString();

    const newInvite: Invite = {
      id: `inv_${Date.now()}`,
      tenantId: store.activeTenantId,
      token,
      role,
      expiresAt,
      status: 'PENDING',
      createdByUserId: store.currentUserId,
      createdAt: new Date().toISOString()
    };

    store.invites = [newInvite, ...store.invites];
    store.logAudit(store.currentUserId, 'ORGANIZER', 'CONVITE_GERADO', `Gerou convite de token ${token} para cargo ${role}`);
    store.saveToStorage();
    return newInvite;
  },

  // Validar token de convite
  validateInviteToken(token: string): Invite | null {
    const invite = store.invites.find(i => i.token === token);
    if (!invite) return null;
    if (invite.status !== 'PENDING') return null;

    const isExpired = new Date(invite.expiresAt).getTime() < Date.now();
    if (isExpired) return null;

    return invite;
  },

  // Aceitar convite e integrar novo membro à equipe
  acceptInvite(token: string, userData: { email: string; fullName: string; nickname: string; riotId?: string }) {
    const invite = this.validateInviteToken(token);
    if (!invite) {
      throw new Error('Convite inválido, expirado ou já utilizado!');
    }

    // Cria conta do novo usuário
    const newUserId = `usr_${Date.now()}`;
    const newUser: User = {
      id: newUserId,
      email: userData.email,
      fullName: userData.fullName,
      createdAt: new Date().toISOString()
    };
    store.users.push(newUser);

    // Cria membro da equipe
    const newMemberId = `tm_${Date.now()}`;
    const newMember: TeamMember = {
      id: newMemberId,
      tenantId: invite.tenantId,
      userId: newUserId,
      user: newUser,
      role: invite.role,
      joinedAt: new Date().toISOString()
    };
    store.members.push(newMember);

    // Se for jogador, cria perfil de jogador e vincula Riot ID
    if (invite.role === 'PLAYER') {
      const newProfileId = `prof_${Date.now()}`;
      const [gameName, tagLine] = (userData.riotId || `${userData.nickname}#BR1`).split('#');

      const newProfile: PlayerProfile = {
        id: newProfileId,
        tenantId: invite.tenantId,
        teamMemberId: newMemberId,
        nickname: userData.nickname,
        primaryAgent: 'Flex',
        riotAccount: {
          id: `riot_${Date.now()}`,
          playerProfileId: newProfileId,
          gameName: gameName || userData.nickname,
          tagLine: tagLine || 'BR1',
          puuid: `puuid_${Date.now()}`,
          verifiedAt: new Date().toISOString()
        }
      };
      store.profiles.push(newProfile);
    }

    // Marca convite como aceito (Uso Único)
    invite.status = 'ACCEPTED';
    store.currentUserId = newUserId;
    store.activeTenantId = invite.tenantId;

    store.logAudit(newUserId, userData.fullName, 'CONVITE_ACEITO', `Aceitou convite ${token} e entrou no time como ${invite.role}`);
    store.saveToStorage();

    return { user: newUser, member: newMember };
  },

  // Revogar convite
  revokeInvite(inviteId: string) {
    const invite = store.invites.find(i => i.id === inviteId && i.tenantId === store.activeTenantId);
    if (invite) {
      invite.status = 'REVOKED';
      store.logAudit(store.currentUserId, 'ORGANIZER', 'CONVITE_REVOGADO', `Revogou convite ${invite.token}`);
      store.saveToStorage();
    }
  }
};
