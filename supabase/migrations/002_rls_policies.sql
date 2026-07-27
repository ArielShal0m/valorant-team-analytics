-- Migration: 002_rls_policies.sql
-- Descrição: Políticas de isolamento multitenant no Supabase usando RLS

-- Habilitar RLS em tabelas privadas
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE riot_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_sync_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Manter agentes e mapas com leitura pública
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE maps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agentes sao visiveis publicamente" ON agents FOR SELECT USING (true);
CREATE POLICY "Mapas sao visiveis publicamente" ON maps FOR SELECT USING (true);

-- Política de isolamento por Tenant para membros da equipe
CREATE POLICY "Membros acessam apenas seu proprio tenant" ON team_members
    FOR ALL USING (
        user_id = auth.uid() OR tenant_id IN (
            SELECT tenant_id FROM team_members WHERE user_id = auth.uid()
        )
    );

-- Política de isolamento por Tenant para partidas
CREATE POLICY "Partidas isoladas por tenant" ON matches
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM team_members WHERE user_id = auth.uid()
        )
    );

-- Política de isolamento para jogadores por partida
CREATE POLICY "Estatisticas de jogadores isoladas por tenant" ON match_players
    FOR ALL USING (
        match_id IN (
            SELECT id FROM matches WHERE tenant_id IN (
                SELECT tenant_id FROM team_members WHERE user_id = auth.uid()
            )
        )
    );
