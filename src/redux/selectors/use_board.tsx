import {createSelector} from '@reduxjs/toolkit';

export const useBoard = createSelector(
  (state) => state.board,
  (board) => ({
    board,
    width: board[0].length,
    height: board.length,
  })
);
