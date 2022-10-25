import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

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
      channelsAdapter.updateOne(state, { id: payload.id, changes: { name: payload.name } });
    },
    removeChannel: channelsAdapter.removeOne,
  },
});

export const { actions } = channelsSlice;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
