import React, { useState } from 'react';
import { store } from '../services/store';

interface LoginViewProps {
  onLoginSuccess: () => void;
  onOpenInviteModal: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onOpenInviteModal }) => {
  const [email, setEmail] = useState('organizador@alpha.gg');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');

  const handleQuickLogin = (userId: string) => {
    const user = store.users.find(u => u.id === userId);
    if (!user) return;

    store.currentUserId = user.id;
    const member = store.members.find(m => m.userId === user.id);
    if (member) {
      store.activeTenantId = member.tenantId;
    }
    store.saveToStorage();
    onLoginSuccess();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const user = store.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      setErrorMsg('E-mail não encontrado. Teste um dos perfis pré-definidos abaixo.');
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

      {/* Login Card */}
      <div className="bg-white border border-[#ccc3d8] rounded-2xl p-8 w-full max-w-md shadow-sm space-y-6">
        
        <div>
          <h2 className="text-xl font-bold text-[#1d1a24]">Acesse sua conta</h2>
          <p className="text-xs text-[#4a4455] mt-1">
            Entre com suas credenciais para visualizar o painel da sua equipe.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-[#ffdad6] text-[#ba1a1a] text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#4a4455] mb-1">
              E-mail de acesso
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex: organizador@alpha.gg"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Linha Divisória */}
        <div className="relative border-t border-[#ccc3d8] pt-4">
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-2 text-[10px] uppercase font-bold text-[#7b7487]">
            Perfis para Teste Rápido
          </span>
        </div>

        {/* Botões de Acesso Rápido por Perfil */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={() => handleQuickLogin('usr_org_1')}
            className="w-full p-3 rounded-xl border border-[#630ed4]/30 bg-[#f9f1ff] hover:bg-[#eaddff] transition-all text-left flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#630ed4] text-white flex items-center justify-center font-bold text-xs">
                F
              </div>
              <div>
                <p className="text-xs font-bold text-[#1d1a24]">Felipe Silva (Admin Team)</p>
                <p className="text-[10px] text-[#630ed4] font-semibold">Acesso total para convidar jogadores</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#630ed4] group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin('usr_player_1')}
            className="w-full p-3 rounded-xl border border-[#ccc3d8] bg-white hover:bg-[#f9f1ff] transition-all text-left flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e3e1ed] text-[#630ed4] flex items-center justify-center font-bold text-xs">
                P
              </div>
              <div>
                <p className="text-xs font-bold text-[#1d1a24]">Pedro Santos (Pro Player)</p>
                <p className="text-[10px] text-[#7b7487]">Dashboard individual e de partidas</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#7b7487] group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </button>
        </div>

        {/* Link para Resgatar Convite */}
        <div className="text-center pt-2 border-t border-[#ccc3d8]">
          <button
            type="button"
            onClick={onOpenInviteModal}
            className="text-xs font-bold text-[#630ed4] hover:underline inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">vpn_key</span>
            Recebeu um convite da equipe? Resgatar convite
          </button>
        </div>

      </div>

    </div>
  );
};
