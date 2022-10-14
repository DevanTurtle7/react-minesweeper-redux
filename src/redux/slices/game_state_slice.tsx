import {createSlice} from '@reduxjs/toolkit';
import {
  GameState,
  GAME_STATE_IN_PROGRESS,
  GAME_STATE_NEW_GAME,
} from '../../types';
import {BOARD_CREATE_EMPTY, BOARD_GENERATE} from './board_slice';

const initialState: GameState = 'NEW_GAME';

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setGameState: (state, {payload: {gameState}}) => {
      return gameState;
    },
  },
  extraReducers: {
    [BOARD_CREATE_EMPTY]: (state) => GAME_STATE_NEW_GAME,
    [BOARD_GENERATE]: (state) => GAME_STATE_IN_PROGRESS,
  },
});

const {actions, reducer: game_state_reducers} = gameStateSlice;
export const {setGameState} = actions;
export default game_state_reducers;
