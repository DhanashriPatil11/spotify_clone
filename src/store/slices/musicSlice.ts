import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track, Playlist, Album } from '../../types';
import { mockTracks, mockPlaylists, mockAlbums } from '../../data/mockData';

interface MusicState {
  tracks: Track[];
  playlists: Playlist[];
  albums: Album[];
  favoriteTrackIds: string[];
  searchResults: {
    tracks: Track[];
    playlists: Playlist[];
    albums: Album[];
  };
}

const initialState: MusicState = {
  tracks: mockTracks,
  playlists: mockPlaylists,
  albums: mockAlbums,
  favoriteTrackIds: [],
  searchResults: {
    tracks: [],
    playlists: [],
    albums: [],
  },
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.favoriteTrackIds.includes(action.payload)) {
        state.favoriteTrackIds.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favoriteTrackIds = state.favoriteTrackIds.filter(id => id !== action.payload);
    },
    setSearchResults: (state, action: PayloadAction<{ tracks: Track[]; playlists: Playlist[]; albums: Album[] }>) => {
      state.searchResults = action.payload;
    },
    addPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.playlists.push(action.payload);
    },
    updatePlaylist: (state, action: PayloadAction<Playlist>) => {
      const index = state.playlists.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.playlists[index] = action.payload;
      }
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  setSearchResults,
  addPlaylist,
  updatePlaylist,
} = musicSlice.actions;

export default musicSlice.reducer;