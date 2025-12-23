
import React from 'react';

const Home: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 py-10">
      <section className="text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-b from-sky-100 via-sky-300 to-sky-900 drop-shadow-2xl">
          Хроники Снежгарда
        </h1>
        <p className="text-xl md:text-2xl text-sky-200/70 max-w-2xl mx-auto italic font-serif">
          Мир, где Рождество умерло, а Полночь длится вечно. 
          Станешь ли ты свечой во тьме или обратишься в лед?
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <button 
            onClick={() => onNavigate('creator')}
            className="px-8 py-4 bg-sky-900 hover:bg-sky-800 text-white font-cinzel rounded-sm border border-sky-400/50 transition-all shadow-lg shadow-sky-500/20 uppercase tracking-widest"
          >
            Создать героя
          </button>
          <button 
            onClick={() => onNavigate('wiki')}
            className="px-8 py-4 bg-transparent hover:bg-white/5 text-sky-200 font-cinzel rounded-sm border border-white/20 transition-all uppercase tracking-widest"
          >
            Изучить мир
          </button>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Тёмный Мир", text: "Снежгард — это не сказка. Это замерзший ад, где за каждой дверью таится тень." },
          { title: "Забытые Расы", text: "От эльфов полюса до живых снеговиков — выберите свою судьбу." },
          { title: "Система Синергий", text: "Ваше происхождение и навыки создают уникальные архетипы силы." }
        ].map((feat, i) => (
          <div key={i} className="frost-glass p-8 rounded-2xl border-white/5 hover:border-sky-500/30 transition-all group">
            <h3 className="text-xl font-cinzel text-sky-300 mb-4 group-hover:text-sky-100">{feat.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feat.text}</p>
          </div>
        ))}
      </div>

      <section className="relative p-12 rounded-3xl overflow-hidden border border-white/10">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 grayscale" style={{ backgroundImage: "url('https://picsum.photos/1200/600?grayscale&blur=2')" }}></div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-cinzel text-sky-100">Пророчество Вечной Стужи</h2>
          <p className="text-lg text-slate-300 max-w-3xl">
            "Когда Король Без-Праздника задует последнюю свечу на Изначальной Ёлке, время остановится. 
            Снежинки превратятся в стальные лезвия, а сердца людей покроются коркой черного льда. 
            Только те, кто помнит вкус тепла, смогут бросить вызов Полночи."
          </p>
          <div className="pt-4">
             <span className="text-xs uppercase tracking-widest text-sky-500/60">— Из летописей Снежного Мудреца</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
