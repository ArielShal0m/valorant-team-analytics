import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3001'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  RIOT_API_KEY: z.string().default('RGAPI-MOCK-DEV-KEY'),
  SUPABASE_URL: z.string().default('https://mock.supabase.co'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().default('mock-service-role-key')
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Configuração inválida de variáveis de ambiente:', parsed.error.format());
}

export const env = parsed.success ? parsed.data : envSchema.parse({});
