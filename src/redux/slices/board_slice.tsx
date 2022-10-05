import {createSlice} from '@reduxjs/toolkit';
import {Board} from '../../types';

export interface BoardState {
  board: BoardSlice;
}

export interface BoardSlice {
  board: Board;
  height: number;
  width: number;
}

const initialState: BoardSlice = {
  board: [],
  height: 20,
  width: 20,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    generateBoard: (state, {payload: {height, width, mineCount}}) => {
      if (mineCount > height * width) {
        return {
          board: [...state.board],
          height: state.height,
          width: state.width,
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
          });
        }
      }

      return {
        board: board,
        height: state.height,
        width: state.width,
      };
    },
    openTile: (state, {payload: {x, y}}) => {
      state.board[y][x].open = true;
    },
  },
});

const {actions, reducer: board_reducers} = boardSlice;
export const {generateBoard, openTile} = actions;
export default board_reducers;
