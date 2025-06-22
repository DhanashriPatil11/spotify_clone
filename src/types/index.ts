export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  imageUrl: string;
  audioUrl: string;
  genre: string;
  year: number;
  popularity: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tracks: Track[];
  owner: string;
  isPublic: boolean;
  createdAt: string;
  totalDuration: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  imageUrl: string;
  tracks: Track[];
  genre: string;
  totalDuration: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  premium: boolean;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Track[];
  currentIndex: number;
  shuffle: boolean;
  repeat: 'none' | 'one' | 'all';
}

export interface AppState {
  currentView: 'home' | 'search' | 'library' | 'playlist' | 'album';
  searchQuery: string;
  selectedPlaylist: string | null;
  selectedAlbum: string | null;
}