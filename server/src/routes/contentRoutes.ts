import type { FastifyInstance } from 'fastify';
import { gameContentService } from '../services/gameContentService.js';

export async function contentRoutes(fastify: FastifyInstance) {
  // GET /api/game/agents
  fastify.get('/agents', async (_request, reply) => {
    const agents = await gameContentService.getAgents();
    return reply.send({ success: true, data: agents });
  });

  // GET /api/game/maps
  fastify.get('/maps', async (_request, reply) => {
    const maps = await gameContentService.getMaps();
    return reply.send({ success: true, data: maps });
  });
}
