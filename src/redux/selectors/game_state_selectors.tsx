import {createSelector} from '@reduxjs/toolkit';
import {GameState} from 'types';

export const selectGameState = createSelector(
  (state: {gameState: GameState}) => state.gameState,
  (gameState: GameState) => gameState
);
