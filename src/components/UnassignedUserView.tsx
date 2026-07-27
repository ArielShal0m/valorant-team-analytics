import React from 'react';
import logoRahnag from '../assets/logo-rahnag.png';

interface UnassignedUserViewProps {
  onLogout: () => void;
}

export const UnassignedUserView: React.FC<UnassignedUserViewProps> = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-[#fef7ff] flex flex-col justify-center items-center p-6 text-[#1d1a24] font-sans">
      
      {/* Brand Header RAHNAG */}
      <div className="flex flex-col items-center mb-8 text-center space-y-2">
        <img src={logoRahnag} alt="RAHNAG Logo" className="h-16 w-auto object-contain mb-1" />
        <h1 className="text-3xl font-extrabold text-[#630ed4] tracking-tight">RAHNAG</h1>
      </div>

      {/* Unassigned Card */}
      <div className="bg-white border border-[#ccc3d8] rounded-2xl p-8 w-full max-w-md shadow-xs space-y-6 text-center">
        
        <div className="w-14 h-14 bg-[#f3ebfa] text-[#630ed4] rounded-full flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[32px]">shield_person</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#1d1a24]">Sua conta ainda não está vinculada a uma equipe</h2>
          <p className="text-xs text-[#4a4455] leading-relaxed">
            Você precisa receber um convite de um organizador para acessar o sistema privado RAHNAG.
          </p>
        </div>

        <div className="pt-4 border-t border-[#ccc3d8]">
          <button
            onClick={onLogout}
            className="w-full py-2.5 px-4 bg-white border border-[#ccc3d8] text-[#ba1a1a] font-bold text-xs rounded-lg hover:bg-[#ffdad6]/20 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Sair da conta
          </button>
        </div>

      </div>

    </div>
  );
};
