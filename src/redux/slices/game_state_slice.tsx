import {createSlice} from '@reduxjs/toolkit';
import {BOARD_CREATE_EMPTY, BOARD_GENERATE} from 'redux/actions/board_actions';
import {
  GameState,
  GAME_STATE_IN_PROGRESS,
  GAME_STATE_LOSS,
  GAME_STATE_NEW_GAME,
  GAME_STATE_WIN,
} from '../../types';

const initialState: GameState = 'NEW_GAME';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setGameWin: (state) => {
      return GAME_STATE_WIN;
    },
  },
  extraReducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [BOARD_CREATE_EMPTY]: (state) => GAME_STATE_NEW_GAME,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [BOARD_GENERATE]: (state) => GAME_STATE_IN_PROGRESS,
  },
});

const {actions, reducer: game_state_reducers} = gameStateSlice;
export const {setGameState} = actions;
export default game_state_reducers;
