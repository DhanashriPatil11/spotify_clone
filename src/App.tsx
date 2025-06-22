import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Player from './components/Player';
import Home from './components/Home';
import Search from './components/Search';
import PlaylistView from './components/PlaylistView';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const MainContent: React.FC = () => {
  const { currentView } = useSelector((state: RootState) => state.app);

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'search':
        return <Search />;
      case 'playlist':
        return <PlaylistView />;
      case 'library':
        return <div className="text-white p-6"><h1 className="text-2xl font-bold">Your Library</h1></div>;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
          {renderContent()}
        </main>
        <Player />
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <MainContent />
    </Provider>
  );
}

export default App;