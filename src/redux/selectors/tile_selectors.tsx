import {createSelector} from '@reduxjs/toolkit';
import {BoardState} from 'redux/slices/board_slice';
import {Tile} from 'types';

export const getTileFromPosition = createSelector(
  (state: BoardState) => state.board,
  (_: BoardState, {x, y}: {x: number; y: number}) => ({
    x,
    y,
  }),
  ({board}, {x, y}): Tile => {
    return board[y][x];
  }
);

/*
export const getCount =
  ({x, y}: {x: number; y: number}) =>
  (store: State) => {
    const tile = store.board[y][x];
  };
*/
