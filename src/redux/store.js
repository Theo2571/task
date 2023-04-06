import { configureStore } from '@reduxjs/toolkit';
import { userSliceReducer } from './Slice/UserSlice';

export const store = configureStore({
  reducer: {
    pokemon: userSliceReducer,
  },
});
