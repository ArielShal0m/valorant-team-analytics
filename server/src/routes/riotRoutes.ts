import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { riotSyncService } from '../services/riotSyncService.js';

export async function riotRoutes(fastify: FastifyInstance) {
  // POST /api/riot/account - Vincula e valida Riot Account resolvendo PUUID
  fastify.post('/account', async (request, reply) => {
    const bodySchema = z.object({
      tenantId: z.string(),
      playerProfileId: z.string(),
      gameName: z.string().min(1),
      tagLine: z.string().min(1)
    });

    const parsed = bodySchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ success: false, error: 'Dados inválidos para vinculação de Riot Account.' });
    }

    const { tenantId, playerProfileId, gameName, tagLine } = parsed.data;

    try {
      const result = await riotSyncService.linkRiotAccount(tenantId, playerProfileId, gameName, tagLine);
      return reply.send({ success: true, data: result });
    } catch (e: any) {
      return reply.status(500).send({ success: false, error: e.message || 'Erro ao vincular conta Riot.' });
    }
  });

  // POST /api/riot/sync - Inicia Job de sincronização de partidas
  fastify.post('/sync', async (request, reply) => {
    const bodySchema = z.object({
      tenantId: z.string(),
      playerProfileId: z.string()
    });

    const parsed = bodySchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ success: false, error: 'TenantId e PlayerProfileId são obrigatórios.' });
    }

    const { tenantId, playerProfileId } = parsed.data;

    try {
      const job = await riotSyncService.createSyncJob(tenantId, playerProfileId);
      return reply.status(202).send({ success: true, data: job });
    } catch (e: any) {
      return reply.status(500).send({ success: false, error: e.message || 'Erro ao iniciar sincronização.' });
    }
  });
}
