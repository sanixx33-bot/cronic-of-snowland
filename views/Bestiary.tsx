
import React, { useState } from 'react';
import { MONSTERS } from '../constants';
import { Monster } from '../types';

const Bestiary: React.FC = () => {
  const [filter, setFilter] = useState<Monster['category'] | 'all'>('all');
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);

  const filteredMonsters = MONSTERS.filter(m => filter === 'all' || m.category === filter);

  const categories = [
    { id: 'all', label: 'Все' },
    { id: 'minor', label: 'Мелкие' },
    { id: 'pack', label: 'Стаи' },
    { id: 'elite', label: 'Элита' },
    { id: 'miniboss', label: 'Мини-боссы' },
    { id: 'boss', label: 'Боссы' },
    { id: 'legend', label: 'Легенды' },
  ];

  const getLevelColor = (level: number) => {
    if (level >= 9) return 'text-red-500 border-red-500';
    if (level >= 7) return 'text-orange-500 border-orange-500';
    if (level >= 4) return 'text-yellow-500 border-yellow-500';
    return 'text-sky-400 border-sky-400';
  };

  return (
    <div className="space-y-8 py-6">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
            <h1 className="text-4xl font-cinzel text-sky-100 uppercase tracking-tighter">Бестиарий Снежгарда</h1>
            <p className="text-slate-400 italic">«Если ты видишь его глаза в метели — ты уже мертв. Если не видишь — беги еще быстрее.»</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4 py-1 text-[10px] font-cinzel border rounded-sm transition-all uppercase tracking-widest ${
                filter === cat.id ? 'bg-red-900 border-red-500 text-white' : 'border-white/10 text-slate-500 hover:text-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMonsters.map(monster => (
          <div 
            key={monster.id} 
            onClick={() => setSelectedMonster(monster)}
            className="frost-glass overflow-hidden rounded-xl flex flex-col border border-white/5 hover:border-red-900/40 transition-all group cursor-pointer hover:translate-y-[-4px]"
          >
            <div className="p-5 flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-cinzel text-sky-100 group-hover:text-red-400 transition-colors">{monster.name}</h3>
                <span className={`text-[10px] px-2 py-0.5 border rounded-sm font-bold bg-black/40 ${getLevelColor(monster.threatLevel)}`}>
                  УР: {monster.threatLevel}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 italic">{monster.description}</p>
              <div className="flex flex-wrap gap-1">
                {monster.abilities?.slice(0, 3).map(a => (
                  <span key={a} className="text-[8px] px-2 py-0.5 bg-red-900/10 text-red-300 border border-red-900/20 uppercase font-bold tracking-tighter">
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-black/20 p-2 text-center text-[8px] uppercase tracking-widest text-slate-500 font-bold border-t border-white/5">
              Нажмите для изучения архива
            </div>
          </div>
        ))}
      </div>

      {/* Monster Detail Modal */}
      {selectedMonster && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-300">
           <div className="parchment-sheet max-w-2xl w-full p-8 md:p-12 rounded-sm shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-y-auto max-h-[90vh] border-8 border-double border-slate-900/10">
              <button 
                onClick={() => setSelectedMonster(null)}
                className="absolute top-4 right-4 text-slate-800 hover:text-red-900 text-3xl font-bold transition-colors"
              >✕</button>
              
              <div className="flex justify-between items-baseline border-b-2 border-slate-900 pb-2 mb-8">
                 <h2 className="text-4xl gothic-text text-slate-900">{selectedMonster.name}</h2>
                 <span className={`text-xl font-cinzel font-bold ${getLevelColor(selectedMonster.threatLevel)}`}>Уровень: {selectedMonster.threatLevel}</span>
              </div>

              <div className="space-y-8 font-serif text-slate-900 leading-relaxed">
                 <section className="relative pl-6 border-l-4 border-red-900/30">
                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2 font-cinzel">Летопись Ужаса</h4>
                    <p className="italic text-lg">"{selectedMonster.description}"</p>
                 </section>

                 <div className="grid md:grid-cols-2 gap-8">
                    <section className="bg-white/40 p-5 rounded border border-slate-300">
                       <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-3 font-cinzel">Повадки и Тактика</h4>
                       <p className="text-sm">{selectedMonster.behavior}</p>
                    </section>
                    <section className="bg-slate-900/5 p-5 rounded border border-slate-300">
                       <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-3 font-cinzel">Мистическая Роль</h4>
                       <p className="text-sm font-bold text-red-900">{selectedMonster.role}</p>
                    </section>
                 </div>

                 <section className="pt-4">
                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-4 font-cinzel">Проявленные Силы</h4>
                    <div className="flex flex-wrap gap-3">
                       {selectedMonster.abilities.map(a => (
                         <div key={a} className="px-4 py-2 bg-slate-900 text-white rounded-sm text-xs font-cinzel uppercase tracking-widest shadow-md">
                           {a}
                         </div>
                       ))}
                    </div>
                 </section>
              </div>

              <div className="mt-12 pt-6 border-t border-slate-900/20 flex flex-col items-center gap-4 opacity-40">
                 <div className="text-[9px] uppercase tracking-widest font-bold">Архивы Снежного Мудреца</div>
                 <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
                    <path d="M0 10 L25 10 M35 10 L60 10 M30 5 L30 15" stroke="currentColor" strokeWidth="1"/>
                 </svg>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Bestiary;
