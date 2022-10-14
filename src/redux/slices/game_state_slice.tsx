import {createSlice, current} from '@reduxjs/toolkit';
import {
  BOARD_CREATE_EMPTY,
  BOARD_GENERATE,
  BOARD_OPEN_RECURSIVE,
  BOARD_OPEN_TILE,
} from 'redux/actions';
import store from 'redux/store';
import {
  GameState,
  GAME_STATE_IN_PROGRESS,
  GAME_STATE_LOSS,
  GAME_STATE_NEW_GAME,
} from '../../types';

const initialState: GameState = 'NEW_GAME';

const winReducer = (state) => {
  return state;
};

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setGameState: (state, {payload: {gameState}}) => {
      return gameState;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setGameLoss: (state) => {
      return GAME_STATE_LOSS;
    },
  },
  extraReducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [BOARD_CREATE_EMPTY]: (state) => GAME_STATE_NEW_GAME,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [BOARD_GENERATE]: (state) => GAME_STATE_IN_PROGRESS,

    // TODO: open tile: if all tiles are satisfied and numFlags = numMines, then win
    [BOARD_OPEN_RECURSIVE]: winReducer,
    [BOARD_OPEN_TILE]: winReducer,
  },
});

const {actions, reducer: game_state_reducers} = gameStateSlice;
export const {setGameState} = actions;
export default game_state_reducers;
