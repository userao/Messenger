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
    renameChannel: (state, { payload }) => {
      channelsAdapter.updateOne(state, { id: payload.id, changes: { name: payload.name }});
    },
    removeChannel: channelsAdapter.removeOne,
  }
});

export const { actions } = channelsSlice;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
