import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Play } from 'lucide-react';
import { RootState } from '../store';
import { setCurrentView, setSelectedPlaylist, setSelectedAlbum } from '../store/slices/appSlice';
import { setCurrentTrack, setQueue, setIsPlaying } from '../store/slices/playerSlice';
import { genres } from '../data/mockData';
import TrackList from './TrackList';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state: RootState) => state.app);
  const { searchResults } = useSelector((state: RootState) => state.music);

  const handlePlaylistClick = (playlistId: string) => {
    dispatch(setCurrentView('playlist'));
    dispatch(setSelectedPlaylist(playlistId));
  };

  const handleAlbumClick = (albumId: string) => {
    dispatch(setCurrentView('album'));
    dispatch(setSelectedAlbum(albumId));
  };

  const handleQuickPlay = (trackOrTracks: any) => {
    if (Array.isArray(trackOrTracks)) {
      dispatch(setCurrentTrack(trackOrTracks[0]));
      dispatch(setQueue(trackOrTracks));
    } else {
      dispatch(setCurrentTrack(trackOrTracks));
      dispatch(setQueue([trackOrTracks]));
    }
    dispatch(setIsPlaying(true));
  };

  const genreColors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
    'bg-orange-500', 'bg-cyan-500', 'bg-lime-500', 'bg-rose-500'
  ];

  if (!searchQuery) {
    return (
      <div className="text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Browse all</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {genres.map((genre, index) => (
            <div 
              key={genre}
              className={`${genreColors[index % genreColors.length]} rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform duration-200 relative overflow-hidden`}
            >
              <h3 className="text-xl font-bold text-white mb-4">{genre}</h3>
              <div className="absolute -bottom-2 -right-2 transform rotate-12 opacity-20">
                <div className="w-20 h-20 bg-black rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-white p-6 space-y-8">
      <h1 className="text-2xl font-bold">Search results for "{searchQuery}"</h1>

      {/* Top Result */}
      {searchResults.tracks.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">Top result</h2>
          <div className="bg-gray-900 bg-opacity-40 hover:bg-opacity-60 rounded-lg p-6 cursor-pointer transition-all duration-300 group max-w-sm">
            <div className="flex items-center space-x-4">
              <img 
                src={searchResults.tracks[0].imageUrl} 
                alt={searchResults.tracks[0].title}
                className="w-20 h-20 rounded-lg object-cover shadow-lg"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold truncate mb-2">{searchResults.tracks[0].title}</h3>
                <p className="text-gray-400 truncate">{searchResults.tracks[0].artist}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-gray-800 rounded-full text-xs">
                  Song
                </span>
              </div>
              <button 
                onClick={() => handleQuickPlay(searchResults.tracks[0])}
                className="bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
              >
                <Play className="h-6 w-6 text-black" fill="currentColor" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Songs */}
      {searchResults.tracks.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">Songs</h2>
          <TrackList tracks={searchResults.tracks.slice(0, 5)} showHeader={false} />
        </section>
      )}

      {/* Playlists */}
      {searchResults.playlists.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">Playlists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {searchResults.playlists.map((playlist) => (
              <div 
                key={playlist.id}
                onClick={() => handlePlaylistClick(playlist.id)}
                className="bg-gray-900 bg-opacity-40 hover:bg-opacity-60 rounded-lg p-4 cursor-pointer transition-all duration-300 group"
              >
                <div className="relative mb-4">
                  <img 
                    src={playlist.imageUrl} 
                    alt={playlist.name}
                    className="w-full aspect-square rounded-lg object-cover shadow-lg"
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickPlay(playlist.tracks);
                    }}
                    className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
                  >
                    <Play className="h-4 w-4 text-black" fill="currentColor" />
                  </button>
                </div>
                <h3 className="font-medium truncate mb-2">{playlist.name}</h3>
                <p className="text-gray-400 text-sm">By {playlist.owner}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Albums */}
      {searchResults.albums.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {searchResults.albums.map((album) => (
              <div 
                key={album.id}
                onClick={() => handleAlbumClick(album.id)}
                className="bg-gray-900 bg-opacity-40 hover:bg-opacity-60 rounded-lg p-4 cursor-pointer transition-all duration-300 group"
              >
                <div className="relative mb-4">
                  <img 
                    src={album.imageUrl} 
                    alt={album.title}
                    className="w-full aspect-square rounded-lg object-cover shadow-lg"
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickPlay(album.tracks);
                    }}
                    className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
                  >
                    <Play className="h-4 w-4 text-black" fill="currentColor" />
                  </button>
                </div>
                <h3 className="font-medium truncate mb-1">{album.title}</h3>
                <p className="text-gray-400 text-sm truncate">{album.artist}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* No Results */}
      {searchResults.tracks.length === 0 && 
       searchResults.playlists.length === 0 && 
       searchResults.albums.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
          <p className="text-gray-500 text-sm mt-2">Try searching with different keywords</p>
        </div>
      )}
    </div>
  );
};

export default Search;