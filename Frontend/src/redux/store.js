import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import orderCartReducer from './orderCartSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    orderCart: orderCartReducer,
  },
});

export default store;
