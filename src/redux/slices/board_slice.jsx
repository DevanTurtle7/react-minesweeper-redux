import {createSlice} from '@reduxjs/toolkit';

const boardSlice = createSlice({
  name: 'board',
  initialState: [],
  reducers: {
    generateBoard: (state, {payload}) => {
      return [...Array(payload.height)].map((e) =>
        Array(payload.width).fill({
          open: false,
          bomb: false,
        })
      );
    },
  },
});

const {actions, reducer} = boardSlice;
export const {generateBoard} = actions;
export default reducer;
