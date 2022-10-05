import {createSelector} from '@reduxjs/toolkit';
import {BoardState} from '../slices/board_slice';

export const useBoard = createSelector(
  (state: BoardState) => state.board,
  ({board, width, height}) => ({
    board,
    width,
    height,
  })
);
