import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import _ from 'lodash';
import routes from '../routes.js';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (headers) => {
    const response = await axios.get(routes.getChannelsPath(), { headers });
    return response.data;
  },
)


const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  fetchingStatus: 'idle',
  error: null,
});

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
      addChannel: (state, { payload }) => {
        const normalizedChannel = { ...payload, active: false };
        channelsAdapter.addOne(state, normalizedChannel);
      },
      setActiveChannel: (state, { payload }) => {
        const updates = state.ids.map((id) => {
          const active = id === payload;
          return { id, changes: { active }};
        })
        channelsAdapter.updateMany(state, updates);
      }
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchChannels.pending, (state) => {
        state.fetchingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        payload.channels.forEach((channel) => {
          const active = channel.id === payload.currentChannelId;
          channelsAdapter.addOne(state, { ...channel, active });
        })
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
    }
});

export const { addChannel, setActiveChannel } = channelsSlice.actions;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer