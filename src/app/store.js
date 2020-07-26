import { configureStore } from '@reduxjs/toolkit';
import wsSlice from './wsSlice';

export default configureStore({
  reducer: {
    wsGlobalStore: wsSlice,
  },
});
