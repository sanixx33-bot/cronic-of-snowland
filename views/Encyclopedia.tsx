
import React, { useState } from 'react';
import { RACES, CLASSES, ARTIFACTS } from '../constants';
import { Race, Class, Artifact } from '../types';

const Encyclopedia: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'races' | 'classes' | 'artifacts'>('races');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const filteredData = () => {
    const term = searchTerm.toLowerCase();
    if (activeSubTab === 'races') return RACES.filter(r => r.name.toLowerCase().includes(term) || r.description.toLowerCase().includes(term));
    if (activeSubTab === 'classes') return CLASSES.filter(c => c.name.toLowerCase().includes(term) || c.playstyle.toLowerCase().includes(term));
    return ARTIFACTS.filter(a => a.name.toLowerCase().includes(term));
  };

  return (
    <div className="space-y-10 py-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/10 shadow-lg">
          {(['races', 'classes', 'artifacts'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-6 py-2 rounded-lg font-cinzel text-sm uppercase transition-all ${
                activeSubTab === tab ? 'bg-sky-900 text-sky-100 shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab === 'races' ? 'Расы' : tab === 'classes' ? 'Классы' : 'Артефакты'}
            </button>
          ))}
        </div>
        <input 
          type="text" 
          placeholder="Поиск по архивам..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2 w-full md:w-64 focus:outline-none focus:border-sky-500/50 text-sky-100 shadow-inner"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData().map((item: any) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedItem(item)}
            className="frost-glass p-6 rounded-2xl border-white/5 hover:border-sky-500/30 transition-all flex flex-col group cursor-pointer hover:scale-[1.02]"
          >
            <h3 className="text-xl font-cinzel text-sky-200 mb-3 group-hover:text-sky-400 transition-colors">{item.name}</h3>
            <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">{item.description}</p>
            
            <div className="mt-auto space-y-3 pt-4 border-t border-white/5">
              {activeSubTab === 'races' && (
                <>
                  <div className="text-[10px] uppercase tracking-widest text-sky-500/60 font-bold">Способности</div>
                  <div className="flex flex-wrap gap-2">
                    {/* Fixed: Replaced object split with property access */}
                    {(item as Race).abilities?.map(a => <span key={a.name} className="px-2 py-1 bg-sky-900/30 rounded text-[9px] text-sky-300 border border-sky-500/20">{a.name}</span>)}
                  </div>
                </>
              )}
              {activeSubTab === 'classes' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Роль:</span>
                    <span className="text-xs text-sky-400 font-bold uppercase tracking-wider">{(item as Class).role}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 italic">{(item as Class).mechanic}</div>
                </>
              )}
              {activeSubTab === 'artifacts' && (
                <div className="text-[10px] text-amber-400 font-bold uppercase tracking-tighter">Нажми для подробностей</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="parchment-sheet max-w-2xl w-full p-8 rounded-lg shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-slate-800 hover:text-red-800 text-2xl"
            >✕</button>
            <h2 className="text-4xl gothic-text mb-6 border-b border-slate-900 pb-2">{selectedItem.name}</h2>
            
            <div className="space-y-6 font-serif text-slate-900 leading-relaxed">
              <section>
                <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Описание</h4>
                <p className="italic text-lg">"{selectedItem.description}"</p>
              </section>

              {activeSubTab === 'artifacts' && (
                <>
                  <section className="bg-white/40 p-4 rounded border border-slate-300">
                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Эффект</h4>
                    <p className="font-bold text-sky-900">{(selectedItem as Artifact).effect}</p>
                  </section>
                  <section>
                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Ограничения</h4>
                    <p>{(selectedItem as Artifact).limitations}</p>
                  </section>
                  <section>
                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Влияние на мир</h4>
                    <p>{(selectedItem as Artifact).worldImpact}</p>
                  </section>
                </>
              )}

              {activeSubTab === 'races' && (
                <>
                  <section>
                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Внешний вид</h4>
                    <p>{(selectedItem as Race).appearance}</p>
                  </section>
                  <section>
                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Способности (D&D Style)</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {/* Fixed: Replaced object split with property access */}
                      {(selectedItem as Race).abilities?.map(a => <li key={a.name}><strong>{a.name}:</strong> {a.desc}</li>)}
                    </ul>
                  </section>
                </>
              )}

              {activeSubTab === 'classes' && (
                <>
                  <section className="bg-sky-900/10 p-4 rounded border border-sky-900/20">
                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Стиль игры</h4>
                    <p>{(selectedItem as Class).playstyle}</p>
                  </section>
                  <section>
                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Умения (D&D Style)</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {/* Fixed: Replaced object split with property access */}
                      {(selectedItem as Class).startingSkills?.map(s => <li key={s.name}><strong>{s.name}:</strong> {s.desc}</li>)}
                    </ul>
                  </section>
                </>
              )}
            </div>
            
            <div className="mt-10 pt-4 border-t border-slate-900 flex justify-center">
               <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                  <circle cx="25" cy="25" r="23" stroke="black" strokeWidth="1"/>
                  <circle cx="25" cy="25" r="18" fill="black" opacity="0.1"/>
                  <path d="M25 10 L25 40 M10 25 L40 25" stroke="black" strokeWidth="0.5"/>
               </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Encyclopedia;
