import {createSelector} from '@reduxjs/toolkit';
import {BoardState} from 'redux/slices/board_slice';
import {Board, Tile} from 'types';

export const getTileFromPosition = createSelector(
  (state: BoardState) => state.board,
  (_: BoardState, {x, y}: {x: number; y: number}) => ({
    x,
    y,
  }),
  ({board}, {x, y}) => board[y][x]
);

export const getSurroundingTiles = ({
  board,
  height,
  width,
  x,
  y,
}: {
  board: Board;
  height: number;
  width: number;
  x: number;
  y: number;
}) => {
  const neighbors: Array<Tile> = [];

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

        if (!(currentX === x && currentY === y)) {
          neighbors.push({
            open: currentTile.open,
            isMine: currentTile.isMine,
            flagged: currentTile.flagged,
            x: currentX,
            y: currentY,
          });
        }
      }
    }
  }

  return neighbors;
};

export const getTileMineCount = createSelector(
  (state: BoardState) => state.board,
  (_: BoardState, {x, y}: {x: number; y: number}) => ({
    x,
    y,
  }),
  ({board, height, width}, {x, y}) =>
    getSurroundingTiles({board, height, width, x, y}).reduce(
      (count, tile) => (tile.isMine ? count + 1 : count),
      0
    )
);
