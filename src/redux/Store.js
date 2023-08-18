import { configureStore } from '@reduxjs/toolkit';
import GetSlice from './slices/GetSlice';

const Store = configureStore({
  reducer: {
    getData: GetSlice,
  },
});

export default Store;