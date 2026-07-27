import React, { useState } from 'react';
import { inviteService } from '../services/inviteService';
import { store } from '../services/store';

interface InviteAcceptModalProps {
  initialToken?: string;
  onSuccess: () => void;
  onClose: () => void;
}

export const InviteAcceptModal: React.FC<InviteAcceptModalProps> = ({ initialToken = 'HD72KS', onSuccess, onClose }) => {
  const [tokenInput, setTokenInput] = useState(initialToken);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [riotId, setRiotId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const inviteData = inviteService.validateInviteToken(tokenInput);
  const tenantName = inviteData ? store.tenants.find(t => t.id === inviteData.tenantId)?.name : 'Equipe';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim() || !nickname.trim()) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const result = inviteService.acceptInvite(tokenInput, {
        email,
        fullName,
        nickname,
        riotId
      });

      // Efetua login automático do novo membro cadastrado
      store.currentUserId = result.user.id;
      store.activeTenantId = result.member.tenantId;
      store.saveToStorage();

      onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao processar convite.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-[#ccc3d8] rounded-2xl p-6 w-full max-w-md shadow-xl relative space-y-4">
        
        <div className="flex items-center justify-between border-b border-[#ccc3d8] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f3ebfa] text-[#630ed4] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[24px]">vpn_key</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1d1a24]">Aceitar Convite de Equipe</h3>
              <p className="text-xs text-[#4a4455]">
                {inviteData ? `Você foi convidado para a ${tenantName}` : 'Informe um código de convite válido'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#7b7487] hover:text-[#1d1a24]">
            <span className="material-symbols-outlined">close</span>
          </button>
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
              Código / Token do Convite
            </label>
            <input
              type="text"
              placeholder="Ex: HD72KS"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
              className="w-full px-3.5 py-2 rounded-lg bg-[#f9f1ff] border border-[#ccc3d8] text-[#630ed4] text-xs font-mono text-center font-bold focus:outline-none focus:border-[#630ed4] uppercase"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4a4455] mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              placeholder="Ex: Gabriel Santos"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-[#ccc3d8] text-[#1d1a24] text-xs font-semibold focus:outline-none focus:border-[#630ed4]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4a4455] mb-1">
              E-mail de Acesso
            </label>
            <input
              type="email"
              placeholder="Ex: jogador@equipe.gg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-[#ccc3d8] text-[#1d1a24] text-xs font-semibold focus:outline-none focus:border-[#630ed4]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4a4455] mb-1">
              Nickname no Jogo
            </label>
            <input
              type="text"
              placeholder="Ex: Player 01"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#ccc3d8] text-[#1d1a24] text-xs font-semibold focus:outline-none focus:border-[#630ed4]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4a4455] mb-1">
              Riot ID Oficial (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ex: Player01#BR1"
              value={riotId}
              onChange={(e) => setRiotId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#ccc3d8] text-[#1d1a24] text-xs font-semibold focus:outline-none focus:border-[#630ed4]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#ccc3d8]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#ccc3d8] text-xs font-semibold text-[#4a4455] hover:bg-[#f9f1ff]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary-stitch text-xs flex items-center gap-1.5"
            >
              Entrar na Equipe
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
