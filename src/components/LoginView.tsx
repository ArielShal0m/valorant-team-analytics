import React, { useState } from 'react';
import { store } from '../services/store';
import logoRahnag from '../assets/logo-rahnag.png';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Por favor, preencha o e-mail e a senha.');
      return;
    }

    const user = store.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      setErrorMsg('Credenciais inválidas. Verifique seu e-mail e senha.');
      return;
    }

    store.currentUserId = user.id;
    const member = store.members.find(m => m.userId === user.id);
    if (member) {
      store.activeTenantId = member.tenantId;
    } else {
      store.activeTenantId = '';
    }
    store.saveToStorage();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#fef7ff] flex flex-col justify-center items-center p-6 text-[#1d1a24] font-sans">
      
      {/* Brand Header com a Logo Oficial RAHNAG */}
      <div className="flex flex-col items-center mb-8 text-center space-y-2">
        <img src={logoRahnag} alt="RAHNAG Logo" className="h-16 w-auto object-contain mb-1" />
        <h1 className="text-3xl font-extrabold text-[#630ed4] tracking-tight">RAHNAG</h1>
        <p className="text-xs text-[#4a4455] font-semibold max-w-sm">
          Gerencie treinos, desempenho e evolução da sua equipe.
        </p>
      </div>

      {/* Login Card (Branco + Roxo) */}
      <div className="bg-white border border-[#ccc3d8] rounded-2xl p-8 w-full max-w-md shadow-xs space-y-6">
        
        <div className="border-b border-[#ccc3d8] pb-4">
          <h2 className="text-xl font-bold text-[#1d1a24]">Acesso à plataforma</h2>
          <p className="text-xs text-[#4a4455] mt-0.5">
            Insira suas credenciais corporativas para entrar na RAHNAG.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-lg bg-[#ffdad6] text-[#ba1a1a] text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#4a4455] mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex: seuemail@rahnag.gg"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#ccc3d8] text-[#1d1a24] text-xs font-semibold focus:outline-none focus:border-[#630ed4]"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-[#4a4455]">
                Senha
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-[11px] text-[#630ed4] font-semibold hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>
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
            <span>Entrar</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center text-[11px] text-[#7b7487]">
        Plataforma Privada RAHNAG • Todos os direitos reservados
      </div>

      {/* Modal / Alerta de Esqueci Minha Senha */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#ccc3d8] rounded-2xl p-6 w-full max-w-sm shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 bg-[#f3ebfa] text-[#630ed4] rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[24px]">lock_reset</span>
            </div>
            <h3 className="text-base font-bold text-[#1d1a24]">Recuperação de Senha</h3>
            <p className="text-xs text-[#4a4455] leading-relaxed">
              Por motivos de segurança da plataforma privada RAHNAG, contate o organizador da sua equipe para redefinir seu acesso.
            </p>
            <button
              onClick={() => setShowForgotPassword(false)}
              className="btn-primary-stitch text-xs w-full py-2"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
