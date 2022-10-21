export const GAME_STATE_SET_LOSS = 'gameState/setGameLoss';
export const GAME_STATE_SET_WIN = 'gameState/setGameWin';

export const gameStateSetWin = () => ({
  type: GAME_STATE_SET_WIN,
  payload: {},
});

export const gameStateSetLoss = () => ({
  type: GAME_STATE_SET_LOSS,
  payload: {},
});
