import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import wsSlice from './wsSlice';

export default configureStore({
  reducer: {
    wsGlobalStore: wsSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
