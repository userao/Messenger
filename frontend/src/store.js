import { configureStore } from '@reduxjs/toolkit';
import registerFormReducer from './registerFormSlice.js';

export const store = configureStore({
  reducer: {
    registerForm: registerFormReducer,
  },
});