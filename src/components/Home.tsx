import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Play, Heart } from 'lucide-react';
import { RootState } from '../store';
import { setCurrentView, setSelectedPlaylist, setSelectedAlbum } from '../store/slices/appSlice';
import { setCurrentTrack, setQueue, setIsPlaying } from '../store/slices/playerSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { tracks, playlists, albums } = useSelector((state: RootState) => state.music);

  const recentTracks = tracks.slice(0, 6);
  const featuredPlaylists = playlists;
  const newReleases = albums;

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="text-white p-6 space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold mb-6">{getGreeting()}</h1>
        
        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentTracks.map((track) => (
            <div 
              key={track.id}
              className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg p-4 cursor-pointer transition-all duration-300 group"
              onClick={() => handleQuickPlay(track)}
            >
              <div className="flex items-center space-x-4">
                <img 
                  src={track.imageUrl} 
                  alt={track.title}
                  className="w-16 h-16 rounded-lg object-cover shadow-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{track.title}</p>
                  <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                </div>
                <button className="bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105">
                  <Play className="h-5 w-5 text-black" fill="currentColor" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Playlists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Made for you</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {featuredPlaylists.map((playlist) => (
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
              <p className="text-gray-400 text-sm line-clamp-2">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recently played</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {newReleases.map((album) => (
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
    </div>
  );
};

export default Home;