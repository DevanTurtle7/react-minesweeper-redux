import {createSelector} from '@reduxjs/toolkit';
import {State} from '../slices/board_slice';

export const useBoard = createSelector(
  (state: State) => state.board,
  (board) => ({
    board,
    width: board[0].length,
    height: board.length,
  })
);
