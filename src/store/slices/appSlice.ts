import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../types';

const initialState: AppState = {
  currentView: 'home',
  searchQuery: '',
  selectedPlaylist: null,
  selectedAlbum: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentView: (state, action: PayloadAction<AppState['currentView']>) => {
      state.currentView = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedPlaylist: (state, action: PayloadAction<string | null>) => {
      state.selectedPlaylist = action.payload;
    },
    setSelectedAlbum: (state, action: PayloadAction<string | null>) => {
      state.selectedAlbum = action.payload;
    },
  },
});

export const {
  setCurrentView,
  setSearchQuery,
  setSelectedPlaylist,
  setSelectedAlbum,
} = appSlice.actions;

export default appSlice.reducer;