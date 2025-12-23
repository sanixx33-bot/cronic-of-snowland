
import React from 'react';

const Lore: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-cinzel text-sky-100 tracking-tighter">Хроники Полночи</h1>
        <div className="h-1 w-24 bg-sky-900 mx-auto"></div>
      </header>

      <div className="prose prose-invert prose-sky max-w-none space-y-12 text-slate-300 leading-loose">
        <section className="space-y-4">
          <h2 className="text-2xl font-cinzel text-sky-400">Происхождение Снежгарда</h2>
          <p>
            Снежгард не всегда был ледяной пустыней. Тысячу лет назад это был край вечного праздника, 
            где магия радости питала города и защищала от внешних угроз. Но жадность правителей 
            и забвение истинного смысла Дарения привели к тому, что магия начала остывать.
          </p>
        </section>

        <section className="space-y-4 p-8 bg-sky-950/20 border-l-4 border-sky-800 italic">
          <h2 className="text-2xl font-cinzel text-sky-400 not-italic">Что такое Полночь?</h2>
          <p>
            Это не просто время суток. Это магическая аномалия, пожирающая свет и надежду. 
            В Снежгарде Полночь длится уже триста лет. Солнце лишь на мгновение показывается на горизонте, 
            прежде чем снова скрыться за тяжелыми свинцовыми тучами. В это время тени оживают, 
            а старые легенды выходят на охоту.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-cinzel text-sky-400">Король Без-Праздника</h2>
          <p>
            Никто не знает его настоящего имени. Говорят, он был первым эльфом, который перестал верить. 
            Теперь он восседает на Троне Инея в самом центре Ледяного Полюса. Его цель проста — 
            уничтожить всякое напоминание о тепле, превратив мир в идеальный, неподвижный кристалл.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 pt-8">
          <div className="frost-glass p-6 rounded-xl">
             <h3 className="text-xl font-cinzel text-sky-300 mb-2">Судьба Мира</h3>
             <p className="text-sm">Если до следующего боя курантов герои не найдут Изначальную Свечу, мир погрузится в абсолютный нуль, где даже мысли замерзают.</p>
          </div>
          <div className="frost-glass p-6 rounded-xl">
             <h3 className="text-xl font-cinzel text-sky-300 mb-2">Роль Героев</h3>
             <p className="text-sm">Вы — искатели, защитники и, возможно, последние безумцы, верящие, что рассвет все еще возможен. Ваша задача — не просто выжить, а вернуть огонь.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lore;
