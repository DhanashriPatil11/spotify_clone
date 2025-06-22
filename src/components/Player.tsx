import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  Heart,
  Maximize2
} from 'lucide-react';
import { RootState } from '../store';
import { 
  togglePlayPause, 
  nextTrack, 
  previousTrack, 
  toggleShuffle, 
  toggleRepeat,
  setVolume 
} from '../store/slices/playerSlice';
import { addToFavorites, removeFromFavorites } from '../store/slices/musicSlice';

const Player: React.FC = () => {
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player);
  const { favoriteTrackIds } = useSelector((state: RootState) => state.music);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleFavoriteToggle = () => {
    if (!player.currentTrack) return;
    
    if (favoriteTrackIds.includes(player.currentTrack.id)) {
      dispatch(removeFromFavorites(player.currentTrack.id));
    } else {
      dispatch(addToFavorites(player.currentTrack.id));
    }
  };

  const progressPercentage = player.duration > 0 ? (player.currentTime / player.duration) * 100 : 0;

  if (!player.currentTrack) {
    return null;
  }

  return (
    <div className="bg-gray-900 border-t border-gray-800 text-white p-4">
      <div className="flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center space-x-4 w-1/4">
          <img 
            src={player.currentTrack.imageUrl} 
            alt={player.currentTrack.title}
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{player.currentTrack.title}</p>
            <p className="text-xs text-gray-400 truncate">{player.currentTrack.artist}</p>
          </div>
          <button
            onClick={handleFavoriteToggle}
            className={`transition-colors duration-200 ${
              favoriteTrackIds.includes(player.currentTrack.id)
                ? 'text-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Heart className="h-4 w-4" fill={favoriteTrackIds.includes(player.currentTrack.id) ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 w-1/2">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleShuffle())}
              className={`transition-colors duration-200 ${
                player.shuffle ? 'text-green-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Shuffle className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => dispatch(previousTrack())}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => dispatch(togglePlayPause())}
              className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform duration-200"
            >
              {player.isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => dispatch(nextTrack())}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <SkipForward className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => dispatch(toggleRepeat())}
              className={`transition-colors duration-200 ${
                player.repeat !== 'none' ? 'text-green-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Repeat className="h-4 w-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-xs text-gray-400">{formatTime(player.currentTime)}</span>
            <div className="flex-1 bg-gray-600 rounded-full h-1 cursor-pointer group">
              <div 
                className="bg-white rounded-full h-1 transition-all duration-200 group-hover:bg-green-500 relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
            </div>
            <span className="text-xs text-gray-400">{formatTime(player.duration)}</span>
          </div>
        </div>

        {/* Volume and Additional Controls */}
        <div className="flex items-center space-x-3 w-1/4 justify-end">
          <Maximize2 className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4 text-gray-400" />
            <div className="w-20 bg-gray-600 rounded-full h-1 cursor-pointer group">
              <div 
                className="bg-white rounded-full h-1 transition-all duration-200 group-hover:bg-green-500 relative"
                style={{ width: `${player.volume * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;