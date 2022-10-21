import {configureStore} from '@reduxjs/toolkit';
import board_reducers from 'redux/slices/board_slice';
import game_state_reducers from 'redux/slices/game_state_slice';
import preferences_reducers from './slices/preferences_slice';

// TODO: Add preferences slice
// TODO: Currently selected slice. Add neighbors on click down to highlight them

export default configureStore({
  reducer: {
    board: board_reducers,
    gameState: game_state_reducers,
    preferences: preferences_reducers,
  },
});
