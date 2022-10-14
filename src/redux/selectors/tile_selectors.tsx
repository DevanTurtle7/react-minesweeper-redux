import {createSelector} from '@reduxjs/toolkit';
import {BoardState} from 'redux/slices/board_slice';
import {Board, Tile} from 'types';

export const selectTileFromPosition = createSelector(
  (state: BoardState) => state.board,
  (_: BoardState, {x, y}: {x: number; y: number}) => ({
    x,
    y,
  }),
  ({board, height, width}, {x, y}) => {
    const surroundingTiles = getSurroundingTiles({board, height, width, x, y});

    return {
      ...board[y][x],
      mineCount: surroundingTiles.reduce(
        (count, tile) => (tile.isMine ? count + 1 : count),
        0
      ),
      flagCount: surroundingTiles.reduce(
        (count, tile) => (tile.flagged ? count + 1 : count),
        0
      ),
    };
  }
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

export const selectTileIsSatisfied = createSelector(
  (state: BoardState) => state.board,
  (_: BoardState, {x, y}: {x: number; y: number}) => ({
    x,
    y,
  }),
  ({board, height, width}, {x, y}) => {
    const neighbors = getSurroundingTiles({board, height, width, x, y});
    const mineCount = neighbors.reduce(
      (count, tile) => (tile.isMine ? count + 1 : count),
      0
    );
    const flagCount = neighbors.reduce(
      (count, tile) => (tile.flagged ? count + 1 : count),
      0
    );

    return flagCount === mineCount;
  }
);

export const selectTileNeighborsOpen = createSelector(
  (state: BoardState) => state.board,
  (_: BoardState, {x, y}: {x: number; y: number}) => ({
    x,
    y,
  }),
  ({board, height, width}, {x, y}) =>
    getSurroundingTiles({board, height, width, x, y}).every(
      (tile) => tile.isMine || tile.open
    )
);
