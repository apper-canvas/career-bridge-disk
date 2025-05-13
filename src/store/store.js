import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

/**
 * Redux store configuration
 * Contains reducers for different slices of state
 */
export const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here as needed
  },
});