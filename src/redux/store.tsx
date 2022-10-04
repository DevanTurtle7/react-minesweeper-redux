import {configureStore} from '@reduxjs/toolkit';
import reducer from 'redux/slices/board_slice';

export default configureStore({
  reducer: {
    board: reducer,
  },
});
