import React, { useState } from 'react';
import { store } from '../services/store';

interface LoginViewProps {
  onLoginSuccess: () => void;
  onOpenInviteModal: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onOpenInviteModal }) => {
  const [activeTab, setActiveTab] = useState<'create_team' | 'login'>('create_team');

  // Form de Criar Equipe (Admin Zerado)
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [password, setPassword] = useState('');

  // Form de Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCreateTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!adminName.trim() || !email.trim() || !teamName.trim()) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      store.createNewAdminAndTenant(adminName, email, teamName);
      onLoginSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao criar equipe.');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const user = store.users.find(u => u.email.toLowerCase() === loginEmail.trim().toLowerCase());
    if (!user) {
      setErrorMsg('E-mail não encontrado. Crie uma nova equipe na aba ao lado.');
      return;
    }

    store.currentUserId = user.id;
    const member = store.members.find(m => m.userId === user.id);
    if (member) {
      store.activeTenantId = member.tenantId;
    }
    store.saveToStorage();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#fef7ff] flex flex-col justify-center items-center p-6 text-[#1d1a24] font-sans">
      
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-14 h-14 bg-[#630ed4] text-white rounded-2xl flex items-center justify-center font-extrabold text-2xl shadow-md mb-3">
          V
        </div>
        <h1 className="text-2xl font-bold text-[#630ed4] tracking-tight">VALORANT OPS</h1>
        <p className="text-xs uppercase tracking-widest text-[#7b7487] font-bold mt-0.5">
          Elite Performance Analytics Platform
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-[#ccc3d8] rounded-2xl p-8 w-full max-w-md shadow-xs space-y-6">
        
        {/* Toggle Tabs: Criar Equipe vs Entrar */}
        <div className="flex bg-[#f9f1ff] p-1 rounded-xl border border-[#ccc3d8]">
          <button
            type="button"
            onClick={() => { setActiveTab('create_team'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'create_team'
                ? 'bg-[#630ed4] text-white shadow-xs'
                : 'text-[#4a4455] hover:text-[#1d1a24]'
            }`}
          >
            Criar Minha Equipe (Admin)
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'login'
                ? 'bg-[#630ed4] text-white shadow-xs'
                : 'text-[#4a4455] hover:text-[#1d1a24]'
            }`}
          >
            Entrar
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-[#ffdad6] text-[#ba1a1a] text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tab 1: Criar Nova Equipe (Admin Zerado) */}
        {activeTab === 'create_team' && (
          <form onSubmit={handleCreateTeamSubmit} className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-[#4a4455] mb-4">
                Cadastre sua conta de Administrador e crie a sua equipe com ambiente <strong>100% zerado</strong>.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4a4455] mb-1">
                Nome da sua Equipe / Time
              </label>
              <input
                type="text"
                placeholder="Ex: Minha Equipe VCT, LOUD, FURIA..."
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#ccc3d8] text-[#1d1a24] text-xs font-semibold focus:outline-none focus:border-[#630ed4]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4a4455] mb-1">
                Seu Nome Completo (Administrador)
              </label>
              <input
                type="text"
                placeholder="Ex: Ariel Santos"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#ccc3d8] text-[#1d1a24] text-xs font-semibold focus:outline-none focus:border-[#630ed4]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4a4455] mb-1">
                E-mail de Acesso
              </label>
              <input
                type="email"
                placeholder="Ex: admin@minhaequipe.gg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#ccc3d8] text-[#1d1a24] text-xs font-semibold focus:outline-none focus:border-[#630ed4]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4a4455] mb-1">
                Senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#ccc3d8] text-[#1d1a24] text-xs font-semibold focus:outline-none focus:border-[#630ed4]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary-stitch text-xs py-3 flex items-center justify-center gap-2 shadow-xs mt-2"
            >
              <span>Criar Minha Equipe (ZERADO)</span>
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
            </button>
          </form>
        )}

        {/* Tab 2: Entrar em Conta Existente */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#4a4455] mb-1">
                E-mail de acesso
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="ex: admin@minhaequipe.gg"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#ccc3d8] text-[#1d1a24] text-xs font-semibold focus:outline-none focus:border-[#630ed4]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4a4455] mb-1">
                Senha
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#ccc3d8] text-[#1d1a24] text-xs font-semibold focus:outline-none focus:border-[#630ed4]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary-stitch text-xs py-3 flex items-center justify-center gap-2 shadow-xs mt-2"
            >
              <span>Entrar no Painel</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>
        )}

        {/* Link para Resgatar Convite */}
        <div className="text-center pt-3 border-t border-[#ccc3d8]">
          <button
            type="button"
            onClick={onOpenInviteModal}
            className="text-xs font-bold text-[#630ed4] hover:underline inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">vpn_key</span>
            Recebeu um convite de equipe? Resgatar convite
          </button>
        </div>

      </div>

    </div>
  );
};
