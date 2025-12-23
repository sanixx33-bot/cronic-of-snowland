import React, { useState, useMemo, useEffect, useRef } from 'react';
import { RACES, CLASSES, SYNERGIES } from '../constants';
import { Character, Synergy, CustomSkill } from '../types';

const STAT_NAMES = { str: 'Сила', dex: 'Ловкость', con: 'Телосложение', int: 'Интеллект', wis: 'Мудрость', cha: 'Харизма' };
const DAMAGE_TYPES = ['Холод', 'Огонь', 'Некроз', 'Свет', 'Рубящий', 'Колющий', 'Дробящий', 'Яд', 'Звук'];
const DICE_TYPES = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];

declare var html2canvas: any;

const CharacterCreator: React.FC = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [char, setChar] = useState<Character>({
    name: '', raceId: RACES[0].id, classId: CLASSES[0].id, age: '25', height: '180 см',
    appearance: '', backstory: '', traits: '', fears: '', desires: '', holidayAttitude: '',
    stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    inventory: [], artifacts: [],
    customSkills: [
      { name: 'Личный Дар I', dice: 'd6', damageType: 'Холод', description: '' },
      { name: 'Личный Дар II', dice: 'd6', damageType: 'Холод', description: '' }
    ]
  });

  const [showSynergyPopup, setShowSynergyPopup] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const synergy = useMemo(() => SYNERGIES.find(s => s.raceId === char.raceId && s.classId === char.classId), [char.raceId, char.classId]);
  
  useEffect(() => {
    if (synergy) {
      setShowSynergyPopup(true);
      const timer = setTimeout(() => setShowSynergyPopup(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [synergy]);

  const activeRace = RACES.find(r => r.id === char.raceId);
  const activeClass = CLASSES.find(c => c.id === char.classId);

  const basePoints = useMemo(() => {
    let points = 10;
    if (char.raceId === 'human') points += 5;
    if (char.classId === 'fool') points += 5;
    return points;
  }, [char.raceId, char.classId]);

  const pointsSpent = useMemo(() => {
    return (Object.values(char.stats) as number[]).reduce((acc, val) => acc + (val - 10), 0);
  }, [char.stats]);

  const pointsRemaining = basePoints - pointsSpent;

  const updateStat = (stat: keyof typeof char.stats, delta: number) => {
    if (delta > 0 && pointsRemaining <= 0) return;
    if (delta < 0 && char.stats[stat] <= 10) return;
    setChar(prev => ({
      ...prev,
      stats: { ...prev.stats, [stat]: prev.stats[stat] + delta }
    }));
  };

  const updateCustomSkill = (index: number, field: keyof CustomSkill, value: string) => {
    const newSkills = [...char.customSkills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setChar({ ...char, customSkills: newSkills });
  };

  const handleSaveToGallery = async () => {
    if (!sheetRef.current) return;
    setIsCapturing(true);
    
    try {
      // Небольшая задержка для подготовки UI
      await new Promise(r => setTimeout(r, 200));
      
      const canvas = await html2canvas(sheetRef.current, {
        backgroundColor: '#f4e4bc',
        scale: 2.5,
        useCORS: true,
        logging: false,
        windowWidth: 1200, 
        onclone: (clonedDoc: Document) => {
          const sheet = clonedDoc.querySelector('.character-sheet-printable') as HTMLElement;
          if (sheet) {
            sheet.style.width = '1000px';
            sheet.style.margin = '0 auto';
            sheet.style.padding = '60px';
          }
          
          // 1. Скрываем интерактивные элементы (инпуты, кнопки статов и т.д.)
          clonedDoc.querySelectorAll('.no-print').forEach(el => {
            (el as HTMLElement).style.display = 'none';
          });
          
          // 2. Делаем видимыми текстовые блоки для печати/сохранения
          clonedDoc.querySelectorAll('.no-print-visible-in-clone').forEach(el => {
            (el as HTMLElement).style.display = 'block';
            (el as HTMLElement).classList.remove('hidden');
          });

          // 3. Конвертируем значения полей ввода (Имя, Раса, Класс) в текст
          const inputs = clonedDoc.querySelectorAll('input, select, textarea');
          inputs.forEach(input => {
             const el = input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
             // Пропускаем те, что уже скрыты внутри .no-print
             if (el.closest('.no-print')) return;

             const span = clonedDoc.createElement('span');
             span.textContent = el.value || '';
             span.className = el.className + " inline-block pt-1";
             span.style.border = 'none';
             span.style.background = 'none';
             el.parentNode?.replaceChild(span, el);
          });
        }
      });
      
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `snejgard_hero_${char.name || 'unnamed'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to save character sheet:', err);
      alert("Не удалось сохранить свиток. Попробуйте еще раз.");
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 relative">
      {/* Smooth Synergy Popup */}
      <div 
        className={`fixed inset-0 z-[500] flex items-center justify-center pointer-events-none p-10 transition-all duration-1000 ${
          showSynergyPopup && synergy ? 'opacity-100 backdrop-blur-md' : 'opacity-0'
        }`}
      >
        <div className="bg-black/90 w-full h-full absolute inset-0"></div>
        <div className={`relative text-center transform transition-all duration-1000 ease-out ${showSynergyPopup ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-10 opacity-0'} max-w-xl bg-slate-900/80 p-10 rounded-3xl border border-amber-500/50 shadow-[0_0_80px_rgba(245,158,11,0.3)]`}>
           <div className="text-amber-500 gothic-text text-5xl md:text-7xl mb-4">Легендарная Синергия</div>
           <div className="text-white font-cinzel text-2xl md:text-3xl uppercase tracking-widest font-bold border-y border-white/20 py-4 mb-6">{synergy?.newName}</div>
           <div className="text-sky-300 text-xl font-serif italic mb-6">« {synergy?.specialSkill} »</div>
           <div className="text-slate-400 text-sm leading-relaxed mb-8">{synergy?.description}</div>
        </div>
      </div>

      <div 
        ref={sheetRef}
        className="parchment-sheet p-8 md:p-14 rounded-sm shadow-2xl space-y-10 character-sheet-printable relative overflow-hidden border-double border-8 border-slate-900/5"
      >
        
        <div className="absolute top-10 right-16 opacity-20 -rotate-12 pointer-events-none no-print">
           <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2"/>
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2"/>
              <text x="50" y="55" fontSize="8" fontFamily="Cinzel" textAnchor="middle" fill="currentColor">SNEJGARD APPROVED</text>
           </svg>
        </div>

        <header className="text-center border-b border-slate-900/10 pb-10">
          <h1 className="gothic-text text-5xl mb-3 tracking-tighter text-slate-900">Письмо на Север</h1>
          <p className="font-serif italic text-slate-600 text-xs tracking-wide">«Пусть эти строки достигнут Полюса раньше, чем замерзнет последнее сердце...»</p>
        </header>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <label className="text-[9px] uppercase font-bold text-slate-500 font-cinzel tracking-widest">Имя Героя</label>
            <input 
              value={char.name} 
              onChange={e => setChar({...char, name: e.target.value})} 
              className="w-full bg-transparent border-b border-slate-900/20 text-2xl gothic-text outline-none p-1 focus:border-red-900 transition-colors"
              placeholder="Безымянный Скиталец"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[9px] uppercase font-bold text-slate-500 font-cinzel tracking-widest">Корни (Раса) {char.raceId === 'human' && <span className="text-red-700">(+5 Духа)</span>}</label>
            <select 
              value={char.raceId} 
              onChange={e => setChar({...char, raceId: e.target.value})}
              className="w-full bg-transparent text-lg font-bold border-b border-slate-900/20 outline-none p-1 cursor-pointer"
            >
              {RACES.map(r => <option key={r.id} value={r.id} className="bg-[#f4e4bc]">{r.name}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[9px] uppercase font-bold text-slate-500 font-cinzel tracking-widest">Путь (Класс) {char.classId === 'fool' && <span className="text-red-700">(+5 Духа)</span>}</label>
            <select 
              value={char.classId} 
              onChange={e => setChar({...char, classId: e.target.value})}
              className="w-full bg-transparent text-lg font-bold border-b border-slate-900/20 outline-none p-1 cursor-pointer"
            >
              {CLASSES.map(c => <option key={c.id} value={c.id} className="bg-[#f4e4bc]">{c.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3 space-y-6">
            <div className="bg-slate-900/5 p-3 border border-slate-900/10 rounded-lg text-center no-print">
               <div className="text-[9px] uppercase font-bold text-slate-600 tracking-widest mb-2 font-cinzel">Очки Духа: {pointsRemaining}</div>
               <div className="flex gap-1 justify-center flex-wrap">
                 {Array.from({length: Math.max(10, basePoints)}).map((_, i) => (
                   <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < pointsRemaining ? 'bg-red-800' : 'bg-slate-300 opacity-20'}`}></div>
                 ))}
               </div>
            </div>

            {(Object.keys(char.stats) as Array<keyof typeof char.stats>).map(stat => {
              const base = char.stats[stat];
              const final = base + (synergy?.bonusStats[stat] || 0);
              const mod = Math.floor((final - 10) / 2);
              return (
                <div key={stat} className="flex items-center gap-3">
                  <div className="w-14 h-18 bg-white border border-slate-900/40 rounded flex flex-col items-center justify-center relative shadow-sm">
                    <span className="text-[7px] uppercase font-bold text-slate-400 absolute top-0.5 font-cinzel">{STAT_NAMES[stat]}</span>
                    <div className="text-xl font-bold font-cinzel">{mod >= 0 ? `+${mod}` : mod}</div>
                    <div className="w-8 h-5 border border-slate-900/40 rounded-full flex items-center justify-center text-[9px] font-bold bg-slate-50 absolute -bottom-2">
                      {final}
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5 no-print">
                    <button onClick={() => updateStat(stat, 1)} className="w-5 h-5 bg-slate-800 text-white rounded-sm flex items-center justify-center hover:bg-red-900 text-[8px]">▲</button>
                    <button onClick={() => updateStat(stat, -1)} className="w-5 h-5 bg-slate-800 text-white rounded-sm flex items-center justify-center hover:bg-red-900 text-[8px]">▼</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="md:col-span-9 space-y-10">
            {/* Detailed Skills Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-cinzel font-bold border-b border-slate-900/10 pb-2 uppercase tracking-widest text-red-900">Врожденные Дары ({activeRace?.name})</h3>
                {activeRace?.abilities.map(a => (
                  <div key={a.name} className="bg-white/40 p-3 rounded border border-slate-900/5 group hover:bg-white/60 transition-colors">
                    <div className="font-bold text-xs uppercase mb-1 font-cinzel">{a.name}</div>
                    <div className="text-[10px] italic text-slate-600 leading-relaxed">{a.desc}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-cinzel font-bold border-b border-slate-900/10 pb-2 uppercase tracking-widest text-red-900">Освоенные Навыки ({activeClass?.name})</h3>
                {activeClass?.startingSkills.map(s => (
                  <div key={s.name} className="bg-white/40 p-3 rounded border border-slate-900/5 group hover:bg-white/60 transition-colors">
                    <div className="font-bold text-xs uppercase mb-1 font-cinzel">{s.name}</div>
                    <div className="text-[10px] italic text-slate-600 leading-relaxed">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Talents Section */}
            <div className="space-y-6 pt-6 border-t border-slate-900/10">
               <h3 className="text-sm font-cinzel font-bold uppercase tracking-widest text-red-900">Кузница Личных Даров</h3>
               
               {/* ИНТЕРАКТИВНАЯ ЧАСТЬ (скрывается при сохранении) */}
               <div className="grid md:grid-cols-2 gap-8 no-print">
                  {char.customSkills.map((skill, idx) => (
                    <div key={idx} className="bg-white/50 p-4 rounded-xl border border-slate-900/10 space-y-4">
                       <input 
                         value={skill.name}
                         onChange={(e) => updateCustomSkill(idx, 'name', e.target.value)}
                         className="w-full bg-transparent border-b border-slate-900/20 text-xs font-bold font-cinzel uppercase outline-none"
                         placeholder="Название таланта..."
                       />
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[8px] uppercase block mb-1 text-slate-500">Сила (Мощь)</label>
                            <select 
                              value={skill.dice}
                              onChange={(e) => updateCustomSkill(idx, 'dice', e.target.value)}
                              className="w-full bg-white/50 rounded border border-slate-300 text-[10px] p-1"
                            >
                              {DICE_TYPES.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="text-[8px] uppercase block mb-1 text-slate-500">Стихия (Тип)</label>
                            <select 
                              value={skill.damageType}
                              onChange={(e) => updateCustomSkill(idx, 'damageType', e.target.value)}
                              className="w-full bg-white/50 rounded border border-slate-300 text-[10px] p-1"
                            >
                              {DAMAGE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                       </div>
                       <textarea 
                         value={skill.description}
                         onChange={(e) => updateCustomSkill(idx, 'description', e.target.value)}
                         className="w-full bg-white/30 rounded p-2 text-[10px] font-serif h-16 resize-none outline-none border border-slate-200"
                         placeholder="Опишите, как проявляется этот дар..."
                       />
                    </div>
                  ))}
               </div>

               {/* ВЕРСИЯ ДЛЯ СОХРАНЕНИЯ (становится видимой только в клоне для html2canvas) */}
               <div className="hidden no-print-visible-in-clone space-y-4">
                  {char.customSkills.map((skill, idx) => (
                    <div key={idx} className="border border-slate-900/20 p-4 rounded bg-white/30">
                       <div className="flex justify-between font-cinzel font-bold text-xs border-b border-slate-900/10 pb-1 mb-2">
                         <span className="text-slate-900">{skill.name || `Личный Дар ${idx + 1}`}</span>
                         <span className="text-[9px] text-red-900 uppercase">{skill.dice} • {skill.damageType}</span>
                       </div>
                       <p className="text-[10px] italic font-serif leading-relaxed text-slate-800">
                          {skill.description || 'Пустое описание дара...'}
                       </p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-slate-900/10">
               <div className="space-y-4">
                  <label className="text-[9px] uppercase font-bold block font-cinzel">Летопись жизни:</label>
                  <textarea 
                    className="w-full bg-white/30 rounded-xl p-4 text-xs resize-none outline-none h-48 font-serif leading-relaxed border border-slate-900/10" 
                    placeholder="Запишите вашу историю..."
                    value={char.backstory}
                    onChange={e => setChar({...char, backstory: e.target.value})}
                  />
               </div>
               <div className="space-y-6">
                  {synergy && (
                    <div className="p-4 bg-slate-900 text-white rounded-xl shadow-xl ring-2 ring-amber-500/30 overflow-hidden relative group">
                      <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="text-[8px] uppercase font-bold text-amber-500 tracking-widest mb-1 font-cinzel">Пробужденная Синергия</div>
                      <div className="text-sm font-bold font-cinzel leading-tight text-white">{synergy.newName}</div>
                      <div className="text-[10px] mt-2 font-bold text-sky-300 italic">« {synergy.specialSkill} »</div>
                      <p className="text-[9px] mt-2 opacity-60 leading-relaxed font-serif">{synergy.description}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 no-print">
                    <button 
                      onClick={() => window.print()} 
                      className="w-full bg-slate-800 text-white py-4 rounded-xl font-cinzel text-xs uppercase hover:bg-slate-700 transition-all shadow-md active:scale-95"
                    >
                      📜 Печать
                    </button>
                    <button 
                      onClick={handleSaveToGallery} 
                      disabled={isCapturing}
                      className="w-full bg-red-900 text-white py-4 rounded-xl font-cinzel text-xs uppercase hover:bg-red-800 transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isCapturing ? '⌛ Магия...' : (
                        <>
                          <span className="text-lg">🖼️</span>
                          <span>В Галерею</span>
                        </>
                      )}
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCreator;