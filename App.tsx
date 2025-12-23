
import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './views/Home';
import Lore from './views/Lore';
import Encyclopedia from './views/Encyclopedia';
import Bestiary from './views/Bestiary';
import CharacterCreator from './views/CharacterCreator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home onNavigate={setActiveTab} />;
      case 'lore': return <Lore />;
      case 'wiki': return <Encyclopedia />;
      case 'bestiary': return <Bestiary />;
      case 'creator': return <CharacterCreator />;
      default: return <Home onNavigate={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
