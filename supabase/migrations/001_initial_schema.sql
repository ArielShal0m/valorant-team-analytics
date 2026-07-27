-- Migration: 001_initial_schema.sql
-- Descrição: Estrutura relacional do banco PostgreSQL para a plataforma VALORANT OPS

-- Habilitar extensão para geração de UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Equipes (Tenants)
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo_icon VARCHAR(100) DEFAULT 'sports_esports',
    primary_color VARCHAR(50) DEFAULT '#630ed4',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Membros da Equipe
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    role VARCHAR(50) CHECK (role IN ('ORGANIZER', 'COACH', 'PLAYER')) DEFAULT 'PLAYER',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id, user_id)
);

-- 3. Perfis dos Jogadores
CREATE TABLE IF NOT EXISTS player_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    team_member_id UUID REFERENCES team_members(id) ON DELETE SET NULL,
    nickname VARCHAR(100) NOT NULL,
    primary_agent VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Contas Riot (PUUID é a chave única permanente da Riot)
CREATE TABLE IF NOT EXISTS riot_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_profile_id UUID UNIQUE NOT NULL REFERENCES player_profiles(id) ON DELETE CASCADE,
    puuid VARCHAR(255) UNIQUE NOT NULL,
    game_name VARCHAR(100) NOT NULL,
    tag_line VARCHAR(50) NOT NULL,
    region VARCHAR(20) DEFAULT 'br',
    card_url TEXT,
    verified_at TIMESTAMPTZ DEFAULT NOW(),
    last_synced_at TIMESTAMPTZ
);

-- 5. Catálogo de Agentes
CREATE TABLE IF NOT EXISTS agents (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    role VARCHAR(50),
    icon_url TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Catálogo de Mapas
CREATE TABLE IF NOT EXISTS maps (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    splash_url TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Partidas
CREATE TABLE IF NOT EXISTS matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    riot_match_id VARCHAR(255) NOT NULL,
    map_id VARCHAR(100) REFERENCES maps(id),
    map_name VARCHAR(100) NOT NULL,
    duration_seconds INT NOT NULL,
    mode VARCHAR(100) NOT NULL DEFAULT 'Competitive',
    is_win BOOLEAN NOT NULL,
    score_team INT NOT NULL,
    score_opponent INT NOT NULL,
    played_at TIMESTAMPTZ NOT NULL,
    riot_raw_payload JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id, riot_match_id)
);

-- 8. Estatísticas dos Jogadores por Partida
CREATE TABLE IF NOT EXISTS match_players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
    player_profile_id UUID REFERENCES player_profiles(id) ON DELETE SET NULL,
    puuid VARCHAR(255) NOT NULL,
    player_name VARCHAR(100) NOT NULL,
    agent_id VARCHAR(100) REFERENCES agents(id),
    agent_name VARCHAR(100),
    kills INT DEFAULT 0,
    deaths INT DEFAULT 0,
    assists INT DEFAULT 0,
    acs INT DEFAULT 0,
    kast_percentage INT DEFAULT 0,
    first_kills INT DEFAULT 0,
    first_deaths INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Jobs de Sincronização Assíncrona
CREATE TABLE IF NOT EXISTS match_sync_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    player_profile_id UUID NOT NULL REFERENCES player_profiles(id) ON DELETE CASCADE,
    status VARCHAR(50) CHECK (status IN ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED')) DEFAULT 'PENDING',
    matches_found INT DEFAULT 0,
    matches_synced INT DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Audit Logs do Sistema
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    actor_user_id UUID,
    actor_name VARCHAR(150),
    action VARCHAR(100) NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
