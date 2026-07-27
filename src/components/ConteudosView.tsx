import React from 'react';

export const ConteudosView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Featured Banner Hero */}
      <section>
        <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer border border-[#ccc3d8] bg-black">
          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=60"
            alt="Lotus Map Tactics"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#630ed4]/90 via-[#630ed4]/50 to-transparent flex items-center px-10">
            <div className="max-w-md text-white">
              <span className="bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">
                EM DESTAQUE
              </span>
              <h3 className="text-2xl font-bold mb-2">Dominando o Controle de Mapa em Lotus</h3>
              <p className="text-xs opacity-90 mb-5 leading-relaxed">
                Aprenda as novas táticas de rotação e posicionamento defensivo no mapa mais recente do cenário competitivo.
              </p>
              <button className="bg-white text-[#630ed4] px-5 py-2.5 rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-md">
                <span className="material-symbols-outlined fill-1 text-[20px]">play_circle</span>
                Continuar de onde parou
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-xl border border-[#ccc3d8] flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-[#7c3aed]/10 rounded-full flex items-center justify-center text-[#630ed4]">
            <span className="material-symbols-outlined">auto_stories</span>
          </div>
          <div>
            <p className="text-xs text-[#7b7487] font-semibold uppercase tracking-wider">Aulas Totais</p>
            <p className="text-2xl font-bold text-[#1d1a24]">124</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#ccc3d8] flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800">
            <span className="material-symbols-outlined">schedule</span>
          </div>
          <div>
            <p className="text-xs text-[#7b7487] font-semibold uppercase tracking-wider">Horas de Estudo</p>
            <p className="text-2xl font-bold text-[#1d1a24]">32.5h</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#ccc3d8] flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700">
            <span className="material-symbols-outlined">task_alt</span>
          </div>
          <div>
            <p className="text-xs text-[#7b7487] font-semibold uppercase tracking-wider">Concluídas</p>
            <p className="text-2xl font-bold text-[#1d1a24]">48</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#ccc3d8] flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-[#7c3aed]/20 rounded-full flex items-center justify-center text-[#630ed4]">
            <span className="material-symbols-outlined">emoji_events</span>
          </div>
          <div>
            <p className="text-xs text-[#7b7487] font-semibold uppercase tracking-wider">Rank de Estudo</p>
            <p className="text-2xl font-bold text-[#1d1a24]">#14</p>
          </div>
        </div>
      </div>

      {/* Módulos de Treinamento */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-xl font-bold text-[#1d1a24]">Módulos de Treinamento</h3>
            <p className="text-xs text-[#4a4455] mt-0.5">Trilhas de conhecimento estruturadas para alta performance.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3.5 py-1.5 border border-[#ccc3d8] rounded-lg text-xs font-bold text-[#1d1a24] bg-[#e3e1ed]">
              Todos
            </button>
            <button className="px-3.5 py-1.5 border border-[#ccc3d8] rounded-lg text-xs font-bold text-[#4a4455] hover:bg-[#f9f1ff]">
              Em Progresso
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Module 1: Fundamentals */}
          <div className="bg-white border border-[#ccc3d8] rounded-xl overflow-hidden flex flex-col group hover:shadow-md transition-all shadow-xs">
            <div className="h-40 relative bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=60"
                alt="Fundamentals"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-[#630ed4] border border-[#630ed4]/20">
                OBRIGATÓRIO
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1 space-y-3">
              <div>
                <h4 className="text-base font-bold text-[#1d1a24] group-hover:text-[#630ed4] transition-colors">Fundamentals</h4>
                <p className="text-xs text-[#4a4455] mt-1">Mecânicas de tiro, movimentação e recoil control.</p>
              </div>
              <div className="mt-auto pt-2 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7b7487]">Progresso</span>
                  <span className="font-bold text-[#1d1a24]">75%</span>
                </div>
                <div className="w-full h-1.5 bg-[#e3e1ed] rounded-full overflow-hidden">
                  <div className="h-full bg-[#630ed4]" style={{ width: '75%' }} />
                </div>
                <div className="pt-3 border-t border-[#ccc3d8] flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#630ed4]">12 Aulas</span>
                  <span className="text-[11px] text-[#7b7487] italic">Micro-ajustes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Module 2: Game Sense */}
          <div className="bg-white border border-[#ccc3d8] rounded-xl overflow-hidden flex flex-col group hover:shadow-md transition-all shadow-xs">
            <div className="h-40 relative bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&auto=format&fit=crop&q=60"
                alt="Game Sense"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-[#630ed4] border border-[#630ed4]/20">
                ESTRATÉGICO
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1 space-y-3">
              <div>
                <h4 className="text-base font-bold text-[#1d1a24] group-hover:text-[#630ed4] transition-colors">Game Sense</h4>
                <p className="text-xs text-[#4a4455] mt-1">Leitura de mapa, economia e timing de rotação.</p>
              </div>
              <div className="mt-auto pt-2 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7b7487]">Progresso</span>
                  <span className="font-bold text-[#1d1a24]">30%</span>
                </div>
                <div className="w-full h-1.5 bg-[#e3e1ed] rounded-full overflow-hidden">
                  <div className="h-full bg-[#630ed4]" style={{ width: '30%' }} />
                </div>
                <div className="pt-3 border-t border-[#ccc3d8] flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#630ed4]">18 Aulas</span>
                  <span className="text-[11px] text-[#7b7487] italic">Gestão de Orbs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Module 3: Tactics */}
          <div className="bg-white border border-[#ccc3d8] rounded-xl overflow-hidden flex flex-col group hover:shadow-md transition-all shadow-xs">
            <div className="h-40 relative bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=60"
                alt="Tactics"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-[#630ed4] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                COMPETITIVO
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1 space-y-3">
              <div>
                <h4 className="text-base font-bold text-[#1d1a24] group-hover:text-[#630ed4] transition-colors">Tactics</h4>
                <p className="text-xs text-[#4a4455] mt-1">Setups de agentes, lineups e execuções de site.</p>
              </div>
              <div className="mt-auto pt-2 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7b7487]">Progresso</span>
                  <span className="font-bold text-[#1d1a24]">15%</span>
                </div>
                <div className="w-full h-1.5 bg-[#e3e1ed] rounded-full overflow-hidden">
                  <div className="h-full bg-[#630ed4]" style={{ width: '15%' }} />
                </div>
                <div className="pt-3 border-t border-[#ccc3d8] flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#630ed4]">24 Aulas</span>
                  <span className="text-[11px] text-[#7b7487] italic">Viper B-Site</span>
                </div>
              </div>
            </div>
          </div>

          {/* Module 4: Communication */}
          <div className="bg-white border border-[#ccc3d8] rounded-xl overflow-hidden flex flex-col group hover:shadow-md transition-all shadow-xs">
            <div className="h-40 relative bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60"
                alt="Communication"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-[#630ed4] border border-[#630ed4]/20">
                SOFT SKILLS
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1 space-y-3">
              <div>
                <h4 className="text-base font-bold text-[#1d1a24] group-hover:text-[#630ed4] transition-colors">Communication</h4>
                <p className="text-xs text-[#4a4455] mt-1">Calls objetivas, mentalidade de time e liderança.</p>
              </div>
              <div className="mt-auto pt-2 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7b7487]">Progresso</span>
                  <span className="font-bold text-[#1d1a24]">90%</span>
                </div>
                <div className="w-full h-1.5 bg-[#e3e1ed] rounded-full overflow-hidden">
                  <div className="h-full bg-[#630ed4]" style={{ width: '90%' }} />
                </div>
                <div className="pt-3 border-t border-[#ccc3d8] flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#630ed4]">10 Aulas</span>
                  <span className="text-[11px] text-[#7b7487] italic">Callouts Rápidas</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Continuar Assistindo */}
      <div>
        <h3 className="text-lg font-bold text-[#1d1a24] mb-4">Continuar Assistindo</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="flex gap-4 p-4 bg-white border border-[#ccc3d8] rounded-xl group cursor-pointer hover:border-[#630ed4] transition-all shadow-xs">
            <div className="w-28 h-18 rounded-lg overflow-hidden flex-shrink-0 relative bg-black">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&auto=format&fit=crop&q=60"
                alt="Lesson"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[28px]">play_circle</span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-bold text-[#630ed4] uppercase">Game Sense</span>
              <h5 className="text-xs font-bold text-[#1d1a24] group-hover:text-[#630ed4] transition-colors leading-snug mt-0.5">
                04. Leitura de Rotação Mid-Game
              </h5>
              <p className="text-[11px] text-[#7b7487] mt-1">Restam 4 min</p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-white border border-[#ccc3d8] rounded-xl group cursor-pointer hover:border-[#630ed4] transition-all shadow-xs">
            <div className="w-28 h-18 rounded-lg overflow-hidden flex-shrink-0 relative bg-black">
              <img
                src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&auto=format&fit=crop&q=60"
                alt="Lesson"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[28px]">play_circle</span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-bold text-[#630ed4] uppercase">Tactics</span>
              <h5 className="text-xs font-bold text-[#1d1a24] group-hover:text-[#630ed4] transition-colors leading-snug mt-0.5">
                12. Smoke Placements Defensivos
              </h5>
              <p className="text-[11px] text-[#7b7487] mt-1">Restam 12 min</p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-white border border-[#ccc3d8] rounded-xl group cursor-pointer hover:border-[#630ed4] transition-all shadow-xs">
            <div className="w-28 h-18 rounded-lg overflow-hidden flex-shrink-0 relative bg-black">
              <img
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&auto=format&fit=crop&q=60"
                alt="Lesson"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[28px]">play_circle</span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-bold text-[#630ed4] uppercase">Fundamentals</span>
              <h5 className="text-xs font-bold text-[#1d1a24] group-hover:text-[#630ed4] transition-colors leading-snug mt-0.5">
                08. Técnica de Pre-Aim avançada
              </h5>
              <p className="text-[11px] text-[#7b7487] mt-1">Restam 1 min</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
