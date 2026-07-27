import React from 'react';

export const MapPerformanceView: React.FC = () => {
  const maps = [
    {
      id: 'ascent',
      name: 'Ascent',
      matches: 12,
      wins: 8,
      losses: 4,
      winRate: 67,
      badge: 'MELHOR MAPA',
      badgeColor: 'bg-[#7c3aed] text-[#ede0ff]',
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&auto=format&fit=crop&q=60'
    },
    {
      id: 'bind',
      name: 'Bind',
      matches: 10,
      wins: 4,
      losses: 6,
      winRate: 42,
      badge: 'MENOR DESEMPENHO',
      badgeColor: 'bg-[#ffdad6] text-[#93000a]',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&auto=format&fit=crop&q=60'
    },
    {
      id: 'haven',
      name: 'Haven',
      matches: 15,
      wins: 9,
      losses: 6,
      winRate: 60,
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&auto=format&fit=crop&q=60'
    },
    {
      id: 'icebox',
      name: 'Icebox',
      matches: 8,
      wins: 4,
      losses: 4,
      winRate: 50,
      imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&auto=format&fit=crop&q=60'
    },
    {
      id: 'lotus',
      name: 'Lotus',
      matches: 7,
      wins: 3,
      losses: 4,
      winRate: 43,
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&auto=format&fit=crop&q=60'
    },
    {
      id: 'sunset',
      name: 'Sunset',
      matches: 9,
      wins: 3,
      losses: 6,
      winRate: 33,
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&auto=format&fit=crop&q=60'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Summary Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* Melhor desempenho (2 cols) */}
        <div className="col-span-1 md:col-span-2 bg-white border border-[#ccc3d8] p-6 rounded-xl flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-bold text-[#630ed4] tracking-wider uppercase">Melhor desempenho</span>
            <h3 className="text-2xl font-bold text-[#1d1a24] mt-1">Ascent</h3>
          </div>
          <div className="flex items-end justify-between mt-6">
            <div className="flex gap-8">
              <div>
                <p className="text-xs text-[#7b7487]">Win Rate</p>
                <p className="text-3xl font-bold text-[#630ed4]">67%</p>
              </div>
              <div>
                <p className="text-xs text-[#7b7487]">Partidas</p>
                <p className="text-3xl font-bold text-[#1d1a24]">12</p>
              </div>
            </div>
            <div className="h-12 w-28 bg-[#7c3aed]/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[#630ed4] text-[32px] fill-1">trending_up</span>
            </div>
          </div>
        </div>

        {/* Menor desempenho */}
        <div className="bg-white border border-[#ccc3d8] p-6 rounded-xl shadow-xs">
          <span className="text-xs font-bold text-[#ba1a1a] tracking-wider uppercase">Menor desempenho</span>
          <h3 className="text-xl font-bold text-[#1d1a24] mt-1">Bind</h3>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-2 bg-[#e8dfee] rounded-full overflow-hidden">
              <div className="h-full bg-[#ba1a1a] w-[42%]" />
            </div>
            <span className="text-sm font-bold text-[#ba1a1a]">42%</span>
          </div>
          <p className="text-xs text-[#7b7487] mt-2">10 partidas disputadas</p>
        </div>

        {/* Total de Mapas (Destaque Roxo) */}
        <div className="bg-[#630ed4] text-white p-6 rounded-xl flex flex-col justify-between relative overflow-hidden shadow-sm">
          <div className="z-10">
            <p className="text-xs opacity-80 uppercase tracking-wider">Total de Mapas</p>
            <p className="text-5xl font-extrabold mt-1">09</p>
          </div>
          <div className="z-10 mt-4">
            <button className="text-xs font-bold flex items-center gap-2 bg-white/20 px-3.5 py-2 rounded-lg hover:bg-white/30 transition-colors">
              VER DETALHES <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-10 rotate-12 select-none">
            map
          </span>
        </div>

      </div>

      {/* Maps Table */}
      <div className="bg-white border border-[#ccc3d8] rounded-xl overflow-hidden shadow-xs">
        
        {/* Table Header Controls */}
        <div className="p-6 border-b border-[#ccc3d8] flex justify-between items-center bg-white">
          <h3 className="text-lg font-bold text-[#1d1a24]">Performance por Mapa</h3>
          <div className="flex gap-2">
            <button className="px-3.5 py-1.5 border border-[#ccc3d8] rounded-lg text-xs font-bold text-[#1d1a24] hover:bg-[#f9f1ff] transition-colors">
              FILTRAR
            </button>
            <button className="px-3.5 py-1.5 border border-[#ccc3d8] rounded-lg text-xs font-bold text-[#1d1a24] hover:bg-[#f9f1ff] transition-colors">
              EXPORTAR
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9f1ff]">
                <th className="px-6 py-4 text-xs font-bold text-[#7b7487] uppercase tracking-widest">Nome do Mapa</th>
                <th className="px-6 py-4 text-xs font-bold text-[#7b7487] uppercase tracking-widest">Partidas</th>
                <th className="px-6 py-4 text-xs font-bold text-[#7b7487] uppercase tracking-widest text-center">V / D</th>
                <th className="px-6 py-4 text-xs font-bold text-[#7b7487] uppercase tracking-widest">Win Rate Performance</th>
                <th className="px-6 py-4 text-xs font-bold text-[#7b7487] uppercase tracking-widest text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ccc3d8]">
              {maps.map(m => (
                <tr key={m.id} className="hover:bg-[#f9f1ff]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-10 rounded overflow-hidden border border-[#ccc3d8] bg-gray-200">
                        <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-[#1d1a24]">{m.name}</p>
                        {m.badge && (
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full inline-block mt-0.5 ${m.badgeColor}`}>
                            {m.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-base font-semibold text-[#1d1a24]">{m.matches}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1.5 font-bold">
                      <span className="text-[#630ed4]">{m.wins}</span>
                      <span className="text-[#ccc3d8]">/</span>
                      <span className="text-[#4a4455]">{m.losses}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full max-w-[200px] space-y-1">
                      <div className="flex justify-between text-xs font-bold text-[#630ed4]">
                        <span>{m.winRate}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#e8dfee] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            m.winRate >= 60 ? 'bg-[#630ed4]' : m.winRate >= 50 ? 'bg-[#7c3aed]' : 'bg-[#ba1a1a]'
                          }`}
                          style={{ width: `${m.winRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#630ed4] hover:bg-[#630ed4]/10 p-2 rounded-lg transition-colors">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
