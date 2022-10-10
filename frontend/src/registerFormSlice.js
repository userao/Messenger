import { createSlice } from '@reduxjs/toolkit';

export const registerFormSlice = createSlice({
  name: 'register',
  initialState: {
    validationState: {
      username: 'not validated',
      password: 'not validated',
      passwordConfirmation: 'not validated',
    },
  },
  reducers: {
    makeValid: (state, { payload }) => {
      state.validationState[payload] = 'valid';
    },
    makeInvalid: (state, { payload }) => {
      state.validationState[payload] = 'invalid';
    },
  }
});

export const { makeValid, makeInvalid } = registerFormSlice.actions;
export default registerFormSlice.reducer;
