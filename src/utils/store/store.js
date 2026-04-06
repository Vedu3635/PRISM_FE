import { configureStore } from '@reduxjs/toolkit';
import transactionsUiReducer from '../transactions/store/transactionsUiSlice';

export const store = configureStore({
  reducer: {
    transactionsUi: transactionsUiReducer,
  },
});

