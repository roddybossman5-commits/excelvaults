import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

console.log('[store] configured with reducers:', Object.keys(store.getState()));

export default store;
