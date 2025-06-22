import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, ChevronLeft, ChevronRight, User, Settings } from 'lucide-react';
import { RootState } from '../store';
import { setSearchQuery, setCurrentView } from '../store/slices/appSlice';
import { setSearchResults } from '../store/slices/musicSlice';

const TopBar: React.FC = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state: RootState) => state.app);
  const { tracks, playlists, albums } = useSelector((state: RootState) => state.music);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
    
    if (query.trim()) {
      // Filter results based on query
      const filteredTracks = tracks.filter(
        track => 
          track.title.toLowerCase().includes(query.toLowerCase()) ||
          track.artist.toLowerCase().includes(query.toLowerCase()) ||
          track.album.toLowerCase().includes(query.toLowerCase())
      );
      
      const filteredPlaylists = playlists.filter(
        playlist => 
          playlist.name.toLowerCase().includes(query.toLowerCase()) ||
          playlist.description.toLowerCase().includes(query.toLowerCase())
      );
      
      const filteredAlbums = albums.filter(
        album => 
          album.title.toLowerCase().includes(query.toLowerCase()) ||
          album.artist.toLowerCase().includes(query.toLowerCase())
      );

      dispatch(setSearchResults({
        tracks: filteredTracks,
        playlists: filteredPlaylists,
        albums: filteredAlbums
      }));

      dispatch(setCurrentView('search'));
    }
  };

  return (
    <div className="bg-black bg-opacity-70 backdrop-blur-md text-white p-4 flex items-center justify-between">
      {/* Navigation Controls */}
      <div className="flex items-center space-x-4">
        <button className="bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button className="bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-lg mx-8">
        <div 
          className={`relative transition-all duration-300 ${
            isSearchFocused ? 'scale-105' : ''
          }`}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:bg-opacity-30 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* User Controls */}
      <div className="flex items-center space-x-3">
        <button className="bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200">
          <Settings className="h-5 w-5" />
        </button>
        <div className="bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200">
          <User className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;