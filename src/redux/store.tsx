import {configureStore} from '@reduxjs/toolkit';
import board_reducers from 'redux/slices/board_slice';
import game_state_reducers from 'redux/slices/game_state_slice';

// TODO: Add preferences slice

export default configureStore({
  reducer: {
    board: board_reducers,
    gameState: game_state_reducers,
  },
});
