import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice.js';

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
  },
});