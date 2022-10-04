import {createSlice} from '@reduxjs/toolkit';
import {GameState} from '../../types';

const initialState: GameState = 'NEW_GAME';

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setGameState: () => {
      //
    },
  },
});

const {actions, reducer: game_state_reducers} = gameStateSlice;
export const {setGameState} = actions;
export default game_state_reducers;
