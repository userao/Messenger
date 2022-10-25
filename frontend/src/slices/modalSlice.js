/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    displayedModal: {
      type: null,
      channelId: null,
    },
  },
  reducers: {
    setDisplayedModal: (state, { payload }) => {
      state.displayedModal = { ...state.displayedModal, ...payload };
    },
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
