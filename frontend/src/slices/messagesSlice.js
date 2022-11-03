/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';
import socket from '../socket.js';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState({
    fetchingStatus: 'idle',
  }),
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    setFetchingStatus: (state, { payload }) => {
      state.fetchingStatus = payload;
    },
    emitNewMessage: (state, { payload }) => {
      socket.emit('newMessage', payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, { payload }) => {
      const idsToDelete = state.ids.filter((id) => state.entities[id].channelId === payload);
      messagesAdapter.removeMany(state, idsToDelete);
    });
  },
});

export const { actions } = messagesSlice;

export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
