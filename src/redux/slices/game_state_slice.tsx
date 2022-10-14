import {createSlice} from '@reduxjs/toolkit';
import {
  BOARD_CREATE_EMPTY,
  BOARD_GENERATE,
  GAME_STATE_SET_LOSS,
} from 'redux/actions';
import {
  GameState,
  GAME_STATE_IN_PROGRESS,
  GAME_STATE_NEW_GAME,
} from '../../types';

const initialState: GameState = 'NEW_GAME';

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setGameState: (state, {payload: {gameState}}) => {
      return gameState;
    },
    setGameLoss: (state) => {
      return GAME_STATE_SET_LOSS;
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
