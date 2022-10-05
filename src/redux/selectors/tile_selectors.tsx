import {createSelector} from '@reduxjs/toolkit';
import {BoardState} from 'redux/slices/board_slice';

export const getTileFromPosition = createSelector(
  (state: BoardState) => state.board,
  (_: BoardState, {x, y}: {x: number; y: number}) => ({
    x,
    y,
  }),
  ({board}, {x, y}) => board[y][x]
);

export const getTileMineCount = createSelector(
  (state: BoardState) => state.board,
  (_: BoardState, {x, y}: {x: number; y: number}) => ({
    x,
    y,
  }),
  ({board, height, width}, {x, y}) => {
    let count = 0;

    console.log(board);
    console.log(x);
    console.log(y);
    for (let yIncrease = -1; yIncrease <= 1; yIncrease++) {
      for (let xIncrease = -1; xIncrease <= 1; xIncrease++) {
        const currentX = x + xIncrease;
        const currentY = y + yIncrease;

        if (
          currentX < width &&
          currentY < height &&
          currentX >= 0 &&
          currentY >= 0
        ) {
          const currentTile = board[currentY][currentX];

          if (!(currentX === x && currentY === y) && currentTile.isMine) {
            count++;
          }
        }
      }
    }

    return count;
  }
);
