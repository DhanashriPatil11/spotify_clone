import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clock, Play, Heart, MoreHorizontal } from 'lucide-react';
import { Track } from '../types';
import { RootState } from '../store';
import { setCurrentTrack, setQueue, setIsPlaying } from '../store/slices/playerSlice';
import { addToFavorites, removeFromFavorites } from '../store/slices/musicSlice';

interface TrackListProps {
  tracks: Track[];
  showHeader?: boolean;
  showAlbum?: boolean;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, showHeader = true, showAlbum = true }) => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector((state: RootState) => state.player);
  const { favoriteTrackIds } = useSelector((state: RootState) => state.music);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlayTrack = (track: Track, index: number) => {
    dispatch(setCurrentTrack(track));
    dispatch(setQueue(tracks));
    dispatch(setIsPlaying(true));
  };

  const handleFavoriteToggle = (trackId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favoriteTrackIds.includes(trackId)) {
      dispatch(removeFromFavorites(trackId));
    } else {
      dispatch(addToFavorites(trackId));
    }
  };

  return (
    <div className="text-white">
      {showHeader && (
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs text-gray-400 uppercase tracking-wider border-b border-gray-800">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Title</div>
          {showAlbum && <div className="col-span-3">Album</div>}
          <div className="col-span-2">Date Added</div>
          <div className="col-span-1 flex justify-end">
            <Clock className="h-4 w-4" />
          </div>
        </div>
      )}

      <div className="space-y-1">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            onClick={() => handlePlayTrack(track, index)}
            className={`grid grid-cols-12 gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group ${
              currentTrack?.id === track.id
                ? 'bg-green-500 bg-opacity-20'
                : 'hover:bg-white hover:bg-opacity-10'
            }`}
          >
            <div className="col-span-1 flex items-center">
              {currentTrack?.id === track.id && isPlaying ? (
                <div className="flex space-x-1">
                  <div className="w-1 h-4 bg-green-500 animate-pulse rounded-full delay-0"></div>
                  <div className="w-1 h-4 bg-green-500 animate-pulse rounded-full delay-100"></div>
                  <div className="w-1 h-4 bg-green-500 animate-pulse rounded-full delay-200"></div>
                </div>
              ) : (
                <span className="text-gray-400 group-hover:hidden text-sm">
                  {index + 1}
                </span>
              )}
              <Play className="h-4 w-4 hidden group-hover:block text-white" />
            </div>

            <div className="col-span-5 flex items-center space-x-3">
              <img 
                src={track.imageUrl} 
                alt={track.title}
                className="w-10 h-10 rounded object-cover"
              />
              <div className="min-w-0">
                <p className={`font-medium truncate ${
                  currentTrack?.id === track.id ? 'text-green-500' : ''
                }`}>
                  {track.title}
                </p>
                <p className="text-gray-400 text-sm truncate">{track.artist}</p>
              </div>
            </div>

            {showAlbum && (
              <div className="col-span-3 flex items-center">
                <p className="text-gray-400 text-sm truncate hover:text-white transition-colors cursor-pointer">
                  {track.album}
                </p>
              </div>
            )}

            <div className="col-span-2 flex items-center">
              <p className="text-gray-400 text-sm">
                {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="col-span-1 flex items-center justify-end space-x-2">
              <button
                onClick={(e) => handleFavoriteToggle(track.id, e)}
                className={`transition-colors duration-200 ${
                  favoriteTrackIds.includes(track.id)
                    ? 'text-green-500'
                    : 'text-gray-400 hover:text-white opacity-0 group-hover:opacity-100'
                }`}
              >
                <Heart 
                  className="h-4 w-4" 
                  fill={favoriteTrackIds.includes(track.id) ? 'currentColor' : 'none'} 
                />
              </button>
              <span className="text-gray-400 text-sm">{formatDuration(track.duration)}</span>
              <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackList;