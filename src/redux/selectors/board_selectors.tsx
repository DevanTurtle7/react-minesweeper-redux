import {createSelector} from '@reduxjs/toolkit';
import {BoardState} from '../slices/board_slice';

export const selectBoard = createSelector(
  (state: BoardState) => state.board,
  ({board, width, height, mineCount}) => ({
    board,
    width,
    height,
    mineCount,
  })
);
