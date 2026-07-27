import Fastify from 'fastify';
import cors from '@fastify/cors';
import { env } from './config/env.js';
import { contentRoutes } from './routes/contentRoutes.js';
import { riotRoutes } from './routes/riotRoutes.js';

const app = Fastify({
  logger: true
});

// Habilitar CORS para permitir requisições do nosso frontend React/Vite
await app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

// Rota de Health Check
app.get('/health', async () => {
  return { status: 'OK', message: 'VALORANT Backend Server Operacional', env: env.NODE_ENV };
});

// Registrar rotas da API
await app.register(contentRoutes, { prefix: '/api/game' });
await app.register(riotRoutes, { prefix: '/api/riot' });

const start = async () => {
  try {
    const port = parseInt(env.PORT, 10);
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 Servidor Backend VALORANT rodando na porta ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
