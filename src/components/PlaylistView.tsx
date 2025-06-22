import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Play, Heart, MoreHorizontal, Clock } from 'lucide-react';
import { RootState } from '../store';
import { setCurrentTrack, setQueue, setIsPlaying } from '../store/slices/playerSlice';
import TrackList from './TrackList';

const PlaylistView: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedPlaylist } = useSelector((state: RootState) => state.app);
  const { playlists } = useSelector((state: RootState) => state.music);
  
  const playlist = playlists.find(p => p.id === selectedPlaylist);

  if (!playlist) {
    return (
      <div className="text-white p-6">
        <p className="text-gray-400">Playlist not found</p>
      </div>
    );
  }

  const handlePlayAll = () => {
    if (playlist.tracks.length > 0) {
      dispatch(setCurrentTrack(playlist.tracks[0]));
      dispatch(setQueue(playlist.tracks));
      dispatch(setIsPlaying(true));
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  return (
    <div className="text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-green-800 to-gray-900 p-8">
        <div className="flex items-end space-x-6">
          <img 
            src={playlist.imageUrl} 
            alt={playlist.name}
            className="w-60 h-60 rounded-lg shadow-2xl object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-medium uppercase tracking-wider">Playlist</p>
            <h1 className="text-6xl font-bold mt-2 mb-4">{playlist.name}</h1>
            <p className="text-gray-300 mb-4">{playlist.description}</p>
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-medium">{playlist.owner}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{playlist.tracks.length} songs</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{formatDuration(playlist.totalDuration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-b from-gray-900 to-black p-6">
        <div className="flex items-center space-x-6">
          <button
            onClick={handlePlayAll}
            className="bg-green-500 hover:bg-green-400 text-black rounded-full p-4 transition-all duration-200 hover:scale-105"
          >
            <Play className="h-6 w-6" fill="currentColor" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            <Heart className="h-8 w-8" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            <MoreHorizontal className="h-8 w-8" />
          </button>
        </div>
      </div>

      {/* Track List */}
      <div className="px-6 pb-6">
        <TrackList tracks={playlist.tracks} />
      </div>
    </div>
  );
};

export default PlaylistView;