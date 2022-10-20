import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    displayedModal: null,
  },
  reducers: {
    setDisplayedModal: (state, { payload }) => {
      state.displayedModal = payload;
    },
  }
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
