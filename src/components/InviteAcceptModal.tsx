import React, { useState } from 'react';
import { inviteService } from '../services/inviteService';
import { store } from '../services/store';
import { ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

interface InviteAcceptModalProps {
  initialToken?: string;
  onSuccess: () => void;
  onClose: () => void;
}

export const InviteAcceptModal: React.FC<InviteAcceptModalProps> = ({ initialToken = '6Hds82kd92', onSuccess, onClose }) => {
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
      inviteService.acceptInvite(tokenInput, {
        email,
        fullName,
        nickname,
        riotId
      });
      onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao processar convite.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1C1438] border border-[#342460] rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
        
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/40">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-white">Aceitar Convite de Equipe</h3>
            <p className="text-xs text-gray-400">
              {inviteData ? `Você foi convidado para a ${tenantName} como ${inviteData.role}` : 'Informe um código de convite válido'}
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Código / Token do Convite
            </label>
            <input
              type="text"
              placeholder="Ex: 6Hds82kd92"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 rounded-xl bg-[#0D091A] border border-[#342460] text-white text-xs font-mono text-center uppercase font-bold focus:outline-none focus:border-[#8B5CF6]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              placeholder="Ex: Gabriel Santos"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#0D091A] border border-[#342460] text-white text-xs focus:outline-none focus:border-[#8B5CF6]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              E-mail de Acesso
            </label>
            <input
              type="email"
              placeholder="Ex: jogador@equipe.gg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#0D091A] border border-[#342460] text-white text-xs focus:outline-none focus:border-[#8B5CF6]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Nick no Jogo (Nickname)
            </label>
            <input
              type="text"
              placeholder="Ex: Player 01"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#0D091A] border border-[#342460] text-white text-xs focus:outline-none focus:border-[#8B5CF6]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Riot ID Oficial (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ex: Player01#BR1"
              value={riotId}
              onChange={(e) => setRiotId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#0D091A] border border-[#342460] text-white text-xs focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#342460]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#261B4C] text-xs font-bold text-gray-300 hover:bg-[#342460]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="esports-btn-purple px-5 py-2 text-xs flex items-center gap-1.5"
            >
              Entrar na Equipe
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
