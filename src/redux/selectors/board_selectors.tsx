import {createSelector} from '@reduxjs/toolkit';
import {BoardState} from '../slices/board_slice';
import {tileIsSatisfied} from './tile_selectors';

export const selectBoard = createSelector(
  (state: BoardState) => state.board,
  ({board, width, height, mineCount}) => ({
    board,
    width,
    height,
    mineCount,
  })
);

export const selectBoardWon = createSelector(
  (state: BoardState) => state,
  ({board}) =>
    board.board.every((row) =>
      row.every(
        ({isMine, flagged, open, x, y}) =>
          (isMine && flagged && !open) ||
          (!flagged && tileIsSatisfied({x, y, ...board}))
      )
    )
);
