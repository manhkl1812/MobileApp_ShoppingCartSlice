import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cardSlice';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    counter: counterReducer, // Thêm counter vào đây
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;