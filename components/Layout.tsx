import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Главная', icon: '❄️' },
    { id: 'lore', label: 'Лор', icon: '📜' },
    { id: 'wiki', label: 'Энциклопедия', icon: '📚' },
    { id: 'bestiary', label: 'Бестиарий', icon: '👹' },
    { id: 'creator', label: 'Герой', icon: '⚔️' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#05070a] relative overflow-x-hidden">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 frost-glass md:h-screen sticky top-0 md:flex flex-col border-b md:border-b-0 md:border-r border-white/10 p-4 shrink-0 overflow-y-auto z-[100]">
        <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-sky-900 rounded-full flex items-center justify-center text-xl shadow-lg shadow-sky-500/20">❄️</div>
            <h1 className="text-xl font-cinzel font-bold text-sky-100 tracking-wider">Снежгард</h1>
        </div>
        
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 whitespace-nowrap ${
                activeTab === item.id 
                  ? 'bg-sky-900/60 text-sky-200 border border-sky-500/50 shadow-lg shadow-sky-500/10' 
                  : 'text-slate-400 hover:text-sky-300 hover:bg-white/5'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-cinzel text-xs uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-8 hidden md:block">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[10px] text-slate-500 italic leading-relaxed">
                "Когда часы пробьют тринадцатый раз, Полночь станет вечной... Снежгард ждет своих героев."
            </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative bg-gradient-to-br from-[#05070a] via-[#0a1118] to-black z-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 animate-in fade-in duration-1000">
            {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;