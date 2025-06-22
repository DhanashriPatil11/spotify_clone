import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Home, Search, Library, Plus, Heart, Music, Disc, Radio, User } from 'lucide-react';
import { RootState } from '../store';
import { setCurrentView, setSelectedPlaylist } from '../store/slices/appSlice';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { currentView } = useSelector((state: RootState) => state.app);
  const { playlists } = useSelector((state: RootState) => state.music);

  const navigationItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'library', icon: Library, label: 'Your Library' },
  ];

  const handleNavClick = (view: string) => {
    dispatch(setCurrentView(view as any));
    if (view !== 'playlist') {
      dispatch(setSelectedPlaylist(null));
    }
  };

  const handlePlaylistClick = (playlistId: string) => {
    dispatch(setCurrentView('playlist'));
    dispatch(setSelectedPlaylist(playlistId));
  };

  return (
    <div className="bg-black text-white w-64 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Music className="h-8 w-8 text-green-500" />
          <span className="text-xl font-bold">Spotify 2.0</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Library Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">
              Library
            </span>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <ul className="space-y-1 mt-3">
            <li>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
                <Heart className="h-4 w-4" />
                <span className="text-sm">Liked Songs</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
                <Disc className="h-4 w-4" />
                <span className="text-sm">Recently Played</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
                <Radio className="h-4 w-4" />
                <span className="text-sm">Radio</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Playlists */}
        <div className="mt-6">
          <ul className="space-y-1">
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <button
                  onClick={() => handlePlaylistClick(playlist.id)}
                  className="w-full text-left px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm truncate"
                >
                  {playlist.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-800 rounded-full p-2">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">Dhanashri Patil</p>
            <p className="text-xs text-gray-400">Premium User</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;