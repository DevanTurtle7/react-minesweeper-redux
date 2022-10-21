import {createSelector} from '@reduxjs/toolkit';
import {GameState, ReduxState} from 'types';

export const selectGameState = createSelector(
  (state: ReduxState) => state.gameState,
  (gameState: GameState) => gameState
);
