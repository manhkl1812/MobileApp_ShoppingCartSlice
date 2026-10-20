import { configureStore } from '@reduxjs/toolkit';
import carReducer from './cardSlice';

export const store = configureStore({
  reducer: {
    cart: carReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;