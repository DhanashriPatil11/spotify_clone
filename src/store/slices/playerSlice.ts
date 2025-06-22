import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerState, Track } from '../../types';

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.5,
  queue: [],
  currentIndex: 0,
  shuffle: false,
  repeat: 'none',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
      state.currentTime = 0;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setQueue: (state, action: PayloadAction<Track[]>) => {
      state.queue = action.payload;
    },
    nextTrack: (state) => {
      if (state.currentIndex < state.queue.length - 1) {
        state.currentIndex += 1;
        state.currentTrack = state.queue[state.currentIndex];
        state.currentTime = 0;
      }
    },
    previousTrack: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.currentTrack = state.queue[state.currentIndex];
        state.currentTime = 0;
      }
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    toggleRepeat: (state) => {
      const modes: Array<'none' | 'one' | 'all'> = ['none', 'one', 'all'];
      const currentIndex = modes.indexOf(state.repeat);
      state.repeat = modes[(currentIndex + 1) % modes.length];
    },
  },
});

export const {
  setCurrentTrack,
  togglePlayPause,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  setQueue,
  nextTrack,
  previousTrack,
  toggleShuffle,
  toggleRepeat,
} = playerSlice.actions;

export default playerSlice.reducer;