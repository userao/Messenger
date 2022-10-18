import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import routes from '../routes.js';
import { addMessages } from './messagesSlice.js';

// export const fetchData = createAsyncThunk(
//   'channels/fetchData',
//   async (headers) => {
//     const response = await axios.get(routes.getData(), { headers });
//     return response.data;
//   },
// )

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  fetchingStatus: 'idle',
  error: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    setActiveChannel: (state, { payload }) => {
      const updates = state.ids.map((id) => {
        const active = id === payload;
        return { id, changes: { active } };
      });
      channelsAdapter.updateMany(state, updates);
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchData.pending, (state) => {
  //       state.fetchingStatus = 'loading';
  //       state.error = null;
  //     })
  //     .addCase(fetchData.fulfilled, (state, { payload }) => {
  //       payload.channels.forEach((channel) => {
  //         const active = channel.id === payload.currentChannelId;
  //         channelsAdapter.addOne(state, { ...channel, active });
  //       })
  //       state.loadingStatus = 'idle';
  //       state.error = null;
  //     })
  //     .addCase(fetchData.rejected, (state, action) => {
  //       state.loadingStatus = 'failed';
  //       state.error = action.error;
  //     });
  // }
});

export const { actions } = channelsSlice;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
