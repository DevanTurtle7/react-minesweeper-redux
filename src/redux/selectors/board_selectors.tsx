import {createSelector} from '@reduxjs/toolkit';
import {ReduxState} from 'types';
import {tileIsSatisfied} from './tile_selectors';

export const selectBoard = createSelector(
  (state: ReduxState) => state.board,
  ({board, width, height, mineCount}) => ({
    board,
    width,
    height,
    mineCount,
    flagCount: board.reduce(
      (count, row) =>
        count +
        row.reduce((rowCount, {flagged}) => rowCount + (flagged ? 1 : 0), 0),
      0
    ),
  })
);

export const selectBoardWon = createSelector(
  (state: ReduxState) => state,
  ({board}) =>
    board.board.every((row) =>
      row.every(
        ({isMine, flagged, open, x, y}) =>
          (isMine && flagged && !open) ||
          (!flagged && tileIsSatisfied({x, y, ...board}))
      )
    )
);
