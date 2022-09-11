import {configureStore} from '@reduxjs/toolkit';
import reducer from './slices/board_slice';

export default configureStore({
  reducer: {
    board: reducer,
  },
});
