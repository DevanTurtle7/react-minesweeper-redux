import {createSlice} from '@reduxjs/toolkit';

const boardSlice = createSlice({
  name: 'board',
  initialState: [],
  reducers: {
    generateBoard: (state, {payload: {height, width, mineCount}}) => {
      if (mineCount > height * width) {
        return [...state];
      }

      let minesPlaced = 0;
      const mineLocations = new Set();
      const board = [];

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

      return board;
    },
  },
});

const {actions, reducer} = boardSlice;
export const {generateBoard} = actions;
export default reducer;
