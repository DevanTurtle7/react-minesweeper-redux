import {createSelector} from '@reduxjs/toolkit';

export const useBoard = createSelector(
  (state) => state.board,
  (board) => board
);
