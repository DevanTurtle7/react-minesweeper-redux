import {createSlice} from '@reduxjs/toolkit';
import {getSurroundingTiles} from 'redux/selectors/tile_selectors';
import {Board} from '../../types';

export interface BoardState {
  board: BoardSlice;
}

export interface BoardSlice {
  board: Board;
  height: number;
  width: number;
  mineCount: number;
}

const initialState: BoardSlice = {
  board: [],
  height: 0,
  width: 0,
  mineCount: 0,
};

const openTileRec = ({
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
  board[y][x].open = true;

  const neighbors = getSurroundingTiles({board, height, width, x, y});
  const satisfied = neighbors.every((tile) => !tile.isMine || tile.flagged);

  if (satisfied) {
    neighbors.forEach((tile) => {
      if (!tile.open) {
        openTileRec({board, height, width, x: tile.x, y: tile.y});
      }
    });
  }
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    generateBoard: (state, {payload: {height, width, mineCount}}) => {
      if (mineCount > height * width) {
        return {
          board: [...state.board],
          height,
          width,
          mineCount,
        };
      }

      let minesPlaced = 0;
      const mineLocations = new Set();
      const board: Board = [];

      while (minesPlaced < mineCount) {
        const y = Math.floor(Math.random() * height);
        const x = Math.floor(Math.random() * width);
        const key = y * width + x;

        if (!mineLocations.has(key)) {
          mineLocations.add(key);
          minesPlaced++;
        }
      }

      for (let y = 0; y < height; y++) {
        board.push([]);
        for (let x = 0; x < width; x++) {
          const key = y * width + x;

          board[y].push({
            open: false,
            isMine: mineLocations.has(key),
            flagged: false,
            x,
            y,
          });
        }
      }

      return {
        board: board,
        height,
        width,
        mineCount,
      };
    },
    openTile: ({board, height, width}, {payload: {x, y}}) => {
      openTileRec({board, height, width, x, y});
    },
  },
});

const {actions, reducer: board_reducers} = boardSlice;
export const {generateBoard, openTile} = actions;
export default board_reducers;
