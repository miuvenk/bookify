import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import booksReducer from './booksSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    books: booksReducer,
  },
});
